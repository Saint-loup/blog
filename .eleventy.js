const pluginRss = require('@11ty/eleventy-plugin-rss')
const pluginNavigation = require('@11ty/eleventy-navigation')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const CleanCSS = require("clean-css");
const yaml = require("js-yaml");
const slugify = require('./src/_includes/slugify.js');

//const svgsprite = require('./src/utils/svgsprite')
//const pageAssetsPlugin = require('eleventy-plugin-page-assets');
const imagesResponsiver = require("eleventy-plugin-images-responsiver");

const blockImagePlugin = require("markdown-it-block-image");
const markdownItAttributes = require('markdown-it-attrs');
const markdownItContainer = require('markdown-it-container');
const markdownIt = require('markdown-it')
const markdownItFootnote = require('markdown-it-footnote');
const markdownItAnchor = require('markdown-it-anchor');

const filters = require('./src/utils/filters.js')
const shortcodes = require('./src/utils/shortcodes.js')
const pairedshortcodes = require('./src/utils/paired-shortcodes.js')
const transforms = require('./src/utils/transforms.js')


module.exports = function (eleventyConfig) {

	eleventyConfig.addDataExtension("yaml", contents => yaml.safeLoad(contents));

	eleventyConfig.setFrontMatterParsingOptions({
		excerpt: true,
		// Optional, default is "---"
		excerpt_separator: "<!-- excerpt -->"
	});


	/**
	 * Plugins
	 * @link https://www.11ty.dev/docs/plugins/
	 */

	eleventyConfig.addPlugin(pluginRss)
	eleventyConfig.addPlugin(pluginNavigation)
	eleventyConfig.addPlugin(syntaxHighlight)
	//eleventyConfig.addPlugin(pageAssetsPlugin, { mode: "parse", postsMatching: "src/posts/*/*.md", });
	eleventyConfig.addPlugin(imagesResponsiver, require('./src/utils/images-responsiver-config.js'))


	/**
	 * Filters
	 * @link https://www.11ty.io/docs/filters/
	 */
	Object.keys(filters).forEach((filterName) => {
		eleventyConfig.addFilter(filterName, filters[filterName])
	})


	/**
	 * Transforms
	 * @link https://www.11ty.io/docs/config/#transforms
	 */
	Object.keys(transforms).forEach((transformName) => {
		eleventyConfig.addTransform(transformName, transforms[transformName])
	})

	/**
	 * Shortcodes
	 * @link https://www.11ty.io/docs/shortcodes/
	 */
	Object.keys(shortcodes).forEach((shortcodeName) => {
		eleventyConfig.addShortcode(shortcodeName, shortcodes[shortcodeName])
	})

	/**
	 * Paired Shortcodes
	 * @link https://www.11ty.dev/docs/languages/nunjucks/#paired-shortcode
	 */
	Object.keys(pairedshortcodes).forEach((shortcodeName) => {
		eleventyConfig.addPairedShortcode(
			shortcodeName,
			pairedshortcodes[shortcodeName]
		)
	})

	/**
	 * Add async shortcodes
	 *
	 * @link https://www.11ty.dev/docs/languages/nunjucks/#asynchronous-shortcodes
	 */
	//eleventyConfig.addNunjucksAsyncShortcode('svgsprite', svgsprite)


	/**
	 * Collections
	 * ============================
	 *
	 * POST Collection set so we can check status of "draft:" frontmatter.
	 * If set "true" then post will NOT be processed in PRODUCTION env.
	 * If "false" or NULL it will be published in PRODUCTION.
	 * Every Post will ALWAYS be published in DEVELOPMENT so you can preview locally.
	 */
	eleventyConfig.addCollection('post', (collection) => {
		if (process.env.ELEVENTY_ENV !== 'production')
			return [...collection.getFilteredByGlob('./src/posts/**/*.md')]
		else
			return [...collection.getFilteredByGlob('./src/posts/**/*.md')].filter((post) => !post.data.draft)
	})

	// TAGLIST used from the official eleventy-base-blog  https://github.com/11ty/eleventy-base-blog/blob/master/.eleventy.js
	eleventyConfig.addCollection('tagList', function (collection) {
		let tagSet = new Set()
		collection.getAll().forEach(function (item) {
			if ('tags' in item.data) {
				let tags = item.data.tags

				tags = tags.filter(function (item) {
					switch (item) {
						// this list should match the `filter` list in tags.njk
						case 'authors':
						case 'pages':
						case 'post':
						case 'travaux':
							return false
					}

					return true
				})

				for (const tag of tags) {
					tagSet.add(tag)
				}
			}
		})

		// returning an array in addCollection works in Eleventy 0.5.3
		return [...tagSet]
	})

	eleventyConfig.addCollection("catList", function (collectionApi) {
		return collectionApi.getFilteredByTag("travaux");
	});


	/**
	 * Custom Watch Targets
	 * for when the Tailwind config or .css files change...
	 * by default not watched by 11ty
	 * @link https://www.11ty.dev/docs/config/#add-your-own-watch-targets
	 */
	eleventyConfig.addWatchTarget('./src/assets/css/')
	eleventyConfig.addWatchTarget('./src/*.js')
	eleventyConfig.addWatchTarget('./tailwind.config.js')



	/**
	 * Passthrough File Copy
	 * @link https://www.11ty.dev/docs/copy/
	 */
	//eleventyConfig.addPassthroughCopy('src/assets/generatedImages/')
	//	eleventyConfig.addPassthroughCopy('src/*.png')
	//	eleventyConfig.addPassthroughCopy('src/*.jpg')
	eleventyConfig.addPassthroughCopy('src/*.ico')
	eleventyConfig.addPassthroughCopy('src/robots.txt')
	eleventyConfig.addPassthroughCopy('src/assets/')
	eleventyConfig.setUseGitIgnore(true)


	/**
	 * Add layout aliases
	 * @link https://www.11ty.dev/docs/layouts/#layout-aliasing
	 */
	eleventyConfig.addLayoutAlias('base', 'layouts/base.njk')
	eleventyConfig.addLayoutAlias('page', 'layouts/page.njk')
	eleventyConfig.addLayoutAlias('post', 'layouts/post.njk')
	eleventyConfig.addLayoutAlias('author', 'layouts/author.njk')
	//eleventyConfig.addLayoutAlias('home', 'layouts/home.njk')


	/**
	 * Opts in to a full deep merge when combining the Data Cascade.
	 * Per the link below, "This will likely become the default in an upcoming major version."
	 * So I'm going to implement it now.
	 * @link https://www.11ty.dev/docs/data-deep-merge/#data-deep-merge
	 */
	eleventyConfig.setDataDeepMerge(true)




	// https://www.toptal.com/designers/htmlarrows/punctuation/section-sign/
	const markdownItAnchorOptions = {
		permalink: true,
		permalinkClass: 'deeplink',
		permalinkSymbol: '&#xa7;&#xFE0E;',
		level: [2, 3, 4],
		slugify: function (s) {
			return slugify(s);
		},
	};

	// taken from https://gist.github.com/rodneyrehm/4feec9af8a8635f7de7cb1754f146a39
	function getHeadingLevel(tagName) {
		if (tagName[0].toLowerCase() === 'h') {
			tagName = tagName.slice(1);
		}

		return parseInt(tagName, 10);
	}

	function markdownItHeadingLevel(md, options) {
		var firstLevel = options.firstLevel;

		if (typeof firstLevel === 'string') {
			firstLevel = getHeadingLevel(firstLevel);
		}
		if (!firstLevel || isNaN(firstLevel)) {
			return;
		}
		var levelOffset = firstLevel - 1;
		if (levelOffset < 1 || levelOffset > 6) {
			return;
		}

		md.core.ruler.push('adjust-heading-levels', function (state) {
			var tokens = state.tokens;
			for (var i = 0; i < tokens.length; i++) {
				if (tokens[i].type !== 'heading_close') {
					continue;
				}

				var headingOpen = tokens[i - 2];
				var headingClose = tokens[i];

				var currentLevel = getHeadingLevel(headingOpen.tag);
				var tagName = 'h' + Math.min(currentLevel + levelOffset, 6);

				headingOpen.tag = tagName;
				headingClose.tag = tagName;
			}
		});
	}


	let options = {
		html: true,
		breaks: true,
		linkify: true,
		typographer: true,
	}

	const md = markdownIt(options)
		.disable('code')
		.use(markdownItHeadingLevel, { firstLevel: 2 })
		.use(markdownItFootnote)
		.use(markdownItAnchor, markdownItAnchorOptions)
		.use(markdownItAttributes)
		.use(markdownItContainer, 'info')
		.use(blockImagePlugin, {
			outputContainer: 'figure',
			containerClassName: "image-container"
		});

	eleventyConfig.setLibrary('md', md);

	// Add markdownify filter with Markdown-it configuration
	eleventyConfig.addFilter('markdownify', (markdownString) =>
		md.render(markdownString)
	);


	return {
		dir: {
			input: 'src',
			output: 'dist',
			includes: '_includes',
			data: '_data',
		},
		passthroughFileCopy: true,
		templateFormats: ['html', 'njk', 'md'],
		htmlTemplateEngine: 'njk',
		markdownTemplateEngine: 'njk',
	}
}

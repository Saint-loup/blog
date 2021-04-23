const pluginRss = require('@11ty/eleventy-plugin-rss')
const pluginNavigation = require('@11ty/eleventy-navigation')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const yaml = require("js-yaml");
const embedTwitter = require("eleventy-plugin-embed-twitter");

//const svgsprite = require('./src/utils/svgsprite')
//const pageAssetsPlugin = require('eleventy-plugin-page-assets');
const imagesResponsiver = require("eleventy-plugin-images-responsiver");
const { default: postcss } = require('postcss');

require('dotenv').config()





module.exports = function (eleventyConfig) {


	/**
	 * Plugins
	 * @link https://www.11ty.dev/docs/plugins/
	 */

	eleventyConfig.addPlugin(pluginRss)
	eleventyConfig.addPlugin(pluginNavigation)
	eleventyConfig.addPlugin(syntaxHighlight)
	//eleventyConfig.addPlugin(pageAssetsPlugin, { mode: "parse", postsMatching: "src/posts/*/*.md", });
	eleventyConfig.addPlugin(embedTwitter, {
		doNotTrack: true,
		cacheText: false,
		conversation: false,
		align: "center"
	});

	if (process.env.NODE_ENV === "production") {
		eleventyConfig.addPlugin(imagesResponsiver, require('./src/utils/images-responsiver-config.js'))

	}

	/**
	 * Filters
	 * @link https://www.11ty.io/docs/filters/
	 */
	const filters = require('./src/utils/filters.js')

	Object.keys(filters).forEach((filterName) => {
		eleventyConfig.addFilter(filterName, filters[filterName])
	})


	/**
	 * Transforms
	 * @link https://www.11ty.io/docs/config/#transforms
	 */
	/*const transforms = require('./src/utils/transforms.js')

	Object.keys(transforms).forEach((transformName) => {
		eleventyConfig.addTransform(transformName, transforms[transformName])
	})
*/
	/**
	 * Shortcodes
	 * @link https://www.11ty.io/docs/shortcodes/
	 */
	const shortcodes = require('./src/utils/shortcodes.js')

	Object.keys(shortcodes).forEach((shortcodeName) => {
		eleventyConfig.addShortcode(shortcodeName, shortcodes[shortcodeName])
	})

	/**
	 * Paired Shortcodes
	 * @link https://www.11ty.dev/docs/languages/nunjucks/#paired-shortcode
	 */
	const pairedshortcodes = require('./src/utils/paired-shortcodes.js')
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

	cf. webpack.configs.js pour le JS
	cf. postcss.config.js pour le CSS

	*/

	eleventyConfig.addPassthroughCopy({ 'src/assets/images/*.gif': 'assets/images' });
	eleventyConfig.addPassthroughCopy('src/assets/generatedImages/')
	//eleventyConfig.addPassthroughCopy('src/*.webp')
	//eleventyConfig.addPassthroughCopy('src/*.jpg')
	eleventyConfig.addPassthroughCopy('src/*.ico')
	eleventyConfig.addPassthroughCopy('src/robots.txt')
	eleventyConfig.addPassthroughCopy('src/assets/css/fonts')
	eleventyConfig.addPassthroughCopy('src/assets/UI')

	eleventyConfig.setUseGitIgnore(false)


	/**
	 * Add layout aliases
	 * @link https://www.11ty.dev/docs/layouts/#layout-aliasing
	 */
	eleventyConfig.addLayoutAlias('base', 'layouts/base.njk')
	eleventyConfig.addLayoutAlias('page', 'layouts/page.njk')
	eleventyConfig.addLayoutAlias('post', 'layouts/post.njk')
	eleventyConfig.addLayoutAlias('post-gallery', 'layouts/post-gallery.njk')
	eleventyConfig.addLayoutAlias('author', 'layouts/author.njk')

	//eleventyConfig.addLayoutAlias('home', 'layouts/home.njk')


	/**
	 * Opts in to a full deep merge when combining the Data Cascade.
	 * Per the link below, "This will likely become the default in an upcoming major version."
	 * So I'm going to implement it now.
	 * @link https://www.11ty.dev/docs/data-deep-merge/#data-deep-merge
	 */
	eleventyConfig.setDataDeepMerge(true)


	/**
	MARKDOWN
	*/
	eleventyConfig.addDataExtension("yaml", contents => yaml.safeLoad(contents));

	eleventyConfig.setFrontMatterParsingOptions({
		excerpt: true,
		// Optional, default is "---"
		excerpt_separator: "<!-- excerpt -->"
	});

	const md = require('./src/utils/markdown.js')
	eleventyConfig.setLibrary('md', md);





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

		return [...collection.getFilteredByGlob('./src/posts/**/*.md')]

	})

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
						case 'features':

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

	/*	eleventyConfig.addCollection("catList", function (collectionApi) {
			return collectionApi.getFilteredByTag("travaux");
		});*/


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

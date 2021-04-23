const { DateTime, Settings } = require('luxon')
const slugify = require('./slugify.js');
const cleanCSS = require('clean-css')
const md = require('./markdown.js')
const elasticlunr = require("elasticlunr");
require('./lunr.stemmer.support.js')(elasticlunr);
require('./lunr.fr.js')(elasticlunr);
const removeMd = require('remove-markdown');
Settings.defaultLocale = "fr";

module.exports = {
	/**
	 * Filters
	 * @link https://www.11ty.dev/docs/filters/
	 */


	slice: function (arr, a, b) {
		return arr.slice(a, b);
	},
	searchIndex: (collection) => {

		// what fields we'd like our index to consist of
		var index = elasticlunr(function () {
			this.use(lunr.fr);
			this.addField("title", { boost: 8 })
			this.addField("excerpt", { boost: 5 })
			this.addField("tags", { boost: 5 })
			this.addField("content", { boost: 2 })


			this.setRef("url");
		})

		// loop through each page and add it to the index
		collection.forEach((page) => {
			const frenchDate = DateTime.fromJSDate(page.data.date, {
				zone: 'utc',
			}).toFormat("dd LLLL yyyy")
			console.log(page.data.title, frenchDate)
			index.addDoc({
				url: page.url,
				title: page.data.title,
				excerpt: page.data.excerpt,
				tags: page.data.tags,
				//on accède au contenu en  markdown et on le transforme en texte brut.
				content: removeMd(page.template.frontMatter.content),
				date: frenchDate,
			});
		});

		return index.toJSON();
	},

	// Add markdownify filter with Markdown-it configuration
	markdownify: (markdownString) => { md.render(markdownString) },
	removeMD: (string) => { return (!string ? "" : removeMd(string)) },

	cs: (code) => {
		return new CleanCSS({}).minify(code).styles;
	},

	dateToPermalink: function (date) {
		return DateTime.fromJSDate(date, {
			zone: 'utc',
		}).toFormat('yyyy/MM')
	},



	/**
	 * dateToFormat allows specifiying display format at point of use.
	 * Example in footer: {{ build.timestamp | dateToFormat('yyyy') }} uses .timestamp
	 *  from the _data/build.js export and formats it via dateToFormat.
	 * Another usage example used in layouts: {{ post.date | dateToFormat("LLL dd, yyyy") }}
	 * And finally, example used in /src/posts/posts.json to format the permalink
	 *  when working with old /yyyy/MM/dd/slug format from Wordpress exports
	 */
	dateToFormat: (date, format) => {
		return DateTime.fromJSDate(date, {
			zone: 'utc',
		}).toFormat(String(format))
	},

	/**
   // Universal slug filter strips unsafe chars from URLs
   */
	slugify: (string) => {
		return slugify(string, {
			lower: true,
			replacement: '-',
			remove: /[*+~.·,()'"`´%!?¿:@]/g,
		})
	},

	/**
   * Pass ` | limit(x)` to a Collection loop to limit the number returned
   * Alt = ` | reverse | limit(x)` to return X most recent
   * Took the following filters from
   * @link https://www.youtube.com/watch?v=wV77GwOY22w&feature=share
   */
	limit: (arr, count = 5) => {
		return arr.slice(0, count)
	},

	/**
	 * Minify and inline CSS per a tip on 11ty: https://www.11ty.dev/docs/quicktips/inline-css/
	 */
	cssmin: (code) => {
		return new cleanCSS({}).minify(code).styles
	},
}

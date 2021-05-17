const remove = require('remove-markdown');

const { DateTime, Settings } = require('luxon')
const slugify = require('./slugify.js');
const cleanCSS = require('clean-css')
const md = require('./markdown.js')
const elasticlunr = require("elasticlunr");
require('./lunr.stemmer.support.js')(elasticlunr);
require('./lunr.fr.js')(elasticlunr);
Settings.defaultLocale = "fr";
var pd = require('pretty-data').pd;

module.exports = {
	/**
	 * Filters
	 * @link https://www.11ty.dev/docs/filters/
	 */


	slice: function (arr, a, b = 5) {
		return arr.slice(a, b);
	},
	searchIndex: (collection) => {
		// what fields we'd like our index to consist of
		var index = elasticlunr(function () {
			this.use(lunr.fr);
			this.addField("title", { boost: 8 })
			this.addField("description", { boost: 5 })
			this.addField("tags", { boost: 5 })
			this.addField("content", { boost: 2 })
			this.setRef("url");
		})

		// loop through each page and add it to the index
		collection.forEach((page) => {
			console.log("debug : " + typeof page.data.date)

			const frenchDate = DateTime.fromJSDate(page.data.date, { zone: 'utc' }).toFormat("dd LLLL yyyy")
			index.addDoc({
				url: page.url,
				title: page.data.title,
				description: page.data.description,
				tags: page.data.tags,
				//on accède au contenu en  markdown et on le transforme en texte brut.
				content: remove(page.template.frontMatter.content),
				date: page.data.date
			});
		});
		return index.toJSON();
	},

	// Add markdownify filter with Markdown-it configuration
	markdownify: (markdownString) => { md.render(markdownString) },

	removeMD: require('./removeMD.js'),

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
	dateToFormat: require('./dateToFormat.js'),

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


	minify: (data, format) => {
		switch (format) {
			case 'css':
				return pd.cssmin(data)
			case 'json':
				return pd.jsonmin(data)

			default:
				throw new Error("format non supporté")
		}

	}
}

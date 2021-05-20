var truchet = require('../truchet.js');

module.exports = {
  layout: "post",
  permalink: "blog/{{ page.date | dateToFormat('yyyy/MM') }}/{{ title | slugify }}/index.html",
  tags: [
    "post"
  ],

  author: "{{ meta.author }}",
  eleventyComputed: {

    placeholderImage: async (data) => {

      if (data.hero === undefined || data.hero === {}) {

        await truchet(null, "node", data.page.fileSlug).catch(console.error);
      }
      else { return false }
    },

    relative: (data) => {
      return (
        (new RegExp('posts/.*/.*$')).test(data.page.filePathStem)
          ?
          true
          :
          false
      )

    }
  }
};
module.exports = {
  eleventyComputed: {
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
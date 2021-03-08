//const Image = require("@11ty/eleventy-img");

module.exports = {

	default: {
		selector: '.template-post :not(picture) img[src]:not([srcset]):not([src$=".svg"]):not([src$=".gif"])',
		minWidth: 320,
		maxWidth: 1600,
		fallBackWidth: 640,
		sizes: '100vw',
		resizedImageUrl: (src, width) =>
			src.replace(/^(.*)(\.[^\.]+)$/, '$1-' + width + '.webp'),
		runBefore: (image, document) => {
			let url = image.getAttribute('src')
			const options = {
				widths: [320, 640, 1024, 1600],
				dryRun: false,
				formats: ['webp'],
				urlPath: '/assets/images/',
				outputDir: './src/assets/images/',
				filenameFormat: function (id, src, width, format, options) {
					const extension = path.extname(src);
					const name = path.basename(src, extension);
					return `${name}-${width}.webp`;
				}

			}

			try {
				Image('src' + decodeURI(url), options);
				let metadata = Image.statsSync('src' + decodeURI(url), options);
				const images = metadata.webp
				image.setAttribute('width', images[images.length - 1].width);
				image.setAttribute('height', images[images.length - 1].height);
				//image.setAttribute('src', stats.webp.url);
				image.dataset.responsiver = image.className;
				image.dataset.size = image.className;
			}
			catch (e) {
				console.log(e)
			}
		},
		runAfter: (image) => image,
		steps: 4,
		classes: ['img-default'],
		attributes: { loading: 'lazy', },
	},
	gallery_3x2: {
	},
}

const Image = require("@11ty/eleventy-img");
const path = require("path");

module.exports = {

	default: {
		selector: '.template-post :not(picture) img[src]:not([srcset]):not([src$=".svg"]):not([src$=".gif"])',
		minWidth: 320,
		maxWidth: 1600,
		fallBackWidth: 640,
		sizes: '100vw',
		resizedImageUrl: (src, width) =>
			src.
				replace(
					/\/assets\/images\//,
					'/assets/generatedImages/'
				).
				replace(
					/^(.*)(\.[^\.]+)$/,
					'$1-' + width + '.webp'),
		runBefore: (image, document) => {
			let url = image.getAttribute('src')
			console.log(image.getAttribute("title"))
			const options = {
				widths: [320, 640, 1024, 1600],
				dryRun: false,
				formats: ['webp'],
				urlPath: '/assets/images/',
				outputDir: './src/assets/generatedImages/',
				filenameFormat: function (id, src, width, format, options) {
					const extension = path.extname(src);
					const name = path.basename(src, extension);
					return `${name}-${width}.webp`;
				}
			}

			try {
				Image('src/' + decodeURI(url), options);
				let metadata = Image.statsSync('src/' + decodeURI(url), options);
				const images = metadata.webp
				image.setAttribute('width', images[images.length - 1].width);
				image.setAttribute('height', images[images.length - 1].height);
				image.dataset.responsiver = image.className;
				image.dataset.responsiveruRL = metadata.webp.url;
				image.dataset.size = image.className;
			}
			catch (e) {
				console.log(e)
			}
		},
		runAfter: (image, document) => {
			//image.setAttribute('src', image.dataset.responsiveruRL);
			//let caption = image.getAttribute("title");
			if (image.parentNode.nodeName === "p") {
				image.parentNode.replaceWith(figure);
			} else {
				image.replaceWith(figure);
			}

		},
		steps: 4,
		classes: ['img-default'],
		attributes: { loading: 'lazy', },
	},
	gallery_3x2: {
	},
}

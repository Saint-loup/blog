const Image = require("@11ty/eleventy-img");
const path = require("path");

module.exports = {

	default: {
		selector: '.template-post :not(picture) img[src]:not([srcset]):not([src$=".svg"]):not([src$=".gif"])',
		minWidth: 320,
		maxWidth: 1600,
		fallbackWidth: 576,
		sizes: '(max-width: 60rem) 90vw, 60rem',
		resizedImageUrl: (src, width) =>
			src.
				replace(
					/\/assets\/images\//,
					'/assets/generatedImages/'
				).
				replace(
					/^(.*)(\.[^\.]+)$/,
					'$1-' + width + '.jpeg'),
		runBefore: (image, document) => {
			let url = image.getAttribute('src')
			const options = {
				sharpWebpOptions: {
					quality: 90,
				},
				widths: [320, 576, 832, 1088, 1344, 1600],
				dryRun: false,
				formats: ['webp', 'jpeg'],
				urlPath: '/assets/images/',
				outputDir: './src/assets/generatedImages/',
				filenameFormat: function (id, src, width, format, options) {
					const extension = path.extname(src);
					const name = path.basename(src, extension);

					return `${name}-${width}.${format}`;
				}
			}

			//try {
			Image('src/' + decodeURI(url), options);
			let metadata = Image.statsSync('src/' + decodeURI(url), options);
			const images = metadata.jpeg
			image.setAttribute('width', images[images.length - 1].width);
			image.setAttribute('height', images[images.length - 1].height);
			image.dataset.responsiver = image.className;
			//image.dataset.responsiveruRL = metadata.jpg.url;
			image.dataset.size = image.className;

			/*}
			catch (e) {
				console.log(e)
			}*/
		},
		runAfter: (image, document) => {
			//image.setAttribute('src', image.dataset.responsiveruRL);
			//let caption = image.getAttribute("title");
			if (image.closest('.gallery')) {
				console.log("src :" + image.getAttribute('src'))
				const link = document.createElement("a");
				link.setAttribute("href", image.getAttribute('src'));
				link.appendChild(image.cloneNode(true));

				image.replaceWith(link);
			}


		},
		steps: 6,
		classes: ['img-default'],
		attributes: { loading: 'lazy', },
	},
	gallery_3x2: {
	},
}

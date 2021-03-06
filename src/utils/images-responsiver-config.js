const Image = require("@11ty/eleventy-img");
const path = require("path");

module.exports = {

	default: {
		selector: '.template-post-main :not(picture) img[src]:not([srcset]):not([src$=".svg"]):not([src$=".gif"])',
		minWidth: 360,
		maxWidth: 1920,
		fallbackWidth: 1280,
		sizes: '(max-width: 60rem) 90vw, 60rem',
		resizedImageUrl: (src, width) => {

			if (!(new RegExp('^/').test(src))) {
				src = "/assets/generatedImages/" + src
			}
			src = src.
				replace(
					/\/assets\/images\//,
					'/assets/generatedImages/'
				).
				replace(
					/^(.*)(\.[^\.]+)$/,
					'$1-' + width + '.jpg')
			return src
		},
		runBefore: (image, document) => {
			let originalPath = image.getAttribute('src')
			const options = {
				sharpWebpOptions: {
					quality: 90,
				},
				widths: [360, 750, 1140, 1530, 1920],
				dryRun: false,
				formats: ['webp', 'jpeg'],
				urlPath: '/assets/imagesToProcess/',
				outputDir: './dist/assets/generatedImages/',
				filenameFormat: function (id, src, width, format, options) {
					const extension = path.extname(src);
					const name = path.basename(src, extension);
					const modifiedFormat = (format === 'jpeg' ? 'jpg' : format);
					return `${name}-${width}.${modifiedFormat}`;
				}
			}

			// test et réécriture des images à chemin relatif
			try {
				const intermediaryPath = "src/assets/imagesToProcess/" + path.basename(originalPath)


				// fonction async mais ajouter await fout le bordel
				Image(decodeURI(intermediaryPath), options);
				let metadata = Image.statsSync(decodeURI(intermediaryPath), options);
				const images = metadata.jpeg
				image.setAttribute('width', images[images.length - 1].width);
				image.setAttribute('height', images[images.length - 1].height);
				image.dataset.responsiver = image.className;
				//image.dataset.responsiveruRL = metadata.jpg.url;
				image.dataset.size = image.className;

			}
			catch (e) {
				console.log(e)
				console.log('debug : ' + originalPath)
			}
		},
		runAfter: (image, document) => {
			//image.setAttribute('src', image.dataset.responsiveruRL);
			//let caption = image.getAttribute("title");
			if (image.closest('.rich-picture')) {
				const link = document.createElement("a");
				link.setAttribute("href", image.getAttribute('src'));
				link.appendChild(image.cloneNode(true));

				image.replaceWith(link);
			}


		},
		steps: 5,
		classes: ['img-default'],
		attributes: { loading: 'lazy', },
	},
	gallery_3x2: {
	},
}

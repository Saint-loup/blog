//const site = require('../_data/site.js');
//const imageSize = require('image-size');
const markdownIt = require('markdown-it');
const md = new markdownIt();
const Image = require("@11ty/eleventy-img");

const runBeforeHook = (image, document) => {
	/*
		let url = image.getAttribute('src')
		let stats = await Image(url, {
			widths: [640, 1280]
		});

		image.setAttribute('src', stats.jpg.url);*/
	console.log("prout")
	let documentBody = document.querySelector('body');
	let srcPath = documentBody.getAttribute('data-img-src');
	// TODO: get "dist/" from config
	let distPath = documentBody
		.getAttribute('data-img-dist')
		.replace(/^dist/, '');

	let imageSrc = image.getAttribute('src');
	if (imageSrc === null) {
		console.dir(image.attributes);
	}

	let imageUrl = '';

	if (imageSrc.match(/^(https?:)?\/\//)) {
		// TODO: find a way to get a remote image's dimensions
		// TODO: some images are local but have an absolute URL
		imageUrl = imageSrc;
	} else {
		let imageDimensions;
		if (imageSrc[0] === '/') {
			// TODO: get "src/" from Eleventy config
			imageDimensions = imageSize('./src' + imageSrc);
			imageUrl = site.url + imageSrc;
		} else {
			// This is a relative URL
			imageDimensions = imageSize(srcPath + imageSrc);
			imageUrl = site.url + distPath + imageSrc;
		}
		image.setAttribute('width', imageDimensions.width);
		image.setAttribute('height', imageDimensions.height);
		image.setAttribute('src', imageUrl);
	}

	image.dataset.responsiver = image.className;
};

const runAfterHook = (image, document) => {
	console.log("prout")

	/*	let imageUrl =
			image.getAttribute('data-pristine') || image.getAttribute('src');
		let caption = image.getAttribute('title');

		if (caption !== null) {
			caption = md.render(caption.trim());
		}

		let zoom = [...image.classList].indexOf('zoom') !== -1;

		if (caption || zoom) {
			const figure = document.createElement('figure');
			figure.classList.add(...image.classList);
			// TODO: decide weither classes should be removed from the image or not
			image.classList.remove(...image.classList);
			let figCaption = document.createElement('figcaption');
			figCaption.innerHTML =
				(caption ? caption : '') +
				(zoom
					? `<p class="zoom">&#128269; See <a href="${imageUrl}">full size</a></p>`
					: '');
			figure.appendChild(image.cloneNode(true));
			figure.appendChild(figCaption);

			image.replaceWith(figure);
		}*/
};

module.exports = {
	selector: 'article.template-post :not(picture) img[src]:not([srcset]):not([src$=".svg"])',

	runBefore: runBeforeHook,
	runAfter: runAfterHook,
	presets: {
		default: {
			fallbackWidth: 800,
			minWidth: 360,
			maxWidth: 1600,
			sizes: '(max-width: 67rem) 90vw, 60rem',
			attributes: {
				loading: 'lazy',
			},
		},
		twothirds: {
			fallbackWidth: 600,
			minWidth: 240,
			maxWidth: 1120,
			sizes: '(max-width: 20rem) 45vw, (max-width: 67rem) 60vw, 40rem',
			classes: ['twothirds'],
		},
		onehalf: {
			fallbackWidth: 400,
			minWidth: 180,
			maxWidth: 800,
			sizes: '(max-width: 67rem) 45vw, 30rem',
			classes: ['onehalf'],
		},
		onethird: {
			fallbackWidth: 300,
			minWidth: 120,
			maxWidth: 560,
			sizes: '(max-width: 20rem) 45vw, (max-width: 67rem) 30vw, 20rem',
			classes: ['onethird', 'right'],
		},
		onefourth: {
			fallbackWidth: 200,
			minWidth: 100,
			maxWidth: 400,
			sizes:
				'(max-width: 20rem) 45vw, (max-width: 30rem) 30vw, (max-width: 67rem) 22.5vw, 15rem',
			classes: ['onefourth', 'right'],
		},
		vignette: {
			fallbackWidth: 300,
			minWidth: 120,
			maxWidth: 560,
			sizes: '(max-width: 20rem) 45vw, (max-width: 67rem) 30vw, 20rem',
		},
		smallavatar: {
			fallbackWidth: 24,
			minWidth: 24,
			maxWidth: 48,
			steps: 3,
			sizes: '24px',
		},
		largeavatar: {
			fallbackWidth: 48,
			minWidth: 48,
			maxWidth: 96,
			steps: 3,
			sizes: '48px',
		},
		screenshot: {
			fallbackWidth: 300,
			minWidth: 300,
			maxWidth: 900,
			sizes: '(min-width:60em) 21.6em, (min-width: 40em) 36vw, 100vw',
			figure: 'never',
		},
		logo: {
			fallbackWidth: 300,
			minWidth: 120,
			maxWidth: 560,
			sizes: '(max-width: 20rem) 45vw, (max-width: 67rem) 30vw, 20rem',
			figure: 'never',
			classes: ['logo'],
		},
		gallery_3x2: {
			sizes: "(min-width: 45em) 400px, 100vw",
			classes: ["gallery-3x2"],
			fallbackWidth: 400,
			minWidth: 240,
			maxWidth: 400,
			steps: 3,
		}
	},
};


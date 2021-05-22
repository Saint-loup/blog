
module.exports = async function (target, slug) {

	const { createCanvas } = require('canvas')
	const fs = require('fs')
	const { pipeline } = require('stream/promises');
	const truchet = require('./truchet.js')

	const path = 'dist/assets/generatedImages/' + slug + '.png'

	const tileCanvas = await truchet(createCanvas(400, 240))
	await pipeline(
		tileCanvas.createPNGStream({ compressionLevel: 2 }),
		fs.createWriteStream(path)
	)
}
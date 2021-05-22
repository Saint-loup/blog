module.exports = function () {

	const truchet = require('../../truchet.js');
	[...document.querySelectorAll('canvas')].forEach(el => {
		truchet(el, {
			width: 200,
			height: 200,
			tile_size: 200,
			saturation: 30,
			seed: Math.random(),
			hue_amplitude: 1,
			hue_phase: 220,
			background: '#000',
			background_phase: 180,
			border: "#000000",
			grid_alpha: 0,
			should_shuffle: false,
			twist: 0,
			scramble: 0,
			curve_thickness: 2,
			curves_per_tile: 2,
		})
	});
}

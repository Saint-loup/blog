// https://observablehq.com/@xenomachina/truchet-tiles-variant-intertwined-quarter-circles@552

var makeRandomGenerator = require('random-seed');
var d3 = require("d3-color")

module.exports = async function (tileCanvas) {
	const rand = makeRandomGenerator.create()


	/*const saturation = 60;
	const seed = Math.random();
	const hue_amplitude = 90;
	const hue_phase = 180;
	const background = 'hue_phase';
	const background_phase = 90;
	const border = "#000000";
	const grid_alpha = 0;
	const should_shuffle = true;
	const curve_thickness = 1;
	const curves_per_tile = 7;
	const twist = 2;
	const scramble = 2;*/

	/*
		const should_shuffle = (rand.intBetween(0, 1) === 1 ? true : false)
		const tile_size = 30; // 32 viewport
		const curve_thickness = rand.intBetween(1, 30)
		const curves_per_tile = rand.intBetween(1, 10)
		const twist = rand.intBetween(0, 50)
		const scramble = rand.intBetween(0, 50)
	*/

	const height = 280;
	const width = 400;
	const tile_size = rand.intBetween(40, 80)
	const saturation = 30;
	const seed = Math.random();
	const hue_amplitude = rand.intBetween(10, 80);
	const hue_phase = 220;
	const background = '#649cac'
	const background_phase = 180;
	const border = "#000000";
	const grid_alpha = 0;
	const should_shuffle = false
	const twist = 0;
	const scramble = 0;
	const curve_thickness = 1;
	const curves_per_tile = 7;
	const segments = curves_per_tile + 1;



	const tileContext = tileCanvas.getContext('2d');
	tileCanvas.width = width
	tileCanvas.height = height
	const rForm = makeRandomGenerator("form:" + seed)
	const rScramble = makeRandomGenerator("scramble:" + seed)
	const rScramble2 = makeRandomGenerator("scramble2:" + seed)
	const rShuffle = makeRandomGenerator("shuffle:" + seed)
	const rTwist = makeRandomGenerator("twist:" + seed)

	tileContext.fillStyle = "#fff";
	tileContext.fillRect(0, 0, width, height);

	const curveWidth = Math.max(2, tile_size / segments * curve_thickness + 1);

	function shuffle(a) {

		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(rShuffle.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	}

	function circle(x, y, r, style) {
		tileContext.beginPath();
		tileContext.arc(x, y, r, 0, 2 * Math.PI);

		tileContext.lineWidth = curveWidth;
		tileContext.strokeStyle = border;
		tileContext.stroke();

		tileContext.lineWidth -= 2;
		tileContext.strokeStyle = style;
		tileContext.stroke();
	};

	function part(i, x, y, flip) {
		const hue = ((flip ? (segments - i) : i) / curves_per_tile) * hue_amplitude + hue_phase;
		circle(x, y, tile_size * i / segments, `hsla(${hue}, ${saturation}%, ${100 - saturation / 2}%, 1)`);
	}
	for (let y = 0; y < height; y += tile_size) {
		for (let x = 0; x < width; x += tile_size) {
			const curves = [];

			const otx = (rForm.random() < 0.5 ? 0 : tile_size);
			const oty = (rForm.random() < 0.5 ? 0 : tile_size);

			for (let i = 1; i <= Math.floor(segments / 2); i++) {
				// We do this outside of the if for more stability.
				const stx = (rScramble2.random() < 0.5 ? 0 : tile_size);
				const sty = (rScramble2.random() < 0.5 ? 0 : tile_size);
				const should_scramble = (i > 1 && rScramble.random() < scramble)
				const tx = should_scramble ? stx : otx;
				const ty = should_scramble ? sty : oty;

				const should_twist = (rTwist.random() < twist);

				const k = segments - i;
				const twist_i = (k != i) && (rTwist.random() < 0.5) && should_twist;
				const twist_k = (k != i) && (!twist_i) && should_twist;

				function do_twist(twist_this, z) {
					return twist_this ? tile_size - z : z;
				}
				curves.push([twist_i ? k : i, do_twist(twist_i, tx), ty]);
				if (k != i) {
					curves.push([twist_k ? i : k, do_twist(twist_k, tx), ty]);
					curves.unshift([twist_k ? i : k, do_twist(twist_k, tile_size - tx), tile_size - ty]);
				}
				curves.unshift([twist_i ? k : i, do_twist(twist_i, tile_size - tx), tile_size - ty]);
			}
			if (should_shuffle) shuffle(curves);

			// draw tile
			const parity = ((x + y) / tile_size) % 2;
			const bkg2 = d3.hsl(background);
			bkg2.h += background_phase;
			tileContext.fillStyle = background;
			tileContext.fillRect(0, 0, tile_size, tile_size);
			tileContext.fillStyle = bkg2.hex();
			tileContext.fillRect(parity ? 0 : tile_size / 2, 0, tile_size / 2, tile_size / 2);
			tileContext.fillRect(parity ? tile_size / 2 : 0, tile_size / 2, tile_size / 2, tile_size / 2);
			for (let j = 0; j < curves.length; ++j) {
				let [i, tx, ty] = curves[j];
				part(i, tx, ty, ((x + y + tx + ty) / tile_size) % 2);
			}

			tileContext.drawImage(tileCanvas, x, y);
			tileContext.save();
			tileContext.globalAlpha = grid_alpha;
			tileContext.beginPath();
			tileContext.rect(x, y, tile_size, tile_size);
			tileContext.strokeStyle = border;
			tileContext.stroke();
			tileContext.restore();
		}
	}


	return tileCanvas


}



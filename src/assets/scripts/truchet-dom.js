window.truchet = require('../../truchet.js');


document.addEventListener('DOMContentLoaded', async function () {
	[...document.querySelectorAll('canvas')].forEach(async (el) => {
		await truchet(el, JSON.parse(el.dataset.args));

	})
}
	, false)
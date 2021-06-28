const alpine = require('alpinejs')

require('./nav.js')();

require('./spin.js')();

const axios = require('axios').default;
document.querySelector("#contact").addEventListener('submit', async function () {
	event.preventDefault();
	var data = new FormData(this);
	console.log(data.entries());

	const res = await fetch('https://nuage.toutcequibouge.net/ocs/v2.php/apps/forms/api/v1/submission/insert', {
		method: 'POST',
		mode: 'cors',
		referrerPolicy: 'no-referrer',
		headers: {
			'Content-Type': 'application/json',
			'OCS-APIRequest': 'true',

		},
		body: data
	});
})

document.querySelector("#contact").addEventListener('formdata', (e) => {
	console.log('formdata fired');

	// Get the form data from the event object
	let data = e.formData;
	for (var value of data.values()) {
		console.log(value);
	}


});
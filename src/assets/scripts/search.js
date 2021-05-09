const elasticlunr = require("elasticlunr");
require('./lunr.stemmer.support.js')(elasticlunr);
require('./lunr.fr.js')(elasticlunr);

//"use strict"


async function search(e) {
	e.preventDefault();
	const value = this[0].value
	if (!window.searchIndex) {
		const rawIndex = await fetch("/index.min.json")
		window.searchIndex = elasticlunr.Index.load(await rawIndex.json());
	}
	results = window
		.searchIndex
		.search(value, {
			bool: "OR",
			expand: true
		});
	const noResultsEl = document.getElementById("noResultsFound");
	const container = document.querySelector('.post-wrapper');
	const postList = container.children[0];
	const searchList = container.children[1];

	if (!value) {
		console.log('champ vide')
		postList.style.display = 'block';
		searchList.style.display = 'none';

	}
	else {
		postList.style.display = 'none';
		searchList.style.display = 'block';
		while (searchList.hasChildNodes()) {
			searchList.removeChild(searchList.lastChild)
		}
		if (results.length > 0) {

			console.log('results')
			noResultsEl.style.display = "none";
			results.map((r) => {
				const doc = window.searchIndex.documentStore.getDoc(r.ref)
				let { url, title, excerpt, date } = doc;
				const el = document.createElement("li");
				el.classList.add('mb-8')
				el.innerHTML = `<div class="text-sm text-gray"><time datetime="">${date}</time></div><h2 class="text-2xl lg:text-3xl font-semibold leading-7 text-accent2"><a href="${url}" class="block hover:underline">${title}</a></h2><div class="text-sm leading-relaxed italic text-gray-700">${excerpt || ""}</div>`
				searchList.appendChild(el);
			});
		} else {
			console.log('no results')
			noResultsEl.style.display = "block";
		}
	}



};

document
	.getElementById("search-form")
	.addEventListener("submit", search);


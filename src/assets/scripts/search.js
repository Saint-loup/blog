
//"use strict"

const search = (e) => {
	const results = window
		.searchIndex
		.search(e.target.value, {
			bool: "OR",
			expand: true
		});

	const noResultsEl = document.getElementById("noResultsFound");
	const postlist = document.querySelector('.post-list');

	if (results) {
		noResultsEl.style.display = "none";
		results.map((r) => {
			const { id, title, description } = r.doc;
			const el = document.createElement("li");
			el.innerHTML = `
				<H2 class="text-2xl lg:text-3xl font-semibold leading-7 ">
					<a href="${id} " class="block hover:underline">
						${title}
					</a>
				</H2>
				`
			while (postlist.hasChildNodes()) {
				postlist.removeChild(postlist.lastChild)
			}

			postlist.appendChild(el);
		});
	} else {
		noResultsEl.style.display = "block";
	}
};

fetch("/search-index.json").then((response) => response.json().then((rawIndex) => {
	window.searchIndex = elasticlunr
		.Index
		.load(rawIndex);

	document
		.getElementById("searchField")
		.addEventListener("input", search);
}));
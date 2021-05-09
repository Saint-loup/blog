module.exports = function () {

	document.querySelector('h1').addEventListener('mouseover', function () {

		this.querySelector('a').innerHTML = 'Tout ce qui b<span>o</span>uge'
		const o = this.querySelector('a span')
		o.classList.add('spin')
		o.offsetWidth;
		o.style.transform = "rotate(2turn)"



	})




}
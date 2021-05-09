/*const alpine = require('alpinejs')
*/
document.body.style.setProperty('--navbar-height', document.querySelector('#menu-offcanvas').children.length);

function hideOnClickAway(updatedClassList, mainContent, button) {
	updatedClassList.remove('anim-nav-opened')
	mainContent.classList.remove('anim-nav-opened')
	button[0].classList.remove('hidden')
	button[1].classList.add('hidden')
	mainContent.removeEventListener("click", hideOnClickAway)

}

const button = document.querySelector('#menu-bar button #trigger-zone')

button.addEventListener("click", function () {
	const mainContent = document.querySelector('#content')

	const offCanvas = document.querySelector('#menu-offcanvas')
	const button = document.querySelectorAll('#menu-bar button svg')

	button[0].classList.toggle('hidden')
	button[1].classList.toggle('hidden')
	offCanvas.classList.toggle('anim-nav-opened')
	mainContent.classList.toggle('anim-nav-opened')

	const updatedClassList = document.querySelector('#menu-offcanvas').classList
	if ([...updatedClassList].includes('anim-nav-opened')) {
		mainContent.addEventListener("click", hideOnClickAway.bind(this, updatedClassList, mainContent, button))

	}
	else {
		mainContent.removeEventListener("click", hideOnClickAway)


	}





})

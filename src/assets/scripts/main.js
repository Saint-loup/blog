/*const alpine = require('alpinejs')
*/
document.body.style.setProperty('--navbar-height', document.querySelector('#menu-offcanvas').children.length);

function hideOnClickAway(updatedClassList, mainContent, buttonState) {
	updatedClassList.remove('anim-nav-opened')
	mainContent.classList.remove('anim-nav-opened')
	buttonState[0].classList.remove('hidden')
	buttonState[1].classList.add('hidden')
	button.toggleAttribute('aria-expanded')

	mainContent.removeEventListener("click", hideOnClickAway)

}

const button = document.querySelector('#menu-bar button #trigger-zone')

button.addEventListener("click", function () {
	const mainContent = document.querySelector('#content')

	const offCanvas = document.querySelector('#menu-offcanvas')
	const buttonState = document.querySelectorAll('#menu-bar button svg')
	const button = document.querySelector('#menu-bar button')

	buttonState[0].classList.toggle('hidden')
	buttonState[1].classList.toggle('hidden')
	button.toggleAttribute('aria-expanded')
	offCanvas.classList.toggle('anim-nav-opened')
	mainContent.classList.toggle('anim-nav-opened')

	const updatedClassList = document.querySelector('#menu-offcanvas').classList
	if ([...updatedClassList].includes('anim-nav-opened')) {
		mainContent.addEventListener("click", hideOnClickAway.bind(this, updatedClassList, mainContent, buttonState, button))

	}
	else {
		mainContent.removeEventListener("click", hideOnClickAway)


	}





})

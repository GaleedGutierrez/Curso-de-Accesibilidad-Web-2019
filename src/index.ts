// import "../styles/original-styles.scss";
import '../styles/styles.scss';

import {
	BUTTON_LEFT,
	BUTTON_RIGHT,
	PROJECT_CONTAINER,
	PROJECTS,
} from './utils/nodes';

function updateAria(entries: IntersectionObserverEntry[]) {
	entries.forEach((entry) => {
		const { target, isIntersecting } = entry;

		if (isIntersecting) {
			target.setAttribute('tabindex', '0');
		} else {
			target.setAttribute('tabindex', '-1');
		}

		target.ariaHidden = `${!isIntersecting}`;
	});
}

function getTranslateX() {
	const STYLE = getComputedStyle(PROJECT_CONTAINER);
	const MATRIX = new WebKitCSSMatrix(STYLE.transform);
	const CURRENT_LEFT = MATRIX.m41;

	return CURRENT_LEFT;
}

// /** Esta función se llama cuando la persona hace click en la fecha derecha del carousel para navegar a la derecha */
function clickRight() {
	const LAST_PROJECT = PROJECTS[PROJECTS.length - 1];

	if (LAST_PROJECT.getAttribute('aria-hidden') === 'false') return;

	const CURRENT_LEFT = getTranslateX();
	const NEW_VALUE = (CURRENT_LEFT - 270) / 10;

	PROJECT_CONTAINER.style.transform = `translateX(${NEW_VALUE}rem)`;
}

/** Esta funcion se llama cuando la persona hace click en la fecha izquierda del carousel para navegar a la izquierda */
function clickLeft() {
	const CURRENT_LEFT = getTranslateX();

	if (CURRENT_LEFT === 0) return;

	const NEW_VALUE = (CURRENT_LEFT + 270) / 10;

	PROJECT_CONTAINER.style.transform = `translateX(${NEW_VALUE}rem)`;
}

const OBSERVER = new IntersectionObserver(updateAria, { threshold: 1.0 });

PROJECTS.forEach((project) => {
	OBSERVER.observe(project);
});
BUTTON_LEFT.addEventListener('click', clickLeft);
BUTTON_RIGHT.addEventListener('click', clickRight);
// /** Esta función se llama cuando la persona hace click en el botón de enviar del formulario de contacto */
// function showNotification() {
// 	document.querySelector(".notification").style.display = "flex";
// 	setTimeout(function () {
// 		document.querySelector(".notification").style.display = "none";
// 	}, 3000);
// }

// /** Esta función se llama cuando la persona hace click en cualquier proyecto del carousel */
// function openModal() {
// 	document.querySelector(".modal-container").style.display = "flex";
// }

// /** Esta función se llama para cerrar el modal */
// function closeModal(e) {
// 	// si el click ocurrió dentro del las imágenes del carousel o dentro del modal, no se cierra el modal
// 	if (
// 		e.target.className.includes("project") ||
// 		e.target.className === "modal"
// 	) {
// 		return;
// 	}

// 	document.querySelector(".modal-container").style.display = "none";
// }

// /** Esta función se llama cuando la persona hace click en la fecha izquierda del carousel para navegar a la izquierda */
//

// window.onload = () => {
// 	document
// 		.querySelector(".arrow-right")
// 		.addEventListener("click", clickRight);
// 	document.querySelector(".arrow-left").addEventListener("click", clickLeft);
// 	document
// 		.querySelector(".send-button")
// 		.addEventListener("click", showNotification);
// 	document.querySelectorAll(".project").forEach((element) => {
// 		element.addEventListener("click", (e) => openModal(e));
// 	});
// 	document.body.addEventListener("click", (e) => closeModal(e));
// };

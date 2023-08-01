// import "../styles/original-styles.scss";
import '../styles/styles.scss';

import {
	BUTTON_LEFT,
	BUTTON_RIGHT,
	IMAGE_MODAL,
	MODAL_CLOSE,
	MODAL_CONTAINER,
	PROJECT_CONTAINER,
	PROJECTS,
} from './utils/nodes';

function openModal(event: Event) {
	if (
		(event as KeyboardEvent).code !== 'Enter' &&
		(event as KeyboardEvent).code !== undefined
	) {
		return;
	}

	event.stopPropagation();

	const TARGET = event.target as HTMLElement;
	const IS_BUTTON = TARGET.nodeName === 'BUTTON';
	const IMAGE = IS_BUTTON
		? (TARGET.parentElement?.querySelector('img') as HTMLImageElement)
		: (TARGET as HTMLImageElement);

	IMAGE_MODAL.src = IMAGE.src;
	IMAGE_MODAL.alt = IMAGE.alt;
	MODAL_CONTAINER.classList.add('is-visible-flex');
}

function closeModal(event: Event) {
	const TARGET = event.target as HTMLElement;
	const CLASS_NAME = TARGET.className;
	const IS_MODAL =
		CLASS_NAME.includes('modal') || CLASS_NAME.includes('project');
	const IS_BUTTON = TARGET.nodeName === 'BUTTON';

	if (IS_MODAL && !IS_BUTTON) return;

	MODAL_CONTAINER.classList.remove('is-visible-flex');
}

function listenToEsc(event: KeyboardEvent) {
	const ESCAPE_KEY = 'Escape';

	if (event.code === ESCAPE_KEY) {
		closeModal(event);
	}
}

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

const OBSERVER = new IntersectionObserver(updateAria, { threshold: 0.6 });

PROJECTS.forEach((project) => {
	OBSERVER.observe(project);
	project.addEventListener('click', openModal);
	// project.addEventListener('keyup', openModal);
});
BUTTON_LEFT.addEventListener('click', clickLeft);
BUTTON_RIGHT.addEventListener('click', clickRight);
MODAL_CLOSE.addEventListener('click', closeModal);
globalThis.addEventListener('click', closeModal);
globalThis.addEventListener('keydown', listenToEsc);

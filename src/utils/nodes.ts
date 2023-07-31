/* eslint-disable padding-line-between-statements */
const $ = (selector: string) => document.querySelector(selector);
const $$ = (selector: string) => document.querySelectorAll(selector);

export const BUTTON_LEFT = $('#button-left') as HTMLButtonElement;
export const BUTTON_RIGHT = $('#button-right') as HTMLButtonElement;
export const PROJECT_CONTAINER = $('#project-container') as HTMLUListElement;
export const PROJECTS = Array.from(
	$$('.g-portfolio__button-project'),
) as HTMLButtonElement[];

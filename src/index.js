import "../styles//original-styles.scss";

/** Esta función se llama cuando la persona hace click en el botón de enviar del formulario de contacto */
function showNotification() {
	document.querySelector(".notification").style.display = "flex";
	setTimeout(function () {
		document.querySelector(".notification").style.display = "none";
	}, 3000);
}

/** Esta función se llama cuando la persona hace click en la fecha derecha del carousel para navegar a la derecha */
function clickRight() {
	const currentLeft = parseInt(
		getComputedStyle(document.querySelector(".project-container")).left,
		10,
	);

	if (currentLeft < -270) {
		//si el valor de izquierda es menor a -270, para de mover el contenido
		return;
	}

	const newValue = currentLeft - 270; //270 toma en cuenta el tamaño de la imagen mas sus margines

	document.querySelector(".project-container").style.left = `${newValue}px`;
}

/** Esta función se llama cuando la persona hace click en cualquier proyecto del carousel */
function openModal() {
	document.querySelector(".modal-container").style.display = "flex";
}

/** Esta función se llama para cerrar el modal */
function closeModal(e) {
	// si el click ocurrió dentro del las imágenes del carousel o dentro del modal, no se cierra el modal
	if (
		e.target.className.includes("project") ||
		e.target.className === "modal"
	) {
		return;
	}

	document.querySelector(".modal-container").style.display = "none";
}

/** Esta función se llama cuando la persona hace click en la fecha izquierda del carousel para navegar a la izquierda */
function clickLeft() {
	const currentLeft = parseInt(
		getComputedStyle(document.querySelector(".project-container")).left,
		10,
	);

	if (currentLeft === 0) {
		//si el valor de izquierda es 0, retornar para no seguir moviendo el contenido
		return;
	}

	const newValue = currentLeft + 270;

	document.querySelector(".project-container").style.left = `${newValue}px`;
}

window.onload = () => {
	document
		.querySelector(".arrow-right")
		.addEventListener("click", clickRight);
	document.querySelector(".arrow-left").addEventListener("click", clickLeft);
	document
		.querySelector(".send-button")
		.addEventListener("click", showNotification);
	document.querySelectorAll(".project").forEach((element) => {
		element.addEventListener("click", (e) => openModal(e));
	});
	document.body.addEventListener("click", (e) => closeModal(e));
};

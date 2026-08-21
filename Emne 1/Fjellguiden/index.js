const menu = document.getElementById("site-nav");
const menuButton = document.querySelector(".nav-toggle");

menuButton.addEventListener("click", e => {
	e.preventDefault();

	const isOpen = menuButton.getAttribute("aria-expanded") === "true";
	menuButton.setAttribute("aria-expanded", String(!isOpen));
	menu.hidden = isOpen;
});

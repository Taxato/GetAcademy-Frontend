const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector("#site-nav");

menuButton.addEventListener("click", () => {
	const isOpen = menuButton.getAttribute("aria-expanded") === "true";

	menuButton.setAttribute("aria-expanded", String(!isOpen));
	menu.hidden = isOpen;
});

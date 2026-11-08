const toggle = document.querySelector(".nav-toggle");
const menu = document.querySelector("#menu");

toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  menu.classList.toggle("is-open", !open);
});

menu.querySelectorAll(".has-sub > a").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (!window.matchMedia("(max-width: 900px)").matches) return;
    event.preventDefault();
    const item = link.parentElement;
    const open = item.classList.toggle("is-open");
    link.setAttribute("aria-expanded", String(open));
  });
});

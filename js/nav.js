const toggle = document.querySelector(".nav-toggle");
const menu = document.querySelector("#menu");
const narrow = () => window.matchMedia("(max-width: 900px)").matches;

function closeSubs(except) {
  menu.querySelectorAll(".has-sub.is-open").forEach((item) => {
    if (item === except) return;
    item.classList.remove("is-open");
    const link = item.querySelector(":scope > a");
    if (link) link.setAttribute("aria-expanded", "false");
  });
}

toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  menu.classList.toggle("is-open", !open);
  if (open) closeSubs();
});

menu.querySelectorAll(".has-sub > a").forEach((link) => {
  link.addEventListener("click", (event) => {
    const item = link.parentElement;
    const placeholder = (link.getAttribute("href") || "").startsWith("#");
    if (!narrow() && !placeholder) return;

    event.preventDefault();
    const open = !item.classList.contains("is-open");
    closeSubs(open ? item : null);
    item.classList.toggle("is-open", open);
    link.setAttribute("aria-expanded", String(open));
  });
});

document.addEventListener("click", (event) => {
  if (menu.contains(event.target) || toggle.contains(event.target)) return;
  closeSubs();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeSubs();
});

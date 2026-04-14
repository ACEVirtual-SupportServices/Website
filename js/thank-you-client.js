var hamburger = document.getElementById("hamburger");
var drawer = document.getElementById("mobile-drawer");
var overlay = document.getElementById("overlay");
var drawerClose = document.getElementById("drawer-close");
var isOpen = false;
function openDrawer() {
  isOpen = true;
  drawer.classList.add("open");
  overlay.classList.add("open");
  hamburger.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}
function closeDrawer() {
  isOpen = false;
  drawer.classList.remove("open");
  overlay.classList.remove("open");
  hamburger.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}
hamburger.addEventListener("click", function (e) {
  e.stopPropagation();
  isOpen ? closeDrawer() : openDrawer();
});
drawerClose.addEventListener("click", function (e) {
  e.stopPropagation();
  closeDrawer();
});
overlay.addEventListener("click", closeDrawer);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && isOpen) closeDrawer();
});
drawer.querySelectorAll("a").forEach(function (a) {
  a.addEventListener("click", closeDrawer);
});

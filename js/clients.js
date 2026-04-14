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

// Accordion — service features + process steps
document
  .querySelectorAll(".svc-toggle, .step-acc-trigger")
  .forEach(function (btn) {
    btn.addEventListener("click", function () {
      var expanded = this.getAttribute("aria-expanded") === "true";
      var body = document.getElementById(this.getAttribute("aria-controls"));
      this.setAttribute("aria-expanded", expanded ? "false" : "true");
      body.classList.toggle("open", !expanded);
    });
  });
// Progressive enhancement: mark page as JS-ready, then run fade-up observer
document.documentElement.classList.add("js-ready");
var faders = document.querySelectorAll(".fade-up");
var obs = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.05 },
);
faders.forEach(function (el) {
  obs.observe(el);
});

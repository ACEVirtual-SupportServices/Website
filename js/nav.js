/* Shared mobile menu (hamburger + drawer), used by every page.
   Needs the markup from build.py: #hamburger, #mobile-drawer, #overlay, #drawer-close.

   Older page scripts may still carry their own copy of this code. This file
   takes over the hamburger click so two copies can never fight (one opening,
   the other closing). Delete the old copy from the page script when convenient. */
(function () {
  var hamburger = document.getElementById("hamburger");
  var drawer = document.getElementById("mobile-drawer");
  var overlay = document.getElementById("overlay");
  var drawerClose = document.getElementById("drawer-close");
  if (!hamburger || !drawer || !overlay) return;

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

  // Capture phase + stopImmediatePropagation: this copy is the only one that
  // runs, even if an old page script still has its own hamburger code.
  hamburger.addEventListener(
    "click",
    function (e) {
      e.stopImmediatePropagation();
      e.stopPropagation();
      isOpen ? closeDrawer() : openDrawer();
    },
    true
  );
  if (drawerClose) {
    drawerClose.addEventListener("click", function (e) {
      e.stopPropagation();
      closeDrawer();
    });
  }
  overlay.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isOpen) closeDrawer();
  });
  drawer.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeDrawer);
  });
  // Rotating a tablet / widening the window while the menu is open
  window.addEventListener("resize", function () {
    if (isOpen && window.innerWidth > 960) closeDrawer();
  });
})();
/* Newsletter pop-up
   Shows the page's existing MailerLite form (#newsletter .nl-form) in a modal
   once the visitor has scrolled 50% of the page. Shown once per visitor.
   Works on any page that has the #newsletter section (clients, VSPs). */
(function () {
  var TRIGGER = 0.5; // fraction of the page scrolled
  var KEY = "ace-newsletter-popup";

  var section = document.getElementById("newsletter");
  var card = section && section.querySelector(".nl-form");
  if (!card) return;

  function seen() {
    try {
      return localStorage.getItem(KEY) === "1";
    } catch (e) {
      return false;
    }
  }
  function markSeen() {
    try {
      localStorage.setItem(KEY, "1");
    } catch (e) {}
  }
  if (seen()) return;

  // Build the modal, reusing the section's own heading and intro text
  var title = section.querySelector(".nl-title");
  var sub = section.querySelector(".nl-sub");
  var overlay = document.createElement("div");
  overlay.className = "nl-popup-overlay";
  overlay.innerHTML =
    '<div class="nl-popup" role="dialog" aria-modal="true" aria-labelledby="nl-popup-title">' +
    '<button class="nl-popup-close" type="button" aria-label="Close newsletter pop-up">✕</button>' +
    '<h2 class="nl-popup-title" id="nl-popup-title"></h2>' +
    '<p class="nl-popup-sub"></p>' +
    '<div class="nl-popup-body"></div>' +
    "</div>";
  document.body.appendChild(overlay);

  var closeBtn = overlay.querySelector(".nl-popup-close");
  var body = overlay.querySelector(".nl-popup-body");
  if (title) overlay.querySelector(".nl-popup-title").innerHTML = title.innerHTML;
  if (sub) overlay.querySelector(".nl-popup-sub").textContent = sub.textContent;

  var marker = document.createComment("nl-form");
  var shown = false;
  var isOpen = false;
  var lastFocus = null;

  function open() {
    shown = true;
    isOpen = true;
    markSeen();
    window.removeEventListener("scroll", onScroll);
    lastFocus = document.activeElement;
    // Move the one real form into the modal (keeps MailerLite's handlers attached)
    card.parentNode.insertBefore(marker, card);
    card.classList.add("visible"); // fade-up elements stay invisible otherwise
    body.appendChild(card);
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;
    overlay.classList.remove("open");
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    // Put the form back in the page once the fade-out has finished
    setTimeout(function () {
      if (marker.parentNode) marker.parentNode.insertBefore(card, marker);
    }, 320);
  }

  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", function (e) {
    if (!isOpen) return;
    if (e.key === "Escape") {
      close();
      return;
    }
    if (e.key !== "Tab") return;
    var f = overlay.querySelectorAll(
      'button:not([disabled]), input:not([type="hidden"]):not([disabled]), select, textarea, a[href]'
    );
    var visible = Array.prototype.filter.call(f, function (el) {
      return el.offsetParent !== null;
    });
    if (!visible.length) return;
    var first = visible[0];
    var last = visible[visible.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  function scrolled() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    return max > 0 ? window.scrollY / max : 0;
  }
  function sectionInView() {
    var r = section.getBoundingClientRect();
    return r.top < window.innerHeight && r.bottom > 0;
  }
  function drawerOpen() {
    var d = document.getElementById("mobile-drawer");
    return !!(d && d.classList.contains("open"));
  }

  var ticking = false;
  function onScroll() {
    if (ticking || shown) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      if (scrolled() < TRIGGER) return;
      if (sectionInView()) {
        // They can already see the form on the page, so don't interrupt
        shown = true;
        window.removeEventListener("scroll", onScroll);
        return;
      }
      if (drawerOpen()) return; // try again on the next scroll
      open();
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  // If the visitor uses a menu/anchor link that jumps past the trigger point
  // (e.g. "Get Vetted"), the smooth scroll would sweep through 50% and pop the
  // form up over where they were heading. Treat that as intent, not browsing.
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute("href").length < 2 || shown) return;
    var target = null;
    try {
      target = document.querySelector(a.getAttribute("href"));
    } catch (err) {}
    if (!target) return;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var dest = target.getBoundingClientRect().top + window.scrollY;
    if (max > 0 && dest / max >= TRIGGER) {
      shown = true;
      window.removeEventListener("scroll", onScroll);
    }
  });
})();
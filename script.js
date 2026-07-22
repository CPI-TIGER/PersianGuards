(function () {
  "use strict";

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Nav scroll state ---------- */
  var nav = document.getElementById("siteNav");
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- Ambient gold dust particles ---------- */
  var dustLayer = document.getElementById("dustLayer");
  if (dustLayer && !prefersReducedMotion) {
    var MOTE_COUNT = 26;
    for (var i = 0; i < MOTE_COUNT; i++) {
      var mote = document.createElement("span");
      mote.className = "dust-mote";
      var left = Math.random() * 100;
      var duration = 10 + Math.random() * 14;
      var delay = Math.random() * 14;
      var drift = (Math.random() - 0.5) * 120;
      var size = 1.5 + Math.random() * 2.5;
      mote.style.left = left + "%";
      mote.style.animationDuration = duration + "s";
      mote.style.animationDelay = delay + "s";
      mote.style.width = size + "px";
      mote.style.height = size + "px";
      mote.style.setProperty("--drift", drift + "px");
      dustLayer.appendChild(mote);
    }
  }

  /* ---------- Cuneiform-style decorative background columns ---------- */
  (function drawFarColumns() {
    var g = document.querySelector(".gate-bg-columns");
    if (!g) return;
    var xs = [190, 250, 950, 1010];
    xs.forEach(function (x) {
      var col = document.createElementNS("http://www.w3.org/2000/svg", "line");
      col.setAttribute("x1", x);
      col.setAttribute("y1", 600);
      col.setAttribute("x2", x);
      col.setAttribute("y2", 300);
      g.appendChild(col);
    });
  })();

  /* ---------- TeamSpeak connect modal ----------
     TeamSpeak uses the ts3server:// protocol, which the OS hands off to
     the installed TeamSpeak client. We can't detect success/failure of a
     custom protocol handler, so we optimistically trigger the connection
     and show a helper dialog in case the app isn't installed. */
  var tsModal = document.getElementById("tsModal");
  var tsButtons = ["tsHeroBtn", "tsCardBtn", "tsFinalBtn"]
    .map(function (id) {
      return document.getElementById(id);
    })
    .filter(Boolean);

  function openTsModal() {
    if (!tsModal) return;
    tsModal.classList.add("is-open");
    tsModal.setAttribute("aria-hidden", "false");
  }
  function closeTsModal() {
    if (!tsModal) return;
    tsModal.classList.remove("is-open");
    tsModal.setAttribute("aria-hidden", "true");
  }

  tsButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      // Let the browser attempt ts3server://PersianGuards.ir natively,
      // then show the helper dialog shortly after in case nothing opened.
      window.setTimeout(openTsModal, 900);
    });
  });

  if (tsModal) {
    tsModal.querySelectorAll("[data-close]").forEach(function (el) {
      el.addEventListener("click", closeTsModal);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeTsModal();
    });
  }
})();

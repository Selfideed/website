/* SelfIDeed: shared header, footer and language switch.
   Every page has <div id="site-header"></div> and <div id="site-footer"></div>,
   <html lang="en|nl"> and <body data-path="..."> (path inside the language folder, "" for home).
   Edit the menu and footer here, once, for all pages. */
(function () {
  "use strict";

  var APP_URL = "https://test.selfideed.com";
  var LANGS = ["en", "nl"];

  var script = document.currentScript;
  var ROOT = script ? script.src.replace(/assets\/js\/layout\.js.*$/, "") : "/";
  var lang = (document.documentElement.lang || "en").slice(0, 2);
  if (LANGS.indexOf(lang) === -1) lang = "en";
  var path = document.body.getAttribute("data-path") || "";
  var isHome = path === "";
  var home = ROOT + lang + "/";

  var T = {
    en: {
      skip: "Skip to content",
      homeLabel: "SelfIDeed home",
      nav: [["Features", "#features"], ["How it works", "#how-it-works"], ["Business", "#business"], ["About us", "about/"], ["Contact", "contact/"]],
      start: "Start your photo",
      menu: "Menu", close: "Close menu",
      langName: { en: "English", nl: "Nederlands" },
      langLabel: "Language",
      tagline: "Official passport, visa and ID photos, made with your phone. For people anywhere in the world.",
      cols: [
        ["Product", [["Features", "#features"], ["How it works", "#how-it-works"], ["Countries", "countries/"], ["FAQ", "#faq"]]],
        ["Company", [["About us", "about/"], ["Business", "#business"], ["Contact", "contact/"]]],
        ["Legal", [["Terms", "legal/#terms"], ["Privacy", "legal/#privacy"], ["Cookies", "legal/#cookies"], ["Cookie settings", "@cookies"]]],
        ["Contact", [["info@selfideed.com", "mailto:info@selfideed.com"]]]
      ],
      rights: "All rights reserved."
    },
    nl: {
      skip: "Naar de inhoud",
      homeLabel: "SelfIDeed home",
      nav: [["Functies", "#features"], ["Zo werkt het", "#how-it-works"], ["Zakelijk", "#business"], ["Over ons", "about/"], ["Contact", "contact/"]],
      start: "Maak je foto",
      menu: "Menu", close: "Menu sluiten",
      langName: { en: "English", nl: "Nederlands" },
      langLabel: "Taal",
      tagline: "Officiële pas-, visum- en ID-foto's, gemaakt met je telefoon. Voor mensen overal ter wereld.",
      cols: [
        ["Product", [["Functies", "#features"], ["Zo werkt het", "#how-it-works"], ["Landen", "countries/"], ["Veelgestelde vragen", "#faq"]]],
        ["Bedrijf", [["Over ons", "about/"], ["Zakelijk", "#business"], ["Contact", "contact/"]]],
        ["Juridisch", [["Voorwaarden", "legal/#terms"], ["Privacy", "legal/#privacy"], ["Cookies", "legal/#cookies"], ["Cookie-instellingen", "@cookies"]]],
        ["Contact", [["info@selfideed.com", "mailto:info@selfideed.com"]]]
      ],
      rights: "Alle rechten voorbehouden."
    }
  };
  var t = T[lang];

  function href(target) {
    if (/^(mailto:|https?:)/.test(target)) return target;
    if (target.charAt(0) === "#") return isHome ? target : home + target;
    return home + target;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function langLinks() {
    return LANGS.map(function (l) {
      var cur = l === lang;
      return '<a href="' + ROOT + l + "/" + path + '" hreflang="' + l + '" lang="' + l + '" data-lang="' + l + '"' +
        (cur ? ' aria-current="true"' : "") + ' title="' + esc(t.langName[l]) + '">' + l.toUpperCase() + "</a>";
    }).join("");
  }

  var icons = {
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M4 8h16M4 16h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>'
  };

  /* ---------- Header ---------- */
  var headerSlot = document.getElementById("site-header");
  if (headerSlot) {
    var navItems = t.nav.map(function (n) { return '<li><a href="' + href(n[1]) + '">' + esc(n[0]) + "</a></li>"; }).join("");
    var mobileItems = t.nav.map(function (n) { return '<li><a class="mobile-menu__link" href="' + href(n[1]) + '">' + esc(n[0]) + "</a></li>"; }).join("");
    headerSlot.outerHTML =
      '<a class="skip-link" href="#main">' + esc(t.skip) + "</a>" +
      '<header class="site-header" id="top">' +
        '<div class="site-header__inner">' +
          '<a class="site-header__logo" href="' + home + '" aria-label="' + esc(t.homeLabel) + '">' +
            '<img src="' + ROOT + 'assets/img/logo/logo-horizontal.svg" alt="SelfIDeed" width="160" height="28">' +
          "</a>" +
          '<nav class="site-nav" aria-label="Main"><ul>' + navItems + "</ul></nav>" +
          '<div class="site-header__end">' +
            '<div class="lang-switch" role="group" aria-label="' + esc(t.langLabel) + '">' + langLinks() + "</div>" +
            '<a class="btn btn--primary btn--small" href="' + APP_URL + '" data-app-link>' + esc(t.start) + "</a>" +
            '<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="' + esc(t.menu) + '">' + icons.menu + "</button>" +
          "</div>" +
        "</div>" +
      "</header>" +
      '<div class="mobile-menu" id="mobile-menu" hidden>' +
        '<nav aria-label="Main"><ul>' + mobileItems + "</ul></nav>" +
        '<div class="mobile-menu__lang" role="group" aria-label="' + esc(t.langLabel) + '">' +
          LANGS.map(function (l) {
            return '<a href="' + ROOT + l + "/" + path + '" hreflang="' + l + '" lang="' + l + '" data-lang="' + l + '"' + (l === lang ? ' aria-current="true"' : "") + ">" + esc(t.langName[l]) + "</a>";
          }).join("") +
        "</div>" +
      "</div>";

    var header = document.querySelector(".site-header");
    var toggle = document.querySelector(".menu-toggle");
    var menu = document.getElementById("mobile-menu");

    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 4); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var setMenu = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? t.close : t.menu);
      toggle.innerHTML = open ? icons.close : icons.menu;
      document.body.classList.toggle("menu-open", open);
      if (open) { menu.hidden = false; requestAnimationFrame(function () { menu.classList.add("is-open"); }); }
      else { menu.classList.remove("is-open"); setTimeout(function () { if (!menu.classList.contains("is-open")) menu.hidden = true; }, 260); }
    };
    toggle.addEventListener("click", function () { setMenu(toggle.getAttribute("aria-expanded") !== "true"); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") { setMenu(false); toggle.focus(); } });
  }

  /* ---------- Footer ---------- */
  var footerSlot = document.getElementById("site-footer");
  if (footerSlot) {
    var cols = t.cols.map(function (c) {
      return "<div><h2>" + esc(c[0]) + "</h2><ul>" + c[1].map(function (l) {
        if (l[1] === "@cookies") return '<li><button type="button" data-cookie-settings>' + esc(l[0]) + "</button></li>";
        return '<li><a href="' + href(l[1]) + '">' + esc(l[0]) + "</a></li>";
      }).join("") + "</ul></div>";
    }).join("");
    footerSlot.outerHTML =
      '<footer class="site-footer">' +
        '<div class="container container--wide">' +
          '<div class="site-footer__top">' +
            '<div class="site-footer__brand">' +
              '<img src="' + ROOT + 'assets/img/logo/logo-primary.svg" alt="SelfIDeed. Passport &amp; Visa Photos. Worldwide." width="160" height="33">' +
              "<p>" + esc(t.tagline) + "</p>" +
            "</div>" +
            '<div class="site-footer__cols">' + cols + "</div>" +
          "</div>" +
          '<div class="site-footer__bottom">' +
            "<p>© " + new Date().getFullYear() + " SelfIDeed. " + esc(t.rights) + "</p>" +
            '<div class="footer-lang" role="group" aria-label="' + esc(t.langLabel) + '">' + icons.globe +
              LANGS.map(function (l) {
                return '<a href="' + ROOT + l + "/" + path + '" hreflang="' + l + '" lang="' + l + '" data-lang="' + l + '"' + (l === lang ? ' aria-current="true"' : "") + ">" + esc(t.langName[l]) + "</a>";
              }).join("") +
            "</div>" +
          "</div>" +
        "</div>" +
      "</footer>";
  }

  /* ---------- Remember the language the visitor picks ---------- */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[data-lang]");
    if (!a) return;
    var l = a.getAttribute("data-lang");
    document.cookie = "sid_lang=" + l + ";path=/;max-age=31536000;SameSite=Lax";
    try { localStorage.setItem("sid_lang", l); } catch (err) { /* storage unavailable */ }
  });

  /* All app buttons on the page use the same address. */
  Array.prototype.forEach.call(document.querySelectorAll("[data-app-link]"), function (a) { a.href = APP_URL; });

  window.SelfIDeed = { APP_URL: APP_URL, ROOT: ROOT, lang: lang };
})();

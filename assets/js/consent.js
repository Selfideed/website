/* SelfIDeed: cookie consent (EU) and Google Analytics 4.
   - Google Consent Mode v2: everything is denied until the visitor accepts.
   - GA4 only loads after consent AND when GA_ID is filled in.
   - "Cookie settings" in the footer (data-cookie-settings) opens the banner again. */
(function () {
  "use strict";

  var GA_ID = ""; // e.g. "G-XXXXXXXXXX". Leave empty until the GA4 property exists.
  var KEY = "sid_consent";
  var VERSION = 1; // raise this when the cookie policy changes to ask again

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  gtag("consent", "default", {
    ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
    analytics_storage: "denied", wait_for_update: 500
  });

  var lang = (document.documentElement.lang || "en").slice(0, 2);
  var T = {
    en: {
      title: "Cookies on SelfIDeed",
      text: "We'd like to use analytics cookies to see how people use this site, so we can improve it. They are only set if you accept. ",
      more: "Read our cookie policy",
      accept: "Accept", reject: "Reject"
    },
    nl: {
      title: "Cookies op SelfIDeed",
      text: "We willen analytische cookies gebruiken om te zien hoe deze site wordt gebruikt, zodat we hem kunnen verbeteren. Ze worden alleen geplaatst als je akkoord gaat. ",
      more: "Lees ons cookiebeleid",
      accept: "Akkoord", reject: "Weigeren"
    }
  };
  var t = T[lang] || T.en;

  function read() {
    try { var v = JSON.parse(localStorage.getItem(KEY)); return v && v.v === VERSION ? v : null; }
    catch (e) { return null; }
  }
  function save(analytics) {
    try { localStorage.setItem(KEY, JSON.stringify({ v: VERSION, analytics: analytics, at: new Date().toISOString() })); }
    catch (e) { /* storage unavailable: ask again next visit */ }
  }

  var gaLoaded = false;
  function apply(analytics) {
    gtag("consent", "update", { analytics_storage: analytics ? "granted" : "denied" });
    if (analytics && GA_ID && !gaLoaded) {
      gaLoaded = true;
      var s = document.createElement("script");
      s.async = true;
      s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_ID);
      document.head.appendChild(s);
      gtag("js", new Date());
      gtag("config", GA_ID, { anonymize_ip: true });
    }
  }

  var banner = null;
  function legalUrl() { return window.SelfIDeed ? window.SelfIDeed.url("legal/#cookies") : "/" + lang + "/legal/#cookies"; }
  function show() {
    if (banner) return;
    banner = document.createElement("section");
    banner.className = "consent";
    banner.setAttribute("role", "region");
    banner.setAttribute("aria-label", t.title);
    banner.innerHTML =
      "<h2>" + t.title + "</h2>" +
      "<p>" + t.text + '<a href="' + legalUrl() + '">' + t.more + "</a>.</p>" +
      '<div class="consent__actions">' +
        '<button type="button" class="btn btn--secondary" data-consent="reject">' + t.reject + "</button>" +
        '<button type="button" class="btn btn--secondary" data-consent="accept">' + t.accept + "</button>" +
      "</div>";
    document.body.appendChild(banner);
    requestAnimationFrame(function () { banner.classList.add("is-visible"); });
    banner.addEventListener("click", function (e) {
      var b = e.target.closest("[data-consent]");
      if (!b) return;
      var ok = b.getAttribute("data-consent") === "accept";
      save(ok); apply(ok); hide();
    });
  }
  function hide() {
    if (!banner) return;
    var b = banner; banner = null;
    b.classList.remove("is-visible");
    setTimeout(function () { b.remove(); }, 260);
  }

  function init() {
    var c = read();
    if (c) apply(c.analytics); else show();
    document.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("[data-cookie-settings]")) show();
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();

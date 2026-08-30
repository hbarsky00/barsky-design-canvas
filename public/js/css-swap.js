// Promotes Beasties' deferred stylesheet preloads to real stylesheets.
//
// Beasties emits onload="this.rel='stylesheet'" on each <link rel=preload>.
// That is an inline event handler, which CSP blocks once script-src drops
// 'unsafe-inline' — and a hash cannot cover it, only the 'unsafe-hashes'
// keyword can. The swap lives here instead, in a file 'self' already allows.
(function () {
  function swap() {
    var links = document.querySelectorAll('link[rel="preload"][as="style"]');
    for (var i = 0; i < links.length; i++) links[i].rel = "stylesheet";
  }
  // The critical CSS is already inlined, so the page has painted by the time
  // this runs. Swapping here applies the rest without ever blocking render.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", swap);
  } else {
    swap();
  }
})();

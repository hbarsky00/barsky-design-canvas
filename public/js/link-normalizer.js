// Repairs malformed hrefs (project:foo, app://x, bare domains) that can appear in
// authored content, so they resolve instead of 404ing.
//
// Extracted from an inline <script> in index.html, which the enforced CSP
// (script-src 'self', no 'unsafe-inline', no nonce) had been blocking outright.
//
// The original also carried a capture-phase click handler that did
// `e.preventDefault(); window.location.assign(href)` for EVERY internal link.
// In a single-page app that is a full page reload on every click — teardown,
// re-download every chunk, spinner — which is exactly what made case studies feel
// like a blank page. It is removed. Rewriting the href attribute is enough: the
// router then sees a correct href and handles the click client-side.
(function () {
  function normalize(href) {
    if (!href) return href;
    href = href.trim();
    href = href.replace(/^project:/i, '/project/');
    href = href.replace(/^(app|intent):\/\/?/i, '/');
    href = href.replace(/^\/\/(project)/i, '/$1');
    href = href.replace(/^http:barskydesign\.pro/i, 'https://barskydesign.pro');
    if (/^[a-z0-9.-]+\.[a-z]{2,}([\/?#].*)?$/i.test(href)) {
      href = 'https://' + href;
    }
    if (/^project(\/|$)/i.test(href)) href = '/' + href;
    return href;
  }

  function normalizeLinks() {
    document.querySelectorAll('a[href]').forEach((a) => {
      const raw = a.getAttribute('href');
      const fixed = normalize(raw);
      // Only touch what actually changed. The original rewrote every anchor on
      // every mutation, including setting target="_self" on links that were
      // already fine.
      if (fixed && fixed !== raw) a.setAttribute('href', fixed);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', normalizeLinks);
  } else {
    normalizeLinks();
  }

  // Debounced: React mutates the DOM constantly, and the original ran a
  // full-document querySelectorAll synchronously on every single mutation.
  let queued = false;
  new MutationObserver(() => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; normalizeLinks(); });
  }).observe(document.body, { childList: true, subtree: true });
})();

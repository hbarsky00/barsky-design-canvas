// Extracted from index.html. The enforced CSP is `script-src 'self' ...`
// with no 'unsafe-inline' and no nonce, so this was being BLOCKED in the
// browser — meaning malformed hrefs were never repaired.
// Served from the same origin, it runs.

(function () {
      const SAFE = /^(https?:\/\/|mailto:|tel:|\/|#)/i;
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
        document.querySelectorAll('a[href]').forEach(a => {
          const fixed = normalize(a.getAttribute('href'));
          if (fixed) a.setAttribute('href', fixed);
          if (/^\//.test(fixed || '')) a.setAttribute('target', '_self');
        });
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', normalizeLinks);
      } else {
        normalizeLinks();
      }

      const observer = new MutationObserver(normalizeLinks);
      observer.observe(document.body, { childList: true, subtree: true });

      document.addEventListener('click', (e) => {
        const a = e.target.closest('a[href]');
        if (!a) return;
        const href = a.getAttribute('href') || '';
        if (!SAFE.test(href)) return;
        if (/^https?:\/\//i.test(href)) return;
        if (href.startsWith('/')) {
          e.preventDefault();
          window.location.assign(href);
        }
      }, true);
    })();

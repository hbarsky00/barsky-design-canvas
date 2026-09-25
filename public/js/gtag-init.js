// Extracted from index.html. The enforced CSP is `script-src 'self' ...`
// with no 'unsafe-inline' and no nonce, so this was being BLOCKED in the
// browser — meaning Google Analytics never initialised and collected nothing.
// Served from the same origin, it runs.

window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-VYKW0Y9K0T');

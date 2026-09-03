// Measures real text contrast by reading the rendered pixels, including the
// backgrounds axe-core refuses to judge.
//
// Why this exists
// ---------------
// axe marks any element sitting on a `background-image` — a gradient included —
// as "incomplete" rather than failing it, because a static analyser cannot know
// which pixel the text lands on. On this site's homepage that is 106 nodes, and
// on 2026-08-31 one of them turned out to be the hero CTA at 3.20:1: white text
// on the amber end of a gradient, invisible to every automated pass the site had
// ever run. "axe reports 0 violations" is not "this page has no contrast
// failures", and the gap was being closed by hand, one element at a time.
//
// How it closes the gap
// ---------------------
// Read each text element's colour and type scale from the DOM, then force every
// glyph transparent and screenshot the viewport. That frame is the exact
// background under each line of text — gradients, photos, video posters, blend
// modes, all of it, already composited by the browser — so each line box can be
// sampled pixel by pixel and scored against its own colour. No parsing of CSS
// gradients, no compositing maths that can drift from what Chrome painted.
//
// Four things had to be right before the numbers meant anything. Each one was
// found by a finding that turned out to be fiction, so none of them is optional:
//
//   1. Frame and coordinates must share a layout. captureBeyondViewport resizes
//      the viewport to the full content height first, which re-runs layout and
//      moves anything sized in vh. So: scroll in viewport-sized steps and
//      capture the viewport, never the whole page.
//   2. The page must have stopped moving. Case-study routes reflow as each
//      <video preload="metadata"> resolves its object-contain box, so rects are
//      re-read after the capture and any box that moved is dropped.
//   3. Occlusion is not a contrast failure. Text scrolled under the opaque
//      sticky header still has a rect; sampling it scores the text against the
//      header. See occludedAt() — and note it deliberately does NOT treat a
//      transparent overlay as an occluder, because text over a gradient overlay
//      is the whole point.
//   4. Disabled controls are exempt (WCAG 1.4.3, "inactive user interface
//      components"), so :disabled and [aria-disabled] are skipped.
//
// And validate the other direction before trusting a clean run: revert a known
// failure, confirm this reports it, put it back. A checker that cannot fail is
// indistinguishable from a passing site — which is the exact trap axe set here.
//
// Usage:
//   npm run build                          # dist/ must be current
//   npm run check:contrast                 # default route set
//   npm run check:contrast -- --all        # every built route
//   npm run check:contrast -- --routes=/,/store --widths=375
//   npm run check:contrast -- --json=out.json
//   npm run check:contrast -- --origin=https://barskydesign.pro --routes=/about
//     ^ measures the deployed site instead of dist/, because "it is right in
//       the local build" is not the same claim as "it is right in production".
//   CONTRAST_DEBUG_DIR=/tmp/frames npm run check:contrast -- --routes=/
//     ^ writes each frame, its boxes, and the same frame with text visible.
//       When a finding looks impossible, look at the frame.
//
// Exit code is 1 if any AA failure is found, so it can gate a build later.

import { spawn } from "child_process";
import { createServer } from "http";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "fs";
import { extname, join, resolve } from "path";

const DIST = resolve("dist");
const CHROME =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

// Not 4199. That is capture-prerendered-bodies' port, and two sessions fighting
// over it is a documented way to lose a run.
const PORT = Number(process.env.CONTRAST_PORT || 4211);

// A sampled pixel is noise if it is one of a handful — an antialiased glyph
// edge, a 1px rule crossing the line box. Report an element only when this
// share of its sampled background actually fails.
const FAIL_SHARE = 0.1;

const args = process.argv.slice(2);
const argVal = (name) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : null;
};

const DEFAULT_ROUTES = [
  "/",
  "/about",
  "/services",
  "/contact",
  "/store",
  "/blog",
  "/design-services/ux-ui-design",
];

// ---------------------------------------------------------------- static host

function listRoutes() {
  const out = [];
  const walk = (dir, prefix) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) {
        walk(full, `${prefix}/${name}`);
      } else if (name === "index.html") {
        out.push(prefix === "" ? "/" : prefix);
      }
    }
  };
  walk(DIST, "");
  return out.sort();
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

function serve() {
  const server = createServer((req, res) => {
    // Trailing slash or not, /route and /route/ are the same file. Getting this
    // wrong serves the SPA shell instead of the prerendered page, and every
    // measurement below is then taken on the wrong markup.
    const path = decodeURIComponent(req.url.split("?")[0]).replace(/\/+$/, "") || "/";
    const candidates = [
      join(DIST, path, "index.html"),
      join(DIST, path),
      join(DIST, `${path}.html`),
    ];
    let file = candidates.find((c) => existsSync(c) && statSync(c).isFile());
    if (!file) file = join(DIST, "index.html"); // SPA fallback
    res.writeHead(200, { "content-type": MIME[extname(file)] || "application/octet-stream" });
    res.end(readFileSync(file));
  });
  return new Promise((ok) => server.listen(PORT, "127.0.0.1", () => ok(server)));
}

// ----------------------------------------------------------------------- CDP

let nextId = 1;

function connect(url) {
  return new Promise((ok, fail) => {
    const ws = new WebSocket(url);
    const pending = new Map();
    const waiters = [];
    ws.onmessage = (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && pending.has(msg.id)) {
        const { ok: res, fail: rej } = pending.get(msg.id);
        pending.delete(msg.id);
        msg.error ? rej(new Error(JSON.stringify(msg.error))) : res(msg.result);
      } else if (msg.method) {
        for (const w of waiters.splice(0)) w(msg);
      }
    };
    ws.onerror = () => fail(new Error(`cannot reach ${url}`));
    ws.onopen = () =>
      ok({
        send(method, params, sessionId) {
          const id = nextId++;
          return new Promise((res, rej) => {
            pending.set(id, { ok: res, fail: rej });
            ws.send(JSON.stringify({ id, method, params: params || {}, sessionId }));
          });
        },
        once(method, timeoutMs = 15000) {
          return new Promise((res) => {
            const t = setTimeout(() => res(null), timeoutMs);
            const check = (msg) => {
              if (msg.method === method) {
                clearTimeout(t);
                res(msg);
              } else {
                waiters.push(check);
              }
            };
            waiters.push(check);
          });
        },
        close: () => ws.close(),
      });
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Evaluate in the page and return the value. A page-side throw arrives as
 * `exceptionDetails` with a useless result object, which JSON.parse then
 * reports as `"[object Object]" is not valid JSON` from the wrong stack frame.
 */
async function evalIn(cdp, sessionId, expression, awaitPromise = false) {
  const r = await cdp.send(
    "Runtime.evaluate",
    { expression, awaitPromise, returnByValue: true },
    sessionId
  );
  if (r.exceptionDetails) {
    const e = r.exceptionDetails;
    throw new Error(e.exception?.description || e.text || "page-side exception");
  }
  return r.result.value;
}

async function launchChrome(port) {
  const profile = `/tmp/cc-contrast-${process.pid}`;
  const child = spawn(
    CHROME,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--no-first-run",
      "--disable-extensions",
      "--disable-background-networking",
      "--disable-sync",
      "--disable-default-apps",
      "--hide-scrollbars",
      // Reveal-on-scroll wrappers animate from opacity 0. Under reduced motion
      // they land at their final state immediately, which is the state a real
      // reader sees and the only one worth measuring.
      "--force-prefers-reduced-motion",
      `--user-data-dir=${profile}`,
      `--remote-debugging-port=${port}`,
      "about:blank",
    ],
    { stdio: ["ignore", "ignore", "ignore"] }
  );

  for (let i = 0; i < 100; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${port}/json/version`);
      const j = await r.json();
      if (j.webSocketDebuggerUrl) return { child, wsUrl: j.webSocketDebuggerUrl };
    } catch {
      /* not up yet */
    }
    await sleep(100);
  }
  throw new Error("Chrome never opened a debugging port");
}

// -------------------------------------------------------------- in-page work

/**
 * Stamp every text-bearing element with its colour and type scale, keep the
 * nodes on `window.__cw` so later steps can re-measure geometry, then force
 * every glyph transparent.
 *
 * Colour has to be read BEFORE the text is hidden, and geometry has to be read
 * fresh at each scroll position (sticky headers move), so the two are split.
 */
const PREPARE = `(() => {
  const clipped = (el) => {
    for (let n = el; n && n !== document.body; n = n.parentElement) {
      const cs = getComputedStyle(n);
      // The two .sr-only idioms. A Range reports where glyphs would be laid
      // out, not where they are painted, so a screen-reader-only skip link
      // otherwise reports as a full-width 1.19:1 failure over the page
      // background for text no sighted reader ever sees.
      if (cs.clip === "rect(0px, 0px, 0px, 0px)") return true;
      if (cs.clipPath === "inset(50%)") return true;
    }
    return false;
  };

  // opacity does not inherit, so an element at opacity 1 inside a
  // reveal-on-scroll wrapper still at 0 is invisible and must not be scored.
  const effectiveOpacity = (el) => {
    let o = 1;
    for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
      o *= Number(getComputedStyle(n).opacity);
      if (o < 0.05) return 0;
    }
    return o;
  };

  const entries = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    const text = node.nodeValue.replace(/\\s+/g, " ").trim();
    if (!text) continue;
    const el = node.parentElement;
    if (!el || el.closest("script,style,noscript")) continue;

    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.display === "none") continue;
    if (!effectiveOpacity(el)) continue;
    if (clipped(el)) continue;
    // WCAG 1.4.3 exempts inactive user interface components, and a disabled
    // control at reduced opacity is exactly that. The blog's "Post comment"
    // button is disabled on every post (no Turnstile site key in the build)
    // and measures 2.33:1 - real, and not a violation.
    if (el.closest(":disabled, [aria-disabled='true']")) continue;

    const m = cs.color.match(/[\\d.]+/g);
    if (!m) continue;
    const fgAlpha = m.length > 3 ? Number(m[3]) : 1;
    if (fgAlpha === 0) continue;

    const size = parseFloat(cs.fontSize);
    const weight = Number(cs.fontWeight) || 400;
    entries.push({
      node, el,
      fg: [Number(m[0]), Number(m[1]), Number(m[2])],
      fgAlpha, size, weight,
      large: size >= 24 || (size >= 18.66 && weight >= 700),
      tag: el.tagName.toLowerCase(),
      cls: (el.getAttribute("class") || "").slice(0, 120),
      text: text.slice(0, 60),
    });
  }
  window.__cw = entries;

  const s = document.createElement("style");
  s.id = "__contrast_hide__";
  // Smooth scrolling makes scrollTo() asynchronous, so the DOM's rects and the
  // screenshot end up at different offsets and every measurement is taken
  // against the wrong pixels.
  // pointer-events:auto everywhere so elementsFromPoint returns the real paint
  // stack, decorative overlays included - see occludedAt().
  s.textContent = "html,body,*{scroll-behavior:auto!important}*{pointer-events:auto!important}*,*::before,*::after{color:transparent!important;-webkit-text-fill-color:transparent!important;text-shadow:none!important;text-decoration-color:transparent!important;caret-color:transparent!important}";
  document.head.appendChild(s);

  return JSON.stringify({ count: entries.length, height: document.documentElement.scrollHeight });
})()`;

/**
 * Scroll to `y` and report the line boxes now inside the viewport, in viewport
 * coordinates — the same frame a viewport screenshot is in.
 *
 * Deliberately NOT captureBeyondViewport + page coordinates: that mode resizes
 * the viewport to the full content height before painting, which re-runs layout
 * and moves everything sized in `vh` (this site's hero, for one). Coordinates
 * collected before the capture then point at the wrong pixels, and the same
 * route measures differently run to run.
 */
const SNAP = (y) => `(async () => {
  window.scrollTo(0, ${y});
  // Wait for the offset to stop moving rather than for a fixed delay: a
  // smooth or JS-driven scroll is still travelling when a timeout expires.
  let last = -1;
  for (let t = 0; t < 25; t++) {
    await new Promise((r) => setTimeout(r, 40));
    if (window.scrollY === last) break;
    last = window.scrollY;
  }
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

  const vh = window.innerHeight;
  const vw = window.innerWidth;

  /**
   * Is something painted OVER this element at this point?
   *
   * Hit-testing alone answers the wrong question twice. A decorative
   * pointer-events-none overlay is invisible to elementFromPoint even though it
   * paints, and an element that is itself pointer-events-none never comes back
   * as a hit at all - which is how a label parked under the opaque sticky
   * header was scored as 1.00:1 white-on-white. So: hit-testing is forced on
   * for everything (see the injected style), take the whole stack, and count
   * something as an occluder only if it actually paints coverage. A transparent
   * gradient overlay must NOT suppress the text beneath it - text over that
   * gradient is exactly what this script exists to measure.
   */
  const occludedAt = (el, x, y) => {
    for (const n of document.elementsFromPoint(x, y)) {
      if (n === el || n.contains(el) || el.contains(n)) return false; // reached our own text
      const cs = getComputedStyle(n);
      if (cs.backgroundImage !== "none") return true;
      if (cs.backdropFilter && cs.backdropFilter !== "none") return true;
      if (/^(img|video|canvas|picture|svg)$/i.test(n.tagName)) return true;
      const m = cs.backgroundColor.match(/[\\d.]+/g);
      if (m && (m.length < 4 || Number(m[3]) >= 0.5)) return true;
    }
    return false;
  };

  const out = [];
  // An element inside an overflow:hidden ancestor is only painted where the
  // two boxes overlap - carousel slides and truncated rows live outside it.
  const paintedBox = (el) => {
    // Copy the edges out by hand: a DOMRect keeps its properties on the
    // prototype, so {...rect} is an empty object and every later Math.max()
    // silently becomes NaN.
    const r0 = el.getBoundingClientRect();
    const box = { left: r0.left, top: r0.top, right: r0.right, bottom: r0.bottom };
    for (let n = el.parentElement; n && n !== document.body; n = n.parentElement) {
      const cs = getComputedStyle(n);
      if (cs.overflow === "visible" && cs.overflowX === "visible" && cs.overflowY === "visible") continue;
      const r = n.getBoundingClientRect();
      box.left = Math.max(box.left, r.left);
      box.top = Math.max(box.top, r.top);
      box.right = Math.min(box.right, r.right);
      box.bottom = Math.min(box.bottom, r.bottom);
    }
    box.width = box.right - box.left;
    box.height = box.bottom - box.top;
    return box;
  };

  window.__cw.forEach((e, i) => {
    const clip = paintedBox(e.el);
    if (clip.width < 1 || clip.height < 1) return;
    const range = document.createRange();
    range.selectNodeContents(e.node);
    for (const raw of range.getClientRects()) {
      // Clip to the element's own border box: what a Range reports can extend
      // past an overflow:hidden edge, and those pixels are never painted.
      const x1 = Math.max(raw.left, clip.left, 0);
      const y1 = Math.max(raw.top, clip.top, 0);
      const x2 = Math.min(raw.right, clip.right, vw);
      const y2 = Math.min(raw.bottom, clip.bottom, vh);
      if (!(x2 - x1 >= 4) || !(y2 - y1 >= 4)) continue;

      // Is this line actually the topmost thing painted here? A heading that
      // has scrolled under the fixed header is still in the layout and still
      // has a rect, but the header is painted over it - sampling those pixels
      // scores the text against the header's background and reports a failure
      // no reader can see. Every element is measured in several frames, so
      // dropping the occluded ones costs nothing: the frame where it is in
      // clear view is the one that scores it.
      let occluded = false;
      for (const fy of [0.02, 0.5, 0.98]) {
        for (const fx of [0.02, 0.5, 0.98]) {
          if (occludedAt(e.el, x1 + (x2 - x1) * fx, y1 + (y2 - y1) * fy)) { occluded = true; break; }
        }
        if (occluded) break;
      }
      if (occluded) continue;

      out.push({
        i, x: x1, y: y1, w: x2 - x1, h: y2 - y1,
        fg: e.fg, fgAlpha: e.fgAlpha, large: e.large,
      });
    }
  });
  return JSON.stringify({ boxes: out, scrollY: window.scrollY });
})()`;

/**
 * Re-read the same line boxes after the frame is captured.
 *
 * Case-study routes carry many <video preload="metadata"> elements whose
 * object-contain boxes resize as each one's metadata arrives, so the page is
 * still reflowing while it is being measured. Rects read before the capture
 * can describe a layout the frame does not show - which reported a pill label
 * as 1.00:1 against a background that was, in the captured frame, empty page.
 */
const VERIFY = (boxesJson) => `(() => {
  const paintedBox = (el) => {
    const r0 = el.getBoundingClientRect();
    const box = { left: r0.left, top: r0.top, right: r0.right, bottom: r0.bottom };
    for (let n = el.parentElement; n && n !== document.body; n = n.parentElement) {
      const cs = getComputedStyle(n);
      if (cs.overflow === "visible" && cs.overflowX === "visible" && cs.overflowY === "visible") continue;
      const r = n.getBoundingClientRect();
      box.left = Math.max(box.left, r.left);
      box.top = Math.max(box.top, r.top);
      box.right = Math.min(box.right, r.right);
      box.bottom = Math.min(box.bottom, r.bottom);
    }
    return box;
  };
  const vh = window.innerHeight, vw = window.innerWidth;
  return JSON.stringify(${boxesJson}.map((box) => {
    const e = window.__cw[box.i];
    const clip = paintedBox(e.el);
    const range = document.createRange();
    range.selectNodeContents(e.node);
    for (const raw of range.getClientRects()) {
      const x1 = Math.max(raw.left, clip.left, 0);
      const y1 = Math.max(raw.top, clip.top, 0);
      const x2 = Math.min(raw.right, clip.right, vw);
      const y2 = Math.min(raw.bottom, clip.bottom, vh);
      if (Math.abs(x1 - box.x) < 0.5 && Math.abs(y1 - box.y) < 0.5 &&
          Math.abs(x2 - x1 - box.w) < 0.5 && Math.abs(y2 - y1 - box.h) < 0.5) return true;
    }
    return false;
  }));
})()`;

/**
 * Sample the background image inside every line box and score it.
 * Runs in the page so the PNG is decoded by a canvas that is already there,
 * rather than by a PNG parser written for this one purpose.
 */
const ANALYSE = (b64, boxesJson, failShare) => `(async () => {
  const img = new Image();
  img.src = "data:image/png;base64,${b64}";
  await img.decode();
  const c = document.createElement("canvas");
  c.width = img.naturalWidth;
  c.height = img.naturalHeight;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(img, 0, 0);

  const lum = (r, g, b) => {
    const f = (v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const ratio = (a, b) => {
    const [hi, lo] = a > b ? [a, b] : [b, a];
    return (hi + 0.05) / (lo + 0.05);
  };

  const out = [];
  if (c.width !== window.innerWidth || c.height !== window.innerHeight) {
    // Every box below is in CSS viewport coordinates. If the frame is not that
    // size, they point at the wrong pixels and every ratio is fiction.
    return JSON.stringify([{ __mismatch: [c.width, c.height, window.innerWidth, window.innerHeight] }]);
  }
  for (const box of ${boxesJson}) {
    // Inset: the outer pixel ring of a line box is antialiasing and whatever a
    // neighbouring element painted, not the background under the glyphs.
    const x0 = Math.max(0, Math.round(box.x) + 1);
    const y0 = Math.max(0, Math.round(box.y) + 1);
    const w = Math.max(1, Math.min(Math.round(box.w) - 2, c.width - x0));
    const h = Math.max(1, Math.min(Math.round(box.h) - 2, c.height - y0));
    if (x0 >= c.width || y0 >= c.height) continue;

    const data = ctx.getImageData(x0, y0, w, h).data;
    const stepX = Math.max(1, Math.floor(w / 24));
    const stepY = Math.max(1, Math.floor(h / 8));

    let worst = Infinity, worstBg = null, failed = 0, total = 0;
    for (let y = 0; y < h; y += stepY) {
      for (let x = 0; x < w; x += stepX) {
        const k = (y * w + x) * 4;
        const bg = [data[k], data[k + 1], data[k + 2]];
        // Text drawn at partial alpha is composited over this same pixel.
        const fg = box.fgAlpha >= 1
          ? box.fg
          : box.fg.map((v, j) => v * box.fgAlpha + bg[j] * (1 - box.fgAlpha));
        const r = ratio(lum(fg[0], fg[1], fg[2]), lum(bg[0], bg[1], bg[2]));
        total++;
        if (r < (box.large ? 3 : 4.5)) failed++;
        if (r < worst) { worst = r; worstBg = bg; }
      }
    }
    if (!total) continue;
    const share = failed / total;
    if (share >= ${failShare}) {
      const e = window.__cw[box.i];
      out.push({
        tag: e.tag, cls: e.cls, text: e.text,
        size: e.size, weight: e.weight, large: e.large,
        need: box.large ? 3 : 4.5,
        ratio: Math.round(worst * 100) / 100,
        share: Math.round(share * 100),
        fg: box.fg, bg: worstBg,
        key: box.i,
      });
    }
  }
  return JSON.stringify(out);
})()`;

// ---------------------------------------------------------------------- main

async function measure(cdp, sessionId, url, width) {
  await cdp.send(
    "Emulation.setDeviceMetricsOverride",
    { width, height: 900, deviceScaleFactor: 1, mobile: width < 768 },
    sessionId
  );
  await cdp.send("Page.navigate", { url }, sessionId);
  await cdp.once("Page.loadEventFired", 30000);
  await sleep(700);

  // Walk the page once so anything gated on entering the viewport has entered
  // it, then stamp colours and hide the text.
  await evalIn(
    cdp,
    sessionId,
    `(async () => {
        const step = window.innerHeight;
        for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 60));
        }
        window.scrollTo(0, 0);
        await new Promise((r) => setTimeout(r, 250));
      })()`,
    true
  );

  // Media-heavy routes keep reflowing as each <video>'s metadata lands. Measuring
  // a page that is still resizing compares rects to pixels from another layout.
  await evalIn(
    cdp,
    sessionId,
    `(async () => {
      let last = -1, stable = 0;
      for (let i = 0; i < 40 && stable < 3; i++) {
        await new Promise((r) => setTimeout(r, 100));
        const h = document.documentElement.scrollHeight;
        stable = h === last ? stable + 1 : 0;
        last = h;
      }
    })()`,
    true
  );

  const prep = JSON.parse(await evalIn(cdp, sessionId, PREPARE));
  if (!prep.count) return [];
  await sleep(150);

  // One finding per element, worst box wins — a heading spanning three lines is
  // one defect, and the same sticky element reappears in every scroll step.
  const worstByElement = new Map();
  const step = Math.round(900 * 0.9);
  for (let y = 0; y < prep.height; y += step) {
    const snap = JSON.parse(await evalIn(cdp, sessionId, SNAP(y), true));
    if (!snap.boxes.length) continue;

    const shot = await cdp.send(
      "Page.captureScreenshot",
      { format: "png", optimizeForSpeed: true },
      sessionId
    );
    // If the page moved between reading the rects and painting the frame, the
    // two disagree and every ratio from this step is fiction. Skip it.
    if ((await evalIn(cdp, sessionId, "window.scrollY")) !== snap.scrollY) continue;

    // CONTRAST_DEBUG_DIR=... writes the text-hidden frames out. Worth having:
    // every wrong answer this script has given was a frame that did not show
    // what the coordinates said it showed, and that is only visible by looking.
    if (process.env.CONTRAST_DEBUG_DIR) {
      mkdirSync(process.env.CONTRAST_DEBUG_DIR, { recursive: true });
      const tag = `${url.replace(/[^a-z0-9]+/gi, "_")}-w${width}-y${y}`;
      writeFileSync(`${process.env.CONTRAST_DEBUG_DIR}/${tag}.png`, Buffer.from(shot.data, "base64"));
      writeFileSync(`${process.env.CONTRAST_DEBUG_DIR}/${tag}.json`, JSON.stringify(snap.boxes, null, 1));
      // The same frame as a reader sees it, for comparing against the
      // text-hidden one when a finding looks impossible.
      await evalIn(cdp, sessionId, `document.getElementById("__contrast_hide__").disabled = true`);
      const lit = await cdp.send("Page.captureScreenshot", { format: "png" }, sessionId);
      writeFileSync(`${process.env.CONTRAST_DEBUG_DIR}/${tag}-lit.png`, Buffer.from(lit.data, "base64"));
      await evalIn(cdp, sessionId, `document.getElementById("__contrast_hide__").disabled = false`);
    }
    const stillThere = JSON.parse(
      await evalIn(cdp, sessionId, VERIFY(JSON.stringify(snap.boxes)))
    );
    const boxes = snap.boxes.filter((_, k) => stillThere[k]);
    if (!boxes.length) continue;

    const hits = JSON.parse(
      await evalIn(cdp, sessionId, ANALYSE(shot.data, JSON.stringify(boxes), FAIL_SHARE), true)
    );
    if (hits.length && hits[0].__mismatch) {
      throw new Error(`frame ${hits[0].__mismatch.slice(0,2).join("x")} != viewport ${hits[0].__mismatch.slice(2).join("x")}`);
    }
    for (const h of hits) {
      const prev = worstByElement.get(h.key);
      if (!prev || h.ratio < prev.ratio) worstByElement.set(h.key, { ...h, frameY: y });
    }
  }
  return [...worstByElement.values()];
}

async function main() {
  const origin = argVal("origin");
  if (!origin && !existsSync(DIST)) throw new Error("no dist/ — run npm run build first");

  const routes = args.includes("--all")
    ? listRoutes() // dist-only: the deployed site has no directory to walk
    : (argVal("routes") || DEFAULT_ROUTES.join(",")).split(",").filter(Boolean);
  const widths = (argVal("widths") || "375,1440").split(",").map(Number);

  const server = origin ? null : await serve();
  const base = origin ? origin.replace(/\/+$/, "") : `http://127.0.0.1:${PORT}`;
  const { child, wsUrl } = await launchChrome(9333);
  const cdp = await connect(wsUrl);
  const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });
  await cdp.send("Page.enable", {}, sessionId);
  await cdp.send("Runtime.enable", {}, sessionId);

  const findings = [];
  try {
    for (const route of routes) {
      for (const width of widths) {
        const url = `${base}${route}`;
        let hits = [];
        try {
          hits = await measure(cdp, sessionId, url, width);
        } catch (e) {
          console.log(`  !! ${route} @${width}: ${e.message}`);
          continue;
        }
        const worst = hits.reduce((m, h) => Math.min(m, h.ratio), Infinity);
        console.log(
          `${hits.length ? "FAIL" : " ok "} ${route} @${width}` +
            (hits.length ? ` — ${hits.length} element(s), worst ${worst.toFixed(2)}:1` : "")
        );
        for (const h of hits) findings.push({ route, width, ...h });
      }
    }
  } finally {
    cdp.close();
    child.kill("SIGKILL");
    if (server) server.close();
  }

  const rgb = (a) => `rgb(${a.map(Math.round).join(" ")})`;
  if (findings.length) {
    console.log(`\n${findings.length} failing text box(es), worst first:\n`);
    for (const f of findings.sort((a, b) => a.ratio - b.ratio)) {
      console.log(
        `${f.ratio.toFixed(2)}:1 (needs ${f.need}) ${f.route} @${f.width} — <${f.tag}> ${f.size}px/${f.weight}\n` +
          `    fg ${rgb(f.fg)} on ${rgb(f.bg)} · ${f.share}% of samples fail · frame y=${f.frameY}\n` +
          `    "${f.text}"\n    class="${f.cls}"\n`
      );
    }
  } else {
    console.log("\nNo text box fails AA against its real painted background.");
  }

  const jsonPath = argVal("json");
  if (jsonPath) writeFileSync(jsonPath, JSON.stringify(findings, null, 2));

  process.exit(findings.length ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});

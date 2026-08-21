// Captures the rendered <div id="root"> for every indexable route and writes it
// to prerendered-bodies/. inject-seo-html.ts then bakes those snapshots into the
// per-route HTML at build time.
//
// Why this exists
// ---------------
// src/main.tsx calls hydrateRoot() in production, but nothing was ever filling
// #root — scripts/build-with-prerender.js shells out to react-snap, which isn't
// installed and isn't wired into any npm script. So production React was
// hydrating an empty container on every page load: React error #418 (hydration
// mismatch) followed by #423 (error while hydrating, discard and client-render).
// The page still appeared, because #423 recovers, but every visit paid for a
// throwaway hydration pass and every non-JS crawler saw an empty shell.
//
// Why a committed snapshot instead of prerendering in CI
// ------------------------------------------------------
// Netlify's build image has no browser we can rely on, and a prerender step that
// silently degrades to empty output is worse than none. Capture runs on a real
// machine, the output is committed, and the build is a pure file copy.
//
// Usage: npm run capture-bodies   (after npm run build)
//
// This is a LOCAL step. Re-run it whenever visible page copy changes, or the
// committed snapshots go stale and crawlers keep seeing the old text.

import { spawn, spawnSync } from "child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync } from "fs";
import { resolve } from "path";

const PORT = 4199;
const ORIGIN = `http://localhost:${PORT}`;
const OUT_DIR = resolve("prerendered-bodies");
const DIST = resolve("dist");

const CHROME =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

/** Route list — mirrors scripts/inject-seo-html.ts exactly. */
function getRoutes(): string[] {
  const staticPaths = [
    "/",
    "/services",
    "/design-services/ux-ui-design",
    "/design-services/mobile-app-design",
    "/design-services/web-development",
    "/about",
    "/contact",
    "/store",
    "/blog",
    "/projects",
  ];

  const appSrc = readFileSync(resolve("src/App.tsx"), "utf8");
  const projects = new Set<string>();
  for (const line of appSrc.split("\n")) {
    const m = /<Route\s+path="(\/project\/[a-z0-9-]+)"/i.exec(line);
    if (m && !line.includes("Navigate")) projects.add(m[1]);
  }

  const blogSrc = readFileSync(resolve("src/data/blogData.ts"), "utf8");
  const slugs = Array.from(
    new Set(
      Array.from(blogSrc.matchAll(/slug:\s*["'`]([a-z0-9-]+)["'`]/gi)).map((m) => m[1])
    )
  ).sort();

  return [
    ...staticPaths,
    ...Array.from(projects).sort(),
    ...slugs.map((s) => `/blog/${s}`),
  ];
}

/** prerendered-bodies/<file>.html — "/" becomes index. */
export function routeToFile(route: string): string {
  const slug = route === "/" ? "index" : route.replace(/^\//, "").replace(/\//g, "__");
  return `${slug}.html`;
}

/**
 * Strip state that only exists because JavaScript ran. React's first client
 * render won't produce any of it, so leaving it in the snapshot guarantees the
 * hydration mismatch this script exists to fix.
 */
function sanitize(html: string): string {
  return (
    html
      // Scroll-reveal classes are added by useReveal after mount.
      .replace(/\s*\bcs-reveal\b/g, "")
      .replace(/\s*\bis-visible\b/g, "")
      // Lazily-loaded images that had already swapped in.
      .replace(/\s*data-loaded="[^"]*"/g, "")
      // Radix portals mount outside #root, but stray aria state can leak in.
      .replace(/\s*data-radix-popper-content-wrapper="[^"]*"/g, "")
      .trim()
  );
}

let launchSeq = 0;

function dumpDom(url: string, timeoutMs = 120000): Promise<string> {
  return new Promise((resolvePromise, reject) => {
    // A fresh profile per launch. Sharing one directory across routes meant a
    // SIGKILLed Chrome left renderers holding the profile lock, and every
    // subsequent launch blocked on it forever — which looked like slow pages
    // but was really the previous route's corpse.
    const profile = `/tmp/cc-prerender-${process.pid}-${launchSeq++}`;

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
        `--user-data-dir=${profile}`,
        // Case-study pages carry several <video preload="metadata"> elements.
        // Chrome's virtual clock does not advance past pending media fetches,
        // so those routes never hit the budget and sat until the wall timeout —
        // 22 of 32 routes failed that way, every one of them a page with video
        // or a heavy hero. The DOM is all we want here, so refuse the bytes.
        "--blink-settings=imagesEnabled=false",
        "--disable-remote-fonts",
        "--virtual-time-budget=15000",
        "--dump-dom",
        url,
      ],
      { stdio: ["ignore", "pipe", "ignore"] }
    );

    const cleanupProfile = () => rmSync(profile, { recursive: true, force: true });

    let out = "";
    child.stdout.on("data", (d) => (out += d.toString()));

    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      cleanupProfile();
      reject(new Error(`timed out after ${timeoutMs}ms`));
    }, timeoutMs);

    child.on("close", () => {
      clearTimeout(timer);
      cleanupProfile();
      resolvePromise(out);
    });
    child.on("error", (e) => {
      clearTimeout(timer);
      cleanupProfile();
      reject(e);
    });
  });
}

/** Pull the inner HTML of <div id="root"> out of a full DOM dump. */
export function extractRoot(dom: string): string | null {
  const open = dom.indexOf('<div id="root"');
  if (open === -1) return null;
  const contentStart = dom.indexOf(">", open) + 1;
  if (contentStart === 0) return null;

  // Walk divs to find the matching close, since the body is full of them.
  let depth = 1;
  let i = contentStart;
  const tag = /<(\/?)div\b/gi;
  tag.lastIndex = contentStart;
  let m: RegExpExecArray | null;
  while ((m = tag.exec(dom))) {
    depth += m[1] === "/" ? -1 : 1;
    if (depth === 0) {
      i = m.index;
      return dom.slice(contentStart, i);
    }
  }
  return null;
}

async function main() {
  if (!existsSync(resolve(DIST, "index.html"))) {
    console.error("dist/index.html not found — run `npm run build` first.");
    process.exit(1);
  }
  if (!existsSync(CHROME)) {
    console.error(`Chrome not found at ${CHROME}. Set CHROME_PATH.`);
    process.exit(1);
  }

  // Pass routes as args to re-capture just those — heavy pages sometimes time
  // out on a cold Chrome start, and re-running all 32 to fix three is wasteful.
  const argRoutes = process.argv.slice(2).filter((a) => a.startsWith("/"));
  const routes = argRoutes.length ? argRoutes : getRoutes();
  mkdirSync(OUT_DIR, { recursive: true });

  const preview = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort"], {
    stdio: "ignore",
    detached: false,
  });

  // Wait for the server rather than guessing at a sleep duration.
  let up = false;
  for (let i = 0; i < 40; i++) {
    const probe = spawnSync("curl", ["-s", "-o", "/dev/null", "-w", "%{http_code}", ORIGIN]);
    if (probe.stdout?.toString().trim() === "200") {
      up = true;
      break;
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  if (!up) {
    preview.kill("SIGKILL");
    console.error(`vite preview never came up on ${ORIGIN}`);
    process.exit(1);
  }

  const failures: string[] = [];
  let written = 0;

  try {
    for (const route of routes) {
      let body: string | null = null;

      for (let attempt = 1; attempt <= 2 && !body; attempt++) {
        try {
          const dom = await dumpDom(ORIGIN + route);
          const root = extractRoot(dom);
          // A shell that rendered nothing is the exact failure this guards
          // against — treat it as an error, never write it.
          if (root && root.trim().length > 500) body = sanitize(root);
        } catch (e) {
          if (attempt === 2) console.warn(`  ${route}: ${(e as Error).message}`);
        }
      }

      if (!body) {
        failures.push(route);
        console.warn(`✗ ${route}`);
        continue;
      }

      writeFileSync(resolve(OUT_DIR, routeToFile(route)), body);
      written++;
      console.log(`✓ ${route} (${(body.length / 1024).toFixed(1)} kB)`);
    }
  } finally {
    preview.kill("SIGKILL");
  }

  console.log(`\nCaptured ${written}/${routes.length} routes.`);
  if (failures.length) {
    console.error(`Failed: ${failures.join(", ")}`);
    process.exit(1);
  }
}

main();

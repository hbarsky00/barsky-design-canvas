// Screenshots the live QuickFlow demo (smanagebus.netlify.app) for this case study.
//
// Why this exists: the walkthrough Hiram recorded is 1440x900 throughout, so the
// phone screenshots in "Built to Be Used From a Phone" could not come from it.
// The app is responsive and its Owner demo is read-only and needs no password,
// so these are real screenshots of the real app rather than crops of a video.
//
// No dependencies on purpose. Node 22 exposes a global WebSocket and Chrome
// ships the DevTools Protocol, so this drives a headless Chrome directly:
// set the viewport, enter the demo, walk the nav, capture each page.
//
//   node scripts/shoot-quickflow-demo.mjs <output-dir>
//
// Then downscale to 2x the slot it renders in (544px for the 17rem phone cell,
// 1440px for a full-width figure) and convert with cwebp.
import { spawn } from "node:child_process";
import { writeFileSync, mkdirSync, rmSync } from "node:fs";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9333;
const ORIGIN = "https://smanagebus.netlify.app/";
const OUT = process.argv[2];
const MOBILE = { width: 390, height: 844, deviceScaleFactor: 2, mobile: true };
const DESKTOP = { width: 1440, height: 900, deviceScaleFactor: 2, mobile: false };
const profile = "/tmp/qf-chrome-profile";
rmSync(profile, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const chrome = spawn(CHROME, [
  "--headless=new", "--disable-gpu", "--no-sandbox", "--no-first-run",
  "--disable-extensions", "--disable-background-networking", "--disable-sync",
  `--user-data-dir=${profile}`, `--remote-debugging-port=${PORT}`, "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let ws, id = 0;
const pending = new Map();
const send = (method, params = {}) =>
  new Promise((res, rej) => { const n = ++id; pending.set(n, { res, rej }); ws.send(JSON.stringify({ id: n, method, params })); });

async function connect() {
  for (let i = 0; i < 60; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      const page = list.find((t) => t.type === "page");
      if (page?.webSocketDebuggerUrl) {
        ws = new WebSocket(page.webSocketDebuggerUrl);
        await new Promise((r) => (ws.onopen = r));
        ws.onmessage = (e) => {
          const m = JSON.parse(e.data);
          if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(new Error(m.error.message)) : p.res(m.result); }
        };
        return;
      }
    } catch {}
    await sleep(300);
  }
  throw new Error("could not attach to Chrome");
}

const evaluate = async (expression) =>
  (await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })).result?.value;

async function shoot(name) {
  const { data } = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  writeFileSync(`${OUT}/${name}.png`, Buffer.from(data, "base64"));
  console.log(`  wrote ${name}.png`);
}

await connect();
await send("Page.enable"); await send("Runtime.enable");

async function session(metrics, tag, pages) {
  await send("Emulation.setDeviceMetricsOverride", metrics);
  await send("Page.navigate", { url: ORIGIN });
  await sleep(3500);
  // enter the read-only Owner demo
  const entered = await evaluate(`(() => {
    const rows = Array.from(document.querySelectorAll('button,a,[role=button]'));
    const owner = rows.find(el => /view/i.test(el.textContent||'') && /owner/i.test(el.closest('div,li,tr')?.textContent||''));
    if (owner) { owner.click(); return 'clicked'; }
    return 'not found';
  })()`);
  console.log(`  [${tag}] demo entry: ${entered}`);
  await sleep(4000);
  for (const label of pages) {
    const res = await evaluate(`(async () => {
      const openMenu = () => {
        const b = Array.from(document.querySelectorAll('button')).find(x => /menu|open|nav/i.test(x.getAttribute('aria-label')||'') || x.querySelector('svg') && x.closest('header'));
        if (b) b.click();
      };
      if (window.innerWidth < 768) { openMenu(); await new Promise(r=>setTimeout(r,700)); }
      const target = Array.from(document.querySelectorAll('a,button,[role=button],li'))
        .find(el => el.textContent.trim().toLowerCase() === ${JSON.stringify("PLACEHOLDER")}.toLowerCase());
      if (!target) return 'no nav item';
      target.click(); return 'ok';
    })()`.replace('"PLACEHOLDER"', JSON.stringify(label)));
    await sleep(2500);
    console.log(`  [${tag}] ${label}: ${res}`);
    await shoot(`${tag}-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`);
  }
}

await session(MOBILE, "mobile", ["Dashboard", "Products", "Recurring", "Drivers", "Delivery", "Orders"]);
await send("Emulation.clearDeviceMetricsOverride");
console.log("done");
ws.close(); chrome.kill();
process.exit(0);

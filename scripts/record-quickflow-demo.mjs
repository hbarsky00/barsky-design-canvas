// Records a walkthrough of the live QuickFlow demo (smanagebus.netlify.app).
//
// The case study used to carry a narrated screen recording of the OLD build.
// The app was rebuilt, so that video showed software that no longer exists.
// This drives the real app instead: enter the read-only Owner demo, walk the
// nav, scroll where scrolling shows something, and capture the whole thing as
// frames over Chrome's screencast API.
//
// No dependencies: Node 22 has a global WebSocket, Chrome ships the DevTools
// Protocol, and ffmpeg assembles the frames. Silent by design — there is no
// narration, so the case study renders it as a looping clip, not a walkthrough.
//
//   node scripts/record-quickflow-demo.mjs <output-dir>
//
// Screencast only emits a frame when the page actually changes, so timings are
// preserved by writing an ffmpeg concat list with each frame's real duration
// rather than assuming a constant frame rate.
import { spawn } from "node:child_process";
import { writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9344;
const ORIGIN = "https://smanagebus.netlify.app/";
const OUT = process.argv[2];
const profile = "/tmp/qf-record-profile";
rmSync(profile, { recursive: true, force: true });
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const chrome = spawn(CHROME, [
  "--headless=new", "--disable-gpu", "--no-sandbox", "--no-first-run",
  "--disable-extensions", "--disable-background-networking", "--disable-sync",
  "--hide-scrollbars", `--user-data-dir=${profile}`,
  `--remote-debugging-port=${PORT}`, "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ws, id = 0;
const pending = new Map();
const frames = [];
let recording = false;

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
          if (m.id && pending.has(m.id)) {
            const p = pending.get(m.id); pending.delete(m.id);
            m.error ? p.rej(new Error(m.error.message)) : p.res(m.result);
            return;
          }
          if (m.method === "Page.screencastFrame") {
            if (recording) frames.push({ data: m.params.data, t: m.params.metadata.timestamp });
            send("Page.screencastFrameAck", { sessionId: m.params.sessionId }).catch(() => {});
          }
        };
        return;
      }
    } catch {}
    await sleep(300);
  }
  throw new Error("could not attach to Chrome");
}

const evaluate = (expression) =>
  send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true }).then((r) => r.result?.value);

const go = async (label, hold = 2600) => {
  const res = await evaluate(`(async () => {
    const want = ${JSON.stringify(label)}.toLowerCase();
    const name = el => (el.textContent || el.getAttribute('aria-label') || '').trim().toLowerCase();
    const t = Array.from(document.querySelectorAll('a,button,[role=button],li')).find(el => name(el) === want);
    if (!t) return 'missing';
    t.click(); return 'ok';
  })()`);
  await sleep(hold);
  return res;
};
const scrollBy = async (px, hold = 1800) => {
  await evaluate(`window.scrollTo({ top: ${px}, behavior: 'smooth' }); null`);
  await sleep(hold);
};

await connect();
await send("Page.enable"); await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 2, mobile: false });
await send("Page.navigate", { url: ORIGIN });
await sleep(4000);
await evaluate(`(() => {
  const rows = Array.from(document.querySelectorAll('button,a,[role=button]'));
  const owner = rows.find(el => /view/i.test(el.textContent||'') && /owner/i.test(el.closest('div,li,tr')?.textContent||''));
  if (owner) owner.click();
})()`);
await sleep(4500);

await send("Page.startScreencast", { format: "jpeg", quality: 80, maxWidth: 2880, maxHeight: 1800, everyNthFrame: 1 });
recording = true;
await sleep(2200);                          // land on the overview
await go("Recipe Calculator", 2600);
await go("Products", 2000); await scrollBy(700);
await go("Customers", 2600);
await go("Orders", 2600);
await go("Recurring", 2200);
await go("Delivery", 2600);
await go("Drivers", 2200);
await go("Design System", 2000); await scrollBy(900);
await go("Settings", 2200);
await go("Dashboard", 2400);
recording = false;
await send("Page.stopScreencast");

const list = [];
frames.forEach((f, i) => {
  const name = `f${String(i).padStart(5, "0")}.jpg`;
  writeFileSync(join(OUT, name), Buffer.from(f.data, "base64"));
  // Clamp generously: screencast emits nothing while a page sits still, so the
  // gap between two frames IS the pause. Clamping it to 1.5s silently cut every
  // hold and turned a 27s walkthrough into 21s of flicking past screens.
  const dur = i < frames.length - 1 ? Math.min(Math.max(frames[i + 1].t - f.t, 0.02), 3.2) : 0.4;
  list.push(`file '${name}'`, `duration ${dur.toFixed(3)}`);
});
if (frames.length) list.push(`file 'f${String(frames.length - 1).padStart(5, "0")}.jpg'`);
writeFileSync(join(OUT, "frames.txt"), list.join("\n"));
console.log(`  ${frames.length} frames, ~${(frames.at(-1).t - frames[0].t).toFixed(1)}s`);
ws.close(); chrome.kill();
process.exit(0);

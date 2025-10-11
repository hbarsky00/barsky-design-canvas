// scripts/run-seo-check.mjs
import { execSync } from "child_process";

const REQ = ["SITE_URL", "VITE_SUPABASE_URL"];
const missing = REQ.filter(k => !process.env[k]);

// Check for either VITE_SUPABASE_ANON_KEY or VITE_SUPABASE_PUBLISHABLE_KEY
if (!process.env.VITE_SUPABASE_ANON_KEY && !process.env.VITE_SUPABASE_PUBLISHABLE_KEY) {
  missing.push("VITE_SUPABASE_ANON_KEY or VITE_SUPABASE_PUBLISHABLE_KEY");
}

if (missing.length) {
  console.log(JSON.stringify({ error: "missing_env", missing }, null, 2));
  process.exit(1);
}

function run(cmd) {
  try {
    return execSync(cmd, { stdio: "pipe", encoding: "utf8" });
  } catch (e) {
    const out = (e.stdout || "") + (e.stderr || "");
    console.log(JSON.stringify({ step: cmd, error: "command_failed", output: out }, null, 2));
    process.exit(1);
  }
}

// 1) Build app
run("vite build");

// 2) Prerender + sitemaps (safe if they're no-ops)
run("node ./scripts/prerender.js");
run("node ./scripts/generateSitemaps.js");

// 3) Full verification (includes base + Supabase cross-checks)
//    Falls back to base check if the supabase script is missing
let json;
try {
  json = run("node ./scripts/verify-seo-supabase.mjs");
} catch {
  json = run("node ./scripts/verify-seo.mjs");
}

// 4) Return JSON only
try {
  // Validate it's JSON; if not, wrap it
  JSON.parse(json);
  process.stdout.write(json);
} catch {
  console.log(JSON.stringify({ error: "non_json_verifier_output", raw: json }, null, 2));
  process.exit(1);
}

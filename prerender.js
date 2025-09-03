import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const distIndex = toAbsolute('dist/index.html');
if (!fs.existsSync(distIndex)) {
  console.error('❌ dist/index.html not found. Run "npm run build:client" first.');
  process.exit(1);
}

const template = fs.readFileSync(distIndex, 'utf-8');
const { render } = await import('./dist/server/entry-server.js');

// Helpers
function safeMkdirp(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function readFileUTF8(p) {
  try {
    return fs.readFileSync(toAbsolute(p), 'utf-8');
  } catch {
    return '';
  }
}

// 1) Parse App.tsx for Route paths
function getRoutesFromApp() {
  const appSrc = readFileUTF8('src/App.tsx');
  const routeRegex = /<Route\s+path=["'`]([^"'`]+)["'`]/g;
  const paths = [];
  let m;
  while ((m = routeRegex.exec(appSrc))) {
    const p = m[1].trim();
    if (p && p !== '*' && !paths.includes(p)) {
      paths.push(p);
    }
  }
  const staticRoutes = paths.filter((p) => !p.includes(':'));
  const dynamicRoutes = paths.filter((p) => p.includes(':'));
  return { staticRoutes, dynamicRoutes };
}

// 2) Expand dynamic routes using data files
function getBlogSlugs() {
  const content = readFileUTF8('src/data/blogData.ts');
  const posts = [];
  const objRegex = /{\s*id:\s*["'`]([^"'`]+)["'`][\s\S]*?slug:\s*["'`]([^"'`]+)["'`][\s\S]*?}/g;
  let m;
  while ((m = objRegex.exec(content))) {
    const slug = m[2];
    if (slug) posts.push(slug);
  }
  return Array.from(new Set(posts));
}

function getProjectSlugs() {
  const content = readFileUTF8('src/data/structuredCaseStudies.ts');
  const slugs = [];
  // matches: "crypto": { ... }, "herbalink": { ... }
  const keyRegex = /["'`]([^"'`]+)["'`]\s*:\s*{[\s\S]*?id:\s*["'`]([^"'`]+)["'`]/g;
  let m;
  while ((m = keyRegex.exec(content))) {
    const key = m[1];
    if (key) slugs.push(key);
  }
  return Array.from(new Set(slugs));
}

function expandDynamicRoutes(dynamicRoutes) {
  const out = [];
  const blogSlugs = dynamicRoutes.some((p) => /^\/blog\/:/.test(p)) ? getBlogSlugs() : [];
  const projectSlugs = dynamicRoutes.some((p) => /^\/project\/:/.test(p)) ? getProjectSlugs() : [];

  if (blogSlugs.length) {
    out.push(...blogSlugs.map((s) => `/blog/${s}`));
  }
  if (projectSlugs.length) {
    out.push(...projectSlugs.map((s) => `/project/${s}`));
  }
  return out;
}

const { staticRoutes, dynamicRoutes } = getRoutesFromApp();
const expanded = expandDynamicRoutes(dynamicRoutes);

// Merge and de-duplicate
const routesToPrerender = Array.from(new Set([
  ...staticRoutes,
  ...expanded,
  '/', // ensure home
])).sort();

console.log(`🚀 Prerendering ${routesToPrerender.length} routes:\n`, routesToPrerender.join('\n'));

// 3) Render each route with SSR and write HTML files
for (const route of routesToPrerender) {
  try {
    const appHtml = await render(route);
    const html = template.replace('<!--app-html-->', appHtml);
    const filePath = toAbsolute(`dist${route === '/' ? '/index' : route}.html`);
    safeMkdirp(filePath);
    fs.writeFileSync(filePath, html);
    console.log('✅ pre-rendered:', filePath);
  } catch (err) {
    console.error(`❌ Failed to prerender ${route}:`, err?.message || err);
  }
}
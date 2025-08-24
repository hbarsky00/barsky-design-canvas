import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

const templatePath = toAbsolute('dist/index.html')
if (!fs.existsSync(templatePath)) {
  console.error('❌ Template not found at:', templatePath)
  process.exit(1)
}
const template = fs.readFileSync(templatePath, 'utf-8')

let render
try {
  ;({ render } = await import('./dist/server/entry-server.js'))
} catch (e) {
  console.error('❌ Failed to import server renderer:', e)
  process.exit(1)
}

// Pre-render all known static and specific routes from App.tsx
const routesToPrerender = [
  '/',
  '/projects',
  '/services',
  '/about',
  '/contact',
  '/blog',
  // Structured case studies
  '/project/herbalink',
  '/project/business-management',
  '/project/splittime',
  '/project/investor-loan-app',
  '/project/wholesale-distribution',
  // Service detail pages
  '/design-services/ux-ui-design',
  '/design-services/mobile-app-design',
  '/design-services/web-development',
];

;(async () => {
  for (const url of routesToPrerender) {
    try {
      const appHtml = render(url)
      const html = template.replace('<!--app-html-->', appHtml)

      const outPath = `dist${url === '/' ? '/index' : url}.html`
      const outDir = path.dirname(toAbsolute(outPath))
      fs.mkdirSync(outDir, { recursive: true })
      fs.writeFileSync(toAbsolute(outPath), html)
      console.log('✅ pre-rendered:', outPath)
    } catch (err) {
      console.error(`⚠️ Failed to prerender ${url}:`, err)
    }
  }
})()


import fs from 'fs';
import routes from './prerender-routes.mjs';

const BASE_URL = 'https://barskydesign.pro';
const currentDate = new Date().toISOString().split('T')[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${BASE_URL}${route === '/' ? '' : route}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

// Ensure dist directory exists
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', { recursive: true });
}

fs.writeFileSync('dist/sitemap.xml', sitemap);
console.log('📍 Generated sitemap.xml');

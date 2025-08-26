import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');

// Generate sitemap.xml
function generateSitemap() {
  const baseUrl = 'https://barskydesign.pro';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const staticRoutes = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/project', priority: '0.9', changefreq: 'weekly' },
    { path: '/services', priority: '0.9', changefreq: 'monthly' },
    { path: '/about', priority: '0.8', changefreq: 'monthly' },
    { path: '/contact', priority: '0.7', changefreq: 'monthly' },
    { path: '/blog', priority: '0.8', changefreq: 'weekly' },
    { path: '/design-services/ux-ui-design', priority: '0.8', changefreq: 'monthly' },
    { path: '/design-services/mobile-app-design', priority: '0.8', changefreq: 'monthly' },
    { path: '/design-services/web-development', priority: '0.8', changefreq: 'monthly' },
  ];

  // Project routes with high priority for case studies
  const projectRoutes = [
    { path: '/project/herbalink', priority: '0.9', changefreq: 'monthly' },
    { path: '/project/splittime', priority: '0.9', changefreq: 'monthly' },
    { path: '/project/business-management', priority: '0.9', changefreq: 'monthly' },
    { path: '/project/investor-loan-app', priority: '0.8', changefreq: 'monthly' },
    { path: '/project/crypto', priority: '0.8', changefreq: 'monthly' },
  ];

  const allRoutes = [...staticRoutes, ...projectRoutes];

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  const sitemapPath = join(distDir, 'sitemap.xml');
  writeFileSync(sitemapPath, sitemapContent);
  console.log(`✅ Generated sitemap.xml with ${allRoutes.length} URLs`);
}

// Generate robots.txt
function generateRobots() {
  const robotsContent = `User-agent: *
Allow: /

# Sitemap location
Sitemap: https://barskydesign.pro/sitemap.xml

# Priority paths for crawlers
Allow: /projects/
Allow: /project/
Allow: /services/
Allow: /design-services/
Allow: /blog/
Allow: /contact/
Allow: /about/

# Allow crawling of assets
Allow: /assets/
Allow: /images/
Allow: /lovable-uploads/

# Crawl delay
Crawl-delay: 1`;

  const robotsPath = join(distDir, 'robots.txt');
  writeFileSync(robotsPath, robotsContent);
  console.log('✅ Generated robots.txt');
}

// Run generators
generateSitemap();
generateRobots();
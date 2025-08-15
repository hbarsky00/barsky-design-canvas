
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { getMetaConfigForRoute, generateMetaTags } from '../src/utils/prerenderMeta.js';

console.log('🏗️  Building React app with enhanced pre-rendering for social media...');

try {
  // Clean previous builds
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
    console.log('🧹 Cleaned previous build');
  }

  // Build the application
  execSync('vite build', { stdio: 'inherit' });
  console.log('✅ Vite build completed');

  // Run react-snap for prerendering
  console.log('🔄 Running react-snap prerendering...');
  execSync('npx react-snap', { stdio: 'inherit' });
  console.log('✅ React-snap prerendering completed');

  // Inject route-specific meta tags into prerendered HTML files
  console.log('🎨 Injecting route-specific meta tags...');
  await injectMetaTags();

  // Verify build files
  const distDir = 'dist';
  if (fs.existsSync(distDir)) {
    const getAllFiles = (dirPath, arrayOfFiles = []) => {
      const files = fs.readdirSync(dirPath);
      
      files.forEach((file) => {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
          arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
          arrayOfFiles.push(path.join(dirPath, "/", file));
        }
      });
      
      return arrayOfFiles;
    };

    const allFiles = getAllFiles(distDir);
    const htmlFiles = allFiles.filter(file => file.endsWith('.html'));
    
    console.log(`📄 Generated ${htmlFiles.length} HTML files with unique meta tags:`);
    htmlFiles.forEach(file => {
      const relativePath = path.relative(distDir, file);
      console.log(`  - ${relativePath}`);
    });

    // Verify meta tags in key files
    const keyFiles = ['index.html', 'projects/index.html', 'contact/index.html'];
    keyFiles.forEach(file => {
      const filePath = path.join(distDir, file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const hasOgTitle = content.includes('property="og:title"');
        const hasOgImage = content.includes('property="og:image"');
        const hasTwitterCard = content.includes('name="twitter:card"');
        console.log(`🔍 ${file}: Meta tags ${hasOgTitle && hasOgImage && hasTwitterCard ? '✅' : '❌'}`);
        
        if (!hasOgTitle || !hasOgImage || !hasTwitterCard) {
          console.log(`   Missing: ${!hasOgTitle ? 'og:title ' : ''}${!hasOgImage ? 'og:image ' : ''}${!hasTwitterCard ? 'twitter:card' : ''}`);
        }
      }
    });

    // Generate sitemap with all routes
    generateSitemap(htmlFiles);
  }

  console.log('🎉 Enhanced build complete with social media optimization!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

async function injectMetaTags() {
  const distDir = 'dist';
  const routes = [
    '/',
    '/projects',
    '/contact', 
    '/about',
    '/services',
    '/blog',
    '/project/herbalink',
    '/project/splittime',
    '/project/business-management',
    '/project/investor-loan-app',
    '/project/medication-app',
    '/project/gold2crypto',
    '/project/dae-search',
    '/project/barskyjoint',
    '/project/wholesale-distribution'
  ];

  for (const route of routes) {
    const htmlPath = route === '/' 
      ? path.join(distDir, 'index.html')
      : path.join(distDir, route, 'index.html');

    if (fs.existsSync(htmlPath)) {
      let html = fs.readFileSync(htmlPath, 'utf8');
      
      // Get meta config for this route
      const metaConfig = getMetaConfigForRoute(route);
      const metaTags = generateMetaTags(metaConfig);
      
      // Replace or inject meta tags in <head>
      if (html.includes('<title>')) {
        // Replace existing title and add our meta tags
        html = html.replace(/<title>.*?<\/title>/i, metaTags);
      } else {
        // Inject meta tags into head
        html = html.replace(/<\/head>/i, `${metaTags}\n</head>`);
      }
      
      // Write updated HTML
      fs.writeFileSync(htmlPath, html, 'utf8');
      console.log(`📝 Injected meta tags for ${route}`);
    }
  }
}

function generateSitemap(htmlFiles) {
  const baseUrl = 'https://barskydesign.pro';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${htmlFiles
  .map(file => {
    const relativePath = path.relative('dist', file);
    const url = relativePath === 'index.html' 
      ? baseUrl + '/'
      : baseUrl + '/' + relativePath.replace('/index.html', '/').replace('index.html', '');
    
    return `  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  fs.writeFileSync(path.join('dist', 'sitemap.xml'), sitemap);
  console.log('📍 Generated comprehensive sitemap.xml');
}

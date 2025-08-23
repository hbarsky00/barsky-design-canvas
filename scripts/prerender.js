import PrerenderSPAPlugin from 'prerender-spa-plugin';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');

// Ensure dist directory exists
if (!existsSync(distDir)) {
  console.error('❌ Dist directory not found. Run "npm run build:client" first.');
  process.exit(1);
}

// Routes to prerender
const routes = [
  '/',
  '/projects',
  '/about', 
  '/services',
  '/blog',
  '/contact'
];

console.log(`🚀 Starting SSG prerendering for ${routes.length} routes...`);

// Simple file-based prerendering approach
async function prerenderRoutes() {
  const indexPath = join(distDir, 'index.html');
  
  if (!existsSync(indexPath)) {
    console.error('❌ index.html not found in dist directory');
    return;
  }
  
  let indexContent = readFileSync(indexPath, 'utf-8');
  
  // Inject route-specific SEO data into the HTML template
  const routeConfigs = {
    '/': {
      title: 'Hiram Barsky — Product Design & AI',
      description: '15+ years creating AI-enhanced digital experiences. Specializing in UX research, design systems, and Gen AI integration.',
      canonical: 'https://barskydesign.pro/'
    },
    '/projects': {
      title: 'Projects — Hiram Barsky',
      description: 'Explore my portfolio of AI-enhanced digital experiences and innovative UX design solutions.',
      canonical: 'https://barskydesign.pro/projects'
    },
    '/about': {
      title: 'About — Hiram Barsky',
      description: 'Learn about my 15+ years in UX design, AI integration, and creating user-centered digital experiences.',
      canonical: 'https://barskydesign.pro/about'
    },
    '/services': {
      title: 'Services — Hiram Barsky',
      description: 'Professional UX/UI design, AI integration, and digital experience consulting services.',
      canonical: 'https://barskydesign.pro/services'
    },
    '/blog': {
      title: 'Blog — Hiram Barsky',
      description: 'Insights on UX design, AI integration, and modern digital product development.',
      canonical: 'https://barskydesign.pro/blog'
    },
    '/contact': {
      title: 'Contact — Hiram Barsky',
      description: 'Get in touch for UX design, AI integration, and digital experience consulting.',
      canonical: 'https://barskydesign.pro/contact'
    }
  };
  
  for (const route of routes) {
    const config = routeConfigs[route];
    if (!config) continue;
    
    // Create route-specific HTML with proper SEO tags
    let routeHtml = indexContent
      .replace(/<title>.*?<\/title>/, `<title>${config.title}</title>`)
      .replace(/name="description" content=".*?"/, `name="description" content="${config.description}"`)
      .replace(/rel="canonical" href=".*?"/, `rel="canonical" href="${config.canonical}"`)
      .replace(/property="og:title" content=".*?"/, `property="og:title" content="${config.title}"`)
      .replace(/property="og:description" content=".*?"/, `property="og:description" content="${config.description}"`)
      .replace(/property="og:url" content=".*?"/, `property="og:url" content="${config.canonical}"`);
    
    // Create directory structure for routes
    if (route !== '/') {
      const routeDir = join(distDir, route);
      if (!existsSync(routeDir)) {
        mkdirSync(routeDir, { recursive: true });
      }
      writeFileSync(join(routeDir, 'index.html'), routeHtml);
    } else {
      // Update root index.html
      writeFileSync(indexPath, routeHtml);
    }
    
    console.log(`✅ Prerendered: ${route}`);
  }
  
  console.log('🎉 SSG prerendering complete!');
  
  // Verify the homepage has proper SEO
  const finalIndex = readFileSync(indexPath, 'utf-8');
  const hasCorrectTitle = finalIndex.includes('Hiram Barsky — Product Design & AI');
  const hasCorrectDescription = finalIndex.includes('15+ years creating AI-enhanced digital experiences');
  const hasCanonical = finalIndex.includes('rel="canonical"');
  
  console.log('📊 Homepage SEO verification:', {
    hasCorrectTitle,
    hasCorrectDescription,
    hasCanonical,
    extractedTitle: finalIndex.match(/<title>(.*?)<\/title>/)?.[1] || 'Not found'
  });
  
  if (hasCorrectTitle && hasCorrectDescription && hasCanonical) {
    console.log('✅ Homepage SEO is properly configured!');
  } else {
    console.warn('⚠️ Homepage SEO may need attention');
  }
}

prerenderRoutes().catch(console.error);
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to get all project routes from data files
function getProjectRoutes() {
  const routes = [];
  
  try {
    // Add static project routes that we know exist
    const knownProjects = [
      'retail-pos-system',
      'ai-content-platform', 
      'healthcare-dashboard',
      'fintech-mobile-app',
      'saas-analytics-platform'
    ];
    
    knownProjects.forEach(project => {
      routes.push(`/project/${project}`);
    });
    
    console.log(`📄 Found ${routes.length} project routes for prerendering`);
  } catch (error) {
    console.warn('⚠️ Could not load project routes:', error.message);
  }
  
  return routes;
}

// Function to get all blog routes
function getBlogRoutes() {
  const routes = [];
  
  // Add known blog routes - these would typically come from your CMS
  // For now, we'll add a few example routes
  const knownPosts = [
    'ai-in-ux-design',
    'design-system-best-practices',
    'user-research-techniques'
  ];
  
  knownPosts.forEach(post => {
    routes.push(`/blog/${post}`);
  });
  
  console.log(`📝 Found ${routes.length} blog routes for prerendering`);
  return routes;
}

// Enhanced route configuration
const routes = [
  '/',
  '/projects', 
  '/about',
  '/services',
  '/blog',
  '/contact',
  ...getProjectRoutes(),
  ...getBlogRoutes()
];

console.log(`🚀 Starting prerender process for ${routes.length} routes...`);

// Simple prerender verification
function verifyPrerenderOutput() {
  const distDir = join(__dirname, 'dist');
  
  try {
    const indexHTML = readFileSync(join(distDir, 'index.html'), 'utf-8');
    
    // Check if SEO meta tags are present
    const hasTitle = indexHTML.includes('<title>') && !indexHTML.includes('<title></title>');
    const hasDescription = indexHTML.includes('name="description"');
    const hasCanonical = indexHTML.includes('rel="canonical"');
    const hasOgTags = indexHTML.includes('property="og:title"');
    
    console.log('✅ Prerender verification:', {
      hasTitle,
      hasDescription, 
      hasCanonical,
      hasOgTags,
      titleContent: indexHTML.match(/<title>(.*?)<\/title>/)?.[1] || 'Not found'
    });
    
    if (hasTitle && hasDescription && hasCanonical && hasOgTags) {
      console.log('🎉 SSG build successful! All SEO meta tags are properly rendered.');
    } else {
      console.warn('⚠️ Some SEO meta tags may be missing from prerendered HTML.');
    }
    
  } catch (error) {
    console.error('❌ Could not verify prerender output:', error.message);
  }
}

// Run verification
verifyPrerenderOutput();

export { routes };
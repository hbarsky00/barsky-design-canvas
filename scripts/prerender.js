import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');

// Supabase configuration for build-time SEO queries
const SUPABASE_URL = 'https://ctqttomppgkjbjkckise.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0cXR0b21wcGdramJqa2NraXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0Mjg1MzMsImV4cCI6MjA2MDAwNDUzM30.q15G4xYUtQqi7kdlha0C31LaIlYWBqPbIit-e9wq48Q';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Ensure dist directory exists
if (!existsSync(distDir)) {
  console.error('❌ Dist directory not found. Run "npm run build:client" first.');
  process.exit(1);
}

// Import unified data sources
function loadUnifiedSeoData() {
  try {
    // Load existing data sources that are used across the system
    const seoDataPath = join(__dirname, '..', 'src', 'data', 'seoData.ts');
    const seoDataContent = readFileSync(seoDataPath, 'utf-8');
    
    // Extract static page data
    const staticPagesMatch = seoDataContent.match(/STATIC_PAGE_SEO[^{]*{([^}]+)}/s);
    const projectsMatch = seoDataContent.match(/PROJECT_SEO_MAP[^{]*{([^}]+)}/s);
    const blogImagesMatch = seoDataContent.match(/BLOG_IMAGE_MAP[^{]*{([^}]+)}/s);
    
    console.log('✅ Using unified SEO data sources from seoData.ts');
    return { seoDataContent, staticPagesMatch, projectsMatch, blogImagesMatch };
  } catch (error) {
    console.warn('⚠️ Could not load unified SEO data:', error.message);
    return null;
  }
}

// Load blog data from actual source file
function loadBlogData() {
  try {
    const blogDataPath = join(__dirname, '..', 'src', 'data', 'blogData.ts');
    const content = readFileSync(blogDataPath, 'utf-8');
    
    // Extract blog post data - simplified parsing for key fields
    const posts = [];
    const postMatches = content.match(/{\s*id:\s*"([^"]+)"[\s\S]*?slug:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?excerpt:\s*"([^"]+)"[\s\S]*?coverImage:\s*"([^"]+)"[\s\S]*?}/g);
    
    if (postMatches) {
      postMatches.forEach(match => {
        const id = match.match(/id:\s*"([^"]+)"/)?.[1];
        const slug = match.match(/slug:\s*"([^"]+)"/)?.[1];
        const title = match.match(/title:\s*"([^"]+)"/)?.[1];
        const excerpt = match.match(/excerpt:\s*"([^"]+)"/)?.[1];
        const coverImage = match.match(/coverImage:\s*"([^"]+)"/)?.[1];
        
        if (id && slug && title && excerpt && coverImage) {
          posts.push({ id, slug, title, excerpt, coverImage });
        }
      });
    }
    
    console.log(`📝 Loaded ${posts.length} blog posts from blogData.ts`);
    return posts;
  } catch (error) {
    console.warn('⚠️ Could not load blog data:', error.message);
    return [];
  }
}

// Load project data from structured case studies
function loadProjectData() {
  try {
    const projectDataPath = join(__dirname, '..', 'src', 'data', 'structuredCaseStudies.ts');
    const content = readFileSync(projectDataPath, 'utf-8');
    
    // Extract project data - simplified parsing for key fields
    const projects = [];
    const projectMatches = content.match(/"([^"]+)":\s*{\s*id:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?description:\s*"([^"]+)"[\s\S]*?seoData:\s*{[\s\S]*?image:\s*"([^"]+)"[\s\S]*?}/g);
    
    if (projectMatches) {
      projectMatches.forEach(match => {
        const slug = match.match(/"([^"]+)":\s*{/)?.[1];
        const id = match.match(/id:\s*"([^"]+)"/)?.[1];
        const title = match.match(/title:\s*"([^"]+)"/)?.[1];
        const description = match.match(/description:\s*"([^"]+)"/)?.[1];
        const image = match.match(/seoData:\s*{[\s\S]*?image:\s*"([^"]+)"/)?.[1];
        
        if (slug && id && title && description && image) {
          projects.push({ slug, id, title, description, image });
        }
      });
    }
    
    console.log(`📄 Loaded ${projects.length} projects from structuredCaseStudies.ts`);
    return projects;
  } catch (error) {
    console.warn('⚠️ Could not load project data:', error.message);
    return [];
  }
}

// Fetch SEO data from Supabase at build time
async function fetchSupabaseSeo() {
  try {
    const { data, error } = await supabase
      .from('seo_meta')
      .select('*');
    
    if (error) {
      console.warn('⚠️ Could not fetch Supabase SEO data:', error.message);
      console.warn('⚠️ Falling back to TypeScript data sources');
      return {};
    }
    
    const seoMap = (data || []).reduce((acc, item) => {
      acc[item.slug] = item;
      return acc;
    }, {});
    
    console.log(`✅ Loaded ${Object.keys(seoMap).length} SEO records from Supabase`);
    return seoMap;
  } catch (error) {
    console.warn('⚠️ Error fetching Supabase SEO:', error.message);
    return {};
  }
}

// Load unified SEO data and existing sources  
const unifiedSeoData = loadUnifiedSeoData();
const blogPosts = loadBlogData();
const projects = loadProjectData();

const routes = [
  '/',
  '/projects', 
  '/about',
  '/services',
  '/blog',
  '/contact',
  ...projects.map(p => `/project/${p.slug}`),
  ...blogPosts.map(p => `/blog/${p.slug}`)
];

console.log(`🚀 Starting SSG prerendering for ${routes.length} routes...`);

// Updated SEO configuration using unified data sources
function getSEOConfig(route, supabaseSeoMap = {}) {
  const baseUrl = 'https://barskydesign.pro';
  const defaultImage = 'https://barskydesign.pro/images/hiram-barsky-profile.jpg';
  
  // Normalize slug for lookup
  let slug = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\/$/, '');
  
  // For project/blog routes, extract the slug
  if (route.startsWith('/project/')) {
    slug = route.split('/project/')[1];
  } else if (route.startsWith('/blog/')) {
    slug = route.split('/blog/')[1];
  }
  
  // Check Supabase first
  if (supabaseSeoMap[slug]) {
    const seo = supabaseSeoMap[slug];
    console.log(`✅ Using Supabase SEO for: ${route} (slug: ${slug})`);
    
    // Ensure URLs are absolute
    let imageUrl = seo.og_image_url || defaultImage;
    if (imageUrl.startsWith('/')) {
      imageUrl = `${baseUrl}${imageUrl}`;
    }
    
    return {
      title: seo.title,
      description: seo.description,
      canonical: seo.canonical_url || `${baseUrl}${route}`,
      image: imageUrl,
      type: seo.path_type === 'post' || seo.path_type === 'project' ? 'article' : 'website'
    };
  }
  
  // Fallback to existing TypeScript data logic
  console.log(`⚠️ Using fallback TypeScript data for: ${route}`);
  
  // Homepage
  if (route === '/') {
    return {
      title: 'Hiram Barsky - Senior UX Designer & Product Strategist',
      description: 'Senior UX Designer with 15+ years creating user-centered digital experiences. Specializing in design thinking, user research, and product strategy.',
      canonical: baseUrl,
      image: defaultImage,
      type: 'website'
    };
  }
  
  // Projects page
  if (route === '/projects') {
    return {
      title: 'UX Design Projects & Case Studies - Hiram Barsky',
      description: 'Explore detailed UX design case studies showcasing user research, design thinking, and product strategy across healthcare, fintech, and SaaS platforms.',
      canonical: `${baseUrl}/projects`,
      image: 'https://barskyux.com/wp-content/uploads/2025/08/projects-showcase.png',
      type: 'website'
    };
  }
  
  // About page
  if (route === '/about') {
    return {
      title: 'About Hiram Barsky - Senior UX Designer & Design Leader',
      description: 'Learn about Hiram Barsky\'s 15+ year journey in UX design, from startup founder to design leader at Fortune 500 companies.',
      canonical: `${baseUrl}/about`,
      image: defaultImage,
      type: 'profile'
    };
  }
  
  // Services page
  if (route === '/services') {
    return {
      title: 'UX Design Services - User Research, Strategy & Design Systems',
      description: 'Comprehensive UX design services including user research, design strategy, prototyping, and design system development for digital products.',
      canonical: `${baseUrl}/services`,
      image: 'https://barskyux.com/wp-content/uploads/2025/08/services-overview.png',
      type: 'website'
    };
  }
  
  // Blog page
  if (route === '/blog') {
    return {
      title: 'UX Design Blog - Insights, Tips & Industry Trends',
      description: 'Expert insights on UX design, user research, design systems, and product strategy from a senior designer with 15+ years of experience.',
      canonical: `${baseUrl}/blog`,
      image: 'https://barskyux.com/wp-content/uploads/2025/08/blog-header.png',
      type: 'website'
    };
  }
  
  // Contact page
  if (route === '/contact') {
    return {
      title: 'Contact Hiram Barsky - UX Design Consultation & Collaboration',
      description: 'Get in touch for UX design consultation, project collaboration, or speaking opportunities. Let\'s create exceptional user experiences together.',
      canonical: `${baseUrl}/contact`,
      image: defaultImage,
      type: 'website'
    };
  }
  
  // Individual project pages
  if (route.startsWith('/project/')) {
    const projectSlug = route.split('/project/')[1];
    const project = projects.find(p => p.slug === projectSlug);
    
    if (project) {
      // Convert relative URLs to absolute URLs
      let imageUrl = project.image;
      if (imageUrl.startsWith('/')) {
        imageUrl = `${baseUrl}${imageUrl}`;
      }
      
      return {
        title: `${project.title} - UX Case Study by Hiram Barsky`,
        description: project.description,
        canonical: `${baseUrl}/project/${projectSlug}`,
        image: imageUrl,
        type: 'article'
      };
    }
  }
  
  // Individual blog posts
  if (route.startsWith('/blog/')) {
    const blogSlug = route.split('/blog/')[1];
    const post = blogPosts.find(p => p.slug === blogSlug);
    
    if (post) {
      // Convert relative URLs to absolute URLs
      let imageUrl = post.coverImage;
      if (imageUrl.startsWith('/')) {
        imageUrl = `${baseUrl}${imageUrl}`;
      }
      
      return {
        title: `${post.title} - UX Design Blog`,
        description: post.excerpt,
        canonical: `${baseUrl}/blog/${blogSlug}`,
        image: imageUrl,
        type: 'article'
      };
    }
  }
  
  // Fallback
  return {
    title: 'Hiram Barsky - Senior UX Designer',
    description: 'Senior UX Designer creating exceptional user experiences.',
    canonical: `${baseUrl}${route}`,
    image: defaultImage,
    type: 'website'
  };
}

// Main prerender function
async function prerenderRoutes() {
  // Fetch Supabase SEO data at build time
  const supabaseSeoMap = await fetchSupabaseSeo();
  
  const indexPath = join(distDir, 'index.html');
  
  if (!existsSync(indexPath)) {
    console.error('❌ index.html not found in dist directory');
    return;
  }
  
  let indexContent = readFileSync(indexPath, 'utf-8');
  
  console.log('📄 Base HTML loaded, starting route processing...');
  
  // Process each route
  for (const route of routes) {
    try {
      const seoConfig = getSEOConfig(route, supabaseSeoMap);
      
      // Replace meta tags in HTML
      let html = indexContent;
      
      // Update title
      html = html.replace(
        /<title>.*?<\/title>/,
        `<title>${seoConfig.title}</title>`
      );
      
      // Update or add meta description
      if (html.includes('name="description"')) {
        html = html.replace(
          /(<meta\s+name="description"\s+content=")[^"]*(")/,
          `$1${seoConfig.description}$2`
        );
      } else {
        html = html.replace(
          /<head>/,
          `<head>\n    <meta name="description" content="${seoConfig.description}">`
        );
      }
      
      // Update or add canonical URL
      if (html.includes('rel="canonical"')) {
        html = html.replace(
          /(<link\s+rel="canonical"\s+href=")[^"]*(")/,
          `$1${seoConfig.canonical}$2`
        );
      } else {
        html = html.replace(
          /<head>/,
          `<head>\n    <link rel="canonical" href="${seoConfig.canonical}">`
        );
      }
      
      // Update or add Open Graph tags
      const ogTags = [
        `<meta property="og:title" content="${seoConfig.title}">`,
        `<meta property="og:description" content="${seoConfig.description}">`,
        `<meta property="og:image" content="${seoConfig.image}">`,
        `<meta property="og:url" content="${seoConfig.canonical}">`,
        `<meta property="og:type" content="${seoConfig.type}">`,
        `<meta property="og:site_name" content="Hiram Barsky - UX Designer">`
      ];
      
      // Remove existing OG tags
      html = html.replace(/<meta\s+property="og:[^"]*"\s+content="[^"]*">/g, '');
      
      // Add new OG tags
      html = html.replace(
        /<head>/,
        `<head>\n    ${ogTags.join('\n    ')}`
      );
      
      // Update or add Twitter Card tags
      const twitterTags = [
        `<meta name="twitter:card" content="summary_large_image">`,
        `<meta name="twitter:title" content="${seoConfig.title}">`,
        `<meta name="twitter:description" content="${seoConfig.description}">`,
        `<meta name="twitter:image" content="${seoConfig.image}">`,
        `<meta name="twitter:creator" content="@hirambarsky">`
      ];
      
      // Remove existing Twitter tags
      html = html.replace(/<meta\s+name="twitter:[^"]*"\s+content="[^"]*">/g, '');
      
      // Add new Twitter tags
      html = html.replace(
        /<head>/,
        `<head>\n    ${twitterTags.join('\n    ')}`
      );
      
      // Create directory structure if needed
      let outputPath;
      if (route === '/') {
        outputPath = join(distDir, 'index.html');
      } else {
        const routeDir = join(distDir, route.slice(1));
        try {
          mkdirSync(routeDir, { recursive: true });
        } catch (error) {
          // Directory might already exist
        }
        outputPath = join(routeDir, 'index.html');
      }
      
      // Write the processed HTML
      writeFileSync(outputPath, html);
      console.log(`✅ Generated: ${route} -> ${outputPath}`);
      
    } catch (error) {
      console.error(`❌ Error processing route ${route}:`, error.message);
    }
  }
  
  console.log(`🎉 Prerendering complete! Generated ${routes.length} routes.`);
}

// Verification function
function verifyPrerenderOutput() {
  const indexPath = join(distDir, 'index.html');
  
  try {
    // Check homepage
    const indexHTML = readFileSync(indexPath, 'utf-8');
    
    const hasTitle = indexHTML.includes('<title>') && !indexHTML.includes('<title></title>');
    const hasDescription = indexHTML.includes('name="description"');
    const hasCanonical = indexHTML.includes('rel="canonical"');
    const hasOgTags = indexHTML.includes('property="og:title"');
    const hasTwitterTags = indexHTML.includes('name="twitter:card"');
    
    console.log('✅ Homepage verification:', {
      hasTitle,
      hasDescription, 
      hasCanonical,
      hasOgTags,
      hasTwitterTags,
      titleContent: indexHTML.match(/<title>(.*?)<\/title>/)?.[1] || 'Not found'
    });
    
    // Check a project page if available
    const projectDir = join(distDir, 'project', 'herbalink');
    try {
      const projectHTML = readFileSync(join(projectDir, 'index.html'), 'utf-8');
      const projectTitle = projectHTML.match(/<title>(.*?)<\/title>/)?.[1];
      const projectImage = projectHTML.match(/property="og:image"\s+content="([^"]*)"/)?.[1];
      
      console.log('✅ Project page verification:', {
        title: projectTitle,
        image: projectImage,
        hasProjectSpecificContent: projectTitle?.includes('HerbaLink') || false
      });
    } catch (error) {
      console.log('⚠️ Could not verify project page (may not exist yet)');
    }
    
    if (hasTitle && hasDescription && hasCanonical && hasOgTags && hasTwitterTags) {
      console.log('🎉 SSG build successful! All SEO meta tags are properly rendered.');
    } else {
      console.warn('⚠️ Some SEO meta tags may be missing from prerendered HTML.');
    }
    
  } catch (error) {
    console.error('❌ Could not verify prerender output:', error.message);
  }
}

// Run prerendering and verification
prerenderRoutes().then(() => {
  verifyPrerenderOutput();
}).catch(console.error);
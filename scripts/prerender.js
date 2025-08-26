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

// Load data from actual source files
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

// Enhanced route configuration with dynamic data
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

// SEO configuration for each route type
function getSEOConfig(route) {
  const baseUrl = 'https://barskyux.com';
  const defaultImage = 'https://barskyux.com/wp-content/uploads/2025/08/hiram-professional-headshot.png';
  
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
      const seoConfig = getSEOConfig(route);
      
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
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');

// Ensure dist directory exists
if (!existsSync(distDir)) {
  console.error('❌ Dist directory not found. Run "npm run build" first.');
  process.exit(1);
}

// Load data from actual source files
function loadBlogData() {
  try {
    const blogDataPath = join(__dirname, '..', 'src', 'data', 'blogData.ts');
    const content = readFileSync(blogDataPath, 'utf-8');
    
    // Extract blog post data - simplified parsing for key fields
    const posts = [];
    const postMatches = content.match(/{\s*id:\s*"([^"]+)"[\s\S]*?slug:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?excerpt:\s*"([^"]+)"[\s\S]*?coverImage:\s*"([^"]+)"[\s\S]*?date:\s*"([^"]+)"[\s\S]*?}/g);
    
    if (postMatches) {
      postMatches.forEach(match => {
        const id = match.match(/id:\s*"([^"]+)"/)?.[1];
        const slug = match.match(/slug:\s*"([^"]+)"/)?.[1];
        const title = match.match(/title:\s*"([^"]+)"/)?.[1];
        const excerpt = match.match(/excerpt:\s*"([^"]+)"/)?.[1];
        const coverImage = match.match(/coverImage:\s*"([^"]+)"/)?.[1];
        const date = match.match(/date:\s*"([^"]+)"/)?.[1];
        
        if (id && slug && title && excerpt && coverImage && date) {
          posts.push({ id, slug, title, excerpt, coverImage, date });
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
    
    // Extract project data from the structured case studies
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
  '/design-services/ux-ui-design',
  '/design-services/mobile-app-design',
  '/design-services/web-development',
  ...projects.map(p => `/project/${p.slug}`),
  ...blogPosts.map(p => `/blog/${p.slug}`)
];

console.log(`🚀 Starting SSG prerendering for ${routes.length} routes...`);

// Enhanced SEO configuration for each route type
function getSEOConfig(route) {
  const baseUrl = 'https://barskydesign.pro';
  const defaultImage = 'https://barskydesign.pro/images/hiram-barsky-profile.jpg';
  const siteName = 'Hiram Barsky – Product Designer & Gen AI Developer';
  const author = 'Hiram Barsky';
  
  // Homepage
  if (route === '/') {
    return {
      title: siteName,
      description: 'Transforming complex problems into intuitive digital experiences with data-driven design and AI-powered solutions.',
      canonical: baseUrl,
      image: defaultImage,
      type: 'website',
      structuredData: generateWebsiteStructuredData(baseUrl, siteName)
    };
  }
  
  // Projects page
  if (route === '/projects') {
    return {
      title: 'UX Design Projects & Case Studies - Hiram Barsky',
      description: 'Explore detailed UX design case studies showcasing user research, design thinking, and product strategy across healthcare, fintech, and SaaS platforms.',
      canonical: `${baseUrl}/projects`,
      image: defaultImage,
      type: 'website',
      structuredData: generatePageStructuredData(`${baseUrl}/projects`, 'UX Design Projects & Case Studies', 'Explore detailed UX design case studies', defaultImage)
    };
  }
  
  // About page
  if (route === '/about') {
    return {
      title: 'About Hiram Barsky - Senior UX Designer & Design Leader',
      description: 'Learn about Hiram Barsky\'s journey in UX design, product strategy, and AI-powered solutions for digital experiences.',
      canonical: `${baseUrl}/about`,
      image: defaultImage,
      type: 'profile',
      structuredData: generatePersonStructuredData(author, defaultImage)
    };
  }
  
  // Services page
  if (route === '/services') {
    return {
      title: 'UX Design Services - User Research, Strategy & Design Systems',
      description: 'Comprehensive UX design services including user research, design strategy, prototyping, and design system development for digital products.',
      canonical: `${baseUrl}/services`,
      image: defaultImage,
      type: 'website',
      structuredData: generateServiceStructuredData(`${baseUrl}/services`, 'UX Design Services', 'Comprehensive UX design services', defaultImage)
    };
  }
  
  // Blog page
  if (route === '/blog') {
    return {
      title: 'UX Design Blog - Insights, Tips & Industry Trends',
      description: 'Expert insights on UX design, user research, design systems, and product strategy from a senior designer with AI expertise.',
      canonical: `${baseUrl}/blog`,
      image: defaultImage,
      type: 'website',
      structuredData: generateBlogStructuredData(`${baseUrl}/blog`, 'UX Design Blog', 'Expert insights on UX design', defaultImage)
    };
  }
  
  // Contact page
  if (route === '/contact') {
    return {
      title: 'Contact Hiram Barsky - UX Design Consultation & Collaboration',
      description: 'Get in touch for UX design consultation, project collaboration, or speaking opportunities. Let\'s create exceptional user experiences together.',
      canonical: `${baseUrl}/contact`,
      image: defaultImage,
      type: 'website',
      structuredData: generateContactStructuredData(`${baseUrl}/contact`, 'Contact Hiram Barsky', 'Get in touch for UX design consultation', defaultImage)
    };
  }

  // Design service pages
  if (route === '/design-services/ux-ui-design') {
    return {
      title: 'UX/UI Design Services - User-Centered Design Solutions',
      description: 'Professional UX/UI design services focused on user research, interface design, and creating intuitive digital experiences.',
      canonical: `${baseUrl}/design-services/ux-ui-design`,
      image: defaultImage,
      type: 'website',
      structuredData: generateServiceStructuredData(`${baseUrl}/design-services/ux-ui-design`, 'UX/UI Design Services', 'Professional UX/UI design services', defaultImage)
    };
  }

  if (route === '/design-services/mobile-app-design') {
    return {
      title: 'Mobile App Design Services - iOS & Android UX Design',
      description: 'Specialized mobile app design services for iOS and Android platforms, focusing on user experience and interface optimization.',
      canonical: `${baseUrl}/design-services/mobile-app-design`,
      image: defaultImage,
      type: 'website',
      structuredData: generateServiceStructuredData(`${baseUrl}/design-services/mobile-app-design`, 'Mobile App Design Services', 'Specialized mobile app design services', defaultImage)
    };
  }

  if (route === '/design-services/web-development') {
    return {
      title: 'Web Development Services - Frontend & Full-Stack Solutions',
      description: 'Professional web development services combining design and development expertise for modern, responsive web applications.',
      canonical: `${baseUrl}/design-services/web-development`,
      image: defaultImage,
      type: 'website',
      structuredData: generateServiceStructuredData(`${baseUrl}/design-services/web-development`, 'Web Development Services', 'Professional web development services', defaultImage)
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
        title: `${project.title} - Case Study by Hiram Barsky`,
        description: project.description,
        canonical: `${baseUrl}/project/${projectSlug}`,
        image: imageUrl,
        type: 'article',
        structuredData: generateArticleStructuredData(
          `${baseUrl}/project/${projectSlug}`,
          project.title,
          project.description,
          imageUrl,
          author,
          new Date().toISOString()
        )
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
        type: 'article',
        structuredData: generateArticleStructuredData(
          `${baseUrl}/blog/${blogSlug}`,
          post.title,
          post.excerpt,
          imageUrl,
          author,
          post.date
        )
      };
    }
  }
  
  // Fallback
  return {
    title: siteName,
    description: 'Senior UX Designer creating exceptional user experiences.',
    canonical: `${baseUrl}${route}`,
    image: defaultImage,
    type: 'website',
    structuredData: generatePageStructuredData(`${baseUrl}${route}`, siteName, 'Senior UX Designer creating exceptional user experiences', defaultImage)
  };
}

// Structured Data Generators
function generateWebsiteStructuredData(url, name) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": name,
    "url": url,
    "description": "Transforming complex problems into intuitive digital experiences with data-driven design and AI-powered solutions.",
    "author": {
      "@type": "Person",
      "name": "Hiram Barsky"
    }
  };
}

function generatePersonStructuredData(name, image) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": name,
    "image": image,
    "jobTitle": "Product Designer & Gen AI Developer",
    "description": "UX Designer specializing in user research, design thinking, and AI-powered solutions.",
    "url": "https://barskydesign.pro/about"
  };
}

function generateArticleStructuredData(url, title, description, image, author, datePublished) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image,
    "url": url,
    "datePublished": datePublished,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Hiram Barsky Design",
      "logo": {
        "@type": "ImageObject",
        "url": "https://barskydesign.pro/images/hiram-barsky-profile.jpg"
      }
    }
  };
}

function generatePageStructuredData(url, name, description, image) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": name,
    "description": description,
    "url": url,
    "image": image
  };
}

function generateServiceStructuredData(url, name, description, image) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "url": url,
    "image": image,
    "provider": {
      "@type": "Person",
      "name": "Hiram Barsky"
    }
  };
}

function generateBlogStructuredData(url, name, description, image) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": name,
    "description": description,
    "url": url,
    "image": image,
    "author": {
      "@type": "Person",
      "name": "Hiram Barsky"
    }
  };
}

function generateContactStructuredData(url, name, description, image) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": name,
    "description": description,
    "url": url,
    "image": image
  };
}

// HTML escaping utilities
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
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
        `<title>${escapeHtml(seoConfig.title)}</title>`
      );
      
      // Remove existing meta tags to avoid duplicates
      html = html.replace(/<meta\s+name="description"[^>]*>/g, '');
      html = html.replace(/<link\s+rel="canonical"[^>]*>/g, '');
      html = html.replace(/<meta\s+property="og:[^"]*"[^>]*>/g, '');
      html = html.replace(/<meta\s+name="twitter:[^"]*"[^>]*>/g, '');
      html = html.replace(/<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g, '');
      
      // Add comprehensive meta tags
      const metaTags = [
        `<meta name="description" content="${escapeHtml(seoConfig.description)}">`,
        `<link rel="canonical" href="${seoConfig.canonical}">`,
        `<meta name="robots" content="index,follow">`,
        
        // Open Graph
        `<meta property="og:title" content="${escapeHtml(seoConfig.title)}">`,
        `<meta property="og:description" content="${escapeHtml(seoConfig.description)}">`,
        `<meta property="og:image" content="${seoConfig.image}">`,
        `<meta property="og:url" content="${seoConfig.canonical}">`,
        `<meta property="og:type" content="${seoConfig.type}">`,
        `<meta property="og:site_name" content="Hiram Barsky – Product Designer & Gen AI Developer">`,
        `<meta property="og:locale" content="en_US">`,
        
        // Twitter Card
        `<meta name="twitter:card" content="summary_large_image">`,
        `<meta name="twitter:title" content="${escapeHtml(seoConfig.title)}">`,
        `<meta name="twitter:description" content="${escapeHtml(seoConfig.description)}">`,
        `<meta name="twitter:image" content="${seoConfig.image}">`,
        `<meta name="twitter:creator" content="@hirambarsky">`,
        `<meta name="twitter:site" content="@hirambarsky">`,
        
        // Additional meta tags
        `<meta name="author" content="Hiram Barsky">`,
        `<meta name="theme-color" content="#3B82F6">`,
        `<meta name="viewport" content="width=device-width, initial-scale=1">`,
        
        // Structured Data
        `<script type="application/ld+json">${JSON.stringify(seoConfig.structuredData, null, 2)}</script>`
      ];
      
      // Add all meta tags after <head>
      html = html.replace(
        /<head>/,
        `<head>\n    ${metaTags.join('\n    ')}`
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
    const hasStructuredData = indexHTML.includes('application/ld+json');
    
    console.log('✅ Homepage verification:', {
      hasTitle,
      hasDescription, 
      hasCanonical,
      hasOgTags,
      hasTwitterTags,
      hasStructuredData,
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
    
    if (hasTitle && hasDescription && hasCanonical && hasOgTags && hasTwitterTags && hasStructuredData) {
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
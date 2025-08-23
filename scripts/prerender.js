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

// Project and blog route definitions
const blogPostSlugs = ['finding-first-ux-job-guide', 'design-systems-that-get-used', 'portfolio-red-flags-no-interviews', 'ai-enhanced-ux-designer-future', 'user-research-shoestring-budget', 'built-product-without-real-data', 'building-products-nobody-asked-for', 'wireframes-to-wow-visual-hierarchy'];

// Get project and blog routes dynamically
const projectRoutes = ['herbalink', 'splittime', 'business-management', 'investor-loan-app'].map(key => `/project/${key}`);
const blogRoutes = blogPostSlugs.map(slug => `/blog/${slug}`);

// Routes to prerender
const routes = [
  '/',
  '/projects',
  '/about', 
  '/services',
  '/blog',
  '/contact',
  ...projectRoutes,
  ...blogRoutes
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
  
  // Generate route-specific SEO data dynamically
  const routeConfigs = {
    '/': {
      title: 'Senior Product Designer & AI Strategist — Hiram Barsky',
      description: 'Transforming complex problems into intuitive digital experiences through strategic design and AI integration.',
      canonical: 'https://barskydesign.pro/',
      image: 'https://barskyux.com/wp-content/uploads/2025/06/IMG_20250531_123836_952.webp'
    },
    '/projects': {
      title: 'Projects — Hiram Barsky',
      description: 'Explore my portfolio of AI-enhanced digital experiences and innovative UX design solutions.',
      canonical: 'https://barskydesign.pro/projects',
      image: 'https://barskyux.com/wp-content/uploads/2025/06/IMG_20250531_123836_952.webp'
    },
    '/about': {
      title: 'About — Hiram Barsky',
      description: 'Learn about my 15+ years in UX design, AI integration, and creating user-centered digital experiences.',
      canonical: 'https://barskydesign.pro/about',
      image: 'https://barskyux.com/wp-content/uploads/2025/06/IMG_20250531_123836_952.webp'
    },
    '/services': {
      title: 'Services — Hiram Barsky',
      description: 'Professional UX/UI design, AI integration, and digital experience consulting services.',
      canonical: 'https://barskydesign.pro/services',
      image: 'https://barskyux.com/wp-content/uploads/2025/06/IMG_20250531_123836_952.webp'
    },
    '/blog': {
      title: 'Blog — Hiram Barsky',
      description: 'Insights on UX design, AI integration, and modern digital product development.',
      canonical: 'https://barskydesign.pro/blog',
      image: 'https://barskyux.com/wp-content/uploads/2025/06/IMG_20250531_123836_952.webp'
    },
    '/contact': {
      title: 'Contact — Hiram Barsky',
      description: 'Get in touch for UX design, AI integration, and digital experience consulting.',
      canonical: 'https://barskydesign.pro/contact',
      image: 'https://barskyux.com/wp-content/uploads/2025/06/IMG_20250531_123836_952.webp'
    }
  };

  // Add project-specific routes dynamically
  const projectData = {
    'herbalink': {
      title: 'Using Design Thinking to Achieve 3x More Bookings for Certified Herbalists',
      description: 'Connected users to certified herbalists across the country and increased booking rates by 3x through AI-powered matching and streamlined UX.',
      image: 'https://barskyux.com/wp-content/uploads/2025/08/Bookanherbalistpromomobile.png'
    },
    'splittime': {
      title: 'Design Thinking Approach to Reducing Co-Parenting Conflict by 40%',
      description: 'Reduced co-parenting conflict by 40% through clear scheduling and neutral communication tools designed for high-stress family situations.',
      image: 'https://i0.wp.com/barskyux.com/wp-content/uploads/2024/01/Frame-4.jpg?fit=1920%2C1080&ssl=1'
    },
    'business-management': {
      title: '68% Fewer Errors: Streamlining Enterprise Operations',
      description: 'Improved internal operations and reduced manual entry errors by 68% with one central tool.',
      image: '/lovable-uploads/4408b539-65ee-460c-9f7d-6303241781d0.png'
    },
    'investor-loan-app': {
      title: 'Investment Platform: Modernizing Loan Management',
      description: 'Streamlined loan management and investment tracking platform.',
      image: '/lovable-uploads/70efa220-d524-4d37-a9de-fbec00205917.png'
    }
  };

  Object.entries(projectData).forEach(([id, project]) => {
    const route = `/project/${id}`;
    routeConfigs[route] = {
      title: `${project.title} — Hiram Barsky`,
      description: project.description,
      canonical: `https://barskydesign.pro${route}`,
      image: project.image
    };
  });

  // Add blog post routes dynamically
  const blogData = {
    'finding-first-ux-job-guide': {
      title: 'Finding Your First UX Job: A Senior Designer\'s Honest Guide',
      excerpt: 'Breaking into UX can feel like trying to solve a puzzle with missing pieces. After 15+ years in the field, here\'s the reality check nobody talks about.',
      image: '/blog-finding-ux-job.jpg'
    },
    'design-systems-that-get-used': {
      title: 'Building Design Systems That Actually Get Used (Not Shelved)',
      excerpt: 'I\'ve seen more design systems die in Figma libraries than I care to count. Here\'s how to build ones that actually get used.',
      image: '/blog-design-systems.jpg'
    },
    'portfolio-red-flags-no-interviews': {
      title: 'Portfolio Red Flags: Why Your UX Portfolio Isn\'t Getting You Interviews',
      excerpt: 'Your portfolio gets views but no interviews? After reviewing hundreds of UX portfolios, I\'ve identified the red flags killing your chances.',
      image: '/blog-portfolio-red-flags.jpg'
    }
  };

  Object.entries(blogData).forEach(([slug, post]) => {
    const route = `/blog/${slug}`;
    routeConfigs[route] = {
      title: `${post.title} — Hiram Barsky`,
      description: post.excerpt,
      canonical: `https://barskydesign.pro${route}`,
      image: post.image ? `https://barskydesign.pro${post.image}` : 'https://barskyux.com/wp-content/uploads/2025/06/IMG_20250531_123836_952.webp'
    };
  });
  
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
      .replace(/property="og:url" content=".*?"/, `property="og:url" content="${config.canonical}"`)
      .replace(/property="og:image" content=".*?"/, `property="og:image" content="${config.image}"`)
      .replace(/name="twitter:title" content=".*?"/, `name="twitter:title" content="${config.title}"`)
      .replace(/name="twitter:description" content=".*?"/, `name="twitter:description" content="${config.description}"`)
      .replace(/name="twitter:image" content=".*?"/, `name="twitter:image" content="${config.image}"`);
    
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
  const hasCorrectTitle = finalIndex.includes('Senior Product Designer & AI Strategist — Hiram Barsky');
  const hasCorrectDescription = finalIndex.includes('Transforming complex problems into intuitive digital experiences');
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
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the structured case studies data
const structuredCaseStudiesPath = path.join(__dirname, '../src/data/structuredCaseStudies.ts');
const structuredCaseStudiesContent = fs.readFileSync(structuredCaseStudiesPath, 'utf8');

// Read the blog data
const blogDataPath = path.join(__dirname, '../src/data/blogData.ts');
const blogDataContent = fs.readFileSync(blogDataPath, 'utf8');

// Extract blog posts data
function extractBlogData(content) {
  const blogPosts = [];
  
  // Extract all blog post objects from the array
  const blogPostsMatch = content.match(/export const blogPosts: BlogPost\[\] = \[([\s\S]*?)\];/);
  if (blogPostsMatch) {
    const postsContent = blogPostsMatch[1];
    
    // Find individual blog post objects
    const postMatches = postsContent.match(/{\s*id:\s*"([^"]*)"[\s\S]*?title:\s*"([^"]*)"[\s\S]*?excerpt:\s*"([^"]*)"[\s\S]*?coverImage:\s*"([^"]*)"[\s\S]*?slug:\s*"([^"]*)"[\s\S]*?}/g);
    
    if (postMatches) {
      postMatches.forEach(postMatch => {
        const idMatch = postMatch.match(/id:\s*"([^"]*)"/);
        const titleMatch = postMatch.match(/title:\s*"([^"]*)"/);
        const excerptMatch = postMatch.match(/excerpt:\s*"([^"]*)"/);
        const imageMatch = postMatch.match(/coverImage:\s*"([^"]*)"/);
        const slugMatch = postMatch.match(/slug:\s*"([^"]*)"/);
        
        if (idMatch && titleMatch && excerptMatch && imageMatch && slugMatch) {
          blogPosts.push({
            id: idMatch[1],
            title: titleMatch[1],
            excerpt: excerptMatch[1],
            coverImage: imageMatch[1],
            slug: slugMatch[1]
          });
        }
      });
    }
  }
  
  return blogPosts;
}

// Extract individual case study data
function extractCaseStudyData(content) {
  const caseStudies = {};
  
  // Extract herbalink data
  const herbalinkMatch = content.match(/"herbalink":\s*{[\s\S]*?title:\s*"([^"]*)"[\s\S]*?description:\s*"([^"]*)"[\s\S]*?seoData:\s*{[\s\S]*?title:\s*"([^"]*)"[\s\S]*?description:\s*"([^"]*)"[\s\S]*?image:\s*"([^"]*)"[\s\S]*?}/);
  if (herbalinkMatch) {
    caseStudies.herbalink = {
      title: herbalinkMatch[1],
      description: herbalinkMatch[2],
      seoTitle: herbalinkMatch[3],
      seoDescription: herbalinkMatch[4],
      image: herbalinkMatch[5]
    };
  }
  
  // Extract splittime data
  const splittimeMatch = content.match(/"splittime":\s*{[\s\S]*?title:\s*"([^"]*)"[\s\S]*?description:\s*"([^"]*)"[\s\S]*?seoData:\s*{[\s\S]*?title:\s*"([^"]*)"[\s\S]*?description:\s*"([^"]*)"[\s\S]*?image:\s*"([^"]*)"[\s\S]*?}/);
  if (splittimeMatch) {
    caseStudies.splittime = {
      title: splittimeMatch[1],
      description: splittimeMatch[2],
      seoTitle: splittimeMatch[3],
      seoDescription: splittimeMatch[4],
      image: splittimeMatch[5]
    };
  }
  
  // Extract investment-app data
  const investmentMatch = content.match(/"investment-app":\s*{[\s\S]*?title:\s*"([^"]*)"[\s\S]*?description:\s*"([^"]*)"[\s\S]*?seoData:\s*{[\s\S]*?title:\s*"([^"]*)"[\s\S]*?description:\s*"([^"]*)"[\s\S]*?image:\s*"([^"]*)"[\s\S]*?}/);
  if (investmentMatch) {
    caseStudies['investment-app'] = {
      title: investmentMatch[1],
      description: investmentMatch[2],
      seoTitle: investmentMatch[3],
      seoDescription: investmentMatch[4],
      image: investmentMatch[5]
    };
  }
  
  // Extract investor-loan-app data
  const investorLoanMatch = content.match(/"investor-loan-app":\s*{[\s\S]*?title:\s*"([^"]*)"[\s\S]*?description:\s*"([^"]*)"[\s\S]*?seoData:\s*{[\s\S]*?title:\s*"([^"]*)"[\s\S]*?description:\s*"([^"]*)"[\s\S]*?image:\s*"([^"]*)"[\s\S]*?}/);
  if (investorLoanMatch) {
    caseStudies['investor-loan-app'] = {
      title: investorLoanMatch[1],
      description: investorLoanMatch[2],
      seoTitle: investorLoanMatch[3],
      seoDescription: investorLoanMatch[4],
      image: investorLoanMatch[5]
    };
  }
  
  return caseStudies;
}

const extractedCaseStudies = extractCaseStudyData(structuredCaseStudiesContent);
const extractedBlogPosts = extractBlogData(blogDataContent);
console.log('Extracted case studies:', Object.keys(extractedCaseStudies));
console.log('Extracted blog posts:', extractedBlogPosts.length);

// Base HTML template
const baseHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');

// SEO constants
const BASE_URL = 'https://barskydesign.pro';
const DEFAULT_IMAGE = 'https://barskyux.com/wp-content/uploads/2025/06/IMG_20250531_123836_952.webp';

// Comprehensive SEO data for all routes
const allPagesSEOData = {
  // Homepage
  '/': {
    title: 'Hiram Barsky Design - AI-Enhanced UX Design & Research',
    description: '15+ years creating AI-enhanced digital experiences. Specializing in UX research, design systems, and Gen AI integration for businesses looking to transform their products with intelligent design solutions.',
    image: DEFAULT_IMAGE,
    url: BASE_URL
  },

  // Project pages - dynamically generated from structured case studies
  ...(() => {
    const projectPages = {};
    
    // Generate SEO data for each extracted case study
    Object.entries(extractedCaseStudies).forEach(([id, data]) => {
      const routeMapping = {
        'herbalink': '/project/herbalink',
        'splittime': '/project/splittime',
        'investment-app': '/project/investment-app',
        'investor-loan-app': '/project/investor-loan'
      };
      
      const route = routeMapping[id];
      if (route) {
        projectPages[route] = {
          title: data.seoTitle || data.title,
          description: data.seoDescription || data.description,
          image: data.image || DEFAULT_IMAGE,
          url: `${BASE_URL}${route}`
        };
      }
    });
    
    // Add fallback for any missing projects
    const fallbackProjects = {
      '/project/business-management': {
        title: 'Business Management Case Study - Hiram Barsky Design', 
        description: 'Comprehensive case study of the Business Management project showcasing UX design and development process.',
        image: DEFAULT_IMAGE,
        url: `${BASE_URL}/project/business-management`
      },
      '/project/wholesale-distribution': {
        title: 'Wholesale Distribution Case Study - Hiram Barsky Design',
        description: 'Comprehensive case study of the Wholesale Distribution project showcasing UX design and development process.',
        image: DEFAULT_IMAGE,
        url: `${BASE_URL}/project/wholesale-distribution`
      }
    };
    
    return { ...projectPages, ...fallbackProjects };
  })(),

  // Main pages
  '/projects': {
    title: 'UX Design Portfolio - Hiram Barsky Design',
    description: 'Explore my portfolio of AI-enhanced UX design projects. Case studies showcasing user research, design systems, and digital transformation across fintech, healthcare, and enterprise software.',
    image: DEFAULT_IMAGE,
    url: `${BASE_URL}/projects`
  },
  '/services': {
    title: 'UX Design Services - AI-Enhanced Digital Experiences',
    description: 'Professional UX design services specializing in AI integration, user research, design systems, and digital transformation. 15+ years of experience creating user-centered solutions.',
    image: DEFAULT_IMAGE,
    url: `${BASE_URL}/services`
  },
  '/about': {
    title: 'About Hiram Barsky - AI-Enhanced UX Designer & Researcher',
    description: 'Meet Hiram Barsky, a UX designer with 15+ years of experience in AI-enhanced digital experiences, user research, and design systems. Based in Clifton, NJ.',
    image: DEFAULT_IMAGE,
    url: `${BASE_URL}/about`
  },
  '/contact': {
    title: 'Contact Hiram Barsky Design - Let\'s Transform Your Product',
    description: 'Ready to enhance your digital product with AI-powered UX design? Contact Hiram Barsky for user research, design systems, and digital transformation services.',
    image: DEFAULT_IMAGE,
    url: `${BASE_URL}/contact`
  },
  '/blog': {
    title: 'UX Design Blog - AI & Digital Experience Insights',
    description: 'Expert insights on AI-enhanced UX design, user research methodologies, design systems, and digital transformation strategies from 15+ years of experience.',
    image: DEFAULT_IMAGE,
    url: `${BASE_URL}/blog`
  },

  // Blog post pages - dynamically generated from blog data
  ...(() => {
    const blogPages = {};
    
    // Generate SEO data for each extracted blog post
    extractedBlogPosts.forEach(post => {
      const route = `/blog/${post.slug}`;
      const blogImage = post.coverImage.startsWith('/') 
        ? `${BASE_URL}${post.coverImage}` 
        : post.coverImage;
        
      blogPages[route] = {
        title: `${post.title} - Hiram Barsky Design`,
        description: post.excerpt,
        image: blogImage,
        url: `${BASE_URL}${route}`
      };
    });
    
    return blogPages;
  })(),

  // Design service pages
  '/design-services/ux-research': {
    title: 'UX Research Services - Data-Driven Design Insights',
    description: 'Professional UX research services including user interviews, usability testing, persona development, and journey mapping to inform design decisions with real user insights.',
    image: DEFAULT_IMAGE,
    url: `${BASE_URL}/design-services/ux-research`
  },
  '/design-services/design-systems': {
    title: 'Design Systems Services - Scalable UI Components',
    description: 'Create cohesive, scalable design systems with reusable components, style guides, and documentation to ensure consistent user experiences across your product.',
    image: DEFAULT_IMAGE,
    url: `${BASE_URL}/design-services/design-systems`
  },
  '/design-services/ai-integration': {
    title: 'AI Integration UX Design - Intelligent User Experiences',
    description: 'Specialized in designing AI-enhanced user experiences, from chatbots and recommendation systems to predictive interfaces and machine learning integration.',
    image: DEFAULT_IMAGE,
    url: `${BASE_URL}/design-services/ai-integration`
  },
  '/design-services/prototyping': {
    title: 'UX Prototyping Services - Interactive Design Validation',
    description: 'High-fidelity interactive prototypes for user testing and stakeholder validation. Rapid iteration and user feedback integration to perfect your product experience.',
    image: DEFAULT_IMAGE,
    url: `${BASE_URL}/design-services/prototyping`
  },
  '/design-services/user-testing': {
    title: 'User Testing Services - Validate Design Decisions',
    description: 'Comprehensive user testing services including moderated sessions, A/B testing, and usability audits to validate design decisions with real user behavior.',
    image: DEFAULT_IMAGE,
    url: `${BASE_URL}/design-services/user-testing`
  },
  '/design-services/consultation': {
    title: 'UX Design Consultation - Strategic Design Guidance',
    description: 'Strategic UX consultation to align design with business goals, optimize user journeys, and implement best practices for digital transformation.',
    image: DEFAULT_IMAGE,
    url: `${BASE_URL}/design-services/consultation`
  }
};

// Legacy mapping for backward compatibility
const caseStudySEOData = {
  'investment-app': allPagesSEOData['/project/investment-app'],
  'splittime': allPagesSEOData['/project/splittime'],
  'business-management': allPagesSEOData['/project/business-management'],
  'herbal-ink': allPagesSEOData['/project/herbalink'],
  'investor-loan': allPagesSEOData['/project/investor-loan'],
  'wholesale-distribution': allPagesSEOData['/project/wholesale-distribution']
};

// Function to inject SEO meta tags
function injectSEOTags(html, seoData) {
  const metaTags = `
    <title>${seoData.title}</title>
    <meta name="description" content="${seoData.description}" />
    <link rel="canonical" href="${seoData.url}" />
    
    <!-- Open Graph -->
    <meta property="og:title" content="${seoData.title}" />
    <meta property="og:description" content="${seoData.description}" />
    <meta property="og:image" content="${seoData.image}" />
    <meta property="og:url" content="${seoData.url}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Hiram Barsky Design" />
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${seoData.title}" />
    <meta name="twitter:description" content="${seoData.description}" />
    <meta name="twitter:image" content="${seoData.image}" />
    <meta name="twitter:creator" content="@hirambarsky" />
    
    <!-- Additional SEO -->
    <meta name="author" content="Hiram Barsky" />
    <meta name="robots" content="index, follow" />`;

  return html.replace('</head>', `${metaTags}\n  </head>`);
}

// Generate static HTML files for ALL routes
function generateStaticSEOFiles() {
  const distDir = path.join(__dirname, '../dist');
  
  // Ensure dist directory exists
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // Generate files for ALL pages
  Object.entries(allPagesSEOData).forEach(([route, seoData]) => {
    let filePath;
    
    if (route === '/') {
      // Homepage
      filePath = path.join(distDir, 'index.html');
    } else {
      // All other routes
      const routeDir = path.join(distDir, route.slice(1)); // Remove leading slash
      fs.mkdirSync(routeDir, { recursive: true });
      filePath = path.join(routeDir, 'index.html');
    }

    const htmlWithSEO = injectSEOTags(baseHtml, seoData);
    fs.writeFileSync(filePath, htmlWithSEO);
    
    console.log(`Generated static SEO file for: ${route}`);
  });

  console.log(`Generated ${Object.keys(allPagesSEOData).length} static SEO files`);
}

// Run the script
generateStaticSEOFiles();
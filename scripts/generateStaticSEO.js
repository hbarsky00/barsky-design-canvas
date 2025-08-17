import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the structured case studies data
const structuredCaseStudiesPath = path.join(__dirname, '../src/data/structuredCaseStudies.ts');
const structuredCaseStudiesContent = fs.readFileSync(structuredCaseStudiesPath, 'utf8');

// Extract the structured case studies data using a simple regex
const caseStudiesMatch = structuredCaseStudiesContent.match(/export const structuredCaseStudies: Record<string, StructuredCaseStudyData> = ({[\s\S]*?});/);
if (!caseStudiesMatch) {
  console.error('Could not extract structured case studies data');
  process.exit(1);
}

// Parse the case studies data (simplified extraction)
const caseStudiesDataStr = caseStudiesMatch[1];
const caseStudyIds = [...caseStudiesDataStr.matchAll(/"([^"]+)":\s*{/g)].map(match => match[1]);

console.log('Found case study IDs:', caseStudyIds);

// Base HTML template - read from dist after Vite build
let baseHtml;
try {
  baseHtml = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8');
} catch (error) {
  console.error('Could not read dist/index.html. Make sure vite build has completed first.');
  process.exit(1);
}

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

  // Project pages
  '/project/investment-app': {
    title: '23% More Engagement: Making Investing Accessible to Beginners - Hiram Barsky Design',
    description: 'Built beginner-friendly investing tools with guided onboarding, goal tracking, and real-time performance insights. The design demystifies complex financial concepts and keeps users motivated to grow their portfolios.',
    image: 'https://barskydesign.pro/lovable-uploads/4408b539-65ee-460c-9f7d-6303241781d0.png',
    url: `${BASE_URL}/project/investment-app`
  },
  '/project/splittime': {
    title: '40% Less Conflict: Designing Neutral Co-Parenting Tools - Hiram Barsky Design',
    description: 'Reduced co-parenting conflict by 40% through clear scheduling and neutral communication tools designed for high-stress family situations.',
    image: 'https://i0.wp.com/barskyux.com/wp-content/uploads/2024/01/Frame-4.jpg?fit=1920%2C1080&ssl=1',
    url: `${BASE_URL}/project/splittime`
  },
  '/project/business-management': {
    title: '50% Faster Workflows: Streamlining Operations for Growth - Hiram Barsky Design', 
    description: 'Streamlined business management workflows through intuitive design and automated processes, resulting in 50% faster task completion.',
    image: DEFAULT_IMAGE,
    url: `${BASE_URL}/project/business-management`
  },
  '/project/herbalink': {
    title: '3x More Bookings: How I Connected Users to Certified Herbalists - Hiram Barsky Design',
    description: 'Connected users to certified herbalists across the country and increased booking rates by 3x through AI-powered matching and streamlined UX.',
    image: 'https://barskyux.com/wp-content/uploads/2025/08/herbalinkpromonew.png',
    url: `${BASE_URL}/project/herbalink`
  },
  '/project/investor-loan-app': {
    title: 'Investor Loan App Case Study - Streamlined Investment Financing - Hiram Barsky Design',
    description: 'Designed streamlined investment financing platform that simplifies loan applications and reduces approval times for real estate investors.',
    image: DEFAULT_IMAGE,
    url: `${BASE_URL}/project/investor-loan-app`
  },
  '/project/wholesale-distribution': {
    title: 'Wholesale Distribution Platform - Supply Chain Management UX - Hiram Barsky Design',
    description: 'Designed comprehensive wholesale distribution platform that optimizes supply chain management and improves vendor relationships.',
    image: DEFAULT_IMAGE,
    url: `${BASE_URL}/project/wholesale-distribution`
  },

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
  // Remove any existing meta tags we're about to replace
  let cleanHtml = html
    .replace(/<title>.*?<\/title>/g, '')
    .replace(/<meta name="description"[^>]*>/g, '')
    .replace(/<link rel="canonical"[^>]*>/g, '')
    .replace(/<meta property="og:[^"]*"[^>]*>/g, '')
    .replace(/<meta name="twitter:[^"]*"[^>]*>/g, '')
    .replace(/<meta name="author"[^>]*>/g, '')
    .replace(/<meta name="robots"[^>]*>/g, '');
  
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

  return cleanHtml.replace('</head>', `${metaTags}\n  </head>`);
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
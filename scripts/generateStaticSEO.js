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

// Base HTML template
const baseHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');

// SEO constants
const BASE_URL = 'https://barskydesign.pro';
const DEFAULT_IMAGE = 'https://barskyux.com/wp-content/uploads/2025/06/IMG_20250531_123836_952.webp';

// Create a simple mapping of case study SEO data
const caseStudySEOData = {
  'investment-app': {
    title: '23% More Engagement: Making Investing Accessible to Beginners - Hiram Barsky Design',
    description: 'Built beginner-friendly investing tools with guided onboarding, goal tracking, and real-time performance insights. The design demystifies complex financial concepts and keeps users motivated to grow their portfolios.',
    image: 'https://barskydesign.pro/lovable-uploads/4408b539-65ee-460c-9f7d-6303241781d0.png',
    url: `${BASE_URL}/project/investment-app`
  },
  'splittime': {
    title: 'Splittime Case Study - Hiram Barsky Design',
    description: 'Comprehensive case study of the Splittime project showcasing UX design and development process.',
    image: DEFAULT_IMAGE,
    url: `${BASE_URL}/project/splittime`
  },
  'business-management': {
    title: 'Business Management Case Study - Hiram Barsky Design', 
    description: 'Comprehensive case study of the Business Management project showcasing UX design and development process.',
    image: DEFAULT_IMAGE,
    url: `${BASE_URL}/project/business-management`
  },
  'herbal-ink': {
    title: 'Herbal Ink Case Study - Hiram Barsky Design',
    description: 'Comprehensive case study of the Herbal Ink project showcasing UX design and development process.',
    image: DEFAULT_IMAGE,
    url: `${BASE_URL}/project/herbal-ink`
  },
  'investor-loan': {
    title: 'Investor Loan Case Study - Hiram Barsky Design',
    description: 'Comprehensive case study of the Investor Loan project showcasing UX design and development process.',
    image: DEFAULT_IMAGE,
    url: `${BASE_URL}/project/investor-loan`
  },
  'wholesale-distribution': {
    title: 'Wholesale Distribution Case Study - Hiram Barsky Design',
    description: 'Comprehensive case study of the Wholesale Distribution project showcasing UX design and development process.',
    image: DEFAULT_IMAGE,
    url: `${BASE_URL}/project/wholesale-distribution`
  }
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

// Generate static HTML files for each project
function generateStaticSEOFiles() {
  const distDir = path.join(__dirname, '../dist');
  
  // Ensure dist directory exists
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // Generate files for each case study
  caseStudyIds.forEach(id => {
    const seoData = caseStudySEOData[id];
    if (!seoData) {
      console.warn(`No SEO data found for case study: ${id}`);
      return;
    }

    const projectDir = path.join(distDir, 'project', id);
    fs.mkdirSync(projectDir, { recursive: true });

    const htmlWithSEO = injectSEOTags(baseHtml, seoData);
    fs.writeFileSync(path.join(projectDir, 'index.html'), htmlWithSEO);
    
    console.log(`Generated static SEO file for: /project/${id}`);
  });

  // Generate homepage with default SEO
  const homepageSEO = {
    title: 'Hiram Barsky Design - AI-Enhanced UX Design & Research',
    description: '15+ years creating AI-enhanced digital experiences. Specializing in UX research, design systems, and Gen AI integration for businesses looking to transform their products with intelligent design solutions.',
    image: DEFAULT_IMAGE,
    url: BASE_URL
  };
  
  const homepageHtml = injectSEOTags(baseHtml, homepageSEO);
  fs.writeFileSync(path.join(distDir, 'index.html'), homepageHtml);
  
  console.log('Generated static SEO file for homepage');
}

// Run the script
generateStaticSEOFiles();
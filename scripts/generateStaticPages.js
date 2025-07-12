import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Project data for generating static pages
const projectsData = [
  {
    id: "wholesale-distribution",
    title: "From Restaurant Chat to Business Solution",
    description: "Real conversation led to custom AI-powered development. How a casual dinner revealed business pain points and sparked my evolution from designer to full-stack developer.",
    image: "/lovable-uploads/b9e82187-de02-414c-aef2-4c99ea1b1a0c.png"
  },
  {
    id: "herbalink", 
    title: "Herbalink: Bridging Ancient Wisdom with Modern Accessibility",
    description: "Wellness-focused platform connecting people with certified herbalists through intelligent AI matching and mobile-first design. Achieved 78% user satisfaction with personalized herbal care.",
    image: "/lovable-uploads/54ddb7c1-ce60-4077-b56c-ae4640252d52.png"
  },
  {
    id: "splittime",
    title: "Splittime: From Conflict to Collaboration", 
    description: "Family-centered co-parenting platform that transforms communication between separated parents. Reduced scheduling conflicts by 73% through thoughtful, child-focused design.",
    image: "/lovable-uploads/8fb40d7a-8ac6-404e-a3ce-43746775a75c.png"
  },
  {
    id: "investor-loan-app",
    title: "Investor Loan App: Smart Portfolio Management",
    description: "FinTech platform transforming real estate investment management from spreadsheet chaos to intelligent portfolio tracking with automated reporting and performance analytics.",
    image: "/lovable-uploads/4408b539-65ee-460c-9f7d-6303241781d0.png"
  }
];

// Read the base index.html template
const baseHtmlPath = path.join(__dirname, '..', 'index.html');
const baseHtml = fs.readFileSync(baseHtmlPath, 'utf-8');

// Create static pages for each project
function generateProjectPage(project) {
  const canonical = `https://barskydesign.pro/project/${project.id}`;
  const ogImage = `https://barskydesign.pro${project.image}`;
  
  // Replace the meta tags in the base HTML
  let projectHtml = baseHtml
    .replace(
      '<title>Hiram Barsky - Product Designer & Gen AI Developer</title>',
      `<title>${project.title} | Hiram Barsky</title>`
    )
    .replace(
      '<meta name="description" content="Expert Product Designer specializing in Gen AI integration, user-centered design solutions, and transforming complex business challenges into intuitive digital experiences." />',
      `<meta name="description" content="${project.description}" />`
    );

  // Add proper canonical and Open Graph tags right after the description
  const metaInsertPoint = projectHtml.indexOf('</head>');
  const additionalMeta = `
    <!-- Project-specific meta tags for crawlers -->
    <link rel="canonical" href="${canonical}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:title" content="${project.title} | Hiram Barsky" />
    <meta property="og:description" content="${project.description}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Hiram Barsky - Product Designer" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${project.title} | Hiram Barsky" />
    <meta name="twitter:description" content="${project.description}" />
    <meta name="twitter:image" content="${ogImage}" />
    
    <!-- Redirect script for non-crawler user agents -->
    <script>
      // Check if this is a crawler/bot
      const userAgent = navigator.userAgent.toLowerCase();
      const isCrawler = [
        'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider', 'yandexbot',
        'facebookexternalhit', 'twitterbot', 'linkedinbot', 'whatsapp', 'telegrambot'
      ].some(bot => userAgent.includes(bot));
      
      // If not a crawler, redirect to the main app
      if (!isCrawler && window.location.pathname.includes('/project/')) {
        // Let the React app handle routing
        console.log('Human visitor detected, React app will handle routing');
      }
    </script>
    `;

  projectHtml = projectHtml.slice(0, metaInsertPoint) + additionalMeta + projectHtml.slice(metaInsertPoint);

  return projectHtml;
}

// Generate static pages
function generateStaticPages() {
  const distDir = path.join(__dirname, '..', 'dist');
  
  // Ensure dist directory exists
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // Generate a static page for each project
  projectsData.forEach(project => {
    const projectDir = path.join(distDir, 'project');
    const projectIdDir = path.join(projectDir, project.id);
    
    // Create directory structure
    if (!fs.existsSync(projectDir)) {
      fs.mkdirSync(projectDir, { recursive: true });
    }
    if (!fs.existsSync(projectIdDir)) {
      fs.mkdirSync(projectIdDir, { recursive: true });
    }

    // Generate and write the HTML file
    const projectHtml = generateProjectPage(project);
    const filePath = path.join(projectIdDir, 'index.html');
    
    fs.writeFileSync(filePath, projectHtml);
    console.log(`✅ Generated static page: ${filePath}`);
  });

  console.log(`🎉 Generated ${projectsData.length} static project pages for crawlers`);
}

// Only run if called directly (not imported)
if (import.meta.url === `file://${process.argv[1]}`) {
  generateStaticPages();
}
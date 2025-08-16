
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import case study data
const structuredCaseStudies = {
  "herbalink": {
    title: "3x More Bookings: How I Connected Users to Certified Herbalists",
    description: "Connected users to certified herbalists across the country and increased booking rates by 3x through AI-powered matching and streamlined UX.",
    seoData: {
      image: "https://i0.wp.com/barskyux.com/wp-content/uploads/2025/07/featureimage-1.png?fit=768%2C576&ssl=1",
      path: "/project/herbalink"
    }
  },
  "splittime": {
    title: "40% Less Conflict: Designing Neutral Co-Parenting Tools",
    description: "Reduced co-parenting conflict by 40% through clear scheduling and neutral communication tools designed for high-stress family situations.",
    seoData: {
      image: "https://i0.wp.com/barskyux.com/wp-content/uploads/2024/01/Frame-4.jpg?fit=1920%2C1080&ssl=1",
      path: "/project/splittime"
    }
  },
  "investor-loan-app": {
    title: "Redesigning Loans: 85% Fewer Errors, 40% Faster",
    description: "How I led a banking platform redesign that replaced Excel and scaled operations with speed, accuracy, and trust.",
    seoData: {
      image: "/lovable-uploads/70efa220-d524-4d37-a9de-fbec00205917.png",
      path: "/project/investor-loan-app"
    }
  },
  "wholesale-distribution": {
    title: "95% Less Manual Work: Wholesale Distribution Transformation",
    description: "Turned error-prone Excel operations into an AI-assisted workflow with near-perfect accuracy and speed.",
    seoData: {
      image: "/placeholder.svg",
      path: "/project/wholesale-distribution"
    }
  },
  "business-management": {
    title: "68% Fewer Errors: Streamlining Enterprise Operations",
    description: "Improved internal operations and reduced manual entry errors by 68% with one central tool.",
    seoData: {
      image: "https://barskyux.com/wp-content/uploads/2025/08/promoimagefull.png",
      path: "/project/business-management"
    }
  }
};

const generateMetaTags = (caseStudy, projectId) => {
  const canonicalUrl = `https://barskydesign.pro${caseStudy.seoData.path}`;
  const imageUrl = caseStudy.seoData.image.startsWith('http') 
    ? caseStudy.seoData.image 
    : `https://barskydesign.pro${caseStudy.seoData.image}`;

  return `
    <title>${caseStudy.title} | Hiram Barsky Design</title>
    <meta name="description" content="${caseStudy.description}" />
    <link rel="canonical" href="${canonicalUrl}" />
    
    <!-- Open Graph Tags -->
    <meta property="og:title" content="${caseStudy.title}" />
    <meta property="og:description" content="${caseStudy.description}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:type" content="article" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content="Hiram Barsky Design" />
    
    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${caseStudy.title}" />
    <meta name="twitter:description" content="${caseStudy.description}" />
    <meta name="twitter:image" content="${imageUrl}" />
    <meta name="twitter:site" content="@hirambarsky" />
    <meta name="twitter:creator" content="@hirambarsky" />
    
    <!-- Additional SEO meta tags -->
    <meta name="author" content="Hiram Barsky" />
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  `;
};

const generateStaticHTML = (caseStudy, projectId) => {
  const metaTags = generateMetaTags(caseStudy, projectId);
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    ${metaTags}
    <script type="module" crossorigin src="/assets/index.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index.css">
</head>
<body>
    <div id="root"></div>
</body>
</html>`;
};

const generateStaticPages = () => {
  const distDir = path.join(__dirname, '../dist');
  
  if (!fs.existsSync(distDir)) {
    console.error('❌ Dist directory not found. Run vite build first.');
    return;
  }

  // Create project directories and HTML files
  Object.entries(structuredCaseStudies).forEach(([projectId, caseStudy]) => {
    const projectDir = path.join(distDir, 'project', projectId);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(projectDir)) {
      fs.mkdirSync(projectDir, { recursive: true });
    }
    
    // Generate and write HTML file
    const htmlContent = generateStaticHTML(caseStudy, projectId);
    const htmlPath = path.join(projectDir, 'index.html');
    
    fs.writeFileSync(htmlPath, htmlContent);
    console.log(`✅ Generated ${htmlPath}`);
  });

  console.log('🎉 Static pages generated successfully!');
};

// Run the script
generateStaticPages();

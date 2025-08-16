
const fs = require('fs');
const path = require('path');

// Define case studies data directly here to avoid import issues
const caseStudies = {
  'herbalink': {
    title: 'Herbalink - Natural Health E-commerce Platform',
    description: 'A comprehensive e-commerce platform for natural health products with advanced search and personalized recommendations.',
    image: 'https://barskyux.com/herbalink-hero.jpg',
    projectName: 'Herbalink',
    results: ['Increased conversion by 40%', 'Improved user engagement by 60%'],
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    path: '/herbalink/'
  },
  'wholesale-distribution': {
    title: 'Wholesale Distribution Platform',
    description: 'A B2B platform streamlining wholesale operations with inventory management and order processing.',
    image: 'https://barskyux.com/wholesale-hero.jpg',
    projectName: 'Wholesale Distribution',
    results: ['Reduced processing time by 50%', 'Increased order accuracy by 30%'],
    technologies: ['React', 'TypeScript', 'PostgreSQL', 'Express'],
    path: '/wholesale-distribution/'
  }
};

// HTML template function
function generateHTML(caseStudy) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- SEO Meta Tags -->
    <title>${caseStudy.title} | Hiram Barsky Design</title>
    <meta name="description" content="${caseStudy.description}" />
    <link rel="canonical" href="https://barskydesign.pro${caseStudy.path}" />
    
    <!-- Open Graph Tags -->
    <meta property="og:title" content="${caseStudy.title}" />
    <meta property="og:description" content="${caseStudy.description}" />
    <meta property="og:url" content="https://barskydesign.pro${caseStudy.path}" />
    <meta property="og:type" content="article" />
    <meta property="og:image" content="${caseStudy.image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content="Hiram Barsky Design" />
    
    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${caseStudy.title}" />
    <meta name="twitter:description" content="${caseStudy.description}" />
    <meta name="twitter:image" content="${caseStudy.image}" />
    <meta name="twitter:site" content="@hirambarsky" />
    <meta name="twitter:creator" content="@hirambarsky" />
    
    <!-- Additional SEO meta tags -->
    <meta name="author" content="Hiram Barsky" />
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    <meta name="keywords" content="Hiram Barsky, Product Designer, Gen AI Developer, ${caseStudy.technologies.join(', ')}, user experience design, digital product design, design case study, UX consulting" />
    
    <!-- JSON-LD Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "${caseStudy.title}",
      "description": "${caseStudy.description}",
      "url": "https://barskydesign.pro${caseStudy.path}",
      "image": {
        "@type": "ImageObject",
        "url": "${caseStudy.image}",
        "width": 1200,
        "height": 630
      },
      "author": {
        "@type": "Person",
        "name": "Hiram Barsky",
        "url": "https://barskydesign.pro"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Hiram Barsky Design",
        "url": "https://barskydesign.pro"
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://barskydesign.pro${caseStudy.path}"
      }
    }
    </script>
    
    <!-- Redirect to React app -->
    <script>
      // Redirect to the React app route for dynamic content
      window.location.href = '/#${caseStudy.path}';
    </script>
  </head>
  <body>
    <!-- Fallback content for crawlers -->
    <div id="root">
      <h1>${caseStudy.title}</h1>
      <p>${caseStudy.description}</p>
      <img src="${caseStudy.image}" alt="${caseStudy.title}" />
    </div>
  </body>
</html>`;
}

// Main execution
function generateStaticPages() {
  const distDir = path.join(__dirname, '..', 'dist');
  
  // Check if dist directory exists
  if (!fs.existsSync(distDir)) {
    console.log('dist directory not found. Run npm run build first.');
    return;
  }

  console.log('Generating static pages...');

  // Generate static HTML files for each case study
  Object.entries(caseStudies).forEach(([key, caseStudy]) => {
    const fileName = `${key}.html`;
    const filePath = path.join(distDir, fileName);
    const htmlContent = generateHTML(caseStudy);
    
    fs.writeFileSync(filePath, htmlContent);
    console.log(`Generated: ${fileName}`);
  });

  console.log('Static pages generation completed!');
}

// Run the script
generateStaticPages();

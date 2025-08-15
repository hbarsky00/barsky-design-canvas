
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to extract blog slugs from blogData.ts
function getBlogRoutes() {
  try {
    const blogDataPath = path.join(__dirname, '..', 'src', 'data', 'blogData.ts');
    const content = fs.readFileSync(blogDataPath, 'utf-8');
    
    // Extract blog post slugs using regex
    const slugMatches = content.match(/slug:\s*["']([^"']+)["']/g) || [];
    return slugMatches.map(match => {
      const slug = match.match(/["']([^"']+)["']/)[1];
      return `/blog/${slug}`;
    });
  } catch (error) {
    console.warn('Could not extract blog routes:', error.message);
    return [
      '/blog/finding-first-ux-job-guide',
      '/blog/ai-accessibility-design-2024',
      '/blog/conversion-optimization-techniques'
    ];
  }
}

// Function to extract case study routes from structuredCaseStudies.ts
function getCaseStudyRoutes() {
  try {
    const caseStudyPath = path.join(__dirname, '..', 'src', 'data', 'structuredCaseStudies.ts');
    const content = fs.readFileSync(caseStudyPath, 'utf-8');
    
    // Extract case study IDs from the object keys
    const idMatches = content.match(/["']([^"']+)["']:\s*{/g) || [];
    return idMatches.map(match => {
      const id = match.match(/["']([^"']+)["']/)[1];
      return `/project/${id}`;
    });
  } catch (error) {
    console.warn('Could not extract case study routes:', error.message);
    return [
      '/project/herbalink',
      '/project/splittime', 
      '/project/business-management',
      '/project/investor-loan-app',
      '/project/wholesale-distribution'
    ];
  }
}

// Generate all routes for prerendering
function generateRoutes() {
  const staticRoutes = [
    '/',
    '/projects',
    '/services', 
    '/about',
    '/contact',
    '/blog'
  ];
  
  const blogRoutes = getBlogRoutes();
  const caseStudyRoutes = getCaseStudyRoutes();
  
  const allRoutes = [...staticRoutes, ...blogRoutes, ...caseStudyRoutes];
  
  console.log(`Generated ${allRoutes.length} routes for prerendering:`);
  allRoutes.forEach(route => console.log(`  - ${route}`));
  
  return allRoutes;
}

export default generateRoutes();

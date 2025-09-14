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
    const postMatches = postsContent.match(/{\s*id:\s*"([^"]*)"[\s\S]*?title:\s*"([^"]*)"[\s\S]*?date:\s*"([^"]*)"[\s\S]*?slug:\s*"([^"]*)"[\s\S]*?}/g);
    
    if (postMatches) {
      postMatches.forEach(postMatch => {
        const idMatch = postMatch.match(/id:\s*"([^"]*)"/);
        const titleMatch = postMatch.match(/title:\s*"([^"]*)"/);
        const dateMatch = postMatch.match(/date:\s*"([^"]*)"/);
        const slugMatch = postMatch.match(/slug:\s*"([^"]*)"/);
        
        if (idMatch && titleMatch && dateMatch && slugMatch) {
          blogPosts.push({
            id: idMatch[1],
            title: titleMatch[1],
            date: dateMatch[1],
            slug: slugMatch[1]
          });
        }
      });
    }
  }
  
  return blogPosts;
}

// Extract case study data
function extractCaseStudyData(content) {
  const caseStudies = {};
  
  const ids = ['herbalink', 'splittime', 'investment-app', 'investor-loan-app'];
  
  ids.forEach((id) => {
    const regex = new RegExp(`"${id}":\\s*{[\\s\\S]*?title:\\s*"([^"]*)"`, 'm');
    const match = content.match(regex);
    if (match) {
      caseStudies[id] = {
        title: match[1]
      };
    }
  });
  
  return caseStudies;
}

const BASE_URL = 'https://barskydesign.pro';

// Generate main sitemap
function generateMainSitemap() {
  const extractedCaseStudies = extractCaseStudyData(structuredCaseStudiesContent);
  const extractedBlogPosts = extractBlogData(blogDataContent);
  
  const entries = [
    // Static pages
    {
      url: `${BASE_URL}/`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '1.0'
    },
    {
      url: `${BASE_URL}/about`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: `${BASE_URL}/services`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: `${BASE_URL}/contact`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: '0.7'
    },
    {
      url: `${BASE_URL}/blog`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '0.8'
    },
    
    // Project pages
    ...Object.keys(extractedCaseStudies).map(id => {
      const routeMapping = {
        'herbalink': '/project/herbalink',
        'splittime': '/project/splittime',
        'investment-app': '/project/investment-app',
        'investor-loan-app': '/project/investor-loan'
      };
      
      const route = routeMapping[id];
      return route ? {
        url: `${BASE_URL}${route}`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.9'
      } : null;
    }).filter(Boolean),
    
    // Add fallback business management project
    {
      url: `${BASE_URL}/project/business-management`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: '0.9'
    },
    
    // Design service pages
    {
      url: `${BASE_URL}/design-services/ux-ui-design`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: '0.7'
    },
    {
      url: `${BASE_URL}/design-services/mobile-app-design`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: '0.7'
    },
    {
      url: `${BASE_URL}/design-services/web-development`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: '0.7'
    }
  ];

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xml;
}

// Generate blog sitemap
function generateBlogSitemap() {
  const extractedBlogPosts = extractBlogData(blogDataContent);
  
  const entries = [
    // Main blog page
    {
      url: `${BASE_URL}/blog`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '0.8'
    },
    
    // Individual blog posts
    ...extractedBlogPosts.map(post => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastmod: new Date(post.date).toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: '0.7'
    }))
  ];

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xml;
}

// Generate sitemaps and save to dist
function generateSitemaps() {
  const distDir = path.join(__dirname, '../dist');
  
  // Ensure dist directory exists
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // Generate main sitemap
  const mainSitemap = generateMainSitemap();
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), mainSitemap);
  console.log('Generated main sitemap.xml');

  // Generate blog sitemap
  const blogSitemap = generateBlogSitemap();
  fs.writeFileSync(path.join(distDir, 'blog-sitemap.xml'), blogSitemap);
  console.log('Generated blog-sitemap.xml');

  console.log('✅ All sitemaps generated successfully!');
}

// Run the script
generateSitemaps();
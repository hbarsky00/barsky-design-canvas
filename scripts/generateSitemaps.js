import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase configuration for build-time queries
const SUPABASE_URL = 'https://ctqttomppgkjbjkckise.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0cXR0b21wcGdramJqa2NraXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0Mjg1MzMsImV4cCI6MjA2MDAwNDUzM30.q15G4xYUtQqi7kdlha0C31LaIlYWBqPbIit-e9wq48Q';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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

// Fetch SEO slugs from Supabase
async function fetchSupabaseSlugs() {
  try {
    const { data, error } = await supabase
      .from('seo_meta')
      .select('slug, path_type, updated_at');
    
    if (error) {
      console.warn('⚠️ Could not fetch Supabase slugs:', error.message);
      return [];
    }
    
    console.log(`✅ Loaded ${data?.length || 0} slugs from Supabase`);
    return data || [];
  } catch (error) {
    console.warn('⚠️ Error fetching Supabase slugs:', error.message);
    return [];
  }
}

// Generate main sitemap
async function generateMainSitemap() {
  const extractedCaseStudies = extractCaseStudyData(structuredCaseStudiesContent);
  const extractedBlogPosts = extractBlogData(blogDataContent);
  const supabaseSlugs = await fetchSupabaseSlugs();
  
  // Convert Supabase slugs to sitemap entries
  const supabaseEntries = supabaseSlugs.map(s => {
    let url;
    let priority = '0.7';
    
    if (s.path_type === 'page') {
      url = s.slug === 'home' ? `${BASE_URL}/` : `${BASE_URL}/${s.slug}`;
      priority = s.slug === 'home' ? '1.0' : '0.8';
    } else if (s.path_type === 'project') {
      url = `${BASE_URL}/project/${s.slug}`;
      priority = '0.9';
    } else if (s.path_type === 'post') {
      url = `${BASE_URL}/blog/${s.slug}`;
      priority = '0.7';
    }
    
    return {
      url,
      lastmod: new Date(s.updated_at).toISOString().split('T')[0],
      changefreq: 'monthly',
      priority
    };
  }).filter(e => e.url);
  
  // Merge with TypeScript entries (Supabase takes precedence)
  const supabaseUrls = new Set(supabaseEntries.map(e => e.url));
  
  const entries = [
    ...supabaseEntries,
    
    // Static pages (only if not in Supabase)
    ...(supabaseUrls.has(`${BASE_URL}/`) ? [] : [{
      url: `${BASE_URL}/`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '1.0'
    }]),
    ...(supabaseUrls.has(`${BASE_URL}/about`) ? [] : [{
      url: `${BASE_URL}/about`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: '0.8'
    }]),
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
    
    // Project pages (only if not in Supabase)
    ...Object.keys(extractedCaseStudies).map(id => {
      const routeMapping = {
        'herbalink': '/project/herbalink',
        'splittime': '/project/splittime',
        'investment-app': '/project/investment-app',
        'investor-loan-app': '/project/investor-loan'
      };
      
      const route = routeMapping[id];
      if (!route) return null;
      const url = `${BASE_URL}${route}`;
      if (supabaseUrls.has(url)) return null;
      return {
        url,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.9'
      };
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
async function generateSitemaps() {
  const distDir = path.join(__dirname, '../dist');
  
  // Ensure dist directory exists
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // Generate main sitemap
  const mainSitemap = await generateMainSitemap();
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), mainSitemap);
  console.log('✅ Generated main sitemap.xml');

  // Generate blog sitemap
  const blogSitemap = generateBlogSitemap();
  fs.writeFileSync(path.join(distDir, 'blog-sitemap.xml'), blogSitemap);
  console.log('Generated blog-sitemap.xml');

  // Generate robots.txt
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
Sitemap: ${BASE_URL}/blog-sitemap.xml
`;
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt);
  console.log('✅ Generated robots.txt');

  console.log('✅ All sitemaps generated successfully!');
}

// Run the script
generateSitemaps();
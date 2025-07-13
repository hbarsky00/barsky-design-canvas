import { blogPosts } from "@/data/blogData";
import { supabase } from "@/integrations/supabase/client";

interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: number;
}

export const generateBlogSitemap = async (): Promise<string> => {
  const baseUrl = 'https://barskydesign.pro';
  const entries: SitemapEntry[] = [];

  // Add main blog page
  entries.push({
    url: `${baseUrl}/blog`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.8
  });

  // Add static blog posts
  blogPosts.forEach(post => {
    entries.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastmod: new Date(post.date).toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.7
    });
  });

  // Add dynamic blog posts from database
  try {
    const { data: dbPosts, error } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, created_at')
      .order('created_at', { ascending: false });

    if (!error && dbPosts) {
      dbPosts.forEach(post => {
        entries.push({
          url: `${baseUrl}/blog/${post.slug}`,
          lastmod: new Date(post.updated_at).toISOString().split('T')[0],
          changefreq: 'monthly',
          priority: 0.7
        });
      });
    }
  } catch (error) {
    console.warn('Failed to fetch dynamic blog posts for sitemap:', error);
  }

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
};

export const submitBlogSitemap = async (): Promise<void> => {
  try {
    const sitemapXml = await generateBlogSitemap();
    
    // Submit to Google Search Console
    const googleUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent('https://barskydesign.pro/blog-sitemap.xml')}`;
    fetch(googleUrl, { method: 'GET', mode: 'no-cors' }).catch(() => {
      console.log('Google sitemap submission attempted');
    });

    console.log('Blog sitemap generated and submitted');
  } catch (error) {
    console.error('Blog sitemap generation failed:', error);
  }
};
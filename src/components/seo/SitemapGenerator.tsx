// scripts/validate-sitemap.js
const fs = require('fs');
const path = require('path');
const { XMLParser } = require('fast-xml-parser');

const validateSitemap = () => {
  try {
    const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
    
    if (!fs.existsSync(sitemapPath)) {
      console.error('❌ Sitemap not found at /public/sitemap.xml');
      process.exit(1);
    }

    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    const parser = new XMLParser();
    const parsed = parser.parse(sitemapContent);

    // Basic validation
    if (!parsed.urlset || !parsed.urlset.url) {
      console.error('❌ Invalid sitemap structure');
      process.exit(1);
    }

    const urls = Array.isArray(parsed.urlset.url) ? parsed.urlset.url : [parsed.urlset.url];
    
    console.log('✅ Sitemap validation passed');
    console.log(`📊 Found ${urls.length} URLs in sitemap`);
    
    // Validate each URL
    const issues = [];
    
    urls.forEach((urlEntry, index) => {
      if (!urlEntry.loc) {
        issues.push(`URL ${index + 1}: Missing location`);
      }
      
      if (urlEntry.priority && (urlEntry.priority < 0 || urlEntry.priority > 1)) {
        issues.push(`URL ${index + 1}: Invalid priority (${urlEntry.priority})`);
      }
      
      if (urlEntry.changefreq && !['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'].includes(urlEntry.changefreq)) {
        issues.push(`URL ${index + 1}: Invalid changefreq (${urlEntry.changefreq})`);
      }
    });

    if (issues.length > 0) {
      console.warn('⚠️  Sitemap issues found:');
      issues.forEach(issue => console.warn(`   ${issue}`));
    } else {
      console.log('✅ All URLs passed validation');
    }

    // Check for duplicate URLs
    const locations = urls.map(url => url.loc);
    const duplicates = locations.filter((item, index) => locations.indexOf(item) !== index);
    
    if (duplicates.length > 0) {
      console.warn('⚠️  Duplicate URLs found:', duplicates);
    }

    // Display URL distribution
    const priorities = urls.map(url => url.priority || 0.5);
    const avgPriority = (priorities.reduce((a, b) => a + b, 0) / priorities.length).toFixed(2);
    
    console.log(`📈 Average priority: ${avgPriority}`);
    console.log(`🔗 Homepage priority: ${urls.find(u => u.loc.endsWith('barskydesign.pro'))?.priority || 'Not found'}`);

  } catch (error) {
    console.error('❌ Error validating sitemap:', error.message);
    process.exit(1);
  }
};

if (require.main === module) {
  validateSitemap();
}

module.exports = { validateSitemap };
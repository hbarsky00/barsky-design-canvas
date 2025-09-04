/**
 * Quick SEO Test for Current Development Site
 * Tests the actual development environment SEO
 */

const CURRENT_SITE = "https://0fd089db-a4e5-4e17-ab5f-74878fb2d656.sandbox.lovable.dev";

const testPages = [
  "/",
  "/projects", 
  "/project/herbalink",
  "/about"
];

async function getPageHead(path) {
  try {
    const response = await fetch(`${CURRENT_SITE}${path}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SEO-Test/1.0)',
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const html = await response.text();
    return html;
  } catch (error) {
    console.error(`Failed to fetch ${path}:`, error);
    return null;
  }
}

function extractSEOData(html, path) {
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i);
  const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i);
  const ogImageMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']*)["']/i);
  const ogTypeMatch = html.match(/<meta[^>]+property=["']og:type["'][^>]+content=["']([^"']*)["']/i);
  const structuredDataMatch = html.match(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([^<]*)<\/script>/i);
  
  return {
    path,
    title: titleMatch?.[1] || 'MISSING',
    description: descMatch?.[1]?.substring(0, 100) + '...' || 'MISSING',
    canonical: canonicalMatch?.[1] || 'MISSING',
    ogImage: ogImageMatch?.[1] || 'MISSING',
    ogType: ogTypeMatch?.[1] || 'MISSING',
    hasStructuredData: !!structuredDataMatch,
    structuredDataPreview: structuredDataMatch?.[1]?.substring(0, 100) + '...' || 'NONE'
  };
}

async function runSEOTest() {
  console.log(`🚀 Testing current SEO implementation on ${CURRENT_SITE}`);
  console.log('=' + '='.repeat(80));
  
  for (const path of testPages) {
    console.log(`\n🔍 Testing: ${path}`);
    console.log('-'.repeat(50));
    
    const html = await getPageHead(path);
    if (!html) {
      console.log('❌ Could not fetch page');
      continue;
    }
    
    const seoData = extractSEOData(html, path);
    
    console.log(`📝 Title: ${seoData.title}`);
    console.log(`📄 Description: ${seoData.description}`);
    console.log(`🔗 Canonical: ${seoData.canonical}`);
    console.log(`🖼️  OG Image: ${seoData.ogImage}`);
    console.log(`📊 OG Type: ${seoData.ogType}`);
    console.log(`📋 Structured Data: ${seoData.hasStructuredData ? '✅ Present' : '❌ Missing'}`);
    
    // Quick validation
    const issues = [];
    if (seoData.title === 'MISSING') issues.push('Missing title');
    if (seoData.description === 'MISSING') issues.push('Missing description');
    if (seoData.canonical === 'MISSING') issues.push('Missing canonical');
    if (seoData.ogImage === 'MISSING') issues.push('Missing OG image');
    if (!seoData.hasStructuredData) issues.push('Missing structured data');
    
    if (issues.length === 0) {
      console.log('✅ All basic SEO elements present');
    } else {
      console.log(`⚠️  Issues: ${issues.join(', ')}`);
    }
  }
  
  console.log('\n🎉 SEO test complete!');
}

// Run the test
runSEOTest().catch(console.error);
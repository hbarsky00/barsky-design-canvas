
import fs from 'fs';
import path from 'path';

const DIST_DIR = 'dist';
const FALLBACK_IMAGE = 'https://barskydesign.pro/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png';

function checkHTMLFile(filePath, relativePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const errors = [];
  
  // Check for required meta tags
  if (!content.includes('<title>')) {
    errors.push('Missing title tag');
  }
  
  if (!content.includes('name="description"')) {
    errors.push('Missing description meta tag');
  }
  
  if (!content.includes('property="og:title"')) {
    errors.push('Missing og:title');
  }
  
  if (!content.includes('property="og:image"')) {
    errors.push('Missing og:image');
  } else {
    // Check that og:image is absolute URL
    const ogImageMatch = content.match(/property="og:image"\s+content="([^"]+)"/);
    if (ogImageMatch && !ogImageMatch[1].startsWith('https://')) {
      errors.push('og:image is not absolute URL');
    }
  }
  
  if (!content.includes('name="twitter:card"')) {
    errors.push('Missing twitter:card');
  }
  
  if (!content.includes('rel="canonical"')) {
    errors.push('Missing canonical link');
  }
  
  // Check that title is not the default fallback for sub-pages
  if (relativePath !== 'index.html') {
    const titleMatch = content.match(/<title>([^<]+)<\/title>/);
    if (titleMatch && titleMatch[1].includes('Hiram Barsky – Product Designer & Gen AI Developer')) {
      errors.push('Using homepage title on sub-page');
    }
  }
  
  return errors;
}

function getAllHTMLFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      getAllHTMLFiles(fullPath, files);
    } else if (item.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function main() {
  console.log('🔍 Checking SEO meta tags in build output...\n');
  
  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ Dist directory not found');
    process.exit(1);
  }
  
  const htmlFiles = getAllHTMLFiles(DIST_DIR);
  let totalErrors = 0;
  
  for (const filePath of htmlFiles) {
    const relativePath = path.relative(DIST_DIR, filePath);
    const errors = checkHTMLFile(filePath, relativePath);
    
    if (errors.length > 0) {
      console.log(`❌ ${relativePath}:`);
      errors.forEach(error => console.log(`   - ${error}`));
      totalErrors += errors.length;
    } else {
      console.log(`✅ ${relativePath}`);
    }
  }
  
  console.log(`\n📊 Checked ${htmlFiles.length} files, found ${totalErrors} errors`);
  
  if (totalErrors > 0) {
    console.log('\n❌ SEO validation failed');
    process.exit(1);
  } else {
    console.log('\n✅ All SEO checks passed');
  }
}

main();

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Project IDs to verify
const projectIds = [
  'wholesale-distribution',
  'herbalink',
  'splittime',
  'investor-loan-app'
];

function verifyBuild() {
  const distDir = path.join(__dirname, '..', 'dist');
  let allValid = true;
  
  console.log('🔍 Verifying build output...\n');
  
  // Check if dist directory exists
  if (!fs.existsSync(distDir)) {
    console.error('❌ Dist directory does not exist');
    return false;
  }
  
  // Verify each project has its static HTML
  projectIds.forEach(projectId => {
    const htmlPath = path.join(distDir, 'project', projectId, 'index.html');
    
    if (!fs.existsSync(htmlPath)) {
      console.error(`❌ Missing static HTML for project: ${projectId}`);
      allValid = false;
      return;
    }
    
    // Read and verify the HTML content
    const html = fs.readFileSync(htmlPath, 'utf-8');
    
    // Check for canonical URL
    const canonicalRegex = new RegExp(`<link rel="canonical" href="https://barskydesign.pro/project/${projectId}" />`);
    if (!canonicalRegex.test(html)) {
      console.error(`❌ Missing or incorrect canonical URL for ${projectId}`);
      allValid = false;
    } else {
      console.log(`✅ ${projectId}: Canonical URL correct`);
    }
    
    // Check for Open Graph URL
    const ogUrlRegex = new RegExp(`<meta property="og:url" content="https://barskydesign.pro/project/${projectId}" />`);
    if (!ogUrlRegex.test(html)) {
      console.error(`❌ Missing or incorrect OG URL for ${projectId}`);
      allValid = false;
    } else {
      console.log(`✅ ${projectId}: Open Graph URL correct`);
    }
    
    // Check for project-specific title
    if (!html.includes(`${projectId}`) || !html.includes('Hiram Barsky')) {
      console.error(`❌ Missing or incorrect title for ${projectId}`);
      allValid = false;
    } else {
      console.log(`✅ ${projectId}: Title looks good`);
    }
  });
  
  if (allValid) {
    console.log('\n🎉 All static pages generated successfully with correct meta tags!');
  } else {
    console.log('\n❌ Build verification failed. Check errors above.');
  }
  
  return allValid;
}

// Only run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const success = verifyBuild();
  process.exit(success ? 0 : 1);
}

export { verifyBuild };
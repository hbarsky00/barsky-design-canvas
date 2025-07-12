import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectIds = [
  'wholesale-distribution',
  'herbalink', 
  'splittime',
  'investor-loan-app'
];

function testCrawlerUrls() {
  console.log('🤖 Testing URLs for social media crawlers...\n');
  
  const baseUrl = 'http://localhost:4173'; // Vite preview default port
  
  projectIds.forEach(projectId => {
    const projectUrl = `${baseUrl}/project/${projectId}`;
    console.log(`📍 Project: ${projectId}`);
    console.log(`   URL: ${projectUrl}`);
    console.log(`   Facebook Debugger: https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(projectUrl)}`);
    console.log(`   LinkedIn Inspector: https://www.linkedin.com/post-inspector/inspect/${encodeURIComponent(projectUrl)}`);
    console.log(`   Twitter Validator: https://cards-dev.twitter.com/validator`);
    console.log('');
  });
  
  console.log('📝 Testing Instructions:');
  console.log('1. Make sure preview server is running (npm run preview)');
  console.log('2. Test each URL in the social media debuggers above');
  console.log('3. Verify canonical URLs show as: https://barskydesign.pro/project/[project-id]');
  console.log('4. Check that meta tags contain project-specific information');
  console.log('');
  console.log('🎯 Expected Results:');
  console.log('- Canonical URL should NOT be index.html');
  console.log('- Open Graph URL should match the project URL');
  console.log('- Title should include project name + "| Hiram Barsky"');
  console.log('- Description should be project-specific');
}

// Only run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testCrawlerUrls();
}

export { testCrawlerUrls };
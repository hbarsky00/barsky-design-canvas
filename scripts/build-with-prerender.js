
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🏗️  Building React app with pre-rendering...');

try {
  // Clean previous builds
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
    console.log('🧹 Cleaned previous build');
  }

  // Build the application
  execSync('vite build', { stdio: 'inherit' });
  console.log('✅ Vite build completed');

  // Run react-snap to generate static HTML files
  console.log('🔄 Running react-snap to generate static HTML files...');
  execSync('npx react-snap', { stdio: 'inherit' });
  console.log('✅ React-snap completed');

  // Verify build files
  const distDir = 'dist';
  if (fs.existsSync(distDir)) {
    const getAllFiles = (dirPath, arrayOfFiles = []) => {
      const files = fs.readdirSync(dirPath);
      
      files.forEach((file) => {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
          arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
          arrayOfFiles.push(path.join(dirPath, "/", file));
        }
      });
      
      return arrayOfFiles;
    };

    const allFiles = getAllFiles(distDir);
    const htmlFiles = allFiles.filter(file => file.endsWith('.html'));
    
    console.log(`📄 Generated ${htmlFiles.length} HTML files:`);
    htmlFiles.forEach(file => {
      const relativePath = path.relative(distDir, file);
      console.log(`  - ${relativePath}`);
    });

    // Verify meta tags in important project files
    const projectFiles = htmlFiles.filter(file => 
      file.includes('project/splittime') || 
      file.includes('project/herbalink') ||
      file.includes('project/business-management') ||
      file === path.join(distDir, 'index.html')
    );
    
    console.log('\n🔍 Verifying SEO meta tags in key files:');
    projectFiles.forEach(file => {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        const hasOgTitle = content.includes('property="og:title"');
        const hasOgImage = content.includes('property="og:image"');
        const hasCanonical = content.includes('rel="canonical"');
        const relativePath = path.relative(distDir, file);
        
        console.log(`  ${relativePath}:`);
        console.log(`    📝 Title tag: ${content.includes('<title>') ? '✅' : '❌'}`);
        console.log(`    🏷️  OG tags: ${hasOgTitle && hasOgImage ? '✅' : '❌'}`);
        console.log(`    🔗 Canonical: ${hasCanonical ? '✅' : '❌'}`);
        
        // Check if page has proper project-specific content
        if (file.includes('splittime')) {
          const hasSplittimeContent = content.includes('Splittime') || content.includes('splittime');
          console.log(`    📄 Splittime content: ${hasSplittimeContent ? '✅' : '❌'}`);
        }
      }
    });
  }

  console.log('🎉 Build complete!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

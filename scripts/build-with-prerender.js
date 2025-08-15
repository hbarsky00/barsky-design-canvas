
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

    // Verify meta tags in key files
    const keyFiles = ['index.html'];
    keyFiles.forEach(file => {
      const filePath = path.join(distDir, file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const hasOgTitle = content.includes('property="og:title"');
        const hasOgImage = content.includes('property="og:image"');
        console.log(`🔍 ${file}: OG tags ${hasOgTitle && hasOgImage ? '✅' : '❌'}`);
      }
    });
  }

  console.log('🎉 Build complete!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

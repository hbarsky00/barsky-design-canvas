
import { ImageStorageService } from '../imageStorage';

export class ImageProcessor {
  static async processImages(
    imageReplacements: Record<string, string>,
    oldImageReplacements: Record<string, string>,
    projectId: string
  ) {
    const publishedImageMappings: Record<string, string> = {};
    const oldImagesToCleanup: string[] = [];
    const failedUploads: string[] = [];
    
    for (const [originalSrc, newSrc] of Object.entries(imageReplacements)) {
      try {
        // Track old image for cleanup
        if (oldImageReplacements[originalSrc] && oldImageReplacements[originalSrc] !== originalSrc) {
          oldImagesToCleanup.push(oldImageReplacements[originalSrc]);
        }

        if (newSrc.startsWith('data:')) {
          // Upload data URL images to Supabase Storage
          try {
            const response = await fetch(newSrc);
            if (!response.ok) {
              console.error('❌ Failed to fetch image data for:', originalSrc);
              failedUploads.push(originalSrc);
              continue;
            }
            
            const blob = await response.blob();
            if (blob.size === 0) {
              console.error('❌ Empty blob received for:', originalSrc);
              failedUploads.push(originalSrc);
              continue;
            }
            
            const file = new File([blob], 'image.png', { type: blob.type });
            
            const uploadedUrl = await ImageStorageService.uploadImage(file, projectId, originalSrc);
            
            if (uploadedUrl && (uploadedUrl.startsWith('https://') || uploadedUrl.startsWith('http://'))) {
              publishedImageMappings[originalSrc] = uploadedUrl;
              console.log('📤 Uploaded image to Supabase Storage:', originalSrc.substring(0, 50) + '...', '->', uploadedUrl);
            } else {
              console.warn('❌ Upload failed or returned invalid URL for:', originalSrc);
              failedUploads.push(originalSrc);
            }
          } catch (uploadError) {
            console.error('❌ Error uploading image to Supabase Storage:', originalSrc, uploadError);
            failedUploads.push(originalSrc);
          }
        } else if (newSrc.startsWith('https://') || newSrc.startsWith('http://') || newSrc.startsWith('/')) {
          // Accept already valid URLs
          if (newSrc.includes('data:')) {
            console.warn('⚠️ Suspicious URL contains data: prefix, skipping:', newSrc);
            failedUploads.push(originalSrc);
          } else {
            publishedImageMappings[originalSrc] = newSrc;
            console.log('✅ Using existing valid URL:', originalSrc.substring(0, 50) + '...', '->', newSrc);
          }
        } else {
          console.warn('⚠️ Skipping invalid image URL format:', originalSrc, '->', newSrc);
          failedUploads.push(originalSrc);
        }
      } catch (error) {
        console.error('❌ Error processing image:', originalSrc, error);
        failedUploads.push(originalSrc);
      }
    }

    if (failedUploads.length > 0) {
      console.warn('⚠️ Failed to process images:', failedUploads);
    }

    return { publishedImageMappings, oldImagesToCleanup, failedUploads };
  }

  static async processContentBlocks(
    contentBlocks: Record<string, any[]>,
    projectId: string
  ) {
    const processedContentBlocks: Record<string, any[]> = {};
    
    for (const [sectionKey, blocks] of Object.entries(contentBlocks)) {
      const processedBlocks = await Promise.all(
        blocks.map(async (block: any) => {
          if (block.type === 'image' && block.src && block.src.startsWith('data:')) {
            try {
              const response = await fetch(block.src);
              if (!response.ok) {
                console.warn('⚠️ Content block image fetch failed, removing from content');
                return null;
              }
              
              const blob = await response.blob();
              const file = new File([blob], 'content-image.png', { type: blob.type });
              
              const uploadedUrl = await ImageStorageService.uploadImage(file, projectId, `content-${sectionKey}-${Date.now()}`);
              if (uploadedUrl && (uploadedUrl.startsWith('https://') || uploadedUrl.startsWith('http://'))) {
                return { ...block, src: uploadedUrl };
              } else {
                console.warn('⚠️ Content block image upload failed, removing from content');
                return null;
              }
            } catch (error) {
              console.error('❌ Error uploading content block image to Supabase Storage:', error);
              return null;
            }
          }
          return block;
        })
      );
      
      processedContentBlocks[sectionKey] = processedBlocks.filter(block => block !== null);
    }

    return processedContentBlocks;
  }
}


import { supabase } from '@/integrations/supabase/client';
import { ImageStorageService } from './imageStorage';
import { fetchChangesFromDatabase, clearChangesFromDatabase } from '@/hooks/database/operations';
import { processChangesData } from '@/hooks/database/dataProcessor';

export class PublishingService {
  static async publishProject(projectId: string): Promise<boolean> {
    try {
      console.log('🚀 Starting project publishing for:', projectId);
      
      if (!projectId || typeof projectId !== 'string') {
        console.error('❌ Invalid project ID provided:', projectId);
        throw new Error('Invalid project ID');
      }
      
      // Get all dev mode changes using direct database operations
      const rawChanges = await fetchChangesFromDatabase(projectId);
      
      if (!rawChanges || rawChanges.length === 0) {
        console.log('❌ No changes found in database for project:', projectId);
        throw new Error('No changes found to publish');
      }
      
      const changes = processChangesData(rawChanges);
      
      console.log('📊 Publishing changes:', {
        textKeys: Object.keys(changes.textContent).length,
        imageKeys: Object.keys(changes.imageReplacements).length,
        contentBlockKeys: Object.keys(changes.contentBlocks).length
      });

      // Step 1: Get current published data for cleanup
      const currentPublishedData = await this.loadPublishedData(projectId);
      const oldImageReplacements = currentPublishedData?.image_replacements || {};

      // Step 2: Process images - upload new ones and track old ones for cleanup
      const publishedImageMappings: Record<string, string> = {};
      const oldImagesToCleanup: string[] = [];
      
      for (const [originalSrc, newSrc] of Object.entries(changes.imageReplacements)) {
        try {
          // Track old image for cleanup
          if (oldImageReplacements[originalSrc] && oldImageReplacements[originalSrc] !== originalSrc) {
            oldImagesToCleanup.push(oldImageReplacements[originalSrc]);
          }

          if (newSrc.startsWith('data:')) {
            // Upload data URL images to permanent storage
            const response = await fetch(newSrc);
            if (!response.ok) {
              console.error('Failed to fetch image data for:', originalSrc);
              continue;
            }
            
            const blob = await response.blob();
            const file = new File([blob], 'image.png', { type: blob.type });
            
            const uploadedUrl = await ImageStorageService.uploadImage(file, projectId, originalSrc);
            if (uploadedUrl) {
              publishedImageMappings[originalSrc] = uploadedUrl;
              console.log('📤 Uploaded image:', originalSrc.substring(0, 50) + '...', '->', uploadedUrl);
            } else {
              console.error('❌ Failed to upload image for:', originalSrc);
              publishedImageMappings[originalSrc] = newSrc; // Keep data URL as fallback
            }
          } else {
            publishedImageMappings[originalSrc] = newSrc;
          }
        } catch (error) {
          console.error('❌ Error processing image:', originalSrc, error);
          publishedImageMappings[originalSrc] = newSrc; // Keep original change as fallback
        }
      }

      // Step 3: Process content blocks and handle any images in them
      const processedContentBlocks: Record<string, any[]> = {};
      
      for (const [sectionKey, blocks] of Object.entries(changes.contentBlocks)) {
        const processedBlocks = await Promise.all(
          blocks.map(async (block: any) => {
            if (block.type === 'image' && block.src && block.src.startsWith('data:')) {
              try {
                const response = await fetch(block.src);
                const blob = await response.blob();
                const file = new File([blob], 'content-image.png', { type: blob.type });
                
                const uploadedUrl = await ImageStorageService.uploadImage(file, projectId, `content-${sectionKey}-${Date.now()}`);
                if (uploadedUrl) {
                  return { ...block, src: uploadedUrl };
                }
              } catch (error) {
                console.error('❌ Error uploading content block image:', error);
              }
            }
            return block;
          })
        );
        
        processedContentBlocks[sectionKey] = processedBlocks;
      }

      // Step 4: Store published state in the database
      const publishedData = {
        project_id: projectId,
        text_content: changes.textContent as any,
        image_replacements: publishedImageMappings as any,
        content_blocks: processedContentBlocks as any,
        published_at: new Date().toISOString()
      };

      console.log('💾 Saving published data to database');

      const { error: publishError } = await supabase
        .from('published_projects')
        .upsert(publishedData, {
          onConflict: 'project_id'
        });

      if (publishError) {
        console.error('❌ Error storing published data:', publishError);
        throw new Error(`Database error: ${publishError.message}`);
      }

      // Step 5: Clear browser cache for old images
      if (oldImagesToCleanup.length > 0) {
        console.log('🧹 Clearing cache for old images');
        ImageStorageService.clearImageCache(oldImagesToCleanup);
      }

      // Step 6: Apply changes to DOM immediately with enhanced cache busting
      this.applyChangesToDOM(publishedImageMappings, changes.textContent, processedContentBlocks);

      // Step 7: Store in localStorage as fallback
      try {
        localStorage.setItem(`published_${projectId}`, JSON.stringify(publishedData));
      } catch (error) {
        console.warn('⚠️ Could not store to localStorage:', error);
      }

      // Step 8: Clear dev mode changes AFTER successful publish
      console.log('🗑️ Clearing dev mode changes after successful publish');
      const clearSuccess = await clearChangesFromDatabase(projectId);
      if (!clearSuccess) {
        console.warn('⚠️ Failed to clear dev mode changes, but publishing succeeded');
      }

      // Step 9: Clean up old images from storage
      try {
        if (oldImagesToCleanup.length > 0) {
          await Promise.all(oldImagesToCleanup.map(ImageStorageService.deleteImage));
        }
        await ImageStorageService.cleanupProjectImages(projectId, Object.values(publishedImageMappings));
      } catch (error) {
        console.warn('⚠️ Image cleanup failed:', error);
      }

      console.log('✅ Project published successfully - staying on current page');
      return true;
    } catch (error) {
      console.error('❌ Error publishing project:', error);
      throw error;
    }
  }

  private static applyChangesToDOM(
    imageReplacements: Record<string, string>,
    textContent: Record<string, string>,
    contentBlocks: Record<string, any[]>
  ) {
    console.log('🎨 Applying published changes to DOM immediately');

    // Apply image changes with aggressive cache busting
    Object.entries(imageReplacements).forEach(([oldSrc, newSrc]) => {
      const timestamp = Date.now();
      const cacheBustedNewSrc = newSrc.includes('?') 
        ? `${newSrc}&v=${timestamp}` 
        : `${newSrc}?v=${timestamp}`;
      
      // Update all matching images
      document.querySelectorAll('img').forEach((img) => {
        if (img.src === oldSrc || img.src.includes(oldSrc)) {
          img.src = cacheBustedNewSrc;
          console.log('🖼️ Updated image in DOM:', oldSrc.substring(0, 50) + '...', '->', cacheBustedNewSrc.substring(0, 50) + '...');
        }
      });
      
      // Update background images
      document.querySelectorAll('[style*="background-image"]').forEach((element) => {
        const style = (element as HTMLElement).style;
        if (style.backgroundImage && style.backgroundImage.includes(oldSrc)) {
          style.backgroundImage = style.backgroundImage.replace(oldSrc, cacheBustedNewSrc);
        }
      });
    });

    // Dispatch comprehensive update events
    window.dispatchEvent(new CustomEvent('projectDataUpdated', {
      detail: { 
        published: true, 
        immediate: true,
        timestamp: Date.now(),
        imageReplacements,
        textContent,
        contentBlocks,
        stayOnPage: true,
        cacheClear: true
      }
    }));

    // Dispatch specific update events
    Object.entries(textContent).forEach(([textKey, newText]) => {
      window.dispatchEvent(new CustomEvent('liveTextUpdate', {
        detail: { textKey, newText }
      }));
    });

    Object.entries(contentBlocks).forEach(([sectionKey, blocks]) => {
      window.dispatchEvent(new CustomEvent('liveContentBlockUpdate', {
        detail: { sectionKey, blocks }
      }));
    });

    console.log('✅ All published changes applied to DOM - no navigation triggered');
  }

  static async loadPublishedData(projectId: string): Promise<any> {
    try {
      // Try database first
      const { data, error } = await supabase
        .from('published_projects')
        .select('*')
        .eq('project_id', projectId)
        .single();

      if (!error && data) {
        console.log('📖 Loaded published data from database');
        return data;
      }

      // Fallback to localStorage
      const localData = localStorage.getItem(`published_${projectId}`);
      if (localData) {
        console.log('📖 Loaded published data from localStorage');
        return JSON.parse(localData);
      }

      console.log('📖 No published data found for project:', projectId);
      return null;
    } catch (error) {
      console.error('❌ Error loading published data:', error);
      return null;
    }
  }
}

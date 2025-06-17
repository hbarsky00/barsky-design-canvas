
import { supabase } from '@/integrations/supabase/client';
import { ImageStorageService } from './imageStorage';
import { fetchChangesFromDatabase, clearChangesFromDatabase } from '@/hooks/database/operations';
import { processChangesData } from '@/hooks/database/dataProcessor';

export class PublishingService {
  static async publishProject(projectId: string): Promise<boolean> {
    try {
      console.log('🚀 Starting project publishing for:', projectId);
      
      // Validate project ID
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
        contentBlockKeys: Object.keys(changes.contentBlocks).length,
        contentBlockDetails: changes.contentBlocks
      });

      // Step 1: Get current published data to identify old images for cleanup
      const currentPublishedData = await this.loadPublishedData(projectId);
      const oldImageReplacements = currentPublishedData?.image_replacements || {};

      // Step 2: Handle image replacements by uploading to permanent storage
      const publishedImageMappings: Record<string, string> = {};
      const oldImagesToCleanup: string[] = [];
      
      for (const [originalSrc, newSrc] of Object.entries(changes.imageReplacements)) {
        try {
          // Track old image for cleanup if it exists
          if (oldImageReplacements[originalSrc] && oldImageReplacements[originalSrc] !== originalSrc) {
            oldImagesToCleanup.push(oldImageReplacements[originalSrc]);
          }

          if (newSrc.startsWith('data:')) {
            // Convert data URL to blob and upload
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
              console.log('📤 Uploaded image:', originalSrc, '->', uploadedUrl);
            }
          } else {
            // Keep existing URL
            publishedImageMappings[originalSrc] = newSrc;
          }
        } catch (error) {
          console.error('❌ Error processing image:', originalSrc, error);
          // Continue with other images
        }
      }

      // Step 3: Process content blocks and handle any images in them
      const processedContentBlocks: Record<string, any[]> = {};
      
      for (const [sectionKey, blocks] of Object.entries(changes.contentBlocks)) {
        console.log('🔄 Processing content blocks for section:', sectionKey, 'blocks:', blocks);
        
        const processedBlocks = await Promise.all(
          blocks.map(async (block: any) => {
            if (block.type === 'image' && block.src && block.src.startsWith('data:')) {
              try {
                console.log('📤 Uploading content block image for section:', sectionKey);
                const response = await fetch(block.src);
                const blob = await response.blob();
                const file = new File([blob], 'content-image.png', { type: blob.type });
                
                const uploadedUrl = await ImageStorageService.uploadImage(file, projectId, `content-${sectionKey}-${Date.now()}`);
                if (uploadedUrl) {
                  console.log('✅ Uploaded content block image:', block.src.substring(0, 50) + '...', '->', uploadedUrl);
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
        console.log('✅ Processed content blocks for section:', sectionKey, 'result:', processedBlocks);
      }

      // Step 4: Store published state in the published_projects table
      const publishedData = {
        project_id: projectId,
        text_content: changes.textContent as any,
        image_replacements: publishedImageMappings as any,
        content_blocks: processedContentBlocks as any,
        published_at: new Date().toISOString()
      };

      console.log('💾 Saving published data:', publishedData);

      const { error: publishError } = await supabase
        .from('published_projects')
        .upsert(publishedData, {
          onConflict: 'project_id'
        });

      if (publishError) {
        console.error('❌ Error storing published data:', publishError);
        throw new Error(`Database error: ${publishError.message}`);
      }

      // Step 5: Clear cache for old images and apply changes to DOM
      if (oldImagesToCleanup.length > 0) {
        console.log('🧹 Clearing cache for old images:', oldImagesToCleanup);
        ImageStorageService.clearImageCache(oldImagesToCleanup);
      }

      // Apply changes to the live DOM immediately (PREVENT ANY NAVIGATION)
      this.applyChangesToDOM(publishedImageMappings, changes.textContent, processedContentBlocks);

      // Step 6: Store in localStorage as fallback
      try {
        localStorage.setItem(`published_${projectId}`, JSON.stringify(publishedData));
      } catch (error) {
        console.warn('⚠️ Could not store to localStorage:', error);
      }

      // Step 7: Clean up dev mode changes
      const clearSuccess = await clearChangesFromDatabase(projectId);
      if (!clearSuccess) {
        console.warn('⚠️ Failed to clear dev mode changes, but publishing succeeded');
      }

      // Step 8: Clean up old images from storage
      try {
        if (oldImagesToCleanup.length > 0) {
          console.log('🗑️ Deleting old images from storage:', oldImagesToCleanup);
          await Promise.all(oldImagesToCleanup.map(ImageStorageService.deleteImage));
        }
        await ImageStorageService.cleanupProjectImages(projectId, Object.values(publishedImageMappings));
      } catch (error) {
        console.warn('⚠️ Image cleanup failed:', error);
      }

      console.log('✅ Project published successfully - STAYING ON CURRENT PAGE');
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
    console.log('🎨 Applying changes to DOM WITHOUT any navigation or page refresh');
    console.log('📦 Content blocks to apply:', contentBlocks);

    // Apply image changes immediately to all matching images with cache busting
    Object.entries(imageReplacements).forEach(([oldSrc, newSrc]) => {
      const cacheBustedNewSrc = newSrc + '?v=' + Date.now();
      
      document.querySelectorAll(`img[src*="${oldSrc}"]`).forEach((img) => {
        (img as HTMLImageElement).src = cacheBustedNewSrc;
        console.log('🖼️ Updated image in DOM:', oldSrc, '->', cacheBustedNewSrc);
      });
      
      // Also update any background images
      document.querySelectorAll(`[style*="background-image"]`).forEach((element) => {
        const style = (element as HTMLElement).style;
        if (style.backgroundImage && style.backgroundImage.includes(oldSrc)) {
          style.backgroundImage = style.backgroundImage.replace(oldSrc, cacheBustedNewSrc);
          console.log('🎨 Updated background image in DOM:', oldSrc, '->', cacheBustedNewSrc);
        }
      });
    });

    // Dispatch comprehensive update events for all components to refresh
    window.dispatchEvent(new CustomEvent('projectDataUpdated', {
      detail: { 
        published: true, 
        immediate: true,
        timestamp: Date.now(),
        imageReplacements,
        textContent,
        contentBlocks,
        stayOnPage: true, // Explicitly prevent navigation
        cacheClear: true // Flag to indicate cache should be cleared
      }
    }));

    // Dispatch specific events for text and content block updates
    Object.entries(textContent).forEach(([textKey, newText]) => {
      window.dispatchEvent(new CustomEvent('liveTextUpdate', {
        detail: { textKey, newText }
      }));
    });

    Object.entries(contentBlocks).forEach(([sectionKey, blocks]) => {
      console.log('📡 Dispatching content block update for:', sectionKey, 'blocks:', blocks);
      window.dispatchEvent(new CustomEvent('liveContentBlockUpdate', {
        detail: { sectionKey, blocks }
      }));
    });

    console.log('✅ All changes applied to DOM successfully - NO NAVIGATION TRIGGERED');
  }

  static async loadPublishedData(projectId: string): Promise<any> {
    try {
      // Try to load from database first
      const { data, error } = await supabase
        .from('published_projects')
        .select('*')
        .eq('project_id', projectId)
        .single();

      if (!error && data) {
        console.log('📖 Loaded published data from database:', data);
        return data;
      }

      // Fallback to localStorage
      const localData = localStorage.getItem(`published_${projectId}`);
      if (localData) {
        console.log('📖 Loaded published data from localStorage');
        return JSON.parse(localData);
      }

      return null;
    } catch (error) {
      console.error('❌ Error loading published data:', error);
      return null;
    }
  }
}

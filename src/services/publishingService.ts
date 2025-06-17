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
      
      // Store current navigation state and prevent any navigation
      const originalUrl = window.location.href;
      const originalPath = window.location.pathname;
      const originalState = window.history.state;
      
      console.log('🔒 PublishingService: Locking navigation at:', originalPath);
      
      // Set up navigation prevention
      const preventNavigation = (e: Event) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        console.log('🚫 Navigation prevented during publishing');
        return false;
      };
      
      // Add multiple navigation prevention listeners
      window.addEventListener('beforeunload', preventNavigation, true);
      window.addEventListener('popstate', preventNavigation, true);
      
      try {
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
        const failedUploads: string[] = [];
        
        for (const [originalSrc, newSrc] of Object.entries(changes.imageReplacements)) {
          try {
            // Track old image for cleanup
            if (oldImageReplacements[originalSrc] && oldImageReplacements[originalSrc] !== originalSrc) {
              oldImagesToCleanup.push(oldImageReplacements[originalSrc]);
            }

            if (newSrc.startsWith('data:')) {
              // Upload data URL images to permanent storage with validation
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
                
                // Strict validation: only accept valid HTTP(S) URLs
                if (uploadedUrl && (uploadedUrl.startsWith('https://') || uploadedUrl.startsWith('http://'))) {
                  publishedImageMappings[originalSrc] = uploadedUrl;
                  console.log('📤 Uploaded image:', originalSrc.substring(0, 50) + '...', '->', uploadedUrl);
                } else {
                  console.warn('❌ Upload failed or returned invalid URL for:', originalSrc, 'Got:', uploadedUrl);
                  failedUploads.push(originalSrc);
                }
              } catch (uploadError) {
                console.error('❌ Error uploading image:', originalSrc, uploadError);
                failedUploads.push(originalSrc);
              }
            } else if (newSrc.startsWith('https://') || newSrc.startsWith('http://') || newSrc.startsWith('/')) {
              // Accept already valid URLs, but validate they're not data URLs disguised
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

        // Log any failed uploads with details
        if (failedUploads.length > 0) {
          console.warn('⚠️ Failed to process images (will not be published):', failedUploads);
        }

        // Step 3: Process content blocks and handle any images in them
        const processedContentBlocks: Record<string, any[]> = {};
        
        for (const [sectionKey, blocks] of Object.entries(changes.contentBlocks)) {
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
                  console.error('❌ Error uploading content block image:', error);
                  return null;
                }
              }
              return block;
            })
          );
          
          // Filter out null blocks (failed uploads)
          processedContentBlocks[sectionKey] = processedBlocks.filter(block => block !== null);
        }

        // Step 4: Final validation before storing
        const validImageReplacements = Object.fromEntries(
          Object.entries(publishedImageMappings).filter(([key, value]) => {
            const isValid = value && (value.startsWith('https://') || value.startsWith('http://') || value.startsWith('/'));
            if (!isValid) {
              console.warn('⚠️ Filtering out invalid image replacement:', key, '->', value);
            }
            return isValid;
          })
        );

        console.log('✅ Final validated image mappings:', Object.keys(validImageReplacements).length, 'images');

        // Step 5: Store published state in the database
        const publishedData = {
          project_id: projectId,
          text_content: changes.textContent as any,
          image_replacements: validImageReplacements as any,
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

        // Step 6: Apply changes to DOM immediately - but PREVENT ANY NAVIGATION
        this.applyChangesToDOM(validImageReplacements, changes.textContent, processedContentBlocks, originalPath);

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

        // Step 9: Clean up old images from storage and cache
        try {
          if (oldImagesToCleanup.length > 0) {
            await Promise.all(oldImagesToCleanup.map(ImageStorageService.deleteImage));
            ImageStorageService.clearImageCache(oldImagesToCleanup);
          }
          await ImageStorageService.cleanupProjectImages(projectId, Object.values(validImageReplacements));
        } catch (error) {
          console.warn('⚠️ Image cleanup failed:', error);
        }

        console.log('✅ Project published successfully with', Object.keys(validImageReplacements).length, 'validated images');
        return true;
        
      } finally {
        // Remove navigation prevention listeners
        window.removeEventListener('beforeunload', preventNavigation, true);
        window.removeEventListener('popstate', preventNavigation, true);
        
        // Aggressively restore original navigation state
        if (window.location.href !== originalUrl) {
          console.log('🔒 PublishingService: Force restoring original URL:', originalUrl);
          window.history.replaceState(originalState, '', originalUrl);
        }
        
        // Double-check path
        if (window.location.pathname !== originalPath) {
          console.log('🔒 PublishingService: Force restoring original path:', originalPath);
          window.history.replaceState(originalState, '', originalPath);
        }
      }
      
    } catch (error) {
      console.error('❌ Error publishing project:', error);
      throw error;
    }
  }

  private static applyChangesToDOM(
    imageReplacements: Record<string, string>,
    textContent: Record<string, string>,
    contentBlocks: Record<string, any[]>,
    originalPath: string
  ) {
    console.log('🎨 Applying published changes to DOM immediately');

    // Apply image changes with cache busting
    Object.entries(imageReplacements).forEach(([oldSrc, newSrc]) => {
      const timestamp = Date.now();
      const cacheBustedNewSrc = newSrc.includes('?') 
        ? `${newSrc}&v=${timestamp}` 
        : `${newSrc}?v=${timestamp}`;
      
      // Update all matching images
      document.querySelectorAll('img').forEach((img) => {
        const imgSrc = img.src;
        
        // Handle both exact matches and data URLs
        if (imgSrc === oldSrc || imgSrc.includes(oldSrc) || 
            (oldSrc.startsWith('data:') && imgSrc.startsWith('data:'))) {
          img.src = cacheBustedNewSrc;
          console.log('🖼️ Updated image in DOM:', oldSrc.substring(0, 50) + '...', '->', cacheBustedNewSrc.substring(0, 50) + '...');
        }
      });
      
      // Update background images
      document.querySelectorAll('[style*="background-image"]').forEach((element) => {
        const style = (element as HTMLElement).style;
        if (style.backgroundImage && (style.backgroundImage.includes(oldSrc) || 
            (oldSrc.startsWith('data:') && style.backgroundImage.includes('data:')))) {
          style.backgroundImage = style.backgroundImage.replace(/url\(['"]?[^'"]*['"]?\)/, `url("${cacheBustedNewSrc}")`);
        }
      });
    });

    // Dispatch comprehensive update events with STRICT navigation prevention
    window.dispatchEvent(new CustomEvent('projectDataUpdated', {
      detail: { 
        published: true, 
        immediate: true,
        timestamp: Date.now(),
        imageReplacements,
        textContent,
        contentBlocks,
        stayOnPage: true,
        preventNavigation: true,
        lockNavigation: true,
        cacheClear: true,
        originalPath: originalPath
      }
    }));

    // Force a component refresh without navigation
    setTimeout(() => {
      // Ensure we're still on the right page before dispatching
      if (window.location.pathname === originalPath) {
        window.dispatchEvent(new CustomEvent('projectDataUpdated', {
          detail: { 
            published: true, 
            immediate: true,
            timestamp: Date.now() + 1,
            imageReplacements,
            textContent,
            contentBlocks,
            stayOnPage: true,
            preventNavigation: true,
            lockNavigation: true,
            forceRefresh: true,
            originalPath: originalPath
          }
        }));
      } else {
        console.log('🚫 Path changed during publish, forcing back to:', originalPath);
        window.history.replaceState(null, '', originalPath);
      }
    }, 100);

    console.log('✅ All published changes applied to DOM - locked on page:', originalPath);
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


import { supabase } from '@/integrations/supabase/client';
import { ImageStorageService } from './imageStorage';
import { fetchChangesFromDatabase, clearChangesFromDatabase } from '@/hooks/database/operations';
import { processChangesData } from '@/hooks/database/dataProcessor';

export class PublishingService {
  static async publishProject(projectId: string): Promise<boolean> {
    try {
      console.log('🚀 Starting comprehensive project publishing for:', projectId);
      
      if (!projectId || typeof projectId !== 'string') {
        console.error('❌ Invalid project ID provided:', projectId);
        throw new Error('Invalid project ID');
      }
      
      // Store current navigation state and prevent any navigation
      const originalUrl = window.location.href;
      const originalPath = window.location.pathname;
      
      console.log('🔒 PublishingService: Preserving navigation at:', originalPath);

      try {
        // Get all dev mode changes using direct database operations
        const rawChanges = await fetchChangesFromDatabase(projectId);
        
        if (!rawChanges || rawChanges.length === 0) {
          console.log('❌ No changes found in database for project:', projectId);
          throw new Error('No changes found to publish');
        }
        
        const changes = processChangesData(rawChanges);
        
        console.log('📊 Publishing comprehensive changes:', {
          textKeys: Object.keys(changes.textContent).length,
          imageKeys: Object.keys(changes.imageReplacements).length,
          contentBlockKeys: Object.keys(changes.contentBlocks).length
        });

        // Step 1: Get current published data for baseline and cleanup
        const currentPublishedData = await this.loadPublishedData(projectId);
        const oldImageReplacements = currentPublishedData?.image_replacements || {};
        const currentPublishedText = currentPublishedData?.text_content || {};

        console.log('📄 Current published text content:', Object.keys(currentPublishedText).length, 'entries');

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

        // Step 3: Merge text content - CRITICAL FIX
        const finalTextContent = {
          ...currentPublishedText,  // Start with current published text as base
          ...changes.textContent    // Overlay dev changes on top
        };

        console.log('📝 Text content merge:', {
          publishedCount: Object.keys(currentPublishedText).length,
          devChangesCount: Object.keys(changes.textContent).length,
          finalCount: Object.keys(finalTextContent).length,
          devKeys: Object.keys(changes.textContent)
        });

        // Step 4: Process content blocks and handle any images in them
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

        // Step 5: Final validation before storing
        const validImageReplacements = Object.fromEntries(
          Object.entries(publishedImageMappings).filter(([key, value]) => {
            const isValid = value && (value.startsWith('https://') || value.startsWith('http://') || value.startsWith('/'));
            if (!isValid) {
              console.warn('⚠️ Filtering out invalid image replacement:', key, '->', value);
            }
            return isValid;
          })
        );

        console.log('✅ Final validated data for publishing:', {
          imageCount: Object.keys(validImageReplacements).length,
          textCount: Object.keys(finalTextContent).length,
          contentBlockCount: Object.keys(processedContentBlocks).length
        });

        console.log('🖼️ Image replacements being published:', Object.keys(validImageReplacements).map(key => 
          `${key.substring(0, 30)}... -> ${validImageReplacements[key].substring(0, 30)}...`
        ));

        console.log('📝 Text content being published:', Object.keys(finalTextContent).map(key => 
          `${key}: ${finalTextContent[key].substring(0, 30)}...`
        ));

        // Step 6: Store published state in the database
        const publishedData = {
          project_id: projectId,
          text_content: finalTextContent as any,
          image_replacements: validImageReplacements as any,
          content_blocks: processedContentBlocks as any,
          published_at: new Date().toISOString()
        };

        console.log('💾 Saving published data to database with:', {
          textEntries: Object.keys(finalTextContent).length,
          imageReplacements: Object.keys(validImageReplacements).length
        });

        const { error: publishError } = await supabase
          .from('published_projects')
          .upsert(publishedData, {
            onConflict: 'project_id'
          });

        if (publishError) {
          console.error('❌ Error storing published data:', publishError);
          throw new Error(`Database error: ${publishError.message}`);
        }

        console.log('✅ Published data stored successfully in database');

        // Step 7: Apply ALL changes to DOM immediately and comprehensively
        this.applyAllChangesToDOM(validImageReplacements, finalTextContent, processedContentBlocks, originalPath);

        // Step 8: Store in localStorage as fallback and force component updates
        try {
          localStorage.setItem(`published_${projectId}`, JSON.stringify(publishedData));
          console.log('💾 Published data stored in localStorage as backup');
        } catch (error) {
          console.warn('⚠️ Could not store to localStorage:', error);
        }

        // Step 9: Clear dev mode changes AFTER successful publish and storage
        console.log('🗑️ Clearing dev mode changes after successful publish and storage');
        const clearSuccess = await clearChangesFromDatabase(projectId);
        if (!clearSuccess) {
          console.warn('⚠️ Failed to clear dev mode changes, but publishing succeeded');
        }

        // Step 10: Clean up old images from storage and cache
        try {
          if (oldImagesToCleanup.length > 0) {
            await Promise.all(oldImagesToCleanup.map(ImageStorageService.deleteImage));
            ImageStorageService.clearImageCache(oldImagesToCleanup);
          }
          await ImageStorageService.cleanupProjectImages(projectId, Object.values(validImageReplacements));
        } catch (error) {
          console.warn('⚠️ Image cleanup failed:', error);
        }

        // Step 11: Ensure we stay on the current page and force comprehensive refresh
        if (window.location.href !== originalUrl) {
          console.log('🔒 PublishingService: Restoring original URL:', originalUrl);
          window.history.replaceState(null, '', originalUrl);
        }

        // Force a complete component refresh to show ALL published changes
        console.log('🔄 Dispatching comprehensive update event with ALL published content');
        window.dispatchEvent(new CustomEvent('projectDataUpdated', {
          detail: { 
            projectId,
            published: true, 
            immediate: true,
            timestamp: Date.now(),
            imageReplacements: validImageReplacements,
            textContent: finalTextContent,
            contentBlocks: processedContentBlocks,
            forceRefresh: true,
            preventNavigation: true,
            allChangesApplied: true,
            stayOnPage: true
          }
        }));

        console.log('✅ Project published successfully with ALL content preserved:', {
          images: Object.keys(validImageReplacements).length,
          texts: Object.keys(finalTextContent).length,
          contentBlocks: Object.keys(processedContentBlocks).length
        });
        return true;
        
      } catch (error) {
        console.error('❌ Error publishing project:', error);
        throw error;
      }
      
    } catch (error) {
      console.error('❌ Error publishing project:', error);
      throw error;
    }
  }

  private static applyAllChangesToDOM(
    imageReplacements: Record<string, string>,
    textContent: Record<string, string>,
    contentBlocks: Record<string, any[]>,
    originalPath: string
  ) {
    console.log('🎨 Applying ALL published changes to DOM immediately and comprehensively');

    // Apply ALL image changes with cache busting and immediate DOM updates
    Object.entries(imageReplacements).forEach(([oldSrc, newSrc]) => {
      const timestamp = Date.now();
      const cacheBustedNewSrc = newSrc.includes('?') 
        ? `${newSrc}&v=${timestamp}` 
        : `${newSrc}?v=${timestamp}`;
      
      console.log('🖼️ Updating ALL images in DOM for:', oldSrc.substring(0, 30) + '...', '->', cacheBustedNewSrc.substring(0, 30) + '...');
      
      // Update ALL matching images immediately with multiple selection strategies
      const selectors = [
        `img[src="${oldSrc}"]`,
        `img[src*="${oldSrc.substring(0, 50)}"]`,
        `img[data-original-src="${oldSrc}"]`
      ];
      
      selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach((img) => {
          console.log('📸 Updating specific image element:', selector);
          (img as HTMLImageElement).src = cacheBustedNewSrc;
          img.setAttribute('data-updated', 'true');
          (img as HTMLElement).style.opacity = '0';
          (img as HTMLImageElement).onload = () => {
            (img as HTMLElement).style.opacity = '1';
          };
        });
      });
      
      // Also update any img elements that might have partial matches
      document.querySelectorAll('img').forEach((img) => {
        const imgSrc = img.src || img.getAttribute('src') || '';
        if (imgSrc.includes(oldSrc.substring(oldSrc.lastIndexOf('/') + 1)) || 
            imgSrc === oldSrc ||
            img.getAttribute('data-original-src') === oldSrc) {
          console.log('🔄 Updating image by partial match:', imgSrc);
          img.src = cacheBustedNewSrc;
          img.setAttribute('data-updated', 'true');
          img.style.opacity = '0';
          img.onload = () => {
            img.style.opacity = '1';
          };
        }
      });
      
      // Update background images
      document.querySelectorAll('[style*="background-image"]').forEach((element) => {
        const style = (element as HTMLElement).style;
        if (style.backgroundImage && (style.backgroundImage.includes(oldSrc) || style.backgroundImage.includes(oldSrc.substring(0, 30)))) {
          console.log('🎨 Updating background image:', style.backgroundImage);
          style.backgroundImage = style.backgroundImage.replace(/url\(['"]?[^'"]*['"]?\)/, `url("${cacheBustedNewSrc}")`);
        }
      });
    });

    // Apply ALL text content changes immediately with comprehensive selection
    Object.entries(textContent).forEach(([key, value]) => {
      console.log('📝 Updating ALL text in DOM for key:', key, 'with value:', value.substring(0, 50) + '...');
      
      // Multiple selection strategies for text elements
      const selectors = [
        `[data-text-key="${key}"]`,
        `[data-editable-text="${key}"]`,
        `[data-content-key="${key}"]`
      ];
      
      let elementsFound = 0;
      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
          if (element.textContent !== value) {
            console.log('📄 Updating text element:', selector, element.textContent?.substring(0, 30), '->', value.substring(0, 30));
            element.textContent = value;
            element.setAttribute('data-updated', 'true');
            elementsFound++;
          }
        });
      });
      
      if (elementsFound === 0) {
        console.warn('⚠️ No text elements found for key:', key);
      }
    });

    // Apply content block changes
    Object.entries(contentBlocks).forEach(([sectionKey, blocks]) => {
      console.log('📦 Updating content blocks for section:', sectionKey, 'with', blocks.length, 'blocks');
      
      const sectionElements = document.querySelectorAll(`[data-section="${sectionKey}"]`);
      sectionElements.forEach((element) => {
        element.setAttribute('data-updated', 'true');
        console.log('📦 Marked content block section for update:', sectionKey);
      });
    });

    // Force re-render of all React components by dispatching a comprehensive refresh event
    setTimeout(() => {
      console.log('🔄 Triggering comprehensive component refresh after DOM updates');
      window.dispatchEvent(new CustomEvent('forceComponentRefresh', {
        detail: { 
          allUpdated: true,
          timestamp: Date.now(),
          imageCount: Object.keys(imageReplacements).length,
          textCount: Object.keys(textContent).length
        }
      }));
    }, 100);

    console.log('✅ ALL published changes applied to DOM comprehensively - staying on page:', originalPath);
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
        console.log('📖 Loaded published data from database:', {
          images: Object.keys(data.image_replacements || {}).length,
          texts: Object.keys(data.text_content || {}).length
        });
        return data;
      }

      // Fallback to localStorage
      const localData = localStorage.getItem(`published_${projectId}`);
      if (localData) {
        const parsed = JSON.parse(localData);
        console.log('📖 Loaded published data from localStorage:', {
          images: Object.keys(parsed.image_replacements || {}).length,
          texts: Object.keys(parsed.text_content || {}).length
        });
        return parsed;
      }

      console.log('📖 No published data found for project:', projectId);
      return null;
    } catch (error) {
      console.error('❌ Error loading published data:', error);
      return null;
    }
  }
}

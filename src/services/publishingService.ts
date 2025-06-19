import { supabase } from '@/integrations/supabase/client';
import { ImageStorageService } from './imageStorage';
import { fetchChangesFromDatabase, clearChangesFromDatabase } from '@/hooks/database/operations';
import { processChangesData } from '@/hooks/database/dataProcessor';

export class PublishingService {
  static async publishProject(projectId: string, preserveDevChanges: boolean = true): Promise<boolean> {
    try {
      console.log('🚀 Starting project publishing for:', projectId, { preserveDevChanges });
      
      if (!projectId || typeof projectId !== 'string') {
        console.error('❌ Invalid project ID provided:', projectId);
        throw new Error('Invalid project ID');
      }
      
      // Store current navigation state
      const originalUrl = window.location.href;
      const originalPath = window.location.pathname;
      
      console.log('🔒 PublishingService: Preserving navigation at:', originalPath);

      try {
        // Get all dev mode changes
        const rawChanges = await fetchChangesFromDatabase(projectId);
        
        if (!rawChanges || rawChanges.length === 0) {
          console.log('ℹ️ No changes found in database for project:', projectId);
          
          // If preserving dev changes, don't throw error - just publish current state
          if (preserveDevChanges) {
            console.log('✅ Publishing current state without dev changes');
          } else {
            throw new Error('No changes found to publish');
          }
        }
        
        const changes = rawChanges ? processChangesData(rawChanges) : {
          textContent: {},
          imageReplacements: {},
          contentBlocks: {}
        };
        
        console.log('📊 Publishing changes:', {
          textKeys: Object.keys(changes.textContent).length,
          imageKeys: Object.keys(changes.imageReplacements).length,
          contentBlockKeys: Object.keys(changes.contentBlocks).length,
          preserveDevChanges
        });

        // Get current published data for baseline
        const currentPublishedData = await this.loadPublishedData(projectId);
        const oldImageReplacements = currentPublishedData?.image_replacements || {};
        const currentPublishedText = currentPublishedData?.text_content || {};

        console.log('📄 Current published state:', {
          textEntries: Object.keys(currentPublishedText).length,
          imageEntries: Object.keys(oldImageReplacements).length
        });

        // Process images - upload new ones and track old ones for cleanup
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
              // Upload data URL images to permanent storage
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
                  console.log('📤 Uploaded image:', originalSrc.substring(0, 50) + '...', '->', uploadedUrl);
                } else {
                  console.warn('❌ Upload failed or returned invalid URL for:', originalSrc);
                  failedUploads.push(originalSrc);
                }
              } catch (uploadError) {
                console.error('❌ Error uploading image:', originalSrc, uploadError);
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

        // Merge text content - published base + dev changes
        const finalTextContent = {
          ...currentPublishedText,
          ...changes.textContent
        };

        console.log('📝 Text content merge:', {
          publishedCount: Object.keys(currentPublishedText).length,
          devChangesCount: Object.keys(changes.textContent).length,
          finalCount: Object.keys(finalTextContent).length
        });

        // Process content blocks
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
          
          processedContentBlocks[sectionKey] = processedBlocks.filter(block => block !== null);
        }

        // Merge content blocks too
        const finalContentBlocks = {
          ...(currentPublishedData?.content_blocks || {}),
          ...processedContentBlocks
        };

        // Final validation
        const validImageReplacements = Object.fromEntries(
          Object.entries(publishedImageMappings).filter(([key, value]) => {
            const isValid = value && (value.startsWith('https://') || value.startsWith('http://') || value.startsWith('/'));
            if (!isValid) {
              console.warn('⚠️ Filtering out invalid image replacement:', key, '->', value);
            }
            return isValid;
          })
        );

        // Merge image replacements with existing published ones
        const finalImageReplacements = {
          ...oldImageReplacements,
          ...validImageReplacements
        };

        console.log('✅ Final data for publishing:', {
          imageCount: Object.keys(finalImageReplacements).length,
          textCount: Object.keys(finalTextContent).length,
          contentBlockCount: Object.keys(finalContentBlocks).length,
          preserveDevChanges
        });

        // Store published state in the database
        const publishedData = {
          project_id: projectId,
          text_content: finalTextContent as any,
          image_replacements: finalImageReplacements as any,
          content_blocks: finalContentBlocks as any,
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

        console.log('✅ Published data stored successfully');

        // Apply changes to DOM immediately
        this.applyAllChangesToDOM(finalImageReplacements, finalTextContent, finalContentBlocks, originalPath);

        // Store in localStorage as fallback
        try {
          localStorage.setItem(`published_${projectId}`, JSON.stringify(publishedData));
          console.log('💾 Published data stored in localStorage as backup');
        } catch (error) {
          console.warn('⚠️ Could not store to localStorage:', error);
        }

        // CONDITIONAL: Only clear dev mode changes if NOT preserving them
        if (!preserveDevChanges) {
          console.log('🗑️ Clearing dev mode changes');
          const clearSuccess = await clearChangesFromDatabase(projectId);
          if (!clearSuccess) {
            console.warn('⚠️ Failed to clear dev mode changes');
          }
        } else {
          console.log('🛡️ Preserving dev mode changes for continued editing');
        }

        // Clean up old images
        try {
          if (oldImagesToCleanup.length > 0) {
            await Promise.all(oldImagesToCleanup.map(ImageStorageService.deleteImage));
            ImageStorageService.clearImageCache(oldImagesToCleanup);
          }
          await ImageStorageService.cleanupProjectImages(projectId, Object.values(finalImageReplacements));
        } catch (error) {
          console.warn('⚠️ Image cleanup failed:', error);
        }

        // Ensure navigation stays consistent
        if (window.location.href !== originalUrl) {
          console.log('🔒 PublishingService: Restoring original URL:', originalUrl);
          window.history.replaceState(null, '', originalUrl);
        }

        // Force refresh to show published changes
        console.log('🔄 Dispatching update event with published content');
        window.dispatchEvent(new CustomEvent('projectDataUpdated', {
          detail: { 
            projectId,
            published: true, 
            immediate: true,
            timestamp: Date.now(),
            imageReplacements: finalImageReplacements,
            textContent: finalTextContent,
            contentBlocks: finalContentBlocks,
            preserveDevChanges,
            preventNavigation: true
          }
        }));

        console.log('✅ Project published successfully:', {
          images: Object.keys(finalImageReplacements).length,
          texts: Object.keys(finalTextContent).length,
          contentBlocks: Object.keys(finalContentBlocks).length,
          devChangesPreserved: preserveDevChanges
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

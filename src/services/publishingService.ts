
import { supabase } from '@/integrations/supabase/client';
import { VercelBlobStorageService } from './vercelBlobStorage';
import { fetchChangesFromDatabase, clearChangesFromDatabase } from '@/hooks/database/operations';
import { processChangesData } from '@/hooks/database/dataProcessor';
import { ImageProcessor } from './publishing/imageProcessor';
import { DOMUpdater } from './publishing/domUpdater';
import { PublishedData } from './publishing/types';

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
        // Get all dev mode changes FIRST - these are the source of truth
        const rawChanges = await fetchChangesFromDatabase(projectId);
        
        // Get image captions from COMPLETELY ISOLATED localStorage - separate system
        const imageCaptionStorageKey = `image_captions_${projectId}`;
        const imageCaptions = JSON.parse(localStorage.getItem(imageCaptionStorageKey) || '{}');
        
        console.log('📊 Found image captions (COMPLETELY ISOLATED SYSTEM):', {
          count: Object.keys(imageCaptions).length,
          keys: Object.keys(imageCaptions),
          captions: imageCaptions
        });
        
        if ((!rawChanges || rawChanges.length === 0) && Object.keys(imageCaptions).length === 0) {
          console.log('ℹ️ No changes found for project:', projectId);
          
          if (preserveDevChanges) {
            console.log('✅ Publishing current state without changes');
          } else {
            throw new Error('No changes found to publish');
          }
        }
        
        const devChanges = rawChanges ? processChangesData(rawChanges) : {
          textContent: {},
          imageReplacements: {},
          contentBlocks: {}
        };
        
        // CRITICAL FIX: Extract image replacements from dev_mode_changes with image_replacement type
        const imageReplacementChanges: Record<string, string> = {};
        if (rawChanges) {
          rawChanges.forEach(change => {
            if (change.change_type === 'image_replacement' && change.change_key && change.change_value) {
              const key = change.change_key.replace('image_', ''); // Remove prefix
              if (typeof change.change_value === 'object' && 'url' in change.change_value) {
                const url = (change.change_value as { url: string }).url;
                // Only use non-blob URLs for publishing (permanent URLs)
                if (url && !url.startsWith('blob:')) {
                  imageReplacementChanges[key] = url;
                  console.log('🔧 CRITICAL: Found permanent image replacement in dev changes:', key, '->', url);
                } else {
                  console.warn('⚠️ Skipping blob URL in publishing:', key, url);
                }
              }
            }
          });
        }
        
        console.log('📊 CRITICAL: Dev changes to publish (including permanent image replacements):', {
          textKeys: Object.keys(devChanges.textContent).length,
          imageKeys: Object.keys(devChanges.imageReplacements).length,
          newImageReplacements: Object.keys(imageReplacementChanges).length,
          contentBlockKeys: Object.keys(devChanges.contentBlocks).length
        });

        // Get current published data for baseline
        const currentPublishedData = await this.loadPublishedData(projectId);
        const oldImageReplacements = currentPublishedData?.image_replacements || {};
        const currentPublishedText = currentPublishedData?.text_content || {};

        console.log('📄 Current published state:', {
          textEntries: Object.keys(currentPublishedText).length,
          imageEntries: Object.keys(oldImageReplacements).length
        });

        // CRITICAL: Merge both old and new image replacement systems
        const allImageReplacements = {
          ...devChanges.imageReplacements,
          ...imageReplacementChanges
        };

        console.log('🔧 CRITICAL: All permanent image replacements to process:', {
          total: Object.keys(allImageReplacements).length,
          fromOldSystem: Object.keys(devChanges.imageReplacements).length,
          fromNewSystem: Object.keys(imageReplacementChanges).length,
          replacements: allImageReplacements
        });

        // Process images using Vercel Blob - only permanent URLs
        const { publishedImageMappings, oldImagesToCleanup, failedUploads } = await ImageProcessor.processImages(
          allImageReplacements,
          oldImageReplacements,
          projectId
        );

        // ENHANCED CAPTION SYSTEM - ensure ALL caption edits are preserved and published
        const baseTextContent = { ...currentPublishedText };
        const devTextContent = { ...devChanges.textContent };
        
        // Apply dev changes first (these are actual text edits)
        Object.keys(devTextContent).forEach(key => {
          baseTextContent[key] = devTextContent[key];
        });
        
        // CRITICAL FIX: Apply image captions from localStorage with proper validation
        console.log('🔧 CRITICAL FIX: Processing manually edited captions for publishing');
        Object.keys(imageCaptions).forEach(captionKey => {
          // Validate the caption key format
          if (captionKey && typeof imageCaptions[captionKey] === 'string' && imageCaptions[captionKey].trim()) {
            // Store with img_caption_ prefix to ensure complete separation and proper identification
            const publishKey = captionKey.startsWith('img_caption_') ? captionKey : `img_caption_${captionKey}`;
            baseTextContent[publishKey] = imageCaptions[captionKey].trim();
            console.log('✅ Publishing manually edited caption:', publishKey, '=', imageCaptions[captionKey].trim());
          }
        });

        // REMOVE any old caption_ keys to prevent duplicates and conflicts
        Object.keys(baseTextContent).forEach(key => {
          if (key.startsWith('caption_') && !key.startsWith('img_caption_')) {
            delete baseTextContent[key];
            console.log('🗑️ Removed old caption key to prevent conflicts:', key);
          }
        });

        const finalTextContent = baseTextContent;

        console.log('📝 FINAL Text content with ENHANCED CAPTION PUBLISHING:', {
          publishedCount: Object.keys(currentPublishedText).length,
          devChangesCount: Object.keys(devChanges.textContent).length,
          imageCaptionsCount: Object.keys(imageCaptions).length,
          finalCount: Object.keys(finalTextContent).length,
          captionKeys: Object.keys(finalTextContent).filter(k => k.includes('caption'))
        });

        // Process content blocks - dev changes win
        const processedContentBlocks = await ImageProcessor.processContentBlocks(devChanges.contentBlocks, projectId);
        const finalContentBlocks = {
          ...(currentPublishedData?.content_blocks || {}),
          ...processedContentBlocks
        };

        // Final validation for images - ensure no blob URLs make it to production
        const validImageReplacements = Object.fromEntries(
          Object.entries(publishedImageMappings).filter(([key, value]) => {
            const isValid = value && (value.startsWith('https://') || value.startsWith('http://') || value.startsWith('/')) && !value.startsWith('blob:');
            if (!isValid) {
              console.warn('⚠️ Filtering out invalid/blob image replacement:', key, '->', value);
            } else {
              console.log('✅ Including valid permanent image replacement:', key, '->', value);
            }
            return isValid;
          })
        );

        // Merge image replacements with existing published ones
        const finalImageReplacements = {
          ...oldImageReplacements,
          ...validImageReplacements
        };

        console.log('✅ FINAL data for publishing with ENHANCED CAPTIONS and PERMANENT IMAGE REPLACEMENTS:', {
          imageCount: Object.keys(finalImageReplacements).length,
          textCount: Object.keys(finalTextContent).length,
          contentBlockCount: Object.keys(finalContentBlocks).length,
          captionsIncluded: Object.keys(finalTextContent).filter(k => k.includes('caption')).length,
          imageReplacements: finalImageReplacements,
          preserveDevChanges
        });

        // Store published state in the database
        const publishedData: PublishedData = {
          project_id: projectId,
          text_content: finalTextContent as any,
          image_replacements: finalImageReplacements as any,
          content_blocks: finalContentBlocks as any,
          published_at: new Date().toISOString()
        };

        console.log('💾 Saving enhanced published data to database with permanent image URLs');

        const { error: publishError } = await supabase
          .from('published_projects')
          .upsert(publishedData, {
            onConflict: 'project_id'
          });

        if (publishError) {
          console.error('❌ Error storing published data:', publishError);
          throw new Error(`Database error: ${publishError.message}`);
        }

        console.log('✅ Enhanced published data with permanent image URLs stored successfully');

        // Apply changes to DOM immediately with enhanced caption support
        DOMUpdater.applyAllChangesToDOM(finalImageReplacements, finalTextContent, finalContentBlocks, originalPath);

        // Store in localStorage as fallback
        try {
          localStorage.setItem(`published_${projectId}`, JSON.stringify(publishedData));
          console.log('💾 Enhanced published data stored in localStorage as backup');
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
          
          // Also clear image captions if not preserving
          localStorage.removeItem(imageCaptionStorageKey);
        } else {
          console.log('🛡️ Preserving dev mode changes for continued editing');
        }

        // Clean up old images using Vercel Blob
        try {
          if (oldImagesToCleanup.length > 0) {
            await Promise.all(oldImagesToCleanup.map(VercelBlobStorageService.deleteImage));
            VercelBlobStorageService.clearImageCache(oldImagesToCleanup);
          }
          await VercelBlobStorageService.cleanupProjectImages(projectId, Object.values(finalImageReplacements));
        } catch (error) {
          console.warn('⚠️ Vercel Blob cleanup failed:', error);
        }

        // Ensure navigation stays consistent
        if (window.location.href !== originalUrl) {
          console.log('🔒 PublishingService: Restoring original URL:', originalUrl);
          window.history.replaceState(null, '', originalUrl);
        }

        // Force refresh to show published changes including captions
        console.log('🔄 Dispatching update event with enhanced published content including permanent images');
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
            preventNavigation: true,
            captionsUpdated: true,
            imagesUpdated: true
          }
        }));

        console.log('✅ Project published successfully with PERMANENT IMAGE URLs:', {
          images: Object.keys(finalImageReplacements).length,
          texts: Object.keys(finalTextContent).length,
          contentBlocks: Object.keys(finalContentBlocks).length,
          captions: Object.keys(finalTextContent).filter(k => k.includes('caption')).length,
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

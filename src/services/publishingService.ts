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
        
        console.log('📊 Dev changes to publish:', {
          textKeys: Object.keys(devChanges.textContent).length,
          imageKeys: Object.keys(devChanges.imageReplacements).length,
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

        // Process images using Vercel Blob
        const { publishedImageMappings, oldImagesToCleanup, failedUploads } = await ImageProcessor.processImages(
          devChanges.imageReplacements,
          oldImageReplacements,
          projectId
        );

        // COMPLETELY SEPARATE CAPTION SYSTEM - prevent ALL conflicts
        const baseTextContent = { ...currentPublishedText };
        const devTextContent = { ...devChanges.textContent };
        
        // Apply dev changes first (these are actual text edits)
        Object.keys(devTextContent).forEach(key => {
          baseTextContent[key] = devTextContent[key];
        });
        
        // Apply image captions SEPARATELY - they use img_caption_ prefix so NO conflicts possible
        Object.keys(imageCaptions).forEach(captionKey => {
          // ONLY add if it starts with img_caption_ to ensure complete separation
          if (captionKey.startsWith('img_caption_')) {
            baseTextContent[captionKey] = imageCaptions[captionKey];
            console.log('✅ Added isolated image caption:', captionKey, imageCaptions[captionKey]);
          }
        });

        // REMOVE any old caption_ keys to prevent duplicates
        Object.keys(baseTextContent).forEach(key => {
          if (key.startsWith('caption_') && !key.startsWith('img_caption_')) {
            delete baseTextContent[key];
            console.log('🗑️ Removed old caption key:', key);
          }
        });

        const finalTextContent = baseTextContent;

        console.log('📝 FINAL Text content merge (ISOLATED IMAGE CAPTIONS):', {
          publishedCount: Object.keys(currentPublishedText).length,
          devChangesCount: Object.keys(devChanges.textContent).length,
          imageCaptionsCount: Object.keys(imageCaptions).length,
          finalCount: Object.keys(finalTextContent).length,
          finalKeys: Object.keys(finalTextContent).slice(0, 10) // Show sample
        });

        // Process content blocks - dev changes win
        const processedContentBlocks = await ImageProcessor.processContentBlocks(devChanges.contentBlocks, projectId);
        const finalContentBlocks = {
          ...(currentPublishedData?.content_blocks || {}),
          ...processedContentBlocks
        };

        // Final validation for images
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

        console.log('✅ FINAL data for publishing (VERCEL BLOB STORAGE):', {
          imageCount: Object.keys(finalImageReplacements).length,
          textCount: Object.keys(finalTextContent).length,
          contentBlockCount: Object.keys(finalContentBlocks).length,
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
        DOMUpdater.applyAllChangesToDOM(finalImageReplacements, finalTextContent, finalContentBlocks, originalPath);

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

        console.log('✅ Project published successfully (VERCEL BLOB STORAGE):', {
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

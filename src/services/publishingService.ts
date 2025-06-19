
import { supabase } from '@/integrations/supabase/client';
import { ImageStorageService } from './imageStorage';
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

        // Process images
        const { publishedImageMappings, oldImagesToCleanup, failedUploads } = await ImageProcessor.processImages(
          changes.imageReplacements,
          oldImageReplacements,
          projectId
        );

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
        const processedContentBlocks = await ImageProcessor.processContentBlocks(changes.contentBlocks, projectId);

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

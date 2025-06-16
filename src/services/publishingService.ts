
import { supabase } from '@/integrations/supabase/client';
import { ImageStorageService } from './imageStorage';
import { fetchChangesFromDatabase, clearChangesFromDatabase } from '@/hooks/database/operations';
import { processChangesData } from '@/hooks/database/dataProcessor';

export class PublishingService {
  static async publishProject(projectId: string): Promise<boolean> {
    try {
      console.log('🚀 Starting project publishing for:', projectId);
      
      // Get all dev mode changes using direct database operations
      const rawChanges = await fetchChangesFromDatabase(projectId);
      const changes = processChangesData(rawChanges);
      
      console.log('📊 Publishing changes:', {
        textKeys: Object.keys(changes.textContent).length,
        imageKeys: Object.keys(changes.imageReplacements).length,
        contentBlockKeys: Object.keys(changes.contentBlocks).length
      });

      // Step 1: Handle image replacements by uploading to permanent storage
      const publishedImageMappings: Record<string, string> = {};
      
      for (const [originalSrc, newSrc] of Object.entries(changes.imageReplacements)) {
        if (newSrc.startsWith('data:')) {
          // Convert data URL to blob and upload
          const blob = await fetch(newSrc).then(r => r.blob());
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
      }

      // Step 2: Store published state in the published_projects table
      const publishedData = {
        project_id: projectId,
        text_content: changes.textContent as any, // Cast to Json type
        image_replacements: publishedImageMappings as any, // Cast to Json type
        content_blocks: changes.contentBlocks as any, // Cast to Json type
        published_at: new Date().toISOString()
      };

      const { error: publishError } = await supabase
        .from('published_projects')
        .upsert(publishedData, {
          onConflict: 'project_id'
        });

      if (publishError) {
        console.error('❌ Error storing published data:', publishError);
        return false;
      }

      // Step 3: Apply changes to the live DOM immediately
      this.applyChangesToDOM(publishedImageMappings, changes.textContent, changes.contentBlocks);

      // Step 4: Store in localStorage as fallback
      localStorage.setItem(`published_${projectId}`, JSON.stringify(publishedData));

      // Step 5: Clean up dev mode changes
      await clearChangesFromDatabase(projectId);

      // Step 6: Clean up old images
      await ImageStorageService.cleanupProjectImages(projectId, Object.values(publishedImageMappings));

      console.log('✅ Project published successfully');
      return true;
    } catch (error) {
      console.error('❌ Error publishing project:', error);
      return false;
    }
  }

  private static applyChangesToDOM(
    imageReplacements: Record<string, string>,
    textContent: Record<string, string>,
    contentBlocks: Record<string, any[]>
  ) {
    console.log('🎨 Applying changes to DOM');

    // Apply image changes
    Object.entries(imageReplacements).forEach(([oldSrc, newSrc]) => {
      document.querySelectorAll(`img[src="${oldSrc}"]`).forEach((img) => {
        (img as HTMLImageElement).src = newSrc;
        console.log('🖼️ Updated image in DOM:', oldSrc, '->', newSrc);
      });
    });

    // Dispatch events for text and content block updates
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

    // Force a complete refresh
    window.dispatchEvent(new CustomEvent('projectDataUpdated', {
      detail: { 
        published: true, 
        immediate: true,
        timestamp: Date.now()
      }
    }));
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
        console.log('📖 Loaded published data from database');
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

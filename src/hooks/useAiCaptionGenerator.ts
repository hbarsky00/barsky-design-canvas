
import { useCallback } from 'react';

export const useAiCaptionGenerator = () => {
  const generateAiCaption = useCallback(async (imageSrc: string): Promise<string> => {
    try {
      console.log('🤖 useAiCaptionGenerator: Generating AI caption for new image:', imageSrc.substring(0, 30) + '...');
      
      const response = await fetch('/functions/v1/generate-image-caption', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({ 
          imageSrc,
          contextType: 'project'
        }),
      });

      if (!response.ok) {
        throw new Error(`AI caption generation failed: ${response.status}`);
      }

      const data = await response.json();
      const caption = data.caption || 'Professional project showcase demonstrating innovative solutions and user-centered design';
      
      console.log('✅ useAiCaptionGenerator: AI caption generated:', caption.substring(0, 50) + '...');
      return caption;
    } catch (error) {
      console.warn('⚠️ useAiCaptionGenerator: AI caption generation failed, using fallback:', error);
      return 'Professional project showcase demonstrating innovative solutions and user-centered design';
    }
  }, []);

  return {
    generateAiCaption
  };
};

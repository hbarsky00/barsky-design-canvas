
export const useOpenAiCaptions = () => {
  const generateProjectCaptions = async (
    images: string[],
    projectId: string,
    onProgress?: (imageSrc: string, caption: string) => void
  ): Promise<Record<string, string>> => {
    // Mock implementation for now
    const captions: Record<string, string> = {};
    
    for (const image of images) {
      const caption = `AI-generated caption for ${image}`;
      captions[image] = caption;
      
      if (onProgress) {
        onProgress(image, caption);
      }
    }
    
    return captions;
  };

  return {
    generateProjectCaptions
  };
};

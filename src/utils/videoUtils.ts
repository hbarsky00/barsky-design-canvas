
export const getEmbedUrl = (url: string): string => {
  // Handle YouTube Shorts
  const shortsMatch = url.match(/shorts\/([^?]+)/);
  if (shortsMatch) {
    return `https://www.youtube.com/embed/${shortsMatch[1]}`;
  }
  
  // Handle regular YouTube URLs
  const regularMatch = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/)([^?&]+)/);
  if (regularMatch) {
    return `https://www.youtube.com/embed/${regularMatch[1]}`;
  }
  
  return url;
};

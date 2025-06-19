
export interface PublishedData {
  project_id: string;
  text_content: Record<string, any>;
  image_replacements: Record<string, any>;
  content_blocks: Record<string, any>;
  published_at: string;
}

export interface ProcessingResults {
  publishedImageMappings: Record<string, string>;
  oldImagesToCleanup: string[];
  failedUploads: string[];
  processedContentBlocks: Record<string, any[]>;
}

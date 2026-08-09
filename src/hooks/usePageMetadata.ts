// These hooks used to read page_metadata and blog_posts from Supabase to
// override the metadata built from src/data. Neither table exists on the
// current project, so every render fired a request that came back PGRST205 and
// then fell through to the local data — which is what has actually been
// rendering the site for a while now.
//
// Kept as hooks rather than deleted outright because BlogPostPage and BlogPost
// both call useBlogPostMetadata and branch on `loading`. They now resolve
// immediately with no metadata, which is exactly what the failed request did,
// minus the round trip and the console noise.
//
// If a CMS lands later, this is the seam to restore.

interface PageMetadata {
  title: string;
  description: string;
  image?: string;
}

interface BlogPostMetadata {
  title: string;
  excerpt: string;
  featuredImage?: string;
  author: string;
  publishedDate: string;
  tags: string[];
}

export const usePageMetadata = (_path: string) => {
  return { metadata: null as PageMetadata | null, loading: false };
};

export const useBlogPostMetadata = (_slug: string) => {
  return { metadata: null as BlogPostMetadata | null, loading: false };
};

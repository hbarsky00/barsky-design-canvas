import { useState, useEffect } from 'react';

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
  // The Supabase page_metadata table went with the Lovable backend. Nothing on
  // the site reads this hook any more; it stays as a null source so the few
  // legacy imports keep type-checking.
  return { metadata: null as PageMetadata | null, loading: false };
};

export const useBlogPostMetadata = (_slug: string) => {
  // The Supabase blog_posts table went with the Lovable backend; posts live in
  // src/data/blogData.ts, which every caller already falls back to.
  return { metadata: null as BlogPostMetadata | null, loading: false };
};
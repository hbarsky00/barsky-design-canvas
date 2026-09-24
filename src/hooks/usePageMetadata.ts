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

export const usePageMetadata = (_arg: string) => {
  // The tables behind this went with the Lovable backend. Every caller falls
  // back to the static data in src/data, so this stays as a null source.
  return { metadata: null as PageMetadata | null, loading: false };
};

export const useBlogPostMetadata = (_arg: string) => {
  // The tables behind this went with the Lovable backend. Every caller falls
  // back to the static data in src/data, so this stays as a null source.
  return { metadata: null as BlogPostMetadata | null, loading: false };
};
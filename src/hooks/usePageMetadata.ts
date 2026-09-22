import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

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

export const usePageMetadata = (path: string) => {
  const [metadata, setMetadata] = useState<PageMetadata | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const { data, error } = await supabase
          .from('page_metadata')
          .select('*')
          .eq('path', path)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching page metadata:', error);
        } else if (data) {
          setMetadata({
            title: data.seo_title || '',
            description: data.seo_description || '',
            image: data.featured_image || undefined
          });
        }
      } catch (error) {
        console.error('Error fetching page metadata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [path]);

  return { metadata, loading };
};

export const useBlogPostMetadata = (_slug: string) => {
  // The Supabase blog_posts table went with the Lovable backend; posts live in
  // src/data/blogData.ts, which every caller already falls back to.
  return { metadata: null as BlogPostMetadata | null, loading: false };
};
import { supabase } from '@/integrations/supabase/client';

export type SeoMetaRecord = {
  id: string;
  slug: string;
  path_type: 'page' | 'project' | 'post';
  title: string;
  description: string;
  canonical_url?: string;
  og_image_url?: string;
  keywords?: string[];
  updated_at: string;
  created_at: string;
};

/**
 * Fetch SEO metadata for a specific slug
 */
export async function getSeoBySlug(slug: string): Promise<SeoMetaRecord | null> {
  const { data, error } = await supabase
    .from('seo_meta')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  
  if (error) {
    console.error('❌ Error fetching SEO meta:', error);
    return null;
  }
  
  return data as SeoMetaRecord | null;
}

/**
 * Fetch all SEO slugs with metadata for sitemap generation
 */
export async function getAllSeoSlugs(): Promise<Array<{
  slug: string;
  path_type: string;
  updated_at: string;
}>> {
  const { data, error } = await supabase
    .from('seo_meta')
    .select('slug, path_type, updated_at')
    .order('updated_at', { ascending: false });
  
  if (error) {
    console.error('❌ Error fetching SEO slugs:', error);
    return [];
  }
  
  return data || [];
}

/**
 * Fetch all project slugs
 */
export async function getAllProjectSlugs(): Promise<string[]> {
  const { data } = await supabase
    .from('seo_meta')
    .select('slug')
    .eq('path_type', 'project');
  
  return (data || []).map(d => d.slug);
}

/**
 * Fetch all blog post slugs
 */
export async function getAllBlogSlugs(): Promise<string[]> {
  const { data } = await supabase
    .from('seo_meta')
    .select('slug')
    .eq('path_type', 'post');
  
  return (data || []).map(d => d.slug);
}

/**
 * Fetch all SEO records (admin only, for management UI)
 */
export async function getAllSeoRecords(): Promise<SeoMetaRecord[]> {
  const { data, error } = await supabase
    .from('seo_meta')
    .select('*')
    .order('updated_at', { ascending: false });
  
  if (error) {
    console.error('❌ Error fetching all SEO records:', error);
    return [];
  }
  
  return (data || []) as SeoMetaRecord[];
}

/**
 * Upsert SEO metadata (admin only)
 */
export async function upsertSeoMeta(seo: Omit<SeoMetaRecord, 'id' | 'created_at' | 'updated_at'>): Promise<boolean> {
  const { error } = await supabase
    .from('seo_meta')
    .upsert(seo, { onConflict: 'slug' });
  
  if (error) {
    console.error('❌ Error upserting SEO meta:', error);
    return false;
  }
  
  return true;
}

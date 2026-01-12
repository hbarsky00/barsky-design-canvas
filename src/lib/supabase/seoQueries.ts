import { supabase } from '@/integrations/supabase/client';

export type SeoMetaRecord = {
  id: string;
  page_path: string;
  slug?: string;
  path_type?: string;
  title?: string;
  description?: string;
  canonical_url?: string;
  og_image?: string;
  og_type?: string;
  keywords?: string[];
  updated_at: string;
  created_at: string;
};

/**
 * Fetch SEO metadata for a specific page path
 */
export async function getSeoByPath(pagePath: string): Promise<SeoMetaRecord | null> {
  const { data, error } = await supabase
    .from('seo_meta')
    .select('*')
    .eq('page_path', pagePath)
    .maybeSingle();
  
  if (error) {
    console.error('❌ Error fetching SEO meta:', error);
    return null;
  }
  
  return data as SeoMetaRecord | null;
}

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
    console.error('❌ Error fetching SEO meta by slug:', error);
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
  
  return (data || []).filter(d => d.slug).map(d => ({
    slug: d.slug || '',
    path_type: d.path_type || 'page',
    updated_at: d.updated_at
  }));
}

/**
 * Fetch all project slugs
 */
export async function getAllProjectSlugs(): Promise<string[]> {
  const { data } = await supabase
    .from('seo_meta')
    .select('slug')
    .eq('path_type', 'project');
  
  return (data || []).filter(d => d.slug).map(d => d.slug as string);
}

/**
 * Fetch all blog post slugs
 */
export async function getAllBlogSlugs(): Promise<string[]> {
  const { data } = await supabase
    .from('seo_meta')
    .select('slug')
    .eq('path_type', 'post');
  
  return (data || []).filter(d => d.slug).map(d => d.slug as string);
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
    .upsert({
      page_path: seo.page_path,
      slug: seo.slug,
      path_type: seo.path_type,
      title: seo.title,
      description: seo.description,
      canonical_url: seo.canonical_url,
      og_image: seo.og_image,
      og_type: seo.og_type,
      keywords: seo.keywords,
      updated_at: new Date().toISOString()
    }, { onConflict: 'page_path' });
  
  if (error) {
    console.error('❌ Error upserting SEO meta:', error);
    return false;
  }
  
  return true;
}
-- Add missing columns to seo_meta table
ALTER TABLE public.seo_meta ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE public.seo_meta ADD COLUMN IF NOT EXISTS path_type TEXT DEFAULT 'page';

-- Create unique constraint on slug
CREATE UNIQUE INDEX IF NOT EXISTS seo_meta_slug_unique ON public.seo_meta(slug) WHERE slug IS NOT NULL;

-- Add missing columns to editable_content table
ALTER TABLE public.editable_content ADD COLUMN IF NOT EXISTS page_path TEXT DEFAULT '';
ALTER TABLE public.editable_content ADD COLUMN IF NOT EXISTS section_name TEXT DEFAULT '';
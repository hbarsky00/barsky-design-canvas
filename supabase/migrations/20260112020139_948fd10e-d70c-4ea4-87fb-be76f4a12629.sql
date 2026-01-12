-- Create dev_mode_changes table
CREATE TABLE public.dev_mode_changes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id TEXT NOT NULL,
  change_type TEXT NOT NULL,
  change_key TEXT NOT NULL,
  change_value TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(project_id, change_type, change_key)
);

-- Create editable_content table
CREATE TABLE public.editable_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content_key TEXT NOT NULL UNIQUE,
  content_html TEXT,
  content_json JSONB,
  last_edited_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create page_metadata table
CREATE TABLE public.page_metadata (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  path TEXT NOT NULL UNIQUE,
  seo_title TEXT,
  seo_description TEXT,
  featured_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  featured_image TEXT,
  author TEXT,
  published_date TIMESTAMP WITH TIME ZONE,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create leads table
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  project_type TEXT,
  budget_range TEXT,
  project_description TEXT,
  phone TEXT,
  website TEXT,
  lead_source TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create seo_meta table
CREATE TABLE public.seo_meta (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL UNIQUE,
  title TEXT,
  description TEXT,
  og_image TEXT,
  og_type TEXT DEFAULT 'website',
  canonical_url TEXT,
  keywords TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create published_projects table
CREATE TABLE public.published_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id TEXT NOT NULL UNIQUE,
  text_content JSONB,
  image_replacements JSONB,
  content_blocks JSONB,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.dev_mode_changes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.editable_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_meta ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.published_projects ENABLE ROW LEVEL SECURITY;

-- Create public read policies for content tables
CREATE POLICY "Public read access for dev_mode_changes" ON public.dev_mode_changes FOR SELECT USING (true);
CREATE POLICY "Public insert access for dev_mode_changes" ON public.dev_mode_changes FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access for dev_mode_changes" ON public.dev_mode_changes FOR UPDATE USING (true);
CREATE POLICY "Public delete access for dev_mode_changes" ON public.dev_mode_changes FOR DELETE USING (true);

CREATE POLICY "Public read access for editable_content" ON public.editable_content FOR SELECT USING (true);
CREATE POLICY "Public insert access for editable_content" ON public.editable_content FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access for editable_content" ON public.editable_content FOR UPDATE USING (true);

CREATE POLICY "Public read access for page_metadata" ON public.page_metadata FOR SELECT USING (true);

CREATE POLICY "Public read access for blog_posts" ON public.blog_posts FOR SELECT USING (true);

CREATE POLICY "Public insert access for leads" ON public.leads FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read access for seo_meta" ON public.seo_meta FOR SELECT USING (true);
CREATE POLICY "Public insert access for seo_meta" ON public.seo_meta FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access for seo_meta" ON public.seo_meta FOR UPDATE USING (true);

CREATE POLICY "Public read access for published_projects" ON public.published_projects FOR SELECT USING (true);
CREATE POLICY "Public insert access for published_projects" ON public.published_projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access for published_projects" ON public.published_projects FOR UPDATE USING (true);
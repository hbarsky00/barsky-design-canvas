
-- Create a table for published projects
CREATE TABLE public.published_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id TEXT NOT NULL UNIQUE,
  text_content JSONB NOT NULL DEFAULT '{}',
  image_replacements JSONB NOT NULL DEFAULT '{}',
  content_blocks JSONB NOT NULL DEFAULT '{}',
  published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create storage bucket for published images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'published-images',
  'published-images',
  true,
  52428800,
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
);

-- Create storage policy for published images bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'published-images');

CREATE POLICY "Public Upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'published-images');

CREATE POLICY "Public Update"
ON storage.objects FOR UPDATE
USING (bucket_id = 'published-images');

CREATE POLICY "Public Delete"
ON storage.objects FOR DELETE
USING (bucket_id = 'published-images');

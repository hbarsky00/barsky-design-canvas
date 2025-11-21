-- Fix storage bucket security: Remove public write access and restrict to admins only

-- Remove dangerous public write policies
DROP POLICY IF EXISTS "Public Upload" ON storage.objects;
DROP POLICY IF EXISTS "Public Update" ON storage.objects;
DROP POLICY IF EXISTS "Public Delete" ON storage.objects;

-- Add admin-only write policies for published-images bucket
CREATE POLICY "Admins can upload to published-images" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'published-images' AND public.is_admin());

CREATE POLICY "Admins can update published-images" ON storage.objects
FOR UPDATE TO authenticated
USING (bucket_id = 'published-images' AND public.is_admin());

CREATE POLICY "Admins can delete from published-images" ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'published-images' AND public.is_admin());

-- Add admin-only write policies for media bucket
CREATE POLICY "Admins can upload to media" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'media' AND public.is_admin());

CREATE POLICY "Admins can update media" ON storage.objects
FOR UPDATE TO authenticated
USING (bucket_id = 'media' AND public.is_admin());

CREATE POLICY "Admins can delete from media" ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'media' AND public.is_admin());

-- Ensure public read access remains for published-images (recreate if needed)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Public can read published-images'
  ) THEN
    CREATE POLICY "Public can read published-images" ON storage.objects
    FOR SELECT USING (bucket_id = 'published-images');
  END IF;
END $$;

-- Ensure public read access remains for media (recreate if needed)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Public can read media'
  ) THEN
    CREATE POLICY "Public can read media" ON storage.objects
    FOR SELECT USING (bucket_id = 'media');
  END IF;
END $$;
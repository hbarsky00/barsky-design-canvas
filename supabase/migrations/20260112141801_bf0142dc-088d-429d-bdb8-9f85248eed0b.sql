-- Drop the overly permissive public INSERT and UPDATE policies on seo_meta
DROP POLICY IF EXISTS "Public insert access for seo_meta" ON public.seo_meta;
DROP POLICY IF EXISTS "Public update access for seo_meta" ON public.seo_meta;

-- Create restrictive policies that only allow service role to write
CREATE POLICY "Service role can insert seo_meta"
ON public.seo_meta
FOR INSERT
WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can update seo_meta"
ON public.seo_meta
FOR UPDATE
USING (auth.role() = 'service_role');
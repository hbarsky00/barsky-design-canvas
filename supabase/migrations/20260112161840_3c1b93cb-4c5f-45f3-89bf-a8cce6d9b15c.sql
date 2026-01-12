-- Fix the SECURITY DEFINER view warning by explicitly setting SECURITY INVOKER
DROP VIEW IF EXISTS public.editable_content_public;

CREATE VIEW public.editable_content_public 
WITH (security_invoker = true) AS
SELECT 
  id,
  content_key,
  content_html,
  content_json,
  page_path,
  section_name,
  created_at,
  updated_at
FROM public.editable_content;

-- Re-grant public access to the view
GRANT SELECT ON public.editable_content_public TO anon, authenticated;
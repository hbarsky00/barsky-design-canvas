-- Create a public view that excludes the sensitive last_edited_by column
CREATE VIEW public.editable_content_public AS
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

-- Grant public access to the view
GRANT SELECT ON public.editable_content_public TO anon, authenticated;

-- Update RLS on the base table to deny public SELECT (service role will still have access)
DROP POLICY IF EXISTS "Public read access for editable_content" ON public.editable_content;

-- Create a restrictive policy that only allows service role to read the base table
CREATE POLICY "Service role read access for editable_content"
ON public.editable_content
FOR SELECT
USING (auth.role() = 'service_role');
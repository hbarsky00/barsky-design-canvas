-- Drop the problematic view
DROP VIEW IF EXISTS public.editable_content_public;

-- Create a secure function to fetch editable content without exposing last_edited_by
CREATE OR REPLACE FUNCTION public.get_editable_content(p_content_key text DEFAULT NULL)
RETURNS TABLE (
  id uuid,
  content_key text,
  content_html text,
  content_json jsonb,
  page_path text,
  section_name text,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    id,
    content_key,
    content_html,
    content_json,
    page_path,
    section_name,
    created_at,
    updated_at
  FROM public.editable_content
  WHERE (p_content_key IS NULL OR content_key = p_content_key)
  ORDER BY updated_at DESC;
$$;

-- Grant execute to public users
GRANT EXECUTE ON FUNCTION public.get_editable_content(text) TO anon, authenticated;
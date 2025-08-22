-- Tighten RLS for project_content: restrict all operations to admins only

-- Ensure RLS is enabled (idempotent)
ALTER TABLE public.project_content ENABLE ROW LEVEL SECURITY;

-- Drop overly permissive policies if they exist
DROP POLICY IF EXISTS "Anyone can view project content" ON public.project_content;
DROP POLICY IF EXISTS "Anyone can insert project content" ON public.project_content;
DROP POLICY IF EXISTS "Anyone can update project content" ON public.project_content;
DROP POLICY IF EXISTS "Anyone can delete project content" ON public.project_content;

-- Create admin-only policies
CREATE POLICY "Admins can view project content"
ON public.project_content
FOR SELECT
USING (is_admin());

CREATE POLICY "Admins can insert project content"
ON public.project_content
FOR INSERT
WITH CHECK (is_admin());

CREATE POLICY "Admins can update project content"
ON public.project_content
FOR UPDATE
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Admins can delete project content"
ON public.project_content
FOR DELETE
USING (is_admin());
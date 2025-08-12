-- Lock down dev_mode_changes and published_projects RLS

-- DEV MODE CHANGES: remove overly permissive policy
DROP POLICY IF EXISTS "Allow all operations on dev_mode_changes" ON public.dev_mode_changes;

-- Ensure RLS is enabled (idempotent)
ALTER TABLE public.dev_mode_changes ENABLE ROW LEVEL SECURITY;

-- Allow public read-only
CREATE POLICY IF NOT EXISTS "Public can view dev changes"
ON public.dev_mode_changes
FOR SELECT
USING (true);

-- Restrict modifications to admins
CREATE POLICY IF NOT EXISTS "Admins can insert dev changes"
ON public.dev_mode_changes
FOR INSERT
WITH CHECK (is_admin());

CREATE POLICY IF NOT EXISTS "Admins can update dev changes"
ON public.dev_mode_changes
FOR UPDATE
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY IF NOT EXISTS "Admins can delete dev changes"
ON public.dev_mode_changes
FOR DELETE
USING (is_admin());


-- PUBLISHED PROJECTS: drop permissive write policies
DROP POLICY IF EXISTS "Anyone can delete published projects" ON public.published_projects;
DROP POLICY IF EXISTS "Anyone can publish projects" ON public.published_projects;
DROP POLICY IF EXISTS "Anyone can update published projects" ON public.published_projects;

-- Ensure RLS is enabled (idempotent)
ALTER TABLE public.published_projects ENABLE ROW LEVEL SECURITY;

-- Keep public read-only access
CREATE POLICY IF NOT EXISTS "Public can view published projects"
ON public.published_projects
FOR SELECT
USING (true);

-- Restrict writes to admins
CREATE POLICY IF NOT EXISTS "Admins can publish projects"
ON public.published_projects
FOR INSERT
WITH CHECK (is_admin());

CREATE POLICY IF NOT EXISTS "Admins can update published projects"
ON public.published_projects
FOR UPDATE
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY IF NOT EXISTS "Admins can delete published projects"
ON public.published_projects
FOR DELETE
USING (is_admin());
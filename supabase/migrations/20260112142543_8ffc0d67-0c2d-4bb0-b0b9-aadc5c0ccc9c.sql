-- Drop the overly permissive public INSERT and UPDATE policies on published_projects
DROP POLICY IF EXISTS "Public insert access for published_projects" ON public.published_projects;
DROP POLICY IF EXISTS "Public update access for published_projects" ON public.published_projects;

-- Create restrictive policies that only allow service role to write
CREATE POLICY "Service role can insert published_projects"
ON public.published_projects
FOR INSERT
WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can update published_projects"
ON public.published_projects
FOR UPDATE
USING (auth.role() = 'service_role');
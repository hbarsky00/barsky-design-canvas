
-- Drop the existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can publish projects" ON public.published_projects;
DROP POLICY IF EXISTS "Authenticated users can update published projects" ON public.published_projects;
DROP POLICY IF EXISTS "Authenticated users can delete published projects" ON public.published_projects;

-- Create more permissive policies that allow anyone to write (since this is a personal portfolio)
CREATE POLICY "Anyone can publish projects"
ON public.published_projects
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Anyone can update published projects"
ON public.published_projects
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

CREATE POLICY "Anyone can delete published projects"
ON public.published_projects
FOR DELETE
TO public
USING (true);

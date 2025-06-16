
-- Enable Row Level Security on the published_projects table
ALTER TABLE public.published_projects ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to published projects
CREATE POLICY "Public can view published projects"
ON public.published_projects
FOR SELECT
TO public
USING (true);

-- Create policy for authenticated users to insert published projects
CREATE POLICY "Authenticated users can publish projects"
ON public.published_projects
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Create policy for authenticated users to update their published projects
CREATE POLICY "Authenticated users can update published projects"
ON public.published_projects
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Create policy for authenticated users to delete published projects
CREATE POLICY "Authenticated users can delete published projects"
ON public.published_projects
FOR DELETE
TO authenticated
USING (true);

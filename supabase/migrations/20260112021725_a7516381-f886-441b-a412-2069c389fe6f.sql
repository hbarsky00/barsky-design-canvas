-- Remove public write policies from editable_content
DROP POLICY IF EXISTS "Public insert access for editable_content" ON public.editable_content;
DROP POLICY IF EXISTS "Public update access for editable_content" ON public.editable_content;

-- Keep public read access for displaying content on the site
-- Add service role only policy for write operations
CREATE POLICY "Service role can manage editable_content" 
ON public.editable_content 
FOR ALL 
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');
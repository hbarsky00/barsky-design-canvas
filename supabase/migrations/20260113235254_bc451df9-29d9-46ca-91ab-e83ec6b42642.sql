-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Service role can manage blog_posts" ON public.blog_posts;

-- Create a properly secured service role policy
CREATE POLICY "Service role can manage blog_posts" 
ON public.blog_posts 
FOR ALL 
TO service_role 
USING (auth.role() = 'service_role'::text) 
WITH CHECK (auth.role() = 'service_role'::text);
-- Add service role management policy for blog_posts
CREATE POLICY "Service role can manage blog_posts" 
ON public.blog_posts 
FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);
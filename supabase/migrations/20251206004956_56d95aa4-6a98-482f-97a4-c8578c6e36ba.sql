-- Add write protection policies for blog_posts table
-- Only admins can insert blog posts
CREATE POLICY "Admins can insert blog posts"
ON public.blog_posts FOR INSERT
TO authenticated
WITH CHECK (is_admin());

-- Only admins can update blog posts
CREATE POLICY "Admins can update blog posts"
ON public.blog_posts FOR UPDATE
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

-- Only admins can delete blog posts
CREATE POLICY "Admins can delete blog posts"
ON public.blog_posts FOR DELETE
TO authenticated
USING (is_admin());

-- Add write protection policies for page_metadata table
CREATE POLICY "Admins can insert page metadata"
ON public.page_metadata FOR INSERT
TO authenticated
WITH CHECK (is_admin());

CREATE POLICY "Admins can update page metadata"
ON public.page_metadata FOR UPDATE
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Admins can delete page metadata"
ON public.page_metadata FOR DELETE
TO authenticated
USING (is_admin());
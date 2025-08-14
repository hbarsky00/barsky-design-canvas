
-- Add RLS policies to user_roles table to prevent privilege escalation
-- Only admins can create user roles
CREATE POLICY "Only admins can create user roles" 
  ON public.user_roles 
  FOR INSERT 
  WITH CHECK (is_admin());

-- Only admins can modify user roles
CREATE POLICY "Only admins can update user roles" 
  ON public.user_roles 
  FOR UPDATE 
  USING (is_admin()) 
  WITH CHECK (is_admin());

-- Only admins can delete user roles
CREATE POLICY "Only admins can delete user roles" 
  ON public.user_roles 
  FOR DELETE 
  USING (is_admin());

-- Insert the first admin user (replace with your actual user ID)
-- You'll need to sign up first, then get your user ID from the auth.users table
-- INSERT INTO public.user_roles (user_id, role) 
-- VALUES ('your-user-id-here', 'admin');

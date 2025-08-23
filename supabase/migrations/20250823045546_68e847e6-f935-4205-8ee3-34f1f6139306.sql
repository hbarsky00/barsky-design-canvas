-- Update RLS policies to require authentication for admin operations

-- First, ensure the profiles table has proper policies
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Add missing policies for content editing operations
DROP POLICY IF EXISTS "Admins can view project content" ON public.project_content;
CREATE POLICY "Admins can view project content" 
ON public.project_content 
FOR SELECT 
USING (is_admin());

DROP POLICY IF EXISTS "Admins can insert project content" ON public.project_content;
CREATE POLICY "Admins can insert project content" 
ON public.project_content 
FOR INSERT 
WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins can update project content" ON public.project_content;
CREATE POLICY "Admins can update project content" 
ON public.project_content 
FOR UPDATE 
USING (is_admin()) 
WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins can delete project content" ON public.project_content;
CREATE POLICY "Admins can delete project content" 
ON public.project_content 
FOR DELETE 
USING (is_admin());

-- Add security audit trigger to leads table for monitoring
DROP TRIGGER IF EXISTS leads_audit_trigger ON public.leads;
CREATE TRIGGER leads_audit_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.audit_lead_access();

-- Add updated_at trigger to user_roles table
DROP TRIGGER IF EXISTS user_roles_updated_at ON public.user_roles;
CREATE TRIGGER user_roles_updated_at
  BEFORE UPDATE ON public.user_roles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Add updated_at trigger to profiles table  
DROP TRIGGER IF EXISTS profiles_updated_at ON public.profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
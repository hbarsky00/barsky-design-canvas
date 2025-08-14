-- Fix RLS security issue for leads table
-- Drop existing permissive policies and create restrictive ones

-- Drop the existing SELECT policy
DROP POLICY IF EXISTS "Admin can view leads" ON public.leads;

-- Create a restrictive policy that explicitly denies non-admin access
CREATE POLICY "Only admins can view leads" 
ON public.leads 
FOR SELECT 
USING (
  -- Only allow if user is authenticated AND is an admin
  auth.role() = 'authenticated' AND is_admin()
);

-- Also ensure that anonymous users cannot access leads at all
CREATE POLICY "Deny anonymous access to leads" 
ON public.leads 
FOR SELECT 
TO anon 
USING (false);

-- Update the INSERT policy to be more specific about who can create leads
DROP POLICY IF EXISTS "Anyone can create leads" ON public.leads;

-- Allow both authenticated and anonymous users to create leads (for contact forms)
-- but ensure the data is properly validated
CREATE POLICY "Public can create leads" 
ON public.leads 
FOR INSERT 
WITH CHECK (
  -- Basic validation: ensure required fields are present
  name IS NOT NULL AND 
  email IS NOT NULL AND 
  email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
);
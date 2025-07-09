-- Phase 1: Critical RLS Policy Redesign
-- Fix overly permissive policies that expose sensitive data

-- Drop dangerous public policies on leads table
DROP POLICY IF EXISTS "Public can update leads" ON public.leads;
DROP POLICY IF EXISTS "Public can view all leads" ON public.leads;

-- Drop dangerous public policy on lead_interactions table  
DROP POLICY IF EXISTS "Public can view lead interactions" ON public.lead_interactions;

-- Create admin-only policies for leads management
-- Note: This will require authentication to be implemented later
-- For now, we're securing the data by removing public access

-- Create a function to check if user is admin (placeholder for future auth)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- For now, return false to secure the data
  -- This will be updated when authentication is implemented
  RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create secure policies for leads
CREATE POLICY "Admin can view leads"
ON public.leads
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admin can update leads"  
ON public.leads
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admin can delete leads"
ON public.leads  
FOR DELETE
TO authenticated
USING (public.is_admin());

-- Create secure policies for lead_interactions
CREATE POLICY "Admin can view lead interactions"
ON public.lead_interactions
FOR SELECT  
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admin can update lead interactions"
ON public.lead_interactions
FOR UPDATE
TO authenticated  
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admin can delete lead interactions"
ON public.lead_interactions
FOR DELETE
TO authenticated
USING (public.is_admin());

-- Keep the public insert policies for contact forms
-- These are necessary for the website to function
-- "Anyone can create leads" - remains as is
-- "Public can create lead interactions" - remains as is

-- Add comment explaining the security model
COMMENT ON FUNCTION public.is_admin() IS 'Admin check function - currently returns false for security. Will be updated when authentication is implemented.';
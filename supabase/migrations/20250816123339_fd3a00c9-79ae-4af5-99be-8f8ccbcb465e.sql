
-- Fix RLS policy conflicts on leads table
-- First, drop the conflicting policies
DROP POLICY IF EXISTS "Deny anonymous access to leads" ON public.leads;
DROP POLICY IF EXISTS "Public can create leads" ON public.leads;

-- Create a single, clear policy for lead creation that allows anonymous users to create leads
-- but only authenticated admins to read/update/delete them
CREATE POLICY "Anonymous can create leads" 
ON public.leads 
FOR INSERT 
TO anon 
WITH CHECK (
  name IS NOT NULL AND 
  email IS NOT NULL AND 
  email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'::text
);

-- Ensure only admins can view leads (keep existing policy)
-- Policy "Only admins can view leads" already exists and is correct

-- Add audit logging function for security monitoring
CREATE OR REPLACE FUNCTION public.audit_lead_access()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Log any access to leads table for security monitoring
  INSERT INTO public.security_audit_log (
    table_name,
    operation,
    user_id,
    timestamp,
    details
  ) VALUES (
    'leads',
    TG_OP,
    auth.uid(),
    now(),
    json_build_object('lead_id', COALESCE(NEW.id, OLD.id))
  );
  
  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$;

-- Create audit log table for security monitoring
CREATE TABLE IF NOT EXISTS public.security_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name text NOT NULL,
  operation text NOT NULL,
  user_id uuid,
  timestamp timestamp with time zone NOT NULL DEFAULT now(),
  details jsonb
);

-- Enable RLS on audit log table
ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Only admins can view audit logs"
ON public.security_audit_log
FOR SELECT
USING (is_admin());

-- Create trigger for audit logging on leads table
CREATE TRIGGER audit_leads_access
  AFTER INSERT OR UPDATE OR DELETE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.audit_lead_access();

-- Create profiles table for authentication
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (id)
);

-- Enable RLS on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can view and update their own profile
CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id);

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email)
  );
  RETURN new;
END;
$$;

-- Trigger to create profile when user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update the updated_at trigger for profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

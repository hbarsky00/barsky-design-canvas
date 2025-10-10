-- Drop existing policies on profiles table
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

-- Create more restrictive and explicit policies with proper security checks

-- SELECT: Only allow users to view their own profile, explicitly deny others
CREATE POLICY "Users can only view their own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- INSERT: Only allow users to create their own profile
CREATE POLICY "Users can only insert their own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- UPDATE: Only allow users to update their own profile
CREATE POLICY "Users can only update their own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- DELETE: Prevent users from deleting profiles (should be handled by cascade from auth.users)
CREATE POLICY "Prevent manual profile deletion"
ON public.profiles
FOR DELETE
TO authenticated
USING (false);

-- Add a security definer function to safely check if a profile exists without exposing data
CREATE OR REPLACE FUNCTION public.profile_exists(profile_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = profile_id
  );
$$;

-- Add comment documenting the security considerations
COMMENT ON TABLE public.profiles IS 'User profiles table with strict RLS policies. Each user can only access their own profile data. Email addresses are protected from enumeration attacks through explicit USING clauses that filter queries at the database level.';

-- Ensure RLS is enabled (it should be, but let's be explicit)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Force RLS even for table owner (additional security)
ALTER TABLE public.profiles FORCE ROW LEVEL SECURITY;
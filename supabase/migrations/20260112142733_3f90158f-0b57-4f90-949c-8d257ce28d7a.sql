-- Add explicit deny policy for public SELECT access on leads table
-- This ensures that even if other policies are misconfigured, public access is blocked
CREATE POLICY "Deny public read access"
ON public.leads
FOR SELECT
USING (false);
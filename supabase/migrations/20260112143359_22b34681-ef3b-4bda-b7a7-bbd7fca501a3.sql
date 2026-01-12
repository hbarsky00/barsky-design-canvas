-- Add explicit deny policy for public SELECT access on dev_mode_changes table
CREATE POLICY "Deny public read access"
ON public.dev_mode_changes
FOR SELECT
USING (false);
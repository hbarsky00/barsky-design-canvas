-- Remove all public policies from dev_mode_changes
DROP POLICY IF EXISTS "Public read access for dev_mode_changes" ON public.dev_mode_changes;
DROP POLICY IF EXISTS "Public insert access for dev_mode_changes" ON public.dev_mode_changes;
DROP POLICY IF EXISTS "Public update access for dev_mode_changes" ON public.dev_mode_changes;
DROP POLICY IF EXISTS "Public delete access for dev_mode_changes" ON public.dev_mode_changes;

-- Create service role only policy
CREATE POLICY "Service role can manage dev_mode_changes" 
ON public.dev_mode_changes 
FOR ALL 
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');
-- Remove public INSERT policy from leads table
DROP POLICY IF EXISTS "Public insert access for leads" ON public.leads;

-- Create admin-only policies for leads management
CREATE POLICY "Service role can manage leads" 
ON public.leads 
FOR ALL 
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');
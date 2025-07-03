-- Fix the update_updated_at_column function by setting explicit search path for security
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    -- Explicitly set an empty search path for security
    SET search_path = '';
    
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql
   SECURITY DEFINER;

-- Comment explaining the fix
COMMENT ON FUNCTION public.update_updated_at_column() IS 'Trigger to update the updated_at column. Search path explicitly set for security.';
-- Harden access to security_audit_log: ensure RLS is enabled and restrict SELECT to authenticated admins only

-- Enable RLS (idempotent)
ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

-- Replace existing SELECT policy to be explicit about role scope
DROP POLICY IF EXISTS "Only admins can view audit logs" ON public.security_audit_log;

CREATE POLICY "Only admins can view audit logs"
ON public.security_audit_log
FOR SELECT
TO authenticated
USING (is_admin());
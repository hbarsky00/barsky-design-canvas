-- Harden security for sensitive leads table without breaking existing behavior
-- 1) Ensure RLS is enabled and enforced even for table owners
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads FORCE ROW LEVEL SECURITY;

-- 2) Add audit triggers for all write operations on leads (INSERT/UPDATE/DELETE)
--    Uses existing security definer function public.audit_lead_access()
DROP TRIGGER IF EXISTS audit_leads_insert ON public.leads;
DROP TRIGGER IF EXISTS audit_leads_update ON public.leads;
DROP TRIGGER IF EXISTS audit_leads_delete ON public.leads;

CREATE TRIGGER audit_leads_insert
AFTER INSERT ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.audit_lead_access();

CREATE TRIGGER audit_leads_update
AFTER UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.audit_lead_access();

CREATE TRIGGER audit_leads_delete
AFTER DELETE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.audit_lead_access();
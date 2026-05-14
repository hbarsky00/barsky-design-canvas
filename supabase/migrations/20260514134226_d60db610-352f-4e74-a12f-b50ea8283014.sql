REVOKE EXECUTE ON FUNCTION public.get_editable_content(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_editable_content(text) TO service_role;
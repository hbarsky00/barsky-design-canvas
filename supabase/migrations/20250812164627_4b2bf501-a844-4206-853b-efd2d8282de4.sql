
-- 1) Roles: enum + user_roles table (no FK to auth.users)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
    CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
  END IF;
END$$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Optional: allow users to read their own roles (not strictly required for the app)
DROP POLICY IF EXISTS "Users can view their roles" ON public.user_roles;
CREATE POLICY "Users can view their roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- 2) Security helper functions with safe search_path

-- a) has_role: security definer, stable, fixed search path
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$$;

-- b) is_admin: rewritten to use has_role; stable, security definer, fixed search path
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO ''
AS $$
  SELECT public.has_role(auth.uid(), 'admin'::public.app_role);
$$;

-- c) Fix function search_path for update_updated_at_column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    NEW.updated_at = now();
    RETURN NEW;
  ELSE
    RETURN NULL;
  END IF;
END;
$function$;

-- Note: calculate_lead_priority_score already sets a fixed search_path

-- 3) Lock down dev_mode_changes

-- Ensure RLS is enabled (safe if already enabled)
ALTER TABLE public.dev_mode_changes ENABLE ROW LEVEL SECURITY;

-- Drop overly-permissive policy
DROP POLICY IF EXISTS "Allow all operations on dev_mode_changes" ON public.dev_mode_changes;

-- Admin-only policies
DROP POLICY IF EXISTS "Admins can select dev changes" ON public.dev_mode_changes;
CREATE POLICY "Admins can select dev changes"
  ON public.dev_mode_changes
  FOR SELECT
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can insert dev changes" ON public.dev_mode_changes;
CREATE POLICY "Admins can insert dev changes"
  ON public.dev_mode_changes
  FOR INSERT
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can update dev changes" ON public.dev_mode_changes;
CREATE POLICY "Admins can update dev changes"
  ON public.dev_mode_changes
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete dev changes" ON public.dev_mode_changes;
CREATE POLICY "Admins can delete dev changes"
  ON public.dev_mode_changes
  FOR DELETE
  USING (public.is_admin());

-- Helpful index for your existing queries
CREATE INDEX IF NOT EXISTS idx_dev_mode_changes_project
  ON public.dev_mode_changes (project_id, change_type, change_key);

-- 4) Lock down published_projects: public read-only; admin can write

-- Drop permissive policies
DROP POLICY IF EXISTS "Anyone can delete published projects" ON public.published_projects;
DROP POLICY IF EXISTS "Anyone can publish projects" ON public.published_projects;
DROP POLICY IF EXISTS "Anyone can update published projects" ON public.published_projects;
DROP POLICY IF EXISTS "Public can view published projects" ON public.published_projects;

-- Recreate secure policies
CREATE POLICY "Public can view published projects"
  ON public.published_projects
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert published projects"
  ON public.published_projects
  FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update published projects"
  ON public.published_projects
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete published projects"
  ON public.published_projects
  FOR DELETE
  USING (public.is_admin());

-- 5) Tighten lead_interactions: require admin for INSERT (service role still bypasses RLS)
DROP POLICY IF EXISTS "Public can create lead interactions" ON public.lead_interactions;

CREATE POLICY "Admins can create lead interactions"
  ON public.lead_interactions
  FOR INSERT
  WITH CHECK (public.is_admin());

-- (Existing admin-only SELECT/UPDATE/DELETE policies remain)

-- 6) Add protective triggers

-- a) Compute priority_score server-side on leads
DROP TRIGGER IF EXISTS trg_compute_priority_score_on_leads ON public.leads;
CREATE TRIGGER trg_compute_priority_score_on_leads
  BEFORE INSERT OR UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.calculate_lead_priority_score();

-- b) Update updated_at automatically across tables that have the column
-- leads
DROP TRIGGER IF EXISTS trg_set_updated_at_on_leads ON public.leads;
CREATE TRIGGER trg_set_updated_at_on_leads
  BEFORE INSERT OR UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- published_projects
DROP TRIGGER IF EXISTS trg_set_updated_at_on_published_projects ON public.published_projects;
CREATE TRIGGER trg_set_updated_at_on_published_projects
  BEFORE INSERT OR UPDATE ON public.published_projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- dev_mode_changes
DROP TRIGGER IF EXISTS trg_set_updated_at_on_dev_mode_changes ON public.dev_mode_changes;
CREATE TRIGGER trg_set_updated_at_on_dev_mode_changes
  BEFORE INSERT OR UPDATE ON public.dev_mode_changes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- lead_interactions
DROP TRIGGER IF EXISTS trg_set_updated_at_on_lead_interactions ON public.lead_interactions;
CREATE TRIGGER trg_set_updated_at_on_lead_interactions
  BEFORE INSERT OR UPDATE ON public.lead_interactions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- blog_posts
DROP TRIGGER IF EXISTS trg_set_updated_at_on_blog_posts ON public.blog_posts;
CREATE TRIGGER trg_set_updated_at_on_blog_posts
  BEFORE INSERT OR UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- page_metadata
DROP TRIGGER IF EXISTS trg_set_updated_at_on_page_metadata ON public.page_metadata;
CREATE TRIGGER trg_set_updated_at_on_page_metadata
  BEFORE INSERT OR UPDATE ON public.page_metadata
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

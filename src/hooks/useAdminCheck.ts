
import { useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

type AppRole = 'admin' | 'moderator' | 'user';

interface UseAdminCheckResult {
  isLoading: boolean;
  user: User | null;
  session: Session | null;
  roles: AppRole[];
  isAdmin: boolean;
}

export const useAdminCheck = (): UseAdminCheckResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<AppRole[]>([]);

  useEffect(() => {
    // 1) Attach auth listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);

      // Defer supabase calls to avoid deadlocks
      if (newSession?.user) {
        setTimeout(async () => {
          console.log('🔐 Fetching roles for user:', newSession.user.id);
          const { data, error } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', newSession.user.id);

          if (error) {
            console.warn('⚠️ Error fetching roles:', error.message);
            setRoles([]);
          } else {
            const fetched = (data || []).map(r => r.role as AppRole);
            setRoles(fetched);
          }
          setIsLoading(false);
        }, 0);
      } else {
        setRoles([]);
        setIsLoading(false);
      }
    });

    // 2) Then fetch current session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      if (!data.session?.user) {
        setRoles([]);
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const isAdmin = roles.includes('admin');

  return { isLoading, user, session, roles, isAdmin };
};

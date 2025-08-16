
import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Lock, LogIn, UserPlus } from 'lucide-react';

type Mode = 'login' | 'signup';

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  // Establish listener before fetching existing session (per best practices)
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        // If a user is logged in, redirect to home
        navigate('/', { replace: true });
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        navigate('/', { replace: true });
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const switchText = useMemo(
    () => (mode === 'login' ? "Don't have an account?" : 'Already have an account?'),
    [mode]
  );
  const switchCta = useMemo(() => (mode === 'login' ? 'Create one' : 'Log in'), [mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: 'Missing information',
        description: 'Please provide both email and password.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    const redirectUrl = `${window.location.origin}/`;

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: redirectUrl },
      });
      if (error) {
        toast({
          title: 'Sign up failed',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Check your email',
          description: 'We sent a confirmation link to complete your signup.',
        });
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: 'Login failed',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Welcome back!',
          description: 'You are now signed in.',
        });
        navigate('/', { replace: true });
      }
    }

    setIsSubmitting(false);
  };

  const handleSignOut = async () => {
    setIsSubmitting(true);
    const { error } = await supabase.auth.signOut();
    setIsSubmitting(false);
    if (error) {
      toast({
        title: 'Sign out failed',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({ title: 'Signed out', description: 'You have been signed out.' });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <Lock className="h-6 w-6" />
            {mode === 'login' ? 'Sign in' : 'Create your account'}
          </CardTitle>
          <p className="text-muted-foreground">
            {mode === 'login'
              ? 'Access your account using your email and password.'
              : 'Sign up with your email to get started.'}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : mode === 'login' ? (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign in
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create account
                </>
              )}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              {switchText}{' '}
              <button
                type="button"
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="underline underline-offset-2 hover:text-foreground transition"
              >
                {switchCta}
              </button>
            </div>

            <div className="pt-2 text-center">
              <Button
                type="button"
                variant="secondary"
                onClick={handleSignOut}
                disabled={isSubmitting}
              >
                Sign out
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;


import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

interface AdminAuthPanelProps {
  title?: string;
  subtitle?: string;
}

const AdminAuthPanel: React.FC<AdminAuthPanelProps> = ({
  title = 'Admin Sign In',
  subtitle = 'Only administrators can access lead data.'
}) => {
  const { toast } = useToast();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setBusy(true);
    try {
      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: 'Signed in', description: 'Welcome back.' });
      } else {
        const redirectUrl = `${window.location.origin}/`;
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: redirectUrl }
        });
        if (error) throw error;
        toast({
          title: 'Signup successful',
          description: 'Please check your email to confirm your account.'
        });
      }
      setEmail('');
      setPassword('');
    } catch (err: any) {
      toast({
        title: 'Authentication error',
        description: err?.message || 'Please try again.',
        variant: 'destructive'
      });
    } finally {
      setBusy(false);
    }
  };

  const handleSignOut = async () => {
    setBusy(true);
    await supabase.auth.signOut();
    setBusy(false);
    toast({ title: 'Signed out' });
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <p className="text-muted-foreground">{subtitle}</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center gap-2 text-sm mb-4">
          <Button
            type="button"
            variant={mode === 'signin' ? 'default' : 'outline'}
            onClick={() => setMode('signin')}
            className="w-28"
          >
            Sign in
          </Button>
          <Button
            type="button"
            variant={mode === 'signup' ? 'default' : 'outline'}
            onClick={() => setMode('signup')}
            className="w-28"
          >
            Sign up
          </Button>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? 'Please wait...' : mode === 'signin' ? 'Sign in' : 'Create account'}
          </Button>
        </form>

        <Separator className="my-6" />

        <div className="text-xs text-muted-foreground space-y-2">
          <p>Note: An administrator must assign your account the admin role after signup.</p>
          <div className="flex items-center justify-between">
            <span>Already signed in but stuck?</span>
            <Button type="button" variant="ghost" size="sm" onClick={handleSignOut} disabled={busy}>
              Sign out
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminAuthPanel;

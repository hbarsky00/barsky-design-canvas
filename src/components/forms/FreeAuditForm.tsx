
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const FreeAuditForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    company: '',
    goals: '',
    challenges: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  /**
   * Netlify Forms, the same path the contact form uses — no Supabase.
   *
   * The Supabase `process-lead` function this used to call does not exist on
   * the project any more, so every audit request was being dropped silently.
   * Netlify already serves the site and already registers the contact form
   * from the prerendered HTML, so a second named form needs no new backend.
   */
  const encode = (data: Record<string, string>) =>
    Object.keys(data)
      .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
      .join("&");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "free-audit", "bot-field": "", ...formData }),
      });
      // fetch only rejects on a network failure, so a 404 from a form Netlify
      // never registered would otherwise read as success.
      if (!res.ok) throw new Error(`form POST returned ${res.status}`);

      // The submission is stored by this point. The email is best-effort and
      // must never fail the submit.
      fetch("/.netlify/functions/notify-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: "Free UX audit request",
          message: [
            `Website: ${formData.website}`,
            `Company: ${formData.company}`,
            ``,
            `Goals: ${formData.goals}`,
            ``,
            `Challenges: ${formData.challenges}`,
          ].join("\n"),
        }),
      }).catch((err) => console.error("notification failed (submission is stored):", err));

      toast({
        title: "Audit Request Submitted!",
        description: "You'll receive your comprehensive UX audit within 24-48 hours.",
      });

      setFormData({ name: '', email: '', website: '', company: '', goals: '', challenges: '' });
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission Error",
        description: "Please try again, or email hbarsky01@gmail.com directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      name="free-audit"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-8 rounded-lg shadow-lg"
    >
      {/* Netlify needs the form name in the payload; the honeypot is a field a
          person never sees and a bot fills in. */}
      <input type="hidden" name="form-name" value="free-audit" />
      <p hidden>
        <label>
          Leave this empty: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="website">Website URL *</Label>
          <Input
            id="website"
            name="website"
            type="url"
            placeholder="https://yourwebsite.com"
            value={formData.website}
            onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="company">Company Name</Label>
          <Input
            id="company"
            name="company"
            value={formData.company}
            onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="goals">Primary Goals</Label>
        <Textarea
          id="goals"
            name="goals"
          placeholder="What are you hoping to achieve with your website?"
          value={formData.goals}
          onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="challenges">Current Challenges</Label>
        <Textarea
          id="challenges"
            name="challenges"
          placeholder="What problems are you experiencing with your current site?"
          value={formData.challenges}
          onChange={(e) => setFormData(prev => ({ ...prev, challenges: e.target.value }))}
        />
      </div>

      <Button 
        type="submit" 
        size="lg" 
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Get My Free Audit'}
      </Button>

      <p className="text-sm text-gray-600 text-center">
        No spam, no sales calls. Just valuable insights to improve your website.
      </p>
    </form>
  );
};

export default FreeAuditForm;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Process lead data through Supabase edge function
      const leadData = {
        name: formData.name,
        email: formData.email,
        website: formData.website,
        company: formData.company,
        project_description: formData.goals,
        notes: formData.challenges,
        lead_source: 'free_audit_form',
        project_type: 'UX Audit'
      };

      const { error } = await supabase.functions.invoke('process-lead', {
        body: leadData
      });

      if (error) {
        throw error;
      }
      
      toast({
        title: "Audit Request Submitted!",
        description: "You'll receive your comprehensive UX audit within 24-48 hours.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        website: '',
        company: '',
        goals: '',
        challenges: ''
      });
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission Error",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
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
            value={formData.company}
            onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="goals">Primary Goals</Label>
        <Textarea
          id="goals"
          placeholder="What are you hoping to achieve with your website?"
          value={formData.goals}
          onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="challenges">Current Challenges</Label>
        <Textarea
          id="challenges"
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


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

const auditFormSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  email: z.string().trim().email('Invalid email address').max(255, 'Email too long'),
  website: z.string().trim().url('Invalid website URL').max(500, 'Website URL too long').refine(
    (val) => /^https?:\/\/.+/.test(val),
    'Website must be a valid HTTP/HTTPS URL'
  ),
  company: z.string().trim().max(100, 'Company name too long').optional(),
  goals: z.string().trim().max(1000, 'Goals too long (max 1000 characters)').optional(),
  challenges: z.string().trim().max(1000, 'Challenges too long (max 1000 characters)').optional(),
});

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
    
    // Security: Validate with zod schema
    const validation = auditFormSchema.safeParse(formData);
    
    if (!validation.success) {
      const firstError = validation.error.errors[0];
      toast({
        title: "Validation Error",
        description: firstError.message,
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Process lead data through Supabase edge function with validated data
      const { error } = await supabase.functions.invoke('process-lead', {
        body: {
          name: validation.data.name,
          email: validation.data.email,
          website: validation.data.website,
          company: validation.data.company || null,
          project_description: validation.data.goals || null,
          notes: validation.data.challenges || null,
          lead_source: 'free_audit_form',
          project_type: 'UX Audit'
        }
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


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send, Sparkles } from 'lucide-react';
import { rateLimiter } from '@/utils/securityMonitor';

interface LeadFormData {
  name: string;
  email: string;
  company: string;
  project_type: string;
  budget_range: string;
  project_description: string;
  phone: string;
  website: string;
}

const LeadCaptureForm: React.FC = () => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    company: '',
    project_type: '',
    budget_range: '',
    project_description: '',
    phone: '',
    website: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (field: keyof LeadFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple client-side rate limiting based on email if available, else a generic key
    const limiterKey = formData.email ? `lead_form_${formData.email}` : 'lead_form_anonymous';
    if (rateLimiter.isRateLimited(limiterKey)) {
      const remaining = rateLimiter.getRemainingAttempts(limiterKey);
      toast({
        title: "Too many attempts",
        description: remaining > 0
          ? `Please wait a bit before trying again. Remaining attempts in this window: ${remaining}.`
          : "Please wait 15 minutes before trying again.",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.name || !formData.email || !formData.project_description) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name, email, and project description.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/functions/v1/process-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          lead_source: 'website'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit lead');
      }

      const result = await response.json();

      toast({
        title: "🎉 Thank you!",
        description: "I've received your project details and will respond within 24 hours with next steps.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        project_type: '',
        budget_range: '',
        project_description: '',
        phone: '',
        website: ''
      });

    } catch (error) {
      console.error('Error submitting lead:', error);
      toast({
        title: "Submission Error",
        description: "There was an issue submitting your information. Please try again or email me directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <Sparkles className="h-6 w-6 text-blue-600" />
          Project Details
        </CardTitle>
        <p className="text-muted-foreground">
          Tell me about your project and I'll create a custom approach for your needs.
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Your full name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
                placeholder="Your company name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => handleChange('website', e.target.value)}
                placeholder="https://yourcompany.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="project_type">Project Type</Label>
              <Select value={formData.project_type} onValueChange={(value) => handleChange('project_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AI Integration">AI Integration</SelectItem>
                  <SelectItem value="Full Product Design">Full Product Design</SelectItem>
                  <SelectItem value="UX Research">UX Research</SelectItem>
                  <SelectItem value="UI Design">UI Design</SelectItem>
                  <SelectItem value="Mobile App Design">Mobile App Design</SelectItem>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="Design System">Design System</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="budget_range">Budget Range</Label>
              <Select value={formData.budget_range} onValueChange={(value) => handleChange('budget_range', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="$5k-$10k">$5k - $10k</SelectItem>
                  <SelectItem value="$10k-$20k">$10k - $20k</SelectItem>
                  <SelectItem value="$20k-$50k">$20k - $50k</SelectItem>
                  <SelectItem value="$50k+">$50k+</SelectItem>
                  <SelectItem value="Discuss">Let's Discuss</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone (Optional)</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project_description">Project Description *</Label>
            <Textarea
              id="project_description"
              value={formData.project_description}
              onChange={(e) => handleChange('project_description', e.target.value)}
              placeholder="Tell me about your project goals, challenges, and what you're looking to achieve..."
              rows={4}
              required
            />
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full text-lg py-6"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing Your Request...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Get My Custom Project Plan
              </>
            )}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            <p>🤖 AI-powered analysis • 📧 Personalized response within 24hrs • 🔒 Secure & confidential</p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LeadCaptureForm;

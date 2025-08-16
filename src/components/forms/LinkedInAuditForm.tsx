
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Linkedin, ArrowRight } from 'lucide-react';

const LinkedInAuditForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    linkedinUrl: '',
    industry: '',
    goals: '',
    currentChallenges: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "LinkedIn Audit Request Submitted!",
        description: "You'll receive your optimization strategy within 24-48 hours.",
      });
      
      setFormData({
        name: '',
        email: '',
        linkedinUrl: '',
        industry: '',
        goals: '',
        currentChallenges: ''
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
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Linkedin className="w-4 h-4" />
          Professional Optimization
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Transform Your LinkedIn Profile
        </h3>
        <p className="text-gray-600">
          Get started with your LinkedIn optimization strategy
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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

        <div className="space-y-2">
          <Label htmlFor="linkedinUrl">LinkedIn Profile URL *</Label>
          <Input
            id="linkedinUrl"
            type="url"
            placeholder="https://linkedin.com/in/yourprofile"
            value={formData.linkedinUrl}
            onChange={(e) => setFormData(prev => ({ ...prev, linkedinUrl: e.target.value }))}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">Industry/Role *</Label>
          <Input
            id="industry"
            placeholder="e.g., Marketing Manager, Software Engineer"
            value={formData.industry}
            onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="goals">LinkedIn Goals</Label>
          <Textarea
            id="goals"
            placeholder="What do you want to achieve with LinkedIn? (e.g., generate leads, find clients, build network)"
            value={formData.goals}
            onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentChallenges">Current Challenges</Label>
          <Textarea
            id="currentChallenges"
            placeholder="What challenges are you facing with your LinkedIn presence?"
            value={formData.currentChallenges}
            onChange={(e) => setFormData(prev => ({ ...prev, currentChallenges: e.target.value }))}
          />
        </div>

        <Button 
          type="submit" 
          size="lg" 
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Get My LinkedIn Strategy ($497)'}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>

        <p className="text-sm text-gray-600 text-center">
          Secure payment. 30-day money-back guarantee.
        </p>
      </form>
    </div>
  );
};

export default LinkedInAuditForm;

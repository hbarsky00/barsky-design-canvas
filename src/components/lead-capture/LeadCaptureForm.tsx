
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Gift } from 'lucide-react';

const LeadCaptureForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    phone: '',
    revenue: '',
    challenges: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success! Your Free Audit is Coming",
        description: "Check your email in the next 10 minutes for next steps.",
      });
      
      setFormData({
        name: '',
        email: '',
        website: '',
        phone: '',
        revenue: '',
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
    <div className="bg-white rounded-2xl p-8 shadow-xl">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Gift className="w-4 h-4" />
          $2,000 Value - Free
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Claim Your Free Website Audit
        </h2>
        <p className="text-gray-600">
          Takes 2 minutes. Results delivered in 24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
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
            <Label htmlFor="email">Business Email *</Label>
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

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="revenue">Annual Revenue</Label>
            <Input
              id="revenue"
              placeholder="e.g., $100K, $1M, $10M+"
              value={formData.revenue}
              onChange={(e) => setFormData(prev => ({ ...prev, revenue: e.target.value }))}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="challenges">Biggest Challenge</Label>
          <Textarea
            id="challenges"
            placeholder="What's preventing your website from generating more leads?"
            value={formData.challenges}
            onChange={(e) => setFormData(prev => ({ ...prev, challenges: e.target.value }))}
          />
        </div>

        <Button 
          type="submit" 
          size="lg" 
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Get My Free $2,000 Audit'}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>

        <p className="text-xs text-gray-600 text-center">
          🔒 Your information is secure. No spam, ever.
        </p>
      </form>
    </div>
  );
};

export default LeadCaptureForm;

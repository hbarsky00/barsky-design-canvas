
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { rateLimiter, securityMonitor } from '@/utils/securityMonitor';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting check
    const clientId = `${formData.email}_${Date.now()}`;
    if (rateLimiter.isRateLimited(clientId)) {
      const remaining = rateLimiter.getRemainingAttempts(clientId);
      toast.error(`Too many submissions. Please wait before trying again. Remaining attempts: ${remaining}`);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('leads')
        .insert([{
          ...formData,
          lead_source: 'website'
        }]);

      if (error) {
        console.error('Error submitting form:', error);
        toast.error('Failed to submit form. Please try again.');
        
        // Log suspicious activity if there are repeated errors
        securityMonitor.logEvent({
          type: 'suspicious_activity',
          details: {
            action: 'form_submission_error',
            error: error.message,
            formData: { email: formData.email, name: formData.name }
          }
        });
      } else {
        toast.success('Thank you! We\'ll be in touch soon.');
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
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          name="name"
          placeholder="Your Name *"
          value={formData.name}
          onChange={handleChange}
          required
          className="border-gray-300 focus:border-blue-500"
        />
        <Input
          name="email"
          type="email"
          placeholder="Email Address *"
          value={formData.email}
          onChange={handleChange}
          required
          className="border-gray-300 focus:border-blue-500"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          className="border-gray-300 focus:border-blue-500"
        />
        <Input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="border-gray-300 focus:border-blue-500"
        />
      </div>

      <Input
        name="website"
        type="url"
        placeholder="Website URL"
        value={formData.website}
        onChange={handleChange}
        className="border-gray-300 focus:border-blue-500"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <select
          name="project_type"
          value={formData.project_type}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
        >
          <option value="">Select Project Type</option>
          <option value="Full Product Design">Full Product Design</option>
          <option value="AI Integration">AI Integration</option>
          <option value="UX Research">UX Research</option>
          <option value="UI Design">UI Design</option>
          <option value="Other">Other</option>
        </select>
        
        <select
          name="budget_range"
          value={formData.budget_range}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
        >
          <option value="">Select Budget Range</option>
          <option value="$5k-$10k">$5k-$10k</option>
          <option value="$10k-$20k">$10k-$20k</option>
          <option value="$20k-$50k">$20k-$50k</option>
          <option value="$50k+">$50k+</option>
        </select>
      </div>
      
      <Textarea
        name="project_description"
        placeholder="Tell us about your project..."
        value={formData.project_description}
        onChange={handleChange}
        rows={5}
        className="border-gray-300 focus:border-blue-500"
      />
      
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </motion.form>
  );
};

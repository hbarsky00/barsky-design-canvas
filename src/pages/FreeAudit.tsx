import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Mail, Phone, Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnhancedGlobalSeo from "@/components/seo/EnhancedGlobalSeo";
import CanonicalTag from "@/components/CanonicalTag";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const FreeAudit: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    phone: '',
    projectType: '',
    budgetRange: '',
    projectDescription: '',
    timeline: ''
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.projectType || !formData.budgetRange || !formData.projectDescription) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('process-free-audit', {
        body: formData
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Request Submitted!",
        description: "You'll receive a confirmation email shortly with next steps.",
      });

    } catch (error: any) {
      console.error('Error submitting audit request:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    "Live audit of your current website/product",
    "AI-enhanced user behavior analysis using ChatGPT & Claude AI",
    "3 specific improvement recommendations you can implement immediately",
    "Personalized growth strategy based on your business goals",
    "No-obligation project timeline and pricing discussion"
  ];

  return (
    <>
      <CanonicalTag />
      <EnhancedGlobalSeo 
        title="Free UX Conversion Audit - Increase Conversions 40%+ | Hiram Barsky"
        description="Get your free 30-minute UX conversion audit. Discover exactly how to increase your conversions by 40%+ using AI-enhanced UX design. Book now!"
        pageType="content"
        keywords={[
          "free UX audit", "conversion optimization audit", "UX consultation", "AI UX analysis",
          "website conversion audit", "UX designer consultation", "free design review"
        ]}
      />
      
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <Header />
        
        <main className="flex-grow pt-20">
          <section className="py-16 lg:py-24 bg-gradient-to-br from-neutral-50 to-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Hero Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
                  Get Your Free 30-Minute Conversion Audit
                </h1>
                <p className="text-xl text-neutral-500 max-w-3xl mx-auto leading-relaxed mb-8">
                  Discover exactly how to increase your conversions by 40%+ using AI-enhanced UX
                </p>
                
                {/* Social Proof */}
                <div className="flex items-center justify-center gap-2 text-sm text-neutral-500 mb-8">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★★★★★</span>
                    <span>Join 47 five-star clients who've seen 40%+ conversion improvements</span>
                  </div>
                </div>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-12 items-start">
                
                {/* Benefits Section */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                      What You'll Get:
                    </h2>
                    <div className="space-y-4">
                      {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-6 w-6 text-success-green mt-1 flex-shrink-0" />
                          <span className="text-neutral-500">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="glass-card p-6">
                    <h3 className="text-xl font-bold text-neutral-900 mb-4">
                      Contact Information:
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-blue-accent" />
                        <span className="text-neutral-500">hbarsky01@gmail.com</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-blue-accent" />
                        <span className="text-neutral-500">(201) 668-4754</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-blue-accent" />
                        <span className="text-neutral-500">You'll hear back within 24 hours</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Booking Form */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="glass-card-elevated p-8"
                >
                  {isSubmitted ? (
                    <div className="text-center space-y-4">
                      <CheckCircle className="h-16 w-16 text-success-green mx-auto" />
                      <h3 className="text-2xl font-bold text-neutral-900">Request Submitted!</h3>
                      <p className="text-neutral-500">
                        Thank you for your interest! You'll receive a confirmation email with next steps within 24 hours.
                      </p>
                      <Button
                        onClick={() => setIsSubmitted(false)}
                        variant="outline"
                        className="mt-4"
                      >
                        Submit Another Request
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          type="text"
                          required
                          placeholder="Your full name"
                          className="w-full"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          placeholder="your@email.com"
                          className="w-full"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">Company/Project Name</Label>
                        <Input
                          id="company"
                          type="text"
                          placeholder="Your company or project name"
                          className="w-full"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website">Website URL</Label>
                        <Input
                          id="website"
                          type="url"
                          placeholder="https://yourwebsite.com"
                          className="w-full"
                          value={formData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="(555) 123-4567"
                          className="w-full"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="projectType">Project Type *</Label>
                        <Select value={formData.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select project type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Website Redesign">Website Redesign</SelectItem>
                            <SelectItem value="Mobile App Design">Mobile App Design</SelectItem>
                            <SelectItem value="UX Audit">UX Audit</SelectItem>
                            <SelectItem value="AI Integration">AI Integration</SelectItem>
                            <SelectItem value="E-commerce">E-commerce Platform</SelectItem>
                            <SelectItem value="SaaS Platform">SaaS Platform</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="budgetRange">Budget Range *</Label>
                        <Select value={formData.budgetRange} onValueChange={(value) => handleInputChange('budgetRange', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="<$5k">Less than $5,000</SelectItem>
                            <SelectItem value="$5k-$10k">$5,000 - $10,000</SelectItem>
                            <SelectItem value="$10k-$20k">$10,000 - $20,000</SelectItem>
                            <SelectItem value="$20k-$50k">$20,000 - $50,000</SelectItem>
                            <SelectItem value="$50k+">$50,000+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="projectDescription">Project Description *</Label>
                        <Textarea
                          id="projectDescription"
                          placeholder="Describe your project, goals, and main challenges..."
                          rows={4}
                          className="w-full"
                          value={formData.projectDescription}
                          onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timeline">Preferred Meeting Time</Label>
                        <Input
                          id="timeline"
                          type="text"
                          placeholder="e.g., Weekdays 2-4 PM EST, or any specific dates"
                          className="w-full"
                          value={formData.timeline}
                          onChange={(e) => handleInputChange('timeline', e.target.value)}
                        />
                      </div>

                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-blue-vibrant hover:bg-blue-accent text-white font-semibold py-3 px-6 transition-colors duration-300 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          'Book My Free Audit'
                        )}
                      </Button>

                      <p className="text-sm text-neutral-500 text-center">
                        No spam, no sales pitch - just valuable insights
                      </p>
                    </form>
                  )}
                </motion.div>
              </div>

              {/* Bottom CTA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-center mt-16"
              >
                <div className="glass-card p-8 max-w-2xl mx-auto">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500" />
                  </div>
                  <p className="text-neutral-500 italic">
                    "Hiram's AI-enhanced research revealed user pain points we never considered. 
                    The audit insights led to a 45% improvement in our conversion rate."
                  </p>
                  <p className="text-sm text-neutral-500 mt-2">
                    - Sarah Chen, Founder, Herbalink
                  </p>
                </div>
              </motion.div>

            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default FreeAudit;
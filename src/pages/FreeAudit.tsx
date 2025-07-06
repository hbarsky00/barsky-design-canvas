import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Mail, Phone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnhancedGlobalSeo from "@/components/seo/EnhancedGlobalSeo";

const FreeAudit: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted');
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
      <EnhancedGlobalSeo 
        title="Free UX Conversion Audit - Increase Conversions 40%+ | Hiram Barsky"
        description="Get your free 30-minute UX conversion audit. Discover exactly how to increase your conversions by 40%+ using AI-enhanced UX design. Book now!"
        canonicalUrl="https://barskydesign.pro/free-audit"
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
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        placeholder="Your full name"
                        className="w-full"
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
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Company/Project Name *</Label>
                      <Input
                        id="company"
                        type="text"
                        required
                        placeholder="Your company or project name"
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="visitors">Current Monthly Website Visitors</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select visitor range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="<1K">Less than 1,000</SelectItem>
                          <SelectItem value="1-5K">1,000 - 5,000</SelectItem>
                          <SelectItem value="5-10K">5,000 - 10,000</SelectItem>
                          <SelectItem value="10K+">10,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="challenge">What's your biggest UX challenge?</Label>
                      <Textarea
                        id="challenge"
                        placeholder="Describe your main UX challenge or what you'd like to improve..."
                        rows={4}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="meetingTime">Preferred Meeting Time</Label>
                      <Input
                        id="meetingTime"
                        type="text"
                        placeholder="e.g., Weekdays 2-4 PM EST, or any specific dates"
                        className="w-full"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-blue-vibrant hover:bg-blue-accent text-white font-semibold py-3 px-6 transition-colors duration-300"
                    >
                      Book My Free Audit
                    </Button>

                    <p className="text-sm text-neutral-500 text-center">
                      No spam, no sales pitch - just valuable insights
                    </p>
                  </form>
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
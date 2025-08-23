import React, { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    try {
      // Store newsletter signup in leads table
      const { data, error } = await supabase.functions.invoke('process-lead', {
        body: {
          email,
          name: 'Newsletter Subscriber',
          lead_source: 'blog_newsletter',
          project_type: 'Newsletter Subscription',
          notes: 'Subscribed to blog newsletter'
        }
      });


      if (error) throw error;

      toast({
        title: "Welcome to our newsletter!",
        description: "You'll receive our latest insights on UX design and AI.",
      });
      
      setEmail("");
    } catch (error) {
      console.error('Newsletter signup error:', error);
      toast({
        title: "Signup failed",
        description: "Please try again later or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white my-12">
      <div className="max-w-md mx-auto text-center">
        <div className="flex justify-center mb-4">
          <Mail className="h-12 w-12 text-white/90" />
        </div>
        
        <h3 className="heading-subsection mb-2">
          Stay ahead of the curve
        </h3>
        
        <p className="text-white/90 mb-6">
          Get weekly insights on AI-enhanced UX design, accessibility trends, and conversion optimization delivered to your inbox.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white text-gray-900 placeholder:text-gray-500"
          />
          
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-blue-600 hover:bg-gray-100 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              "Subscribing..."
            ) : (
              <>
                Subscribe Now
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>
        
        <p className="text-xs text-white/70 mt-4">
          No spam, unsubscribe at any time. We respect your privacy.
        </p>
      </div>
    </div>
  );
};

export default NewsletterSignup;
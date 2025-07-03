
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import ContactInformation from "@/components/contact/ContactInformation";
import ContactForm from "@/components/contact/ContactForm";

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-12 dark:bg-gray-900">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title mb-6">Ready to Start Your Project?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get a personalized project plan with AI-powered analysis and 24-hour response time.
          </p>
          
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 mb-8"
            onClick={() => window.location.href = '/get-started'}
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Get Your Custom Project Plan
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <p className="text-sm text-muted-foreground">
            Or use the quick contact form below for general inquiries
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <ContactInformation />
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;

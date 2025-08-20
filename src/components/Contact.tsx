
import React from "react";
import ContactInformation from "@/components/contact/ContactInformation";
import ContactForm from "@/components/contact/ContactForm";

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-8 md:py-12 dark:bg-gray-900">
      <div className="section-container">
        <div className="text-center mb-8">
          <h2 className="section-title mb-6 font-display">Have Questions or Need Support?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Reach out for general inquiries, support, or if you'd like to discuss your project in more detail.
          </p>
          
          <p className="text-sm text-muted-foreground">
            For new projects, use our "Get Your Custom Project Plan" button above for faster response
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="hidden md:block">
            <ContactInformation />
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;

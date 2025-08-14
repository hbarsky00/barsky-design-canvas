
import React from "react";
import ContactInformation from "@/components/contact/ContactInformation";
import ContactForm from "@/components/contact/ContactForm";
import SectionNavigation from "@/components/navigation/SectionNavigation";
import { useHomepageKeyboardNavigation } from "@/hooks/useHomepageKeyboardNavigation";

const HomepageContactForm: React.FC = () => {
  const { navigateUp, navigateDown, canNavigateUp, canNavigateDown } = useHomepageKeyboardNavigation();

  return (
    <section id="contact" className="py-8 md:py-12 dark:bg-gray-900 relative">
      <div className="section-container">
        <div className="text-center mb-8">
          <h2 className="section-title mb-6">Have Questions or Need Support?</h2>
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

      <SectionNavigation
        onNavigateUp={navigateUp}
        onNavigateDown={navigateDown}
        canNavigateUp={canNavigateUp}
        canNavigateDown={canNavigateDown}
        upLabel="Back to projects"
        downLabel="View blog"
      />
    </section>
  );
};

export default HomepageContactForm;

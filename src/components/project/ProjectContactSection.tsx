
import React from "react";
import ContactForm from "@/components/contact/ContactForm";

const ProjectContactSection: React.FC = () => {
  return (
    <div className="mt-8">
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
        <h3 className="text-xl font-semibold text-barsky-dark mb-3">Need Similar Services?</h3>
        <p className="text-barsky-text mb-6">
          I offer professional UX/UI design and development services for both mobile and desktop applications. Let's create your next digital experience.
        </p>
        
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h4 className="text-lg font-medium text-barsky-dark mb-4">Get In Touch</h4>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ProjectContactSection;


import React from "react";
import ContactInformation from "@/components/contact/ContactInformation";
import ContactForm from "@/components/contact/ContactForm";

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-12 dark:bg-gray-900">
      <div className="section-container">
        <h2 className="section-title mb-12">Get In Touch</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <ContactInformation />
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;

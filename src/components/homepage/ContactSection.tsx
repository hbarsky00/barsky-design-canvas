
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ContactSection: React.FC = () => {
  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6">
          Ready to Transform Your Digital Experience?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Let's discuss how AI-enhanced design can drive real results for your business.
        </p>
        <Button asChild variant="secondary" size="lg">
          <Link to="/contact">Get in Touch</Link>
        </Button>
      </div>
    </section>
  );
};

export default ContactSection;


import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { trackContentEngagement } from "@/lib/analytics";

const ServicesCallToAction = () => {
  const openCalendly = () => {
    window.open("https://calendly.com/barskyuxdesignservices/30min", "_blank");
    trackContentEngagement('service', 'consultation-booking', 'Calendly Booking');
  };

  return (
    <section className="py-20 bg-barsky-blue/5">
      <div className="container px-4 mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Let's discuss how my design and development services can help you create exceptional digital experiences for your users.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button onClick={openCalendly} size="lg">
            <Calendar className="mr-2" />
            Schedule a Free Consultation
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/#contact">
              Contact Me
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesCallToAction;

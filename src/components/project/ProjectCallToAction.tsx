
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Mail } from "lucide-react";
import { trackContentEngagement } from "@/lib/analytics";

const ProjectCallToAction: React.FC = () => {
  const openCalendly = () => {
    window.open("https://calendly.com/barskyuxdesignservices/30min", "_blank");
    trackContentEngagement('project', 'consultation-booking', 'Calendly Booking');
  };

  return (
    <motion.section
      id="call-to-action"
      data-section="call-to-action"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full bg-gradient-to-br from-blue-50 to-purple-50 py-16 px-4 scroll-mt-[calc(var(--header-height,64px)+2rem)]"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          id="cta-heading"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6"
        >
          Ready to Start Your Project?
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Let's discuss how my design and development services can help you
          create exceptional digital experiences for your users.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button 
            onClick={openCalendly}
            size="lg"
            className="w-full sm:w-auto"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Schedule a Free Consultation
          </Button>
          
          <Button 
            variant="outlined"
            size="lg"
            asChild
            className="w-full sm:w-auto"
          >
            <Link to="/#contact">
              <Mail className="h-5 w-5 mr-2" />
              Contact Me
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProjectCallToAction;


import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, Phone } from 'lucide-react';

const CALENDLY_URL = "https://calendly.com/barskyuxdesignservices/30min";

const CallToAction: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 lg:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4 font-display">Got something you want built?</h2>
        <p className="text-xl mb-8 opacity-90">
          Tell me what you are working on — SaaS, an app, or an internal tool. I design it and I develop it.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          {/* Both buttons used to be no-ops: one scrolled to a #contact anchor
              that doesn't exist on this page, the other opened /free-audit,
              which has no route (so it landed on the homepage in a new tab). */}
          <Button size="lg" variant="elevated" asChild>
            <Link to="/contact">
              Start a Project
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>

          <Button size="lg" variant="on-dark" asChild>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              Book a Free Consultation
            </a>
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>hbarsky01@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>(201) 668-4754</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default CallToAction;


import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, Phone } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 lg:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4 font-display">Ready to Transform Your Digital Experience?</h2>
        <p className="text-xl mb-8 opacity-90">
          Let's discuss how AI-enhanced design can drive your business forward.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
            onClick={() => {
              if (typeof document !== 'undefined') {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }}
          >
            Start a Project
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.open('/free-audit', '_blank');
              }
            }}
          >
            Get Free Audit
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>hello@barskydesign.pro</span>
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

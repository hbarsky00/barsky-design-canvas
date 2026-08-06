
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
          {/* Was an onClick scrollIntoView("contact") — no element with
              id="contact" exists on this page or anywhere reachable from it,
              so the button silently did nothing. Found while adding the
              /about FAQ (AEO lever 2, Cycle 2). /contact is a real route. */}
          <Button size="lg" variant="elevated" asChild>
            <Link to="/contact">
              Start a Project
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>

          {/* /free-audit previously had no route (404) despite FreeAudit.tsx
              and FreeAuditForm.tsx already existing — fixed in App.tsx. */}
          <Button size="lg" variant="on-dark" asChild>
            <Link to="/free-audit">Get Free Audit</Link>
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

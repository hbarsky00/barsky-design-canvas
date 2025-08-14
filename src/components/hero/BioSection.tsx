
import React from "react";
import { motion } from "framer-motion";

const BioSection: React.FC = () => {
  return (
    <section id="bio-section" className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="space-y-8 text-3xl md:text-4xl font-bold text-foreground leading-relaxed">
            <p>
              Product Design Leader with Enterprise and Startup experience since 2012.
              FinTech, Healthcare, AdTech veteran.
            </p>
            <p>
              I simplify complex systems and raise the bar of design while delivering
              measurable business impact.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BioSection;

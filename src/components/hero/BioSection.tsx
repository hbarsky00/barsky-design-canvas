
import React from "react";
import { motion } from "framer-motion";

const BioSection: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="space-y-6 text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed">
            <p className="font-medium">
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

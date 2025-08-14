
import React from "react";
import { motion } from "framer-motion";

const BioSection: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-4"
    >
      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
        Product Design Leader with Enterprise and Startup experience since 2012. FinTech, Healthcare, AdTech veteran.
      </p>
      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
        I simplify complex systems and raise the bar of design while delivering measurable business impact.
      </p>
    </motion.div>
  );
};

export default BioSection;

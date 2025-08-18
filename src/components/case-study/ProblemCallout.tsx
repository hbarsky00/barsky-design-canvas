import React from "react";
import { motion } from "framer-motion";

interface ProblemCalloutProps {
  eyebrow: string;
  statement: string;
}

const ProblemCallout: React.FC<ProblemCalloutProps> = ({ eyebrow, statement }) => {
  return (
    <section 
      id="problem" 
      aria-labelledby="problem-label"
      className="w-full bg-[hsl(190_60%_96%)] section-spacing"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <div 
            id="problem-label"
            className="text-eyebrow text-primary header-spacing"
          >
            {eyebrow}
          </div>
          
          <h2 className="text-section-title text-foreground max-w-[72ch] mx-auto text-center">
            {statement}
          </h2>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemCallout;
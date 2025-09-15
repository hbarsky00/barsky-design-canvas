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
      <div className="section-container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <div 
            id="problem-label"
            className="text-eyebrow text-primary font-display header-spacing"
          >
            {eyebrow}
          </div>
          
          <h2 className="text-foreground font-display content-rail-center text-xl sm:text-2xl md:text-3xl lg:text-3xl leading-snug font-medium">
            {statement}
          </h2>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemCallout;
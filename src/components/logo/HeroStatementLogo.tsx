import React from "react";
import { motion } from "framer-motion";

interface HeroStatementLogoProps {
  isVisible?: boolean;
  className?: string;
}

const HeroStatementLogo: React.FC<HeroStatementLogoProps> = ({ 
  isVisible = true,
  className = ""
}) => {
  return (
    <motion.div
      className={`flex flex-col items-center text-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Clean hero image */}
      <motion.div
        className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-xl mb-6"
        initial={{ scale: 0.8 }}
        animate={{ scale: isVisible ? 1 : 0.8 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
      >
        {/* Simple professional border */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-200 to-slate-400 p-0.5">
          <div className="w-full h-full rounded-full bg-white p-0.5">
            <img
              src="/lovable-uploads/e52a884d-0e2f-4470-aae9-56e65adb2de0.png"
              alt="Barsky Design - Professional UX/UI Designer"
              className="w-full h-full rounded-full object-cover object-center"
              loading="eager"
            />
          </div>
        </div>
      </motion.div>

      {/* Clean typography */}
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 leading-tight">
          Barsky Design
        </h1>
        
        <motion.p
          className="text-lg md:text-xl text-slate-600 font-medium max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ delay: 0.4 }}
        >
          UX/UI Designer
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default HeroStatementLogo;
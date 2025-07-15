import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface EnhancedLogoProps {
  variant?: "header" | "hero" | "minimal";
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

const EnhancedLogo: React.FC<EnhancedLogoProps> = ({ 
  variant = "header", 
  size = "md", 
  showText = true,
  className = ""
}) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
    xl: "h-24 w-24"
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-4xl"
  };

  const renderLogo = () => (
    <motion.div
      className={`flex items-center gap-3 group cursor-pointer ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Professional image container */}
      <motion.div
        className={`relative ${sizeClasses[size]} rounded-full overflow-hidden shadow-lg`}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {/* Clean border */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 p-0.5">
          <div className="w-full h-full rounded-full bg-white p-0.5">
            <img
              src="/lovable-uploads/e52a884d-0e2f-4470-aae9-56e65adb2de0.png"
              alt="Barsky Design - Professional UX/UI Designer"
              className="w-full h-full rounded-full object-cover object-center"
              loading="eager"
            />
          </div>
        </div>
        
        {/* Subtle hover overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>

      {/* Clean text */}
      {showText && (
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className={`font-semibold text-slate-800 ${textSizeClasses[size]} leading-tight tracking-tight`}>
            Barsky Design
          </span>
          {variant === "hero" && (
            <motion.span
              className="text-sm text-slate-500 font-medium tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              UX/UI Designer
            </motion.span>
          )}
        </motion.div>
      )}
    </motion.div>
  );

  if (variant === "header") {
    return (
      <Link to="/" className="block">
        {renderLogo()}
      </Link>
    );
  }

  return renderLogo();
};

export default EnhancedLogo;
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

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  const imageVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }
    },
    hover: {
      scale: 1.1,
      rotateZ: [0, -2, 2, 0],
      transition: { 
        scale: { duration: 0.3 },
        rotateZ: { duration: 0.8, ease: "easeInOut" }
      }
    }
  };

  const textVariants = {
    initial: { opacity: 0, x: -10 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { delay: 0.2 }
    },
    hover: {
      color: "hsl(var(--blue-vibrant))",
      transition: { duration: 0.2 }
    }
  };

  const glowVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 0.3, 
      scale: 1.2,
      transition: { 
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    },
    hover: {
      opacity: 0.6,
      scale: 1.4,
      transition: { duration: 0.3 }
    }
  };

  const renderLogo = () => (
    <motion.div
      className={`relative group cursor-pointer ${className}`}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      {/* Glow effect */}
      <motion.div
        className={`absolute inset-0 ${sizeClasses[size]} rounded-full bg-gradient-to-r from-blue-vibrant to-purple-vibrant opacity-0 blur-xl`}
        variants={glowVariants}
      />
      
      {/* Main logo container */}
      <div className="relative flex items-center gap-3">
        {/* Image container with sophisticated styling */}
        <motion.div
          className={`relative ${sizeClasses[size]} rounded-full overflow-hidden`}
          variants={imageVariants}
        >
          {/* Gradient border */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-vibrant via-purple-vibrant to-blue-accent p-0.5">
            <div className="w-full h-full rounded-full bg-white p-0.5">
              <img
                src="/lovable-uploads/e52a884d-0e2f-4470-aae9-56e65adb2de0.png"
                alt="Barsky Design - Professional UX/UI Designer"
                className="w-full h-full rounded-full object-cover object-center"
                loading="eager"
              />
            </div>
          </div>
          
          {/* Shine effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Sparkle effect */}
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-blue-vibrant rounded-full opacity-0 group-hover:opacity-100"
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.5
            }}
          />
        </motion.div>

        {/* Text */}
        {showText && (
          <motion.div
            className="flex flex-col"
            variants={textVariants}
          >
            <span className={`font-script font-medium text-navy-primary ${textSizeClasses[size]} leading-tight`}>
              Barsky Design
            </span>
            {variant === "hero" && (
              <motion.span
                className="text-sm text-neutral-500 font-light tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                UX/UI Designer
              </motion.span>
            )}
          </motion.div>
        )}
      </div>

      {/* Underline effect */}
      {showText && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-vibrant to-purple-vibrant origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
          style={{ transformOrigin: "left" }}
        />
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
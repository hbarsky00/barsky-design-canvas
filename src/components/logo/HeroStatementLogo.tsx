import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Star, Zap } from "lucide-react";

interface HeroStatementLogoProps {
  isVisible?: boolean;
  className?: string;
}

const HeroStatementLogo: React.FC<HeroStatementLogoProps> = ({ 
  isVisible = true,
  className = ""
}) => {
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowParticles(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.3 }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.5, opacity: 0, rotateZ: -10 },
    visible: { 
      scale: 1, 
      opacity: 1,
      rotateZ: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 15,
        duration: 0.8
      }
    },
    hover: {
      scale: 1.05,
      rotateZ: [0, -1, 1, 0],
      transition: { 
        scale: { duration: 0.3 },
        rotateZ: { duration: 1, ease: "easeInOut" }
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.3,
        duration: 0.6
      }
    },
    hover: {
      color: "hsl(var(--blue-vibrant))",
      transition: { duration: 0.3 }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.5,
        duration: 0.5
      }
    }
  };

  const particleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        delay: 0.8,
        duration: 0.5
      }
    }
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const sparkleAnimation = {
    scale: [0, 1, 0],
    opacity: [0, 1, 0],
    rotate: [0, 180, 360],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <motion.div
      className={`relative flex flex-col items-center text-center ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      whileHover="hover"
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-vibrant/20 via-purple-vibrant/20 to-blue-accent/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating particles */}
      {showParticles && (
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-8 left-8 text-blue-vibrant"
            variants={particleVariants}
            animate={floatingAnimation}
          >
            <Sparkles className="w-6 h-6" />
          </motion.div>
          <motion.div
            className="absolute top-12 right-12 text-purple-vibrant"
            variants={particleVariants}
            animate={sparkleAnimation}
          >
            <Star className="w-4 h-4" />
          </motion.div>
          <motion.div
            className="absolute bottom-16 left-16 text-blue-accent"
            variants={particleVariants}
            animate={{
              ...floatingAnimation,
              transition: { ...floatingAnimation.transition, delay: 1 }
            }}
          >
            <Zap className="w-5 h-5" />
          </motion.div>
        </div>
      )}

      {/* Main logo container */}
      <motion.div
        className="relative z-10 mb-6"
        variants={imageVariants}
      >
        {/* Layered shadow effects */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-vibrant/30 to-purple-vibrant/30 blur-2xl scale-150" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-accent/20 to-blue-vibrant/20 blur-xl scale-125" />
        
        {/* Premium border with gradient */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-blue-vibrant via-purple-vibrant to-blue-accent p-1">
          <div className="w-full h-full rounded-full bg-white p-1">
            <img
              src="/lovable-uploads/e52a884d-0e2f-4470-aae9-56e65adb2de0.png"
              alt="Barsky Design - Professional UX/UI Designer"
              className="w-full h-full rounded-full object-cover object-center"
              loading="eager"
            />
          </div>
        </div>

        {/* Shine overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-50" />
        
        {/* Dynamic sparkles */}
        <motion.div
          className="absolute -top-2 -right-2 w-4 h-4 bg-blue-vibrant rounded-full"
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
        <motion.div
          className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-vibrant rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 1.5
          }}
        />
      </motion.div>

      {/* Text content */}
      <motion.div
        className="relative z-10 space-y-2"
        variants={textVariants}
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-script font-bold text-navy-primary">
          Barsky Design
        </h1>
        <motion.p
          className="text-lg md:text-xl text-neutral-500 font-light tracking-wide"
          variants={subtitleVariants}
        >
          Crafting Exceptional Digital Experiences
        </motion.p>
        <motion.div
          className="flex items-center justify-center gap-2 mt-4"
          variants={subtitleVariants}
        >
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-vibrant to-transparent" />
          <span className="text-sm text-neutral-400 font-medium tracking-widest uppercase">
            UX/UI Designer
          </span>
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-vibrant to-transparent" />
        </motion.div>
      </motion.div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-vibrant to-purple-vibrant rounded-full"
        variants={subtitleVariants}
      />
    </motion.div>
  );
};

export default HeroStatementLogo;
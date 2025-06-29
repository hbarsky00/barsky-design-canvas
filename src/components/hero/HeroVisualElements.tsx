
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap, Target, Users, TrendingUp, Search } from "lucide-react";

const HeroVisualElements: React.FC = () => {
  const floatingIcons = [
    { Icon: Sparkles, delay: 0, x: "10%", y: "20%", color: "text-blue-400" },
    { Icon: Zap, delay: 0.5, x: "85%", y: "15%", color: "text-purple-400" },
    { Icon: Target, delay: 1, x: "15%", y: "70%", color: "text-green-400" },
    { Icon: Users, delay: 1.5, x: "80%", y: "75%", color: "text-orange-400" },
    { Icon: TrendingUp, delay: 2, x: "90%", y: "45%", color: "text-pink-400" },
    { Icon: Search, delay: 2.5, x: "5%", y: "45%", color: "text-indigo-400" },
  ];

  return (
    <>
      {/* Floating Icons */}
      {floatingIcons.map(({ Icon, delay, x, y, color }, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 0.6, scale: 1, rotate: 0 }}
          transition={{ delay: delay + 1, duration: 0.8, ease: "easeOut" }}
          className="absolute hidden lg:block"
          style={{ left: x, top: y }}
        >
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 4 + index * 0.5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: index * 0.2 
            }}
            className={`p-3 glass-card rounded-full ${color} backdrop-blur-sm border border-white/20`}
          >
            <Icon className="w-5 h-5" />
          </motion.div>
        </motion.div>
      ))}

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-grid-gray-900/[0.02] bg-[size:60px_60px] animate-pulse" />
      </div>

      {/* Dynamic Light Rays */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/2 w-full h-full"
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-500/5 to-transparent transform rotate-12" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/2 w-full h-full"
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-purple-500/5 to-transparent transform -rotate-12" />
        </motion.div>
      </div>

      {/* Particle-like elements */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.7,
            ease: "easeInOut"
          }}
          className="absolute w-1 h-1 bg-blue-400 rounded-full"
          style={{
            left: `${20 + i * 10}%`,
            top: `${10 + i * 8}%`,
          }}
        />
      ))}
    </>
  );
};

export default HeroVisualElements;

import React from "react";
import { motion } from "framer-motion";

const AnimatedBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Enhanced gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.4) 0%, transparent 50%),
            linear-gradient(135deg, rgba(30, 58, 138, 0.3) 0%, rgba(91, 33, 182, 0.3) 100%),
            radial-gradient(ellipse at 50% 0%, rgba(99, 102, 241, 0.2) 0%, transparent 60%)
          `,
        }}
        animate={{
          background: [
            `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.4) 0%, transparent 50%),
             radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.4) 0%, transparent 50%),
             linear-gradient(135deg, rgba(30, 58, 138, 0.3) 0%, rgba(91, 33, 182, 0.3) 100%),
             radial-gradient(ellipse at 50% 0%, rgba(99, 102, 241, 0.2) 0%, transparent 60%)`,
            `radial-gradient(circle at 75% 25%, rgba(59, 130, 246, 0.4) 0%, transparent 50%),
             radial-gradient(circle at 25% 75%, rgba(147, 51, 234, 0.4) 0%, transparent 50%),
             linear-gradient(225deg, rgba(30, 58, 138, 0.3) 0%, rgba(91, 33, 182, 0.3) 100%),
             radial-gradient(ellipse at 50% 100%, rgba(99, 102, 241, 0.2) 0%, transparent 60%)`,
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* Enhanced geometric elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl hidden lg:block"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-3/4 right-1/4 w-28 h-28 bg-purple-500/20 rounded-full blur-xl hidden lg:block"
        animate={{
          scale: [1, 0.8, 1.1, 1],
          x: [0, -35, 20, 0],
          y: [0, 35, -20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-24 h-24 bg-indigo-500/15 rounded-full blur-3xl hidden lg:block"
        animate={{
          scale: [1, 1.3, 0.9, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Minimal flowing elements */}
      <motion.div
        className="absolute inset-0 opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 3 }}
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"
            style={{
              top: `${30 + i * 20}%`,
              left: 0,
              right: 0,
            }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 6,
              delay: i * 1.5,
              repeat: Infinity,
              repeatDelay: 4,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default AnimatedBackground;
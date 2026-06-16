import React from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

const FloatingParticles: React.FC = () => {
  const particles: Particle[] = [
    { id: 0, x: 12, y: 18, size: 5, duration: 22, delay: 0, color: "rgba(147, 51, 234, 0.45)" },
    { id: 1, x: 78, y: 22, size: 3, duration: 18, delay: 2.5, color: "rgba(59, 130, 246, 0.5)" },
    { id: 2, x: 88, y: 65, size: 6, duration: 25, delay: 5, color: "rgba(255, 255, 255, 0.35)" },
    { id: 3, x: 8, y: 55, size: 2.5, duration: 16, delay: 1.2, color: "rgba(16, 185, 129, 0.55)" },
    { id: 4, x: 55, y: 78, size: 4, duration: 20, delay: 7, color: "rgba(245, 101, 101, 0.4)" },
    { id: 5, x: 35, y: 35, size: 3.5, duration: 24, delay: 3.8, color: "rgba(99, 102, 241, 0.45)" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, particle.size > 4 ? 0.9 : 0.7, 0],
            scale: particle.id % 2 === 0 ? [0, 1, 0.4] : [0, 1.2, 0.6],
            y: particle.id % 3 === 0 ? [-10, -140, -60] : [-20, -80, -180],
            x: particle.id % 2 === 0 ? [0, 30, -20] : [0, -25, 40],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
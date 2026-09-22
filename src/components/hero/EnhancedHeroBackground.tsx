import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const EnhancedHeroBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  // Parallax transforms
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const particleY = useTransform(scrollY, [0, 500], [0, -100]);
  
  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Particle system
  const particles = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    speed: Math.random() * 0.5 + 0.2,
  }));

  // Geometric shapes
  const geometricShapes = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 60 + 20,
    rotation: Math.random() * 360,
    type: i % 3, // 0: triangle, 1: square, 2: hexagon
  }));

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50" />
      
      {/* Animated mesh gradient with mouse interaction */}
      <motion.div 
        style={{ y: backgroundY }}
        animate={{ 
          background: [
            `radial-gradient(circle at ${20 + mousePosition.x * 10}% ${50 + mousePosition.y * 10}%, rgba(120, 119, 198, 0.15) 0%, transparent 50%)`,
            `radial-gradient(circle at ${80 - mousePosition.x * 10}% ${20 + mousePosition.y * 5}%, rgba(255, 119, 198, 0.15) 0%, transparent 50%)`,
            `radial-gradient(circle at ${40 + mousePosition.x * 5}% ${80 - mousePosition.y * 10}%, rgba(119, 255, 198, 0.15) 0%, transparent 50%)`
          ]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
      />

      {/* Interactive particle field */}
      <motion.div style={{ y: particleY }} className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-blue-400/20 rounded-full backdrop-blur-sm"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              x: [0, Math.sin(particle.id) * 20, 0],
              y: [0, Math.cos(particle.id) * 15, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + particle.speed * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.id * 0.1,
            }}
          />
        ))}
      </motion.div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 hidden sm:block">
        {geometricShapes.map((shape) => (
          <motion.div
            key={shape.id}
            className="absolute"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: shape.size,
              height: shape.size,
            }}
            animate={{
              rotate: [shape.rotation, shape.rotation + 360],
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + shape.id * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: shape.id * 0.3,
            }}
          >
            {shape.type === 0 && (
              <div className="w-full h-full border border-blue-300/30 bg-blue-400/10"
                   style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
            )}
            {shape.type === 1 && (
              <div className="w-full h-full border border-purple-300/30 bg-purple-400/10 rounded-lg transform rotate-45" />
            )}
            {shape.type === 2 && (
              <div className="w-full h-full border border-indigo-300/30 bg-indigo-400/10 rounded-full" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Gradient waves */}
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{
          background: [
            "linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.1), transparent)",
            "linear-gradient(45deg, transparent, rgba(168, 85, 247, 0.1), transparent)",
            "linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.1), transparent)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Matrix-style grid overlay */}
      <div className="absolute inset-0 opacity-[0.02] hidden lg:block"
           style={{
             backgroundImage: `
               linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
               linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
             `,
             backgroundSize: '50px 50px'
           }} />

      {/* Ambient light rays */}
      <motion.div
        className="absolute inset-0 hidden md:block"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{
          background: `conic-gradient(from 0deg, transparent, rgba(59, 130, 246, 0.05), transparent, rgba(168, 85, 247, 0.05), transparent)`,
        }}
      />

      {/* Interactive mouse cursor effect */}
      <motion.div
        className="absolute w-96 h-96 rounded-full pointer-events-none hidden lg:block"
        style={{
          left: `${mousePosition.x * 100}%`,
          top: `${mousePosition.y * 100}%`,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default EnhancedHeroBackground;
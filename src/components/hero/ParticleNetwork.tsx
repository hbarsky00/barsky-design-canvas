import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  connections: number[];
}

interface CornerAnchor {
  x: number;
  y: number;
  id: string;
}

interface ContentBoundary {
  x: number;
  y: number;
  width: number;
  height: number;
  radius?: number;
  type: 'circle' | 'rectangle';
}

const ParticleNetwork: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const cornersRef = useRef<CornerAnchor[]>([]);
  const contentBoundariesRef = useRef<ContentBoundary[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  // Initialize particles and content boundaries
  useEffect(() => {
    const initSystem = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const centerX = w / 2;
      const centerY = h / 2;
      
      // Initialize corner anchors
      cornersRef.current = [
        { x: 0, y: 0, id: 'top-left' },
        { x: w, y: 0, id: 'top-right' },
        { x: 0, y: h, id: 'bottom-left' },
        { x: w, y: h, id: 'bottom-right' }
      ];
      
      // Define content boundaries (estimated positions)
      contentBoundariesRef.current = [
        // Avatar area (circular)
        {
          x: centerX,
          y: centerY - 100,
          width: 120,
          height: 120,
          radius: 80,
          type: 'circle'
        },
        // Main text area (rectangular)
        {
          x: centerX - 300,
          y: centerY - 50,
          width: 600,
          height: 100,
          type: 'rectangle'
        },
        // Name text area
        {
          x: centerX - 200,
          y: centerY + 50,
          width: 400,
          height: 60,
          type: 'rectangle'
        },
        // URL and location text
        {
          x: centerX - 150,
          y: centerY + 110,
          width: 300,
          height: 80,
          type: 'rectangle'
        },
        // Icons row (individual circular boundaries)
        {
          x: centerX - 150,
          y: centerY + 200,
          width: 60,
          height: 60,
          radius: 40,
          type: 'circle'
        },
        {
          x: centerX - 50,
          y: centerY + 200,
          width: 60,
          height: 60,
          radius: 40,
          type: 'circle'
        },
        {
          x: centerX + 50,
          y: centerY + 200,
          width: 60,
          height: 60,
          radius: 40,
          type: 'circle'
        },
        {
          x: centerX + 150,
          y: centerY + 200,
          width: 60,
          height: 60,
          radius: 40,
          type: 'circle'
        },
        // Continue button area
        {
          x: centerX,
          y: h - 100,
          width: 80,
          height: 80,
          radius: 50,
          type: 'circle'
        }
      ];
      
      // Initialize particles throughout the entire viewport, avoiding content
      const particleCount = 60;
      const newParticles: Particle[] = [];
      
      for (let i = 0; i < particleCount; i++) {
        let x, y;
        let attempts = 0;
        
        do {
          // Distribute particles across the entire viewport
          x = Math.random() * w;
          y = Math.random() * h;
          attempts++;
        } while (isInContentBoundary(x, y, 40) && attempts < 20);
        
        newParticles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.2 + 0.05,
          connections: []
        });
      }
      
      particlesRef.current = newParticles;
    };

    initSystem();
    window.addEventListener('resize', initSystem);
    return () => window.removeEventListener('resize', initSystem);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      // Reset the transform then scale for crisp rendering
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    let isVisible = true;

    const animate = () => {
      if (!isVisible) return;

      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Boundary collision
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // Mouse interaction
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const distance = Math.hypot(dx, dy);

        if (distance < 100) {
          p.x += dx * 0.002;
          p.y += dy * 0.002;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(220, 70%, 60%, ${p.opacity})`;
        ctx.fill();
      }

      // Draw corner-to-content flow lines
      drawCornerFlowLines(ctx, w, h);
      
      // Draw particle connections (reduced)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p = particles[i];
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const distance = Math.hypot(dx, dy);

          if (distance < 180 && !lineIntersectsContent(p.x, p.y, q.x, q.y)) {
            const opacity = ((180 - distance) / 180) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `hsla(220, 70%, 60%, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          // Kickstart animation if it was paused
          if (!animationRef.current) {
            animationRef.current = requestAnimationFrame(animate);
          }
        } else if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = undefined;
        }
      });
    });

    observer.observe(canvas);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Helper function to check if a point is within content boundaries
  const isInContentBoundary = (x: number, y: number, padding: number = 20): boolean => {
    return contentBoundariesRef.current.some(boundary => {
      if (boundary.type === 'circle') {
        const dx = x - boundary.x;
        const dy = y - boundary.y;
        const distance = Math.hypot(dx, dy);
        return distance < (boundary.radius || 50) + padding;
      } else {
        return (
          x > boundary.x - boundary.width / 2 - padding &&
          x < boundary.x + boundary.width / 2 + padding &&
          y > boundary.y - boundary.height / 2 - padding &&
          y < boundary.y + boundary.height / 2 + padding
        );
      }
    });
  };

  // Helper function to check if a line intersects content
  const lineIntersectsContent = (x1: number, y1: number, x2: number, y2: number): boolean => {
    // Sample points along the line to check for intersection
    const steps = 10;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = x1 + (x2 - x1) * t;
      const y = y1 + (y2 - y1) * t;
      if (isInContentBoundary(x, y, 10)) {
        return true;
      }
    }
    return false;
  };

  // Draw flowing lines from corners that curve around content
  const drawCornerFlowLines = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const corners = cornersRef.current;
    const centerX = w / 2;
    const centerY = h / 2;

    corners.forEach(corner => {
      // Create flowing lines from each corner toward center
      const numLines = 7;
      
      for (let i = 0; i < numLines; i++) {
        const angle = Math.atan2(centerY - corner.y, centerX - corner.x);
        const spread = (Math.PI / 6) * (i - 1); // 30 degree spread
        const lineAngle = angle + spread;
        
        // Create curved path that flows around content
        const controlDistance = Math.min(w, h) * 0.3;
        const endDistance = Math.min(w, h) * 0.4;
        
        const startX = corner.x;
        const startY = corner.y;
        
        // Control point for curve
        const controlX = startX + Math.cos(lineAngle) * controlDistance;
        const controlY = startY + Math.sin(lineAngle) * controlDistance;
        
        // End point (closer to center but not touching content)
        const endX = startX + Math.cos(lineAngle) * endDistance;
        const endY = startY + Math.sin(lineAngle) * endDistance;
        
        // Check if the curve would intersect content, if so, modify it
        if (!lineIntersectsContent(startX, startY, endX, endY)) {
          // Draw curved line with gradient opacity
          const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
          gradient.addColorStop(0, 'hsla(220, 70%, 60%, 0.3)');
          gradient.addColorStop(0.7, 'hsla(220, 70%, 60%, 0.1)');
          gradient.addColorStop(1, 'hsla(220, 70%, 60%, 0)');
          
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.quadraticCurveTo(controlX, controlY, endX, endY);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    });

    // Add subtle radial lines from corners
    corners.forEach(corner => {
      const numRadialLines = 4;
      
      for (let i = 0; i < numRadialLines; i++) {
        const baseAngle = Math.atan2(centerY - corner.y, centerX - corner.x);
        const offsetAngle = (Math.PI / 4) * (i - 0.5);
        const lineAngle = baseAngle + offsetAngle;
        
        const startX = corner.x;
        const startY = corner.y;
        const length = Math.min(w, h) * 0.2;
        
        const endX = startX + Math.cos(lineAngle) * length;
        const endY = startY + Math.sin(lineAngle) * length;
        
        if (!lineIntersectsContent(startX, startY, endX, endY)) {
          const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
          gradient.addColorStop(0, 'hsla(220, 70%, 60%, 0.15)');
          gradient.addColorStop(1, 'hsla(220, 70%, 60%, 0)');
          
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });
  };

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      style={{ zIndex: 1 }}
    />
  );
};

export default ParticleNetwork;
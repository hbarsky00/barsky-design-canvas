import React, { useRef, useEffect, memo } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

interface ContentBoundary {
  x: number;
  y: number;
  width: number;
  height: number;
  radius?: number;
  type: 'circle' | 'rectangle';
}

const ParticleNetwork: React.FC = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const contentBoundariesRef = useRef<ContentBoundary[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const isVisibleRef = useRef(true);
  const isTabVisibleRef = useRef(true);

  // Initialize particles - reduced count for performance
  useEffect(() => {
    const initSystem = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const centerX = w / 2;
      const centerY = h / 2;
      
      // Define content boundaries
      contentBoundariesRef.current = [
        { x: centerX, y: centerY - 100, width: 120, height: 120, radius: 80, type: 'circle' },
        { x: centerX - 300, y: centerY - 50, width: 600, height: 100, type: 'rectangle' },
        { x: centerX - 200, y: centerY + 50, width: 400, height: 60, type: 'rectangle' },
        { x: centerX - 150, y: centerY + 110, width: 300, height: 80, type: 'rectangle' },
        { x: centerX, y: h - 100, width: 80, height: 80, radius: 50, type: 'circle' }
      ];
      
      // Reduced particle count: 25 mobile, 35 desktop
      const isMobile = w < 768;
      const particleCount = isMobile ? 25 : 35;
      const newParticles: Particle[] = [];
      
      for (let i = 0; i < particleCount; i++) {
        let x, y, attempts = 0;
        do {
          x = Math.random() * w;
          y = Math.random() * h;
          attempts++;
        } while (isInContentBoundary(x, y, 40) && attempts < 15);
        
        newParticles.push({
          x, y,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          size: Math.random() * 1.2 + 0.5,
          opacity: Math.random() * 0.15 + 0.05,
        });
      }
      
      particlesRef.current = newParticles;
    };

    const isInContentBoundary = (x: number, y: number, padding: number = 20): boolean => {
      return contentBoundariesRef.current.some(boundary => {
        if (boundary.type === 'circle') {
          const dx = x - boundary.x;
          const dy = y - boundary.y;
          return Math.hypot(dx, dy) < (boundary.radius || 50) + padding;
        }
        return x > boundary.x - boundary.width / 2 - padding &&
               x < boundary.x + boundary.width / 2 + padding &&
               y > boundary.y - boundary.height / 2 - padding &&
               y < boundary.y + boundary.height / 2 + padding;
      });
    };

    initSystem();
    window.addEventListener('resize', initSystem);
    return () => window.removeEventListener('resize', initSystem);
  }, []);

  // Tab visibility - pause when tab hidden
  useEffect(() => {
    const handleVisibility = () => {
      isTabVisibleRef.current = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Mouse tracking - throttled
  useEffect(() => {
    let lastMove = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMove < 32) return; // ~30fps throttle
      lastMove = now;
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation loop - optimized
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    let frameCount = 0;

    const animate = () => {
      if (!isVisibleRef.current || !isTabVisibleRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      frameCount++;
      // Skip every other frame on mobile for performance
      const isMobile = window.innerWidth < 768;
      if (isMobile && frameCount % 2 !== 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const len = particles.length;

      // Update and draw particles
      for (let i = 0; i < len; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // Mouse interaction - simplified
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = dx * dx + dy * dy;
        if (dist < 10000) { // 100^2
          p.x += dx * 0.001;
          p.y += dy * 0.001;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, 6.28);
        ctx.fillStyle = `hsla(220,70%,60%,${p.opacity})`;
        ctx.fill();
      }

      // Draw connections - skip every other particle for performance
      for (let i = 0; i < len; i += 2) {
        for (let j = i + 2; j < len; j += 2) {
          const p = particles[i];
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < 25600) { // 160^2
            const opacity = (1 - distSq / 25600) * 0.2;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `hsla(220,70%,60%,${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Intersection observer to pause when off-screen
    const observer = new IntersectionObserver((entries) => {
      isVisibleRef.current = entries[0]?.isIntersecting ?? true;
    }, { threshold: 0.1 });

    observer.observe(canvas);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      observer.disconnect();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1, opacity: 1, willChange: 'transform' }}
    />
  );
});

ParticleNetwork.displayName = 'ParticleNetwork';

export default ParticleNetwork;

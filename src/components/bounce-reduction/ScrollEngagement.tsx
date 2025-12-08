import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ScrollEngagement: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined' || typeof document === 'undefined') return;
      
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary/20 z-50"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: scrollProgress / 100 }}
      style={{ transformOrigin: '0%' }}
    >
      <div className="h-full bg-primary" />
    </motion.div>
  );
};

export default ScrollEngagement;
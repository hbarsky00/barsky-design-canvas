import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface EnhancedWinampVisualizerProps {
  className?: string;
  fullScreen?: boolean;
}

const EnhancedWinampVisualizer: React.FC<EnhancedWinampVisualizerProps> = ({ 
  className = "", 
  fullScreen = false 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [mode, setMode] = useState<'spectrum' | 'oscilloscope' | 'circular'>('spectrum');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(fullScreen);
  
  // Simulated frequency data
  const frequencyData = useRef(new Array(128).fill(0));
  const peakData = useRef(new Array(128).fill(0));
  const peakHoldTime = useRef(new Array(128).fill(0));
  
  // Enhanced color schemes with gradients
  const colorSchemes = {
    aurora: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'],
    matrix: ['#00ff41', '#00cc33', '#009926', '#00ff00'],
    neon: ['#ff00ff', '#00ffff', '#ffff00', '#ff0080'],
    sunset: ['#ff6b35', '#f7931e', '#ffd23f', '#ff4757'],
    ocean: ['#0066cc', '#0099ff', '#00ccff', '#66d9ff']
  };
  
  const [currentScheme, setCurrentScheme] = useState<keyof typeof colorSchemes>('aurora');

  // Enhanced frequency simulation with more dynamic movement
  const updateFrequencyData = () => {
    const time = Date.now() * 0.002;
    
    frequencyData.current.forEach((_, i) => {
      // Create complex wave patterns
      const bassFreq = Math.sin(time * 1.5 + i * 0.08) * 0.6 + 0.4;
      const midFreq = Math.sin(time * 3 + i * 0.15) * 0.4 + 0.3;
      const highFreq = Math.sin(time * 6 + i * 0.3) * 0.3 + 0.2;
      const pulse = Math.sin(time * 0.5) * 0.3 + 0.7;
      
      let intensity = 0;
      if (i < 32) {
        // Bass - more pronounced with pulse
        intensity = (bassFreq * pulse * 0.9 + Math.random() * 0.1) * 0.8;
      } else if (i < 80) {
        // Mid frequencies
        intensity = (midFreq * 0.7 + Math.random() * 0.2) * 0.7;
      } else {
        // High frequencies - more erratic
        intensity = (highFreq * 0.5 + Math.random() * 0.3) * 0.6;
      }
      
      // Apply smoothing and animation
      frequencyData.current[i] = frequencyData.current[i] * 0.8 + intensity * 0.2;
      
      // Enhanced peak hold with decay
      if (frequencyData.current[i] > peakData.current[i]) {
        peakData.current[i] = frequencyData.current[i];
        peakHoldTime.current[i] = 45;
      } else if (peakHoldTime.current[i] > 0) {
        peakHoldTime.current[i]--;
      } else {
        peakData.current[i] *= 0.93;
      }
    });
  };

  // Enhanced spectrum with glow and particle effects
  const renderEnhancedSpectrum = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const barWidth = width / frequencyData.current.length;
    const colors = colorSchemes[currentScheme];
    
    // Add background ambient glow
    const bgGradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height)/2);
    bgGradient.addColorStop(0, `${colors[0]}10`);
    bgGradient.addColorStop(1, 'transparent');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);
    
    frequencyData.current.forEach((value, i) => {
      const barHeight = value * height * 0.85;
      const x = i * barWidth;
      const y = height - barHeight;
      
      // Create animated gradient
      const gradient = ctx.createLinearGradient(0, height, 0, 0);
      gradient.addColorStop(0, colors[0]);
      gradient.addColorStop(0.3, colors[1]);
      gradient.addColorStop(0.7, colors[2]);
      gradient.addColorStop(1, colors[3] || colors[0]);
      
      // Main bar with glow
      ctx.shadowColor = colors[1];
      ctx.shadowBlur = isFullScreen ? 15 : 8;
      ctx.fillStyle = gradient;
      ctx.fillRect(x + 1, y, barWidth - 2, barHeight);
      
      // Peak indicator with enhanced glow
      const peakY = height - (peakData.current[i] * height * 0.85);
      ctx.shadowBlur = isFullScreen ? 20 : 10;
      ctx.shadowColor = colors[2];
      ctx.fillStyle = colors[3] || colors[2];
      ctx.fillRect(x, peakY - 3, barWidth, 3);
      
      // Add sparkle effect for high values
      if (value > 0.7 && Math.random() > 0.8) {
        ctx.shadowBlur = 25;
        ctx.shadowColor = colors[0];
        ctx.fillStyle = 'white';
        ctx.fillRect(x + barWidth/2 - 1, y + Math.random() * barHeight, 2, 2);
      }
    });
    
    ctx.shadowBlur = 0;
  };

  // Enhanced oscilloscope with wave effects
  const renderEnhancedOscilloscope = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const colors = colorSchemes[currentScheme];
    const centerY = height / 2;
    const amplitude = height * 0.4;
    
    // Draw multiple wave layers
    for (let layer = 0; layer < 3; layer++) {
      ctx.strokeStyle = colors[layer] || colors[0];
      ctx.lineWidth = isFullScreen ? 4 - layer : 3 - layer;
      ctx.shadowColor = colors[layer] || colors[0];
      ctx.shadowBlur = 15;
      ctx.beginPath();
      
      for (let i = 0; i < width; i += 2) {
        const freqIndex = Math.floor((i / width) * frequencyData.current.length);
        const value = frequencyData.current[freqIndex] || 0;
        const phase = layer * Math.PI / 3;
        const y = centerY + Math.sin((i / width) * Math.PI * 6 + Date.now() * 0.008 + phase) * amplitude * value;
        
        if (i === 0) {
          ctx.moveTo(i, y);
        } else {
          ctx.lineTo(i, y);
        }
      }
      
      ctx.stroke();
    }
    
    ctx.shadowBlur = 0;
  };

  // Enhanced circular with particle system
  const renderEnhancedCircular = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const baseRadius = Math.min(width, height) * 0.25;
    const colors = colorSchemes[currentScheme];
    
    // Draw outer ring effect
    for (let ring = 0; ring < 3; ring++) {
      const ringRadius = baseRadius + ring * 20;
      
      frequencyData.current.forEach((value, i) => {
        const angle = (i / frequencyData.current.length) * Math.PI * 2;
        const barLength = value * (isFullScreen ? 100 : 60);
        
        const x1 = centerX + Math.cos(angle) * ringRadius;
        const y1 = centerY + Math.sin(angle) * ringRadius;
        const x2 = centerX + Math.cos(angle) * (ringRadius + barLength);
        const y2 = centerY + Math.sin(angle) * (ringRadius + barLength);
        
        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, colors[ring] || colors[0]);
        gradient.addColorStop(1, colors[(ring + 1) % colors.length]);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = isFullScreen ? 4 : 3;
        ctx.shadowColor = colors[ring] || colors[0];
        ctx.shadowBlur = 12;
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });
    }
    
    ctx.shadowBlur = 0;
  };

  // Animation loop
  const animate = () => {
    if (!isPlaying) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const { width, height } = canvas;
    
    // Clear with fade effect
    ctx.fillStyle = isFullScreen ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, width, height);
    
    updateFrequencyData();
    
    // Render based on mode
    switch (mode) {
      case 'spectrum':
        renderEnhancedSpectrum(ctx, width, height);
        break;
      case 'oscilloscope':
        renderEnhancedOscilloscope(ctx, width, height);
        break;
      case 'circular':
        renderEnhancedCircular(ctx, width, height);
        break;
    }
    
    animationRef.current = requestAnimationFrame(animate);
  };

  // Setup and resize handling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    animate();
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mode, isPlaying, currentScheme, isFullScreen]);

  const cycleMode = () => {
    const modes: typeof mode[] = ['spectrum', 'oscilloscope', 'circular'];
    const currentIndex = modes.indexOf(mode);
    setMode(modes[(currentIndex + 1) % modes.length]);
  };

  const cycleColorScheme = () => {
    const schemes = Object.keys(colorSchemes) as Array<keyof typeof colorSchemes>;
    const currentIndex = schemes.indexOf(currentScheme);
    setCurrentScheme(schemes[(currentIndex + 1) % schemes.length]);
  };

  if (isFullScreen) {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none">
        <canvas
          ref={canvasRef}
          className="w-full h-full opacity-30"
          style={{ imageRendering: 'auto' }}
        />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-black/10 to-gray-800/20" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-4 right-4 w-80 h-32 md:w-96 md:h-36 lg:w-[28rem] lg:h-40 pointer-events-auto group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 rounded-lg p-1 shadow-2xl">
          <div className="w-full h-full bg-black rounded-md overflow-hidden relative border border-gray-600">
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                 style={{
                   backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 0, 0.03) 2px, rgba(0, 255, 0, 0.03) 4px)',
                 }} />
            
            <canvas
              ref={canvasRef}
              className="w-full h-full cursor-pointer transition-opacity group-hover:opacity-90"
              onClick={(e) => {
                e.stopPropagation();
                cycleMode();
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                e.stopPropagation();
                cycleColorScheme();
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                setIsFullScreen(true);
              }}
            />
            
            <div className="absolute top-2 left-3 flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-mono">
                ENHANCED {mode.toUpperCase()}
              </span>
            </div>
            
            <div className="absolute bottom-2 left-3 text-green-400 text-xs font-mono">
              ♪ PORTFOLIO.ENHANCED
            </div>
            
            <div className="absolute top-2 right-3 flex space-x-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlaying(!isPlaying);
                  if (!isPlaying) animate();
                }}
                className="text-green-400 hover:text-green-300 transition-colors text-xs"
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFullScreen(true);
                }}
                className="text-green-400 hover:text-green-300 transition-colors text-xs"
                title="Full Screen"
              >
                ⛶
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EnhancedWinampVisualizer;
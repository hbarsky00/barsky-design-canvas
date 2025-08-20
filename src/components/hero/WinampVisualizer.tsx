import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface WinampVisualizerProps {
  className?: string;
}

const WinampVisualizer: React.FC<WinampVisualizerProps> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [mode, setMode] = useState<'spectrum' | 'oscilloscope' | 'circular'>('spectrum');
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Simulated frequency data
  const frequencyData = useRef(new Array(64).fill(0));
  const peakData = useRef(new Array(64).fill(0));
  const peakHoldTime = useRef(new Array(64).fill(0));
  
  // Color schemes for retro feel
  const colorSchemes = {
    matrix: ['#00ff41', '#00cc33', '#009926'],
    neon: ['#ff00ff', '#00ffff', '#ffff00'],
    classic: ['#00ff00', '#ffff00', '#ff0000'],
    retro: ['#ff6b35', '#f7931e', '#ffd23f']
  };
  
  const [currentScheme, setCurrentScheme] = useState<keyof typeof colorSchemes>('matrix');

  // Generate realistic frequency simulation
  const updateFrequencyData = () => {
    const time = Date.now() * 0.001;
    
    frequencyData.current.forEach((_, i) => {
      // Create multiple frequency bands with different behaviors
      const bassFreq = Math.sin(time * 2 + i * 0.1) * 0.5 + 0.5;
      const midFreq = Math.sin(time * 4 + i * 0.2) * 0.3 + 0.3;
      const highFreq = Math.sin(time * 8 + i * 0.4) * 0.2 + 0.1;
      
      // Simulate different frequency ranges
      let intensity = 0;
      if (i < 16) {
        // Bass frequencies - more pronounced
        intensity = bassFreq * 0.8 + Math.random() * 0.2;
      } else if (i < 40) {
        // Mid frequencies
        intensity = midFreq * 0.6 + Math.random() * 0.3;
      } else {
        // High frequencies - more erratic
        intensity = highFreq * 0.4 + Math.random() * 0.4;
      }
      
      // Apply some smoothing
      frequencyData.current[i] = frequencyData.current[i] * 0.7 + intensity * 0.3;
      
      // Update peak hold
      if (frequencyData.current[i] > peakData.current[i]) {
        peakData.current[i] = frequencyData.current[i];
        peakHoldTime.current[i] = 30; // Hold for 30 frames
      } else if (peakHoldTime.current[i] > 0) {
        peakHoldTime.current[i]--;
      } else {
        peakData.current[i] *= 0.95; // Slow decay
      }
    });
  };

  // Render spectrum analyzer
  const renderSpectrum = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const barWidth = width / frequencyData.current.length;
    const colors = colorSchemes[currentScheme];
    
    frequencyData.current.forEach((value, i) => {
      const barHeight = value * height * 0.8;
      const x = i * barWidth;
      const y = height - barHeight;
      
      // Create gradient for each bar
      const gradient = ctx.createLinearGradient(0, height, 0, y);
      gradient.addColorStop(0, colors[0]);
      gradient.addColorStop(0.5, colors[1]);
      gradient.addColorStop(1, colors[2]);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth - 1, barHeight);
      
      // Draw peak hold
      const peakY = height - (peakData.current[i] * height * 0.8);
      ctx.fillStyle = colors[2];
      ctx.fillRect(x, peakY - 2, barWidth - 1, 2);
      
      // Add glow effect
      ctx.shadowColor = colors[1];
      ctx.shadowBlur = 5;
      ctx.fillRect(x, y, barWidth - 1, barHeight);
      ctx.shadowBlur = 0;
    });
  };

  // Render oscilloscope
  const renderOscilloscope = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const colors = colorSchemes[currentScheme];
    ctx.strokeStyle = colors[1];
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    const centerY = height / 2;
    const amplitude = height * 0.3;
    
    for (let i = 0; i < width; i++) {
      const freqIndex = Math.floor((i / width) * frequencyData.current.length);
      const value = frequencyData.current[freqIndex] || 0;
      const y = centerY + Math.sin((i / width) * Math.PI * 4 + Date.now() * 0.005) * amplitude * value;
      
      if (i === 0) {
        ctx.moveTo(i, y);
      } else {
        ctx.lineTo(i, y);
      }
    }
    
    ctx.stroke();
    
    // Add glow
    ctx.shadowColor = colors[1];
    ctx.shadowBlur = 10;
    ctx.stroke();
    ctx.shadowBlur = 0;
  };

  // Render circular visualizer
  const renderCircular = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.3;
    const colors = colorSchemes[currentScheme];
    
    frequencyData.current.forEach((value, i) => {
      const angle = (i / frequencyData.current.length) * Math.PI * 2;
      const barLength = value * radius * 0.8;
      
      const x1 = centerX + Math.cos(angle) * radius;
      const y1 = centerY + Math.sin(angle) * radius;
      const x2 = centerX + Math.cos(angle) * (radius + barLength);
      const y2 = centerY + Math.sin(angle) * (radius + barLength);
      
      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      gradient.addColorStop(0, colors[0]);
      gradient.addColorStop(1, colors[2]);
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      
      // Add glow
      ctx.shadowColor = colors[1];
      ctx.shadowBlur = 5;
      ctx.stroke();
      ctx.shadowBlur = 0;
    });
  };

  // Animation loop
  const animate = () => {
    if (!isPlaying) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const { width, height } = canvas;
    
    // Clear canvas with fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, width, height);
    
    // Update frequency data
    updateFrequencyData();
    
    // Render based on current mode
    switch (mode) {
      case 'spectrum':
        renderSpectrum(ctx, width, height);
        break;
      case 'oscilloscope':
        renderOscilloscope(ctx, width, height);
        break;
      case 'circular':
        renderCircular(ctx, width, height);
        break;
    }
    
    animationRef.current = requestAnimationFrame(animate);
  };

  // Setup canvas and start animation
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
  }, [mode, isPlaying, currentScheme]);

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

  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* Retro background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
      
      {/* Visualizer container with retro chrome border */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-4 right-4 w-72 h-24 md:w-80 md:h-28 lg:w-96 lg:h-32"
      >
        {/* Chrome border effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 rounded-lg p-1">
          <div className="w-full h-full bg-black rounded-md overflow-hidden relative">
            {/* Scanlines effect */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                 style={{
                   backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 0, 0.03) 2px, rgba(0, 255, 0, 0.03) 4px)',
                 }} />
            
            {/* Canvas for visualizer */}
            <canvas
              ref={canvasRef}
              className="w-full h-full cursor-pointer"
              onClick={cycleMode}
              onContextMenu={(e) => {
                e.preventDefault();
                cycleColorScheme();
              }}
              style={{ imageRendering: 'pixelated' }}
            />
            
            {/* Control overlay */}
            <div className="absolute top-1 left-2 flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-mono">
                WINAMP {mode.toUpperCase()}
              </span>
            </div>
            
            {/* Now playing text */}
            <div className="absolute bottom-1 left-2 text-green-400 text-xs font-mono">
              ♪ NOW PLAYING: PORTFOLIO.MP3
            </div>
            
            {/* Play/pause toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying(!isPlaying);
                if (!isPlaying) animate();
              }}
              className="absolute top-1 right-2 text-green-400 hover:text-green-300 transition-colors"
            >
              <span className="text-xs font-mono">{isPlaying ? '⏸' : '▶'}</span>
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export default WinampVisualizer;
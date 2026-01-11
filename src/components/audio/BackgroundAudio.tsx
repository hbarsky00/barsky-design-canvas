
import React, { useEffect, useRef, useState } from 'react';

interface BackgroundAudioProps {
  src: string;
  volume?: number;
}

const BackgroundAudio: React.FC<BackgroundAudioProps> = ({ 
  src, 
  volume = 0.15 
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Configure audio
    audio.volume = volume;
    audio.loop = true;
    audio.preload = 'none'; // Don't preload until user interaction

    // Deferred audio loading for performance
    const tryAutoplay = async () => {
      try {
        await audio.play();
      } catch (error) {
        const handleFirstInteraction = () => {
          if (!hasUserInteracted) {
            setHasUserInteracted(true);
            audio.play().catch(() => {});
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('keydown', handleFirstInteraction);
          }
        };
        document.addEventListener('click', handleFirstInteraction);
        document.addEventListener('keydown', handleFirstInteraction);
      }
    };

    // Delay audio loading for 20 seconds to prioritize critical resources
    const timer = 'requestIdleCallback' in window 
      ? window.requestIdleCallback(() => setTimeout(tryAutoplay, 20000), { timeout: 25000 })
      : setTimeout(tryAutoplay, 20000);

    return () => {
      clearTimeout(timer);
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [src, volume, hasUserInteracted]);

  // Handle page visibility changes (pause when tab is not active)
  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    const handleVisibilityChange = () => {
      const audio = audioRef.current;
      if (!audio) return;

      if (document.hidden) {
        audio.pause();
      } else if (hasUserInteracted || !audio.paused) {
        audio.play().catch(console.error);
      }
    };

    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', handleVisibilityChange);
      return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }
  }, [hasUserInteracted]);

  return (
    <audio
      ref={audioRef}
      src={src}
      style={{ display: 'none' }}
      aria-hidden="true"
    />
  );
};

export default BackgroundAudio;

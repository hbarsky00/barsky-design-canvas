
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
    audio.preload = 'auto';

    // Try to play immediately (will work if autoplay is allowed)
    const tryAutoplay = async () => {
      try {
        await audio.play();
        console.log('Background music started automatically');
      } catch (error) {
        console.log('Autoplay blocked, waiting for user interaction');
        // Set up event listeners for first user interaction
        const handleFirstInteraction = () => {
          if (!hasUserInteracted) {
            setHasUserInteracted(true);
            audio.play().catch(console.error);
            // Remove listeners after first interaction
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('keydown', handleFirstInteraction);
            document.removeEventListener('scroll', handleFirstInteraction);
          }
        };

        document.addEventListener('click', handleFirstInteraction);
        document.addEventListener('keydown', handleFirstInteraction);  
        document.addEventListener('scroll', handleFirstInteraction);
      }
    };

    // Start playback attempt after a short delay to not interfere with page load
    const timer = setTimeout(tryAutoplay, 1000);

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
    const handleVisibilityChange = () => {
      const audio = audioRef.current;
      if (!audio) return;

      if (document.hidden) {
        audio.pause();
      } else if (hasUserInteracted || !audio.paused) {
        audio.play().catch(console.error);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
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

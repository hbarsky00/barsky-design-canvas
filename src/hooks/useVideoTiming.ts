import { useEffect, useState, RefObject } from 'react';

interface VideoTimingHook {
  currentTime: number;
  isPlaying: boolean;
  hasReachedTimestamp: (timestamp: number) => boolean;
  addTimestampTrigger: (timestamp: number, callback: () => void) => void;
}

export const useVideoTiming = (
  videoRef: RefObject<HTMLVideoElement>,
  windowBangingTimestamp: number = 3.5 // Default timestamp for window banging moment
): VideoTimingHook => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timestampTriggers, setTimestampTriggers] = useState<Map<number, () => void>>(new Map());
  const [triggeredTimestamps, setTriggeredTimestamps] = useState<Set<number>>(new Set());

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const time = video.currentTime;
      setCurrentTime(time);

      // Check for timestamp triggers
      timestampTriggers.forEach((callback, timestamp) => {
        if (time >= timestamp && !triggeredTimestamps.has(timestamp)) {
          callback();
          setTriggeredTimestamps(prev => new Set(prev).add(timestamp));
        }
      });
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    
    const handleSeeked = () => {
      // Reset triggered timestamps when video is seeked/restarted
      setTriggeredTimestamps(new Set());
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('seeked', handleSeeked);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, [videoRef, timestampTriggers, triggeredTimestamps]);

  const hasReachedTimestamp = (timestamp: number): boolean => {
    return currentTime >= timestamp;
  };

  const addTimestampTrigger = (timestamp: number, callback: () => void) => {
    setTimestampTriggers(prev => new Map(prev).set(timestamp, callback));
  };

  return {
    currentTime,
    isPlaying,
    hasReachedTimestamp,
    addTimestampTrigger,
  };
};

import { useRef, useCallback } from 'react';
import { ChangeQueue, SyncConfig } from './types';

export const useChangeQueue = (config: SyncConfig) => {
  const changeQueueRef = useRef<ChangeQueue[]>([]);
  const lastChangeTimeRef = useRef<number>(0);

  // Smart change detection - only meaningful changes
  const isMeaningfulChange = useCallback((newChange: ChangeQueue, existingChanges: ChangeQueue[]): boolean => {
    const existing = existingChanges.find(c => c.type === newChange.type && c.key === newChange.key);
    
    if (!existing) return true;
    
    // For text, ignore minimal changes
    if (newChange.type === 'text') {
      const oldText = existing.value || '';
      const newText = newChange.value || '';
      
      // Ignore changes less than 3 characters or less than 10% change
      const lengthDiff = Math.abs(newText.length - oldText.length);
      const changeRatio = lengthDiff / Math.max(oldText.length, 1);
      
      return lengthDiff >= 3 || changeRatio >= 0.1;
    }
    
    return existing.value !== newChange.value;
  }, []);

  // Queue change with smart detection
  const queueChange = useCallback((type: 'text' | 'image' | 'content_block', key: string, value: any): boolean => {
    const newChange: ChangeQueue = {
      id: `${type}_${key}_${Date.now()}`,
      type,
      key,
      value,
      timestamp: Date.now()
    };

    console.log('🔄 ChangeQueue: Evaluating change for queue:', { type, key, valuePreview: typeof value === 'string' ? value.substring(0, 30) + '...' : value });

    // Smart change detection
    if (!isMeaningfulChange(newChange, changeQueueRef.current)) {
      console.log('⏭️ ChangeQueue: Skipping non-meaningful change');
      return false;
    }

    // Add to queue, replacing any existing change with same type/key
    changeQueueRef.current = [
      ...changeQueueRef.current.filter(c => !(c.type === type && c.key === key)),
      newChange
    ];

    // Prevent queue from growing too large
    if (changeQueueRef.current.length > config.MAX_QUEUE_SIZE) {
      changeQueueRef.current = changeQueueRef.current.slice(-config.MAX_QUEUE_SIZE);
      console.warn('⚠️ ChangeQueue: Queue size limit reached, truncating old changes');
    }

    lastChangeTimeRef.current = Date.now();

    console.log('📝 ChangeQueue: Change queued, total pending:', changeQueueRef.current.length);
    return true;
  }, [isMeaningfulChange, config.MAX_QUEUE_SIZE]);

  const clearQueue = useCallback(() => {
    changeQueueRef.current = [];
  }, []);

  const getQueueSize = useCallback(() => {
    return changeQueueRef.current.length;
  }, []);

  const getBatch = useCallback((size: number): ChangeQueue[] => {
    return changeQueueRef.current.splice(0, size);
  }, []);

  return {
    queueChange,
    clearQueue,
    getQueueSize,
    getBatch,
    changeQueueRef,
    lastChangeTimeRef
  };
};

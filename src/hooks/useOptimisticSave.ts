import { useState, useCallback, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

interface UseOptimisticSaveOptions<T> {
  saveFn: (data: T) => Promise<void>;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  debounceMs?: number;
}

export const useOptimisticSave = <T>({
  saveFn,
  onSuccess,
  onError,
  debounceMs = 2000
}: UseOptimisticSaveOptions<T>) => {
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout>();
  const pendingDataRef = useRef<T | null>(null);

  const saveMutation = useMutation({
    mutationFn: saveFn,
    onMutate: () => {
      setIsSaving(true);
    },
    onSuccess: () => {
      setIsDirty(false);
      setIsSaving(false);
      setLastSaved(new Date());
      pendingDataRef.current = null;
      onSuccess?.();
      toast.success('Content saved successfully', {
        duration: 2000,
      });
    },
    onError: (error: Error) => {
      setIsSaving(false);
      onError?.(error);
      toast.error('Failed to save content', {
        description: error.message,
        action: {
          label: 'Retry',
          onClick: () => {
            if (pendingDataRef.current) {
              saveOptimistically(pendingDataRef.current);
            }
          },
        },
      });
    },
  });

  const saveOptimistically = useCallback((data: T) => {
    setIsDirty(true);
    pendingDataRef.current = data;

    // Clear existing timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Set new debounced save
    debounceTimeoutRef.current = setTimeout(() => {
      if (pendingDataRef.current) {
        saveMutation.mutate(pendingDataRef.current);
      }
    }, debounceMs);
  }, [saveMutation, debounceMs]);

  const saveImmediately = useCallback(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    if (pendingDataRef.current) {
      saveMutation.mutate(pendingDataRef.current);
    }
  }, [saveMutation]);

  const cancelSave = useCallback(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    setIsDirty(false);
    pendingDataRef.current = null;
  }, []);

  return {
    saveOptimistically,
    saveImmediately,
    cancelSave,
    isDirty,
    isSaving,
    lastSaved,
    isError: saveMutation.isError,
    error: saveMutation.error,
  };
};
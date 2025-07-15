/**
 * Unified Optimization Hook - Replaces multiple performance hooks
 * Single hook that manages all performance, accessibility, and SEO optimizations
 */

import { useEffect } from 'react';
import { unifiedPerformanceManager } from '@/utils/unifiedPerformanceManager';
import { accessibilityManager } from '@/utils/accessibilityManager';

export const useUnifiedOptimization = () => {
  try {
    useEffect(() => {
      // Initialize unified systems
      unifiedPerformanceManager.initialize();
      accessibilityManager.initialize();
      
      // Cleanup function
      return () => {
        unifiedPerformanceManager.cleanup();
        accessibilityManager.cleanup();
      };
    }, []);
  } catch (error) {
    // If React context is not available, skip optimization
    console.warn('useUnifiedOptimization: React context not available', error);
  }
};
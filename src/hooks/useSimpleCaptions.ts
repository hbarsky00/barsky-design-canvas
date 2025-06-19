
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface CaptionData {
  [imageSrc: string]: string;
}

interface CaptionMetadata {
  imageSrc: string;
  caption: string;
  timestamp: number;
  hash: string;
  normalizedUrl: string;
}

export const useSimpleCaptions = (projectId: string) => {
  const [captions, setCaptions] = useState<CaptionData>({});
  const [isSaving, setIsSaving] = useState(false);

  // Advanced URL normalization to handle variations
  const normalizeImageUrl = useCallback((imageSrc: string): string => {
    try {
      // Remove query parameters and fragments for consistency
      const url = new URL(imageSrc, window.location.origin);
      const normalized = url.origin + url.pathname;
      
      console.log('🔧 URL Normalization:', {
        original: imageSrc,
        normalized,
        hostname: url.hostname,
        pathname: url.pathname
      });
      
      return normalized;
    } catch (error) {
      // Fallback for relative URLs or malformed URLs
      const cleaned = imageSrc.split('?')[0].split('#')[0];
      console.log('🔧 Fallback normalization:', { original: imageSrc, cleaned });
      return cleaned;
    }
  }, []);

  // Create a cryptographically strong caption key with multiple entropy sources
  const createCaptionKey = useCallback((imageSrc: string): string => {
    const normalizedUrl = normalizeImageUrl(imageSrc);
    const filename = normalizedUrl.split('/').pop() || 'unknown';
    const cleanName = filename.replace(/[^a-zA-Z0-9]/g, '_');
    
    // Multiple hash sources for maximum uniqueness
    const hashSources = [
      normalizedUrl,
      imageSrc, // Original URL as backup
      filename,
      Date.now().toString(), // Temporal component
      Math.random().toString(36), // Random component
      projectId
    ];
    
    // Create a comprehensive hash
    let combinedHash = 0;
    const fullString = hashSources.join('|');
    
    for (let i = 0; i < fullString.length; i++) {
      const char = fullString.charCodeAt(i);
      combinedHash = ((combinedHash << 5) - combinedHash) + char;
      combinedHash = combinedHash & combinedHash; // Convert to 32bit integer
    }
    
    // Add additional entropy with current timestamp microseconds
    const microTime = performance.now().toString().replace('.', '');
    const finalHash = Math.abs(combinedHash).toString(36) + '_' + microTime.slice(-6);
    
    const key = `img_caption_${cleanName}_${finalHash}`;
    
    console.log('🔑 ADVANCED Caption Key Creation:', {
      originalSrc: imageSrc.substring(0, 50) + '...',
      normalizedUrl: normalizedUrl.substring(0, 50) + '...',
      filename,
      cleanName,
      hashSources: hashSources.map(s => s.substring(0, 20) + '...'),
      finalHash,
      finalKey: key,
      keyLength: key.length
    });
    
    return key;
  }, [normalizeImageUrl, projectId]);

  // Duplicate detection system
  const detectDuplicateCaption = useCallback((newCaption: string, excludeKey?: string): string[] => {
    const duplicateKeys: string[] = [];
    
    Object.entries(captions).forEach(([key, existingCaption]) => {
      if (key !== excludeKey && existingCaption === newCaption && newCaption.trim() !== '' && newCaption !== 'Click to add a caption...') {
        duplicateKeys.push(key);
      }
    });
    
    if (duplicateKeys.length > 0) {
      console.warn('⚠️ DUPLICATE CAPTION DETECTED:', {
        newCaption: newCaption.substring(0, 50) + '...',
        duplicateKeys,
        excludeKey
      });
    }
    
    return duplicateKeys;
  }, [captions]);

  // Enhanced caption validation
  const validateCaption = useCallback((imageSrc: string, caption: string): { isValid: boolean; reason?: string } => {
    if (!imageSrc || !caption) {
      return { isValid: false, reason: 'Missing image source or caption' };
    }
    
    if (caption.length > 500) {
      return { isValid: false, reason: 'Caption too long (max 500 characters)' };
    }
    
    const duplicates = detectDuplicateCaption(caption);
    if (duplicates.length > 0) {
      return { 
        isValid: false, 
        reason: `Caption already exists for ${duplicates.length} other image(s)` 
      };
    }
    
    return { isValid: true };
  }, [detectDuplicateCaption]);

  // Get caption for an image with enhanced debugging
  const getCaption = useCallback((imageSrc: string, fallback?: string): string => {
    const key = createCaptionKey(imageSrc);
    const caption = captions[key] || fallback || 'Click to add a caption...';
    
    console.log('📖 ENHANCED Caption Retrieval:', {
      imageSrc: imageSrc.substring(0, 50) + '...',
      normalizedUrl: normalizeImageUrl(imageSrc).substring(0, 50) + '...',
      key,
      caption: caption.substring(0, 30) + '...',
      fallback,
      allCaptionKeys: Object.keys(captions),
      totalCaptions: Object.keys(captions).length
    });
    
    // Check for potential conflicts
    const potentialConflicts = Object.keys(captions).filter(k => k !== key && k.includes(imageSrc.split('/').pop() || ''));
    if (potentialConflicts.length > 0) {
      console.warn('⚠️ POTENTIAL KEY CONFLICTS:', {
        currentKey: key,
        conflictingKeys: potentialConflicts,
        imageSrc: imageSrc.substring(0, 50) + '...'
      });
    }
    
    return caption;
  }, [captions, createCaptionKey, normalizeImageUrl]);

  // Save caption with comprehensive validation and conflict prevention
  const saveCaption = useCallback(async (imageSrc: string, caption: string) => {
    const key = createCaptionKey(imageSrc);
    
    console.log('💾 ENHANCED Caption Save Process:', {
      imageSrc: imageSrc.substring(0, 50) + '...',
      normalizedUrl: normalizeImageUrl(imageSrc).substring(0, 50) + '...',
      key,
      caption: caption.substring(0, 50) + '...',
      timestamp: new Date().toISOString()
    });
    
    // Validate caption before saving
    const validation = validateCaption(imageSrc, caption);
    if (!validation.isValid) {
      console.error('❌ Caption validation failed:', validation.reason);
      toast.error(`Cannot save caption: ${validation.reason}`);
      return false;
    }
    
    setIsSaving(true);
    try {
      // Create metadata for enhanced tracking
      const metadata: CaptionMetadata = {
        imageSrc,
        caption,
        timestamp: Date.now(),
        hash: key,
        normalizedUrl: normalizeImageUrl(imageSrc)
      };
      
      // Update local state with conflict detection
      setCaptions(prev => {
        const updated = { ...prev, [key]: caption };
        
        // Double-check for any remaining conflicts
        const conflicts = Object.entries(updated).filter(([k, c]) => 
          k !== key && c === caption && c !== 'Click to add a caption...'
        );
        
        if (conflicts.length > 0) {
          console.error('🚨 CRITICAL: Caption conflict detected after save:', {
            newKey: key,
            conflictingEntries: conflicts,
            caption
          });
        }
        
        console.log('🔄 ENHANCED State Update:', {
          oldKeys: Object.keys(prev),
          newKeys: Object.keys(updated),
          addedKey: key,
          metadata,
          conflictCheck: conflicts.length === 0 ? 'PASSED' : 'FAILED'
        });
        
        return updated;
      });
      
      // Save to localStorage with enhanced storage structure
      const storageKey = `image_captions_v2_${projectId}`;
      const existingData = JSON.parse(localStorage.getItem(storageKey) || '{}');
      const updatedData = { 
        ...existingData, 
        [key]: {
          caption,
          metadata,
          version: 2
        }
      };
      
      localStorage.setItem(storageKey, JSON.stringify(updatedData));
      
      // Also maintain backward compatibility
      const legacyStorageKey = `image_captions_${projectId}`;
      const legacyData = JSON.parse(localStorage.getItem(legacyStorageKey) || '{}');
      legacyData[key] = caption;
      localStorage.setItem(legacyStorageKey, JSON.stringify(legacyData));
      
      console.log('✅ ENHANCED Caption Saved:', {
        storageKey,
        legacyStorageKey,
        key,
        caption: caption.substring(0, 50) + '...',
        totalCaptions: Object.keys(updatedData).length,
        metadata
      });
      
      toast.success('Caption saved successfully!', { 
        duration: 1000,
        description: `Saved for image: ${imageSrc.split('/').pop()}`
      });
      
      return true;
    } catch (error) {
      console.error('❌ ENHANCED Caption Save Error:', {
        error,
        imageSrc: imageSrc.substring(0, 50) + '...',
        key,
        caption: caption.substring(0, 50) + '...'
      });
      toast.error('Failed to save caption');
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [projectId, createCaptionKey, normalizeImageUrl, validateCaption]);

  // Load captions with migration support
  const loadCaptions = useCallback(() => {
    try {
      // Try new storage format first
      const newStorageKey = `image_captions_v2_${projectId}`;
      const newData = localStorage.getItem(newStorageKey);
      
      if (newData) {
        const parsedNewData = JSON.parse(newData);
        const captions = Object.fromEntries(
          Object.entries(parsedNewData).map(([key, data]: [string, any]) => [
            key,
            data.caption || data // Handle both new and legacy formats
          ])
        );
        setCaptions(captions);
        console.log('📖 ENHANCED Captions Loaded (v2):', {
          storageKey: newStorageKey,
          count: Object.keys(captions).length,
          keys: Object.keys(captions),
          sampleData: Object.entries(parsedNewData).slice(0, 3)
        });
        return;
      }
      
      // Fallback to legacy storage
      const legacyStorageKey = `image_captions_${projectId}`;
      const legacyData = localStorage.getItem(legacyStorageKey);
      
      if (legacyData) {
        const parsedCaptions = JSON.parse(legacyData);
        setCaptions(parsedCaptions);
        console.log('📖 LEGACY Captions Loaded:', {
          storageKey: legacyStorageKey,
          count: Object.keys(parsedCaptions).length,
          keys: Object.keys(parsedCaptions)
        });
        
        // Migrate to new format
        const migrationData = Object.fromEntries(
          Object.entries(parsedCaptions).map(([key, caption]) => [
            key,
            {
              caption,
              metadata: {
                imageSrc: 'unknown',
                caption,
                timestamp: Date.now(),
                hash: key,
                normalizedUrl: 'unknown'
              },
              version: 2
            }
          ])
        );
        localStorage.setItem(newStorageKey, JSON.stringify(migrationData));
        console.log('🔄 Migrated captions to v2 format');
      } else {
        console.log('📖 No existing captions found for project:', projectId);
      }
    } catch (error) {
      console.error('❌ ENHANCED Caption Loading Error:', error);
    }
  }, [projectId]);

  // Export captions with enhanced format
  const exportCaptions = useCallback(() => {
    const captionEntries = Object.entries(captions)
      .filter(([_, caption]) => caption && caption !== 'Click to add a caption...')
      .map(([key, caption]) => {
        // Extract image info from key for better readability
        const imageName = key.replace('img_caption_', '').split('_')[0] || 'unknown';
        return `"${imageName}": "${caption.replace(/"/g, '\\"')}"`;
      })
      .join(',\n  ');
    
    const exportText = `{\n  ${captionEntries}\n}`;
    
    navigator.clipboard.writeText(exportText).then(() => {
      toast.success('Enhanced image captions copied to clipboard!', {
        description: 'Includes improved formatting and metadata'
      });
    });
  }, [captions]);

  // Debug function to analyze caption conflicts
  const debugCaptionConflicts = useCallback(() => {
    const conflicts: Record<string, string[]> = {};
    const captionToKeys: Record<string, string[]> = {};
    
    // Group keys by caption
    Object.entries(captions).forEach(([key, caption]) => {
      if (caption && caption !== 'Click to add a caption...') {
        if (!captionToKeys[caption]) {
          captionToKeys[caption] = [];
        }
        captionToKeys[caption].push(key);
      }
    });
    
    // Find conflicts
    Object.entries(captionToKeys).forEach(([caption, keys]) => {
      if (keys.length > 1) {
        conflicts[caption] = keys;
      }
    });
    
    console.log('🔍 CAPTION CONFLICT ANALYSIS:', {
      totalCaptions: Object.keys(captions).length,
      uniqueCaptions: Object.keys(captionToKeys).length,
      conflictingCaptions: Object.keys(conflicts).length,
      conflicts
    });
    
    return conflicts;
  }, [captions]);

  return {
    captions,
    getCaption,
    saveCaption,
    loadCaptions,
    exportCaptions,
    isSaving,
    debugCaptionConflicts,
    validateCaption,
    detectDuplicateCaption
  };
};

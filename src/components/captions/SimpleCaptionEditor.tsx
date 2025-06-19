
import React, { useState, useRef, useEffect } from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { useSimpleCaptions } from '@/hooks/useSimpleCaptions';

interface SimpleCaptionEditorProps {
  imageSrc: string;
  projectId: string;
  children: (caption: string) => React.ReactNode;
  fallbackCaption?: string;
}

const SimpleCaptionEditor: React.FC<SimpleCaptionEditorProps> = ({
  imageSrc,
  projectId,
  children,
  fallbackCaption
}) => {
  const { isDevMode } = useDevMode();
  const { 
    getCaption, 
    saveCaption, 
    isSaving, 
    validateCaption, 
    detectDuplicateCaption 
  } = useSimpleCaptions(projectId);
  const [isEditing, setIsEditing] = useState(false);
  const [tempCaption, setTempCaption] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentCaption = getCaption(imageSrc, fallbackCaption);
  
  // Generate a unique visual identifier for this specific image
  const imageIdentifier = React.useMemo(() => {
    const shortHash = imageSrc.split('/').pop()?.substring(0, 8) || Math.random().toString(36).substr(2, 8);
    return `IMG-${shortHash}`;
  }, [imageSrc]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditing]);

  // Real-time validation as user types
  useEffect(() => {
    if (isEditing && tempCaption) {
      const validation = validateCaption(imageSrc, tempCaption);
      setValidationError(validation.isValid ? null : validation.reason || null);
    } else {
      setValidationError(null);
    }
  }, [tempCaption, isEditing, imageSrc, validateCaption]);

  const handleStartEdit = () => {
    if (!isDevMode || isSaving) return;
    
    console.log('📝 ENHANCED Caption Edit Started:', {
      imageSrc: imageSrc.substring(0, 50) + '...',
      imageIdentifier,
      currentCaption: currentCaption.substring(0, 30) + '...',
      projectId
    });
    
    setTempCaption(currentCaption);
    setIsEditing(true);
    setValidationError(null);
  };

  const handleSave = async () => {
    if (!tempCaption.trim()) {
      setIsEditing(false);
      return;
    }

    // Final validation before save
    const validation = validateCaption(imageSrc, tempCaption.trim());
    if (!validation.isValid) {
      setValidationError(validation.reason || 'Invalid caption');
      return;
    }

    console.log('💾 ENHANCED Caption Save Attempt:', {
      imageSrc: imageSrc.substring(0, 50) + '...',
      imageIdentifier,
      tempCaption: tempCaption.substring(0, 50) + '...',
      validation
    });

    const success = await saveCaption(imageSrc, tempCaption.trim());
    if (success) {
      setIsEditing(false);
      setValidationError(null);
    }
  };

  const handleCancel = () => {
    console.log('❌ Caption Edit Cancelled:', {
      imageSrc: imageSrc.substring(0, 50) + '...',
      imageIdentifier
    });
    
    setTempCaption('');
    setIsEditing(false);
    setValidationError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  // Check for duplicate captions in real-time
  const duplicateCount = React.useMemo(() => {
    if (tempCaption && tempCaption !== 'Click to add a caption...') {
      return detectDuplicateCaption(tempCaption).length;
    }
    return 0;
  }, [tempCaption, detectDuplicateCaption]);

  if (isEditing && isDevMode) {
    return (
      <div className="relative">
        {/* Visual identifier for debugging */}
        <div className="absolute -top-6 left-0 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded text-[10px] font-mono">
          {imageIdentifier}
        </div>
        
        <textarea
          ref={textareaRef}
          value={tempCaption}
          onChange={(e) => setTempCaption(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          className={`w-full p-2 border rounded bg-white text-gray-900 min-h-[60px] resize-vertical text-sm ${
            validationError ? 'border-red-300 bg-red-50' : 'border-blue-300'
          }`}
          placeholder="Enter caption..."
          disabled={isSaving}
        />
        
        <div className="text-xs mt-1">
          <div className={validationError ? 'text-red-600' : 'text-gray-500'}>
            {validationError ? (
              `⚠️ ${validationError}`
            ) : (
              <>
                Ctrl+Enter to save, Escape to cancel
                {isSaving && ' • Saving...'}
                {duplicateCount > 0 && ` • ⚠️ ${duplicateCount} duplicate(s) detected`}
              </>
            )}
          </div>
          <div className="text-gray-400 text-[10px] mt-1">
            Image: {imageIdentifier} | Chars: {tempCaption.length}/500
          </div>
        </div>
      </div>
    );
  }

  const canEdit = isDevMode && !isSaving;

  return (
    <div className="relative group">
      {/* Visual identifier visible in dev mode */}
      {isDevMode && (
        <div className="absolute -top-6 left-0 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">
          {imageIdentifier}
        </div>
      )}
      
      <div
        onClick={handleStartEdit}
        className={`${canEdit ? 'cursor-pointer hover:bg-blue-50/50 rounded p-1 -m-1 transition-colors' : ''} ${
          isSaving ? 'opacity-50' : ''
        }`}
        title={canEdit ? `Click to edit caption for ${imageIdentifier}` : undefined}
      >
        {children(currentCaption)}
      </div>
    </div>
  );
};

export default SimpleCaptionEditor;

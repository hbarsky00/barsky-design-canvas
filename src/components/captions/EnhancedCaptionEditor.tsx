
import React, { useState, useRef, useEffect } from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { useSimpleCaptions } from '@/hooks/useSimpleCaptions';
import { useEnhancedAiImageCaptions, CaptionStyle } from '@/hooks/useEnhancedAiImageCaptions';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, RefreshCw, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface EnhancedCaptionEditorProps {
  imageSrc: string;
  projectId: string;
  children: (caption: string) => React.ReactNode;
  fallbackCaption?: string;
  contextType?: 'project' | 'general' | 'blog';
}

const EnhancedCaptionEditor: React.FC<EnhancedCaptionEditorProps> = ({
  imageSrc,
  projectId,
  children,
  fallbackCaption,
  contextType = 'project'
}) => {
  const { isDevMode } = useDevMode();
  const { 
    getCaption, 
    saveCaption, 
    isSaving, 
    validateCaption 
  } = useSimpleCaptions(projectId);
  const { generateCaptions, isGenerating } = useEnhancedAiImageCaptions();
  
  const [isEditing, setIsEditing] = useState(false);
  const [tempCaption, setTempCaption] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [availableCaptions, setAvailableCaptions] = useState<CaptionStyle[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string>('descriptive');
  const [copiedStyle, setCopiedStyle] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentCaption = getCaption(imageSrc, fallbackCaption);
  
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

  useEffect(() => {
    if (isEditing && tempCaption) {
      const validation = validateCaption(imageSrc, tempCaption);
      setValidationError(validation.isValid ? null : validation.reason || null);
    } else {
      setValidationError(null);
    }
  }, [tempCaption, isEditing, imageSrc, validateCaption]);

  const handleGenerateAiCaptions = async () => {
    console.log('🎯 Enhanced Caption Editor: Generating AI captions for:', imageIdentifier);
    
    try {
      toast.loading('Generating AI captions...', { id: 'ai-caption-gen' });
      
      const result = await generateCaptions(imageSrc, contextType);
      
      if (result.captions && result.captions.length > 0) {
        setAvailableCaptions(result.captions);
        const descriptiveCaption = result.captions.find(c => c.type === 'descriptive') || result.captions[0];
        setTempCaption(descriptiveCaption.caption);
        setSelectedStyle('descriptive');
        
        toast.success(`Generated ${result.captions.length} caption styles!`, { 
          id: 'ai-caption-gen',
          description: 'Choose from different styles or use the descriptive version.'
        });
        
        console.log('✅ Enhanced Caption Editor: Generated AI captions:', result.captions.length);
      } else {
        throw new Error(result.error || 'No captions generated');
      }
    } catch (error) {
      console.error('❌ Enhanced Caption Editor: AI generation failed:', error);
      toast.error('Failed to generate AI captions', {
        id: 'ai-caption-gen',
        description: 'Please try again or add a custom caption.'
      });
    }
  };

  const handleStyleChange = (style: string) => {
    const caption = availableCaptions.find(c => c.type === style);
    if (caption) {
      setTempCaption(caption.caption);
      setSelectedStyle(style);
    }
  };

  const handleCopyCaption = async (style: string) => {
    const caption = availableCaptions.find(c => c.type === style);
    if (caption) {
      await navigator.clipboard.writeText(caption.caption);
      setCopiedStyle(style);
      setTimeout(() => setCopiedStyle(null), 2000);
      toast.success('Caption copied to clipboard!');
    }
  };

  const handleStartEdit = () => {
    if (!isDevMode || isSaving) return;
    
    console.log('📝 Enhanced Caption Editor: Starting edit for:', imageIdentifier);
    setTempCaption(currentCaption);
    setIsEditing(true);
    setValidationError(null);
    setAvailableCaptions([]);
  };

  const handleSave = async () => {
    if (!tempCaption.trim()) {
      setIsEditing(false);
      return;
    }

    const validation = validateCaption(imageSrc, tempCaption.trim());
    if (!validation.isValid) {
      setValidationError(validation.reason || 'Invalid caption');
      return;
    }

    console.log('💾 Enhanced Caption Editor: Saving caption for:', imageIdentifier);
    const success = await saveCaption(imageSrc, tempCaption.trim());
    if (success) {
      setIsEditing(false);
      setValidationError(null);
      setAvailableCaptions([]);
    }
  };

  const handleCancel = () => {
    console.log('❌ Enhanced Caption Editor: Cancelled edit for:', imageIdentifier);
    setTempCaption('');
    setIsEditing(false);
    setValidationError(null);
    setAvailableCaptions([]);
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

  if (isEditing && isDevMode) {
    return (
      <div className="relative space-y-3">
        <div className="absolute -top-6 left-0 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded text-[10px] font-mono">
          {imageIdentifier}
        </div>
        
        {/* AI Caption Generation */}
        <div className="flex gap-2">
          <Button
            onClick={handleGenerateAiCaptions}
            disabled={isGenerating}
            size="sm"
            variant="outline"
            className="text-xs"
          >
            <Sparkles className="h-3 w-3 mr-1" />
            {isGenerating ? 'Generating...' : 'AI Captions'}
          </Button>
          
          {availableCaptions.length > 0 && (
            <Select value={selectedStyle} onValueChange={handleStyleChange}>
              <SelectTrigger className="w-32 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alt-text">Alt Text</SelectItem>
                <SelectItem value="descriptive">Descriptive</SelectItem>
                <SelectItem value="seo-optimized">SEO</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Available Caption Styles */}
        {availableCaptions.length > 0 && (
          <div className="bg-gray-50 rounded p-3 space-y-2 text-xs">
            <div className="font-medium text-gray-700">Generated Caption Styles:</div>
            {availableCaptions.map((style) => (
              <div key={style.type} className="flex items-start gap-2">
                <div className="w-16 text-gray-600 font-mono text-[10px] mt-1">
                  {style.type.toUpperCase()}
                </div>
                <div className="flex-1 text-gray-800">{style.caption}</div>
                <Button
                  onClick={() => handleCopyCaption(style.type)}
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0"
                >
                  {copiedStyle === style.type ? (
                    <Check className="h-3 w-3 text-green-600" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        )}
        
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
        
        <div className="text-xs">
          <div className={validationError ? 'text-red-600' : 'text-gray-500'}>
            {validationError ? (
              `⚠️ ${validationError}`
            ) : (
              <>
                Ctrl+Enter to save, Escape to cancel
                {isSaving && ' • Saving...'}
              </>
            )}
          </div>
          <div className="text-gray-400 text-[10px] mt-1">
            Context: {contextType} | Chars: {tempCaption.length}/500
          </div>
        </div>
      </div>
    );
  }

  const canEdit = isDevMode && !isSaving;

  return (
    <div className="relative group">
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

export default EnhancedCaptionEditor;

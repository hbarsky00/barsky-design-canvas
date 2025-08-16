
import React, { useEffect, useState, useRef } from "react";
import { useOpenAiCaptions } from "@/hooks/useOpenAiCaptions";
import { getCaptionClasses, CaptionVariant, CaptionSize } from "@/utils/captionStyles";
import { cn } from "@/lib/utils";

// Helper to ensure a single, clean sentence
const toOneSentence = (text: string) => {
  if (!text) return "";
  const first = text
    .replace(/\s+/g, " ")
    .trim()
    .split(/(?<=[.!?])\s+/)[0];
  return first.endsWith(".") || first.endsWith("!") || first.endsWith("?")
    ? first
    : `${first}.`;
};

const PLACEHOLDERS = new Set([
  "Click to add caption...",
  "A newly added image.",
  "This is a new image. Click to edit me.",
]);

interface EditableCaptionProps {
  imageSrc: string;
  initialCaption?: string;
  projectId?: string;
  className?: string;
  variant?: CaptionVariant;
  size?: CaptionSize;
  alignment?: 'left' | 'center';
  onCaptionChange?: (newCaption: string) => void;
}

const EditableCaption: React.FC<EditableCaptionProps> = ({
  imageSrc,
  initialCaption = "",
  projectId,
  className,
  variant = 'default',
  size = 'xs',
  alignment = 'center',
  onCaptionChange
}) => {
  const [autoCaption, setAutoCaption] = useState<string>(initialCaption || "");
  const [isAutoGenerating, setIsAutoGenerating] = useState(false);
  const hasTriggeredRef = useRef(false);

  const { generateCaption } = useOpenAiCaptions();

  const needsGeneration = (c: string) => {
    const trimmed = (c || "").trim();
    return !trimmed || PLACEHOLDERS.has(trimmed) || trimmed.length < 10;
  };

  useEffect(() => {
    const run = async () => {
      if (!imageSrc || hasTriggeredRef.current) return;
      if (!needsGeneration(autoCaption)) return;

      hasTriggeredRef.current = true;
      setIsAutoGenerating(true);

      try {
        const context = projectId || "general";
        const result = await generateCaption(imageSrc, context);
        const oneSentence = toOneSentence(result.caption || "");

        if (oneSentence) {
          setAutoCaption(oneSentence);
          if (onCaptionChange) {
            onCaptionChange(oneSentence);
          }
        }
      } catch (error) {
        console.error('Failed to generate caption:', error);
      } finally {
        setIsAutoGenerating(false);
      }
    };

    run();
  }, [imageSrc, projectId, generateCaption, autoCaption, onCaptionChange]);

  const displayedCaption = isAutoGenerating ? "Generating caption..." : autoCaption || "";

  const captionClasses = getCaptionClasses({
    variant,
    size,
    alignment,
    className
  });

  return (
    <figcaption className={captionClasses}>
      {displayedCaption}
    </figcaption>
  );
};

export default EditableCaption;

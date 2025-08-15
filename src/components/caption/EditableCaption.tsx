import React, { useEffect, useRef, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEditorContext } from "@/context/EditorContext";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useOpenAiCaptions } from "@/hooks/useOpenAiCaptions";

// Helper to ensure a single, clean sentence
const toOneSentence = (text: string) => {
  if (!text) return "";
  // Split on sentence boundaries and return the first meaningful sentence
  const first = text
    .replace(/\s+/g, " ")
    .trim()
    .split(/(?<=[.!?])\s+/)[0];
  // Ensure it ends with a period for consistency
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
  onCaptionChange?: (newCaption: string) => void;
}

const EditableCaption: React.FC<EditableCaptionProps> = (props) => {
  const { imageSrc, initialCaption = "", projectId } = props;
  const [caption, setCaption] = useState(initialCaption);
  const [isEditing, setIsEditing] = useState(false);
  const debouncedCaption = useDebounce(caption, 500);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { user } = useUser();
  const { toast } = useToast();
  const { setForceRefresh } = useEditorContext();

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

          window.dispatchEvent(
            new CustomEvent("editable-caption:generated", {
              detail: { imageSrc, caption: oneSentence, projectId: context },
            })
          );
        }
      } finally {
        setIsAutoGenerating(false);
      }
    };

    run();
  }, [imageSrc, projectId, generateCaption, autoCaption]);

  const displayedCaption =
    isAutoGenerating ? "Generating caption..." : autoCaption || "";

  return (
    <>
      <figcaption className={props.className || ""}>{displayedCaption}</figcaption>
    </>
  );
};

export default EditableCaption;

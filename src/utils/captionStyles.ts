
import { cn } from "@/lib/utils";

export type CaptionVariant = 'default' | 'subtle' | 'card';
export type CaptionSize = 'sm' | 'xs';

interface CaptionStyleOptions {
  variant?: CaptionVariant;
  size?: CaptionSize;
  alignment?: 'left' | 'center';
  className?: string;
}

export const getCaptionClasses = ({
  variant = 'default',
  size = 'xs',
  alignment = 'center',
  className = ''
}: CaptionStyleOptions = {}) => {
  const baseClasses = "font-medium transition-colors duration-200";
  
  const sizeClasses = {
    xs: "text-xs leading-relaxed",
    sm: "text-sm leading-relaxed"
  };
  
  const variantClasses = {
    default: "bg-gray-50/80 text-gray-700 border border-gray-100/50 backdrop-blur-sm",
    subtle: "bg-blue-50/60 text-blue-800 border border-blue-100/40 backdrop-blur-sm",
    card: "bg-white/90 text-gray-800 border border-gray-200/60 shadow-sm backdrop-blur-sm"
  };
  
  const alignmentClasses = {
    left: "text-left",
    center: "text-center"
  };
  
  const spacingClasses = "px-3 py-2 mt-3 rounded-lg";
  
  return cn(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    alignmentClasses[alignment],
    spacingClasses,
    className
  );
};

export const getImageCaptionClasses = (className?: string) => 
  getCaptionClasses({ variant: 'default', size: 'xs', alignment: 'center', className });

export const getVideoCaptionClasses = (className?: string) => 
  getCaptionClasses({ variant: 'subtle', size: 'xs', alignment: 'center', className });

export const getGalleryCaptionClasses = (className?: string) => 
  getCaptionClasses({ variant: 'card', size: 'xs', alignment: 'left', className });

// Text truncation utilities for annotations
export const truncateAnnotationText = (text: string, maxLength: number = 30): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
};

export const getResponsiveTruncatedText = (text: string): string => {
  // Mobile: 30 chars, Tablet: 40 chars, Desktop: 50 chars
  // We'll use the mobile limit as default since it's the most restrictive
  return truncateAnnotationText(text, 30);
};

// Annotation utilities - AnnotatedImage template styling
export const getAnnotationClasses = (className?: string) => 
  cn(
    "absolute px-3 py-2 rounded-lg font-medium shadow-2xl drop-shadow-lg backdrop-blur-sm ring-1 ring-black/10 text-white",
    "text-xs md:text-sm lg:text-base", // Responsive text size
    "max-w-[160px] md:max-w-[200px] lg:max-w-[240px]", // Responsive width
    "bg-blue-600", // Default blue annotation
    className
  );

// Specific annotation types matching AnnotatedImage
export const getAnnotationIssueClasses = (className?: string) => 
  cn(
    "absolute px-3 py-2 rounded-lg font-medium shadow-2xl drop-shadow-lg backdrop-blur-sm ring-1 ring-black/10 text-white",
    "text-xs md:text-sm lg:text-base",
    "max-w-[160px] md:max-w-[200px] lg:max-w-[240px]",
    "bg-red-600", // Red for issues
    className
  );

export const getAnnotationImprovementClasses = (className?: string) => 
  cn(
    "absolute px-3 py-2 rounded-lg font-medium shadow-2xl drop-shadow-lg backdrop-blur-sm ring-1 ring-black/10 text-white",
    "text-xs md:text-sm lg:text-base",
    "max-w-[160px] md:max-w-[200px] lg:max-w-[240px]",
    "bg-blue-600", // Blue for improvements
    className
  );

export const getAnnotationSuccessClasses = (className?: string) => 
  cn(
    "absolute px-3 py-2 rounded-lg font-medium shadow-2xl drop-shadow-lg backdrop-blur-sm ring-1 ring-black/10 text-white",
    "text-xs md:text-sm lg:text-base",
    "max-w-[160px] md:max-w-[200px] lg:max-w-[240px]",
    "bg-green-600", // Green for success
    className
  );

export const getAnnotationBlurbClasses = (className?: string) => 
  getAnnotationClasses(cn("bottom-3 left-3", className));

export const getAnnotationLabelClasses = (className?: string) => 
  getAnnotationClasses(cn("top-4", className));

export const getAnnotationCaptionClasses = (className?: string) => 
  getAnnotationClasses(cn("bottom-0 left-0 right-0 max-w-none", className));

// Legacy aliases for backward compatibility
export const getImageOverlayClasses = getAnnotationClasses;
export const getOverlayIssueClasses = getAnnotationIssueClasses;
export const getOverlayImprovementClasses = getAnnotationImprovementClasses;
export const getOverlaySuccessClasses = getAnnotationSuccessClasses;
export const getOverlayBlurbClasses = getAnnotationBlurbClasses;
export const getOverlayLabelClasses = getAnnotationLabelClasses;
export const getOverlayCaptionClasses = getAnnotationCaptionClasses;

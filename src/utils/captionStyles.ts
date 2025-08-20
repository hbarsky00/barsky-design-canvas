
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

// Image overlay utilities - AnnotatedImage template styling
export const getImageOverlayClasses = (className?: string) => 
  cn(
    "absolute px-3 py-2 rounded-lg font-medium shadow-lg text-white",
    "text-xs md:text-sm lg:text-base", // Responsive text size
    "max-w-[160px] md:max-w-[200px] lg:max-w-[240px]", // Responsive width
    "bg-blue-600", // Default blue annotation
    className
  );

// Specific annotation types matching AnnotatedImage
export const getOverlayIssueClasses = (className?: string) => 
  cn(
    "absolute px-3 py-2 rounded-lg font-medium shadow-lg text-white",
    "text-xs md:text-sm lg:text-base",
    "max-w-[160px] md:max-w-[200px] lg:max-w-[240px]",
    "bg-red-600", // Red for issues
    className
  );

export const getOverlayImprovementClasses = (className?: string) => 
  cn(
    "absolute px-3 py-2 rounded-lg font-medium shadow-lg text-white",
    "text-xs md:text-sm lg:text-base",
    "max-w-[160px] md:max-w-[200px] lg:max-w-[240px]",
    "bg-blue-600", // Blue for improvements
    className
  );

export const getOverlaySuccessClasses = (className?: string) => 
  cn(
    "absolute px-3 py-2 rounded-lg font-medium shadow-lg text-white",
    "text-xs md:text-sm lg:text-base",
    "max-w-[160px] md:max-w-[200px] lg:max-w-[240px]",
    "bg-green-600", // Green for success
    className
  );

export const getOverlayBlurbClasses = (className?: string) => 
  getImageOverlayClasses(cn("bottom-3 left-3", className));

export const getOverlayLabelClasses = (className?: string) => 
  getImageOverlayClasses(cn("top-4", className));

export const getOverlayCaptionClasses = (className?: string) => 
  getImageOverlayClasses(cn("bottom-0 left-0 right-0 max-w-none", className));

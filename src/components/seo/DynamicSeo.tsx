
import React from 'react';

// Temporary DynamicSeo component that does nothing
// The global UnifiedSEO component handles all SEO automatically
// This exists only to prevent build errors while we transition

interface DynamicSeoProps {
  type?: string;
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  projectName?: string;
  results?: string[];
  technologies?: string[];
  serviceName?: string;
  benefits?: string[];
  targetAudience?: string;
  excerpt?: string;
  featuredImage?: string;
  author?: string;
  publishedDate?: string;
  tags?: string[];
  slug?: string;
  children?: React.ReactNode;
  [key: string]: any; // Accept any other props to prevent errors
}

const DynamicSeo: React.FC<DynamicSeoProps> = () => {
  // This component intentionally does nothing
  // All SEO is handled by the global UnifiedSEO component in App.tsx
  return null;
};

export default DynamicSeo;

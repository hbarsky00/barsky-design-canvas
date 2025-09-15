import { lazy } from 'react';

// Lazy load heavy components
export const LazyBlogPreview = lazy(() => import('@/components/blog/BlogPreview'));
export const LazySeoFaqSection = lazy(() => import('@/components/seo/SeoFaqSection'));
export const LazyInternalLinkingEnhancer = lazy(() => import('@/components/seo/InternalLinkingEnhancer'));
// Temporarily disable lazy loading for VideoCaseStudiesSection to fix dynamic import error
export { default as LazyVideoCaseStudiesSection } from '@/components/home/VideoCaseStudiesSection';
export const LazyRecentAdventuresSection = lazy(() => import('@/components/home/RecentAdventuresSection'));
export const LazyContactForm = lazy(() => import('@/components/home/ContactForm'));

// Lazy load bounce reduction components for better initial load
export const LazyExitIntentDetector = lazy(() => import('@/components/bounce-reduction/ExitIntentDetector'));
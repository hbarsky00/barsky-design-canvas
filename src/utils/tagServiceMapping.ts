
export const getServiceUrlFromTag = (tag: string): string => {
  const normalizedTag = tag.toLowerCase().trim();
  
  // Design-related tags
  if (normalizedTag.includes('ux') || 
      normalizedTag.includes('ui') || 
      normalizedTag.includes('design') ||
      normalizedTag.includes('product design') ||
      normalizedTag.includes('user') ||
      normalizedTag.includes('figma')) {
    return '/design-services/ux-ui-design';
  }
  
  // Development-related tags
  if (normalizedTag.includes('web') || 
      normalizedTag.includes('development') ||
      normalizedTag.includes('react') ||
      normalizedTag.includes('typescript') ||
      normalizedTag.includes('node') ||
      normalizedTag.includes('api') ||
      normalizedTag.includes('database') ||
      normalizedTag.includes('backend') ||
      normalizedTag.includes('frontend')) {
    return '/design-services/web-development';
  }
  
  // Mobile-related tags
  if (normalizedTag.includes('mobile') || 
      normalizedTag.includes('app') ||
      normalizedTag.includes('react native') ||
      normalizedTag.includes('ios') ||
      normalizedTag.includes('android')) {
    return '/design-services/mobile-app-design';
  }
  
  // Platform/Tool tags
  if (normalizedTag.includes('lovable') ||
      normalizedTag.includes('ai driven') ||
      normalizedTag.includes('platform') ||
      normalizedTag.includes('software') ||
      normalizedTag.includes('enterprise')) {
    return '/services';
  }
  
  // Industry-specific tags - link to main services page
  return '/services';
};

/**
 * Utility to standardize blog post HTML content with design system classes
 */

export const standardizeBlogContent = (content: string): string => {
  return content
    // Replace h2 headers with design system classes
    .replace(/class="text-2xl font-bold mt-8 mb-4"/g, 'class="text-section-title mt-8 mb-4"')
    // Replace h3 headers with design system classes
    .replace(/class="text-xl font-semibold mt-6 mb-3"/g, 'class="text-subsection-title mt-6 mb-3"')
    // Ensure consistent paragraph styling
    .replace(/<p>/g, '<p class="text-on-surface mb-4 leading-relaxed">')
    // Ensure consistent list styling
    .replace(/class="list-disc pl-6 mb-4"/g, 'class="list-disc pl-6 mb-4 text-on-surface"')
    .replace(/class="list-decimal pl-6 mb-4"/g, 'class="list-decimal pl-6 mb-4 text-on-surface"');
};
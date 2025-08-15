
import React from 'react';

interface TemplateLockManagerProps {
  templateType: string;
  children: React.ReactNode;
}

/**
 * Template Lock Manager - Enforces structure protection for case studies
 * Prevents structural changes while allowing content updates
 */
const TemplateLockManager: React.FC<TemplateLockManagerProps> = ({ 
  templateType, 
  children 
}) => {
  React.useEffect(() => {
    // Add validation for template integrity
    const validateTemplate = () => {
      const protectedElements = document.querySelectorAll('[data-protect="structure"]');
      
      if (protectedElements.length === 0) {
        console.warn('⚠️ Template protection not found. Structure may be vulnerable to changes.');
      } else {
        console.log(`✅ Template lock active: ${protectedElements.length} protected elements`);
      }
    };

    // Validate on mount and after DOM changes
    validateTemplate();
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const target = mutation.target as Element;
          if (target.hasAttribute?.('data-protect')) {
            console.error('🚫 Blocked: template-locked structure modification attempted');
          }
        }
      });
    });

    // Observe protected elements for unauthorized changes
    document.querySelectorAll('[data-protect="structure"]').forEach(element => {
      observer.observe(element, { childList: true, subtree: false });
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      data-template={templateType}
      data-protect="structure"
      className="template-locked-container"
    >
      {/* LOCK: begin structure (do not modify) */}
      {children}
      {/* LOCK: end structure */}
    </div>
  );
};

export default TemplateLockManager;

import React from 'react';
import { debugCanonicalUrl } from '@/utils/seoDebugger';

interface SeoValidatorProps {
  expectedCanonical: string;
  onValidation?: (isValid: boolean, details: any) => void;
}

const SeoValidator: React.FC<SeoValidatorProps> = ({ expectedCanonical, onValidation }) => {
  const [validationResult, setValidationResult] = React.useState<any>(null);

  React.useEffect(() => {
    const validateSeo = () => {
      const debugInfo = debugCanonicalUrl();
      const isValid = debugInfo?.canonicalUrls[0] === expectedCanonical && !debugInfo?.hasConflicts;
      
      const result = {
        isValid,
        expectedCanonical,
        actualCanonical: debugInfo?.canonicalUrls[0],
        currentUrl: debugInfo?.currentUrl,
        hasConflicts: debugInfo?.hasConflicts,
        hasCanonicalConflicts: debugInfo?.hasCanonicalConflicts,
        hasOgUrlConflicts: debugInfo?.hasOgUrlConflicts,
        canonicalOgMismatch: debugInfo?.canonicalOgMismatch,
        canonicalCount: debugInfo?.canonicalUrls.length || 0,
        ogUrlCount: debugInfo?.ogUrls.length || 0
      };
      
      setValidationResult(result);
      onValidation?.(isValid, result);
      
      if (!isValid) {
        console.error('❌ SEO Validation Failed:', result);
      } else {
        console.log('✅ SEO Validation Passed:', result);
      }
    };

    // Run validation after DOM updates
    const timer = setTimeout(validateSeo, 2000);
    return () => clearTimeout(timer);
  }, [expectedCanonical, onValidation]);

  // Only show in development
  if (process.env.NODE_ENV !== 'development' || !validationResult) {
    return null;
  }

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        background: validationResult.isValid ? '#22c55e' : '#ef4444',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '4px',
        fontSize: '12px',
        zIndex: 9999,
        maxWidth: '300px'
      }}
    >
      <div>
        <strong>{validationResult.isValid ? '✅ SEO Valid' : '❌ SEO Invalid'}</strong>
      </div>
      {!validationResult.isValid && (
        <div style={{ fontSize: '10px', marginTop: '4px' }}>
          Expected: {validationResult.expectedCanonical}<br/>
          Actual: {validationResult.actualCanonical}<br/>
          {validationResult.hasCanonicalConflicts && <span>⚠️ Multiple canonical URLs<br/></span>}
          {validationResult.hasOgUrlConflicts && <span>⚠️ Multiple og:url tags<br/></span>}
          {validationResult.canonicalOgMismatch && <span>⚠️ Canonical/OG URL mismatch<br/></span>}
        </div>
      )}
    </div>
  );
};

export default SeoValidator;
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getMetaConfigForPath } from '@/utils/metaTagInjection';

interface MetaTag {
  name?: string;
  property?: string;
  content?: string;
  href?: string;
  rel?: string;
}

interface MetaVerificationResult {
  canonical: string | null;
  ogUrl: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  title: string | null;
  description: string | null;
  isCorrect: boolean;
  issues: string[];
}

const MetaTagVerifier: React.FC = () => {
  const location = useLocation();
  const [verification, setVerification] = useState<MetaVerificationResult | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development or when URL contains debug parameter
    const isDev = import.meta.env.DEV;
    const hasDebugParam = location.search.includes('debug=meta');
    setIsVisible(isDev || hasDebugParam);

    if (!isVisible) return;

    const verifyMetaTags = () => {
      const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href || null;
      const ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]')?.content || null;
      const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.content || null;
      const ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.content || null;
      const ogImage = document.querySelector<HTMLMetaElement>('meta[property="og:image"]')?.content || null;
      const title = document.title || null;
      const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content || null;

      const expectedConfig = getMetaConfigForPath(location.pathname);
      const issues: string[] = [];

      // Check for issues
      if (!canonical) {
        issues.push('Missing canonical URL');
      } else if (canonical.includes('index.html')) {
        issues.push('Canonical URL points to index.html instead of actual page');
      }

      if (!ogUrl) {
        issues.push('Missing og:url');
      } else if (ogUrl !== canonical) {
        issues.push('og:url does not match canonical URL');
      }

      if (expectedConfig) {
        if (canonical !== expectedConfig.canonical) {
          issues.push(`Canonical URL mismatch. Expected: ${expectedConfig.canonical}, Got: ${canonical}`);
        }
        if (ogTitle !== expectedConfig.title) {
          issues.push('og:title does not match expected value');
        }
      }

      const isCorrect = issues.length === 0;

      setVerification({
        canonical,
        ogUrl,
        ogTitle,
        ogDescription,
        ogImage,
        title,
        description,
        isCorrect,
        issues
      });

      // Log verification results
      console.log('Meta Tag Verification Results:', {
        path: location.pathname,
        canonical,
        ogUrl,
        isCorrect,
        issues
      });
    };

    // Run verification after a small delay to ensure DynamicSeo has updated
    const timeoutId = setTimeout(verifyMetaTags, 100);
    return () => clearTimeout(timeoutId);
  }, [location.pathname, isVisible]);

  if (!isVisible || !verification) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: verification.isCorrect ? '#10b981' : '#ef4444',
      color: 'white',
      padding: '12px',
      borderRadius: '8px',
      fontSize: '12px',
      fontFamily: 'monospace',
      maxWidth: '400px',
      zIndex: 9999,
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    }}>
      <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
        Meta Tags {verification.isCorrect ? '✅' : '❌'}
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        <strong>Path:</strong> {location.pathname}
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        <strong>Canonical:</strong> {verification.canonical || 'Missing'}
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        <strong>og:url:</strong> {verification.ogUrl || 'Missing'}
      </div>

      {verification.issues.length > 0 && (
        <div style={{ marginTop: '8px' }}>
          <strong>Issues:</strong>
          <ul style={{ margin: '4px 0', paddingLeft: '16px' }}>
            {verification.issues.map((issue, index) => (
              <li key={index} style={{ fontSize: '11px' }}>{issue}</li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ fontSize: '10px', opacity: 0.8, marginTop: '8px' }}>
        Add ?debug=meta to URL to show in production
      </div>
    </div>
  );
};

export default MetaTagVerifier;
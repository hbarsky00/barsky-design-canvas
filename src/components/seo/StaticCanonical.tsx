import React from 'react';
import { Helmet } from 'react-helmet-async';

interface StaticCanonicalProps {
  url: string;
}

/**
 * Component that ensures canonical tags are present in static HTML
 * This addresses the issue where canonical tags only appear after JS execution
 */
const StaticCanonical: React.FC<StaticCanonicalProps> = ({ url }) => {
  React.useEffect(() => {
    // Ensure canonical is set immediately in DOM
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    
    canonicalLink.href = url;
  }, [url]);

  return (
    <Helmet>
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default StaticCanonical;
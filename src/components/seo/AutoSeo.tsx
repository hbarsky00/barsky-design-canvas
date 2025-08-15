
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface AutoSeoProps {
  fallbackTitle?: string;
  fallbackDescription?: string;
  fallbackImage?: string;
}

const AutoSeo: React.FC<AutoSeoProps> = ({ 
  fallbackTitle, 
  fallbackDescription, 
  fallbackImage 
}) => {
  return (
    <Helmet>
      {fallbackTitle && <title>{fallbackTitle}</title>}
      {fallbackDescription && <meta name="description" content={fallbackDescription} />}
      {fallbackImage && <meta property="og:image" content={fallbackImage} />}
    </Helmet>
  );
};

export default AutoSeo;

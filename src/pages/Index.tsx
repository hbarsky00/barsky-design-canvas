
import HomepageLayout from "@/components/homepage/HomepageLayout";
import ScrollHandler from "@/components/homepage/ScrollHandler";
import DynamicSeo from "@/components/seo/DynamicSeo";
import React from "react";


import { usePageIndexing } from "@/hooks/usePageIndexing";
import { debugCanonicalUrl } from "@/utils/seoDebugger";
import { forceCanonicalFix } from "@/utils/forceCanonicalFix";

const Index = () => {
  usePageIndexing();
  
  // Emergency fix for canonical URLs
  React.useEffect(() => {
    const observer = forceCanonicalFix();
    return () => observer?.disconnect();
  }, []);
  
  // Debug canonical URLs in development
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => debugCanonicalUrl(), 1500);
    }
  }, []);
  
  return (
    <>
      {/* Single SEO component - testing canonical URL fix */}
      <DynamicSeo type="home" />
      <ScrollHandler />
      <HomepageLayout />
      
    </>
  );
};

export default Index;

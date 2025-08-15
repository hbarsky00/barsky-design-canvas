
import HomepageLayout from "@/components/homepage/HomepageLayout";
import ScrollHandler from "@/components/homepage/ScrollHandler";
import UnifiedSEO from "@/components/seo/UnifiedSEO";
import { usePageIndexing } from "@/hooks/usePageIndexing";

const Index = () => {
  usePageIndexing();
  
  return (
    <>
      {/* Unified SEO System - automatically detects page content */}
      <UnifiedSEO />
      
      {/* Page Content */}
      <ScrollHandler />
      <HomepageLayout />
    </>
  );
};

export default Index;


import HomepageLayout from "@/components/homepage/HomepageLayout";
import ScrollHandler from "@/components/homepage/ScrollHandler";
import DynamicSeo from "@/components/seo/DynamicSeo";

import { usePageIndexing } from "@/hooks/usePageIndexing";

const Index = () => {
  usePageIndexing();
  
  return (
    <>
      {/* Single SEO component with canonical tag */}
      <DynamicSeo type="home" canonicalUrl="https://barskydesign.pro" />
      <ScrollHandler />
      <HomepageLayout />
      
    </>
  );
};

export default Index;

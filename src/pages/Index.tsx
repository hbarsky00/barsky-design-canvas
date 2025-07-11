
import HomepageLayout from "@/components/homepage/HomepageLayout";
import ScrollHandler from "@/components/homepage/ScrollHandler";
import DynamicSeo from "@/components/seo/DynamicSeo";


import { usePageIndexing } from "@/hooks/usePageIndexing";

const Index = () => {
  usePageIndexing();
  
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

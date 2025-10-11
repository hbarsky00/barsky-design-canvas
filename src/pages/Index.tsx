
import HomepageLayout from "@/components/homepage/HomepageLayout";
import ScrollHandler from "@/components/homepage/ScrollHandler";
import { usePageIndexing } from "@/hooks/usePageIndexing";
import RunSeoVerificationOnce from "@/components/seo/RunSeoVerificationOnce";

const Index = () => {
  usePageIndexing();
  
  return (
    <>
      <RunSeoVerificationOnce />
      <ScrollHandler />
      <HomepageLayout />
    </>
  );
};

export default Index;

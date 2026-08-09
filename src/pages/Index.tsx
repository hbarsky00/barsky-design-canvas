
import HomepageLayout from "@/components/homepage/HomepageLayout";
import ScrollHandler from "@/components/homepage/ScrollHandler";
import { usePageIndexing } from "@/hooks/usePageIndexing";

const Index = () => {
  usePageIndexing();
  
  return (
    <>
      <ScrollHandler />
      <HomepageLayout />
    </>
  );
};

export default Index;

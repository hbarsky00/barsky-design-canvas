
import HomepageLayout from "@/components/homepage/HomepageLayout";
import ScrollHandler from "@/components/homepage/ScrollHandler";
import DynamicSeo from "@/components/seo/DynamicSeo";
import { usePageIndexing } from "@/hooks/usePageIndexing";

const Index = () => {
  usePageIndexing();
  
  return (
    <>
      {/* DynamicSeo with explicit homepage props */}
      <DynamicSeo
        type="home"
        title="Hiram Barsky - Product Designer & Gen AI Developer"
        description="15+ years creating AI-enhanced digital experiences. Specializing in UX research, design systems, and Gen AI integration for businesses looking to transform their products with intelligent design solutions."
        image="https://barskyux.com/wp-content/uploads/2025/06/IMG_20250531_123836_952.webp"
        path="/"
      />
      
      {/* Page Content */}
      <ScrollHandler />
      <HomepageLayout />
    </>
  );
};

export default Index;

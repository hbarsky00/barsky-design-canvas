
import HomepageLayout from "@/components/homepage/HomepageLayout";
import ScrollHandler from "@/components/homepage/ScrollHandler";
import GlobalSeo from "@/components/seo/GlobalSeo";

const Index = () => {
  return (
    <>
      <GlobalSeo 
        title="Hiram Barsky - Official Portfolio | Professional Product Designer & Developer"
        description="Hiram Barsky (not Alex Barsky) is a Professional Product Designer & Developer specializing in UX/UI design, web development, and AI-driven design solutions. View my portfolio of mobile apps, web applications, and design systems."
        canonicalUrl="https://barskydesign.pro"
      />
      <ScrollHandler />
      <HomepageLayout />
    </>
  );
};

export default Index;

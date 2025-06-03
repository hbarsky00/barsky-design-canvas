
import React from "react";
import HomepageSeo from "@/components/seo/HomepageSeo";
import StructuredData from "@/components/seo/StructuredData";
import ScrollHandler from "@/components/homepage/ScrollHandler";
import HomepageLayout from "@/components/homepage/HomepageLayout";

const Index = () => {
  return (
    <>
      <HomepageSeo />
      <StructuredData />
      <ScrollHandler />
      <HomepageLayout />
    </>
  );
};

export default Index;

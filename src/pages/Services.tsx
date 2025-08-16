
import React from "react";
import DynamicSeo from "@/components/seo/DynamicSeo";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import { usePageIndexing } from "@/hooks/usePageIndexing";

const Services = () => {
  usePageIndexing();
  
  return (
    <>
      <DynamicSeo
        type="service"
        title="Product Design & Gen AI Development Services | UX/UI Design"
        description="Professional product design and Gen AI development services for startups and enterprises. Specializing in UX research, design systems, AI integration, and user-centered digital product development."
        image="https://barskyux.com/wp-content/uploads/2025/06/IMG_20250531_123836_952.webp"
        path="/services"
        serviceName="Product Design & Gen AI Development"
        benefits={[
          "AI-enhanced user experiences",
          "Data-driven design decisions",
          "Scalable design systems",
          "User research & testing"
        ]}
        targetAudience="Startups and enterprises looking to enhance their digital products with AI"
      />
      
      <ServicePageLayout />
    </>
  );
};

export default Services;

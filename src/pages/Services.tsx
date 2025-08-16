
import React from "react";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import { usePageIndexing } from "@/hooks/usePageIndexing";

const Services = () => {
  usePageIndexing();
  
  return (
    <ServicePageLayout />
  );
};

export default Services;

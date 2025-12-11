
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import { usePageIndexing } from "@/hooks/usePageIndexing";

const Services = () => {
  usePageIndexing();
  
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden relative bg-gradient-to-b from-background via-md-sys-surface-container-low/30 to-md-sys-surface-container/20">
      <Header />
      <main className="flex-1">
        <ServicePageLayout />
      </main>
      <Footer />
    </div>
  );
};

export default Services;


import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import { usePageIndexing } from "@/hooks/usePageIndexing";

const Services = () => {
  usePageIndexing();
  
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden relative bg-background">
      <Header />
      <main className="flex-1 pt-[calc(var(--header-height,64px)+32px)] pb-24">
        <ServicePageLayout />
      </main>
      <Footer />
    </div>
  );
};

export default Services;

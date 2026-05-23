import React from "react";
import Header from "@/components/Header";
import ThemedHero from "@/components/hero/ThemedHero";
import Footer from "@/components/Footer";
import FloatingConsultationBubble from "@/components/FloatingConsultationBubble";
import FloatingButtonGroup from "@/components/shared/FloatingButtonGroup";

const HomepageLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden relative">
      <Header />
      <main className="relative z-10">
        <section id="intro" tabIndex={-1} className="scroll-offset">
          <ThemedHero />
        </section>
      </main>
      <Footer />
      <FloatingConsultationBubble />
      <FloatingButtonGroup />
    </div>
  );
};

export default HomepageLayout;

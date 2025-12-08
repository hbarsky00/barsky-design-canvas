import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { ImageMaximizerProvider } from "@/context/ImageMaximizerContext";
import { HeadingHierarchyProvider } from "@/components/seo/HeadingHierarchyProvider";
import ScrollToTop from "@/components/ScrollToTop";
import BuyMeCoffeeButton from "@/components/shared/BuyMeCoffeeButton";
import { useRoomTransition } from "@/hooks/useRoomTransition";
import RoomTransition from "@/components/transitions/RoomTransition";
import SpatialNavigationWrapper from "@/components/transitions/SpatialNavigationWrapper";
import AnimatedRoutes from "@/components/transitions/AnimatedRoutes";

// Global SEO component
import UnifiedSEO from "@/components/seo/UnifiedSEO";
import SitemapGenerator from "@/components/seo/SitemapGenerator";

const queryClient = new QueryClient();

function AppContent() {
  const { isTransitioning, transitionStage, projectTitle } = useRoomTransition();

  return (
    <>
      <ScrollToTop />
      {/* Global Unified SEO System */}
      <UnifiedSEO />
      {/* Sitemap generator */}
      <SitemapGenerator />
      
      {/* Room Transition Overlay */}
      <RoomTransition 
        isVisible={isTransitioning} 
        projectTitle={projectTitle}
        stage={transitionStage}
      />
      
      <SpatialNavigationWrapper isNavigating={isTransitioning}>
        <AnimatedRoutes />
      </SpatialNavigationWrapper>
      
      <BuyMeCoffeeButton />
      <Toaster />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <HeadingHierarchyProvider>
          <ImageMaximizerProvider>
            <AppContent />
          </ImageMaximizerProvider>
        </HeadingHierarchyProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;

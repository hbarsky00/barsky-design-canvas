
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <div className="animate-pulse">
          <p className="text-barsky-text">Loading blog post...</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoadingState;

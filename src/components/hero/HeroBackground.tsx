
import React from "react";

const HeroBackground: React.FC = () => {
  return (
    <>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-gray-900/[0.04] bg-[size:50px_50px]" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
    </>
  );
};

export default HeroBackground;

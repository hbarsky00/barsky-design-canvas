
import React from "react";

const HeroBackground: React.FC = () => {
  return (
    <>
      {/* Layered Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-indigo-50/30" />
      <div className="absolute inset-0 bg-grid-gray-900/[0.02] bg-[size:50px_50px]" />
      
      {/* Floating Glass Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 glass-accent rounded-full blur-3xl gentle-float opacity-30" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl gentle-float opacity-40" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-blue-400/5 rounded-full blur-2xl gentle-float" style={{ animationDelay: '4s' }} />
    </>
  );
};

export default HeroBackground;

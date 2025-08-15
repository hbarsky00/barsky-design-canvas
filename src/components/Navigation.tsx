
import React from "react";

const Navigation: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Hiram Barsky</h1>
          <div className="flex items-center gap-6">
            <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</a>
            <a href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">Projects</a>
            <a href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

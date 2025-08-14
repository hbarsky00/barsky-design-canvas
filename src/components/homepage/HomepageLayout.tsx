
import React from "react";

interface HomepageLayoutProps {
  children?: React.ReactNode;
  navigateUp?: () => void;
  navigateDown?: () => void;
  canNavigateUp?: boolean;
  canNavigateDown?: boolean;
  isMobile?: boolean;
}

const HomepageLayout: React.FC<HomepageLayoutProps> = ({ 
  children,
  navigateUp,
  navigateDown,
  canNavigateUp,
  canNavigateDown,
  isMobile
}) => {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
};

export default HomepageLayout;

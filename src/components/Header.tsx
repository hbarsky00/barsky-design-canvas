
import React from "react";
import { cn } from "@/lib/utils";
import { useHeaderNavigation } from "./header/useHeaderNavigation";
import AnimatedLogo from "./AnimatedLogo";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const { isScrolledPastHero } = useHeaderNavigation();

  return (
    <header className={cn("w-full sticky top-0 z-40 bg-background/70 backdrop-blur border-b")}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className={cn("flex justify-between items-center", "h-16 sm:h-18")}>
          <div className="flex items-center justify-start min-w-0 flex-1">
            {isScrolledPastHero && (
              <Link to="/" className="mr-4 sm:mr-8">
                <AnimatedLogo />
              </Link>
            )}
          </div>

          {/* No authentication - removed sign in link */}
        </div>
      </div>
    </header>
  );
};

export default Header;

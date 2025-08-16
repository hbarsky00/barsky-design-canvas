import React from "react";
import { cn } from "@/lib/utils";
import { useHeaderNavigation } from "./header/useHeaderNavigation";
import Logo from "./Logo";
import ProfileAvatar from "./ProfileAvatar";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const { shouldShowLogo } = useHeaderNavigation();
  const isDesktop = useIsDesktop();

  return (
    <header className={cn("w-full sticky top-0 z-40 bg-background/70 backdrop-blur border-b")}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className={cn("flex justify-between items-center", "h-16 sm:h-18")}>
          <div className="flex items-center justify-start min-w-0 flex-1">
            {shouldShowLogo && (
              <Link to="/" className="mr-4 sm:mr-8">
                <Logo className="h-6 w-auto" />
              </Link>
            )}

            {isDesktop && <ProfileAvatar />}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/auth"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

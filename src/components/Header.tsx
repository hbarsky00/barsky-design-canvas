
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import Navigation from "./header/Navigation";
import ProfileAvatar from "./header/ProfileAvatar";
import MobileMenu from "./header/MobileMenu";
import AnimatedLogo from "./AnimatedLogo";
import CaptionNotificationIndicator from "./captions/CaptionNotificationIndicator";

const Header = () => {
  const location = useLocation();
  const isProjectsPage = location.pathname === '/projects';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <AnimatedLogo />
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {/* Global caption notification indicator */}
          {!isProjectsPage && (
            <CaptionNotificationIndicator className="hidden md:flex" />
          )}
          
          <Navigation />
          <ThemeToggle />
          <ProfileAvatar />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;

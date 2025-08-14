
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navigation: React.FC = () => {
  const location = useLocation();
  
  const openCalendly = () => {
    window.open("https://calendly.com/barskyuxdesignservices/30min", "_blank");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-bold text-xl text-foreground">
            Barsky Design
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/projects" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/projects') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Projects
            </Link>
            <Link 
              to="/services" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/services') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Services
            </Link>
            
            <Button onClick={openCalendly} size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Book Call
            </Button>
            
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

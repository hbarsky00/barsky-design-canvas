
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-foreground">
            Barsky Design
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/projects" className="text-foreground hover:text-primary">
              Projects
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary">
              About
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

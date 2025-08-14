
import React from "react";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer: React.FC = () => {
  const openCalendly = () => {
    window.open("https://calendly.com/barskyuxdesignservices/30min", "_blank");
  };

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="font-bold text-xl text-foreground mb-4">Barsky Design</h3>
            <p className="text-muted-foreground mb-4">
              Product Designer & Gen AI Developer creating intuitive digital experiences.
            </p>
            <Button onClick={openCalendly} size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Book a Consultation
            </Button>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://linkedin.com/in/hirambarsky" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a 
                  href="mailto:contact@barskydesign.pro"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Barsky Design. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

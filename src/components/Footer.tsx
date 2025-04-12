
import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-barsky-dark text-white py-12">
      <div className="section-container">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-2xl font-bold mb-6">Barsky<span className="text-barsky-blue">Design</span></h3>
            <p className="text-gray-300 mb-6">
              Creating beautiful, functional digital experiences that make an impact.
            </p>
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Barsky Design. All rights reserved.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-gray-300 hover:text-barsky-blue transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-300 hover:text-barsky-blue transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-barsky-blue transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-barsky-blue transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="text-barsky-blue">Email:</span>
                <a href="mailto:hello@barskydesign.com" className="text-gray-300 hover:text-barsky-blue transition-colors">
                  hello@barskydesign.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-barsky-blue">Phone:</span>
                <a href="tel:+12125551234" className="text-gray-300 hover:text-barsky-blue transition-colors">
                  +1 (212) 555-1234
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-barsky-blue">Location:</span>
                <span className="text-gray-300">New York, NY</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>Designed and developed with passion</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import React from "react";
import { Link } from "react-router-dom";
import { Linkedin, Github } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-barsky-dark text-white py-12">
      <div className="section-container">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-2xl font-bold mb-6">Barsky<span className="text-barsky-blue">Design</span></h3>
            <p className="text-gray-300 mb-6">
              Crafting innovative software solutions that drive technology forward.
            </p>
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Barsky Design. All rights reserved.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-barsky-blue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-300 hover:text-barsky-blue transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-barsky-blue transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-barsky-blue transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/#about" className="text-gray-300 hover:text-barsky-blue transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="text-gray-300 hover:text-barsky-blue transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="text-barsky-blue">Email:</span>
                <a href="mailto:hbarsky01@gmail.com" className="text-gray-300 hover:text-barsky-blue transition-colors">
                  hbarsky01@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-barsky-blue">Phone:</span>
                <a href="tel:2016684754" className="text-gray-300 hover:text-barsky-blue transition-colors">
                  (201) 668-4754
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-barsky-blue">Location:</span>
                <span className="text-gray-300">New York, NY</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://www.linkedin.com/in/hiram-barsky" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-300 hover:text-barsky-blue transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href="https://github.com/hbarsky00/barsky-design-canvas.git" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-300 hover:text-barsky-blue transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>Engineered with precision and passion</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

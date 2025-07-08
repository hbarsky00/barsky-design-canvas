
import React from "react";
import { Link } from "react-router-dom";
import { Linkedin, Github } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer 
      className="bg-neutral-900 text-neutral-50 py-12" 
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="section-container">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-2xl font-bold mb-6 white-text-nuclear">
              Hiram <span className="text-blue-vibrant">Barsky</span>
            </h3>
            <p className="white-text-nuclear mb-6 leading-relaxed">
              Product Designer & Gen AI Developer creating intelligent, user-centered digital experiences.
            </p>
            <p className="text-neutral-200 text-sm">
              &copy; {currentYear} Hiram Barsky. All rights reserved.
            </p>
          </div>
          
          <nav aria-label="Footer navigation">
            <h4 className="text-lg font-semibold mb-6 white-text-nuclear">Navigation</h4>
            <ul className="space-y-3" role="list">
              <li>
                <Link 
                  to="/" 
                  className="white-text-nuclear hover:text-blue-vibrant focus:text-blue-vibrant transition-colors duration-300 underline-offset-4 hover:underline focus:underline focus:outline-none focus:ring-2 focus:ring-blue-vibrant focus:ring-offset-2 focus:ring-offset-neutral-900 rounded"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/projects" 
                  className="white-text-nuclear hover:text-blue-vibrant focus:text-blue-vibrant transition-colors duration-300 underline-offset-4 hover:underline focus:underline focus:outline-none focus:ring-2 focus:ring-blue-vibrant focus:ring-offset-2 focus:ring-offset-neutral-900 rounded"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link 
                  to="/services" 
                  className="white-text-nuclear hover:text-blue-vibrant focus:text-blue-vibrant transition-colors duration-300 underline-offset-4 hover:underline focus:underline focus:outline-none focus:ring-2 focus:ring-blue-vibrant focus:ring-offset-2 focus:ring-offset-neutral-900 rounded"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="white-text-nuclear hover:text-blue-vibrant focus:text-blue-vibrant transition-colors duration-300 underline-offset-4 hover:underline focus:underline focus:outline-none focus:ring-2 focus:ring-blue-vibrant focus:ring-offset-2 focus:ring-offset-neutral-900 rounded"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="white-text-nuclear hover:text-blue-vibrant focus:text-blue-vibrant transition-colors duration-300 underline-offset-4 hover:underline focus:underline focus:outline-none focus:ring-2 focus:ring-blue-vibrant focus:ring-offset-2 focus:ring-offset-neutral-900 rounded"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="white-text-nuclear hover:text-blue-vibrant focus:text-blue-vibrant transition-colors duration-300 underline-offset-4 hover:underline focus:underline focus:outline-none focus:ring-2 focus:ring-blue-vibrant focus:ring-offset-2 focus:ring-offset-neutral-900 rounded"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          
          <div>
            <h4 className="text-lg font-semibold mb-6 white-text-nuclear">Contact</h4>
            <ul className="space-y-3" role="list">
              <li className="flex items-center gap-2">
                <span className="text-blue-vibrant font-medium" aria-label="Email address">Email:</span>
                <a 
                  href="mailto:hbarsky01@gmail.com" 
                  className="white-text-nuclear hover:text-blue-vibrant focus:text-blue-vibrant transition-colors duration-300 underline-offset-4 hover:underline focus:underline focus:outline-none focus:ring-2 focus:ring-blue-vibrant focus:ring-offset-2 focus:ring-offset-neutral-900 rounded"
                >
                  hbarsky01@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-vibrant font-medium" aria-label="Phone number">Phone:</span>
                <a 
                  href="tel:2016684754" 
                  className="white-text-nuclear hover:text-blue-vibrant focus:text-blue-vibrant transition-colors duration-300 underline-offset-4 hover:underline focus:underline focus:outline-none focus:ring-2 focus:ring-blue-vibrant focus:ring-offset-2 focus:ring-offset-neutral-900 rounded"
                >
                  (201) 668-4754
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-vibrant font-medium" aria-label="Location">Location:</span>
                <span className="white-text-nuclear">New York, NY</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-4 white-text-nuclear">Connect</h4>
              <div className="flex space-x-4" role="list">
                <a 
                  href="https://www.linkedin.com/in/hiram-barsky" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="white-text-nuclear hover:text-blue-vibrant focus:text-blue-vibrant transition-colors duration-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-vibrant focus:ring-offset-2 focus:ring-offset-neutral-900"
                  aria-label="Connect on LinkedIn (opens in new tab)"
                >
                  <Linkedin size={24} strokeWidth={2.5} />
                </a>
                <a 
                  href="https://github.com/hbarsky00/barsky-design-canvas.git" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="white-text-nuclear hover:text-blue-vibrant focus:text-blue-vibrant transition-colors duration-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-vibrant focus:ring-offset-2 focus:ring-offset-neutral-900"
                  aria-label="View GitHub repository (opens in new tab)"
                >
                  <Github size={24} strokeWidth={2.5} />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 mt-12 pt-8 text-center text-neutral-200 text-sm">
          <p>Engineered with precision and passion</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

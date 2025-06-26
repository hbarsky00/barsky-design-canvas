
import React from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Linkedin, Github, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackContentEngagement } from "@/lib/analytics";

const ContactInformation: React.FC = () => {
  const openCalendly = () => {
    window.open("https://calendly.com/barskyuxdesignservices/30min", "_blank");
    trackContentEngagement('contact', 'consultation-booking', 'Calendly Booking');
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-barsky-dark dark:text-white">Contact Information</h3>
      <p className="text-barsky-text dark:text-gray-300 mb-8">
        Have a project in mind or want to discuss a collaboration? Feel free to reach out — 
        I'm always open to new opportunities and challenges.
      </p>
      
      {/* Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Button onClick={openCalendly} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
          <Calendar className="mr-2 h-5 w-5" />
          Schedule a Free Consultation
        </Button>
        <Button variant="outline" size="lg" asChild className="border-gray-300 text-gray-700 hover:bg-gray-50">
          <Link to="#contact-form">
            Contact Me
          </Link>
        </Button>
      </div>
      
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-barsky-blue/10 p-3 rounded-full">
            <Mail className="w-5 h-5 text-barsky-blue" />
          </div>
          <div>
            <h4 className="font-medium text-barsky-dark dark:text-white">Email</h4>
            <a href="mailto:hbarsky01@gmail.com" className="text-barsky-text dark:text-gray-300 hover:text-barsky-blue transition-colors">
              hbarsky01@gmail.com
            </a>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-barsky-blue/10 p-3 rounded-full">
            <MapPin className="w-5 h-5 text-barsky-blue" />
          </div>
          <div>
            <h4 className="font-medium text-barsky-dark dark:text-white">Location</h4>
            <p className="text-barsky-text dark:text-gray-300">New York, NY</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-barsky-blue/10 p-3 rounded-full">
            <Phone className="w-5 h-5 text-barsky-blue" />
          </div>
          <div>
            <h4 className="font-medium text-barsky-dark dark:text-white">Phone</h4>
            <a href="tel:2016684754" className="text-barsky-text dark:text-gray-300 hover:text-barsky-blue transition-colors">
              (201) 668-4754
            </a>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h4 className="font-medium text-barsky-dark dark:text-white mb-4">Connect on Social</h4>
        <div className="flex gap-4">
          <a 
            href="https://www.linkedin.com/in/hiram-barsky" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-white border border-gray-200 p-3 rounded-full hover:bg-blue-50 hover:border-blue-200 transition-colors shadow-sm"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} className="text-blue-600" />
          </a>
          <a 
            href="https://github.com/hbarsky00/barsky-design-canvas.git" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-white border border-gray-200 p-3 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm"
            aria-label="GitHub"
          >
            <Github size={20} className="text-gray-700" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;

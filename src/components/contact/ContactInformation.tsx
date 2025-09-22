import React from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Linkedin, Github, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackContentEngagement } from "@/lib/analytics";
const ContactInformation: React.FC = () => {
  const openCalendly = () => {
    if (typeof window !== 'undefined') {
      window.open("https://calendly.com/barskyuxdesignservices/30min", "_blank");
      trackContentEngagement('contact', 'consultation-booking', 'Calendly Booking');
    }
  };
  return <div>
      <h3 className="text-2xl font-bold mb-6 text-barsky-dark dark:text-white">Contact Information</h3>
      <p className="text-barsky-text dark:text-gray-300 mb-8">
        Have a project in mind or want to discuss a collaboration? Feel free to reach out — 
        I'm always open to new opportunities and challenges.
      </p>
      
      {/* Quick Action Button - Only Schedule Consultation */}
      <div className="mb-8">
        <Button onClick={openCalendly} size="lg" variant="brand" className="w-full sm:w-auto font-semibold text-slate-900">
          <Calendar className="mr-2 h-5 w-5" />
          Schedule a Free Consultation
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
          <a href="https://www.linkedin.com/in/hiram-barsky" target="_blank" rel="noopener noreferrer" className="bg-barsky-blue/10 p-3 rounded-full hover:bg-barsky-blue hover:text-white transition-colors" aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
          <a href="https://github.com/hbarsky00/barsky-design-canvas.git" target="_blank" rel="noopener noreferrer" className="bg-barsky-blue/10 p-3 rounded-full hover:bg-barsky-blue hover:text-white transition-colors" aria-label="GitHub">
            <Github size={20} />
          </a>
        </div>
      </div>
    </div>;
};
export default ContactInformation;
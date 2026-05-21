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
      <h3 className="text-xl font-bold mb-2 text-barsky-dark dark:text-white">Contact Information</h3>
      <p className="text-sm text-barsky-text dark:text-gray-300 mb-4">
        Have a project in mind or want to discuss a collaboration? Feel free to reach out.
      </p>

      <div className="mb-4 text-slate-50">
       <Button onClick={openCalendly} variant="brand" size="sm" className="w-full sm:w-auto font-semibold">
  <Calendar className="mr-2 h-4 w-4" />
  Schedule a Free Consultation
      </Button>
      </div>

      <div className="flex flex-col gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-barsky-blue/10 p-2 rounded-full">
            <Mail className="w-4 h-4 text-barsky-blue" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-barsky-dark dark:text-white">Email</h4>
            <a href="mailto:hbarsky01@gmail.com" className="text-sm text-barsky-text dark:text-gray-300 hover:text-barsky-blue transition-colors">
              hbarsky01@gmail.com
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-barsky-blue/10 p-2 rounded-full">
            <MapPin className="w-4 h-4 text-barsky-blue" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-barsky-dark dark:text-white">Location</h4>
            <p className="text-sm text-barsky-text dark:text-gray-300">Clifton, NJ</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-barsky-blue/10 p-2 rounded-full">
            <Phone className="w-4 h-4 text-barsky-blue" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-barsky-dark dark:text-white">Phone</h4>
            <a href="tel:2016684754" className="text-sm text-barsky-text dark:text-gray-300 hover:text-barsky-blue transition-colors">
              (201) 668-4754
            </a>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-barsky-dark dark:text-white mb-2">Connect on Social</h4>
        <div className="flex gap-3">
          <a href="https://www.linkedin.com/in/hiram-barsky" target="_blank" rel="noopener noreferrer" className="bg-barsky-blue/10 p-2 rounded-full hover:bg-barsky-blue hover:text-white transition-colors" aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
          <a href="https://github.com/hbarsky00/barsky-design-canvas.git" target="_blank" rel="noopener noreferrer" className="bg-barsky-blue/10 p-2 rounded-full hover:bg-barsky-blue hover:text-white transition-colors" aria-label="GitHub">
            <Github size={18} />
          </a>
        </div>
      </div>
    </div>;
};
export default ContactInformation;
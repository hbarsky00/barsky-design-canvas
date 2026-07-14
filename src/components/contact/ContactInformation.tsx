import React from "react";
import { Mail, MapPin, Phone, Linkedin, Github, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackContentEngagement } from "@/lib/analytics";

const ContactInformation: React.FC = () => {
  const openCalendly = () => {
    if (typeof window !== "undefined") {
      window.open("https://calendly.com/barskyuxdesignservices/30min", "_blank");
      trackContentEngagement("contact", "consultation-booking", "Calendly Booking");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
        Contact information
      </h2>
      <p className="text-sm text-muted-foreground mt-1 mb-5">
        Have a project in mind or want to collaborate? Reach out.
      </p>

      <button
        onClick={openCalendly}
        className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-lg border border-primary text-primary text-sm font-semibold bg-white hover:bg-primary hover:text-primary-foreground transition-colors self-start mb-6"
      >
        <Calendar className="h-4 w-4" />
        Schedule a free consultation
      </button>


      <div className="space-y-4">
        <a
          href="mailto:hbarsky01@gmail.com"
          className="flex items-center gap-3 group"
        >
          <div className="bg-primary/10 p-2.5 rounded-lg group-hover:bg-primary/20 transition-colors">
            <Mail className="w-4 h-4 text-primary" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-medium text-foreground/70 uppercase tracking-wide">
              Email
            </div>
            <div className="text-sm text-foreground group-hover:text-primary transition-colors truncate">
              hbarsky01@gmail.com
            </div>
          </div>
        </a>

        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2.5 rounded-lg">
            <MapPin className="w-4 h-4 text-primary" />
          </div>
          <div>
            <div className="text-xs font-medium text-foreground/70 uppercase tracking-wide">
              Location
            </div>
            <div className="text-sm text-foreground">Clifton, NJ</div>
          </div>
        </div>

        <a href="tel:2016684754" className="flex items-center gap-3 group">
          <div className="bg-primary/10 p-2.5 rounded-lg group-hover:bg-primary/20 transition-colors">
            <Phone className="w-4 h-4 text-primary" />
          </div>
          <div>
            <div className="text-xs font-medium text-foreground/70 uppercase tracking-wide">
              Phone
            </div>
            <div className="text-sm text-foreground group-hover:text-primary transition-colors">
              (201) 668-4754
            </div>
          </div>
        </a>
      </div>

      <div className="mt-auto pt-6">
        <div className="text-xs font-medium text-foreground/70 uppercase tracking-wide mb-2">
          Connect
        </div>
        <div className="flex gap-2">
          <a
            href="https://www.linkedin.com/in/hiram-barsky"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-border p-2.5 rounded-lg text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="https://github.com/hbarsky00/barsky-design-canvas.git"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-border p-2.5 rounded-lg text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;

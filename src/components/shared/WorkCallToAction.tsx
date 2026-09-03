import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const CALENDLY_URL = "https://calendly.com/barskyuxdesignservices/30min";

interface WorkCallToActionProps {
  /**
   * The homepage sends people to the contact form further down the same page;
   * a case study sends them to the rest of the work. Both keep Book a call as
   * the primary, because that is the action the site exists to produce.
   */
  secondary?: "more-work" | "message";
  className?: string;
}

/**
 * The "you have just seen the work, here is how to start" block.
 *
 * It lived inline at the bottom of every case study and nowhere else. Measured
 * on the live homepage at 1440x900: the page is 18 screens tall, the contact
 * form sits at screen 11.3, and there was exactly ONE booking CTA on it — in
 * the hero at screen 0.6, shown before a visitor has seen a single project.
 * Someone who read five screens of case studies had no way to book until they
 * had scrolled another five.
 *
 * Extracted rather than copied, because three separate times today a block that
 * existed in two places had been fixed in one of them and not the other.
 */
const WorkCallToAction: React.FC<WorkCallToActionProps> = ({
  secondary = "more-work",
  className = "",
}) => (
  <div
    className={`rounded-2xl border border-border bg-card px-6 py-12 text-center md:px-12 md:py-16 ${className}`}
  >
    <h2 className="mb-3 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
      Want something like this built?
    </h2>
    <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
      I design and ship products end to end. Tell me what you're working on, or
      grab a time and we'll talk it through.
    </p>
    <div className="flex flex-col justify-center gap-3 sm:flex-row">
      <Button asChild size="lg">
        <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
          Book a call
        </a>
      </Button>
      <Button asChild size="lg" variant="outline">
        {secondary === "message" ? (
          <a href="#contact">Send a message</a>
        ) : (
          <Link to="/#case-studies">See more work</Link>
        )}
      </Button>
    </div>
  </div>
);

export default WorkCallToAction;

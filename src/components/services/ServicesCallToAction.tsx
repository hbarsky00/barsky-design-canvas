
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react";

// Rewritten 2026-08-05 (AEO lever 2 cycle) — the previous copy claimed
// "a clear roadmap to 40%+ improvement" (a fabricated, unsourced number)
// and both CTA buttons were dead: /get-started has never been a real
// route (404), and /projects redirects to a #projects anchor on a
// Projects.tsx component that isn't rendered anywhere in the current
// site. Replaced with the same Calendly-first CTA pattern used on
// /services and every promo page.
const CALENDLY = "https://calendly.com/barskyuxdesignservices/30min";

const ServicesCallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container px-4 mx-auto max-w-4xl text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="h-6 w-6 text-blue-600" />
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Ready to Start a Project?</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
          Thirty Minutes. Bring the Hard Problem.
        </h2>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          A call to scope the problem honestly — if I'm not the right person for it, I'll say so and point you somewhere better.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>24-hour response time</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>Working prototype within a week</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>One senior designer, no account team</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            variant="brand"
            asChild
          >
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
              <Sparkles className="mr-2 h-5 w-5" />
              Book a Call
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>

          <Button
            variant="outline"
            size="lg"
            asChild
          >
            <Link to="/case-studies" className="flex items-center justify-center">
              See Shipped Work First
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesCallToAction;

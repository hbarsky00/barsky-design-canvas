import React from "react";
import { Button } from "@/components/ui/button";

const CallToActionSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Ready for Your Own Story-Driven Solution?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Let's start with a conversation about your real challenges, not a sales pitch.
        </p>
        <Button size="lg" variant="high-contrast" className="font-semibold px-8 py-4 text-lg">
          Start the Conversation
        </Button>
      </div>
    </section>
  );
};

export default CallToActionSection;

import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const Pricing = () => {
  const openCalendly = () => {
    // Replace with your actual Calendly link
    window.open("https://calendly.com/your-calendly-link", "_blank");
  };

  return (
    <section id="pricing" className="py-20 bg-slate-50">
      <div className="section-container">
        <h2 className="text-3xl font-bold text-center mb-12">Design Partnership</h2>
        
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <h3 className="text-2xl font-bold text-center">Monthly Design Partnership</h3>
              <p className="text-4xl font-bold text-center mt-4">$8,000<span className="text-lg font-normal">/month</span></p>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <ul className="space-y-3 text-slate-600">
                <li>✓ Dedicated Design Support</li>
                <li>✓ Web & Mobile App Design</li>
                <li>✓ UX/UI Consultation</li>
                <li>✓ Design System Development</li>
                <li>✓ Unlimited Revisions</li>
                <li>✓ Priority Support</li>
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button 
                onClick={openCalendly} 
                className="w-full"
                size="lg"
              >
                <Calendar className="mr-2" />
                Schedule a Call
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

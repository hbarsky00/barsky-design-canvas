
import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, PenLine, Users, Clock } from "lucide-react";

const Pricing = () => {
  const openCalendly = () => {
    window.open("https://calendly.com/barskyuxdesignservices/30min", "_blank");
  };

  return (
    <section id="pricing" className="py-20 bg-slate-50">
      <div className="section-container">
        <h2 className="text-3xl font-bold text-center mb-4">Product Design & AI Development Services</h2>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">
          I create intelligent web applications by combining thoughtful Product Design with cutting-edge generative AI integration, bringing your ideas to life through design and technology.
        </p>
        
        <div className="flex justify-center">
          <Card className="shadow-lg w-full max-w-2xl">
            <CardHeader>
              <h3 className="text-2xl font-bold text-center">Product Design & AI Integration</h3>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="bg-barsky-blue/10 p-2 rounded-full mt-1">
                  <PenLine className="w-5 h-5 text-barsky-blue" />
                </div>
                <div>
                  <h4 className="font-semibold text-barsky-dark">Product Design</h4>
                  <p className="text-slate-600 text-sm">Creating user-centered interfaces that seamlessly integrate AI capabilities, ensuring intuitive experiences for both human users and AI interactions.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-barsky-blue/10 p-2 rounded-full mt-1">
                  <Users className="w-5 h-5 text-barsky-blue" />
                </div>
                <div>
                  <h4 className="font-semibold text-barsky-dark">Gen AI Integration & Development</h4>
                  <p className="text-slate-600 text-sm">Developing intelligent web applications with AI-powered features like conversational interfaces, content generation, and personalized user experiences.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-barsky-blue/10 p-2 rounded-full mt-1">
                  <Clock className="w-5 h-5 text-barsky-blue" />
                </div>
                <div>
                  <h4 className="font-semibold text-barsky-dark">End-to-End Web Development</h4>
                  <p className="text-slate-600 text-sm">From concept to deployment, I handle the complete development lifecycle, combining design expertise with modern web technologies and AI integration.</p>
                </div>
              </div>
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

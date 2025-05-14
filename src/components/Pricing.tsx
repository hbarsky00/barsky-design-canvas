
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
        <h2 className="text-3xl font-bold text-center mb-4">My Design Services</h2>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">
          I offer comprehensive design solutions tailored to your specific needs, helping you create intuitive, engaging, and effective digital experiences.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-lg w-full">
            <CardHeader>
              <h3 className="text-2xl font-bold text-center">Design & Consultation</h3>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="bg-barsky-blue/10 p-2 rounded-full mt-1">
                  <PenLine className="w-5 h-5 text-barsky-blue" />
                </div>
                <div>
                  <h4 className="font-semibold text-barsky-dark">Product Design</h4>
                  <p className="text-slate-600 text-sm">Crafting user-centered interfaces with meticulous attention to detail, ensuring intuitive navigation and delightful interactions.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-barsky-blue/10 p-2 rounded-full mt-1">
                  <Users className="w-5 h-5 text-barsky-blue" />
                </div>
                <div>
                  <h4 className="font-semibold text-barsky-dark">User Research & Strategy</h4>
                  <p className="text-slate-600 text-sm">Employing data-driven methods to understand your users, identify pain points, and develop strategic design solutions.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-barsky-blue/10 p-2 rounded-full mt-1">
                  <Clock className="w-5 h-5 text-barsky-blue" />
                </div>
                <div>
                  <h4 className="font-semibold text-barsky-dark">Flexible Engagement Models</h4>
                  <p className="text-slate-600 text-sm">Whether you need ongoing support, fixed-scope projects, or expert consultation, I offer flexible options to accommodate your timeline and budget.</p>
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
          
          <Card className="shadow-lg w-full">
            <CardHeader>
              <h3 className="text-2xl font-bold text-center">My Design Process</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="font-bold text-barsky-blue">1.</span>
                  <span className="text-slate-700"><span className="font-semibold">Discovery:</span> Understanding your business goals, user needs, and project requirements</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-bold text-barsky-blue">2.</span>
                  <span className="text-slate-700"><span className="font-semibold">Research:</span> Analyzing user behavior, market trends, and competitive landscape</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-bold text-barsky-blue">3.</span>
                  <span className="text-slate-700"><span className="font-semibold">Design:</span> Creating wireframes, prototypes, and high-fidelity designs</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-bold text-barsky-blue">4.</span>
                  <span className="text-slate-700"><span className="font-semibold">Testing:</span> Validating solutions through user testing and iteration</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-bold text-barsky-blue">5.</span>
                  <span className="text-slate-700"><span className="font-semibold">Implementation:</span> Supporting development teams with detailed specifications</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button 
                onClick={openCalendly} 
                className="w-full"
                size="lg"
                variant="outline"
              >
                <Calendar className="mr-2" />
                Book a Consultation
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

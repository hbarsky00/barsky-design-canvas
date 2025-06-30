
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const ServicesCallToAction = () => {
  return (
    <section className="py-20 bg-barsky-blue/5">
      <div className="container px-4 mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Let's discuss how my design and development services can help you create exceptional digital experiences for your users.
        </p>
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            size="lg"
            asChild
            className="text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 text-base font-medium backdrop-blur-md transition-all duration-300 w-full sm:w-auto hover:shadow-xl border border-blue-600 hover:border-blue-600 relative overflow-hidden group"
          >
            <Link to="/projects" className="flex items-center">
              View Our Work
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesCallToAction;

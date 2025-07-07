
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react";

const ServicesCallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container px-4 mx-auto max-w-4xl text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="h-6 w-6 text-blue-600" />
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Ready to Transform Your Business?</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
          Start Your AI-Enhanced Project Today
        </h2>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Get a personalized project plan with AI-powered analysis, competitive insights, and a clear roadmap to 40%+ improvement.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>24-hour response time</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>Custom project roadmap</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>AI integration analysis</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            asChild
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link to="/get-started" className="flex items-center justify-center">
              <Sparkles className="mr-2 h-5 w-5" />
              Get Your Custom Project Plan
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            asChild
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-300"
          >
            <Link to="/projects" className="flex items-center justify-center">
              View More Projects
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesCallToAction;

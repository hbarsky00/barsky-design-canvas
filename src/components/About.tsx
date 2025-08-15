
import React from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const keyResults = [
  "40% conversion rate improvements",
  "60% faster design cycles", 
  "WCAG 2.1 compliance",
  "47 successful projects"
];

const coreSkills = [
  "Product Design", "AI Integration", "User Research", 
  "Design Systems", "React Development", "Accessibility"
];

const essentialTools = [
  "Figma", "ChatGPT", "Claude AI", "React", "Supabase", "Webflow"
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-12 bg-barsky-bg-light">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title text-center mb-8">Why Work With Me</h2>
          
          {/* Streamlined Introduction */}
          <div className="text-center mb-12">
            <p className="text-xl text-barsky-text mb-6 leading-relaxed">
              Lead UX Designer with 15+ years creating AI-enhanced digital experiences. 
              I turn complex user problems into simple, profitable solutions.
            </p>
            
            {/* Key Results Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {keyResults.map((result, index) => (
                <div key={index} className="text-center p-4 bg-white rounded-lg border">
                  <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <span className="text-sm text-barsky-text font-medium">{result}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Core Skills - Condensed */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="font-bold text-barsky-dark mb-4">Core Expertise</h3>
              <div className="grid grid-cols-2 gap-2">
                {coreSkills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-barsky-blue flex-shrink-0" />
                    <span className="text-sm text-barsky-text">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Essential Tools - Reduced */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="font-bold text-barsky-dark mb-4">AI-Enhanced Toolkit</h3>
              <div className="flex flex-wrap gap-2">
                {essentialTools.map((tool, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Single Focused CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">Ready to 10x Your Conversions?</h3>
            <p className="mb-6 text-lg">
              Join 47+ successful projects that achieved 40%+ conversion improvements 
              through AI-enhanced UX design.
            </p>
            <Button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              variant="brand"
              size="lg"
              className="font-semibold bg-white text-blue-600 hover:bg-gray-100"
            >
              Get Free Strategy Session
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            
            {/* Contact Info */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-sm opacity-90">
                <span className="font-medium">Email:</span> hello@barskydesign.pro | 
                <span className="font-medium"> Phone:</span> (201) 668-4754 | 
                <span className="font-medium"> Response:</span> 24hrs guaranteed
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

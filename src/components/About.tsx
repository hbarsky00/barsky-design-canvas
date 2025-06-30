
import React from "react";
import { CheckCircle, Target, Users, Lightbulb, Search, TrendingUp, Zap, Award } from "lucide-react";

const researchCapabilities = [
  "User Research & Usability Testing",
  "Competitive Analysis & Market Research", 
  "User Journey Mapping & Persona Development",
  "Data Analytics & Behavioral Analysis"
];

const designServices = [
  "Strategic UX/UI Design & Prototyping",
  "Design Systems & Component Libraries",
  "Information Architecture & Wireframing",
  "Accessibility & WCAG Compliance"
];

const businessOutcomes = [
  "Conversion Rate Optimization",
  "User Engagement & Retention Strategy",
  "Digital Product Strategy & Roadmapping", 
  "Cross-Functional Team Collaboration"
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-12 bg-barsky-bg-light">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="section-title">About Barsky Design</h2>
            <p className="text-barsky-text mb-6">
              Barsky Design is a research and design agency that helps businesses improve the user experience 
              of their digital products through comprehensive research, strategic thinking, and data-driven design solutions.
            </p>
            <p className="text-barsky-text mb-6">
              We believe that great user experiences start with deep user understanding. Our research-first approach 
              combines qualitative insights with quantitative data to inform every design decision, ensuring that 
              our solutions drive measurable business outcomes.
            </p>
            <p className="text-barsky-text mb-8">
              From early-stage startups to established enterprises, we partner with organizations to transform 
              user insights into exceptional digital experiences that users love and businesses benefit from.
            </p>
            
            <div className="flex flex-col gap-5 mb-8">
              <div className="flex items-center gap-4">
                <div className="bg-barsky-blue/10 p-3 rounded-full">
                  <Search className="w-6 h-6 text-barsky-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-barsky-dark">Research-Driven Approach</h3>
                  <p className="text-sm text-barsky-text-light">User insights inform every design decision</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-barsky-blue/10 p-3 rounded-full">
                  <Target className="w-6 h-6 text-barsky-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-barsky-dark">Strategic Design Thinking</h3>
                  <p className="text-sm text-barsky-text-light">Aligning user needs with business objectives</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-barsky-blue/10 p-3 rounded-full">
                  <TrendingUp className="w-6 h-6 text-barsky-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-barsky-dark">Measurable Business Impact</h3>
                  <p className="text-sm text-barsky-text-light">40%+ improvements in key user metrics</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-barsky-blue/10 p-3 rounded-full">
                  <Users className="w-6 h-6 text-barsky-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-barsky-dark">Collaborative Partnership</h3>
                  <p className="text-sm text-barsky-text-light">Seamless integration with your team</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-barsky-dark">Research Capabilities</h3>
              <div className="grid grid-cols-1 gap-3">
                {researchCapabilities.map((capability, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-barsky-blue flex-shrink-0" />
                    <span className="text-barsky-text">{capability}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-barsky-dark">Design Services</h3>
              <div className="grid grid-cols-1 gap-3">
                {designServices.map((service, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-barsky-blue flex-shrink-0" />
                    <span className="text-barsky-text">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-barsky-dark">Business Outcomes</h3>
              <div className="grid grid-cols-1 gap-3">
                {businessOutcomes.map((outcome, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-barsky-blue flex-shrink-0" />
                    <span className="text-barsky-text">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6 text-barsky-dark">Tools & Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {["User Research Tools", "Figma & Prototyping", "Analytics Platforms", "A/B Testing", "Accessibility Tools", "Design Systems", "Frontend Development", "Data Visualization"].map((tool, index) => (
                  <span key={index} className="bg-white px-4 py-2 rounded-full text-barsky-text text-sm shadow-sm border border-gray-200">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

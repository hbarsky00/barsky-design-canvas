
import React from "react";
import { CheckCircle, Briefcase, Award, Book, Brain, Target, Users, Zap } from "lucide-react";

const coreDesignSkills = [
  "User Research & Testing",
  "Interface Design & Prototyping",
  "Design Systems & Component Libraries",
  "Accessibility & WCAG Compliance"
];

const aiTechTools = [
  "Figma AI, Claude, Perplexity",
  "Frontend Development (HTML/CSS/JS)",
  "Analytics & A/B Testing Tools",
  "CMS and Development Handoff"
];

const businessCollaboration = [
  "Product Management Collaboration",
  "Conversion Optimization & ROI Analysis", 
  "Content Strategy & Information Architecture",
  "Stakeholder Communication & Presenting"
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-barsky-bg-light">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="section-title">About Hiram Barsky</h2>
            <p className="text-barsky-text mb-6">
              I'm an AI-native UX designer who understands that traditional UX roles are evolving, not disappearing. 
              The market demands T-shaped professionals who can bridge design, development, and business strategy.
            </p>
            <p className="text-barsky-text mb-6">
              While 77% of companies need accessibility expertise, but only 3% of businesses address it. 
              I've built my practice around this gap, combining WCAG compliance with AI-enhanced design processes 
              that deliver measurable business outcomes.
            </p>
            <p className="text-barsky-text mb-8">
              My daily toolkit includes Claude for research augmentation, Figma AI for rapid prototyping, 
              and Perplexity for competitive analysis. This isn't just about using new tools—it's about 
              leveraging AI strategically to solve complex user problems faster and more effectively.
            </p>
            
            <div className="flex flex-col gap-5 mb-8">
              <div className="flex items-center gap-4">
                <div className="bg-barsky-blue/10 p-3 rounded-full">
                  <Brain className="w-6 h-6 text-barsky-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-barsky-dark">AI-Enhanced Design Process</h3>
                  <p className="text-sm text-barsky-text-light">Daily use of Claude, Figma AI, and Perplexity</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-barsky-blue/10 p-3 rounded-full">
                  <Target className="w-6 h-6 text-barsky-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-barsky-dark">Business-Focused Results</h3>
                  <p className="text-sm text-barsky-text-light">40%+ conversion improvements through strategic design</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-barsky-blue/10 p-3 rounded-full">
                  <Users className="w-6 h-6 text-barsky-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-barsky-dark">Cross-Functional Collaboration</h3>
                  <p className="text-sm text-barsky-text-light">PM partnerships, developer handoff, content strategy</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-barsky-blue/10 p-3 rounded-full">
                  <Zap className="w-6 h-6 text-barsky-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-barsky-dark">Accessibility Specialist</h3>
                  <p className="text-sm text-barsky-text-light">WCAG 2.1 AA compliance and accessibility audits</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-barsky-dark">Core Design Skills</h3>
              <div className="grid grid-cols-1 gap-3">
                {coreDesignSkills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-barsky-blue flex-shrink-0" />
                    <span className="text-barsky-text">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-barsky-dark">AI & Tech Tools</h3>
              <div className="grid grid-cols-1 gap-3">
                {aiTechTools.map((skill, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-barsky-blue flex-shrink-0" />
                    <span className="text-barsky-text">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-barsky-dark">Business & Collaboration</h3>
              <div className="grid grid-cols-1 gap-3">
                {businessCollaboration.map((skill, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-barsky-blue flex-shrink-0" />
                    <span className="text-barsky-text">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6 text-barsky-dark">Design & Development Tools</h3>
              <div className="flex flex-wrap gap-3">
                {["Figma + AI", "Adobe Creative Suite", "Claude AI", "Perplexity", "Lovable.dev", "Webflow", "React/TypeScript", "WCAG Testing Tools", "Analytics Platforms"].map((tool, index) => (
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

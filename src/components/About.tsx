
import React from "react";
import { CheckCircle, Target, Users, Lightbulb, Search, TrendingUp, Zap, Award } from "lucide-react";

const uxUiCapabilities = [
  "User Research & AI-Enhanced Insights",
  "Interface Design & Prototyping", 
  "User Journey Mapping & Persona Development",
  "Usability Testing & Conversion Optimization"
];

const aiIntegrationServices = [
  "Gen AI Integration & Development",
  "AI-Powered Web Applications",
  "Intelligent User Interfaces & Chatbots",
  "AI-Enhanced Design Systems"
];

const developmentServices = [
  "React/Vue.js Web App Development",
  "Responsive Design & Performance Optimization",
  "API Integration & Real-time Features", 
  "Design-to-Code Automation Workflows"
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-12 bg-barsky-bg-light">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="section-title">About Hiram Barsky</h2>
            <p className="text-barsky-text mb-6">
              I'm Hiram Barsky, a UX/UI Product Designer who has discovered the transformative power of generative AI 
              in bringing creative visions to life. With a strong foundation in user-centered design and development, 
              I've embraced Gen AI as the game-changing tool that allows me to build complete web applications.
            </p>
            <p className="text-barsky-text mb-6">
              Gen AI has revolutionized how I work—what once required extensive coding now happens through intelligent 
              design-to-code workflows and AI-powered development tools. This means I can focus on what I do best: 
              creating exceptional user experiences while AI handles the heavy lifting of implementation.
            </p>
            <p className="text-barsky-text mb-8">
              I specialize in designing and developing intelligent web applications that combine beautiful, intuitive 
              interfaces with cutting-edge AI capabilities. From AI-enhanced UX research to generative AI integrations, 
              I help businesses harness AI in meaningful ways that truly benefit users.
            </p>
            
            <div className="flex flex-col gap-5 mb-8">
              <div className="flex items-center gap-4">
                <div className="bg-barsky-blue/10 p-3 rounded-full">
                  <Search className="w-6 h-6 text-barsky-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-barsky-dark">AI-Enhanced Design Process</h3>
                  <p className="text-sm text-barsky-text-light">Leveraging AI to accelerate research and development</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-barsky-blue/10 p-3 rounded-full">
                  <Target className="w-6 h-6 text-barsky-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-barsky-dark">End-to-End Development</h3>
                  <p className="text-sm text-barsky-text-light">From concept to deployment with AI integration</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-barsky-blue/10 p-3 rounded-full">
                  <TrendingUp className="w-6 h-6 text-barsky-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-barsky-dark">Human-First AI Solutions</h3>
                  <p className="text-sm text-barsky-text-light">AI that amplifies human capabilities, not replaces them</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-barsky-blue/10 p-3 rounded-full">
                  <Users className="w-6 h-6 text-barsky-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-barsky-dark">Rapid Prototyping</h3>
                  <p className="text-sm text-barsky-text-light">Quick concept-to-prototype with AI-powered workflows</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-barsky-dark">UX/UI Design</h3>
              <div className="grid grid-cols-1 gap-3">
                {uxUiCapabilities.map((capability, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-barsky-blue flex-shrink-0" />
                    <span className="text-barsky-text">{capability}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-barsky-dark">AI Integration</h3>
              <div className="grid grid-cols-1 gap-3">
                {aiIntegrationServices.map((service, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-barsky-blue flex-shrink-0" />
                    <span className="text-barsky-text">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-barsky-dark">Web Development</h3>
              <div className="grid grid-cols-1 gap-3">
                {developmentServices.map((service, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-barsky-blue flex-shrink-0" />
                    <span className="text-barsky-text">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6 text-barsky-dark">Tools & Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {["Figma & Prototyping", "React/Vue.js", "Gen AI APIs", "ChatGPT Integration", "Claude AI", "Design Systems", "Supabase", "Vercel Deployment"].map((tool, index) => (
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

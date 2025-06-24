
import React from "react";
import { CheckCircle, Briefcase, Award, Book } from "lucide-react";

const skills = [
  "UX/UI Design",
  "Design Systems",
  "Product Strategy",
  "User Research",
  "Design Thinking",
  "Interaction Design",
  "Wireframing & Prototyping",
  "Design Leadership"
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-barsky-bg-light">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-title">About Me</h2>
            <p className="text-barsky-text mb-6">
              I'm a Senior Product Designer with a passion for creating 
              user-centered digital experiences that solve complex problems 
              and drive business value through strategic design.
            </p>
            <p className="text-barsky-text mb-8">
              My approach combines deep user empathy, design thinking, 
              and a strategic mindset to craft intuitive and impactful 
              product solutions that bridge user needs with business goals.
            </p>
            
            <div className="flex flex-col gap-5 mb-8">
              <div className="flex items-center gap-4">
                <div className="bg-barsky-blue/10 p-3 rounded-full">
                  <Briefcase className="w-6 h-6 text-barsky-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-barsky-dark">Professional Experience</h3>
                  <p className="text-sm text-barsky-text-light">12+ years in product design</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-barsky-blue/10 p-3 rounded-full">
                  <Award className="w-6 h-6 text-barsky-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-barsky-dark">Design Recognition</h3>
                  <p className="text-sm text-barsky-text-light">Multiple design awards and patents</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-barsky-blue/10 p-3 rounded-full">
                  <Book className="w-6 h-6 text-barsky-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-barsky-dark">Continuous Learning</h3>
                  <p className="text-sm text-barsky-text-light">Staying ahead of design trends</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6 text-barsky-dark">Skills & Expertise</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-barsky-blue" />
                  <span className="text-barsky-text">{skill}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6 text-barsky-dark">Design Tools & Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {["Figma", "Adobe Creative Suite", "Zeplin", "Lovable.dev", "Protopen", "Webflow", "UXPilot", "Gamma", "Jira"].map((tool, index) => (
                  <span key={index} className="bg-white px-4 py-2 rounded-full text-barsky-text text-sm shadow-sm">
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

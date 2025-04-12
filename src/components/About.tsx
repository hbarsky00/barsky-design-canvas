
import React from "react";
import { CheckCircle, Briefcase, Award, Book } from "lucide-react";

const skills = [
  "UI/UX Design",
  "Web Development",
  "Brand Identity",
  "Mobile Design",
  "Frontend Development",
  "User Research",
  "Wireframing & Prototyping",
  "Design Systems"
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-barsky-bg-light">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-title">About Me</h2>
            <p className="text-barsky-text mb-6">
              I'm a passionate designer and developer with over 8 years of experience creating 
              beautiful digital experiences. I focus on creating intuitive, user-centered designs 
              that solve real problems while looking amazing.
            </p>
            <p className="text-barsky-text mb-8">
              My approach combines creative design thinking with technical expertise, 
              allowing me to bridge the gap between aesthetics and functionality. I believe in 
              creating work that not only looks good but performs excellently.
            </p>
            
            <div className="flex flex-col gap-5 mb-8">
              <div className="flex items-center gap-4">
                <div className="bg-barsky-blue/10 p-3 rounded-full">
                  <Briefcase className="w-6 h-6 text-barsky-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-barsky-dark">Professional Experience</h3>
                  <p className="text-sm text-barsky-text-light">8+ years in design and development</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-barsky-blue/10 p-3 rounded-full">
                  <Award className="w-6 h-6 text-barsky-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-barsky-dark">Award Recognition</h3>
                  <p className="text-sm text-barsky-text-light">Multiple design award recipient</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-barsky-blue/10 p-3 rounded-full">
                  <Book className="w-6 h-6 text-barsky-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-barsky-dark">Continuous Learning</h3>
                  <p className="text-sm text-barsky-text-light">Always exploring new technologies</p>
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
              <h3 className="text-2xl font-bold mb-6 text-barsky-dark">Tools & Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {["Figma", "Adobe XD", "Photoshop", "Illustrator", "HTML/CSS", "JavaScript", "React", "Tailwind CSS", "TypeScript"].map((tool, index) => (
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


import React from "react";
import { CheckCircle, Briefcase, Award, Book } from "lucide-react";

const skills = [
  "Software Engineering",
  "Web Development",
  "Cloud Computing",
  "System Design",
  "Frontend Development",
  "Backend Development",
  "DevOps",
  "Technical Leadership"
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-barsky-bg-light">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-title">About Me</h2>
            <p className="text-barsky-text mb-6">
              I'm a passionate software engineer with extensive experience creating 
              robust, scalable digital solutions. I focus on developing innovative 
              technologies that solve complex problems and drive business value.
            </p>
            <p className="text-barsky-text mb-8">
              My approach combines technical expertise with strategic thinking, 
              enabling me to design and implement cutting-edge software solutions 
              that meet both technical and business requirements.
            </p>
            
            <div className="flex flex-col gap-5 mb-8">
              <div className="flex items-center gap-4">
                <div className="bg-barsky-blue/10 p-3 rounded-full">
                  <Briefcase className="w-6 h-6 text-barsky-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-barsky-dark">Professional Experience</h3>
                  <p className="text-sm text-barsky-text-light">10+ years in software engineering</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-barsky-blue/10 p-3 rounded-full">
                  <Award className="w-6 h-6 text-barsky-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-barsky-dark">Technical Achievement</h3>
                  <p className="text-sm text-barsky-text-light">Multiple patents and innovation awards</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-barsky-blue/10 p-3 rounded-full">
                  <Book className="w-6 h-6 text-barsky-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-barsky-dark">Continuous Learning</h3>
                  <p className="text-sm text-barsky-text-light">Constantly exploring emerging technologies</p>
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
                {["React", "TypeScript", "Node.js", "Docker", "Kubernetes", "AWS", "GraphQL", "PostgreSQL", "Python"].map((tool, index) => (
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


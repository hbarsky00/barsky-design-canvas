
import React from "react";
import { Search, Lightbulb, Code, BarChart } from "lucide-react";

const AboutProcess: React.FC = () => {
  const steps = [
    {
      icon: Search,
      title: "Research & Discovery",
      description: "Deep dive into user needs, market research, and business goals."
    },
    {
      icon: Lightbulb,
      title: "Ideation & Strategy",
      description: "Brainstorm solutions and create strategic design approaches."
    },
    {
      icon: Code,
      title: "Design & Development",
      description: "Create prototypes, iterate based on feedback, and build solutions."
    },
    {
      icon: BarChart,
      title: "Measure & Optimize",
      description: "Analyze results, gather insights, and continuously improve."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">My Process</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <step.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutProcess;

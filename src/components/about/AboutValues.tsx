
import React from "react";
import { Heart, Users, Target } from "lucide-react";

const AboutValues: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: "User-Centered",
      description: "Every decision starts with understanding user needs and pain points."
    },
    {
      icon: Users,
      title: "Collaborative",
      description: "The best solutions come from diverse perspectives working together."
    },
    {
      icon: Target,
      title: "Results-Driven",
      description: "Design should solve real problems and drive measurable outcomes."
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">My Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <value.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;

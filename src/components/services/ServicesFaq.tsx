
import React from "react";

const ServicesFaq = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4 mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">What is your design process?</h3>
            <p className="text-slate-600">My design process begins with understanding your business goals and user needs through discovery and research. I then create wireframes and prototypes to test concepts before moving into high-fidelity design. Throughout the process, I collaborate closely with stakeholders and iterate based on feedback to ensure the final product meets both business objectives and user expectations.</p>
          </div>
          
          <div className="bg-slate-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">How do you charge for your services?</h3>
            <p className="text-slate-600">I offer flexible engagement models including hourly rates, project-based pricing, and retainer arrangements. The pricing structure depends on project scope, complexity, and timeline. During our initial consultation, I'll work with you to determine the most appropriate pricing model for your specific needs.</p>
          </div>
          
          <div className="bg-slate-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">How long does a typical project take?</h3>
            <p className="text-slate-600">Project timelines vary based on scope and complexity. A simple website redesign might take 4-6 weeks, while a comprehensive mobile application could require 3-6 months. During our initial consultation, I'll provide a detailed timeline based on your specific requirements and desired launch date.</p>
          </div>
          
          <div className="bg-slate-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Do you work with clients remotely?</h3>
            <p className="text-slate-600">Yes, I work with clients worldwide through effective remote collaboration tools. I use tools like Figma for design collaboration, Slack for communication, and Zoom for meetings. My process ensures clear communication and regular updates regardless of geographic location.</p>
          </div>
          
          <div className="bg-slate-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">What industries do you specialize in?</h3>
            <p className="text-slate-600">I've worked across diverse industries including healthcare, fintech, education, e-commerce, and SaaS. This broad experience allows me to bring fresh perspectives while understanding the unique requirements and constraints of different sectors. You can view examples of my work in various industries in my portfolio.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesFaq;

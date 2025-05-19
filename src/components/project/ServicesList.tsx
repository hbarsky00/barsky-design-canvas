
import React from "react";

const ServicesList: React.FC = () => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-barsky-dark mb-4">Services Provided</h2>
      <ul className="list-disc pl-5 space-y-2 text-barsky-text">
        <li>UX/UI Design Consultation</li>
        <li>User Research & Testing</li>
        <li>Design System Creation</li>
        <li>Cross-Platform Optimization</li>
        <li>Mobile and Desktop Interface Design</li>
        <li>User Flow Optimization</li>
        <li>Accessibility Implementation</li>
        <li>Responsive Web Development</li>
      </ul>
    </div>
  );
};

export default ServicesList;

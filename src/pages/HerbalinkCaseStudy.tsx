import React from "react";
import CleanCaseStudyTemplate from "@/components/case-study/CleanCaseStudyTemplate";
import herbalinkOgImage from "@/assets/social/herbalink-og.jpg";

const HerbalinkCaseStudy: React.FC = () => {
  return (
    <CleanCaseStudyTemplate
      // SEO Data
      title="Herbalink: AI-Enhanced Herbalist Platform Case Study | Hiram Barsky"
      description="85% of users find their ideal herbalist match within 3 recommendations. See how AI-powered matching revolutionized natural healthcare access."
      image={`https://barskydesign.pro${herbalinkOgImage}`}
      caseStudyName="Herbalink"
      seoResults={["85% user match success rate", "40% faster consultation bookings", "AI-powered herbalist matching"]}
      technologies={["React Native", "AI Matching", "Mobile UX", "Healthcare Platform"]}
      path="/case-studies/herbalink-mobile-herbalist-ux-design"
      
      // Clean Content
      caseStudyTitle="Herbalink Platform"
      subtitle="Connecting patients with certified herbalists through AI-powered matching"
      heroImage="/lovable-uploads/6ac697d2-0417-49dc-b4de-cb3702484e09.png"
      
      challenge="Patients couldn't find qualified herbalists due to geographic limitations and lack of credential verification"
      solution="AI-powered matching platform that connects users with certified herbalists based on health profiles and preferences"
      impact="78% match success rate with 40% faster booking and improved wellness outcomes"
      
      problemText="Traditional herbalist consultations were limited by geography and accessibility. Patients in rural areas had no access to qualified practitioners, while urban patients struggled to verify credentials and find specialists matching their specific health needs."
      problemImage="/lovable-uploads/8c5f2c56-320c-4d0c-9ea9-beb831b8077f.png"
      
      solutionSteps={[
        {
          text: "We built an AI platform that matches patients with herbalists based on specialization, location, and treatment approach. The system verifies credentials automatically and enables video consultations.",
          image: "/lovable-uploads/6ac697d2-0417-49dc-b4de-cb3702484e09.png"
        },
        {
          text: "Smart matching recommendations analyze health profiles, treatment preferences, and communication styles to suggest the perfect herbalist matches within 3 recommendations.",
          image: "/lovable-uploads/8c5f2c56-320c-4d0c-9ea9-beb831b8077f.png"
        },
        {
          text: "Seamless scheduling and ongoing wellness tracking create lasting relationships between patients and herbalists through integrated care management.",
          image: "/lovable-uploads/67facb2d-d64e-44c8-9f6a-ae33a0db8adc.png"
        }
      ]}
      
      metrics={[
        { value: "78%", label: "Match Success Rate" },
        { value: "40%", label: "Faster Booking" },
        { value: "89%", label: "User Satisfaction" }
      ]}
      
      currentCaseStudyId="herbalink"
    />
  );
};

export default HerbalinkCaseStudy;
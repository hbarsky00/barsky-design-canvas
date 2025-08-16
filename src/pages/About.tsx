import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PersonalStory from "@/components/about/PersonalStory";
import ProfessionalJourney from "@/components/about/ProfessionalJourney";
import SkillsShowcase from "@/components/about/SkillsShowcase";
import WorkingWithMe from "@/components/about/WorkingWithMe";
import CallToAction from "@/components/about/CallToAction";

const About: React.FC = () => {
  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <main className="pt-24 pb-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <PersonalStory />
            <ProfessionalJourney />
            <SkillsShowcase />
            <WorkingWithMe />
            <CallToAction />
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default About;

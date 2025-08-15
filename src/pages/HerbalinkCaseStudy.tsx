import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Users, TrendingUp, Zap, Target, CheckCircle, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";

const HerbalinkCaseStudy: React.FC = () => {
  const heroContent = (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="inline-flex items-center bg-success-green/10 px-4 py-2 rounded-full text-sm font-medium text-success-green mb-4"
      >
        <Award className="h-5 w-5 mr-2" />
        UX Design & AI Integration
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6"
      >
        Herbalink: AI-Powered Herbal Consultation
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-xl text-neutral-500 max-w-3xl mx-auto leading-relaxed mb-8"
      >
        Revolutionizing herbal consultations with AI-driven personalization and a mobile-first approach.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <Button
          size="lg"
          className="bg-blue-vibrant hover:bg-blue-accent text-white font-semibold py-4 px-8 text-lg group"
          onClick={() => window.location.href = '/contact'}
        >
          Book Free Consultation
        </Button>
      </motion.div>
    </div>
  );

  const section1Content = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-2xl font-bold text-neutral-900 mb-4">Challenge</h3>
        <p className="text-neutral-500">
          Herbalink faced the challenge of providing personalized herbal consultations at scale.
          The traditional process was time-consuming and lacked the ability to efficiently match clients with the right herbal remedies.
        </p>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-neutral-900 mb-4">Solution</h3>
        <p className="text-neutral-500">
          I designed an AI-powered mobile app that streamlines the consultation process.
          The app uses machine learning algorithms to analyze user data and provide personalized herbal recommendations,
          making herbal consultations more accessible and efficient.
        </p>
      </div>
    </div>
  );

  const section2Content = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-2xl font-bold text-neutral-900 mb-4">AI-Driven Personalization</h3>
        <p className="text-neutral-500">
          The app's AI algorithms analyze user data, including health history, lifestyle, and preferences,
          to provide personalized herbal recommendations. This ensures that each client receives the most effective and tailored herbal remedies.
        </p>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-neutral-900 mb-4">Mobile-First Approach</h3>
        <p className="text-neutral-500">
          The mobile-first design ensures that users can access herbal consultations anytime, anywhere.
          The app is optimized for mobile devices, providing a seamless and user-friendly experience.
        </p>
      </div>
    </div>
  );

  const section3Content = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-2xl font-bold text-neutral-900 mb-4">Increased User Engagement</h3>
        <p className="text-neutral-500">
          The AI-powered personalization and mobile-first approach led to a 65% increase in user engagement.
          Users were more likely to complete consultations and follow herbal recommendations, resulting in better health outcomes.
        </p>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-neutral-900 mb-4">Faster Consultation Booking</h3>
        <p className="text-neutral-500">
          The app's intelligent matching algorithms reduced consultation booking time by 45%.
          Users could quickly find the right herbal remedies and book consultations with ease, improving the overall user experience.
        </p>
      </div>
    </div>
  );

  return (
    <CaseStudyLayout
      title="Herbalink: AI-Powered Herbal Consultation"
      description="Revolutionizing herbal consultations with AI-driven personalization and a mobile-first approach."
      image="/lovable-uploads/4d0f57b5-653d-42fb-88c0-f942d18a6a84.png"
      projectName="Herbalink"
      results={[
        "65% increase in user engagement",
        "45% faster consultation booking"
      ]}
      technologies={["AI", "Mobile App Design", "UX Research"]}
      path="/project/herbalink"
      heroSection={heroContent}
      sections={[
        { id: "challenge-solution", title: "Challenge & Solution", content: section1Content },
        { id: "ai-mobile-approach", title: "AI & Mobile-First Approach", content: section2Content },
        { id: "key-results", title: "Key Results", content: section3Content }
      ]}
    />
  );
};

export default HerbalinkCaseStudy;

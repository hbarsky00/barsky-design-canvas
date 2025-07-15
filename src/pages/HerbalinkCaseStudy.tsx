import React from "react";
import { MapPin, Shield, Users, Heart, CheckCircle2, Star, Sprout, Leaf } from "lucide-react";
import SimplifiedCaseStudyTemplate from "@/components/case-study/SimplifiedCaseStudyTemplate";
import herbalinkOgImage from "@/assets/social/herbalink-og.jpg";

const HerbalinkCaseStudy: React.FC = () => {
  return (
    <SimplifiedCaseStudyTemplate
      // SEO Data
      title="Herbalink: AI-Enhanced Herbalist Platform Case Study | Hiram Barsky"
      description="85% of users find their ideal herbalist match within 3 recommendations. See how AI-powered matching revolutionized natural healthcare access."
      image={`https://barskydesign.pro${herbalinkOgImage}`}
      projectName="Herbalink"
      seoResults={["85% user match success rate", "40% faster consultation bookings", "AI-powered herbalist matching"]}
      technologies={["React Native", "AI Matching", "Mobile UX", "Healthcare Platform"]}
      path="/project/herbalink"
      
      // Hero Section
      hero={{
        subtitle: "AI-Enhanced Herbalist Platform",
        title: "Connecting Wellness Seekers with Perfect Herbalist Matches",
        description: "85% of users find their ideal herbalist match within 3 recommendations. Our AI-powered platform revolutionizes natural healthcare access by connecting wellness seekers with qualified herbalists based on personalized health profiles.",
        heroImage: "/lovable-uploads/6ac697d2-0417-49dc-b4de-cb3702484e09.png",
        heroImageAlt: "Herbalink mobile app showing herbalist profiles and matching interface",
        projectId: "herbalink",
        client: "Herbalink Wellness",
        timeline: "10 months",
        services: ["Mobile App Design", "AI Matching Algorithm", "Healthcare UX"]
      }}
      
      // Challenge Section
      challenge={{
        title: "The Challenge",
        subtitle: "Healthcare Access Barriers",
        description: "Traditional herbalist consultations faced significant barriers including geographic limitations, credential verification challenges, and lack of personalized matching, leaving many without access to qualified natural healthcare practitioners.",
        painPoints: [
          {
            title: "Geographic Limitations",
            description: "Traditional herbalist consultations required in-person visits, leaving rural communities without access to qualified practitioners.",
            impact: "60% of potential patients unable to access herbalist services due to location",
            icon: <MapPin className="h-8 w-8" />
          },
          {
            title: "Credential Verification",
            description: "No standardized way to verify herbalist qualifications, leading to uncertainty about practitioner expertise.",
            impact: "Lack of trust preventing 45% of users from booking consultations",
            icon: <Shield className="h-8 w-8" />
          },
          {
            title: "Personalized Matching",
            description: "Word-of-mouth referrals couldn't account for individual health needs, treatment preferences, and communication styles.",
            impact: "Poor herbalist-patient matches leading to 70% consultation abandonment",
            icon: <Users className="h-8 w-8" />
          }
        ],
        supportingImage: "/lovable-uploads/8c5f2c56-320c-4d0c-9ea9-beb831b8077f.png",
        supportingImageAlt: "Traditional healthcare access challenges showing geographic and verification barriers"
      }}
      
      // Solution Section
      solution={{
        title: "Our Solution",
        subtitle: "AI-Powered Matching Innovation",
        description: "Our platform uses advanced AI to analyze health profiles, herbalist specializations, and compatibility factors to create perfect matches, making natural healthcare accessible to everyone.",
        features: [
          {
            title: "Browse Herbalist Profiles",
            description: "Explore certified practitioners with detailed specializations, reviews, and treatment philosophies to find the perfect match for your wellness needs.",
            image: "/lovable-uploads/6ac697d2-0417-49dc-b4de-cb3702484e09.png",
            imageAlt: "Herbalist profile browsing interface showing detailed practitioner information",
            benefit: "Complete transparency in practitioner credentials and specializations"
          },
          {
            title: "Smart Matching Recommendations",
            description: "Receive personalized herbalist suggestions based on your health profile, treatment preferences, and communication style preferences.",
            image: "/lovable-uploads/8c5f2c56-320c-4d0c-9ea9-beb831b8077f.png",
            imageAlt: "AI matching recommendations showing personalized herbalist suggestions",
            benefit: "85% match success rate within first 3 recommendations"
          },
          {
            title: "Seamless Consultation Scheduling",
            description: "One-tap booking with real-time availability, automated confirmations, and calendar integration for hassle-free appointments.",
            image: "/lovable-uploads/67facb2d-d64e-44c8-9f6a-ae33a0db8adc.png",
            imageAlt: "Consultation scheduling interface showing real-time availability and booking",
            benefit: "40% faster booking process with automated confirmations"
          },
          {
            title: "Ongoing Wellness Journey",
            description: "Track progress, receive follow-up care, and build lasting relationships with your herbalist through integrated wellness tracking.",
            image: "/lovable-uploads/2c0494f7-e624-472c-87b4-0fac92ac54e0.png",
            imageAlt: "Wellness journey tracking showing progress monitoring and follow-up care",
            benefit: "Continuous care relationships with improved health outcomes"
          }
        ],
        methodology: "By combining AI-powered matching with comprehensive practitioner verification and seamless booking, we make natural healthcare accessible and personalized for everyone."
      }}
      
      // Results Section
      results={{
        title: "Results & Impact",
        subtitle: "Wellness Platform Success",
        description: "Herbalink users report exceptional satisfaction with their herbalist matches, faster booking processes, and improved wellness outcomes through personalized natural healthcare access.",
        metrics: [
          {
            value: "78%",
            label: "Users Found Their Ideal Herbalist",
            icon: <Heart className="h-6 w-6" />
          },
          {
            value: "65%",
            label: "Increase in Consultation Completion",
            icon: <CheckCircle2 className="h-6 w-6" />
          },
          {
            value: "89%",
            label: "User Satisfaction Rate",
            icon: <Star className="h-6 w-6" />
          },
          {
            value: "3x",
            label: "Growth in Herbalist Community",
            icon: <Sprout className="h-6 w-6" />
          }
        ],
        testimonial: {
          quote: "Herbalink connected me with the perfect herbalist who understood my specific wellness needs. The AI matching was spot-on - I found my ideal practitioner on the first recommendation. The platform made natural healthcare accessible and personal.",
          author: "Maria Santos",
          title: "Wellness Seeker",
          company: "Successfully matched with herbalist specializing in digestive health"
        }
      }}
      
      // CTA Section
      cta={{
        title: "Ready to Transform Healthcare Access?",
        description: "Let's create platforms that connect people with the healthcare they need through intelligent matching and seamless experiences. Your healthcare platform deserves AI-powered personalization.",
        buttonText: "Start Your Healthcare Project",
        buttonAction: () => window.location.href = '/contact'
      }}
      
      // Related Projects
      currentProjectId="herbalink"
    />
  );
};

export default HerbalinkCaseStudy;
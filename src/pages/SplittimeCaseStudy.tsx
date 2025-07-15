I see the issue! The file got corrupted during the copy. Let me give you a clean, complete SplittimeCaseStudy.tsx file that will work properly! 🔧

```typescript
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Calendar, Users, MessageCircle, DollarSign, Shield, Clock, Star, CheckCircle2, Heart, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DynamicSeo from "@/components/seo/DynamicSeo";
import { Helmet } from "react-helmet-async";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";
import RelatedProjects from "@/components/RelatedProjects";
import ShareButtons from "@/components/blog/ShareButtons";
import MaximizableImage from "@/components/project/MaximizableImage";
import splittimeOgImage from "@/assets/social/splittime-og.jpg";

const SplittimeCaseStudy: React.FC = () => {
  const { maximizeImage } = useImageMaximizer();

  const coParentingChallenges = [
    {
      title: "Communication Breakdown",
      description: "Divorced parents struggled with effective communication, leading to misunderstandings and increased conflict over child-related decisions.",
      icon: <MessageCircle className="h-8 w-8" />
    },
    {
      title: "Scheduling Conflicts", 
      description: "Complex custody schedules, school events, and activities created confusion and missed opportunities for children.",
      icon: <Calendar className="h-8 w-8" />
    },
    {
      title: "Expense Tracking",
      description: "Shared expenses for children were difficult to track, leading to disputes over who paid what and when.",
      icon: <DollarSign className="h-8 w-8" />
    }
  ];

  const designSolutions = [
    {
      title: "Neutral Communication Hub",
      description: "AI-moderated messaging system that filters emotional language and suggests constructive alternatives.",
      visual: "💬"
    },
    {
      title: "Smart Scheduling System",
      description: "Intelligent calendar that prevents double-booking and automatically syncs with both parents' schedules.",
      visual: "📅"
    },
    {
      title: "Expense Transparency",
      description: "Real-time expense tracking with receipt uploads and automatic splitting based on custody agreements.",
      visual: "💰"
    }
  ];

  const userJourney = [
    {
      step: "Setup",
      title: "Profile & Custody Agreement",
      description: "Parents input custody schedules, child information, and communication preferences to establish the foundation.",
      image: "/lovable-uploads/splittime-setup.png"
    },
    {
      step: "Schedule",
      title: "Coordinated Calendar Management", 
      description: "Shared calendar with custody schedules, school events, and activities visible to both parents.",
      image: "/lovable-uploads/splittime-calendar.png"
    },
    {
      step: "Communicate",
      title: "Structured Messaging",
      description: "Topic-based conversations with AI moderation to keep discussions focused and productive.",
      image: "/lovable-uploads/splittime-messaging.png"
    },
    {
      step: "Track",
      title: "Expense Management",
      description: "Shared expense tracking with automatic calculations and payment reminders.",
      image: "/lovable-uploads/splittime-expenses.png"
    }
  ];

  const impactMetrics = [
    {
      metric: "73%",
      label: "Reduction in Communication Conflicts",
      icon: <MessageCircle className="h-6 w-6" />
    },
    {
      metric: "85%",
      label: "Improved Schedule Coordination",
      icon: <Calendar className="h-6 w-6" />
    },
    {
      metric: "91%",
      label: "User Satisfaction Rate",
      icon: <Star className="h-6 w-6" />
    },
    {
      metric: "60%",
      label: "Faster Expense Resolution",
      icon: <CheckCircle2 className="h-6 w-6" />
    }
  ];

  return (
    <>
      <Helmet>
        <title>Splittime Co-Parenting App UX Design Case Study | Barsky Design</title>
        <meta name="description" content="Co-parenting coordination app UX design. Simplified scheduling, communication, and expense tracking for divorced parents. Reduced conflict through intuitive design and AI-powered scheduling." />
        <meta property="og:title" content="Splittime Co-Parenting App UX Design Case Study" />
        <meta property="og:description" content="Co-parenting coordination app UX design. Simplified scheduling, communication, and expense tracking for divorced parents. Reduced conflict through intuitive design and AI-powered scheduling." />
        <meta property="og:image" content={`https://barskydesign.pro${splittimeOgImage}`} />
        <meta property="og:url" content="https://barskydesign.pro/case-studies/splittime-coparenting-app-design" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Splittime Co-Parenting App UX Design Case Study" />
        <meta name="twitter:description" content="Co-parenting coordination app UX design. Simplified scheduling, communication, and expense tracking for divorced parents. Reduced conflict through intuitive design and AI-powered scheduling." />
        <meta name="twitter:image" content={`https://barskydesign.pro${splittimeOgImage}`} />
      </Helmet>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "name": "Splittime Co-Parenting App UX Design Case Study",
          "description": "Co-parenting coordination app UX design. Simplified scheduling, communication, and expense tracking for divorced parents.",
          "author": {
            "@type": "Person",
            "name": "Hiram Barsky"
          },
          "datePublished": "2024",
          "url": "https://barskydesign.pro/case-studies/splittime-coparenting-app-design"
        })}
      </script>

      <DynamicSeo 
        type="project" 
        title="Splittime: Co-Parenting Coordination Platform | Hiram Barsky" 
        description="73% reduction in communication conflicts through AI-moderated messaging and smart scheduling. See how UX design transformed co-parenting coordination." 
        image={`https://barskydesign.pro${splittimeOgImage}`} 
        projectName="Splittime" 
        results={["73% reduction in communication conflicts", "85% improved schedule coordination", "AI-moderated messaging system"]} 
        technologies={["React Native", "AI Moderation", "Calendar Integration", "Family App Design"]} 
        path="/case-studies/splittime-coparenting-app-design" 
      />
      
      <div className="coparenting-platform-showcase min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Header />
        
        {/* Back Navigation */}
        <div className="pt-20 px-4 sm:px-6 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }} 
            className="mb-8"
          >
            <Link to="/projects" className="inline-flex items-center text-indigo-700 hover:text-indigo-900 transition-colors font-medium">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Link>
          </motion.div>
        </div>
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="coparenting-hero py-8 lg:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Mobile Layout */}
              <div className="lg:hidden space-y-8">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.8 }} 
                  className="relative"
                >
                  <MaximizableImage 
                    src="/lovable-uploads/splittime-hero.png"
                    alt="Splittime co-parenting app interface showing calendar, messaging, and expense tracking features"
                    caption="Splittime co-parenting coordination platform interface"
                    className="w-full h-[400px] rounded-3xl shadow-2xl"
                    projectId="splittime"
                    aspectRatio="400/300"
                  />
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 30 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.8, delay: 0.2 }} 
                  className="space-y-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Users className="h-10 w-10 text-indigo-600" />
                    <span className="text-indigo-700 font-semibold text-lg">Co-Parenting Solution</span>
                  </div>
                  
                  <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 leading-tight">
                    Reducing Conflict Through
                    <span className="text-indigo-600 block">Thoughtful Design</span>
                  </h1>
                  
                  <p className="text-lg text-neutral-600 leading-relaxed">
                    Co-parenting after divorce is challenging enough without technology barriers. Splittime transforms 
                    how divorced parents coordinate schedules, communicate about their children, and manage shared expenses 
                    through AI-powered conflict reduction and intuitive design.
                  </p>
                  
                  {/* Share Buttons */}
                  <div className="mt-6">
                    <ShareButtons 
                      title="Splittime: Co-Parenting Coordination Platform Case Study" 
                      summary="See how UX design reduced communication conflicts by 73% and improved schedule coordination by 85% for divorced parents." 
                      url={window.location.href} 
                      hashtags={["UXDesign", "FamilyTech", "CoParenting", "CaseStudy", "MobileUX"]} 
                    />
                  </div>
                  
                  <Button 
                    size="lg" 
                    variant="default" 
                    className="font-semibold px-10 py-6 text-lg group bg-indigo-600 hover:bg-indigo-700" 
                    onClick={() => window.open('https://splittime-demo.com', '_blank')}
                  >
                    View Prototype
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl border border-indigo-200 shadow-lg">
                    <div className="flex items-start gap-4">
                      <Heart className="h-8 w-8 text-indigo-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-lg font-medium text-neutral-800 mb-2">
                          Design Philosophy
                        </p>
                        <p className="text-neutral-600 italic">
                          "Children thrive when parents can communicate effectively. Technology should facilitate 
                          cooperation, not create additional stress in already challenging family dynamics."
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center">
                <motion.div 
                  initial={{ opacity: 0, x: -50 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ duration: 0.8 }} 
                  className="space-y-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Users className="h-10 w-10 text-indigo-600" />
                    <span className="text-indigo-700 font-semibold text-lg">Co-Parenting Solution</span>
                  </div>
                  
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 leading-tight">
                    Reducing Conflict Through
                    <span className="text-indigo-600 block">Thoughtful Design</span>
                  </h1>
                  
                  <p className="text-xl text-neutral-600 leading-relaxed max-w-2xl">
                    Co-parenting after divorce is challenging enough without technology barriers. Splittime transforms 
                    how divorced parents coordinate schedules, communicate about their children, and manage shared expenses 
                    through AI-powered conflict reduction and intuitive design.
                  </p>
                  
                  {/* Share Buttons */}
                  <div className="mt-6">
                    <ShareButtons 
                      title="Splittime: Co-Parenting Coordination Platform Case Study" 
                      summary="See how UX design reduced communication conflicts by 73% and improved schedule coordination by 85% for divorced parents." 
                      url={window.location.href} 
                      hashtags={["UXDesign", "FamilyTech", "CoParenting", "CaseStudy", "MobileUX"]} 
                    />
                  </div>
                  
                  <Button 
                    size="lg" 
                    variant="default" 
                    className="font-semibold px-10 py-6 text-lg group bg-indigo-600 hover:bg-indigo-700" 
                    onClick={() => window.open('https://splittime-demo.com', '_blank')}
                  >
                    View Prototype
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl border border-indigo-200 shadow-lg">
                    <div className="flex items-start gap-4">
                      <Heart className="h-8 w-8 text-indigo-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-lg font-medium text-neutral-800 mb-2">
                          Design Philosophy
                        </p>
                        <p className="text-neutral-600 italic">
                          "Children thrive when parents can communicate effectively. Technology should facilitate 
                          cooperation, not create additional stress in already challenging family dynamics."
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 50 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ duration: 0.8, delay: 0.2 }} 
                  className="relative"
                >
                  <MaximizableImage 
                    src="/lovable-
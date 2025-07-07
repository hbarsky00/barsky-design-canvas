import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Users, Calendar, MessageCircle, TrendingDown, Shield, Star, CheckCircle2, Baby, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnhancedGlobalSeo from "@/components/seo/EnhancedGlobalSeo";

const SplittimeCaseStudy: React.FC = () => {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState({ src: '', alt: '', caption: '' });
  const [currentZoom, setCurrentZoom] = useState(1);

  // Image viewer functions
  const openImageViewer = (imageId: string) => {
    const imgElement = document.getElementById(imageId) as HTMLImageElement;
    if (imgElement) {
      const figcaption = imgElement.parentElement?.querySelector('figcaption');
      setCurrentImage({
        src: imgElement.src,
        alt: imgElement.alt,
        caption: figcaption?.textContent || imgElement.alt
      });
      setViewerOpen(true);
      setCurrentZoom(1);
    }
  };

  const closeImageViewer = () => {
    setViewerOpen(false);
    setCurrentZoom(1);
  };

  const zoomIn = () => {
    setCurrentZoom(prev => Math.min(prev + 0.25, 3));
  };

  const zoomOut = () => {
    setCurrentZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const resetZoom = () => {
    setCurrentZoom(1);
  };

  const handleImageKeypress = (event: React.KeyboardEvent, imageId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openImageViewer(imageId);
    }
  };

  // Keyboard navigation for viewer
  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if (!viewerOpen) return;
      
      switch(event.key) {
        case 'Escape':
          closeImageViewer();
          break;
        case '+':
        case '=':
          zoomIn();
          break;
        case '-':
          zoomOut();
          break;
        case '0':
          resetZoom();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
  }, [viewerOpen]);

  const conflictSources = [{
    title: "Fragmented Communication",
    description: "Conversations scattered across text, email, and multiple apps creating confusion and missed information.",
    icon: <MessageCircle className="h-8 w-8" />
  }, {
    title: "Scheduling Conflicts",
    description: "Miscommunications about pickup times, events, and schedule changes leading to frustration and disappointment.",
    icon: <Calendar className="h-8 w-8" />
  }, {
    title: "Financial Disputes",
    description: "Disagreements over shared expenses, child costs, and financial responsibilities without clear tracking.",
    icon: <TrendingDown className="h-8 w-8" />
  }, {
    title: "Information Silos",
    description: "Important details about children's needs, activities, and wellbeing not shared between parents effectively.",
    icon: <Shield className="h-8 w-8" />
  }];
  const coordinationFeatures = [{
    title: "Unified Communication Hub",
    description: "All co-parenting conversations in one respectful, structured platform designed to reduce misunderstandings.",
    visual: "💬"
  }, {
    title: "Shared Family Calendar",
    description: "Synchronized scheduling with automatic notifications, reducing conflicts over pickup times and events.",
    visual: "📅"
  }, {
    title: "Expense Transparency",
    description: "Clear tracking and splitting of child-related expenses with photo receipts and approval workflows.",
    visual: "💰"
  }];
  const familyInterface = [{
    step: "Connect",
    title: "Respectful Communication Tools",
    description: "Structured messaging that encourages positive, child-focused conversations between co-parents.",
    image: "/lovable-uploads/0152c609-c279-4472-84e0-4b6a0a2b6735.png"
  }, {
    step: "Coordinate",
    title: "Shared Calendar Management",
    description: "Visual scheduling that prevents conflicts and keeps both parents informed about children's activities.",
    image: "/lovable-uploads/839b6de9-4297-414c-9f99-7a3b4d2a74d7.png"
  }, {
    step: "Care",
    title: "Child-Centered Information Hub",
    description: "Medical info, school updates, and activity details accessible to both parents for better child care.",
    image: "/lovable-uploads/59ed017e-e0b4-4f9e-8c80-babccd697006.png"
  }, {
    step: "Celebrate",
    title: "Positive Co-Parenting Journey",
    description: "Tools that encourage collaboration and celebrate successful co-parenting achievements together.",
    image: "/lovable-uploads/530b9072-e9d2-47f0-83dc-a44ecf87b82d.png"
  }];
  const familyImpact = [{
    metric: "73%",
    label: "Reduction in Communication Conflicts",
    icon: <TrendingDown className="h-6 w-6" />
  }, {
    metric: "89%",
    label: "Improved Schedule Coordination",
    icon: <Calendar className="h-6 w-6" />
  }, {
    metric: "94%",
    label: "Parent Satisfaction Rate",
    icon: <Heart className="h-6 w-6" />
  }, {
    metric: "67%",
    label: "Decrease in Scheduling Disputes",
    icon: <CheckCircle2 className="h-6 w-6" />
  }];
  return <>
      <EnhancedGlobalSeo title="Splittime: Transforming Co-Parenting from Conflict to Collaboration" description="Discover how Splittime's family-centered platform helps separated parents coordinate schedules, communicate effectively, and prioritize children's wellbeing through streamlined digital tools." canonicalUrl="https://barskydesign.pro/case-study-splittime" pageType="content" keywords={["Splittime co-parenting app", "family coordination platform", "co-parenting communication", "child custody scheduling", "family management app", "parenting after separation", "family-centered design"]} />
      
      <div className="coparenting-platform-showcase min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50">
        <Header />
        
        <main className="flex-grow pt-20">
          
          {/* Family Harmony Hero */}
          <section className="family-harmony-introduction py-20 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <motion.div initial={{
                opacity: 0,
                x: -50
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                duration: 0.8
              }} className="space-y-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Heart className="h-10 w-10 text-blue-600" />
                    <span className="text-blue-700 font-semibold text-lg">Family Harmony</span>
                  </div>
                  
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 leading-tight">
                    From Conflict to
                    <span className="text-blue-600 block">Collaboration</span>
                  </h1>
                  
                  <p className="text-xl text-neutral-600 leading-relaxed max-w-2xl">
                    Splittime transforms co-parenting by centralizing communication, streamlining schedules, 
                    and keeping children's wellbeing at the center of every interaction between separated parents.
                  </p>
                  
                  <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl border border-blue-200 shadow-lg">
                    <div className="flex items-start gap-4">
                      <Baby className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-lg font-medium text-neutral-800 mb-2">
                          Child-First Philosophy
                        </p>
                        <p className="text-neutral-600 italic">
                          "Co-parenting tools should reduce conflict, not create more. When parents can communicate 
                          respectfully and coordinate effectively, children thrive in both homes."
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div initial={{
                opacity: 0,
                x: 50
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                duration: 0.8,
                delay: 0.2
              }} className="relative">
                  <figure className="project-image-container">
                    <img 
                      src="/lovable-uploads/dfd3c92e-ca1c-4a63-b41c-1244c2c1039a.png" 
                      alt="Splittime co-parenting dashboard with shared calendar integration" 
                      className="clickable-image w-full h-[500px] object-cover shadow-2xl cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
                      onClick={() => openImageViewer('splittime-hero-1')}
                      tabIndex={0}
                      onKeyDown={(e) => handleImageKeypress(e, 'splittime-hero-1')}
                      role="button"
                      aria-label="Click to view Splittime co-parenting dashboard in full screen"
                      id="splittime-hero-1" 
                    />
                    <figcaption className="text-sm text-gray-600 italic mt-2 text-center">Splittime co-parenting dashboard with shared calendar integration</figcaption>
                  </figure>
                  
                  
                  
                  
                </motion.div>
              </div>
            </div>
          </section>

          {/* Co-Parenting Conflict Analysis */}
          <section className="communication-conflict-breakdown py-20 bg-white/60 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8
            }} className="text-center mb-16">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <TrendingDown className="h-10 w-10 text-red-500" />
                  <span className="text-red-600 font-semibold text-lg">Communication Breakdown</span>
                </div>
                
                <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-8">
                  Where Co-Parenting Communication Falls Apart
                </h2>
                
                <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
                  Despite good intentions, co-parenting coordination often becomes a source of ongoing stress 
                  rather than collaborative support for children's needs and wellbeing.
                </p>
              </motion.div>
              
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold text-neutral-900">Core Communication Barriers:</h3>
                  
                  {conflictSources.map((source, index) => <motion.div key={index} initial={{
                  opacity: 0,
                  y: 30
                }} whileInView={{
                  opacity: 1,
                  y: 0
                }} viewport={{
                  once: true
                }} transition={{
                  duration: 0.6,
                  delay: index * 0.1
                }} className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-2xl border border-red-200">
                      <div className="flex items-start gap-4">
                        <div className="text-red-500 flex-shrink-0">
                          {source.icon}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-neutral-800 mb-2">{source.title}</h4>
                          <p className="text-neutral-600">{source.description}</p>
                        </div>
                      </div>
                    </motion.div>)}
                </div>
                
                <motion.div initial={{
                opacity: 0,
                scale: 0.95
              }} whileInView={{
                opacity: 1,
                scale: 1
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.8,
                delay: 0.3
              }} className="relative">
                  <figure className="project-image-container">
                    <img 
                      src="/lovable-uploads/8df95f0b-a722-43da-af7d-a3b9e05a1118.png" 
                      alt="Communication interface designed to reduce family conflict" 
                      className="clickable-image w-full h-[500px] object-cover shadow-2xl cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
                      onClick={() => openImageViewer('splittime-conflict-1')}
                      tabIndex={0}
                      onKeyDown={(e) => handleImageKeypress(e, 'splittime-conflict-1')}
                      role="button"
                      aria-label="Click to view communication interface in full screen"
                      id="splittime-conflict-1" 
                    />
                    <figcaption className="text-sm text-gray-600 italic mt-2 text-center">Communication interface designed to reduce family conflict</figcaption>
                  </figure>
                  
                  <figure className="project-image-container mt-8">
                    <img 
                      src="/lovable-uploads/448a9776-8ef2-421b-a68c-5451bbc5f823.png" 
                      alt="Splittime app interface showing key features and solutions for co-parenting coordination" 
                      className="clickable-image w-full h-auto object-contain shadow-2xl cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
                      onClick={() => openImageViewer('splittime-features-1')}
                      tabIndex={0}
                      onKeyDown={(e) => handleImageKeypress(e, 'splittime-features-1')}
                      role="button"
                      aria-label="Click to view Splittime features in full screen"
                      id="splittime-features-1" 
                    />
                    <figcaption className="text-sm text-gray-600 italic mt-2 text-center">Splittime app interface showing key features and solutions for co-parenting coordination</figcaption>
                  </figure>
                  
                </motion.div>
              </div>
            </div>
          </section>

          {/* Coordination Solution Engine */}
          <section className="coordination-streamlining-system py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8
            }} className="text-center mb-16">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Users className="h-10 w-10 text-blue-500" />
                  <span className="text-blue-600 font-semibold text-lg">Coordination Solution</span>
                </div>
                
                <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-8">
                  Streamlined Co-Parenting Communication
                </h2>
                
                <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
                  Our platform centralizes all co-parenting coordination in one respectful space, 
                  reducing friction and keeping children's needs at the center of every interaction.
                </p>
              </motion.div>
              
              <div className="grid lg:grid-cols-3 gap-8">
                {coordinationFeatures.map((feature, index) => <motion.div key={index} initial={{
                opacity: 0,
                y: 50
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.8,
                delay: index * 0.2
              }} className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-blue-200 hover:shadow-xl transition-all duration-300">
                    <div className="text-4xl mb-6 text-center">{feature.visual}</div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-4 text-center">{feature.title}</h3>
                    <p className="text-neutral-600 text-center leading-relaxed">{feature.description}</p>
                  </motion.div>)}
              </div>
              
              <motion.div initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8,
              delay: 0.6
            }} className="mt-16 bg-gradient-to-r from-blue-500 to-indigo-500 p-8 rounded-3xl text-center text-white">
                <h3 className="text-2xl font-bold mb-4 !text-white">Conflict Reduction Approach</h3>
                <p className="text-lg max-w-3xl mx-auto font-normal force-white-text-override">
                  By providing structure, transparency, and child-focused communication tools, 
                  parents spend less time arguing and more time supporting their children's wellbeing.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Family-First Interface */}
          <section className="child-centered-platform-design py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8
            }} className="text-center mb-16">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Home className="h-10 w-10 text-green-500" />
                  <span className="text-green-600 font-semibold text-lg">Family-First Interface</span>
                </div>
                
                <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-8">
                  Designed with Children's Wellbeing in Mind
                </h2>
                
                <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
                  Every feature prioritizes what's best for the children, making co-parenting coordination 
                  feel supportive rather than adversarial through thoughtful, family-centered design.
                </p>
              </motion.div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {familyInterface.map((item, index) => <motion.div key={index} initial={{
                opacity: 0,
                x: index % 2 === 0 ? -50 : 50
              }} whileInView={{
                opacity: 1,
                x: 0
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.8,
                delay: index * 0.1
              }} className="bg-gradient-to-br from-blue-50 to-slate-50 p-8 rounded-3xl border border-blue-200">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">{item.step}</span>
                        <h3 className="text-xl font-bold text-neutral-900">{item.title}</h3>
                      </div>
                    </div>
                    
                    <figure className="project-image-container">
                      <img 
                        src={item.image} 
                        alt={`${item.title} - family-centered co-parenting platform interface`} 
                        className="clickable-image w-full h-48 object-cover mb-6 cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
                        onClick={() => openImageViewer(`splittime-interface-${index + 1}`)}
                        tabIndex={0}
                        onKeyDown={(e) => handleImageKeypress(e, `splittime-interface-${index + 1}`)}
                        role="button"
                        aria-label={`Click to view ${item.title} in full screen`}
                        id={`splittime-interface-${index + 1}`}
                      />
                      <figcaption className="text-sm text-gray-600 italic mt-2 text-center">{item.description}</figcaption>
                    </figure>
                    
                    <p className="text-neutral-600 leading-relaxed">{item.description}</p>
                  </motion.div>)}
              </div>
            </div>
          </section>

          {/* Family Impact Metrics */}
          <section className="positive-family-outcomes py-20 bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8
            }} className="text-center mb-16">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Star className="h-10 w-10 text-yellow-500" />
                  <span className="text-yellow-600 font-semibold text-lg">Positive Family Outcomes</span>
                </div>
                
                <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-8">
                  Measurable Improvements in Family Harmony
                </h2>
                
                <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed mb-12">
                  Real families report significant reductions in co-parenting conflicts and improvements 
                  in communication, coordination, and overall satisfaction with their co-parenting relationship.
                </p>
                </motion.div>
                
                {/* Family Harmony Images - Two Column Layout */}
                <div className="mb-16 grid lg:grid-cols-2 gap-8 items-center">
                  <figure className="project-image-container">
                    <img 
                      src="/lovable-uploads/cd385ebc-e187-4a1e-b0af-58bcbbd17fdb.png" 
                      alt="Happy family showing successful co-parenting collaboration and family harmony" 
                      className="clickable-image w-full h-96 object-cover shadow-xl mx-auto cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
                      onClick={() => openImageViewer('splittime-harmony-1')}
                      tabIndex={0}
                      onKeyDown={(e) => handleImageKeypress(e, 'splittime-harmony-1')}
                      role="button"
                      aria-label="Click to view family harmony image in full screen"
                      id="splittime-harmony-1" 
                    />
                    <figcaption className="text-sm text-gray-600 italic mt-2 text-center">Happy family showing successful co-parenting collaboration and family harmony</figcaption>
                  </figure>
                  
                  <figure className="project-image-container">
                    <img 
                      src="/lovable-uploads/7c381aef-4b14-4b6e-ab5d-00248808e4dc.png" 
                      alt="Splittime results and impact metrics showing measurable improvements in co-parenting outcomes" 
                      className="clickable-image w-full h-96 object-cover shadow-xl mx-auto cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
                      onClick={() => openImageViewer('splittime-results-1')}
                      tabIndex={0}
                      onKeyDown={(e) => handleImageKeypress(e, 'splittime-results-1')}
                      role="button"
                      aria-label="Click to view results and impact metrics in full screen"
                      id="splittime-results-1" 
                    />
                    <figcaption className="text-sm text-gray-600 italic mt-2 text-center">Splittime results and impact metrics showing measurable improvements in co-parenting outcomes</figcaption>
                  </figure>
                </div>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {familyImpact.map((impact, index) => <motion.div key={index} initial={{
                opacity: 0,
                y: 50
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.8,
                delay: index * 0.1
              }} className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl text-center shadow-lg border border-blue-200">
                    <div className="flex justify-center mb-4 text-blue-500">
                      {impact.icon}
                    </div>
                    <div className="text-4xl font-bold text-blue-600 mb-2">{impact.metric}</div>
                    <div className="text-sm text-neutral-600 uppercase tracking-wide">{impact.label}</div>
                  </motion.div>)}
              </div>
              
              {/* Family Success Story */}
              <motion.div initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8,
              delay: 0.4
            }} className="bg-white/70 backdrop-blur-sm p-12 rounded-3xl text-center max-w-5xl mx-auto border border-blue-200 shadow-xl">
                <div className="mb-8">
                  <Heart className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <p className="text-2xl text-neutral-700 italic leading-relaxed mb-6">
                    "Splittime changed everything for our family. Instead of constant arguments about schedules, 
                    we now coordinate seamlessly. Our kids see us working together, not fighting. 
                    This app gave us our peace back."
                  </p>
                </div>
                
                <div className="flex items-center justify-center gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-neutral-900 text-lg">Sarah & Michael</p>
                    <p className="text-blue-600 font-medium">Co-parents of two</p>
                    <p className="text-sm text-neutral-500">Using Splittime for 18 months</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-20 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8
            }}>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Heart className="h-10 w-10 text-white" />
                  <span className="font-semibold text-lg text-white">Supporting Families</span>
                </div>
                
                <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-white">
                  Ready to Transform Family Coordination?
                </h2>
                
                <p className="text-xl mb-10 max-w-3xl mx-auto leading-relaxed text-white">
                  Let's create digital experiences that support families through life transitions. 
                  Your family-centered platform deserves the same thoughtful, empathetic approach.
                </p>
                
                <Button size="lg" variant="default" className="font-semibold px-10 py-6 text-lg group" onClick={() => window.location.href = '/contact'}>
                  Start Your Family Project
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </div>
          </section>
        </main>
        
        {/* Image Viewer Modal */}
        {viewerOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeImageViewer();
            }}
          >
            <div className="relative max-w-[90vw] max-h-[90vh] flex flex-col items-center">
              {/* Close Button */}
              <button
                className="absolute -top-12 right-0 bg-white bg-opacity-90 hover:bg-opacity-100 border-none rounded-full w-10 h-10 text-xl cursor-pointer z-10 transition-all duration-200"
                onClick={closeImageViewer}
                aria-label="Close image viewer"
                title="Close (Press Escape)"
              >
                <span className="text-black">×</span>
              </button>
              
              {/* Zoom Controls */}
              <div className="absolute -top-12 left-0 flex gap-3 z-10">
                <button
                  className="bg-white bg-opacity-90 hover:bg-opacity-100 border-none rounded w-9 h-9 text-lg cursor-pointer font-bold transition-all duration-200"
                  onClick={zoomIn}
                  aria-label="Zoom in"
                  title="Zoom In (+)"
                >
                  <span className="text-black">+</span>
                </button>
                <button
                  className="bg-white bg-opacity-90 hover:bg-opacity-100 border-none rounded w-9 h-9 text-lg cursor-pointer font-bold transition-all duration-200"
                  onClick={zoomOut}
                  aria-label="Zoom out"
                  title="Zoom Out (-)"
                >
                  <span className="text-black">−</span>
                </button>
                <button
                  className="bg-white bg-opacity-90 hover:bg-opacity-100 border-none rounded w-9 h-9 text-lg cursor-pointer font-bold transition-all duration-200"
                  onClick={resetZoom}
                  aria-label="Reset zoom"
                  title="Reset Zoom (0)"
                >
                  <span className="text-black">⌂</span>
                </button>
              </div>
              
              {/* Main Image */}
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className="max-w-full max-h-[80vh] object-contain transition-transform duration-300"
                style={{ transform: `scale(${currentZoom})` }}
              />
              
              {/* Caption */}
              <div className="bg-white bg-opacity-90 p-4 rounded-lg mt-4 max-w-[80%] text-center">
                <p className="text-black text-sm">{currentImage.caption}</p>
              </div>
            </div>
          </div>
        )}
        
        <Footer />
      </div>
    </>;
};
export default SplittimeCaseStudy;
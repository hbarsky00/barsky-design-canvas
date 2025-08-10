import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Leaf, Heart, Smartphone, Users, MapPin, Shield, Zap, Star, CheckCircle2, Sprout, TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DynamicSeo from "@/components/seo/DynamicSeo";
import { Helmet } from "react-helmet-async";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";
import { getOptimizedImageSrc } from "@/utils/imageOptimization";
import RelatedProjects from "@/components/RelatedProjects";
import ShareButtons from "@/components/blog/ShareButtons";
import herbalinkOgImage from "@/assets/social/herbalink-og.jpg";
const HerbalinkCaseStudy: React.FC = () => {
  const {
    maximizeImage
  } = useImageMaximizer();
  const healthBarriers = [{
    title: "Geographic Limitations",
    description: "Traditional herbalist consultations required in-person visits, leaving rural communities without access to qualified practitioners.",
    icon: <MapPin className="h-8 w-8" />
  }, {
    title: "Credential Verification",
    description: "No standardized way to verify herbalist qualifications, leading to uncertainty about practitioner expertise.",
    icon: <Shield className="h-8 w-8" />
  }, {
    title: "Personalized Matching",
    description: "Word-of-mouth referrals couldn't account for individual health needs, treatment preferences, and communication styles.",
    icon: <Users className="h-8 w-8" />
  }];
  const matchingFeatures = [{
    title: "Health Profile Analysis",
    description: "Analyzes user health concerns, preferences, and goals to create comprehensive wellness profiles.",
    visual: "🌿"
  }, {
    title: "Herbalist Specialization Matching",
    description: "Considers practitioner expertise, treatment approaches, and communication styles for optimal pairing.",
    visual: "🔍"
  }, {
    title: "Compatibility Scoring",
    description: "AI-powered algorithm generates compatibility scores based on multiple wellness factors.",
    visual: "⭐"
  }];
  const platformJourney = [{
    step: "Discover",
    title: "Browse Herbalist Profiles",
    description: "Explore certified practitioners with detailed specializations, reviews, and treatment philosophies.",
    image: "/lovable-uploads/6ac697d2-0417-49dc-b4de-cb3702484e09.png"
  }, {
    step: "Connect",
    title: "Smart Matching Recommendations",
    description: "Receive personalized herbalist suggestions based on your health profile and preferences.",
    image: "/lovable-uploads/8c5f2c56-320c-4d0c-9ea9-beb831b8077f.png"
  }, {
    step: "Book",
    title: "Seamless Consultation Scheduling",
    description: "One-tap booking with real-time availability, automated confirmations, and calendar integration.",
    image: "/lovable-uploads/67facb2d-d64e-44c8-9f6a-ae33a0db8adc.png"
  }, {
    step: "Heal",
    title: "Ongoing Wellness Journey",
    description: "Track progress, receive follow-up care, and build lasting relationships with your herbalist.",
    image: "/lovable-uploads/2c0494f7-e624-472c-87b4-0fac92ac54e0.png"
  }];
  const wellnessImpact = [{
    metric: "78%",
    label: "Users Found Their Ideal Herbalist",
    icon: <Heart className="h-6 w-6" />
  }, {
    metric: "65%",
    label: "Increase in Consultation Completion",
    icon: <CheckCircle2 className="h-6 w-6" />
  }, {
    metric: "89%",
    label: "User Satisfaction Rate",
    icon: <Star className="h-6 w-6" />
  }, {
    metric: "3x",
    label: "Growth in Herbalist Community",
    icon: <Sprout className="h-6 w-6" />
  }];
  return <>
      <DynamicSeo type="project" title="Herbalink: AI-Enhanced Herbalist Platform Case Study | Hiram Barsky" description="85% of users find their ideal herbalist match within 3 recommendations. See how AI-powered matching revolutionized natural healthcare access." image={`https://barskydesign.pro${herbalinkOgImage}`} projectName="Herbalink" results={["85% user match success rate", "40% faster consultation bookings", "AI-powered herbalist matching"]} technologies={["React Native", "AI Matching", "Mobile UX", "Healthcare Platform"]} path="/project/herbalink" />
      
      <div className="wellness-platform-showcase min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <Header />
        
        {/* Back Navigation */}
        <div className="pt-20 px-4 sm:px-6 max-w-7xl mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: -20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="mb-8">
            <Link to="/projects" className="inline-flex items-center text-emerald-700 hover:text-emerald-900 transition-colors font-medium">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Link>
          </motion.div>
        </div>
        
        <main className="flex-grow">
          
          {/* Wellness Journey Hero */}
          <section className="relative min-h-screen overflow-hidden">
            {/* Single focal background image */}
            <div className="absolute inset-0">
              <img src={getOptimizedImageSrc("/lovable-uploads/21ed3f67-cf04-4117-b956-425f6a473789.png")} alt="Herbalink mobile app interface" className="w-full h-full object-cover object-center" />
              {/* Strong dark overlay for text readability */}
              <div className="absolute inset-0 bg-black/75"></div>
            </div>

            {/* Left-aligned content with subtle background */}
            <div className="relative z-10 flex items-center min-h-screen">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl">
                  {/* Subtle backdrop for text contrast */}
                  <div className="bg-black/70 backdrop-blur-md rounded-2xl p-8 lg:p-12">
                    <motion.div initial={{
                    opacity: 0,
                    y: 30
                  }} animate={{
                    opacity: 1,
                    y: 0
                  }} transition={{
                    duration: 0.8
                  }} className="space-y-6">
                      {/* Title case heading with medium weight */}
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight">
                        Connecting Patients with Qualified Herbalists
                      </h1>
                      
                      {/* High contrast readable subtext */}
                      <p className="text-lg md:text-xl font-medium leading-relaxed text-white">
                        AI-powered matching makes natural healthcare accessible.
                      </p>
                      
                      {/* Bold rectangular CTA button */}
                      <div className="pt-2">
                        <Button size="lg" className="font-bold px-8 py-3 text-base bg-emerald-600 hover:bg-emerald-700 text-white border-0 shadow-xl rounded-lg" onClick={() => window.open('http://herbalink.live', '_blank')}>
                          See the App in Action
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Healthcare Gap Analysis */}
          <section className="healthcare-accessibility-gap py-20 bg-white/60 backdrop-blur-sm">
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
                  <Heart className="h-10 w-10 text-red-500" />
                  <span className="text-red-600 font-semibold text-lg">Healthcare Accessibility Gap</span>
                </div>
                
                <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-8">
                  Traditional Barriers to Natural Healthcare
                </h2>
                
                <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
                  Despite growing interest in natural health solutions, people faced significant barriers 
                  accessing qualified herbalists and personalized herbal care.
                </p>
              </motion.div>
              
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold text-neutral-900">Critical Access Barriers:</h3>
                  
                  {healthBarriers.map((barrier, index) => <motion.div key={index} initial={{
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
                }} className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-2xl border border-red-200">
                      <div className="flex items-start gap-4">
                        <div className="text-red-500 flex-shrink-0">
                          {barrier.icon}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-neutral-800 mb-2">{barrier.title}</h4>
                          <p className="text-neutral-600 object-cover">{barrier.description}</p>
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
                  <figure className="project-image-container mb-8">
                    <img src="/lovable-uploads/635f7690-e7c5-4e2f-8260-099c3bde45ca.png" alt="Healthcare professional illustration showing the digital transformation needed to bridge traditional herbal practice with modern accessibility" className="w-full h-[400px] object-cover rounded-3xl shadow-2xl cursor-pointer transition-transform duration-200 hover:scale-[1.02]" onClick={() => maximizeImage("/lovable-uploads/635f7690-e7c5-4e2f-8260-099c3bde45ca.png", "Digital transformation bridging traditional herbal practice with modern accessibility")} />
                    <figcaption className="text-sm text-gray-600 italic mt-2 text-center">
                      Digital transformation bridging traditional herbal practice with modern accessibility
                    </figcaption>
                  </figure>
                  <figure className="project-image-container">
                    <img src="/lovable-uploads/89eee613-3026-4f07-a961-8171af9bbe97.png" alt="Traditional herbal medicine consultation showing the gap between ancient practices and modern accessibility needs" className="w-full h-[500px] object-cover rounded-3xl shadow-2xl cursor-pointer transition-transform duration-200 hover:scale-[1.02]" onClick={() => maximizeImage("/lovable-uploads/89eee613-3026-4f07-a961-8171af9bbe97.png", "Traditional herbal medicine consultation highlighting accessibility challenges")} />
                    <figcaption className="text-sm text-gray-600 italic mt-2 text-center">
                      Traditional herbal medicine consultation highlighting accessibility challenges
                    </figcaption>
                  </figure>
                </motion.div>
              </div>
            </div>
          </section>

          {/* AI Matching Innovation */}
          <section className="intelligent-matching-system py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
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
                  <Zap className="h-10 w-10 text-blue-500" />
                  <span className="text-blue-600 font-semibold text-lg">AI Matching Innovation</span>
                </div>
                
                <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-8">
                  Intelligent Herbalist-User Connection
                </h2>
                
                <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
                  Our AI-powered matching system analyzes health profiles, treatment preferences, and practitioner 
                  specializations to create meaningful, personalized connections in natural healthcare.
                </p>
              </motion.div>
              
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
              delay: 0.2
            }} className="mb-16">
                <figure className="project-image-container">
                  <img src="/lovable-uploads/0afc5405-ec7b-4938-a467-96cf505b98d8.png" alt="HerbaLink mobile app interface showing Dashboard, Select Herbalist, and Pay for Herbalist screens with comprehensive user flow" className="w-full h-auto object-cover rounded-3xl shadow-2xl cursor-pointer transition-transform duration-200 hover:scale-[1.02]" onClick={() => maximizeImage("/lovable-uploads/0afc5405-ec7b-4938-a467-96cf505b98d8.png", "HerbaLink mobile app interface showcasing complete user journey")} />
                  <figcaption className="text-sm text-gray-600 italic mt-2 text-center">
                    HerbaLink mobile app interface showcasing the complete user journey from dashboard to payment
                  </figcaption>
                </figure>
              </motion.div>
              
              <div className="grid lg:grid-cols-3 gap-8">
                {matchingFeatures.map((feature, index) => <motion.div key={index} initial={{
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
              }} className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-emerald-200 hover:shadow-xl transition-all duration-300">
                    <div className="text-4xl mb-6 text-center">{feature.visual}</div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-4 text-center">{feature.title}</h3>
                    <p className="text-neutral-600 text-center leading-relaxed">{feature.description}</p>
                  </motion.div>)}
              </div>
              
              {/* Process Flow Chart */}
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
            }} className="mt-16 mb-16">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-4">AI-Enhanced Development Workflow</h3>
                  <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                    From human conversation to deployed solution - how AI amplifies every step of the development process.
                  </p>
                </div>
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-emerald-200">
                  <img alt="AI-enhanced development workflow from conversation to deployment" onClick={() => maximizeImage("/lovable-uploads/3b9c3f8c-f435-4a25-94fe-f760ae0f4af1.png", "AI-enhanced development workflow from conversation to deployment")} src="/lovable-uploads/4877fa82-46fd-47bf-a10c-1ed97207e289.png" className="w-full h-auto cursor-pointer transition-transform duration-200 hover:scale-[1.02] object-contain" />
                </div>
              </motion.div>

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
            }} className="mt-16 bg-gradient-to-r from-emerald-500 to-teal-500 p-8 rounded-3xl text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Matching Algorithm Results</h3>
                <p className="text-lg opacity-90 max-w-3xl mx-auto white-text-nuclear">
                  85% of users find their ideal herbalist match within the first 3 recommendations, 
                  leading to more successful consultations and better health outcomes.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Key Design Solutions */}
          <section className="key-design-solutions py-20 bg-white">
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
                <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-8">
                  Key Design Solutions
                </h2>
                <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
                  Comprehensive approach to building trust, personalization, and streamlined user experience 
                  in the herbal wellness platform.
                </p>
              </motion.div>
              
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
            }} className="w-full">
                <figure className="project-image-container">
                  <img src="/lovable-uploads/cccd3630-bf92-4251-aad7-b49cdc354ccf.png" alt="Herbalink key design solutions showing trust-building transparency, personalized matching algorithm, educational integration, and streamlined consultation experience" className="w-full rounded-3xl shadow-2xl cursor-pointer transition-transform duration-200 hover:scale-[1.02]" onClick={() => maximizeImage("/lovable-uploads/cccd3630-bf92-4251-aad7-b49cdc354ccf.png", "Comprehensive design solutions for the herbal wellness platform")} />
                  <figcaption className="text-sm text-gray-600 italic mt-2 text-center">
                    Comprehensive design solutions for the herbal wellness platform
                  </figcaption>
                </figure>
              </motion.div>
            </div>
          </section>

          {/* Platform Experience */}
          <section className="mobile-consultation-platform py-20 bg-white">
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
                  <Smartphone className="h-10 w-10 text-purple-500" />
                  <span className="text-purple-600 font-semibold text-lg">Platform Experience</span>
                </div>
                
                <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-8">
                  Mobile-First Wellness Journey
                </h2>
                
                <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
                  Designed for accessibility and ease of use, enabling users to connect with herbalists, 
                  book consultations, and manage their wellness journey from anywhere.
                </p>
              </motion.div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {platformJourney.map((journey, index) => <motion.div key={index} initial={{
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
              }} className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-3xl border border-emerald-200">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <span className="text-sm font-medium text-emerald-600 uppercase tracking-wide">{journey.step}</span>
                        <h3 className="text-xl font-bold text-neutral-900">{journey.title}</h3>
                      </div>
                    </div>
                    
                    <figure className="project-image-container mb-6">
                      <img src={journey.image} alt={`${journey.title} - mobile wellness platform interface`} className="w-full h-64 object-cover rounded-2xl cursor-pointer transition-transform duration-200 hover:scale-[1.02]" onClick={() => maximizeImage(journey.image, `${journey.title} - mobile wellness platform interface`)} />
                      <figcaption className="text-sm text-gray-600 italic mt-2 text-center">
                        {journey.title} - {journey.description}
                      </figcaption>
                    </figure>
                    
                    <p className="text-neutral-600 leading-relaxed">{journey.description}</p>
                  </motion.div>)}
              </div>
            </div>
          </section>

          {/* Wellness Impact */}
          <section className="community-wellness-impact py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
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
                  <Sprout className="h-10 w-10 text-green-500" />
                  <span className="text-green-600 font-semibold text-lg">Wellness Impact</span>
                </div>
                
                <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-8">
                  Growing a Healthier Community
                </h2>
                
                <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed mb-12">
                  Measurable improvements in health accessibility, user satisfaction, and practitioner community growth 
                  demonstrate the platform's positive impact on natural healthcare access.
                </p>
              </motion.div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {wellnessImpact.map((impact, index) => <motion.div key={index} initial={{
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
              }} className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl text-center shadow-lg border border-emerald-200">
                    <div className="flex justify-center mb-4 text-emerald-500">
                      {impact.icon}
                    </div>
                    <div className="text-4xl font-bold text-emerald-600 mb-2">{impact.metric}</div>
                    <div className="text-sm text-neutral-600 uppercase tracking-wide">{impact.label}</div>
                  </motion.div>)}
              </div>
              
              {/* Community Testimonial */}
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
            }} className="bg-white/70 backdrop-blur-sm p-12 rounded-3xl text-center max-w-5xl mx-auto border border-emerald-200 shadow-xl">
                <div className="mb-8">
                  <Leaf className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                  <p className="text-2xl text-neutral-700 italic leading-relaxed mb-6">
                    "Herbalink transformed how I connect with clients. The intelligent matching means I work with people 
                    who truly align with my treatment philosophy, leading to better outcomes for everyone. 
                    It's brought heart back to herbal practice."
                  </p>
                </div>
                
                <div className="flex items-center justify-center gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                    <Leaf className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-neutral-900 text-lg">Dr. Maria Gonzalez</p>
                    <p className="text-emerald-600 font-medium">Certified Clinical Herbalist</p>
                    <p className="text-sm text-neutral-500">15+ years experience</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Related Projects */}
          <RelatedProjects currentProjectId="herbalink" />

          {/* Call to Action */}
          <section className="py-20 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 text-white">
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
                  <Heart className="h-10 w-10" />
                  <span className="font-semibold text-lg">Your Wellness Journey Awaits</span>
                </div>
                
                <h2 className="text-4xl sm:text-5xl font-bold mb-8">
                  Ready to Bridge Ancient Wisdom with Modern Design?
                </h2>
                
                <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed white-text-nuclear">
                  Let's create meaningful digital experiences that honor traditional practices while embracing modern accessibility. 
                  Your wellness platform deserves the same thoughtful, human-centered approach.
                </p>
                
                <Button size="lg" variant="on-dark" className="font-semibold px-10 py-6 text-lg group" onClick={() => window.location.href = '/contact'}>
                  Start Your Wellness Project
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>;
};
export default HerbalinkCaseStudy;
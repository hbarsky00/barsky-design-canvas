import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, Lightbulb, Code, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const StoryDrivenProjectDetail: React.FC = () => {
  return <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Header />
      
      {/* Back Navigation */}
      <div className="pt-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <Link to="/projects" className="inline-flex items-center text-amber-700 hover:text-amber-900 transition-colors font-medium">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Link>
      </div>

      {/* SECTION 1: The Story Hook - Hero with conversation theme */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{
            opacity: 0,
            x: -50
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8
          }}>
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="h-8 w-8 text-amber-600" />
                <span className="text-amber-700 font-semibold">The Story Hook</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                From Restaurant Chat to Business Solution
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                A chance meeting at a restaurant led to discovering a wholesale distribution business drowning in inefficient software. 
                What started as a conversation over dinner became a custom solution that's transforming their daily operations.
              </p>
              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-amber-200">
                <p className="text-lg italic text-gray-800">
                  "Sometimes the best projects come from genuine conversations, not cold pitches."
                </p>
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
              <img alt="Real conversation led to real solutions" className="w-full h-[400px] object-cover rounded-3xl shadow-2xl" src="/lovable-uploads/733f06d4-448d-433a-85c0-80416c2ab26d.png" />
              
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: The Real Problem - Split screen with pain points */}
      <section className="py-16 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Lightbulb className="h-8 w-8 text-red-600" />
              <span className="text-red-700 font-semibold">The Real Problem</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              What They Were Actually Struggling With
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Their Daily Frustrations:</h3>
              {["Grid actions that looked clickable but did nothing (pure frustration)", "Endless screens that buried simple tasks in complexity", "A system designed by people who never ran a distribution business", "Paying for software that actively worked against their workflow", "Hours of manual work that could be automated with basic scripts"].map((pain, index) => <motion.div key={index} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: index * 0.1
            }} className="flex items-start gap-4 bg-red-50 p-4 rounded-xl border border-red-200">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-800">{pain}</p>
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
            duration: 0.8
          }} className="relative">
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop" alt="Understanding actual workflow instead of forcing users to adapt" className="w-full h-[400px] object-cover rounded-2xl shadow-xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: The Evolution - Timeline/progression visual */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Code className="h-8 w-8 text-blue-600" />
              <span className="text-blue-700 font-semibold">The Evolution</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Excel → Custom App → AI-Powered Development
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[{
            step: "1",
            title: "Excel Scripts",
            description: "Started with quick automation to solve immediate pain",
            image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
            color: "green"
          }, {
            step: "2",
            title: "Custom Foundation",
            description: "Built proper app interface on the Excel foundation",
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
            color: "blue"
          }, {
            step: "3",
            title: "AI-Enhanced Development",
            description: "Used AI to evolve from designer to full-stack developer",
            image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
            color: "purple"
          }].map((phase, index) => <motion.div key={index} initial={{
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
          }} className="relative">
                <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-all duration-300">
                  <div className={`w-12 h-12 bg-${phase.color}-500 text-white rounded-full flex items-center justify-center font-bold text-lg mb-6`}>
                    {phase.step}
                  </div>
                  <img src={phase.image} alt={phase.title} className="w-full h-48 object-cover rounded-2xl mb-6" />
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{phase.title}</h3>
                  <p className="text-gray-600">{phase.description}</p>
                </div>
                {index < 2 && <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-300"></div>}
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* SECTION 4: The Human Connection - Quote/testimonial style */}
      <section className="py-16 bg-gradient-to-r from-pink-50 to-rose-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Heart className="h-8 w-8 text-pink-600" />
            <span className="text-pink-700 font-semibold">Why This Project Matters</span>
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
          duration: 0.8
        }} className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 border border-pink-200">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
              The Best Solutions Come from Genuine Relationships
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              This isn't just another portfolio piece. It's proof that the best solutions come from genuine relationships 
              and understanding real human problems, not just following design trends.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-pink-50 p-6 rounded-2xl">
                <p className="text-lg italic text-gray-800 mb-4">
                  "Finally, someone who actually listened to what we needed instead of selling us features"
                </p>
                <p className="font-semibold text-pink-700">- Wholesale Distribution Client</p>
              </div>
              <div className="bg-rose-50 p-6 rounded-2xl">
                <p className="text-lg italic text-gray-800 mb-4">
                  "This is what happens when you design for actual people doing actual work"
                </p>
                <p className="font-semibold text-rose-700">- Business Owner</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: Technical Innovation - Skills showcase */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <TrendingUp className="h-8 w-8 text-emerald-600" />
              <span className="text-emerald-700 font-semibold">Technical Innovation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              AI Didn't Replace My Skills - It Amplified Them
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Now I can take a project from user research through final deployment, creating solutions that actually work for real businesses.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{
            opacity: 0,
            x: -50
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.8
          }}>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Results That Matter:</h3>
                {["70% reduction in manual data entry through intelligent automation", "Eliminated daily frustration with unclickable interface elements", "Custom solution more cost-effective than existing platform", "Ongoing partnership based on trust and delivered results"].map((result, index) => <div key={index} className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <p className="text-gray-700">{result}</p>
                  </div>)}
              </div>
            </motion.div>
            
            <motion.div initial={{
            opacity: 0,
            x: 50
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }}>
              <img src="https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&h=500&fit=crop" alt="Sustainable business relationships built on understanding" className="w-full h-[350px] object-cover rounded-3xl shadow-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready for Your Own Story-Driven Solution?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let's start with a conversation about your real challenges, not a sales pitch.
          </p>
          <Button size="lg" variant="default" className="font-semibold px-8 py-4 text-lg">
            Start the Conversation
          </Button>
        </div>
      </section>

      <Footer />
    </div>;
};
export default StoryDrivenProjectDetail;
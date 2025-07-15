import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Users, MessageCircle, Calendar, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import RelatedProjects from "@/components/RelatedProjects";
import ShareButtons from "@/components/blog/ShareButtons";
import MaximizableImage from "@/components/project/MaximizableImage";

const SplittimeCaseStudy: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Splittime Co-Parenting App UX Design Case Study | Barsky Design</title>
        <meta name="description" content="Co-parenting coordination app UX design. Simplified scheduling, communication, and expense tracking for divorced parents. Reduced conflict through intuitive design and AI-powered scheduling." />
        <meta property="og:title" content="Splittime Co-Parenting App UX Design Case Study" />
        <meta property="og:description" content="Co-parenting coordination app UX design. Simplified scheduling, communication, and expense tracking for divorced parents. Reduced conflict through intuitive design and AI-powered scheduling." />
        <meta property="og:image" content="https://barskydesign.pro/images/splittime-case-study-preview.jpg" />
        <meta property="og:url" content="https://barskydesign.pro/case-studies/splittime-coparenting-app-design" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Splittime Co-Parenting App UX Design Case Study" />
        <meta name="twitter:description" content="Co-parenting coordination app UX design. Simplified scheduling, communication, and expense tracking for divorced parents. Reduced conflict through intuitive design and AI-powered scheduling." />
        <meta name="twitter:image" content="https://barskydesign.pro/images/splittime-case-study-preview.jpg" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Header />
        
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
          <section className="py-8 lg:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="lg:grid lg:grid-cols-2 gap-16 items-center">
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
                  
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight">
                    Reducing Conflict Through
                    <span className="text-indigo-600 block">Thoughtful Design</span>
                  </h1>
                  
                  <p className="text-xl text-neutral-600 leading-relaxed">
                    Co-parenting after divorce is challenging enough without technology barriers. Splittime transforms 
                    how divorced parents coordinate schedules, communicate about their children, and manage shared expenses 
                    through AI-powered conflict reduction and intuitive design.
                  </p>
                  
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
                    src="/lovable-uploads/splittime-hero.png"
                    alt="Splittime co-parenting app interface showing calendar, messaging, and expense tracking features"
                    caption="Splittime co-parenting coordination platform interface"
                    className="w-full h-[500px] rounded-3xl shadow-2xl"
                    projectId="splittime"
                    aspectRatio="500/400"
                  />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Problem Section */}
          <section className="py-20 bg-white/60 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.8 }} 
                className="text-center mb-16"
              >
                <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-8">
                  The Co-Parenting Challenge
                </h2>
                <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
                  Divorced parents face complex coordination challenges that traditional tools can't solve effectively.
                </p>
              </motion.div>
              
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="bg-gradient-to-r from-red-50 to-orange-50 p-8 rounded-3xl border border-red-200">
                  <MessageCircle className="h-12 w-12 text-red-500 mb-6" />
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">Communication Breakdown</h3>
                  <p className="text-neutral-600">
                    Divorced parents struggled with effective communication, leading to misunderstandings and increased conflict.
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-3xl border border-yellow-200">
                  <Calendar className="h-12 w-12 text-yellow-500 mb-6" />
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">Scheduling Conflicts</h3>
                  <p className="text-neutral-600">
                    Complex custody schedules and school events created confusion and missed opportunities.
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-200">
                  <Users className="h-12 w-12 text-blue-500 mb-6" />
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">Expense Tracking</h3>
                  <p className="text-neutral-600">
                    Shared expenses were difficult to track, leading to disputes over payments and responsibilities.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Impact Metrics */}
          <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.8 }} 
                className="text-center mb-16"
              >
                <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-8">
                  Measurable Impact
                </h2>
                <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
                  Splittime delivered significant improvements in co-parenting coordination and family communication.
                </p>
              </motion.div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl text-center shadow-lg border border-indigo-200">
                  <div className="text-4xl font-bold text-indigo-600 mb-2">73%</div>
                  <div className="text-sm text-neutral-600 uppercase tracking-wide">Reduction in Communication Conflicts</div>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl text-center shadow-lg border border-indigo-200">
                  <div className="text-4xl font-bold text-indigo-600 mb-2">85%</div>
                  <div className="text-sm text-neutral-600 uppercase tracking-wide">Improved Schedule Coordination</div>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl text-center shadow-lg border border-indigo-200">
                  <div className="text-4xl font-bold text-indigo-600 mb-2">91%</div>
                  <div className="text-sm text-neutral-600 uppercase tracking-wide">User Satisfaction Rate</div>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl text-center shadow-lg border border-indigo-200">
                  <div className="text-4xl font-bold text-indigo-600 mb-2">60%</div>
                  <div className="text-sm text-neutral-600 uppercase tracking-wide">Faster Expense Resolution</div>
                </div>
              </div>
            </div>
          </section>

          {/* Related Projects */}
          <RelatedProjects currentProjectId="splittime" />

          {/* Call to Action */}
          <section className="py-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl sm:text-5xl font-bold mb-8">
                  Ready to Transform Family Communication?
                </h2>
                
                <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
                  Let's create thoughtful solutions that bring families together through better design and technology.
                </p>
                
                <Button 
                  size="lg" 
                  variant="default" 
                  className="font-semibold px-10 py-6 text-lg group" 
                  onClick={() => window.location.href = '/contact'}
                >
                  Start Your Family Tech Project
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default SplittimeCaseStudy;

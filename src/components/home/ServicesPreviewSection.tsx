import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Rocket, Target, Trophy, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const ServicesPreviewSection: React.FC = () => {
  const services = [{
    icon: <Rocket className="h-8 w-8 text-blue-600" />,
    title: "MVP Validation Package",
    price: "$8,500",
    description: "Perfect for funded startups needing rapid market validation",
    timeline: "3 weeks to launch-ready design",
    features: ["AI-powered competitive analysis", "User persona development with ChatGPT", "Strategic UX wireframes", "High-fidelity UI design", "Interactive prototype", "30-day post-launch support"],
    cta: "Learn More",
    href: "/services#mvp-validation"
  }, {
    icon: <Trophy className="h-8 w-8 text-purple-600" />,
    title: "AI-Enhanced Redesign",
    price: "$18,500",
    description: "For enterprises ready to dominate their market",
    timeline: "12 weeks to industry-leading experience",
    features: ["Complete UX research with AI insights", "Strategic redesign with optimization", "AI integration (ChatGPT/Claude APIs)", "Responsive design system", "Development collaboration", "90-day optimization support"],
    cta: "Start Redesign",
    href: "/services#ai-redesign"
  }];
  return <section className="py-16 lg:py-24 bg-white" id="services-preview">
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Choose Your Revenue Growth Strategy
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Two proven packages designed to accelerate business growth through AI-enhanced UX design. 
            Each includes free consultation to ensure perfect fit for your goals.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8,
          delay: index * 0.2
        }} className="glass-card-elevated p-8 relative hover:shadow-2xl transition-all duration-300 border border-gray-100">
              {/* Icon and Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  {service.icon}
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span className="text-2xl font-bold text-gray-900">{service.price}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">{service.timeline}</span>
                </div>
              </div>

              {/* Features List */}
              <div className="mb-8">
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => <li key={featureIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>)}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="mt-auto">
                <Link to={service.href}>
                  <Button variant="default" className="w-full group" size="lg">
                    <span className="text-slate-50">{service.cta}</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>)}
        </div>

        {/* Bottom CTA */}
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
      }} className="text-center mt-16">
          <div className="glass-card p-8 max-w-2xl mx-auto border border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to 10X Your Conversion Rate?
            </h3>
            <p className="text-gray-600 mb-6">
              Get a free 30-minute strategy session where I'll analyze your current setup and show you exactly 
              how to implement AI-enhanced UX that drives measurable ROI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="default" size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 shadow-lg hover:shadow-xl transition-all duration-300" onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({
                  behavior: 'smooth'
                });
              }
            }}>
                Book Free Strategy Session
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 transition-all duration-300" onClick={() => {
              const projectsSection = document.getElementById('projects');
              if (projectsSection) {
                projectsSection.scrollIntoView({
                  behavior: 'smooth'
                });
              }
            }}>
                See Success Stories
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>;
};
export default ServicesPreviewSection;
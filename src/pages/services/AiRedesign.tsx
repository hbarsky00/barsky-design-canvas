import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, Zap, Target, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ServicePage from '@/components/pages/ServicePage';

const AiRedesign: React.FC = () => {
  return (
    <ServicePage
      title="AI-Powered Website Redesign"
      description="Transform your website with cutting-edge AI tools and data-driven design decisions that boost conversions by 40%+."
    >
      <div className="space-y-8">
        {/* Hero Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-impact-metric-neutral-md text-gray-900">3x</div>
            <div className="text-sm text-gray-600">Faster Design Process</div>
          </div>
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-impact-metric-neutral-md text-gray-900">40%+</div>
            <div className="text-sm text-gray-600">Conversion Increase</div>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-impact-metric-neutral-md text-gray-900">2-3 weeks</div>
            <div className="text-sm text-gray-600">Delivery Timeline</div>
          </div>
        </div>

        {/* AI-Powered Process */}
        <section>
          <h2 className="heading-subsection text-gray-900 mb-6">Our AI-Enhanced Process</h2>
          
          <div className="space-y-6">
            {[
              {
                phase: "AI Analysis & Research",
                description: "Advanced analytics tools analyze user behavior, competitor strategies, and conversion optimization opportunities.",
                tools: ["Hotjar AI", "Google Analytics Intelligence", "Competitor Analysis AI"]
              },
              {
                phase: "Intelligent Design Generation", 
                description: "AI-powered design tools create multiple layout variations optimized for your specific audience and goals.",
                tools: ["Figma AI Assistant", "Midjourney for Graphics", "Copy.ai for Content"]
              },
              {
                phase: "Data-Driven Optimization",
                description: "Machine learning algorithms predict the best performing elements and automatically suggest improvements.",
                tools: ["A/B Testing AI", "Conversion Prediction Models", "User Experience AI"]
              },
              {
                phase: "AI-Powered Development",
                description: "Automated code generation and optimization tools ensure fast, clean, and SEO-friendly implementation.",
                tools: ["GitHub Copilot", "AI Code Optimization", "Performance AI Tools"]
              }
            ].map((phase, index) => (
              <div key={index} className="border-l-4 border-blue-600 pl-6 py-4">
                <h3 className="heading-medium text-gray-900 mb-2">{phase.phase}</h3>
                <p className="text-gray-700 mb-3">{phase.description}</p>
                <div className="flex flex-wrap gap-2">
                  {phase.tools.map((tool, toolIndex) => (
                    <Badge key={toolIndex} variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What's Included */}
        <section>
          <h2 className="heading-subsection text-gray-900 mb-6">Complete Redesign Package</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "AI-powered user research & analysis",
              "Competitor intelligence report",
              "Custom design system creation",
              "Mobile-first responsive design",
              "Performance optimization",
              "SEO-friendly development",
              "Conversion rate optimization",
              "3 months of post-launch support"
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg">
          <h3 className="heading-medium mb-4">Investment & Timeline</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="heading-medium mb-3">Complete AI Website Redesign</h4>
              <div className="text-impact-metric-neutral-lg mb-2">$4,997</div>
              <p className="text-sm opacity-90 mb-4">Or 3 payments of $1,799</p>
              <Badge className="bg-white/20 text-white border-white/30">
                Includes 3 months support
              </Badge>
            </div>
            <div>
              <h4 className="heading-medium mb-3">Project Timeline</h4>
              <ul className="space-y-2 text-sm">
                <li>• Week 1: AI Analysis & Strategy</li>
                <li>• Week 2-3: Design & Prototyping</li>
                <li>• Week 4-5: Development & Testing</li>
                <li>• Week 6: Launch & Optimization</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h3 className="heading-medium text-gray-900 mb-4">
            Ready to Revolutionize Your Website?
          </h3>
          <p className="text-gray-600 mb-6">
            Schedule a free consultation to discuss your project and see how AI can transform your online presence.
          </p>
          <Button 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Get Free Consultation
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </section>
      </div>
    </ServicePage>
  );
};

export default AiRedesign;

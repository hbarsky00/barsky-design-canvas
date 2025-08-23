import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, Lightbulb, Users, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ServicePage from '@/components/pages/ServicePage';

const MvpValidation: React.FC = () => {
  return (
    <ServicePage
      title="MVP Validation & User Testing"
      description="Validate your product idea with real users before investing in full development. Save time, money, and ensure market fit."
    >
      <div className="space-y-8">
        {/* Key Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <Lightbulb className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-impact-metric-neutral-md text-gray-900">85%</div>
            <div className="text-sm text-gray-600">Faster Time to Market</div>
          </div>
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-impact-metric-neutral-md text-gray-900">50+</div>
            <div className="text-sm text-gray-600">User Interviews</div>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-impact-metric-neutral-md text-gray-900">70%</div>
            <div className="text-sm text-gray-600">Reduced Development Risk</div>
          </div>
        </div>

        {/* Validation Process */}
        <section>
          <h2 className="heading-subsection text-gray-900 mb-6">Comprehensive Validation Process</h2>
          
          <div className="space-y-6">
            {[
              {
                phase: "Market Research & Analysis",
                description: "Deep dive into your target market, competitors, and user needs to validate demand.",
                deliverables: ["Market size analysis", "Competitor benchmarking", "User persona development"]
              },
              {
                phase: "Prototype Development",
                description: "Create interactive prototypes and wireframes to test core functionality and user flows.",
                deliverables: ["Interactive prototypes", "User flow diagrams", "Feature prioritization"]
              },
              {
                phase: "User Testing & Interviews",
                description: "Conduct moderated user testing sessions and interviews to gather qualitative insights.",
                deliverables: ["50+ user interviews", "Usability testing reports", "User feedback synthesis"]
              },
              {
                phase: "Data-Driven Recommendations",
                description: "Analyze all findings and provide actionable recommendations for product development.",
                deliverables: ["Validation report", "Product roadmap", "Go-to-market strategy"]
              }
            ].map((phase, index) => (
              <div key={index} className="border-l-4 border-green-600 pl-6 py-4">
                <h3 className="heading-medium text-gray-900 mb-2">{phase.phase}</h3>
                <p className="text-gray-700 mb-3">{phase.description}</p>
                <div className="grid md:grid-cols-3 gap-2">
                  {phase.deliverables.map((deliverable, deliverableIndex) => (
                    <div key={deliverableIndex} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{deliverable}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What You Get */}
        <section>
          <h2 className="heading-subsection text-gray-900 mb-6">Complete Validation Package</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Market research & competitive analysis",
              "Interactive prototype development",
              "50+ user interviews & testing sessions",
              "Detailed validation report",
              "Product development roadmap",
              "Go-to-market strategy",
              "Risk assessment & mitigation plan",
              "Investor-ready presentation deck"
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Success Stories */}
        <section className="bg-gray-50 p-8 rounded-lg">
          <h3 className="heading-medium text-gray-900 mb-6">Validation Success Stories</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="heading-medium text-gray-900 mb-2">FinTech Startup</h4>
              <p className="text-gray-600 text-sm mb-3">
                Validated lending platform concept, identified key user pain points, and pivoted features 
                before development. Saved $200K+ in unnecessary features.
              </p>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                70% faster launch
              </Badge>
            </div>
            
            <div>
              <h4 className="heading-medium text-gray-900 mb-2">E-commerce Platform</h4>
              <p className="text-gray-600 text-sm mb-3">
                User testing revealed critical UX issues in checkout flow. Post-validation improvements 
                led to 45% increase in conversion rates.
              </p>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                45% conversion boost
              </Badge>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-lg">
          <h3 className="heading-medium mb-4">Investment & Timeline</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="heading-medium mb-3">Complete MVP Validation</h4>
              <div className="text-impact-metric-neutral-lg mb-2">$7,997</div>
              <p className="text-sm opacity-90 mb-4">Or 3 payments of $2,799</p>
              <Badge className="bg-white/20 text-white border-white/30">
                ROI: Save $50K+ in development costs
              </Badge>
            </div>
            <div>
              <h4 className="heading-medium mb-3">Project Timeline</h4>
              <ul className="space-y-2 text-sm">
                <li>• Week 1-2: Market research & prototype</li>
                <li>• Week 3-4: User testing & interviews</li>
                <li>• Week 5: Analysis & recommendations</li>
                <li>• Week 6: Final report & presentation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Preview */}
        <section>
          <h3 className="heading-medium text-gray-900 mb-6">Common Questions</h3>
          <div className="space-y-4">
            {[
              {
                q: "What if my idea doesn't validate?",
                a: "That's valuable information! We'll help you pivot or refine your concept based on user feedback, potentially saving you thousands in development costs."
              },
              {
                q: "How do you recruit test users?",
                a: "We use a combination of your existing network, professional recruiting services, and our database of qualified participants who match your target demographics."
              },
              {
                q: "Can you help with technical feasibility?",
                a: "Yes! Our validation includes technical architecture review and feasibility assessment to ensure your MVP can be built efficiently."
              }
            ].map((faq, index) => (
              <div key={index} className="border border-gray-200 p-4 rounded-lg">
                <h4 className="heading-medium text-gray-900 mb-2">{faq.q}</h4>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h3 className="heading-medium text-gray-900 mb-4">
            Ready to Validate Your Product Idea?
          </h3>
          <p className="text-gray-600 mb-6">
            Don't risk building something nobody wants. Let's validate your MVP with real users first.
          </p>
          <Button 
            size="lg"
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Start Validation Process
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </section>
      </div>
    </ServicePage>
  );
};

export default MvpValidation;

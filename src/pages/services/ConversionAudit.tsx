import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, BarChart3, Target, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ServicePage from '@/components/pages/ServicePage';

const ConversionAudit: React.FC = () => {
  return (
    <ServicePage
      title="Conversion Rate Optimization Audit"
      description="Identify exactly what's preventing visitors from converting with our comprehensive CRO audit and actionable improvement plan."
    >
      <div className="space-y-8">
        {/* Results Preview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <BarChart3 className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-impact-metric-neutral-md text-gray-900">47%</div>
            <div className="text-sm text-gray-600">Average Conversion Increase</div>
          </div>
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-impact-metric-neutral-md text-gray-900">23</div>
            <div className="text-sm text-gray-600">Optimization Opportunities Found</div>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-impact-metric-neutral-md text-gray-900">3-5 days</div>
            <div className="text-sm text-gray-600">Audit Completion</div>
          </div>
        </div>

        {/* Audit Areas */}
        <section>
          <h2 className="heading-subsection text-gray-900 mb-6">Comprehensive Audit Areas</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                category: "User Experience Analysis",
                items: [
                  "Navigation flow optimization",
                  "Page loading speed analysis", 
                  "Mobile responsiveness review",
                  "User journey mapping"
                ]
              },
              {
                category: "Conversion Funnel Review",
                items: [
                  "Landing page effectiveness",
                  "Form optimization opportunities",
                  "Checkout process analysis",
                  "Call-to-action placement"
                ]
              },
              {
                category: "Content & Messaging",
                items: [
                  "Value proposition clarity",
                  "Content relevance scoring",
                  "Trust signal effectiveness",
                  "Urgency and scarcity elements"
                ]
              },
              {
                category: "Technical Performance",
                items: [
                  "Page speed optimization",
                  "SEO conversion factors",
                  "Analytics implementation",
                  "Error identification"
                ]
              }
            ].map((section, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <h3 className="heading-medium text-gray-900 mb-4">{section.category}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Deliverables */}
        <section>
          <h2 className="heading-subsection text-gray-900 mb-6">What You'll Receive</h2>
          
          <div className="space-y-4">
            {[
              {
                title: "Executive Summary Report",
                description: "High-level overview of findings and potential revenue impact",
                deliverable: "PDF Report"
              },
              {
                title: "Detailed Audit Findings",
                description: "Comprehensive analysis of all identified issues and opportunities",
                deliverable: "50+ Page Report"
              },
              {
                title: "Prioritized Action Plan",
                description: "Step-by-step roadmap ranked by impact and effort required",
                deliverable: "Implementation Guide"
              },
              {
                title: "Wireframes & Mockups",
                description: "Visual representations of recommended changes and improvements",
                deliverable: "Design Files"
              },
              {
                title: "Strategy Session",
                description: "60-minute call to review findings and discuss implementation",
                deliverable: "Video Call + Recording"
              }
            ].map((item, index) => (
              <div key={index} className="border border-gray-200 p-6 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="heading-medium text-gray-900">{item.title}</h3>
                  <Badge variant="outline" className="text-blue-700 border-blue-200">
                    {item.deliverable}
                  </Badge>
                </div>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8 rounded-lg">
          <h3 className="heading-medium mb-4">Investment & ROI</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="heading-medium mb-3">Complete CRO Audit</h4>
              <div className="text-impact-metric-neutral-lg mb-2">$1,497</div>
              <p className="text-sm opacity-90 mb-4">One-time investment</p>
              <Badge className="bg-white/20 text-white border-white/30">
                Average ROI: 400%+ within 3 months
              </Badge>
            </div>
            <div>
              <h4 className="heading-medium mb-3">Typical Results</h4>
              <ul className="space-y-2 text-sm">
                <li>• 47% average conversion increase</li>
                <li>• $50K+ additional annual revenue</li>
                <li>• 23+ optimization opportunities</li>
                <li>• 3-month implementation timeline</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Process */}
        <section>
          <h3 className="heading-medium text-gray-900 mb-6">Audit Process & Timeline</h3>
          <div className="space-y-4">
            {[
              { step: "1", title: "Discovery Call", desc: "30-minute consultation to understand your goals and challenges", time: "Day 1" },
              { step: "2", title: "Data Collection", desc: "Analytics review, heatmap analysis, and user session recordings", time: "Days 1-2" },
              { step: "3", title: "Comprehensive Analysis", desc: "Detailed audit of all conversion factors and user experience elements", time: "Days 3-4" },
              { step: "4", title: "Report Creation", desc: "Compile findings into actionable recommendations with visual mockups", time: "Day 5" },
              { step: "5", title: "Strategy Session", desc: "60-minute presentation of findings and implementation planning", time: "Day 6" }
            ].map((item, index) => (
              <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center heading-medium text-sm">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h4 className="heading-medium text-gray-900">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                  <span className="text-xs text-blue-600 font-medium">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h3 className="heading-medium text-gray-900 mb-4">
            Ready to Unlock Your Website's Revenue Potential?
          </h3>
          <p className="text-gray-600 mb-6">
            Get a comprehensive audit that shows you exactly how to increase conversions and revenue.
          </p>
          <Button 
            size="lg"
            className="bg-green-600 hover:bg-green-700"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Start My Audit Today
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </section>
      </div>
    </ServicePage>
  );
};

export default ConversionAudit;

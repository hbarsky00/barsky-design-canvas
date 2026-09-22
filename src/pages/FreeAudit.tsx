import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ServicePage from '@/components/pages/ServicePage';
import FreeAuditForm from '@/components/forms/FreeAuditForm';

const FreeAudit: React.FC = () => {
  return (
    <ServicePage
      title="Free UX/Conversion Audit"
      description="Get a comprehensive analysis of your website's user experience and conversion potential - completely free."
    >
      <div className="space-y-8">
        {/* What You Get Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-500" />
            What You'll Receive
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Detailed UX analysis report",
              "Conversion bottleneck identification", 
              "Mobile responsiveness review",
              "Accessibility compliance check",
              "Performance optimization recommendations",
              "Competitive analysis insights",
              "Actionable improvement roadmap",
              "30-minute strategy call"
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Why Free Section */}
        <section className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Is This Free?</h3>
          <p className="text-gray-700 mb-4">
            I believe in demonstrating value upfront. This audit showcases the depth of insights 
            and improvements possible for your website. Many clients see immediate wins just from 
            implementing the free recommendations.
          </p>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            No strings attached • No sales pitch • Pure value
          </Badge>
        </section>

        {/* Form Section */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Request Your Free Audit</h3>
          <FreeAuditForm />
        </section>

        {/* Process Timeline */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-6">What Happens Next?</h3>
          <div className="space-y-4">
            {[
              { step: "1", title: "Submit Your Request", desc: "Provide your website URL and basic info", time: "2 minutes" },
              { step: "2", title: "Comprehensive Analysis", desc: "I'll conduct a thorough UX and conversion audit", time: "24-48 hours" },
              { step: "3", title: "Detailed Report Delivered", desc: "Receive actionable insights and recommendations", time: "Email delivery" },
              { step: "4", title: "Strategy Call (Optional)", desc: "Discuss findings and next steps", time: "30 minutes" }
            ].map((item, index) => (
              <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                  <span className="text-xs text-blue-600 font-medium">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </ServicePage>
  );
};

export default FreeAudit;

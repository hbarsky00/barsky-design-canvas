import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, Linkedin, Users, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ServicePage from '@/components/pages/ServicePage';
import LinkedInAuditForm from '@/components/forms/LinkedInAuditForm';

const LinkedInVisitors: React.FC = () => {
  return (
    <ServicePage
      title="LinkedIn Profile Optimization"
      description="Transform your LinkedIn profile into a lead-generating machine that attracts your ideal clients and converts visitors into conversations."
    >
      <div className="space-y-8">
        {/* Hero Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">3x</div>
            <div className="text-sm text-gray-600">More Profile Views</div>
          </div>
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">150%</div>
            <div className="text-sm text-gray-600">Increase in Connection Requests</div>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <Linkedin className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">5x</div>
            <div className="text-sm text-gray-600">More Inbound Messages</div>
          </div>
        </div>

        {/* What's Included */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">LinkedIn Profile Transformation</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Strategic headline optimization",
              "Compelling summary rewrite", 
              "Experience section enhancement",
              "Skills & endorsements audit",
              "Professional photo guidelines",
              "Content strategy recommendations",
              "Connection request templates",
              "Monthly performance review"
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Results Preview */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Before vs. After Results</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-3 text-red-200">❌ Before Optimization</h4>
              <ul className="space-y-2 text-sm">
                <li>• Generic headline and summary</li>
                <li>• Low profile visibility</li>
                <li>• Few meaningful connections</li>
                <li>• Minimal inbound inquiries</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-green-200">✅ After Optimization</h4>
              <ul className="space-y-2 text-sm">
                <li>• Compelling, keyword-rich profile</li>
                <li>• 3x more profile views</li>
                <li>• Quality connection requests</li>
                <li>• Regular client inquiries</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Investment & Timeline</h3>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Complete LinkedIn Optimization</h4>
                <div className="text-3xl font-bold text-blue-600 mb-2">$497</div>
                <p className="text-gray-600 text-sm mb-4">One-time investment</p>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Typically pays for itself with 1 new client
                </Badge>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Timeline</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Initial consultation: 30 minutes</li>
                  <li>• Profile audit & strategy: 24-48 hours</li>
                  <li>• Content creation: 2-3 days</li>
                  <li>• Revisions & finalization: 1-2 days</li>
                  <li>• <strong>Total turnaround: 5-7 days</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Form */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Ready to Transform Your LinkedIn Presence?</h3>
          <LinkedInAuditForm />
        </section>
      </div>
    </ServicePage>
  );
};

export default LinkedInVisitors;

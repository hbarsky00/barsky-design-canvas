import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeadCaptureForm from '@/components/leads/LeadCaptureForm';
import DynamicSeo from '@/components/seo/DynamicSeo';

const LeadCapture: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <DynamicSeo
        type="service"
        title="Start Your AI-Enhanced Design Project | Get Custom Quote | Hiram Barsky"
        description="Ready to transform your digital product with AI-enhanced UX design? Get a personalized project plan and quote within 24 hours. Specializing in AI integration and user experience."
        image="https://barskydesign.pro/lovable-uploads/e8d40a32-b582-44f6-b417-48bdd5c5b6eb.png"
        serviceName="AI-Enhanced Design Project"
        benefits={["24-hour response time", "Personalized project plan", "AI integration expertise", "Custom quote"]}
        targetAudience="Businesses and startups"
        path="/get-started"
      />
      
      <Header />
      
      <main className="flex-grow pt-24 py-12">
        <div className="section-container">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Start Your Project
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get a personalized project plan and quote within 24 hours.
            </p>
          </div>
          
          <LeadCaptureForm />
          
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">What Happens Next?</h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="flex items-start gap-3">
                <div className="w-[38px] h-[38px] bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-semibold">Initial Review</h3>
                  <p className="text-sm text-muted-foreground">
                    I'll review your project details and research your industry and competitors.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-[38px] h-[38px] bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-semibold">Discovery Call</h3>
                  <p className="text-sm text-muted-foreground">
                    We'll have a 30-minute call to discuss your vision and requirements in detail.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-[38px] h-[38px] bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-semibold">Custom Proposal</h3>
                  <p className="text-sm text-muted-foreground">
                    You'll receive a detailed proposal with timeline, deliverables, and pricing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LeadCapture;
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeadCaptureForm from '@/components/leads/LeadCaptureForm';
import EnhancedGlobalSeo from '@/components/seo/EnhancedGlobalSeo';

const LeadCapture: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <EnhancedGlobalSeo 
        title="Start Your AI-Enhanced Design Project | Get Custom Quote | Hiram Barsky"
        description="Ready to transform your digital product with AI-enhanced UX design? Get a personalized project plan and quote within 24 hours. Specializing in AI integration and user experience."
        canonicalUrl="https://barskydesign.pro/get-started"
        pageType="content"
        keywords={[
          "AI UX design quote", "custom design project", "AI integration consultation",
          "personalized UX proposal", "AI-enhanced design services", "digital product transformation",
          "user experience consultation", "AI-powered design solutions"
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "AI-Enhanced UX Design Consultation",
          "description": "Personalized AI-enhanced UX design services with custom project planning and 24-hour response time",
          "provider": {
            "@type": "Person",
            "name": "Hiram Barsky",
            "jobTitle": "AI-Fluent UX Designer & Accessibility Specialist"
          },
          "serviceType": "UX Design Consultation",
          "areaServed": "Worldwide",
          "url": "https://barskydesign.pro/get-started"
        }}
      />
      
      <Header />
      
      <main className="flex-grow pt-24 py-12">
        <div className="section-container">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to Build Something Amazing?
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Let's discuss your project and create a custom solution that combines cutting-edge AI 
              with exceptional user experience design.
            </p>
          </div>
          
          <LeadCaptureForm />
          
          <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold">AI-Powered Analysis</h3>
              <p className="text-muted-foreground">
                I use AI tools to analyze your project requirements and create data-driven design solutions.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold">24-Hour Response</h3>
              <p className="text-muted-foreground">
                You'll receive a personalized project plan and next steps within 24 hours of submission.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold">Custom Solutions</h3>
              <p className="text-muted-foreground">
                Every project gets a tailored approach based on your specific goals and constraints.
              </p>
            </div>
          </div>
          
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">What Happens Next?</h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
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
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
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
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
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
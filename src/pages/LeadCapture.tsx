import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeadCaptureHero from '@/components/lead-capture/LeadCaptureHero';
import LeadCaptureForm from '@/components/lead-capture/LeadCaptureForm';
import TrustIndicators from '@/components/lead-capture/TrustIndicators';

const LeadCapture: React.FC = () => {
  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <main className="pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <LeadCaptureHero />
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <LeadCaptureForm />
              <TrustIndicators />
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default LeadCapture;

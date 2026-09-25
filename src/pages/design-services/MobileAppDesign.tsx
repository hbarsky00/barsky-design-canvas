
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceDetail from '@/components/services/ServiceDetail';
import { MOBILE_APP_DESIGN } from '@/data/serviceContent';

const MobileAppDesign = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main id="main-content" className="flex-grow pt-24">
        <ServiceDetail content={MOBILE_APP_DESIGN} />
      </main>
      <Footer />
    </div>
  );
};

export default MobileAppDesign;

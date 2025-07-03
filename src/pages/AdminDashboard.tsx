import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeadManagementDashboard from '@/components/leads/LeadManagementDashboard';

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Admin Dashboard - Lead Management | Hiram Barsky</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow pt-24 py-12">
        <div className="section-container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Lead Management Dashboard</h1>
            <p className="text-muted-foreground">
              Track and manage your potential clients and project inquiries.
            </p>
          </div>
          
          <LeadManagementDashboard />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;

import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeadManagementDashboard from '@/components/leads/LeadManagementDashboard';
import { useAdminCheck } from '@/hooks/useAdminCheck';
import AdminAuthPanel from '@/components/auth/AdminAuthPanel';
import { Loader2 } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { isLoading, isAdmin, user } = useAdminCheck();

  // Loading state while we determine auth + roles
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Helmet>
          <title>Admin Dashboard - Lead Management | Hiram Barsky</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <Header />
        <main className="flex-grow pt-24 py-12">
          <div className="section-container flex items-center justify-center h-64 text-muted-foreground">
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Checking admin access...
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Gate admin-only access
  if (!user || !isAdmin) {
    return (
      <div className="flex flex-col min-h-screen">
        <Helmet>
          <title>Admin Login Required | Hiram Barsky</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <Header />
        <main className="flex-grow pt-24 py-12">
          <div className="section-container space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin access required</h1>
              <p className="text-muted-foreground">
                Sign in with an administrator account to view and manage leads.
              </p>
            </div>
            <AdminAuthPanel />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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

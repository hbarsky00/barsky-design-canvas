
import React from 'react';
import DatabaseViewer from '@/components/dev/DatabaseViewer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminCheck } from '@/hooks/useAdminCheck';
import AdminAuthPanel from '@/components/auth/AdminAuthPanel';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Loader2 } from 'lucide-react';

const DatabaseViewerPage: React.FC = () => {
  const { isLoading, isAdmin, user } = useAdminCheck();

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Helmet>
          <title>Database Viewer | Loading</title>
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

  if (!user || !isAdmin) {
    return (
      <div className="flex flex-col min-h-screen">
        <Helmet>
          <title>Database Viewer | Admin Login Required</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <Header />
        <main className="flex-grow pt-24 py-12">
          <div className="section-container space-y-6">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Database Verification Tool</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Admin login is required to view database contents.
                </p>
              </CardContent>
            </Card>
            <AdminAuthPanel title="Admin Sign In" subtitle="Only administrators can view this tool." />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Database Verification Tool</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            This tool helps you verify that image captions and other changes are being properly stored in the database.
            You can filter by type to see specific entries and toggle visibility of values for security.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">What to look for:</h4>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• <strong>image_caption</strong> entries show AI-generated captions saved to database</li>
              <li>• <strong>image</strong> entries show uploaded/replaced images</li>
              <li>• <strong>text</strong> entries show edited text content</li>
              <li>• All entries should have recent timestamps when changes are made</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <DatabaseViewer />
    </div>
  );
};

export default DatabaseViewerPage;


import React from 'react';
import { useDevMode } from '@/context/DevModeContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlobalCaptionGenerator from '@/components/captions/GlobalCaptionGenerator';
import { Navigate } from 'react-router-dom';

const GlobalCaptions: React.FC = () => {
  const { isDevMode } = useDevMode();

  // Redirect to home if not in dev mode
  if (!isDevMode) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              AI Caption Generator
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Generate high-quality AI captions for all images across your entire portfolio. 
              This tool will scan all projects and create descriptive, SEO-optimized captions automatically.
            </p>
          </div>
          
          <GlobalCaptionGenerator />
          
          <div className="mt-12 p-6 bg-blue-50 rounded-lg">
            <h2 className="font-semibold text-blue-900 mb-3">What this tool does:</h2>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• Scans all 8 project pages for images without quality captions</li>
              <li>• Generates 4 caption styles: Alt-text, Descriptive, SEO-optimized, and Technical</li>
              <li>• Uses OpenAI's GPT-4o-mini for intelligent image analysis</li>
              <li>• Automatically saves captions to your project data</li>
              <li>• Provides real-time progress tracking and error handling</li>
              <li>• Exports results for backup and review</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GlobalCaptions;

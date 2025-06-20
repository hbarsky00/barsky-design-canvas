
import React from 'react';
import { useDevMode } from '@/context/DevModeContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Global Caption Monitor
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The caption scanner is now running globally across the entire application. 
              It automatically monitors and fixes caption issues without any user intervention.
            </p>
          </div>
          
          {/* Status indicator */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-3"></div>
              <span className="text-green-800 font-medium">
                Global scanner active - automatically monitoring all portfolio images
              </span>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-6">
            <h2 className="font-semibold text-blue-900 mb-3">How it works:</h2>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• <strong>Fully Automated:</strong> Runs on every page load and continuously in the background</li>
              <li>• <strong>No User Interaction:</strong> Operates completely silently without any UI or user input needed</li>
              <li>• <strong>Global Monitoring:</strong> Scans all project images every 45 seconds across the entire site</li>
              <li>• <strong>Smart Detection:</strong> Identifies missing captions, generic text, and poor quality descriptions</li>
              <li>• <strong>Auto-fix Priority:</strong> Automatically fixes high-priority issues (missing captions, very short text)</li>
              <li>• <strong>Intelligent Processing:</strong> Processes up to 2 fixes per scan cycle to avoid overwhelming systems</li>
              <li>• <strong>Persistent Changes:</strong> All updates are saved permanently and visible immediately</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GlobalCaptions;


import React from 'react';
import { useDevMode } from '@/context/DevModeContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AutoCaptionScanner from '@/components/captions/AutoCaptionScanner';
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
              Automated Caption Monitor
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Continuous monitoring system that automatically scans your portfolio for images with missing, 
              poor quality, or outdated captions. Get real-time alerts and auto-fix suggestions.
            </p>
          </div>
          
          <AutoCaptionScanner />
          
          <div className="mt-12 p-6 bg-blue-50 rounded-lg">
            <h2 className="font-semibold text-blue-900 mb-3">How the monitor works:</h2>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• <strong>Continuous Scanning:</strong> Automatically checks all project images every 30 seconds</li>
              <li>• <strong>Smart Detection:</strong> Identifies missing captions, generic placeholders, and poor quality descriptions</li>
              <li>• <strong>Priority Classification:</strong> Ranks issues by importance (High: missing captions, Medium: generic text, Low: minor improvements)</li>
              <li>• <strong>Auto-fix Capability:</strong> Select issues and let AI generate quality captions automatically</li>
              <li>• <strong>Real-time Alerts:</strong> Get notified when new caption issues are detected</li>
              <li>• <strong>Progress Tracking:</strong> Monitor caption quality improvements over time</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GlobalCaptions;

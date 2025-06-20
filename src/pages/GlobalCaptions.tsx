
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
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Background Caption Monitor
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Silent monitoring system running in the background. 
              Automatically scans for missing or poor quality captions and fixes them.
            </p>
          </div>
          
          {/* Status indicator */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-3"></div>
              <span className="text-green-800 font-medium">
                Background scanner active - monitoring portfolio for caption issues
              </span>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-6">
            <h2 className="font-semibold text-blue-900 mb-3">How it works:</h2>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• <strong>Silent Operation:</strong> Runs completely in the background without UI interference</li>
              <li>• <strong>Continuous Monitoring:</strong> Scans all project images every 30 seconds</li>
              <li>• <strong>Smart Detection:</strong> Identifies missing captions, generic text, and poor quality descriptions</li>
              <li>• <strong>Auto-fix Priority:</strong> Automatically fixes high-priority issues (missing captions, very short text)</li>
              <li>• <strong>Intelligent Throttling:</strong> Processes up to 3 fixes per scan cycle to avoid overwhelming systems</li>
              <li>• <strong>Real-time Updates:</strong> Changes are applied immediately and persist across sessions</li>
            </ul>
          </div>
        </div>
      </main>
      
      {/* The scanner component runs invisibly */}
      <AutoCaptionScanner />
      
      <Footer />
    </div>
  );
};

export default GlobalCaptions;

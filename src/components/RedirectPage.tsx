import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const RedirectPage = () => {
  useEffect(() => {
    // Redirect after 3 seconds
    const timer = setTimeout(() => {
      window.location.href = "http://barskyux.com";
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    window.location.href = "http://barskyux.com";
  };

  return (
    <>
      <Helmet>
        <title>Site is Being Reconstructed</title>
        <meta name="description" content="Site is currently being reconstructed. Redirecting to barskyux.com" />
        <meta httpEquiv="refresh" content="3;url=http://barskyux.com" />
      </Helmet>
      
      <div 
        className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center cursor-pointer"
        onClick={handleClick}
      >
        <div className="text-center space-y-8 p-8 max-w-md mx-auto">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-white">
              Site is Being Reconstructed
            </h1>
            <p className="text-lg text-gray-300">
              Redirecting you to our new site...
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
          
          <p className="text-sm text-gray-400">
            Click anywhere to go immediately
          </p>
        </div>
      </div>
    </>
  );
};

export default RedirectPage;
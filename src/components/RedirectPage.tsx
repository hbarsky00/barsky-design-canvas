import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
const RedirectPage = () => {
  useEffect(() => {
    // Redirect after 5 seconds
    const timer = setTimeout(() => {
      window.location.href = "http://barskyux.com";
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  const handleClick = () => {
    window.location.href = "http://barskyux.com";
  };
  return <>
      <Helmet>
        <title>Site is Being Reconstructed</title>
        <meta name="description" content="Site is currently being reconstructed. Redirecting to barskyux.com" />
        <meta httpEquiv="refresh" content="5;url=http://barskyux.com" />
        <style>{`
          .redirect-page * { color: rgb(255, 255, 255) !important; }
          .redirect-page h1 { color: rgb(255, 255, 255) !important; }
          .redirect-page p { color: rgb(255, 255, 255) !important; }
          .redirect-page div { color: rgb(255, 255, 255) !important; }
          .redirect-page span { color: rgb(255, 255, 255) !important; }
          .redirect-page > * { color: rgb(255, 255, 255) !important; }
          .redirect-page > * > * { color: rgb(255, 255, 255) !important; }
          .redirect-page > * > * > * { color: rgb(255, 255, 255) !important; }
          .redirect-page > * > * > * > * { color: rgb(255, 255, 255) !important; }
        `}</style>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center cursor-pointer redirect-page" onClick={handleClick}>
        <div className="text-center space-y-8 p-8 max-w-md mx-auto">
          <div className="space-y-4">
            <h1 className="font-bold text-2xl">My Site Barsky Design is down due to problems with Lovable UI the AI is not meant to build a portfolio site. I will be redirecting you to my other site http://barskyux.com</h1>
            
          </div>
          
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
          
          <p className="text-sm text-slate-50">
            Click anywhere to go to the updated Barsky Design Site
          </p>
        </div>
      </div>
    </>;
};
export default RedirectPage;
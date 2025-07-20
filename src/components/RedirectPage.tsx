
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const RedirectPage = () => {
  useEffect(() => {
    // Immediate redirect
    window.location.replace("http://barskyux.com");
  }, []);

  // This content should never be seen due to immediate redirects
  return (
    <>
      <Helmet>
        <title>Redirecting...</title>
        <meta httpEquiv="refresh" content="0;url=http://barskyux.com" />
      </Helmet>
      
      <div style={{ display: 'none' }}>
        Redirecting to barskyux.com...
      </div>
    </>
  );
};

export default RedirectPage;

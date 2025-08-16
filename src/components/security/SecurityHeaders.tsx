
import React from 'react';
import { Helmet } from 'react-helmet-async';

// Lightweight security headers via meta tags (CSP is effective via meta).
// Note: Some headers (e.g., HSTS, X-Content-Type-Options) are best set at the server level.
const SecurityHeaders: React.FC = () => {
  const supabaseUrl = 'https://ctqttomppgkjbjkckise.supabase.co';

  // A conservative CSP that should work with this app.
  // If something breaks, we can relax specific directives without removing the policy.
  const csp = [
    "default-src 'self' https:",
    "script-src 'self' https:",
    "style-src 'self' 'unsafe-inline' https:",
    "img-src 'self' https: data: blob:",
    `connect-src 'self' https: ${supabaseUrl} https://*.supabase.co`,
    "font-src 'self' https: data:",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join('; ');

  return (
    <Helmet>
      <meta httpEquiv="Content-Security-Policy" content={csp} />
      <meta name="referrer" content="no-referrer-when-downgrade" />
      <meta httpEquiv="Permissions-Policy" content="geolocation=(), microphone=(), camera=()" />
    </Helmet>
  );
};

export default SecurityHeaders;

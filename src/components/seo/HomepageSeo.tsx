
import React from "react";
import { Helmet } from "react-helmet-async";

const HomepageSeo: React.FC = () => {
  return (
    <Helmet>
      <title>Barsky Design - UX Research & Design Agency</title>
      <meta name="description" content="Professional UX research and design agency helping businesses improve digital product experiences through user-centered design solutions." />
      <meta name="keywords" content="Barsky Design, UX research agency, design agency, user experience design, UX research, design strategy, digital product design, user research, design thinking, UX consulting" />
      <meta name="author" content="Barsky Design - UX Research & Design Agency" />
      <meta property="og:title" content="Barsky Design - UX Research & Design Agency" />
      <meta property="og:description" content="Professional UX research and design agency improving digital product experiences through user-centered design solutions." />
      <meta property="og:image" content="https://barskydesign.pro/lovable-uploads/e8d40a32-b582-44f6-b417-48bdd5c5b6eb.png" />
      <meta property="og:url" content="https://barskydesign.pro/" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Barsky Design - UX Research & Design Agency" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@barskydesign" />
      <meta name="twitter:title" content="Barsky Design - UX Research & Design Agency" />
      <meta name="twitter:description" content="Professional UX research and design agency improving digital product experiences through user-centered design solutions." />
      <meta name="twitter:image" content="https://barskydesign.pro/lovable-uploads/e8d40a32-b582-44f6-b417-48bdd5c5b6eb.png" />
      <link rel="canonical" href="https://barskydesign.pro/" />
    </Helmet>
  );
};

export default HomepageSeo;

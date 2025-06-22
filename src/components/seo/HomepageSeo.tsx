
import React from "react";
import { Helmet } from "react-helmet-async";

const HomepageSeo: React.FC = () => {
  return (
    <Helmet>
      <title>Barsky Design - UX/UI Designer & Frontend Developer | User-Centered Digital Experiences</title>
      <meta name="description" content="Barsky Design is a UX/UI Designer & Frontend Developer creating user-centered digital experiences through user research, wireframing, prototyping, and responsive frontend development." />
      <meta name="keywords" content="Barsky Design, UX/UI Designer, Frontend Developer, User Research, Wireframing, Prototyping, Visual Design, Figma, React, TypeScript, Responsive Design, Design Systems, Usability Testing" />
      <meta name="author" content="Barsky Design" />
      <meta property="og:title" content="Barsky Design - UX/UI Designer & Frontend Developer" />
      <meta property="og:description" content="Creating User-Centered Digital Experiences through user research, wireframing, prototyping, and responsive frontend development." />
      <meta property="og:image" content="https://barskydesign.pro/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png" />
      <meta property="og:url" content="https://barskydesign.pro/" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Barsky Design - UX/UI Designer & Frontend Developer" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@barskydesign" />
      <meta name="twitter:title" content="Barsky Design - UX/UI Designer & Frontend Developer" />
      <meta name="twitter:description" content="Creating User-Centered Digital Experiences through user research, wireframing, prototyping, and responsive frontend development." />
      <meta name="twitter:image" content="https://barskydesign.pro/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png" />
      <link rel="canonical" href="https://barskydesign.pro/" />
    </Helmet>
  );
};

export default HomepageSeo;

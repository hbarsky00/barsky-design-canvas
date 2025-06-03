
import React from "react";
import { Helmet } from "react-helmet-async";

const HomepageSeo: React.FC = () => {
  return (
    <Helmet>
      <title>Hiram Barsky - UX/UI Designer & Frontend Developer | User-Centered Digital Experiences</title>
      <meta name="description" content="Hiram Barsky is a UX/UI Designer & Frontend Developer creating user-centered digital experiences through user research, wireframing, prototyping, and responsive frontend development." />
      <meta name="keywords" content="Hiram Barsky, UX/UI Designer, Frontend Developer, User Research, Wireframing, Prototyping, Visual Design, Figma, React, TypeScript, Responsive Design, Design Systems, Usability Testing" />
      <meta name="author" content="Hiram Barsky" />
      <meta property="og:title" content="Hiram Barsky - UX/UI Designer & Frontend Developer" />
      <meta property="og:description" content="Creating User-Centered Digital Experiences through user research, wireframing, prototyping, and responsive frontend development." />
      <meta property="og:image" content="https://barskydesign.pro/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png" />
      <meta property="og:url" content="https://barskydesign.pro/" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Hiram Barsky - UX/UI Designer & Frontend Developer" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@hirambarsky" />
      <meta name="twitter:title" content="Hiram Barsky - UX/UI Designer & Frontend Developer" />
      <meta name="twitter:description" content="Creating User-Centered Digital Experiences through user research, wireframing, prototyping, and responsive frontend development." />
      <meta name="twitter:image" content="https://barskydesign.pro/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png" />
      <link rel="canonical" href="https://barskydesign.pro/" />
    </Helmet>
  );
};

export default HomepageSeo;

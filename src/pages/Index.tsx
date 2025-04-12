
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    // If there's a scrollTo in the state, scroll to that section
    if (location.state && location.state.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.state]);

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Hiram Barsky | UX/UI Designer & Web Developer | Portfolio</title>
        <meta name="description" content="Experienced UX/UI designer and web developer specializing in website design, app design, and UX/UI consultation services. Based in New York." />
        <meta name="keywords" content="UI design, UX design, web development, website design, app design, mobile app, UX/UI consultation, product designer, design systems, user research, New York designer" />
        <link rel="canonical" href="https://barskydesign.com/" />
      </Helmet>
      
      <Header />
      <main className="flex-grow">
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;


import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactInformation from '@/components/contact/ContactInformation';
import ContactForm from '@/components/contact/ContactForm';
import EnhancedGlobalSeo from '@/components/seo/EnhancedGlobalSeo';

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <EnhancedGlobalSeo 
        title="Contact Hiram Barsky | AI-Fluent UX Designer | Accessibility & Conversion Specialist"
        description="Get in touch with Hiram Barsky for AI-enhanced UX design, WCAG accessibility compliance, and conversion-focused design services. Specializing in cross-functional collaboration and business-outcome driven design solutions."
        canonicalUrl="https://barskydesign.pro/contact"
        pageType="content"
        keywords={[
          "contact AI-fluent UX designer", "hire accessibility specialist", "WCAG compliance consultant",
          "conversion optimization designer", "AI-enhanced design services", "cross-functional UX collaboration",
          "business-focused design consultant", "Claude AI design expert", "T-shaped designer hire"
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Hiram Barsky - AI-Enhanced UX Design Services",
          "description": "Contact page for AI-enhanced UX design, accessibility compliance, and conversion optimization services",
          "url": "https://barskydesign.pro/contact",
          "mainEntity": {
            "@type": "Person",
            "name": "Hiram Barsky",
            "jobTitle": "AI-Fluent UX Designer & Accessibility Specialist",
            "email": "hbarsky01@gmail.com",
            "telephone": "+1-201-668-4754",
            "url": "https://barskydesign.pro",
            "knowsAbout": [
              "AI-Enhanced UX Design",
              "WCAG Accessibility Compliance", 
              "Conversion Optimization",
              "Cross-Functional Collaboration",
              "Claude AI",
              "Figma AI",
              "Business-Focused Design"
            ]
          }
        }}
      />
      
      <Header />
      <main className="flex-grow pt-24">
        <section className="py-20 dark:bg-gray-900">
          <div className="section-container">
            <h1 className="section-title mb-16">Get In Touch</h1>
            
            <div className="grid md:grid-cols-2 gap-12">
              <ContactInformation />
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

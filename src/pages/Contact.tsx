
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactInformation from '@/components/contact/ContactInformation';
import ContactForm from '@/components/contact/ContactForm';

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Contact Hiram Barsky | Professional UX/UI Designer & Developer | Get a Quote</title>
        <meta name="description" content="Contact Hiram Barsky for your UX/UI design and development needs. Professional product designer available for freelance projects. Get a quote for mobile app design, web development, and design consultation." />
        <meta name="keywords" content="contact designer, hire UX designer, freelance UI designer, design consultation, mobile app designer contact, web development quote, Hiram Barsky contact" />
        <link rel="canonical" href="https://barskydesign.pro/contact" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Contact Hiram Barsky | Professional UX/UI Designer" />
        <meta property="og:description" content="Get in touch with Hiram Barsky for professional UX/UI design and development services. Available for freelance projects and design consultation." />
        <meta property="og:url" content="https://barskydesign.pro/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://barskydesign.pro/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Hiram Barsky | Professional UX/UI Designer" />
        <meta name="twitter:description" content="Get in touch for professional UX/UI design and development services." />
        <meta name="twitter:image" content="https://barskydesign.pro/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ContactPage",
              "name": "Contact Hiram Barsky",
              "description": "Contact page for professional UX/UI design and development services",
              "url": "https://barskydesign.pro/contact",
              "mainEntity": {
                "@type": "Person",
                "name": "Hiram Barsky",
                "jobTitle": "UX/UI Designer & Frontend Developer",
                "email": "hbarsky01@gmail.com",
                "telephone": "+1-201-668-4754",
                "url": "https://barskydesign.pro"
              }
            }
          `}
        </script>
      </Helmet>
      
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

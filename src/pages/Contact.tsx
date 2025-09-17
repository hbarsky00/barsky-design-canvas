
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactInformation from '@/components/contact/ContactInformation';
import ContactForm from '@/components/contact/ContactForm';
import BlogPreview from '@/components/blog/BlogPreview';

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <section className="py-12 dark:bg-gray-900">
          <div className="px-0 md:px-6 lg:px-10 max-w-6xl mx-auto">
            <h1 className="section-title mb-16 px-4 md:px-0">Get In Touch</h1>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="px-4 md:px-0">
                <ContactInformation />
              </div>
              <div className="px-4 md:px-0">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
        
        <BlogPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

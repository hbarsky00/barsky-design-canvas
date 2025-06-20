
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
          <p className="text-center text-gray-600">Get in touch with us for your design needs.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

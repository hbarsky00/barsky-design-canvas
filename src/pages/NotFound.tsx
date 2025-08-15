import React from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NotFound = () => {
  return (
    <>
      <SEO
        title="404 Not Found"
        description="Page not found - Barsky Design"
        image="/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png"
        type="website"
      />
      
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        
        <main className="flex-grow flex items-center justify-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <p className="text-2xl text-gray-600 mb-8">
              Oops! The page you're looking for could not be found.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Link to="/" className="text-blue-500 hover:text-blue-700 flex items-center">
                <Home className="mr-2 h-5 w-5" />
                Back to Home
              </Link>
              <Link to="/projects" className="text-blue-500 hover:text-blue-700 flex items-center">
                <ArrowLeft className="mr-2 h-5 w-5" />
                View Projects
              </Link>
              <Link to="/services" className="text-blue-500 hover:text-blue-700 flex items-center">
                <Search className="mr-2 h-5 w-5" />
                Explore Services
              </Link>
            </div>
          </motion.div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default NotFound;

import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import BackButton from "@/components/ui/BackButton";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet defer={false}>
        <title>Page Not Found — Hiram Barsky</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Header />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <main className="pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              404 - Page Not Found
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              The page you are looking for does not exist or has been moved.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <BackButton to="/" label="Back to Home" />
              <Button asChild variant="outline">
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Link>
              </Button>
            </div>
          </motion.div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default NotFound;

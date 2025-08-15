import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import SEO from "@/components/seo/SEO";

const NotFound: React.FC = () => {
  return (
    <>
      <SEO
        title="404 Not Found"
        description="Page not found - Barsky Design"
        url="https://barskydesign.pro/404/"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center justify-center h-screen bg-gray-50"
      >
        <div className="text-center">
          <h1 className="text-9xl font-bold text-red-500">404</h1>
          <p className="text-3xl font-semibold text-gray-800 mb-8">
            Page Not Found
          </p>
          <p className="text-gray-600 mb-8">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="space-x-4">
            <Link to="/">
              <Button variant="outline" size="lg">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>
            </Link>
            <Button variant="secondary" size="lg" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default NotFound;

import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
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
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {/* Both buttons used to point at "/" — the second one said
                  "Go Back" but went home, same as the first. */}
              <Button variant="outline" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>

              <Button asChild>
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>

            <p className="mt-8 text-sm text-gray-500">
              Looking for my work?{" "}
              <Link to="/#case-studies" className="text-primary hover:underline">
                Browse the case studies
              </Link>{" "}
              or{" "}
              <Link to="/contact" className="text-primary hover:underline">
                get in touch
              </Link>
              .
            </p>
          </motion.div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default NotFound;

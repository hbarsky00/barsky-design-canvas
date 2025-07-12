import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Sparkles } from "lucide-react";
import { useEffect } from "react";
import DynamicSeo from "@/components/seo/DynamicSeo";

const NotFound: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <DynamicSeo 
        type="page"
        title="Page Not Found | Hiram Barsky"
        description="Sorry, the page you're looking for doesn't exist. Return to Hiram Barsky's UX design portfolio for AI-enhanced design services."
        path="/404"
      />
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 flex items-center justify-center overflow-hidden relative">
        {/* Floating clouds */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-12 bg-white/30 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Floating sparkles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
          </motion.div>
        ))}

        <div className="text-center z-10 relative">
          {/* Flying Unicorn */}
          <motion.div
            className="text-8xl mb-8"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            🦄
          </motion.div>

          {/* Rainbow trail */}
          <motion.div
            className="absolute top-16 left-1/2 transform -translate-x-1/2 text-6xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.5,
            }}
          >
            🌈
          </motion.div>

          {/* 404 Number */}
          <motion.h1
            className="text-9xl font-bold text-white mb-4 drop-shadow-lg"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            404
          </motion.h1>

          {/* Main Message */}
          <motion.div
            className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-white/30"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Sorry, we're not in the house right now!
            </motion.h2>
            
            <motion.p
              className="text-xl text-white/90 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Our magical unicorn couldn't find this page! ✨
            </motion.p>

            {/* Go Back Home Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-xl shadow-xl transition-all duration-300 transform hover:shadow-2xl"
              >
                <Home className="w-6 h-6" />
                GO BACK HOME!
              </Link>
            </motion.div>
          </motion.div>

          {/* Additional fun text */}
          <motion.p
            className="text-white/80 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Follow the rainbow trail back to safety! 🌈
          </motion.p>
        </div>

        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </>
  );
};

export default NotFound;

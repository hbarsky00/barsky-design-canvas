
import React from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useProjectPageDetection } from "@/hooks/useProjectPageDetection";

const FloatingEmailButton: React.FC = () => {
  const isProjectPage = useProjectPageDetection();

  // Only show on project pages
  if (!isProjectPage) return null;

  const handleEmailClick = () => {
    console.log("🔍 FloatingEmailButton: Button clicked!");
    const subject = encodeURIComponent("I'm here to Contact Hiram Barsky for Work");
    const mailtoUrl = `mailto:hbarsky01@gmail.com?subject=${subject}`;
    console.log("📧 FloatingEmailButton: Opening email with URL:", mailtoUrl);
    window.location.href = mailtoUrl;
  };

  return (
    <motion.button
      onClick={handleEmailClick}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ 
        duration: 0.3, 
        delay: 0.5
      }}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.2 }
      }}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 flex items-center justify-center"
      aria-label="Contact Hiram Barsky via email"
    >
      <Mail className="w-5 h-5 text-white" />
    </motion.button>
  );
};

export default FloatingEmailButton;

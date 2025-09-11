import React from 'react';
import { Coffee } from 'lucide-react';
import { motion } from 'framer-motion';

const BuyMeCoffeeButton: React.FC = () => {
  return (
    <motion.a
      href="https://buy.stripe.com/dRm14n2dl2xF7bG8O8dUY01"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 px-4 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Coffee 
        size={20} 
        className="group-hover:animate-pulse" 
      />
      <span className="text-sm font-semibold">Buy Me a Coffee</span>
    </motion.a>
  );
};

export default BuyMeCoffeeButton;

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Check, Clock } from 'lucide-react';

interface SaveIndicatorProps {
  isSaving: boolean;
  lastSaved: Date | null;
}

const SaveIndicator: React.FC<SaveIndicatorProps> = ({ isSaving, lastSaved }) => {
  const formatLastSaved = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleTimeString();
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <AnimatePresence mode="wait">
        {isSaving && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Save className="h-4 w-4" />
            </motion.div>
            <span className="text-sm font-medium">Saving...</span>
          </motion.div>
        )}
        
        {!isSaving && lastSaved && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm"
          >
            <Check className="h-4 w-4" />
            <span className="text-sm font-medium">
              Saved {formatLastSaved(lastSaved)}
            </span>
          </motion.div>
        )}
        
        {!isSaving && !lastSaved && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm"
          >
            <Clock className="h-4 w-4" />
            <span className="text-sm text-gray-200">No changes yet</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SaveIndicator;

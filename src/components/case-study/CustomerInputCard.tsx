import React from "react";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

interface CustomerInputCardProps {
  quote: string;
  author?: string;
  context?: string;
  className?: string;
}

const CustomerInputCard: React.FC<CustomerInputCardProps> = ({
  quote,
  author,
  context,
  className = ""
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`relative bg-gradient-to-br from-primary/5 via-primary/10 to-accent/5 rounded-xl p-6 border-2 border-primary/20 shadow-sm ${className}`}
    >
      <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
        <MessageSquare className="w-5 h-5 text-primary" />
      </div>
      
      <div className="pl-14">
        <blockquote className="text-base md:text-lg text-foreground leading-relaxed italic mb-3">
          "{quote}"
        </blockquote>
        
        {(author || context) && (
          <div className="flex flex-col gap-1 pt-3 border-t border-primary/10">
            {author && (
              <p className="text-sm font-semibold text-foreground">{author}</p>
            )}
            {context && (
              <p className="text-xs text-muted-foreground">{context}</p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CustomerInputCard;

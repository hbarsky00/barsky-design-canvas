import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface AITool {
  name: string;
  purpose: string;
  impact?: string;
}

interface AIToolStackSidebarProps {
  title: string;
  tools: AITool[];
}

const AIToolStackSidebar: React.FC<AIToolStackSidebarProps> = ({
  title,
  tools
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="my-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200"
    >
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
      </div>
      
      <div className="space-y-3">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 border border-purple-100 hover:border-purple-300 transition-colors"
          >
            <p className="font-semibold text-purple-900 mb-1">{tool.name}</p>
            <p className="text-sm text-muted-foreground mb-2">{tool.purpose}</p>
            {tool.impact && (
              <p className="text-sm font-medium text-purple-700 bg-purple-100 rounded px-2 py-1 inline-block">
                {tool.impact}
              </p>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AIToolStackSidebar;

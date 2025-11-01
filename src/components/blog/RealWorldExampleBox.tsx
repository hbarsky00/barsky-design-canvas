import React from "react";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

interface RealWorldExampleBoxProps {
  projectName: string;
  situation: string;
  action: string;
  result: string;
  metrics?: string;
}

const RealWorldExampleBox: React.FC<RealWorldExampleBoxProps> = ({
  projectName,
  situation,
  action,
  result,
  metrics
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="my-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-l-4 border-amber-500"
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground mb-1">Real-World Example</h3>
          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
            {projectName}
          </span>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm font-semibold text-amber-800 mb-1">Situation</p>
          <p className="text-on-surface leading-relaxed">{situation}</p>
        </div>
        
        <div>
          <p className="text-sm font-semibold text-amber-800 mb-1">Action</p>
          <p className="text-on-surface leading-relaxed">{action}</p>
        </div>
        
        <div>
          <p className="text-sm font-semibold text-amber-800 mb-1">Result</p>
          <p className="text-on-surface leading-relaxed">{result}</p>
        </div>
        
        {metrics && (
          <div className="pt-3 border-t border-amber-200">
            <p className="text-xl font-bold text-amber-700">{metrics}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RealWorldExampleBox;

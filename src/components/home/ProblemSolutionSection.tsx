import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Zap, Target, BarChart3 } from "lucide-react";

const ProblemSolutionSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Most UX Designers Guess. I Use AI to Know.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stop relying on assumptions. Start making data-driven design decisions that deliver guaranteed results.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card p-8 lg:p-12 mb-16"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Traditional UX Column */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <XCircle className="h-6 w-6 text-red-500" />
                <h3 className="text-2xl font-bold text-gray-900">Traditional UX</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">6+ months timeline</p>
                    <p className="text-gray-600 text-sm">Slow research and iteration cycles</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">Uncertain results</p>
                    <p className="text-gray-600 text-sm">No guarantee of conversion improvement</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">Generic solutions</p>
                    <p className="text-gray-600 text-sm">One-size-fits-all approaches</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">Manual research</p>
                    <p className="text-gray-600 text-sm">Limited sample sizes and insights</p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI-Enhanced UX Column */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <h3 className="text-2xl font-bold text-gray-900">AI-Enhanced UX</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">3-12 weeks delivery</p>
                    <p className="text-gray-600 text-sm">AI-accelerated research and design</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">Guaranteed 40% improvement</p>
                    <p className="text-gray-600 text-sm">Measurable conversion rate increases</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">Data-driven decisions</p>
                    <p className="text-gray-600 text-sm">Personalized for your specific users</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">AI-powered insights</p>
                    <p className="text-gray-600 text-sm">Analyze 10,000+ user behaviors instantly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI Process Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            The difference? While others conduct manual research, I use ChatGPT and Claude AI to:
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 text-center">
              <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Analyze 10,000+ Behaviors</h4>
              <p className="text-gray-600 text-sm">In hours, not months</p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <Target className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Identify Conversion Blockers</h4>
              <p className="text-gray-600 text-sm">Before they impact revenue</p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <Zap className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Create Personalized Experiences</h4>
              <p className="text-gray-600 text-sm">That adapt in real-time</p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <CheckCircle className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Deliver Measurable Results</h4>
              <p className="text-gray-600 text-sm">Not just pretty designs</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
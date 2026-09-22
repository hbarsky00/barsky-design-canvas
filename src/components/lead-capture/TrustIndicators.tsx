
import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle, Users, TrendingUp } from 'lucide-react';

const TrustIndicators: React.FC = () => {
  const testimonials = [
    {
      quote: "Increased our conversion rate by 67% in just 3 weeks.",
      author: "Sarah Chen",
      role: "CEO, TechStart"
    },
    {
      quote: "The audit identified issues we never would have found ourselves.",
      author: "Michael Rodriguez", 
      role: "Marketing Director, GrowthCo"
    }
  ];

  const stats = [
    { icon: Users, value: "47+", label: "Successful Projects" },
    { icon: TrendingUp, value: "40%", label: "Avg. Conversion Lift" },
    { icon: CheckCircle, value: "24hr", label: "Response Time" }
  ];

  return (
    <div className="space-y-8">
      {/* Social Proof Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-2xl p-6 shadow-lg"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">
          Proven Results
        </h3>
        
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <Icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Testimonials */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-4"
      >
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
            <div>
              <div className="font-semibold text-gray-900">{testimonial.author}</div>
              <div className="text-sm text-gray-600">{testimonial.role}</div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Trust Badges */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-gray-50 rounded-lg p-6 text-center"
      >
        <h4 className="font-semibold text-gray-900 mb-4">Why Trust This Audit?</h4>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>15+ years UX experience</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>AI-enhanced analysis</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>No obligations attached</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TrustIndicators;

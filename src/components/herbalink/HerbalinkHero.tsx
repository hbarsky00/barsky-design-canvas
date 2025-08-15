
import React from "react";
import { motion } from "framer-motion";
import { Leaf, Users, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ProjectLinks from "@/components/project/ProjectLinks";

const HerbalinkHero: React.FC = () => {
  return (
    <div className="text-center space-y-8">
      {/* Hero Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Badge variant="secondary" className="px-4 py-2 text-sm">
          <Leaf className="w-4 h-4 mr-2" />
          Healthcare Marketplace • Trust Platform
        </Badge>
      </motion.div>

      {/* Main Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          3x More Bookings: How I Connected Users to{" "}
          <span className="text-emerald-600">Certified Herbalists</span>
        </h1>
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
      >
        Connected users to certified herbalists across the country and increased booking rates by 3x 
        through verified credentials and streamlined user experience.
      </motion.p>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
      >
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border">
          <Users className="w-8 h-8 text-emerald-600 mb-3" />
          <div className="text-3xl font-bold text-gray-900">3x</div>
          <div className="text-sm text-gray-600">Booking Rate Increase</div>
        </div>
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border">
          <Shield className="w-8 h-8 text-emerald-600 mb-3" />
          <div className="text-3xl font-bold text-gray-900">80%</div>
          <div className="text-sm text-gray-600">User Trust Rating</div>
        </div>
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border">
          <Leaf className="w-8 h-8 text-emerald-600 mb-3" />
          <div className="text-3xl font-bold text-gray-900">400%</div>
          <div className="text-sm text-gray-600">Practitioner Growth</div>
        </div>
      </motion.div>

      {/* Project Link */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <ProjectLinks projectLink="https://herbalink.live" />
      </motion.div>
    </div>
  );
};

export default HerbalinkHero;

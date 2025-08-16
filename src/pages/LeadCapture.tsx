import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Star, Clock, Users, TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const LeadCapture: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!name || !email || !message) {
      toast.error("Please fill in all fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("lead_capture")
        .insert([
          {
            name: name,
            email: email,
            message: message,
            source: "Lead Capture Form",
          },
        ])
        .single();

      if (error) {
        console.error("Error submitting lead capture:", error);
        toast.error("Failed to submit. Please try again.");
      } else {
        toast.success("Thank you! We'll be in touch soon.");
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />

        <main className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto px-6 lg:px-8"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left Side: Content */}
                <div className="p-12 lg:p-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Unlock Your Business Potential
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-8">
                    Ready to take your business to the next level? Fill out the
                    form below to connect with our expert team and discover
                    tailored solutions for your unique needs.
                  </p>

                  <ul className="space-y-4">
                    <li className="flex items-center text-gray-600">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                      Personalized Consultation
                    </li>
                    <li className="flex items-center text-gray-600">
                      <Star className="w-5 h-5 mr-2 text-yellow-500" />
                      Expert Recommendations
                    </li>
                    <li className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 mr-2 text-blue-500" />
                      Fast & Efficient Service
                    </li>
                    <li className="flex items-center text-gray-600">
                      <Users className="w-5 h-5 mr-2 text-purple-500" />
                      Dedicated Support
                    </li>
                    <li className="flex items-center text-gray-600">
                      <TrendingUp className="w-5 h-5 mr-2 text-orange-500" />
                      Proven Results
                    </li>
                  </ul>
                </div>

                {/* Right Side: Form */}
                <div className="bg-gray-50 p-12 lg:p-16">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <div className="mt-1">
                        <Input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your Name"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <div className="mt-1">
                        <Input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your Email"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Message
                      </label>
                      <div className="mt-1">
                        <Textarea
                          id="message"
                          rows={4}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="How can we help you?"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div>
                      <Button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Get in Touch"}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default LeadCapture;

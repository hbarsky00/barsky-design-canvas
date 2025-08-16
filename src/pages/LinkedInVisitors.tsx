import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Star, Clock, Users, TrendingUp, Eye, Zap, Target } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const LinkedInVisitors: React.FC = () => {
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

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("linkedin_lead_capture")
        .insert([
          {
            name,
            email,
            message,
          },
        ]);

      if (error) {
        console.error("Supabase error:", error);
        toast.error("Failed to submit the form. Please try again.");
      } else {
        toast.success("Form submitted successfully!");
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />

        <main className="pt-24 pb-16">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto px-6 lg:px-8"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="px-6 py-12 lg:px-12">
                <header className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Unlock Exclusive Insights
                  </h1>
                  <p className="text-lg text-gray-600">
                    Share your details to receive personalized content and
                    connect with me on LinkedIn.
                  </p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
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
                      Email Address
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
                      Message (Optional)
                    </label>
                    <div className="mt-1">
                      <Textarea
                        id="message"
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="How can I help you?"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {isSubmitting ? (
                        <>
                          Submitting...
                          <Clock className="ml-2 h-5 w-5 animate-spin" />
                        </>
                      ) : (
                        "Submit & Connect"
                      )}
                    </Button>
                  </div>
                </form>

                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Why Connect?
                  </h3>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center text-gray-600">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                      Get exclusive content and insights
                    </li>
                    <li className="flex items-center text-gray-600">
                      <Star className="mr-2 h-5 w-5 text-yellow-500" />
                      Stay updated on the latest trends
                    </li>
                    <li className="flex items-center text-gray-600">
                      <TrendingUp className="mr-2 h-5 w-5 text-blue-500" />
                      Learn about new strategies and techniques
                    </li>
                    <li className="flex items-center text-gray-600">
                      <Users className="mr-2 h-5 w-5 text-purple-500" />
                      Expand your professional network
                    </li>
                    <li className="flex items-center text-gray-600">
                      <Eye className="mr-2 h-5 w-5 text-orange-500" />
                      See behind-the-scenes project insights
                    </li>
                    <li className="flex items-center text-gray-600">
                      <Zap className="mr-2 h-5 w-5 text-teal-500" />
                      Get quick answers to your burning questions
                    </li>
                    <li className="flex items-center text-gray-600">
                      <Target className="mr-2 h-5 w-5 text-red-500" />
                      Achieve your business goals faster
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default LinkedInVisitors;

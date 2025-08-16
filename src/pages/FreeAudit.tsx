import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Star, TrendingUp, Users, Zap, Shield, Target, BarChart3, Eye } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const FreeAudit: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!name || !email || !website || !message) {
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
        .from("free_audit_requests")
        .insert([
          {
            name,
            email,
            website,
            message,
            submitted_at: new Date().toISOString(),
          },
        ]);

      if (error) {
        console.error("Supabase error:", error);
        toast.error("Failed to submit request. Please try again.");
      } else {
        toast.success("Request submitted successfully!");
        setName("");
        setEmail("");
        setWebsite("");
        setMessage("");

        // Reset the form using the ref
        if (formRef.current) {
          formRef.current.reset();
        }
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("An unexpected error occurred. Please try again.");
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
            className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Get a Free Website Conversion Audit
              </h1>
              <p className="text-lg text-gray-600">
                Let us analyze your website and provide actionable insights to
                improve conversions and user experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Benefits Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 h-6 w-6" />
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Why Get an Audit?
                  </h2>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <Star className="text-yellow-500 h-5 w-5 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Identify Conversion Opportunities
                        </h3>
                        <p className="text-gray-600">
                          Uncover hidden opportunities to turn more visitors into
                          customers.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <TrendingUp className="text-blue-500 h-5 w-5 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Improve User Experience
                        </h3>
                        <p className="text-gray-600">
                          Enhance your website's usability for a smoother user
                          journey.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Users className="text-purple-500 h-5 w-5 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Understand User Behavior
                        </h3>
                        <p className="text-gray-600">
                          Gain insights into how users interact with your site.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Zap className="text-orange-500 h-5 w-5 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Boost Website Performance
                        </h3>
                        <p className="text-gray-600">
                          Optimize your site for speed and efficiency.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Shield className="text-indigo-500 h-5 w-5 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Ensure Security and Compliance
                        </h3>
                        <p className="text-gray-600">
                          Protect your website and user data.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Form Section */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Request Your Free Audit
                </h2>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Your Name
                    </label>
                    <Input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>
                    <Input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="website"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Website URL
                    </label>
                    <Input
                      type="url"
                      id="website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Tell us about your website and goals
                    </label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Request Free Audit"}
                  </Button>
                </form>
              </div>
            </div>

            {/* What We Analyze Section */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                What We Analyze
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <Target className="text-blue-500 h-8 w-8 mx-auto mb-2" />
                  <h3 className="font-medium text-gray-900">
                    Goal Alignment
                  </h3>
                  <p className="text-gray-600">
                    Ensuring your website aligns with your business objectives.
                  </p>
                </div>
                <div className="text-center">
                  <BarChart3 className="text-green-500 h-8 w-8 mx-auto mb-2" />
                  <h3 className="font-medium text-gray-900">
                    Conversion Funnels
                  </h3>
                  <p className="text-gray-600">
                    Analyzing the steps users take to complete a desired action.
                  </p>
                </div>
                <div className="text-center">
                  <Eye className="text-purple-500 h-8 w-8 mx-auto mb-2" />
                  <h3 className="font-medium text-gray-900">
                    User Experience (UX)
                  </h3>
                  <p className="text-gray-600">
                    Evaluating the ease and enjoyment of using your website.
                  </p>
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

export default FreeAudit;

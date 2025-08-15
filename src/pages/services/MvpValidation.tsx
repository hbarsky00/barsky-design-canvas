import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Lightbulb, Users, Target } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/seo/SEO";

const MVPValidationPage: React.FC = () => {
  return (
    <>
      <SEO
        title="MVP Validation Services | Barsky Design"
        description="Validate your Minimum Viable Product with our expert MVP validation services. Ensure your product meets market needs and user expectations."
        url="https://barskydesign.pro/services/mvp-validation"
      />
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto py-12"
      >
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              MVP Validation Services
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Validate your Minimum Viable Product (MVP) with our expert
              services. We help you ensure your product meets market needs and
              user expectations.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="bg-gray-50 shadow-sm">
                <CardContent className="flex items-center space-x-4">
                  <CheckCircle className="text-green-500 h-6 w-6" />
                  <div>
                    <h3 className="text-lg font-semibold">Market Research</h3>
                    <p className="text-sm text-gray-500">
                      Understand your target audience and market landscape.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-50 shadow-sm">
                <CardContent className="flex items-center space-x-4">
                  <Lightbulb className="text-yellow-500 h-6 w-6" />
                  <div>
                    <h3 className="text-lg font-semibold">
                      User Feedback Analysis
                    </h3>
                    <p className="text-sm text-gray-500">
                      Gather and analyze user feedback to improve your product.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-50 shadow-sm">
                <CardContent className="flex items-center space-x-4">
                  <Users className="text-blue-500 h-6 w-6" />
                  <div>
                    <h3 className="text-lg font-semibold">Usability Testing</h3>
                    <p className="text-sm text-gray-500">
                      Test your product's usability with real users.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-50 shadow-sm">
                <CardContent className="flex items-center space-x-4">
                  <Target className="text-red-500 h-6 w-6" />
                  <div>
                    <h3 className="text-lg font-semibold">
                      Goal-Oriented Validation
                    </h3>
                    <p className="text-sm text-gray-500">
                      Ensure your product aligns with your business goals.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Button>Get Started</Button>
          </CardContent>
        </Card>
      </motion.div>
      <Footer />
    </>
  );
};

export default MVPValidationPage;

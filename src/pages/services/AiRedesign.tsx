import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Zap, Target, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/seo/SEO";

const AiRedesign: React.FC = () => {
  return (
    <>
      <Header />
      <SEO
        title="AI-Powered Redesign Services | Barsky Design"
        description="Revolutionize your website with our AI-driven redesign services. Enhance UX, boost conversions, and stay ahead of the competition."
        keywords="AI redesign, website redesign, UX design, conversion optimization"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto py-12"
      >
        <section className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Revolutionize Your Website with AI-Powered Redesign
          </h1>
          <p className="text-gray-600">
            Unlock the potential of your online presence with intelligent,
            data-driven design solutions.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white shadow-md rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 text-green-500" />{" "}
                Data-Driven Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              Leverage AI analytics to understand user behavior and identify
              areas for improvement.
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="mr-2 text-yellow-500" /> Enhanced User
                Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              Create intuitive and engaging interfaces that keep visitors on
              your site longer.
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 text-blue-500" /> Conversion
                Optimization
              </CardTitle>
            </CardHeader>
            <CardContent>
              Turn more visitors into customers with strategically designed
              conversion paths.
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 text-purple-500" /> Competitive
                Advantage
              </CardTitle>
            </CardHeader>
            <CardContent>
              Stay ahead of the curve with a website that adapts to the latest
              design trends and technologies.
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 text-green-500" /> Personalized
                Experiences
              </CardTitle>
            </CardHeader>
            <CardContent>
              Tailor content and layouts to individual user preferences for
              maximum impact.
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="mr-2 text-yellow-500" /> Continuous Improvement
              </CardTitle>
            </CardHeader>
            <CardContent>
              AI algorithms continuously refine your website design based on
              real-time performance data.
            </CardContent>
          </Card>
        </section>

        <section className="text-center mt-8">
          <Button variant="secondary" size="lg">
            Get a Free AI Redesign Consultation
          </Button>
        </section>
      </motion.div>
      <Footer />
    </>
  );
};

export default AiRedesign;

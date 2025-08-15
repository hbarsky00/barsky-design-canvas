import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, TrendingUp, Target, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/seo/SEO";

const LinkedInVisitors: React.FC = () => {
  return (
    <>
      <SEO
        title="LinkedIn Visitors"
        description="Analyze LinkedIn visitor data to improve your profile and network."
        url="https://barskydesign.pro/linkedin-visitors/"
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
            <CardTitle className="text-2xl">
              Unlock Insights from Your LinkedIn Visitors
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <p>
              Understand who is visiting your LinkedIn profile and tailor your
              content to attract the right audience.
            </p>
            <ul className="list-none pl-0 grid gap-2">
              <li className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                Identify key demographics
              </li>
              <li className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                Track visitor trends over time
              </li>
              <li className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                Optimize your profile for better engagement
              </li>
            </ul>
            <Button>
              Learn More <Zap className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <div className="max-w-3xl mx-auto mt-8 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Expand Your Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              Attract more connections by understanding who's looking at your
              profile.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Improve Your Reach
              </CardTitle>
            </CardHeader>
            <CardContent>
              Optimize your content to resonate with your target audience.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Target className="mr-2 h-5 w-5" />
                Targeted Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              Create content that speaks directly to the interests of your
              visitors.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Badge variant="secondary" className="mr-2">
                  Pro
                </Badge>
                Advanced Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              Unlock advanced features with a pro account for deeper insights.
            </CardContent>
          </Card>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default LinkedInVisitors;

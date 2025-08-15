import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Search, BarChart, Target } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/seo/SEO";

const ConversionAuditPage: React.FC = () => {
  return (
    <>
      <Header />
      <SEO
        title="Conversion Audit Services"
        description="Identify and fix conversion bottlenecks on your website."
        keywords="conversion audit, website optimization, UX audit"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto py-12"
      >
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Website Conversion Audit
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <p>
              Unlock the hidden potential of your website with our comprehensive
              conversion audit. We analyze user behavior, identify bottlenecks,
              and provide actionable insights to boost your conversion rates.
            </p>
            <ul className="list-none pl-0 grid gap-2">
              <li className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />{" "}
                In-depth analysis of user flow
              </li>
              <li className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />{" "}
                Identification of drop-off points
              </li>
              <li className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />{" "}
                Actionable recommendations for improvement
              </li>
            </ul>
            <Button>Get Your Free Audit</Button>
          </CardContent>
        </Card>
      </motion.div>

      <Footer />
    </>
  );
};

export default ConversionAuditPage;

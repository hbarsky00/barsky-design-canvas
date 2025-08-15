import React from 'react';
import StructuredCaseStudyLayout from '@/components/case-study/structured/StructuredCaseStudyLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const StructuredWholesaleDistributionCaseStudy: React.FC = () => {
  const seoProps = {
    title: 'Wholesale Distribution AI Solution - Supply Chain Case Study',
    description: 'UX design case study for an AI-powered wholesale distribution platform that optimizes supply chain management and inventory tracking.',
    image: '/lovable-uploads/c9e3f7a2-8b4d-4f1e-9c6a-3d8e2b5f1c7a.png',
    projectName: 'Wholesale Distribution AI Solution'
  };

  return (
    <StructuredCaseStudyLayout seo={seoProps}>
      <div className="container mx-auto mt-8 p-4 max-w-4xl">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              AI-Powered Wholesale Distribution Platform
            </CardTitle>
            <CardDescription className="text-gray-600">
              Optimizing supply chain management and inventory tracking with AI-driven
              insights.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <img
              src="/lovable-uploads/c9e3f7a2-8b4d-4f1e-9c6a-3d8e2b5f1c7a.png"
              alt="Wholesale Distribution AI Solution"
              className="w-full rounded-md mb-4"
            />
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge>AI</Badge>
              <Badge>Supply Chain</Badge>
              <Badge>Inventory Management</Badge>
              <Badge>UX Design</Badge>
            </div>
            <p className="text-gray-700">
              This case study explores the design and development of an AI-powered
              platform for wholesale distribution, aimed at improving efficiency and
              reducing costs.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Challenge</CardTitle>
            <CardDescription className="text-gray-600">
              Inefficient inventory management and lack of real-time insights.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              The client faced challenges in accurately forecasting demand, managing
              inventory levels, and optimizing distribution routes.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Solution</CardTitle>
            <CardDescription className="text-gray-600">
              Developed an AI-driven platform with predictive analytics.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              The solution included machine learning models for demand forecasting,
              real-time inventory tracking, and optimized routing algorithms.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Results</CardTitle>
            <CardDescription className="text-gray-600">
              Improved efficiency, reduced costs, and better decision-making.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Reduced inventory holding costs by 20%</li>
              <li>Improved order fulfillment rates by 15%</li>
              <li>Increased overall supply chain efficiency by 25%</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <p className="text-center text-gray-700">
              Explore more case studies and design solutions.
            </p>
            <Link to="/projects" className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
              View Projects
              <ArrowRight className="ml-2" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </StructuredCaseStudyLayout>
  );
};

export default StructuredWholesaleDistributionCaseStudy;

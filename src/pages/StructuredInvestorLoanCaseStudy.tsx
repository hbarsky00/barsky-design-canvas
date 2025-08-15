import React from 'react';
import StructuredCaseStudyLayout from '@/components/case-study/structured/StructuredCaseStudyLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

const StructuredInvestorLoanCaseStudy: React.FC = () => {
  const seoProps = {
    title: 'Investment Portfolio Management - FinTech Case Study',
    description: 'UX design case study for an investment portfolio management platform with advanced analytics and loan tracking capabilities.',
    image: '/lovable-uploads/b8f2e4d1-9c7a-4e6b-8f3d-2a5c1b7e9d4f.png',
    projectName: 'Investment Portfolio Management'
  };

  return (
    <StructuredCaseStudyLayout seo={seoProps}>
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">Investment Portfolio Management Platform</CardTitle>
              <CardDescription className="text-gray-600">Streamlining investment and loan tracking with advanced analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src="/lovable-uploads/b8f2e4d1-9c7a-4e6b-8f3d-2a5c1b7e9d4f.png"
                alt="Investment Portfolio Management Dashboard"
                className="w-full rounded-md shadow-lg"
              />
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Challenge</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    The challenge was to create a unified platform for managing investment portfolios and tracking loans, providing users with real-time analytics and insights.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Solution</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    We designed an intuitive dashboard that integrates investment tracking, loan management, and advanced analytics, enabling users to make informed decisions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Key Features</CardTitle>
              <CardDescription className="text-gray-600">Highlights of the investment portfolio management platform</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Real-Time Analytics</h3>
                <p className="text-gray-700">
                  Provides up-to-the-minute insights into investment performance and loan status.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Loan Tracking</h3>
                <p className="text-gray-700">
                  Enables users to monitor loan portfolios, track payments, and manage risk effectively.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Portfolio Management</h3>
                <p className="text-gray-700">
                  Offers tools for managing diverse investment portfolios, including stocks, bonds, and alternative assets.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">User-Friendly Interface</h3>
                <p className="text-gray-700">
                  Features an intuitive design that simplifies complex financial data for easy understanding.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Technologies Used</CardTitle>
              <CardDescription className="text-gray-600">Key technologies that power the platform</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Badge>React</Badge>
              <Badge>Node.js</Badge>
              <Badge>PostgreSQL</Badge>
              <Badge>Tailwind CSS</Badge>
              <Badge>Figma</Badge>
              <Badge>AWS</Badge>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-blue-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Ready to Transform Your Investment Management?</h2>
          <p className="text-blue-700 text-lg mb-8">
            Explore how our design solutions can revolutionize your financial platform.
          </p>
          <Link to="/contact" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-blue-900 text-blue-50 hover:bg-blue-800 h-10 px-4 py-2">
            Contact Us <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </StructuredCaseStudyLayout>
  );
};

export default StructuredInvestorLoanCaseStudy;

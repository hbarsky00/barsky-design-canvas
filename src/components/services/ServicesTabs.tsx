
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Shield, TrendingUp, Users, Code, Zap, Target, CheckCircle } from "lucide-react";

const ServicesTabs = () => {
  return (
    <Tabs defaultValue="ai-design" className="w-full mt-12">
      <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
        <TabsTrigger value="ai-design" className="text-sm">AI-Enhanced UX</TabsTrigger>
        <TabsTrigger value="accessibility" className="text-sm">Accessibility Compliance</TabsTrigger>
        <TabsTrigger value="conversion" className="text-sm">Conversion Optimization</TabsTrigger>
        <TabsTrigger value="collaboration" className="text-sm">Cross-Functional Design</TabsTrigger>
      </TabsList>

      <TabsContent value="ai-design" className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Brain className="h-8 w-8 text-blue-600" />
              <div>
                <CardTitle className="text-2xl">AI-Enhanced UX Design</CardTitle>
                <CardDescription className="text-lg">Leveraging AI tools for faster, smarter design decisions</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-blue-600" />
                  Rapid Prototyping with AI Tools
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />Figma AI for component generation and design system optimization</li>
                  <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />Claude-assisted user flow mapping and information architecture</li>
                  <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />Automated A/B test variant generation for faster iteration</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-blue-600" />
                  AI-Augmented User Research
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />Perplexity-powered competitive analysis and market research</li>
                  <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />AI-assisted persona development and user journey mapping</li>
                  <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />Automated usability testing insights and pattern recognition</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="accessibility" className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-green-600" />
              <div>
                <CardTitle className="text-2xl">Accessibility Compliance & Audits</CardTitle>
                <CardDescription className="text-lg">WCAG 2.1 AA compliance addressing the 77% company need</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                  Comprehensive Accessibility Audits
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />WCAG 2.1 AA compliance assessment and remediation plans</li>
                  <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />Screen reader testing and keyboard navigation optimization</li>
                  <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />Color contrast analysis and visual accessibility improvements</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-green-600" />
                  Team Training & Implementation
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />Developer team training on accessible code practices</li>
                  <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />Design system integration with accessibility components</li>
                  <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />Ongoing accessibility testing and maintenance protocols</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="conversion" className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div>
                <CardTitle className="text-2xl">Conversion-Focused Design</CardTitle>
                <CardDescription className="text-lg">ROI-driven interface optimization with measurable results</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-purple-600" />
                  Business Metric Improvements
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />A/B testing strategy and implementation for conversion optimization</li>
                  <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />User flow analysis and friction point identification</li>
                  <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />Conversion funnel optimization with data-driven design decisions</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                  Data Analysis & Optimization
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />Google Analytics and heatmap analysis for user behavior insights</li>
                  <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />Performance monitoring and ROI tracking for design changes</li>
                  <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />Continuous optimization based on user data and business metrics</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="collaboration" className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-orange-600" />
              <div>
                <CardTitle className="text-2xl">Cross-Functional Product Design</CardTitle>
                <CardDescription className="text-lg">T-shaped collaboration skills for successful product shipping</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-orange-600" />
                  PM Collaboration & Strategy
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />Product roadmap planning and feature prioritization</li>
                  <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />User story creation and acceptance criteria definition</li>
                  <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />Stakeholder communication and design decision justification</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <Code className="h-5 w-5 mr-2 text-orange-600" />
                  Developer Handoff & Implementation
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />Frontend development skills for better design-dev collaboration</li>
                  <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />Technical feasibility assessment and constraint understanding</li>
                  <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />Design system maintenance and component documentation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ServicesTabs;

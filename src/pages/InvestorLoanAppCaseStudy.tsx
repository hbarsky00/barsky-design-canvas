import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/seo/SEO";
import ModernProjectImage from "@/components/project/enhanced/ModernProjectImage";
import ModernProjectOverview from "@/components/project/enhanced/ModernProjectOverview";
import ChallengeSolutionSection from "@/components/project/enhanced/ChallengeSolutionSection";
import ModernProjectProcess from "@/components/project/enhanced/ModernProjectProcess";
import TechnicalImplementationSection from "@/components/project/enhanced/TechnicalImplementationSection";
import { projectDetails } from "@/data/project-details";
import { getProjectVariables } from "@/utils/projectTemplateGenerator";
import { projectVariables } from "@/data/project-variables";

const InvestorLoanAppCaseStudy: React.FC = () => {
  const projectId = "investor-loan-app";
  const details = projectDetails[projectId];
  const variables = getProjectVariables(projectId, projectVariables);

  if (!details || !variables) {
    return <div>Loading...</div>;
  }

  const tags = [
    "UX Design",
    "UI Design",
    "Mobile App Design",
    "Product Design",
    "User Research",
  ];

  return (
    <>
      <Header />
      <SEO
        type="article"
        title="Investor Loan App Case Study"
        description="A case study on the design and development of an investor loan application."
        url="https://barskydesign.pro/case-studies/investor-loan-portfolio-management"
        image="/lovable-uploads/eef241e8-8c9a-46bd-a698-6d4cca9880a5.png"
        tags={tags}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white py-12"
      >
        <div className="container mx-auto px-4">
          {/* Hero Image */}
          <ModernProjectImage
            project={{
              id: projectId,
              title: "Investor Loan App",
              image: "/lovable-uploads/eef241e8-8c9a-46bd-a698-6d4cca9880a5.png",
            }}
            imageCaptions={details.imageCaptions}
            projectId={projectId}
          />

          {/* Project Overview */}
          <ModernProjectOverview details={details} tags={tags} />

          {/* Challenge & Solution */}
          <ChallengeSolutionSection
            challenge={details.challenge}
            result={details.result}
            projectId={projectId}
          />

          {/* Process */}
          <ModernProjectProcess
            process={details.process}
            processImage="/lovable-uploads/0afc5405-ec7b-4938-a467-96cf505b98d8.png"
            imageCaptions={details.imageCaptions}
            projectId={projectId}
          />

          {/* Technical Implementation */}
          <TechnicalImplementationSection
            technologies={details.technologies}
            technicalImages={[
              "/lovable-uploads/21ed3f67-cf04-4117-b956-425f6a473789.png",
            ]}
            imageCaptions={details.imageCaptions}
          />

          {/* Back to Projects */}
          <Card className="mt-12">
            <CardContent className="py-8">
              <Link
                to="/projects"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors font-medium"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <Footer />
    </>
  );
};

export default InvestorLoanAppCaseStudy;

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/seo/SEO";

const HerbalinkCaseStudy = () => {
  const caseStudyData = {
    title: "Herbalink Mobile Herbalist UX Design",
    description:
      "UX design case study for Herbalink, a mobile app for herbalists to manage client information, create custom herbal formulas, and track client progress.",
    url: "https://barskydesign.pro/case-studies/herbalink-mobile-herbalist-ux-design",
    image: "/lovable-uploads/21ed3f67-cf04-4117-b956-425f6a473789.png",
    tags: [
      "UX Design",
      "UI Design",
      "Mobile App Design",
      "User Research",
      "Interaction Design",
    ],
    projectLink: "https://www.herbalink.app/",
  };

  return (
    <>
      <SEO
        type="article"
        title={caseStudyData.title}
        description={caseStudyData.description}
        url={caseStudyData.url}
        image={caseStudyData.image}
        tags={caseStudyData.tags}
      />
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white py-6 sm:py-8 lg:py-12"
      >
        <div className="max-w-screen-md px-4 md:px-8 mx-auto">
          <div className="mb-10 md:mb-16">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition duration-150"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Projects
            </Link>
            <h1 className="text-gray-800 text-2xl md:text-3xl font-bold text-center mb-4">
              {caseStudyData.title}
            </h1>
            <p className="max-w-screen-md text-gray-500 md:text-lg text-center">
              {caseStudyData.description}
            </p>
            <div className="flex items-center justify-center mt-4">
              {caseStudyData.tags.map((tag) => (
                <Badge key={tag} className="mr-2">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Card className="mb-8">
            <CardContent className="p-0">
              <img
                src={caseStudyData.image}
                loading="lazy"
                alt="Herbalink Mobile App"
                className="w-full h-auto object-cover rounded-md"
              />
            </CardContent>
          </Card>

          <div className="mb-6">
            <h2 className="text-gray-800 text-xl font-semibold mb-2">
              Project Overview
            </h2>
            <p className="text-gray-500">
              Herbalink is a mobile app designed for herbalists to streamline
              their practice. It allows herbalists to efficiently manage client
              information, create custom herbal formulas, and monitor client
              progress, all in one place.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-gray-800 text-xl font-semibold mb-2">
              Key Features
            </h2>
            <ul className="list-disc list-inside text-gray-500">
              <li>Client Management</li>
              <li>Herbal Formula Creation</li>
              <li>Progress Tracking</li>
              <li>Reporting and Analytics</li>
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-gray-800 text-xl font-semibold mb-2">
              My Role
            </h2>
            <p className="text-gray-500">
              As the UX/UI designer for Herbalink, I was responsible for the
              end-to-end design process, from user research and wireframing to
              UI design and prototyping.
            </p>
          </div>

          <div>
            <h2 className="text-gray-800 text-xl font-semibold mb-2">
              View Project
            </h2>
            <Link
              to={caseStudyData.projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 inline-flex items-center"
            >
              Visit Herbalink App
              <ExternalLink className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default HerbalinkCaseStudy;

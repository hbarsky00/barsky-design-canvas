import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, TrendingUp, Clock, Shield, BarChart3, CheckCircle, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const InvestorLoanAppCaseStudy = () => {
  const resultsList = [
    "70% Faster Loan Processing",
    "Improved Risk Assessment Accuracy",
    "Enhanced User Experience"
  ];

  const technologiesList = [
    "React",
    "Tailwind CSS",
    "Python (Backend)",
    "Machine Learning Algorithms"
  ];

  return (
    <>
      <SEO
        title="Investor Loan App - AI-Powered Loan Management Platform"
        description="Case study of the Investor Loan App, an AI-powered platform that achieved 70% faster loan processing and improved risk assessment accuracy."
        image="/lovable-uploads/4408b539-65ee-460c-9f7d-6303241781d0.png"
        type="article"
        url="https://barskydesign.pro/project/investor-loan-app"
      />
      
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="bg-gray-100 py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Investor Loan App
                </h1>
                <p className="text-lg text-gray-700 mb-8">
                  AI-Powered Loan Management Platform
                </p>
                <img
                  src="/lovable-uploads/4408b539-65ee-460c-9f7d-6303241781d0.png"
                  alt="Investor Loan App Interface"
                  className="mx-auto rounded-lg shadow-lg"
                />
              </motion.div>
            </div>
          </section>

          {/* Results Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-8"
              >
                <h2 className="text-3xl font-bold text-gray-900">Key Results</h2>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {resultsList.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <TrendingUp className="text-green-500 w-6 h-6 mb-4" />
                    <p className="text-lg text-gray-700">{result}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Technologies Section */}
          <section className="bg-gray-100 py-16">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-8"
              >
                <h2 className="text-3xl font-bold text-gray-900">
                  Technologies Used
                </h2>
              </motion.div>
              <div className="flex flex-wrap justify-center gap-6">
                {technologiesList.map((tech, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="bg-white rounded-full shadow-md px-4 py-2"
                  >
                    <p className="text-lg text-gray-700">{tech}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Case Study Details Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  About the Project
                </h2>
                <p className="text-lg text-gray-700">
                  The Investor Loan App is an AI-powered platform designed to
                  streamline the loan management process for investors. By
                  leveraging machine learning algorithms, the app automates risk
                  assessment, accelerates loan processing, and enhances the
                  overall user experience.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Challenges
                </h2>
                <ul className="list-disc list-inside text-lg text-gray-700">
                  <li>
                    Automating risk assessment to reduce manual effort and
                    improve accuracy.
                  </li>
                  <li>
                    Accelerating loan processing to enhance investor
                    satisfaction.
                  </li>
                  <li>
                    Creating a user-friendly interface that simplifies complex
                    financial data.
                  </li>
                </ul>
              </motion.div>
            </div>
          </section>

          {/* Solution Section */}
          <section className="bg-gray-100 py-16">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Our Solution
                </h2>
                <p className="text-lg text-gray-700">
                  We developed an AI-powered platform that automates risk
                  assessment, accelerates loan processing, and enhances the
                  overall user experience. The app leverages machine learning
                  algorithms to analyze vast amounts of data, providing
                  investors with accurate and timely insights.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Key Features
                </h2>
                <ul className="list-disc list-inside text-lg text-gray-700">
                  <li>
                    AI-Powered Risk Assessment: Automates risk analysis using
                    machine learning algorithms.
                  </li>
                  <li>
                    Automated Loan Processing: Accelerates loan processing by
                    automating key tasks.
                  </li>
                  <li>
                    User-Friendly Interface: Simplifies complex financial data
                    with an intuitive interface.
                  </li>
                </ul>
              </motion.div>
            </div>
          </section>

          {/* Conclusion Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Conclusion
                </h2>
                <p className="text-lg text-gray-700 mb-8">
                  The Investor Loan App has transformed the loan management
                  process for investors, achieving 70% faster loan processing
                  and improved risk assessment accuracy. By leveraging AI and
                  machine learning, the app provides investors with a powerful
                  tool to make informed decisions and manage their loan
                  portfolios more effectively.
                </p>
                <Link to="/" className="text-blue-500 hover:underline">
                  Back to Home
                </Link>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default InvestorLoanAppCaseStudy;

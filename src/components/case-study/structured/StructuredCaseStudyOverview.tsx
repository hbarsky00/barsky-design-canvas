import React from "react";
import { motion } from "framer-motion";

interface OverviewContent {
  overview: string;
  goals: string[];
  role: string;
  responsibilities: string;
  collaborators: string;
  duration: string;
}

interface StructuredCaseStudyOverviewProps {
  projectId: string;
}

const overviewContent: Record<string, OverviewContent> = {
  "splittime": {
    overview: "SplitTime is a co-parenting app designed to simplify shared custody, expenses, and communication. Parents were relying on texts and spreadsheets, leading to miscommunication and stress. The vision: create a neutral, trustworthy tool that reduces conflict and builds trust between co-parents.",
    goals: [
      "Build a shared calendar, expense tracker, and messaging system.",
      "Reduce stress and miscommunication for co-parents.",
      "Position SplitTime as a trusted family platform."
    ],
    role: "Sole Product Designer",
    responsibilities: "End-to-end UX & UI design, research to validation",
    collaborators: "2 Engineers, 1 Family Law Consultant",
    duration: "1 year"
  },
  "herbalink": {
    overview: "HerbaLink connects people with vetted herbalists and reliable resources. Many users relied on unverified sources, creating risks. The vision: build a discovery and booking platform with credibility at its core. The outcome: safe, trustworthy access to natural health practitioners and remedies.",
    goals: [
      "Enable search, filter, and booking for herbalists.",
      "Give users safe, reliable access to natural health care.",
      "Create new revenue channels for practitioners and the platform."
    ],
    role: "Lead Product Designer",
    responsibilities: "Product design, booking flows, trust & safety UX",
    collaborators: "3 Engineers, 1 Herbalist Advisor, 1 Researcher",
    duration: "1 year"
  },
  "investor-loan-app": {
    overview: "A private bank was managing investor loans in Excel, leading to errors, compliance risks, and delays. I designed a scalable loan platform with predictive search, guided workflows, and collaboration. The impact: 85% fewer errors, 40% faster processing, and restored trust from staff and regulators.",
    goals: [
      "Replace Excel chaos with predictive workflows.",
      "Give loan officers speed and confidence.",
      "Scale to handle 200+ deals per month."
    ],
    role: "Lead Product Designer",
    responsibilities: "UX strategy, workflow redesign, compliance UX",
    collaborators: "1 PM, 3 Engineers, 1 Compliance Officer",
    duration: "1 year"
  },
  "business-management": {
    overview: "Small businesses struggled with scattered tools for scheduling, invoicing, and tasks. I designed a unified platform to consolidate operations into one app. The vision: reduce admin overload and free up time. The result: 35% less time spent on manual tasks.",
    goals: [
      "Consolidate scheduling, invoicing, and task tracking.",
      "Save business owners hours each week.",
      "Improve retention by replacing multiple SaaS tools with one."
    ],
    role: "Lead Product Designer",
    responsibilities: "Information architecture, workflow design, UI patterns",
    collaborators: "3 Engineers, 1 PM, 2 Pilot Business Owners",
    duration: "1 year"
  }
};

const StructuredCaseStudyOverview: React.FC<StructuredCaseStudyOverviewProps> = ({ projectId }) => {
  const content = overviewContent[projectId];

  if (!content) return null;

  return (
    <motion.section
      id="project-overview"
      className="scroll-mt-24 bg-white/80 backdrop-blur-sm rounded-lg p-8 md:p-12 shadow-sm border border-white/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Overview</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        {/* Left Column - 60% */}
        <div className="lg:col-span-3 space-y-8">
          {/* Overview Text */}
          <div>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {content.overview}
            </p>
          </div>

          {/* Goals */}
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Goals</h3>
            <ul className="space-y-3">
              {content.goals.map((goal, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground leading-relaxed">{goal}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column - 40% */}
        <div className="lg:col-span-2 space-y-6">
          {/* Role */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">Role</h4>
            <p className="text-foreground font-medium">{content.role}</p>
          </div>

          {/* Responsibilities */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">Responsibilities</h4>
            <p className="text-muted-foreground leading-relaxed">{content.responsibilities}</p>
          </div>

          {/* Collaborators */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">Collaborators</h4>
            <p className="text-muted-foreground leading-relaxed">{content.collaborators}</p>
          </div>

          {/* Duration */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">Duration</h4>
            <p className="text-foreground font-medium">{content.duration}</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default StructuredCaseStudyOverview;
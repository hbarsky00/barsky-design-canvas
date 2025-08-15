import React from "react";
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";
import ProblemSection from "@/components/case-study/sections/ProblemSection";
import ImpactSection from "@/components/case-study/sections/ImpactSection";
import FailuresSection from "@/components/case-study/sections/FailuresSection";
import ProcessSection from "@/components/case-study/sections/ProcessSection";
import WholesaleHero from "@/components/case-study/sections/WholesaleHero";
import MaximizableImage from "@/components/project/MaximizableImage";
import { motion } from "framer-motion";

const WholesaleDistributionCaseStudy: React.FC = () => {
  // Optimized hero image for social sharing
  const heroImage = "https://barskydesign.pro/lovable-uploads/warehouse-fallback.jpg";
  const mainAppImage = "/lovable-uploads/warehouse-fallback.jpg";

  const problemData = {
    title: "A casual dinner conversation revealed a business hemorrhaging efficiency",
    businessImpact: "A restaurant owner was manually tracking 200+ wholesale orders weekly using Excel spreadsheets. This led to 15% order errors, 3-hour daily reconciliation tasks, and constant stress about missed deliveries that could damage customer relationships.",
    userPain: "The owner described feeling 'constantly behind' and 'one mistake away from losing a major client.' Every order required cross-referencing multiple spreadsheets, manual inventory checks, and phone calls to verify stock levels.",
    gapAnalysis: "What they asked for was 'better Excel templates.' What they actually needed was a complete business process transformation that could eliminate manual data entry while providing real-time visibility into operations.",
    metrics: [
      { label: "Weekly order errors", value: "15%", trend: "down" as const },
      { label: "Daily reconciliation time", value: "3 hours", trend: "down" as const },
      { label: "Customer complaints", value: "8/week", trend: "down" as const }
    ]
  };

  const impactData = {
    overview: "Developed a single dashboard for managing dispatch, inventory, and analytics. This consolidation cut redundant data entry, improved visibility into operations, and sped up decision-making for managers.",
    metrics: [
      {
        label: "Manual Data Entry",
        value: "95%",
        improvement: "Reduction in manual tasks",
        category: "efficiency" as const
      },
      {
        label: "Order Processing Speed",
        value: "500%",
        improvement: "Faster order completion",
        category: "efficiency" as const
      },
      {
        label: "Order Accuracy",
        value: "99.7%",
        improvement: "Near-perfect accuracy rate",
        category: "business" as const
      },
      {
        label: "Revenue Growth",
        value: "34%",
        improvement: "Increase within 6 months",
        category: "revenue" as const
      }
    ],
    timeframe: "6 months post-launch"
  };

  const failuresData = {
    introduction: "My designer instincts initially led me toward 'user-friendly' solutions that completely missed the real business problems. Here's what failed:",
    failures: [
      {
        assumption: "They just needed a prettier interface for their existing process",
        attempt: "Created beautiful dashboard mockups that digitized their Excel workflow with drag-and-drop ordering and visual inventory displays",
        whyItFailed: "User testing revealed they were still manually entering the same data in multiple places. The pretty interface didn't solve the underlying data duplication problem.",
        lesson: "Beautiful interfaces can't fix broken processes. I needed to understand the business logic, not just the user interface needs."
      },
      {
        assumption: "A simple mobile app would solve their 'on-the-go' problems",
        attempt: "Built a mobile-first ordering system focusing on quick item selection and simplified checkout flows",
        whyItFailed: "The real problem wasn't mobility—it was data integrity. Orders placed on mobile still required extensive back-office verification and correction.",
        lesson: "Solving the wrong problem efficiently is still solving the wrong problem. I needed to dig deeper into their actual workflow pain points."
      },
      {
        assumption: "Integration with existing tools would be enough",
        attempt: "Built connectors to sync their Excel sheets with cloud storage and basic automation tools",
        whyItFailed: "This created more problems than it solved. Now they had data inconsistencies across multiple platforms instead of just in Excel.",
        lesson: "Sometimes the best solution is replacement, not integration. Legacy processes don't always deserve to be preserved."
      }
    ]
  };

  const processData = {
    overview: "The turning point came when I stopped thinking like a designer and started thinking like a business analyst. I spent a full day shadowing their operations to understand the real constraints.",
    mentalModels: [
      "Business processes as data transformation pipelines",
      "Error reduction as a multiplier for growth capacity",
      "Manual work as technical debt that compounds over time"
    ],
    keyPrinciples: [
      "Automate the boring stuff: Eliminate repetitive tasks that humans shouldn't be doing",
      "Build for scalability: Solution should work for 500 orders as well as 50",
      "Real-time visibility: Everyone should know the current state without asking"
    ],
    decisions: [
      {
        situation: "Whether to build custom vs. adapt existing business software",
        options: [
          "Customize QuickBooks or similar accounting software",
          "Use Shopify or e-commerce platform with modifications",
          "Build completely custom solution from scratch"
        ],
        chosenPath: "Built custom solution with AI-powered automation",
        reasoning: "Their business model was unique enough that existing platforms would require extensive workarounds. A custom solution could eliminate manual work entirely rather than just digitizing it.",
        tradeoffs: [
          "Higher upfront development cost",
          "Longer timeline to launch",
          "Complete ownership but also complete responsibility for maintenance"
        ]
      },
      {
        situation: "How to handle the transition from Excel without disrupting operations",
        options: [
          "Big bang replacement—switch everything at once",
          "Gradual migration over several months",
          "Parallel systems until confidence was built"
        ],
        chosenPath: "Built the new system to import existing Excel data and run parallel for 30 days",
        reasoning: "This let them verify accuracy without risking their business. They could fall back to Excel if needed while building confidence in the new system.",
        tradeoffs: [
          "Double work during transition period",
          "Potential data inconsistencies to manage",
          "Extended timeline before full benefits realized"
        ]
      }
    ],
    personalInsight: "This project transformed how I think about design. I realized that my job isn't to make things look good—it's to make things work better. The most elegant design solution is often invisible: when manual work just disappears and people can focus on growing their business instead of managing spreadsheets."
  };

  const sections = [
    {
      id: "main-image",
      title: "",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <MaximizableImage
            src={mainAppImage}
            alt="Wholesale distribution automation dashboard showing streamlined order management and inventory tracking"
            caption="The AI-powered dashboard that eliminated 95% of manual data entry"
            className="shadow-elevated-lg w-full glass-card layered-depth rounded-lg"
            projectId="wholesale-distribution"
            priority={true}
          />
        </motion.div>
      )
    },
    {
      id: "problem",
      title: "The Problem",
      content: <ProblemSection {...problemData} />
    },
    {
      id: "impact",
      title: "Quantified Impact",
      content: <ImpactSection {...impactData} />
    },
    {
      id: "failed",
      title: "What Didn't Work",
      content: <FailuresSection {...failuresData} />
    },
    {
      id: "process",
      title: "My Thought Process",
      content: <ProcessSection {...processData} />
    }
  ];

  const heroSection = <WholesaleHero />;

  return (
    <CaseStudyLayout
      title="68% Fewer Errors: Streamlining Enterprise Operations | Hiram Barsky"
      description="Developed a single dashboard for managing dispatch, inventory, and analytics. This consolidation cut redundant data entry, improved visibility into operations, and sped up decision-making for managers."
      image={heroImage}
      projectName="Wholesale Distribution App"
      results={["95% reduction in manual data entry", "500% faster order processing", "34% revenue growth in 6 months"]}
      technologies={["Business Automation", "AI Development", "Custom Software", "Process Optimization", "Enterprise", "Analytics", "Dashboard"]}
      path="/project/wholesale-distribution"
      heroSection={heroSection}
      sections={sections}
      gradientClasses="from-orange-50 via-amber-50 to-yellow-50"
    />
  );
};

export default WholesaleDistributionCaseStudy;

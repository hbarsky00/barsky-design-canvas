import React from "react";
import { motion } from "framer-motion";

interface OverviewContent {
  overview: string;
  goals: string[];
  role: string;
  responsibilities: string;
  collaborators: string;
  /** Omitted where there is no real figure. Never guess one — the field is
      simply not rendered, which is honest; an invented "1 year" is not. */
  duration?: string;
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
    collaborators: "Solo — design and front end, with AI tooling",
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
    collaborators: "Solo — design and front end, with AI tooling",
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
    collaborators: "Solo — design and front end, with AI tooling",
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
    collaborators: "Solo — design and front end, with AI tooling",
    duration: "1 year"
  },
  "crypto": {
    overview: "Crypto traders needed fast, secure tools to analyze market trends and execute trades. Existing platforms were either too complex or lacked advanced features. I designed a trading platform that balances sophisticated analytics with intuitive workflows. The result: traders gained the speed and insights they needed to make confident decisions in volatile markets.",
    goals: [
      "Create real-time market analysis and trading tools.",
      "Simplify complex crypto data into actionable insights.",
      "Build trust through secure, transparent transactions."
    ],
    role: "Lead Product Designer",
    responsibilities: "Trading UX, data visualization, security workflows",
    collaborators: "Solo — design and front end, with AI tooling",
    duration: "1 year"
  },
  // Renamed from "daesearchproject" on 2026-11-17. The case study's id is
  // "dae-search" (structuredCaseStudies.ts) and this map is keyed by that id,
  // so the two never matched and this copy has never rendered. The page showed
  // a 96px empty band where the Overview should have been.
  "dae-search": {
    overview: "Users struggled with traditional search interfaces that required exact keywords and couldn't understand context or intent. I designed an intelligent search platform powered by AI that predicts user needs and delivers personalized results. The vision: transform how people discover information through natural language understanding and predictive suggestions.",
    goals: [
      "Create AI-powered search with natural language processing.",
      "Implement predictive suggestions that anticipate user intent.",
      "Cut the time it takes to reach the right result through smarter ranking.",
      "Build trust through transparent, explainable search results."
    ],
    role: "Lead Product Designer",
    responsibilities: "Search UX, AI interaction design, information architecture",
    collaborators: "Solo — design and front end, with AI tooling",
    duration: "1 year"
  },

  // Added 2026-11-17. Both of these routed, live case studies had no entry, so
  // StructuredCaseStudyOverview returned null and the layout still painted the
  // band — 96px of empty page under the hero on each.
  //
  // Nothing below is new writing. Every line is lifted from the study's own
  // copy in structuredCaseStudies.ts: the description, the research blurb, the
  // "drove" column of its emerging themes, its key insights and its hero
  // metrics. Where a field has no truthful value it is omitted rather than
  // guessed — both of these have no `duration`, because nothing in the repo
  // records one.
  "catchbuddy": {
    overview:
      "Pickup sports are declining in urban areas, and the apps built to address that all assume you want a full season — the commitment, the fixed schedule, the regular team. What most people actually want is a game on Saturday. The blocker was never the calendar: it was getting two complete strangers to agree to meet at a park and both of them feeling comfortable about it, which is a matter of trust.",
    goals: [
      "Build a front door around one game on Saturday, not a season.",
      "Ship the safety layer in v1, because every product that adds it later ends up with a settings screen nobody opens.",
      "Keep meeting points to a curated list, so nobody can drop a pin on an address of their own choosing."
    ],
    role: "Sole designer and developer",
    responsibilities: "Product design, trust & safety UX, React front end, database and deploy",
    collaborators: "Solo \u2014 design and front end, with AI tooling"
  },

  "email-creation-ai": {
    overview:
      "A self-initiated concept project \u2014 a 6-step AI-assisted workflow that replaces the broken handoffs in pharma HCP email production with one platform built around real roles and approval gates.",
    goals: [
      "Replace the chain of handoffs across separate tools with one platform.",
      "Design around the four real roles the work passes through, and the approval gates it is legally required to clear.",
      "Leave the one unresolved problem visible rather than designing it away in a mock-up."
    ],
    role: "Sole product designer, self-initiated",
    responsibilities: "Workflow design, AI interaction design, information architecture",
    collaborators: "Solo \u2014 a concept project, not a client engagement"
  },

};

const StructuredCaseStudyOverview: React.FC<StructuredCaseStudyOverviewProps> = ({ projectId }) => {
  const content = overviewContent[projectId];

  if (!content) return null;

  return (
    <motion.section
      className="container mx-auto px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="bg-white rounded-lg p-8 md:p-12 shadow-sm border border-slate-200/20">
      <h2 className="text-section-title font-display text-foreground mb-8">Overview</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        {/* Left Column - 60% */}
        <div className="lg:col-span-3 space-y-8">
          {/* Overview Text */}
          <div>
            <p className="text-muted-foreground leading-relaxed text-lg font-body">
              {content.overview}
            </p>
          </div>

          {/* Goals */}
          <div>
            <h3 className="text-xl font-display font-semibold text-foreground mb-4">Goals</h3>
            <ul className="space-y-3">
              {content.goals.map((goal, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground leading-relaxed font-body">{goal}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column - 40%.
            These four were <h4> directly under the section's <h2>, skipping h3 and
            putting field labels into the document outline. They are label/value
            pairs, so a <dl> is both the correct markup and out of the heading
            hierarchy entirely. */}
        <dl className="lg:col-span-2 space-y-6">
          {/* Role */}
          <div>
            <dt className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">Role</dt>
            <dd className="text-foreground font-medium font-body">{content.role}</dd>
          </div>

          {/* Responsibilities */}
          <div>
            <dt className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">Responsibilities</dt>
            <dd className="text-muted-foreground leading-relaxed font-body">{content.responsibilities}</dd>
          </div>

          {/* Collaborators */}
          <div>
            <dt className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">Collaborators</dt>
            <dd className="text-muted-foreground leading-relaxed font-body">{content.collaborators}</dd>
          </div>

          {/* Duration — only when the study actually has one. */}
          {content.duration && (
            <div>
              <dt className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">Duration</dt>
              <dd className="text-foreground font-medium font-body">{content.duration}</dd>
            </div>
          )}
        </dl>
      </div>
      </div>
    </motion.section>
  );
};

/**
 * Whether this study has overview copy to show.
 *
 * The layout used to render the Overview band unconditionally while every other
 * section was gated on its data. When this component returned null — which it
 * does for any id with no entry above — the band still painted its `py-12`, so
 * two live case studies carried a 96px stripe of nothing between the hero and
 * the next section. On a phone that is most of a thumb-swipe of blank page, and
 * it read as the page having ended.
 *
 * Exported so the gate lives with the data it depends on, instead of the layout
 * guessing.
 */
export const hasOverview = (projectId: string): boolean =>
  Boolean(overviewContent[projectId]);

export default StructuredCaseStudyOverview;
import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const IMG = "/images/business-management";

/**
 * Ported 2026-08-09 from StructuredCaseStudyLayout onto the shared case study
 * template — it was the last study still on the old design, and it's reachable
 * from the blog ("Why Enterprise Tools Lose to Excel"), from /design-services
 * and from the sitemap, so visitors were landing on what looked like a
 * different site.
 *
 * Everything from the old layout is carried over: the two research quotes and
 * what they changed, the three emerging themes, the sprint-zero narrative, the
 * key insights, all four ideation iterations, both metric sets, and every one
 * of the fourteen images. The image annotations were pinned to x/y percentages
 * over the screenshot — they now read as notes under each figure, which keeps
 * the observation and drops only the arrow.
 *
 * Two deliberate changes:
 *  - The h1 was the full "Blue Sky: Using Design Thinking to Reduce Enterprise
 *    Operation Errors by 68%". Every other study leads with a product name, and
 *    that line set at display size ran to four lines. The 68% claim still
 *    appears, in the outcome figures where it belongs.
 *  - No live-site button. The old one pointed at in-situ-quickbooks-flow.
 *    lovable.app, which now 404s.
 *
 * The source data in structuredCaseStudies.ts is left in place — seoData and
 * other consumers still read from it.
 */
const StructuredBusinessManagementCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="business-management"
    title="Blue Sky"
    description="When small businesses are drowning in tools, sometimes you need to throw them a lifeline."
    tags={["Enterprise", "Small Business", "Automation", "Design Thinking"]}
    meta={[{ label: "Role", value: "Lead UX Designer" }]}
    heroImage={{
      src: `${IMG}/hero-three-laptops.jpg`,
      width: 1500,
      height: 632,
      alt: "Blue Sky operations platform shown across three screens",
      caption: "A unified operations platform — scheduling, invoicing and tasks in one place.",
    }}
    blocks={[
      {
        heading: "The Problem",
        paragraphs: [
          "Small businesses juggle disconnected tools for scheduling, invoicing, and tasks — wasting hours weekly and losing revenue in the gaps between them.",
          "The cost isn't any single tool being bad. It's that the same information gets retyped into three places and then drifts apart, so nobody trusts any of it.",
        ],
      },
      {
        heading: "What 47 Owners Told Me",
        paragraphs: [
          "I gathered insights from 47 small business owners. Two complaints came up in almost every conversation, and both were about the seams between tools rather than the tools themselves.",
        ],
        quotes: [
          {
            text: "I spend more time entering the same client info into different systems than actually serving clients.",
            attribution: "Mike, freelance photographer",
            response: "Solved with smart templates and automation.",
          },
          {
            text: "I missed a $12K payment because the overdue notice got buried under 47 other notifications.",
            attribution: "Lisa, web developer",
            response: "Solved with the Today dashboard and priority scoring.",
          },
        ],
        points: [
          {
            label: "Consolidation",
            text: "Scheduling, invoicing, and tasks lived in separate systems.",
            drove: "Unified dashboard with linked records.",
          },
          {
            label: "Automation",
            text: "Recurring work — invoices, reminders — was manual.",
            drove: "Recurrence, templates, and smart reminders.",
          },
          {
            label: "Visibility & priority",
            text: "Hard to see what needs attention now.",
            drove: "A 'Today' view with aging statuses and alerts.",
          },
        ],
        images: [
          {
            src: `${IMG}/competitive-landscape.jpg`,
            width: 1081,
            height: 525,
            alt: "Competitive landscape review of existing small-business tools",
            caption:
              "Competitive landscape review — Sage X3, Zoho One, and the other disconnected tools owners were stitching together.",
          },
          {
            src: `${IMG}/inventory-management-mobile.jpg`,
            width: 390,
            height: 819,
            alt: "Inventory Management on mobile",
            caption:
              "Inventory Management — total products, low-stock alerts, and category breakdown.",
          },
        ],
      },
      {
        heading: "Sprint Zero: Blue-Sky Thinking",
        paragraphs: [
          "I explored blue-sky concepts ranging from AI-powered workflow automation to intelligent business insights. Early sketches included predictive cash flow modeling, automated client follow-ups, and integrated marketing campaigns. I tested divergent ideas like voice-controlled task management and smart scheduling optimization, to understand what would genuinely improve daily operations.",
          "I decided to build a unified operations platform after seeing that most problems came from switching between tools and re-entering data. I focused on bringing core functions together, automating repetitive work, and making daily priorities clear — efficiency by integrating features, not by adding more of them.",
        ],
        images: [
          {
            src: `${IMG}/sitemap-draft.jpg`,
            width: 768,
            height: 768,
            alt: "Early sitemap draft",
            caption:
              "Early sitemap draft — mapping login, products, customers, orders, delivery, and recurring modules.",
          },
          {
            src: `${IMG}/sitemap-refined.jpg`,
            width: 768,
            height: 768,
            alt: "Refined sitemap",
            caption:
              "Refined structure after cleanup — same modules, corrected flow labels and terminology.",
          },
        ],
      },
      {
        heading: "What the Research Settled",
        paragraphs: [
          "Three decisions came directly out of the interviews, and everything after them was downstream.",
        ],
        points: [
          {
            label: "01",
            text: "One platform eliminates chaos.",
            drove: "Consolidating core operations cuts tool-switching.",
          },
          {
            label: "02",
            text: "Automation saves hours.",
            drove: "Recurring invoices and reminders save hours weekly.",
          },
          {
            label: "03",
            text: "Priority-at-a-glance prevents oversights.",
            drove: "A single dashboard surfaces what needs attention now.",
          },
        ],
      },
      {
        heading: "Designing the Daily Loop",
        paragraphs: [
          "The product is really one loop: see what needs attention, do it, and let the system handle the paperwork that follows.",
          "Four modules carry that loop. The dashboard shows critical alerts only. Tasks get a Today view with smart priority. Invoices run template-driven. Scheduling auto-generates the tasks and invoices that come out of it — so booking work is the only thing anyone types twice.",
        ],
        images: [
          {
            src: `${IMG}/business-analytics-mobile.jpg`,
            width: 390,
            height: 1215,
            alt: "Business Analytics dashboard",
            caption:
              "Iteration 1 — Business Analytics: today's sales, delivery success rate, and revenue progress in one view.",
            notes: [
              "Delivery success rate surfaced next to revenue, not buried in a separate report.",
              "Revenue progress chart replaces the spreadsheet owners used to keep by hand.",
            ],
          },
          {
            src: `${IMG}/recurring-orders-mobile.jpg`,
            width: 390,
            height: 1413,
            alt: "Recurring Orders view",
            caption: "Iteration 2 — Recurring Orders: the 'what needs attention today' view.",
            notes: [
              "Active schedules and weekly volume surfaced at the top.",
              "Scheduled orders list replaces manual follow-up tracking.",
            ],
          },
          {
            src: `${IMG}/order-management-desktop.jpg`,
            width: 1440,
            height: 888,
            alt: "Order Management desktop view",
            caption:
              "Iteration 3 — Order Management: pending, delivered, and revenue at a glance.",
            notes: [
              "Revenue total sits next to pending and delivered counts.",
              "Recent Orders table replaces manual invoice tracking.",
            ],
          },
          {
            src: `${IMG}/driver-management-mobile.jpg`,
            width: 390,
            height: 820,
            alt: "Driver Management view",
            caption: "Iteration 4 — Driver Management: scheduling and dispatch in one screen.",
            notes: [
              "Active drivers and availability replace a manual dispatch call sheet.",
              "Average response time surfaced as a live metric.",
            ],
          },
        ],
      },
      {
        heading: "User Testing & Validation",
        paragraphs: [
          "I walked owners through the core screens and watched where they hesitated.",
        ],
        stats: [
          { value: "90%", label: "satisfaction" },
          { value: "68%", label: "fewer errors" },
          { value: "5 min", label: "daily setup time" },
        ],
        images: [
          {
            src: `${IMG}/product-catalog-desktop.jpg`,
            width: 1440,
            height: 1005,
            alt: "Product Catalog desktop view",
            caption: "Product Catalog — one of the screens walked through in testing sessions.",
          },
        ],
      },
      {
        heading: "The Final Product",
        paragraphs: [
          "A unified platform: smart priority dashboard, automated invoicing, connected scheduling.",
        ],
        images: [
          {
            src: `${IMG}/final-product-four-panel.jpg`,
            width: 1395,
            height: 857,
            alt: "Product, Order and Driver Management shown side by side",
            caption:
              "Three of the platform's core modules — Product Management, Order Management, and Driver Management.",
            notes: [
              "Product Management — inventory sources, stock levels, and reorder alerts.",
              "Order Management — total orders, pending count, and revenue tracking in one view.",
              "Driver Management — active drivers and delivery response time.",
            ],
          },
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "The clearest signal wasn't a metric. It was an owner noticing the work had stopped piling up.",
        ],
        quotes: [
          {
            text: "I just realized I haven't thought about my 'admin day' in weeks. Everything just happens automatically now.",
            attribution: "Sarah, by email",
          },
        ],
        stats: [
          { value: "68%", label: "fewer errors" },
          { value: "35%", label: "faster processing" },
          { value: "90%", label: "user satisfaction" },
        ],
        images: [
          {
            src: `${IMG}/business-overview-dashboard.jpg`,
            width: 1600,
            height: 630,
            alt: "Business Overview dashboard",
            caption:
              "Business Overview — today's sales, total revenue, and weekly performance. The dashboard owners check now instead of a spreadsheet.",
          },
        ],
      },
      {
        heading: "How I Approached It",
        paragraphs: [
          "I designed around how small businesses actually operate — not how we think they should.",
          "Watching Sarah's workflow made it clear the job was to reduce cognitive load, not add features. The result was a unified platform with smart defaults and connected workflows.",
        ],
        images: [
          {
            src: `${IMG}/product-management-mobile.jpg`,
            width: 390,
            height: 1473,
            alt: "Product Management on mobile",
            caption: "Product Management — the module owners open most.",
            notes: [
              "Designed around how small businesses actually work: jumping between tools, losing revenue to forgotten follow-ups and manual errors.",
              "The result is a platform that handles the details automatically, so teams can focus on growth.",
            ],
          },
        ],
      },
      {
        heading: "What Didn't Work",
        paragraphs: [
          "Too many customization options produced decision paralysis.",
          "Owners didn't want to configure a system, they wanted it to already be right. Smart defaults with minimal customization beat flexibility every time we tested it.",
        ],
        images: [
          {
            src: `${IMG}/tablet-customer-product.jpg`,
            width: 1280,
            height: 835,
            alt: "Customer Management and Product Catalog on tablet",
            caption:
              "Customer Management and Product Catalog — two of the screens where scope discipline mattered most.",
          },
        ],
      },
    ]}
  />
);

export default StructuredBusinessManagementCaseStudy;

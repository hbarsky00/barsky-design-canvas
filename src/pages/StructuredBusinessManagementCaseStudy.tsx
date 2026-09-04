import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredBusinessManagementCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="business-management"
    title="QuickFlow"
    description="A wholesale distributor was paying for software that fought them. This started as a conversation over dinner and ended up as the thing they run the business on."
    tags={["Business Software", "Distribution", "AI-Assisted Product", "Solo Build"]}
    meta={[
      { label: "Role", value: "Lead UX Designer & Developer" },
      { label: "Industry", value: "Wholesale distribution" },
    ]}
    heroImage={{
      src: "/images/business-management/v2/overview.webp",
      alt: "QuickFlow Business Overview — today's sales, total revenue, orders delivered and active customers, above quick actions and a product-category breakdown",
      caption:
        "The screen the owner opens first. Sales, revenue, deliveries and customers on one ledger, with the four things he actually does next sitting under them. Figures on screen are demo data.",
      width: 1440,
      height: 900,
    }}
    blocks={[
      {
        heading: "A Conversation Over Dinner",
        paragraphs: [
          "I met the owner of a wholesale distribution business by chance at a restaurant. He started describing the software he was paying for, and it was the specific kind of complaint you only get from someone who uses a thing every day.",
          "Grid actions that looked clickable and did nothing. Simple tasks buried behind screens that existed for somebody else's org chart. Hours a week of manual re-entry that a script could have done. He was paying a subscription for the privilege.",
          "None of that came out of a research plan. It came out of dinner, which is the only reason I heard the version with the frustration still in it.",
        ],
        images: [
          {
            src: "/images/business-management/competitive-landscape.jpg",
            alt: "The incumbent products — Sage X3, Zoho One and a HACCP compliance tool, all leading with demo requests and dashboards",
            caption:
              "What he was choosing between. Every one of these sells a dashboard to an executive; none of them is built for the person entering an order at 6am.",
              width: 1081,
              height: 525,
          },
        ],
      },
      {
        heading: "Excel First, Product Second",
        paragraphs: [
          "The first thing I built was not a product. It was a set of Excel scripts that took the worst of the manual re-entry off his desk that week.",
          "Two reasons. It gave him something back immediately, before I had earned any right to redesign his operation. And writing them taught me the workflow properly, which no amount of asking would have done, because the parts people forget to mention are exactly the parts they do without thinking.",
          "The product grew out of those scripts rather than replacing them. Everything in it is something the spreadsheet was already doing badly.",
        ],
      },
      {
        heading: "The Structure Came Before Any Screen",
        paragraphs: [
          "I drew the whole thing as a map first. Nine areas off the login, and the argument was about which nine.",
          "The Recipe Calculator sits at the same level as Orders, which looks wrong until you know this business sells to restaurants that price by the plate. Delivery owns the driver interface and location sharing rather than hanging off Orders, because on the day it matters the driver and the order clerk are two different people with two different phones.",
        ],
        videos: [
          {
            src: "/quickflow-ideation-walkthrough.mp4",
            poster: "/images/business-management/ideation-walkthrough-poster.jpg",
            narrated: true,
            caption:
              "Me working the flows out loud, role by role, before any screen existed. Start, products dashboard, the branch where adding a manufactured product stops behaving like adding a sourced one — and which of those decisions belong to somebody who is not the person clicking.",
            width: 1280,
            height: 624,
          },
        ],
        images: [
          {
            src: "/images/business-management/sitemap-refined.jpg",
            alt: "Site map — nine top-level areas off the login screen, with Delivery owning the driver interface, location sharing and active deliveries",
            caption:
              "The map I built from. Delivery owns the driver interface, because the driver and the clerk are never the same person.",
            width: 768,
            height: 768,
          },
        ],
      },
      {
        heading: "Orders Are the Product",
        paragraphs: [
          "Order management is where this business actually lives, so it gets the whole screen and the four numbers that matter across the top: total, pending, delivered, revenue.",
          "Every row carries its customer, its value, its status and its date, and the actions are three direct controls rather than a menu. That is a straight response to the grid he was complaining about, where the controls looked live and were not.",
        ],
        images: [
          {
            src: "/images/business-management/v2/orders.webp",
            alt: "QuickFlow order management — total, pending, delivered and revenue tiles above a recent-orders table with per-row status and actions",
            caption:
              "Status is a word, not a colour you have to decode. The figures on screen are demo data, not his books.",
            width: 1440,
            height: 900,
          },
          {
            src: "/images/business-management/v2/products.webp",
            alt: "The product catalogue — search, category filters, and cards showing each product's SKU, price, stock level and an add-to-order control",
            caption:
              "Every product carries its SKU, its price and whether it is in stock on the same card, because the person adding it to an order should not have to open it to find out.",
            width: 1440,
            height: 900,
          },
        ],
      },
      {
        heading: "Recurring Is What a Distributor Runs On",
        paragraphs: [
          "Most of the orders in a business like this are the same orders, every week, from the same accounts. Harbor Cafe every Monday. Fresh Seafood every second Wednesday.",
          "So recurring schedules are their own area rather than a setting inside an order, and they are designed for a phone. The person checking whether Friday's standing orders went out is not sitting at a desk when they think to check.",
        ],
        images: [
          {
            src: "/images/business-management/v2/recurring.webp",
            alt: "The recurring orders screen with no schedules yet, offering to create one from an existing order",
            caption:
              "The empty state is the whole feature in one sentence: you make a schedule out of an order you already placed, not out of a blank form.",
            width: 1440,
            height: 900,
          },
        ],
      },
      {
        heading: "Built to Be Used From a Phone",
        paragraphs: [
          "The recurring schedules, inventory, product edits, analytics and the driver views are all designed at phone width first. That is not a responsive-design box being ticked. In this business the warehouse, the van and the office are three different places, and only one of them has a monitor in it.",
        ],
        imageLayout: "pair",
        images: [
          {
            src: "/images/business-management/v2/mobile-recurring.webp",
            alt: "Recurring orders on a phone, offering to build a schedule from an existing order",
            caption: "Recurring, checked from wherever the question occurs to you.",
            width: 544,
            height: 1177,
          },
          {
            src: "/images/business-management/v2/mobile-products.webp",
            alt: "The product catalogue on a phone — search, category filter, and product cards with price, stock and add-to-order",
            caption: "Stock and price, adjusted where the stock is.",
            width: 544,
            height: 1177,
          },
          {
            src: "/images/business-management/v2/mobile-delivery.webp",
            alt: "The driver interface on a phone — start location sharing, then each active delivery with navigate, call and complete",
            caption:
              "The driver view is its own thing, not the office screen shrunk down: share location, navigate, call, mark it delivered.",
            width: 544,
            height: 1177,
          },
          {
            src: "/images/business-management/v2/mobile-dashboard.webp",
            alt: "The business overview on a phone, with the four headline numbers stacked",
            caption: "The owner's view. Four numbers, no chart he has to interpret.",
            width: 544,
            height: 1177,
          },
        ],
      },
      {
        heading: "Where It Is",
        paragraphs: [
          "Designed and built by me, from the site map through the interface to the working application, with AI doing the parts of the build I would otherwise have handed to an engineer.",
          "I am deliberately not putting an outcome number on this page. The honest position is that it came out of one conversation with one owner and it does the job he described; I have not measured it, and a percentage I could not defend on a call is worth less than saying so.",
          "What this one is evidence of is the front half. Hearing a real problem in the wild, relieving it with a spreadsheet inside a week, and only then designing the thing properly.",
        ],
        videos: [
          {
            src: "/quickflow-product-walkthrough.mp4",
            poster: "/images/business-management/product-walkthrough-poster.jpg",
            narrated: true,
            caption:
              "The whole thing, running, with me talking over it: recipe costing down to the ingredient, the customer directory with credit terms on it, the driver interface, the QuickBooks connection, and the overview screen the owner actually opens. The figures on screen are demo data.",
            width: 1280,
            height: 684,
          },
        ],
        images: [
          {
            src: "/images/business-management/v2/shipped-set.webp",
            alt: "Four QuickFlow screens together — business overview, order management, the product catalogue and the delivery interface",
            caption:
              "The shipped set. One person's software, built for one business that had been paying somebody else for the opposite.",
            width: 1600,
            height: 1009,
          },
        ],
      },
    ]}
  />
);

export default StructuredBusinessManagementCaseStudy;

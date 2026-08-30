import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredBusinessManagementCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="business-management"
    title="QuickFlow"
    description="A wholesale distributor was paying for software that fought them. This started as a conversation over dinner and ended up as the thing they run the business on."
    tags={["Business Software", "Distribution", "AI-Assisted Build", "Solo Build"]}
    meta={[
      { label: "Role", value: "Product Designer & Developer" },
      { label: "Industry", value: "Wholesale distribution" },
    ]}
    heroImage={{
      src: "/images/business-management/hero-three-laptops.jpg",
      alt: "QuickFlow across three screens — customer management, the product catalogue, and order management",
      caption:
        "Customers, catalogue, orders. Three screens that between them cover most of what this business does in a day.",
        width: 1500,
        height: 632,
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
        imageLayout: "pair",
        images: [
          {
            src: "/images/business-management/sitemap-draft.jpg",
            alt: "First site map draft for QuickFlow, showing the top-level areas and their children",
            caption: "First pass. Too many things hanging off Orders.",
            width: 768,
            height: 768,
          },
          {
            src: "/images/business-management/sitemap-refined.jpg",
            alt: "Refined site map — nine top-level areas off the login screen, with Delivery owning the driver interface, location sharing and active deliveries",
            caption:
              "The version I built from. Delivery owns the driver interface, because the driver and the clerk are never the same person.",
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
            src: "/images/business-management/order-management-desktop.jpg",
            alt: "QuickFlow order management — total, pending, delivered and revenue tiles above a recent-orders table with per-row status and actions",
            caption:
              "Status is a word, not a colour you have to decode. The figures on screen are demo data, not his books.",
              width: 1440,
              height: 888,
          },
          {
            src: "/images/business-management/product-catalog-desktop.jpg",
            alt: "Product catalogue with inventory value, low-stock count, categories, and a searchable product table showing SKU, price, stock and status",
            caption:
              "Low stock is a count at the top, not something you find by scrolling. It is the number that costs money when nobody notices it.",
              width: 1440,
              height: 1005,
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
            src: "/images/business-management/recurring-orders-mobile.jpg",
            alt: "Recurring orders on mobile — customers with recurring orders, active schedules, weekly volume and average order value, above a list of scheduled customers with their cadence and status",
            caption:
              "Each schedule shows its cadence and whether it is active or paused. Paused matters more than active, because a paused schedule is the one about to cause a phone call.",
              width: 390,
              height: 1413,
          },
        ],
      },
      {
        heading: "Built to Be Used From a Phone",
        paragraphs: [
          "Inventory, product edits, analytics and the driver views are all designed at phone width first. That is not a responsive-design box being ticked. In this business the warehouse, the van and the office are three different places, and only one of them has a monitor in it.",
        ],
        imageLayout: "pair",
        images: [
          {
            src: "/images/business-management/inventory-management-mobile.jpg",
            alt: "Inventory management on mobile, with stock levels and adjustment controls",
            caption: "Stock adjusted where the stock is.",
            width: 390,
            height: 819,
          },
          {
            src: "/images/business-management/driver-management-mobile.jpg",
            alt: "Driver management on mobile, showing drivers and their active deliveries",
            caption: "The driver view is its own thing, not the office screen shrunk down.",
            width: 390,
            height: 820,
          },
          {
            src: "/images/business-management/business-analytics-mobile.jpg",
            alt: "Business analytics on mobile, summarising performance for the owner",
            caption: "The owner's view. Four numbers, no chart he has to interpret.",
            width: 390,
            height: 1215,
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
        images: [
          {
            src: "/images/business-management/final-product-four-panel.jpg",
            alt: "Four QuickFlow screens together — dashboard, catalogue, orders and delivery",
            caption:
              "The shipped set. One person's software, built for one business that had been paying somebody else for the opposite.",
              width: 1395,
              height: 857,
          },
        ],
      },
    ]}
  />
);

export default StructuredBusinessManagementCaseStudy;

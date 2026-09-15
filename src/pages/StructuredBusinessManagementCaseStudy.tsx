import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredBusinessManagementCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="business-management"
    title="QuickFlow"
    description="A wholesale distributor found themselves having to pay for some software that was working against them. The situation had begun as a topic of discussion over dinner and had eventually become the software they run the business on."
    tags={["Business Software", "Distribution", "AI-Assisted Product", "Solo Build"]}
    meta={[
      { label: "Role", value: "Lead UX Designer & Developer" },
      { label: "Industry", value: "Wholesale distribution" },
    ]}
    heroImage={{
      src: "/images/business-management/card-phones.webp",
      hoverVideo: "/business-management-card.mp4",
      alt: "QuickFlow on a phone: recurring orders, the product catalogue, delivery management and driver management",
      caption: "A wholesale distributor was paying for software that fought them. Excel scripts first, then a product built around how the business actually runs.",
      width: 1600,
      height: 1000,
    }}
    blocks={[
      {
        heading: "A Conversation Over Dinner",
        paragraphs: [
          "I came across the man who ran a wholesale distribution business at a restaurant by accident. When he began to talk about the software he was paying for, he made the kind of complaint that is only ever heard from somebody who uses a particular item every day.",
          "Actions in the grid that appeared to be clickable but in fact did nothing. Simple tasks were hidden behind screens which were designed for someone else's organizational chart. There was each week a great deal of manual re-entry that could have been carried out by a script, and a subscription invoice was issued every month for the privilege of doing it by hand.",
          "None of that was the result of a research plan. It came about during dinner, and that is the only reason why I heard the version in which the frustration was still present.",
        ],
        images: [
          {
            src: "/images/business-management/competitive-landscape.webp",
            alt: "The incumbent products: Sage X3, Zoho One and a HACCP compliance tool, all leading with demo requests and dashboards",
            caption:
              "The choice he was facing. Each of these options involves selling a dashboard to an executive, and none of them is suitable for the person who places an order at 6 a.m.",
              width: 1081,
              height: 525,
          },
        ],
      },
      {
        heading: "Excel First, Product Second",
        paragraphs: [
          "The very first thing that I developed wasn't a product. It was a collection of Excel scripts which took away the worst of the manual re-entry from his desk that week.",
          "I chose that method for two reasons. It allowed me to give him something right away, before I had earned any right to alter his operation. Also, by writing them I became properly familiar with the workflow, since it is precisely the parts that people fail to mention which are the ones they omit without realizing it.",
          "The product was developed from the scripts rather than taking their place. All the features it had were things that the spreadsheet was already handling poorly.",
        ],
        images: [
          {
            src: "/images/business-management/v2/recipe-calculator.webp",
            alt: "The recipe calculator: pick a product, set a quantity, optionally override the selling price, and it returns the margin",
            caption:
              "The spreadsheet that had been used previously calculated the cost per plate. So does this one, except that it reads the catalogue prices rather than the ones that had been pasted in earlier.",
            width: 2300,
            height: 1438,
          },
        ],
      },
      {
        heading: "The Structure Came Before Any Screen",
        paragraphs: [
          "I first drew the entire thing in the form of a map, specifying nine areas outside of the login, and the point of discussion was which nine.",
          "The Recipe Calculator is on the same level as Orders, even though this only looks correct once you realize that the business sells to restaurants which price their meals on a per-plate basis. Delivery is in charge of the driver interface and location sharing rather than being linked to Orders, since when it matters the driver and the order clerk are two different people using two different phones.",
        ],
        videos: [
          {
            src: "/quickflow-ideation-walkthrough.mp4",
            poster: "/images/business-management/ideation-walkthrough-poster.jpg",
            narrated: true,
            caption:
              "Me working through each role out loud before any screen existed, beginning with the start, then moving on to the products dashboard, the branch at which adding a manufactured product stops acting the same as adding a sourced product, and determining which of those decisions should belong to someone other than the person making the click.",
            width: 1280,
            height: 624,
          },
        ],
        images: [
          {
            src: "/images/business-management/sitemap-refined.webp",
            alt: "Site map: nine top-level areas off the login screen, with Delivery owning the driver interface, location sharing and active deliveries",
            caption:
              "The map that I built from. Delivery has control of the driver interface, the driver and the clerk being two different people.",
            width: 768,
            height: 768,
          },
        ],
      },
      {
        heading: "Orders Are the Product",
        paragraphs: [
          "The part that is at the heart of this business is order management, which therefore takes up the entire screen and the four figures that are important at the top: total, pending, delivered, and revenue.",
          "Each row contains the customer details, the value, the status and the date, and the actions are three separate controls instead of a menu. This is a direct response to the grid the owner had been complaining about, since in that grid the controls appeared to be live and they weren't.",
        ],
        images: [
          {
            src: "/images/business-management/v2/orders.webp",
            alt: "QuickFlow order management: total, pending, delivered and revenue tiles above a recent-orders table with per-row status and actions",
            caption:
              "The word 'Status' is shown so that people do not have to decode a colour in order to read the entry. The figures displayed on screen are demo data and not anything from his accounts.",
            width: 2300,
            height: 1438,
          },
          {
            src: "/images/business-management/v2/customers.webp",
            alt: "The customer directory: total customers, how many hold credit, business types and credit outstanding, above a searchable table of accounts",
            caption:
              "An order must have a customer and a credit account established before it can require anything else. Both of these are found here, and it is the credit column that determines whether or not an order is issued.",
            width: 2300,
            height: 1438,
          },
        ],
      },
      {
        heading: "Recurring Is What a Distributor Runs On",
        paragraphs: [
          "The business tends to receive the same orders every week from the same customers, which is why Harbor Cafe's order day is every Monday and Fresh Seafood's is every second Wednesday.",
          "Recurring schedules form their own area and are not a setting inside an order, and they are made for use on a phone. The person who checks whether the standing orders for Friday have been sent isn't sitting at a desk when they decide to check.",
        ],
        images: [
        ],
      },
      {
        heading: "Built to Be Used From a Phone",
        paragraphs: [
          "All the features, such as recurring schedules, inventory, product edits, analytics, and driver views, have been designed with a phone-width screen in mind. This isn't just a routine check to make sure responsive design is included. In this business, the warehouse, the van, and the office are three separate locations, and only one has a monitor.",
        ],
        imageLayout: "pair",
        images: [
          {
            src: "/images/business-management/v2/mobile-recurring.webp",
            alt: "Recurring orders on a phone, offering to build a schedule from an existing order",
            caption:
              "Every standing order has its own cadence, whether it is active or not, its next delivery date and the items it contains. You check it wherever the question arises, since you rarely have it at your desk.",
            width: 544,
            height: 1177,
          },
          {
            src: "/images/business-management/v2/mobile-products.webp",
            alt: "The product catalogue on a phone: search, category filter, and product cards with price, stock and add-to-order",
            caption: "The stock and price are adjusted where the stock is.",
            width: 544,
            height: 1177,
          },
          {
            src: "/images/business-management/v2/mobile-delivery.webp",
            alt: "The driver interface on a phone: start location sharing, then each active delivery with navigate, call and complete",
            caption:
              "The driver's view was intended to have its own screen, allowing the driver to share their location, navigate, make calls, and record each delivery, with no features from the office view carried over.",
            width: 544,
            height: 1177,
          },
          {
            src: "/images/business-management/v2/mobile-drivers.webp",
            alt: "Driver management on a phone: drivers on the roster, how many are enabled, available or off duty",
            caption:
              "Who is out on a route and who is off duty, answered from a phone, since the one enquiring is generally not at the desk themselves.",
            width: 544,
            height: 1177,
          },
        ],
      },
      {
        heading: "Where It Is",
        paragraphs: [
          "I designed and built it, from the site map through the interface to the final working application, using AI to cover the building tasks I would normally have given to an engineer.",
          "I am intentionally not including an outcome figure for this page, since it resulted from a single conversation with one owner and matches the description he gave. I haven't measured it myself, and a percentage I couldn't justify on a phone call is worth less than saying so.",
          "This one shows only the first part: detecting a real problem in the wild, fixing it with a spreadsheet within a week, and only then doing the proper design.",
        ],
        images: [
          {
            src: "/images/business-management/v2/design-system.webp",
            alt: "QuickFlow's design system page: the type scale ending in \"One ledger.\", primary, secondary and destructive button variants, and the input and badge components",
            caption:
              "The system underneath it, written down. One person still needs the rules, because the alternative is re-deciding what a destructive button looks like every time you need one.",
            width: 2300,
            height: 1438,
          },
        ],
      },
    ]}
  />
);

export default StructuredBusinessManagementCaseStudy;

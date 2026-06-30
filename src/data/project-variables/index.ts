import { ProjectVariable } from "./types";

export const projectVariables: Record<string, ProjectVariable> = {
  "business-management": {
    projectTitle: "WholeTech Operations Platform",
    projectSubtitle: "Saving a $2.8M Distribution Company from Bankruptcy",
    timeline: "4 months (Crisis timeline)",
    role: "Lead UX Designer & Technical Consultant",
    industry: "B2B Distribution & Logistics",
    client: "MetroWholesale Distribution",
    projectLink: "https://barskydesign.pro/business-management",
    
    challenge: {
      heading: "Crisis Management: 90 Days to Prevent Bankruptcy",
      description: "March 2023: A family business hemorrhaging $47,000/month faced closure after three failed software implementations.",
      painPoints: [
        "Frank Morrison (67, owner) was considering bankruptcy after 23 years—three vendors had failed to deliver working solutions",
        "The breaking point: $89,000 order shipped to wrong address, threatening relationship with largest client (40% of revenue)",
        "Real constraints: Part-time IT 'team' (owner's nephew), $15,000 remaining budget, 90 days before bank called loan",
        "Manual cross-referencing of 4 spreadsheets for every order led to 12 errors per week costing thousands"
      ]
    },
    
    process: {
      heading: "Stakeholder Management Under Extreme Pressure",
      description: "When failure means losing a 23-year-old family business, every design decision is life-or-death.",
      steps: [
        "**Crisis Assessment (Week 1-2)**: Spent 3 days in warehouse watching Frank manually cross-reference spreadsheets—discovered vendors replicated chaos instead of fixing it",
        "**Stakeholder Wars (Week 3-6)**: Frank terrified of 'fancy software' after 3 failures; Jake (nephew IT) saw new system as criticism of his Excel mastery",
        "**Trust Building**: Had to prove value with paper prototypes first—Frank wouldn't touch computer until I showed ROI on napkins",
        "**Technical Constraints (Week 7-12)**: Built MVP with no backend—smart forms that looked like their process but eliminated duplication",
        "**Launch Crisis (Week 13-16)**: First week disaster when Jake entered wrong tax codes, nearly lost $12,000; had to add safeguards without offending"
      ],
      keyInnovations: [
        "Designed interface to look exactly like paper forms, then gradually introduced efficiency improvements",
        "Made Jake the 'data migration specialist' to convert resistance into ownership",
        "Translated UX wins into business language for bank meetings ('reduced processing time' = 'faster cash flow')"
      ]
    },
    
    solution: {
      heading: "Gradual Innovation: Familiar Interface, Revolutionary Backend",
      description: "Success came from making powerful technology feel comfortable to a 67-year-old who'd been burned three times.",
      features: [
        "Paper-form UI that prevented errors while maintaining familiar workflow",
        "Integrated inventory, orders, and shipping in one system (previously 4 separate spreadsheets)",
        "Automated error checking that caught mistakes before they became $12,000 problems",
        "Real-time reporting that Jake could use to become the office hero (caught supplier overcharges)",
        "QuickBooks integration that eliminated double-entry and reconciliation headaches"
      ]
    },
    
    results: {
      heading: "From Bankruptcy to Acquisition in 18 Months",
      description: "Numbers tell part of the story. The real victory: Frank took his first vacation in 5 years.",
      metrics: [
        "68% reduction in order errors (from 12 errors/week to 4 errors/month)",
        "45% faster order processing (3.2 hours to 1.8 hours average)",
        "$89,000 revenue recovered through improved client relationships",
        "Frank hired first full-time employee in 3 years"
      ],
      testimonials: [
        "\"Three companies failed us. Hiram didn't just build software—he understood that our livelihood was on the line.\" - Frank Morrison, Owner"
      ],
      longTermImpact: [
        "18-month update: MetroWholesale was acquired by regional distributor",
        "Frank credited the 'computer system that finally worked' as key factor in sale",
        "Jake became local Excel-to-web expert, now consults for other small businesses",
        "Frank still prints digital orders 'just to be safe'—but system prevents wrong entry"
      ]
    },
    
    techStack: ["React", "Node.js", "PostgreSQL", "TypeScript", "QuickBooks API", "PDF Generation"],
    imageConfig: {
      hero: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/warehouse/heroimage.png?v=1",
      challenge: ["https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/warehouse/heroimage.png?v=1"]
    }
  },
  
  "barskyjoint": {
    projectTitle: "BarskyJoint Restaurant Tech",
    projectSubtitle: "Solving the Industry's Oldest UX Problem: One System, Two User Types",
    timeline: "3 months",
    role: "UX Designer & Full-Stack Developer",
    industry: "Food Service Technology",
    client: "BarskyJoint Café (Crown Heights, Brooklyn)",
    projectLink: "https://barskydesign.pro/barskyjoint",
    
    challenge: {
      heading: "The Impossible Choice: Speed vs. Clarity",
      description: "Every restaurant POS forces owners to choose between serving servers or kitchen staff well. BarskyJoint was bleeding $3,200/month from this false choice.",
      painPoints: [
        "Owner David Barsky spending 6 hours/week fixing order mistakes: 'Either I fire someone or I close'",
        "Servers panicked when dine-in orders appeared mixed with DoorDash in same queue",
        "Kitchen staff reading confusing orders: 'Table 7 Burger no pickles ACTUALLY this is delivery to 456 Main St'",
        "Industry reality: Toast, Square, Clover optimize for one use case, making the other painful"
      ]
    },
    
    process: {
      heading: "Stakeholder Wars: When User Needs Conflict",
      description: "Three different user groups with completely opposing needs taught me that compromise pleases nobody.",
      steps: [
        "**Chaos Documentation (Week 1-2)**: Spent lunch rushes watching David manually sort tickets by context—insane during busy weekends",
        "**Stakeholder Conflict (Week 3-4)**: Servers wanted speed/muscle memory; Kitchen wanted clarity/context; David wanted one system",
        "**Failed Compromise (Week 5-6)**: Attempted one interface for all—pleased nobody, optimized for nothing",
        "**Breakthrough (Week 7-8)**: Different contexts need different interfaces running on same data layer",
        "**Reality Check (Week 9-12)**: Kitchen printer died on launch day—had to route everything through tablets, discovered unexpected benefits"
      ],
      keyInnovations: [
        "Dual-interface design: Touch-optimized for servers, text-heavy for kitchen, both using same data",
        "Context-first architecture: Order destination determined interface presentation",
        "Delivery driver interface: Clear pickup status with estimated ready times (unexpected win)"
      ]
    },
    
    solution: {
      heading: "Two UIs, One System: Context-Driven Design",
      description: "Proof that user conflicts aren't always compromises—sometimes they're opportunities for innovation.",
      features: [
        "Server Interface: Touch-optimized visual menu with table assignments prominent",
        "Kitchen Interface: Text-heavy with destination-first layout and prep time estimates",
        "Unified Data Layer: All interfaces update real-time from same order management system",
        "Driver Pickup Interface: Clear order status with estimated ready times",
        "Error Prevention: Context clarity eliminated order mix-ups between dine-in and delivery"
      ]
    },
    
    results: {
      heading: "Industry Recognition: When Small Café Solves Big Tech Problem",
      description: "Success attracted attention from competitors and industry publications—proof the approach works beyond one restaurant.",
      metrics: [
        "28% higher average ticket size (clearer customization reduced ordering friction)",
        "15% faster kitchen times (context clarity eliminated re-reading and confusion)",
        "$3,200/month in error costs eliminated",
        "Zero order mix-ups between dine-in and delivery"
      ],
      testimonials: [
        "\"Finally, technology that actually helps instead of creating new problems.\" - David Barsky, Owner"
      ],
      longTermImpact: [
        "6-month update: BarskyJoint opened second location using same system",
        "Featured in QSR Magazine: 'Small Café Solves Big Tech Problem'",
        "Two competitors reached out asking to license dual-interface approach",
        "David speaking at NYC Restaurant Week about technology solutions"
      ]
    },
    
    techStack: ["React Native", "Node.js", "MongoDB", "WebSocket", "Stripe", "Printer APIs"],
    imageConfig: {
      hero: "/lovable-uploads/c38018a8-f2a2-49ee-ac88-837de2d1e82d.png",
      challenge: ["/lovable-uploads/c38018a8-f2a2-49ee-ac88-837de2d1e82d.png"]
    }
  }
};

export * from "./types";
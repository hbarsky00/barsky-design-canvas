// FAQ content for /store/product/:id pages (rendered via SeoFaqSection in
// ProductDetailsPage.tsx). Rewritten 2026-08-05 (AEO lever 2) — the
// previous content was about hiring Hiram for a design engagement (wrong
// context for a $10 template download page) and carried fabricated numbers
// ("47+ successful projects", "$150-250/hour", "40%+ conversion",
// "WCAG 2.1 AA certified") that violate this project's no-invented-metrics
// standard. Every answer below is a real, checkable fact about how the
// store actually works (Stripe checkout, email delivery — see
// ProductDetails.tsx / StoreSuccess.tsx).

export const homepageFaqs = [
  {
    question: "What do I actually get when I buy a template?",
    answer:
      "A digital download — no physical product, no shipping. After checkout you get an email with a download link to the design files.",
    keywords: ["Digital Download", "Design Templates", "Instant Access"],
  },
  {
    question: "How do I receive the files after purchase?",
    answer:
      "Checkout runs through Stripe. Once payment goes through, you'll get an email with your download link and instructions — no account or login required.",
    keywords: ["Stripe Checkout", "Download Link", "Delivery"],
  },
  {
    question: "Can I use these templates for client work, not just my own portfolio?",
    answer:
      "The templates are a starting structure — case study formats and content templates — meant to be adapted with your own work and voice, not resold as-is. If you need a different license for agency or team use, ask before buying.",
    keywords: ["Usage Rights", "Client Work", "License"],
  },
];

// Kept for backward compatibility with any existing import.
export const seoFaqs = homepageFaqs;

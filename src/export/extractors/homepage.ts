import { getTemplateForPageType } from "../templateRegistry";
import { SectionExport } from "./global";
import { blogPosts } from "@/data/blogData";

export function extractHomepageContent(): SectionExport[] {
  const template = getTemplateForPageType("homepage");
  
  return template.map(section => {
    switch (section.key) {
      case "hero":
        return {
          key: section.key,
          displayName: section.displayName,
          visibility: "rendered" as const,
          fields: {
            h1: "Hiram Barsky",
            h2: "Senior UX Designer",
            h3: "",
            body: "Clifton, NJ",
            bullets: [],
            captions: [],
            formLabels: [],
            tooltips: [
              "Mail",
              "LinkedIn",
              "GitHub", 
              "Calendly"
            ],
            ctas: [
              { label: "Skip to Contact", url: "#contact" }
            ],
            notes: "Profile image, name, title, location, social icons with aria-labels"
          }
        };

      case "case-studies":
        return {
          key: section.key,
          displayName: section.displayName,
          visibility: "rendered" as const,
          fields: {
            h1: "",
            h2: "Case Studies",
            h3: "",
            body: "Recent work in healthcare, fintech, co-parenting, and AI platforms.",
            bullets: [
              "HerbaLink – 3× More Bookings for Certified Herbalists",
              "SplitTime – Simplifying Co-Parenting with Better Planning",
              "Business Management – Streamlined Operations Platform",
              "Investor Loan App – Faster Fintech Underwriting"
            ],
            captions: [],
            formLabels: [],
            tooltips: [],
            ctas: [
              { label: "View HerbaLink", url: "/project/herbalink" },
              { label: "View SplitTime", url: "/project/splittime" },
              { label: "View Business Management", url: "/project/business-management" },
              { label: "View Investor Loan App", url: "/project/investor-loan-app" }
            ],
            notes: "Video case studies section with project titles and descriptions"
          }
        };

      case "recent-adventures":
        return {
          key: section.key,
          displayName: section.displayName,
          visibility: "rendered" as const,
          fields: {
            h1: "",
            h2: "Recent Adventures",
            h3: "",
            body: "A look at some of the teams and projects I've been part of recently.",
            bullets: [
              "Lead Product Designer • Barsky Design • 2020-Present • Building user-centered digital products for healthcare, fintech, and AI platforms",
              "Senior UX Designer • Various Startups • 2018-2020 • Designing mobile-first experiences for emerging technologies"
            ],
            captions: [],
            formLabels: [],
            tooltips: [],
            ctas: [],
            notes: "Professional experience timeline with roles, companies, and descriptions"
          }
        };

      case "bio":
        return {
          key: section.key,
          displayName: section.displayName,
          visibility: "rendered" as const,
          fields: {
            h1: "",
            h2: "Bio",
            h3: "",
            body: "I'm a senior UX/Product Designer with 15+ years of experience creating data-driven, AI-powered, and mobile-first digital platforms. I specialize in healthcare UX, fintech interfaces, and emerging technology integration.",
            bullets: [
              "🎯 User-centered design approach",
              "📱 Mobile-first thinking",
              "🤖 AI integration expertise",
              "🏥 Healthcare UX specialization",
              "💰 Fintech experience"
            ],
            captions: [],
            formLabels: [],
            tooltips: [],
            ctas: [],
            notes: "Personal bio with emojis and key specializations"
          }
        };

      case "contact-form":
        return {
          key: section.key,
          displayName: section.displayName,
          visibility: "rendered" as const,
          fields: {
            h1: "",
            h2: "Get in Touch",
            h3: "",
            body: "Tell me what you're working on and where it's stuck. Short messages are fine.",
            bullets: [],
            captions: [],
            formLabels: [
              "Name",
              "Email", 
              "Company",
              "Project Budget",
              "Message",
              "How did you hear about us?"
            ],
            tooltips: [],
            ctas: [
              { label: "Send Message", url: "#" }
            ],
            notes: "Contact form with validation messages from zod schema"
          }
        };

      case "blog-preview":
        return {
          key: section.key,
          displayName: section.displayName,
          visibility: "rendered" as const,
          fields: {
            h1: "",
            h2: "Latest from the Blog",
            h3: "",
            body: "Thoughts on UX, AI, and design strategy.",
            bullets: blogPosts.slice(0, 3).map(post => `${post.title} — ${post.excerpt}`),
            captions: [],
            formLabels: [],
            tooltips: [],
            ctas: [
              { label: "Read All Posts", url: "/blog" },
              ...blogPosts.slice(0, 3).map(post => ({ label: `Read ${post.title}`, url: `/blog/${post.slug}` }))
            ],
            notes: "Recent blog posts with titles and excerpts"
          }
        };

      case "faq":
        return {
          key: section.key,
          displayName: section.displayName,
          visibility: "conditional" as const,
          fields: {
            h1: "",
            h2: "Frequently Asked Questions",
            h3: "",
            body: "",
            bullets: [
              "What's your design process? — I start with user research and business goals, then iterate through wireframes, prototypes, and testing.",
              "How do you approach AI integration? — I focus on human-centered AI that enhances rather than replaces human decision-making.",
              "What industries do you work with? — I specialize in healthcare, fintech, and emerging technology platforms."
            ],
            captions: [],
            formLabels: [],
            tooltips: [],
            ctas: [],
            notes: "FAQ section - hidden on small screens but present in template"
          }
        };

      case "internal-linking":
        return {
          key: section.key,
          displayName: section.displayName,
          visibility: "rendered" as const,
          fields: {
            h1: "",
            h2: "Explore More",
            h3: "",
            body: "Discover more about my work and process.",
            bullets: [],
            captions: [],
            formLabels: [],
            tooltips: [],
            ctas: [
              { label: "View All Projects", url: "/projects" },
              { label: "Learn About Services", url: "/services" },
              { label: "Read My Story", url: "/about" }
            ],
            notes: "Internal navigation links to key sections"
          }
        };

      default:
        return {
          key: section.key,
          displayName: section.displayName,
          visibility: "hidden" as const,
          fields: {
            h1: "",
            h2: "",
            h3: "",
            body: "",
            bullets: [],
            captions: [],
            formLabels: [],
            tooltips: [],
            ctas: [],
            notes: "<EMPTY SECTION (present in template)>"
          }
        };
    }
  });
}
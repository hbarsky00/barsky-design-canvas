
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders: HeadersInit = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const BASE_URL = "https://barskydesign.pro";
const SITE_NAME = "Barsky Design";
const AUTHOR = "Hiram Barsky";
const DEFAULT_DESC = "Driving Design Strategy & Leadership | Passion for High Craft, Gen AI, Cyber & Fintech";
const DEFAULT_IMAGE = "https://barskydesign.pro/images/hiram-barsky-headshot.jpg";
const TWITTER_HANDLE = "@hirambarsky";

// ── SEO Data Maps (aligned with client seoData.ts) ──────────────────

const STATIC_PAGE_SEO: Record<string, { title: string; description: string; image?: string }> = {
  "/": {
    title: "Hiram Barsky | Lead Product Designer & AI Innovator — Barsky Design",
    description: "Driving Design Strategy & Leadership | Passion for High Craft, Gen AI, Cyber & Fintech | Based in Clifton, NJ",
    image: DEFAULT_IMAGE,
  },
  "/projects": {
    title: "UX Case Studies & Product Design Portfolio — Barsky Design",
    description: "Explore UX case studies in healthcare, fintech, co-parenting, and AI platforms — showcasing measurable impact, user outcomes, and strategic design thinking.",
    image: "https://barskydesign.pro/images/herbalink-desktop-1.webp",
  },
  "/services": {
    title: "Expert UX/UI Design Services | Mobile Apps & Web Development — Barsky Design",
    description: "From user research to high-impact product design, I help teams turn complex ideas into simple, intuitive experiences that drive business results.",
    image: "https://barskydesign.pro/images/macbookpro.png",
  },
  "/contact": {
    title: "Contact Barsky Design | Product Design & UX Consulting in NJ — Barsky Design",
    description: "Ready to transform your product? Book a call to discuss your vision, UX challenges, or collaboration opportunities in Clifton, NJ and beyond.",
    image: DEFAULT_IMAGE,
  },
  "/blog": {
    title: "UX Design Blog | Product Design Insights & Case Studies — Barsky Design",
    description: "Expert insights on UX design, AI integration, design systems, and product strategy — practical lessons from 15+ years in the field.",
    image: "https://barskydesign.pro/images/blog-ai-enhanced-ux.jpg",
  },
  "/about": {
    title: "About Hiram Barsky | 15+ Years Product Design Leadership — Barsky Design",
    description: "Senior UX/Product Designer with 15+ years creating data-driven, AI-powered platforms. Based in Clifton, NJ, serving clients nationwide.",
    image: DEFAULT_IMAGE,
  },
  "/store": {
    title: "Design Resources & Templates | Premium UX Tools — Barsky Design",
    description: "Professional design resources, wireframe kits, and UX templates to accelerate your product development. Digital downloads available instantly.",
    image: DEFAULT_IMAGE,
  },
  "/design-services/ux-ui-design": {
    title: "Expert UX/UI Design Services | User-Centered Product Design — Barsky Design",
    description: "Transform your product with expert UX/UI design. From user research to high-fidelity prototypes, I create intuitive experiences that drive results.",
  },
  "/design-services/mobile-app-design": {
    title: "Mobile App Design Services | iOS & Android UX/UI — Barsky Design",
    description: "Native and cross-platform mobile app design for iOS and Android. User-centered design that increases engagement and app store ratings.",
  },
  "/design-services/web-development": {
    title: "Modern Web Development | React & Frontend Development — Barsky Design",
    description: "Custom web development with React, TypeScript, and modern frameworks. Fast, responsive, and accessible web applications that scale.",
  },
};

const PROJECT_SEO_MAP: Record<string, { title: string; description: string; image: string }> = {
  smarterhealth: {
    title: "Smarter Health | Healthcare App UX Case Study — Barsky Design",
    description: "Healthcare app that made medication tracking 45% faster and appointment adherence 60% higher for diabetic patients through empathy-driven design.",
    image: "https://barskydesign.pro/images/smarterhealth-desktop-1.webp",
  },
  crypto: {
    title: "Crypto Trading Platform | Fintech UX Case Study — Barsky Design",
    description: "How I eliminated the fear that makes 60% of beginners quit before their first trade through trust-building UX design.",
    image: "https://barskydesign.pro/images/crypto-desktop-1.webp",
  },
  herbalink: {
    title: "HerbaLink Healthcare Marketplace | UX Case Study — Barsky Design",
    description: "HIPAA-compliant herbalist marketplace design that increased certified provider bookings 45% and patient retention 30% through trustworthy UX and streamlined scheduling.",
    image: "https://barskydesign.pro/images/herbalink-desktop-1.webp",
  },
  splittime: {
    title: "SplitTime Co-Parenting App | Mobile UX Case Study — Barsky Design",
    description: "Designing a co-parenting platform that reduces family conflict through intuitive scheduling, transparent expense tracking, and secure messaging between divorced parents.",
    image: "https://barskydesign.pro/images/splittime-desktop-1.webp",
  },
  "business-management": {
    title: "Enterprise Operations Platform | B2B UX Case Study — Barsky Design",
    description: "Modular business management platform that reduced manual work 60% by centralizing inventory, workflows, and analytics with actionable insights across teams.",
    image: "https://barskydesign.pro/images/business-management-desktop-1.webp",
  },
  "investor-loan-app": {
    title: "Fintech Loan Platform | Investment App UX Case Study — Barsky Design",
    description: "Streamlined fintech underwriting that cut loan processing time 40% while improving compliance, decision clarity, and borrower experience through better UX.",
    image: "https://barskydesign.pro/images/investor-loan-app-desktop-1.webp",
  },
  "medication-app": {
    title: "Healthcare Medication App | Patient Safety UX Case Study — Barsky Design",
    description: "Mobile-first medication management improving adherence 35% with smart reminders, barcode scanning, and caregiver visibility across iOS and Android.",
    image: "https://barskydesign.pro/images/medication-app-desktop-1.webp",
  },
  gold2crypto: {
    title: "Crypto Exchange Onboarding | Fintech UX Case Study — Barsky Design",
    description: "Reduced crypto exchange drop-off 50% with simplified KYC, progressive disclosure, and clear risk communication for gold-to-cryptocurrency conversion.",
    image: "https://barskydesign.pro/images/gold2crypto-desktop-1.webp",
  },
  "dae-search": {
    title: "Enterprise Data Discovery | Search UX Case Study — Barsky Design",
    description: "Advanced search platform with faceted filters and relevance tuning that helps data analysts find trustworthy assets 3x faster across enterprise sources.",
    image: "https://barskydesign.pro/images/dae-search-desktop-1.webp",
  },
  barskyjoint: {
    title: "Restaurant Ordering System | Food Tech UX Case Study — Barsky Design",
    description: "End-to-end restaurant ordering experience that increased average ticket size 25% through menu clarity, guided customization, and seamless web/kiosk checkout.",
    image: "https://barskydesign.pro/images/barskyjoint-desktop-1.webp",
  },
};

const BLOG_SEO_MAP: Record<string, { title: string; description: string; image: string }> = {
  "finding-first-ux-job-guide": {
    title: "Finding a UX Job in 2025 | Job Search Guide for UX Designers — Barsky Design",
    description: "Practical strategies for landing your first UX job in 2025. Portfolio tips, networking tactics, and insider advice from 15+ years in the field.",
    image: "https://barskydesign.pro/images/blog-finding-ux-job.jpg",
  },
  "design-systems-that-get-used": {
    title: "Building Design Systems That Work | Practical Implementation Guide — Barsky Design",
    description: "Stop building design systems that get ignored. Learn how to create systems teams actually use with practical governance, documentation, and adoption strategies.",
    image: "https://barskydesign.pro/images/blog-design-systems.jpg",
  },
  "portfolio-red-flags-no-interviews": {
    title: "UX Portfolio Red Flags | Why You're Not Getting Interviews — Barsky Design",
    description: "Common UX portfolio mistakes that kill your chances. Learn what hiring managers look for and how to showcase your UX process effectively.",
    image: "https://barskydesign.pro/images/blog-portfolio-red-flags.jpg",
  },
  "ai-enhanced-ux-designer-future": {
    title: "AI in UX Design | How Designers Can Leverage AI Tools — Barsky Design",
    description: "Practical guide to using AI in UX design. From research synthesis to prototyping, learn how AI enhances (not replaces) design work.",
    image: "https://barskydesign.pro/images/blog-ai-enhanced-ux.jpg",
  },
  "user-research-shoestring-budget": {
    title: "Low-Budget User Research | Maximum Impact Methods — Barsky Design",
    description: "Get valuable user insights without big budgets. Guerrilla research tactics, free tools, and lean methods that actually work.",
    image: "https://barskydesign.pro/images/blog-user-research-budget.jpg",
  },
  "built-product-without-real-data": {
    title: "Building Products Without Real Data | UX Research Mistakes — Barsky Design",
    description: "Why assumptions kill products and how to validate ideas with real user data. Learn from common research pitfalls and solutions.",
    image: "https://barskydesign.pro/images/blog-built-product-without-real-data.jpg",
  },
  "building-products-nobody-asked-for": {
    title: "Building Products Nobody Asked For | Product Strategy Lessons — Barsky Design",
    description: "How to avoid building features users don't want. Product strategy insights on user validation, market research, and customer discovery.",
    image: "https://barskydesign.pro/images/blog-building-products-nobody-asked-for.jpg",
  },
  "wireframes-to-wow-visual-hierarchy": {
    title: "Visual Hierarchy in UX Design | From Wireframes to Wow — Barsky Design",
    description: "Master visual hierarchy to guide user attention. Practical tips for typography, spacing, and layout that improve user experience.",
    image: "https://barskydesign.pro/images/blog-wireframes-to-wow-visual-hierarchy.jpg",
  },
  "case-study-writing": {
    title: "UX Case Study Writing | Portfolio That Gets Results — Barsky Design",
    description: "Write case studies that win clients and jobs. Structure, storytelling, and presentation tips from reviewing hundreds of UX portfolios.",
    image: "https://barskydesign.pro/images/blog-case-study-writing.jpg",
  },
  "ai-in-design": {
    title: "Future of AI in Design | Designer's Perspective 2025 — Barsky Design",
    description: "How AI is transforming design work. Practical insights on tools, ethics, and career implications for UX and product designers.",
    image: "https://barskydesign.pro/images/blog-ai-in-design.jpg",
  },
  "beautiful-interface-doesnt-convert": {
    title: "Why Beautiful Interfaces Don't Convert | UX Psychology — Barsky Design",
    description: "Pretty designs don't guarantee conversions. Learn the UX psychology behind why aesthetics alone fail and what actually drives user action.",
    image: "https://barskydesign.pro/images/blog-beautiful-interface.jpg",
  },
  "research-without-users": {
    title: "User Research Without Users | Validation Strategies — Barsky Design",
    description: "How to validate product ideas before you have users. Practical research methods for early-stage products and startups.",
    image: "https://barskydesign.pro/images/blog-research-without-users.jpg",
  },
};

// ── Bot Detection ────────────────────────────────────────────────────

const BOT_UA = [
  /googlebot/i, /bingbot/i, /yandex/i, /baiduspider/i,
  /facebookexternalhit/i, /twitterbot/i, /linkedinbot/i,
  /slackbot/i, /discordbot/i, /pinterest/i, /whatsapp/i,
  /telegrambot/i, /applebot/i, /duckduckbot/i,
  /embedly/i, /skypeuripreview/i, /redditbot/i,
  /ia_archiver/i, /mastodon/i, /gptbot/i, /perplexitybot/i,
  /chatgpt-user/i, /claude-web/i, /anthropic-ai/i,
  /google-inspectiontool/i, /chrome-lighthouse/i,
];

function isBot(ua: string | null, headers: Headers): boolean {
  if (!ua) return false;
  if (headers.get("x-scrape-preview")) return true;
  return BOT_UA.some((re) => re.test(ua));
}

// ── Helpers ──────────────────────────────────────────────────────────

function toAbsoluteImage(url?: string): string {
  if (!url) return DEFAULT_IMAGE;
  if (/^https?:\/\//i.test(url)) return url;
  const path = url.startsWith("/") ? url : `/${url}`;
  return `${BASE_URL}${path}`;
}

function titleCaseFromSlug(slug: string): string {
  return slug.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, (m) => m.toUpperCase());
}

function normalizeCanonicalUrl(path: string): string {
  const aliases: Record<string, string> = {
    "/project/wholesale-distribution": "/project/business-management",
  };
  path = aliases[path] || path;
  let clean = path.startsWith("/") ? path : `/${path}`;
  if (clean === "/" || clean === "/index.html") return `${BASE_URL}/`;
  clean = clean.replace(/\/index\.html?$/i, "/");
  if (clean !== "/" && clean.endsWith("/")) clean = clean.slice(0, -1);
  return `${BASE_URL}${clean}`;
}

function resolveCanonical(urlParam: string | null, pathParam: string | null): string {
  if (urlParam) {
    try { return normalizeCanonicalUrl(new URL(urlParam).pathname); } catch (_) { /* fall through */ }
  }
  const path = pathParam ? (pathParam.startsWith("/") ? pathParam : `/${pathParam}`) : "/";
  return normalizeCanonicalUrl(path);
}

// ── SEO Resolution ──────────────────────────────────────────────────

function getSeoForPath(pathname: string) {
  const clean = pathname === "/" || pathname === "" ? "/" : pathname.replace(/\/+$/, "");
  let title = `Hiram Barsky | Lead Product Designer — ${SITE_NAME}`;
  let description = DEFAULT_DESC;
  let image = DEFAULT_IMAGE;
  let type: "website" | "article" = "website";

  if (STATIC_PAGE_SEO[clean]) {
    const s = STATIC_PAGE_SEO[clean];
    return { title: s.title, description: s.description, image: toAbsoluteImage(s.image), type };
  }

  if (clean.startsWith("/project/")) {
    const slug = clean.replace("/project/", "");
    const p = PROJECT_SEO_MAP[slug];
    if (p) return { title: p.title, description: p.description, image: toAbsoluteImage(p.image), type: "article" as const };
    return { title: `${titleCaseFromSlug(slug)} — Case Study | ${SITE_NAME}`, description: `Case study: ${titleCaseFromSlug(slug)}.`, image, type: "article" as const };
  }

  if (clean.startsWith("/blog/")) {
    const slug = clean.replace("/blog/", "");
    const b = BLOG_SEO_MAP[slug];
    if (b) return { title: b.title, description: b.description, image: toAbsoluteImage(b.image), type: "article" as const };
    return { title: `${titleCaseFromSlug(slug)} — ${SITE_NAME}`, description: `Article: ${titleCaseFromSlug(slug)}.`, image, type: "article" as const };
  }

  if (clean.startsWith("/design-services/")) {
    const sub = clean.replace("/design-services/", "");
    const s = STATIC_PAGE_SEO[clean];
    if (s) return { title: s.title, description: s.description, image: toAbsoluteImage(s.image), type };
    return { title: `${titleCaseFromSlug(sub)} — ${SITE_NAME}`, description: `Design service: ${titleCaseFromSlug(sub)}.`, image, type };
  }

  return { title, description, image, type };
}

// ── HTML Builder ────────────────────────────────────────────────────

function escapeHtml(s: string) {
  return s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function buildHtml({ title, description, canonical, image, type }: { title: string; description: string; canonical: string; image: string; type: "website" | "article" }) {
  const isArticle = type === "article";
  const jsonLd = isArticle
    ? { "@context": "https://schema.org", "@type": "Article", headline: title, description, url: canonical, image, author: { "@type": "Person", name: AUTHOR } }
    : { "@context": "https://schema.org", "@type": "WebPage", name: title, description, url: canonical, image, author: { "@type": "Person", name: AUTHOR, url: BASE_URL } };

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}"/>
  <link rel="canonical" href="${escapeHtml(canonical)}"/>
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"/>
  <meta name="author" content="${AUTHOR}"/>

  <meta property="og:type" content="${type}"/>
  <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}"/>
  <meta property="og:title" content="${escapeHtml(title)}"/>
  <meta property="og:description" content="${escapeHtml(description)}"/>
  <meta property="og:url" content="${escapeHtml(canonical)}"/>
  <meta property="og:image" content="${escapeHtml(image)}"/>
  <meta property="og:image:width" content="1200"/>
  <meta property="og:image:height" content="630"/>
  <meta property="og:locale" content="en_US"/>

  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:site" content="${TWITTER_HANDLE}"/>
  <meta name="twitter:creator" content="${TWITTER_HANDLE}"/>
  <meta name="twitter:title" content="${escapeHtml(title)}"/>
  <meta name="twitter:description" content="${escapeHtml(description)}"/>
  <meta name="twitter:image" content="${escapeHtml(image)}"/>

  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body>
  <h1>${escapeHtml(title)}</h1>
  <p>${escapeHtml(description)}</p>
  <p><a href="${escapeHtml(canonical)}">Visit page</a></p>
</body>
</html>`;
}

// ── Main Handler ────────────────────────────────────────────────────

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const ua = req.headers.get("user-agent");
    const targetUrlParam = url.searchParams.get("url");
    const pathParam = url.searchParams.get("path");
    
    const canonical = resolveCanonical(targetUrlParam, pathParam);
    const pathname = new URL(canonical).pathname;

    // Try Supabase first, fall back to hardcoded maps
    let seoConfig: { title: string; description: string; image: string; type: "website" | "article" };

    try {
      let slug = pathname === "/" ? "home" : pathname.replace(/^\//, "").replace(/\/$/, "");
      if (pathname.startsWith("/project/")) slug = pathname.split("/project/")[1];
      else if (pathname.startsWith("/blog/")) slug = pathname.split("/blog/")[1];

      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const client = createClient(supabaseUrl, supabaseKey);
      const { data } = await client.from("seo_meta").select("*").eq("slug", slug).maybeSingle();

      if (data?.title) {
        seoConfig = {
          title: data.title,
          description: data.description || DEFAULT_DESC,
          image: toAbsoluteImage(data.og_image || DEFAULT_IMAGE),
          type: (data.path_type === "post" || data.path_type === "project") ? "article" : "website",
        };
        console.log("✅ seo-handler DB hit:", slug);
      } else {
        seoConfig = getSeoForPath(pathname);
        console.log("⚠️ seo-handler fallback:", slug);
      }
    } catch (dbErr) {
      console.error("DB error, using fallback:", dbErr);
      seoConfig = getSeoForPath(pathname);
    }

    const html = buildHtml({ ...seoConfig, canonical });

    // For bots: return full HTML; for humans: JSON summary
    if (isBot(ua, req.headers)) {
      return new Response(html, {
        headers: { ...corsHeaders, "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=14400, s-maxage=14400, stale-while-revalidate=86400" },
      });
    }

    // Non-bot: return JSON for debugging
    return new Response(JSON.stringify({ title: seoConfig.title, description: seoConfig.description, canonical, image: seoConfig.image, type: seoConfig.type }), {
      headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "public, max-age=3600" },
    });
  } catch (e) {
    console.error("seo-handler error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});

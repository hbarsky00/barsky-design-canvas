// seo-handler — serves SEO metadata for crawlers
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const BASE_URL = "https://barskydesign.pro";
const SITE_NAME = "Barsky Design";
const AUTHOR = "Hiram Barsky";
const DEFAULT_DESC =
  "Driving Design Strategy & Leadership | Passion for High Craft, Gen AI, Cyber & Fintech";
const DEFAULT_IMAGE =
  "https://barskydesign.pro/images/hiram-barsky-headshot.jpg";
const TWITTER_HANDLE = "@hirambarsky";

/* ── SEO Data ─────────────────────────────────────────────────────── */

const STATIC_SEO: Record<string, { title: string; description: string; image?: string }> = {
  "/": { title: "Hiram Barsky | Lead Product Designer & AI Innovator — Barsky Design", description: "Driving Design Strategy & Leadership | Passion for High Craft, Gen AI, Cyber & Fintech | Based in Clifton, NJ", image: DEFAULT_IMAGE },
  "/projects": { title: "UX Case Studies & Product Design Portfolio — Barsky Design", description: "Explore UX case studies in healthcare, fintech, co-parenting, and AI platforms.", image: "https://barskydesign.pro/images/herbalink-desktop-1.webp" },
  "/services": { title: "Expert UX/UI Design Services | Mobile Apps & Web Development — Barsky Design", description: "From user research to high-impact product design, I help teams turn complex ideas into simple, intuitive experiences.", image: "https://barskydesign.pro/images/macbookpro.png" },
  "/contact": { title: "Contact Barsky Design | Product Design & UX Consulting in NJ — Barsky Design", description: "Ready to transform your product? Book a call to discuss your vision, UX challenges, or collaboration opportunities.", image: DEFAULT_IMAGE },
  "/blog": { title: "UX Design Blog | Product Design Insights & Case Studies — Barsky Design", description: "Expert insights on UX design, AI integration, design systems, and product strategy.", image: "https://barskydesign.pro/images/blog-ai-enhanced-ux.jpg" },
  "/about": { title: "About Hiram Barsky | 15+ Years Product Design Leadership — Barsky Design", description: "Senior UX/Product Designer with 15+ years creating data-driven, AI-powered platforms.", image: DEFAULT_IMAGE },
  "/store": { title: "Design Resources & Templates | Premium UX Tools — Barsky Design", description: "Professional design resources, wireframe kits, and UX templates.", image: DEFAULT_IMAGE },
  "/design-services/ux-ui-design": { title: "Expert UX/UI Design Services | User-Centered Product Design — Barsky Design", description: "Transform your product with expert UX/UI design. From user research to high-fidelity prototypes." },
  "/design-services/mobile-app-design": { title: "Mobile App Design Services | iOS & Android UX/UI — Barsky Design", description: "Native and cross-platform mobile app design for iOS and Android." },
  "/design-services/web-development": { title: "Modern Web Development | React & Frontend Development — Barsky Design", description: "Custom web development with React, TypeScript, and modern frameworks." },
};

const PROJECT_SEO: Record<string, { title: string; description: string; image: string }> = {
  smarterhealth: { title: "Smarter Health | Healthcare App UX Case Study — Barsky Design", description: "Healthcare app that made medication tracking 45% faster and appointment adherence 60% higher.", image: "https://barskydesign.pro/images/smarterhealth-desktop-1.webp" },
  crypto: { title: "Crypto Trading Platform | Fintech UX Case Study — Barsky Design", description: "How I eliminated the fear that makes 60% of beginners quit before their first trade.", image: "https://barskydesign.pro/images/crypto-desktop-1.webp" },
  herbalink: { title: "HerbaLink Healthcare Marketplace | UX Case Study — Barsky Design", description: "HIPAA-compliant herbalist marketplace design that increased certified provider bookings 45%.", image: "https://barskydesign.pro/images/herbalink-desktop-1.webp" },
  splittime: { title: "SplitTime Co-Parenting App | Mobile UX Case Study — Barsky Design", description: "Designing a co-parenting platform that reduces family conflict through intuitive scheduling.", image: "https://barskydesign.pro/images/splittime-desktop-1.webp" },
  "business-management": { title: "Enterprise Operations Platform | B2B UX Case Study — Barsky Design", description: "Modular business management platform that reduced manual work 60%.", image: "https://barskydesign.pro/images/business-management-desktop-1.webp" },
  "investor-loan-app": { title: "Fintech Loan Platform | Investment App UX Case Study — Barsky Design", description: "Streamlined fintech underwriting that cut loan processing time 40%.", image: "https://barskydesign.pro/images/investor-loan-app-desktop-1.webp" },
  "medication-app": { title: "Healthcare Medication App | Patient Safety UX Case Study — Barsky Design", description: "Mobile-first medication management improving adherence 35%.", image: "https://barskydesign.pro/images/medication-app-desktop-1.webp" },
  gold2crypto: { title: "Crypto Exchange Onboarding | Fintech UX Case Study — Barsky Design", description: "Reduced crypto exchange drop-off 50% with simplified KYC.", image: "https://barskydesign.pro/images/gold2crypto-desktop-1.webp" },
  "dae-search": { title: "Enterprise Data Discovery | Search UX Case Study — Barsky Design", description: "Advanced search platform that helps data analysts find assets 3x faster.", image: "https://barskydesign.pro/images/dae-search-desktop-1.webp" },
  barskyjoint: { title: "Restaurant Ordering System | Food Tech UX Case Study — Barsky Design", description: "End-to-end restaurant ordering experience that increased average ticket size 25%.", image: "https://barskydesign.pro/images/barskyjoint-desktop-1.webp" },
};

const BLOG_SEO: Record<string, { title: string; description: string; image: string }> = {
  "finding-first-ux-job-guide": { title: "Finding a UX Job in 2025 | Job Search Guide — Barsky Design", description: "Practical strategies for landing your first UX job in 2025.", image: "https://barskydesign.pro/images/blog-finding-ux-job.jpg" },
  "design-systems-that-get-used": { title: "Building Design Systems That Work — Barsky Design", description: "Stop building design systems that get ignored.", image: "https://barskydesign.pro/images/blog-design-systems.jpg" },
  "portfolio-red-flags-no-interviews": { title: "UX Portfolio Red Flags | Why You're Not Getting Interviews — Barsky Design", description: "Common UX portfolio mistakes that kill your chances.", image: "https://barskydesign.pro/images/blog-portfolio-red-flags.jpg" },
  "ai-enhanced-ux-designer-future": { title: "AI in UX Design | How Designers Can Leverage AI Tools — Barsky Design", description: "Practical guide to using AI in UX design.", image: "https://barskydesign.pro/images/blog-ai-enhanced-ux.jpg" },
  "user-research-shoestring-budget": { title: "Low-Budget User Research | Maximum Impact Methods — Barsky Design", description: "Get valuable user insights without big budgets.", image: "https://barskydesign.pro/images/blog-user-research-budget.jpg" },
  "built-product-without-real-data": { title: "Building Products Without Real Data — Barsky Design", description: "Why assumptions kill products and how to validate ideas.", image: "https://barskydesign.pro/images/blog-built-product-without-real-data.jpg" },
  "building-products-nobody-asked-for": { title: "Building Products Nobody Asked For — Barsky Design", description: "How to avoid building features users don't want.", image: "https://barskydesign.pro/images/blog-building-products-nobody-asked-for.jpg" },
  "wireframes-to-wow-visual-hierarchy": { title: "Visual Hierarchy in UX Design | From Wireframes to Wow — Barsky Design", description: "Master visual hierarchy to guide user attention.", image: "https://barskydesign.pro/images/blog-wireframes-to-wow-visual-hierarchy.jpg" },
  "case-study-writing": { title: "UX Case Study Writing | Portfolio That Gets Results — Barsky Design", description: "Write case studies that win clients and jobs.", image: "https://barskydesign.pro/images/blog-case-study-writing.jpg" },
  "ai-in-design": { title: "Future of AI in Design | Designer's Perspective 2025 — Barsky Design", description: "How AI is transforming design work.", image: "https://barskydesign.pro/images/blog-ai-in-design.jpg" },
  "beautiful-interface-doesnt-convert": { title: "Why Beautiful Interfaces Don't Convert — Barsky Design", description: "Pretty designs don't guarantee conversions.", image: "https://barskydesign.pro/images/blog-beautiful-interface.jpg" },
  "research-without-users": { title: "User Research Without Users — Barsky Design", description: "How to validate product ideas before you have users.", image: "https://barskydesign.pro/images/blog-research-without-users.jpg" },
};

/* ── Bot Detection ────────────────────────────────────────────────── */

const BOT_RE = /googlebot|bingbot|yandex|baiduspider|facebookexternalhit|twitterbot|linkedinbot|slackbot|discordbot|pinterest|whatsapp|telegrambot|applebot|duckduckbot|gptbot|perplexitybot|chatgpt-user|claude-web|anthropic-ai|google-inspectiontool|chrome-lighthouse/i;

function isBot(ua: string | null, headers: Headers): boolean {
  if (!ua) return false;
  if (headers.get("x-scrape-preview")) return true;
  return BOT_RE.test(ua);
}

/* ── Helpers ──────────────────────────────────────────────────────── */

function toAbsImg(url?: string): string {
  if (!url) return DEFAULT_IMAGE;
  if (/^https?:\/\//i.test(url)) return url;
  return `${BASE_URL}${url.startsWith("/") ? url : "/" + url}`;
}

function titleCase(slug: string): string {
  return slug.replace(/[-_]+/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

function normCanonical(path: string): string {
  const aliases: Record<string, string> = { "/project/wholesale-distribution": "/project/business-management" };
  let p = aliases[path] || path;
  if (!p.startsWith("/")) p = "/" + p;
  if (p === "/" || p === "/index.html") return `${BASE_URL}/`;
  p = p.replace(/\/index\.html?$/i, "/");
  if (p !== "/" && p.endsWith("/")) p = p.slice(0, -1);
  return `${BASE_URL}${p}`;
}

function getSeo(pathname: string) {
  const clean = pathname === "/" || pathname === "" ? "/" : pathname.replace(/\/+$/, "");
  const fallback = { title: `Hiram Barsky | Lead Product Designer — ${SITE_NAME}`, description: DEFAULT_DESC, image: DEFAULT_IMAGE, type: "website" as const };

  if (STATIC_SEO[clean]) {
    const s = STATIC_SEO[clean];
    return { title: s.title, description: s.description, image: toAbsImg(s.image), type: "website" as const };
  }
  if (clean.startsWith("/project/")) {
    const slug = clean.replace("/project/", "");
    const p = PROJECT_SEO[slug];
    if (p) return { title: p.title, description: p.description, image: toAbsImg(p.image), type: "article" as const };
    return { title: `${titleCase(slug)} — Case Study | ${SITE_NAME}`, description: `Case study: ${titleCase(slug)}.`, image: DEFAULT_IMAGE, type: "article" as const };
  }
  if (clean.startsWith("/blog/")) {
    const slug = clean.replace("/blog/", "");
    const b = BLOG_SEO[slug];
    if (b) return { title: b.title, description: b.description, image: toAbsImg(b.image), type: "article" as const };
    return { title: `${titleCase(slug)} — ${SITE_NAME}`, description: `Article: ${titleCase(slug)}.`, image: DEFAULT_IMAGE, type: "article" as const };
  }
  if (clean.startsWith("/design-services/")) {
    const s = STATIC_SEO[clean];
    if (s) return { title: s.title, description: s.description, image: toAbsImg(s.image), type: "website" as const };
    const sub = clean.replace("/design-services/", "");
    return { title: `${titleCase(sub)} — ${SITE_NAME}`, description: `Design service: ${titleCase(sub)}.`, image: DEFAULT_IMAGE, type: "website" as const };
  }
  return fallback;
}

/* ── HTML Builder ─────────────────────────────────────────────────── */

function esc(s: string) {
  return s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function buildHtml(title: string, description: string, canonical: string, image: string, type: string) {
  const isArticle = type === "article";
  const jsonLd = isArticle
    ? { "@context": "https://schema.org", "@type": "Article", headline: title, description, url: canonical, image, author: { "@type": "Person", name: AUTHOR } }
    : { "@context": "https://schema.org", "@type": "WebPage", name: title, description, url: canonical, image, author: { "@type": "Person", name: AUTHOR, url: BASE_URL } };

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}"/>
  <link rel="canonical" href="${esc(canonical)}"/>
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"/>
  <meta name="author" content="${AUTHOR}"/>
  <meta property="og:type" content="${type}"/>
  <meta property="og:site_name" content="${esc(SITE_NAME)}"/>
  <meta property="og:title" content="${esc(title)}"/>
  <meta property="og:description" content="${esc(description)}"/>
  <meta property="og:url" content="${esc(canonical)}"/>
  <meta property="og:image" content="${esc(image)}"/>
  <meta property="og:image:width" content="1200"/>
  <meta property="og:image:height" content="630"/>
  <meta property="og:locale" content="en_US"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:site" content="${TWITTER_HANDLE}"/>
  <meta name="twitter:creator" content="${TWITTER_HANDLE}"/>
  <meta name="twitter:title" content="${esc(title)}"/>
  <meta name="twitter:description" content="${esc(description)}"/>
  <meta name="twitter:image" content="${esc(image)}"/>
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body>
  <h1>${esc(title)}</h1>
  <p>${esc(description)}</p>
  <p><a href="${esc(canonical)}">Visit page</a></p>
</body>
</html>`;
}

/* ── Main Handler ─────────────────────────────────────────────────── */

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const ua = req.headers.get("user-agent");
    const targetUrl = url.searchParams.get("url");
    const pathParam = url.searchParams.get("path");

    // Resolve canonical
    let pathname = "/";
    if (targetUrl) {
      try { pathname = new URL(targetUrl).pathname; } catch (_) { /* ignore */ }
    } else if (pathParam) {
      pathname = pathParam.startsWith("/") ? pathParam : "/" + pathParam;
    }
    const canonical = normCanonical(pathname);
    pathname = new URL(canonical).pathname;

    // Try DB first, fall back to hardcoded maps
    let seo: { title: string; description: string; image: string; type: "website" | "article" };

    try {
      let slug = pathname === "/" ? "home" : pathname.replace(/^\//, "").replace(/\/$/, "");
      if (pathname.startsWith("/project/")) slug = pathname.split("/project/")[1];
      else if (pathname.startsWith("/blog/")) slug = pathname.split("/blog/")[1];

      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const client = createClient(supabaseUrl, supabaseKey);
      const { data } = await client.from("seo_meta").select("*").eq("slug", slug).maybeSingle();

      if (data?.title) {
        seo = {
          title: data.title,
          description: data.description || DEFAULT_DESC,
          image: toAbsImg(data.og_image),
          type: (data.path_type === "post" || data.path_type === "project") ? "article" : "website",
        };
        console.log("seo-handler DB hit:", slug);
      } else {
        seo = getSeo(pathname);
        console.log("seo-handler fallback:", slug);
      }
    } catch (dbErr) {
      console.error("DB error, using fallback:", dbErr);
      seo = getSeo(pathname);
    }

    const html = buildHtml(seo.title, seo.description, canonical, seo.image, seo.type);

    if (isBot(ua, req.headers)) {
      return new Response(html, {
        headers: { ...corsHeaders, "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=14400, s-maxage=14400" },
      });
    }

    return new Response(JSON.stringify({ title: seo.title, description: seo.description, canonical, image: seo.image, type: seo.type }), {
      headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "public, max-age=3600" },
    });
  } catch (e) {
    console.error("seo-handler error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});


import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

// Public SEO Edge Function - UNIFIED VERSION
// - Uses shared SEO data sources for consistency
// - Enhanced bot detection with cache headers
// - Consistent canonical URL normalization
// - Full article meta support

const corsHeaders: HeadersInit = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Configure your production base URL here (fallback used when only `path` is provided)
const BASE_URL = "https://barskydesign.pro";
const SITE_NAME = "Hiram Barsky – Product Designer & Gen AI Developer";
const DEFAULT_DESC =
  "Transforming complex problems into intuitive digital experiences with data-driven design and AI-powered solutions.";
const DEFAULT_IMAGE =
  "https://barskydesign.pro/images/hiram-barsky-profile.jpg";

// Unified SEO data mappings - shared with client
const STATIC_PAGE_SEO: Record<string, { title: string; description: string; image?: string }> = {
  "/": { title: SITE_NAME, description: DEFAULT_DESC, image: DEFAULT_IMAGE },
  "/projects": {
    title: "Design Case Studies – Barsky Design",
    description: "Explore UX case studies in healthcare, fintech, co-parenting, and AI platforms — showcasing impact, outcomes, and design thinking.",
    image: "https://barskydesign.pro/images/herbalink-desktop-1.webp",
  },
  "/services": {
    title: "UX & Product Design Services – Barsky Design",
    description: "From user research to high-impact product design, I help teams turn complex ideas into simple, intuitive experiences.",
  },
  "/about": {
    title: "About Hiram Barsky – Product Designer",
    description: "Senior UX/Product Designer with 15+ years of experience creating data-driven, AI-powered, and mobile-first digital platforms.",
  },
  "/blog": {
    title: "Design Insights & Case Studies – Barsky Blog",
    description: "Thoughts on UX, AI, and design strategy — lessons learned from projects and experiments.",
    image: "https://barskydesign.pro/images/blog-ai-enhanced-ux.jpg",
  },
  "/contact": {
    title: "Contact Hiram Barsky – Product Designer",
    description: "Let's connect. Book a call to discuss your product vision, UX challenges, or collaboration opportunities.",
  },
};

const PROJECT_SEO_MAP: Record<string, { title: string; description: string; image: string }> = {
  herbalink: {
    title: "HerbaLink – Herbalist Marketplace Case Study",
    description: "How I designed a HIPAA-conscious marketplace that increased certified herbalist bookings and patient retention through trustworthy UX and streamlined scheduling.",
    image: "https://barskydesign.pro/images/herbalink-desktop-1.webp"
  },
  splittime: {
    title: "SplitTime – Co‑Parenting Planner Case Study",
    description: "A thoughtful co‑parenting app that reduces conflict with shared calendars, smart reminders, and transparent expense tracking designed for real families facing complex schedules.",
    image: "https://barskydesign.pro/images/splittime-desktop-1.webp"
  },
  "business-management": {
    title: "Business Management – Operations Platform Case Study",
    description: "Designing a modular operations platform that centralizes inventory, workflows, and analytics to cut manual work, create visibility across teams, and surface actionable insights.",
    image: "https://barskydesign.pro/images/business-management-desktop-1.webp"
  },
  "investor-loan-app": {
    title: "Investor Loan App – Fintech Case Study",
    description: "Streamlined underwriting flows and data collection that cut loan processing time by 40% while improving compliance, decision clarity, internal collaboration, and borrower experience.",
    image: "https://barskydesign.pro/images/investor-loan-app-desktop-1.webp"
  },
  "medication-app": {
    title: "Medication App – Adherence & Safety Case Study",
    description: "Mobile-first medication management that improves adherence with contextual reminders, clear scanning, accessible affordances, and caregiver visibility across devices and roles.",
    image: "https://barskydesign.pro/images/medication-app-desktop-1.webp"
  },
  gold2crypto: {
    title: "Gold2Crypto – Exchange Onboarding Case Study",
    description: "Reducing drop‑off with plain‑language KYC, progressive disclosure, and clear risk cues to help users confidently convert assets between gold and crypto with fewer errors.",
    image: "https://barskydesign.pro/images/gold2crypto-desktop-1.webp"
  },
  "dae-search": {
    title: "DAE Search – Data Discovery Case Study",
    description: "A powerful search experience with faceted filters, previews, and relevance tuning that helps analysts find trustworthy data assets quickly and consistently across sources.",
    image: "https://barskydesign.pro/images/dae-search-desktop-1.webp"
  },
  barskyjoint: {
    title: "BarskyJoint – Restaurant Ordering Case Study",
    description: "Designed an end‑to‑end ordering experience that increases average ticket size with menu clarity, guided customization, and seamless checkout across web and kiosk.",
    image: "https://barskydesign.pro/images/barskyjoint-desktop-1.webp"
  },
};

const BLOG_IMAGE_MAP: Record<string, string> = {
  "finding-first-ux-job-guide": "https://barskydesign.pro/images/blog-finding-ux-job.jpg",
  "design-systems-that-get-used": "https://barskydesign.pro/images/blog-design-systems.jpg",
  "portfolio-red-flags-no-interviews": "https://barskydesign.pro/images/blog-portfolio-red-flags.jpg",
  "ai-enhanced-ux-designer-future": "https://barskydesign.pro/images/blog-ai-enhanced-ux.jpg",
  "user-research-shoestring-budget": "https://barskydesign.pro/images/blog-user-research-budget.jpg",
  "built-product-without-real-data": "https://barskydesign.pro/images/blog-built-product-without-real-data.jpg",
  "building-products-nobody-asked-for": "https://barskydesign.pro/images/blog-building-products-nobody-asked-for.jpg",
  "wireframes-to-wow-visual-hierarchy": "https://barskydesign.pro/images/blog-wireframes-to-wow-visual-hierarchy.jpg",
  "case-study-writing": "https://barskydesign.pro/images/blog-case-study-writing.jpg",
  "ai-in-design": "https://barskydesign.pro/images/blog-ai-in-design.jpg"
};
function toAbsoluteImage(url: string): string {
  if (!url) return DEFAULT_IMAGE;
  if (/^https?:\/\//i.test(url)) return url;
  // Ensure we have a single leading slash
  const path = url.startsWith("/") ? url : `/${url}`;
  return `${BASE_URL}${path}`;
}

const BOT_UA = [
  /facebookexternalhit/i,
  /Twitterbot/i,
  /LinkedInBot/i,
  /Slackbot/i,
  /Discordbot/i,
  /Pinterest/i,
  /Googlebot/i,
  /bingbot/i,
  /DuckDuckBot/i,
  /Embedly/i,
  /WhatsApp/i,
  /TelegramBot/i,
  /SkypeUriPreview/i,
  /AppleBot/i,
  /ia_archiver/i,
  /Mastodon/i,
  /RedditBot/i,
];

function isBot(userAgent: string | null, headers: Headers): boolean {
  if (!userAgent) return false;
  
  // Check for manual scraping header (for testing)
  if (headers.get('x-scrape-preview')) return true;
  
  return BOT_UA.some((re) => re.test(userAgent));
}

function titleCaseFromSlug(slug: string): string {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

function resolveCanonical(urlParam: string | null, pathParam: string | null): string {
  if (urlParam) {
    try {
      const u = new URL(urlParam);
      return normalizeCanonicalUrl(u.pathname);
    } catch (_) {
      // ignore and fall back below
    }
  }
  const path = pathParam ? (pathParam.startsWith("/") ? pathParam : `/${pathParam}`) : "/";
  return normalizeCanonicalUrl(path);
}

function normalizeCanonicalUrl(path: string): string {
  // Handle aliases
  const aliases: Record<string, string> = {
    '/project/wholesale-distribution': '/project/business-management'
  };
  path = aliases[path] || path;
  
  // Clean the path first
  let cleanPath = path;
  
  // Ensure path starts with /
  if (!cleanPath.startsWith('/')) {
    cleanPath = `/${cleanPath}`;
  }
  
  // Handle root path - should be just /
  if (cleanPath === '/' || cleanPath === '/index.html' || cleanPath === '/index.htm') {
    return `${BASE_URL}/`;
  }
  
  // Remove trailing index.html variations
  cleanPath = cleanPath.replace(/\/index\.html?$/i, '/');
  
  // Remove trailing slashes for consistency (except root)
  if (cleanPath !== '/' && cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1);
  }
  
  return `${BASE_URL}${cleanPath}`;
}

function getSeoForPath(pathname: string) {
  // Normalize path
  const clean = pathname === "/" || pathname === "" ? "/" : pathname.replace(/\/+$/, "");

  // Defaults
  let title = `${SITE_NAME} — Portfolio`;
  let description = DEFAULT_DESC;
  let image = DEFAULT_IMAGE;
  let type: "website" | "article" = "website";

  // Handle static pages first
  if (STATIC_PAGE_SEO[clean]) {
    const staticSeo = STATIC_PAGE_SEO[clean];
    title = staticSeo.title;
    description = staticSeo.description;
    image = staticSeo.image ? toAbsoluteImage(staticSeo.image) : DEFAULT_IMAGE;
    return { title, description, image, type };
  }

  // Project detail
  if (clean.startsWith("/project/")) {
    const slug = clean.replace("/project/", "");
    const mappedProject = PROJECT_SEO_MAP[slug];
    
    if (mappedProject) {
      title = mappedProject.title;
      description = mappedProject.description;
      image = toAbsoluteImage(mappedProject.image);
      type = "article";
    } else {
      const human = titleCaseFromSlug(slug || "Case Study");
      title = `${human} — Case Study | ${SITE_NAME}`;
      description = `Case study: ${human}. Outcomes, process, metrics, and visuals.`;
      type = "article";
    }
    
    return { title, description, image, type };
  }

  // Blog post
  if (clean.startsWith("/blog/")) {
    const slug = clean.replace("/blog/", "");
    const human = titleCaseFromSlug(slug || "Article");
    title = `${human} — ${SITE_NAME}`;
    description = `Article: ${human} — insights on product design and AI.`;
    type = "article";
    
    const mapped = BLOG_IMAGE_MAP[slug];
    image = mapped ? toAbsoluteImage(mapped) : DEFAULT_IMAGE;
    return { title, description, image, type };
  }

  // Design services (legacy support)
  if (clean === "/design-services" || clean.startsWith("/design-services/")) {
    const sub = clean === "/design-services" ? "" : clean.replace("/design-services/", "");
    const human = sub ? titleCaseFromSlug(sub) : "Design Services";
    title = sub ? `Design Services: ${human} — ${SITE_NAME}` : `Design Services — ${SITE_NAME}`;
    description = sub
      ? `${human} service details, outcomes, and approach.`
      : "UX research, design systems, prototypes, and AI-assisted delivery.";
    image = DEFAULT_IMAGE;
    return { title, description, image, type };
  }

  // Contact catch-all
  if (clean.includes("contact")) {
    title = `Contact — ${SITE_NAME}`;
    description = `Get in touch to discuss product design, UX, and AI initiatives.`;
    image = DEFAULT_IMAGE;
    return { title, description, image, type };
  }

  // Fallback
  return { title, description, image, type };
}

function buildHtml({
  title,
  description,
  canonical,
  image,
  type,
}: {
  title: string;
  description: string;
  canonical: string;
  image: string;
  type: "website" | "article";
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "Article" : "WebPage",
    name: title,
    description,
    url: canonical,
    image,
  } as Record<string, unknown>;

  const imageAlt = `${title} preview image`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${escapeAttr(canonical)}" />

  <!-- Open Graph -->
  <meta property="og:type" content="${type === "article" ? "article" : "website"}" />
  <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${escapeAttr(canonical)}" />
  <meta property="og:image" content="${escapeAttr(image)}" />
  <meta property="og:image:secure_url" content="${escapeAttr(image)}" />
  <meta property="og:image:alt" content="${escapeHtml(imageAlt)}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${escapeAttr(image)}" />
  <meta name="twitter:image:alt" content="${escapeHtml(imageAlt)}" />

  <!-- Structured Data -->
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>

  <!-- Basic styling just for clarity if opened in a browser -->
  <style>body{font-family:ui-sans-serif,system-ui,-apple-system;line-height:1.5;padding:24px;color:#111} .muted{color:#555}</style>
</head>
<body>
  <h1>${escapeHtml(title)}</h1>
  <p class="muted">This endpoint serves crawler-friendly SEO meta for <code>${escapeHtml(canonical)}</code>.</p>
</body>
</html>`;
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(s: string) {
  return escapeHtml(s);
}

serve(async (req: Request) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const ua = req.headers.get("user-agent");
    const targetUrlParam = url.searchParams.get("url");
    const pathParam = url.searchParams.get("path");

    // Query Supabase for SEO data if bot detected
    if (isBot(ua, req.headers)) {
      const canonical = resolveCanonical(targetUrlParam, pathParam);
      const pathname = new URL(canonical).pathname;
      
      // Extract slug from pathname
      let slug = pathname === '/' ? 'home' : pathname.replace(/^\//, '').replace(/\/$/, '');
      if (pathname.startsWith('/project/')) {
        slug = pathname.split('/project/')[1];
      } else if (pathname.startsWith('/blog/')) {
        slug = pathname.split('/blog/')[1];
      }
      
      // Query Supabase for SEO data
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const supabaseClient = createClient(supabaseUrl, supabaseKey);
      
      const { data: seoData, error } = await supabaseClient
        .from('seo_meta')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      
      let seoConfig;
      if (seoData && !error) {
        console.log('✅ seo-handler using Supabase data for:', slug);
        
        seoConfig = {
          title: seoData.title,
          description: seoData.description,
          canonical: seoData.canonical_url || canonical,
          image: toAbsoluteImage(seoData.og_image_url || DEFAULT_IMAGE),
          type: seoData.path_type === 'post' || seoData.path_type === 'project' ? 'article' : 'website'
        };
      } else {
        console.log('⚠️ seo-handler using fallback for:', slug);
        seoConfig = getSeoForPath(pathname);
      }
      
      const html = buildHtml(seoConfig);
      
      return new Response(html, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=14400, s-maxage=14400, stale-while-revalidate=86400'
        }
      });
    }
    
    // For non-bots, redirect to static files
    const canonical = resolveCanonical(targetUrlParam, pathParam);
    return new Response('Redirecting to static page', { 
      status: 302,
      headers: {
        ...corsHeaders,
        'Location': canonical,
        'Cache-Control': 'no-cache'
      }
    });
  } catch (e) {
    console.error("seo-handler error", e);
    return new Response(
      JSON.stringify({ success: false, error: (e as Error).message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } },
    );
  }
});

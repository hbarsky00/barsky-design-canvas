
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

// Public SEO Edge Function
// - Detects crawler/bot user-agents
// - Generates HTML with full SEO meta (OG/Twitter/canonical/JSON-LD)
// - Can target any URL via `?url=` or path via `?path=` query param
// - CORS enabled

const corsHeaders: HeadersInit = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Configure your production base URL here (fallback used when only `path` is provided)
const BASE_URL = "https://barskydesign.pro";
const SITE_NAME = "Hiram Barsky Design";
const DEFAULT_DESC =
  "Transforming complex problems into intuitive digital experiences through strategic design and AI integration.";
const DEFAULT_IMAGE =
  "https://barskydesign.pro/images/hiram-barsky-profile.webp";

// Known crawler/bot user agents
// Additional per-route SEO mappings
const PROJECT_IMAGE_MAP: Record<string, string> = {
  "herbalink": "https://barskydesign.pro/images/herbalink-desktop-1.webp",
  "splittime": "https://barskydesign.pro/images/splittime-desktop-1.webp",
  "business-management": "https://barskydesign.pro/images/business-management-desktop-1.webp",
  "investor-loan-app": "https://barskydesign.pro/images/investor-loan-app-desktop-1.webp",
  "medication-app": "https://barskydesign.pro/images/medication-app-desktop-1.webp",
  "gold2crypto": "https://barskydesign.pro/images/gold2crypto-desktop-1.webp",
  "dae-search": "https://barskydesign.pro/images/dae-search-desktop-1.webp",
  "barskyjoint": "https://barskydesign.pro/images/barskyjoint-desktop-1.webp",
};

const BLOG_IMAGE_MAP: Record<string, string> = {
  "finding-first-ux-job-guide": "https://barskydesign.pro/blog-finding-ux-job.jpg",
  "design-systems-that-get-used": "https://barskydesign.pro/blog-design-systems.jpg",
  "portfolio-red-flags-no-interviews": "https://barskydesign.pro/blog-portfolio-red-flags.jpg",
  "ai-enhanced-ux-designer-future": "https://barskydesign.pro/blog-ai-enhanced-ux.jpg",
  "user-research-shoestring-budget": "https://barskydesign.pro/blog-user-research-budget.jpg",
  "built-product-without-real-data": "https://barskydesign.pro/blog-built-product-without-real-data.jpg",
  "building-products-nobody-asked-for": "https://barskydesign.pro/blog-building-products-nobody-asked-for.jpg",
  "wireframes-to-wow-visual-hierarchy": "https://barskydesign.pro/blog-wireframes-to-wow-visual-hierarchy.jpg",
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
  /Googlebot/i,
  /bingbot/i,
  /DuckDuckBot/i,
  /Embedly/i,
  /WhatsApp/i,
];

function isBot(userAgent: string | null): boolean {
  if (!userAgent) return false;
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
      return u.toString();
    } catch (_) {
      // ignore and fall back below
    }
  }
  const path = pathParam ? (pathParam.startsWith("/") ? pathParam : `/${pathParam}`) : "/";
  // Normalize and ensure trailing slash for non-root to match frontend canonical
  if (path === "/" || path === "") {
    return `${BASE_URL}/`;
  }
  const cleanPath = path.replace(/\/index\.html?$/i, "/");
  const withSlash = cleanPath.endsWith("/") ? cleanPath : `${cleanPath}/`;
  return `${BASE_URL}${withSlash}`;
}

function getSeoForPath(pathname: string) {
  // Normalize
  const clean = pathname === "/" || pathname === "" ? "/" : pathname.replace(/\/+$/, "");

  // Defaults
  let title = `${SITE_NAME} — Portfolio`;
  let description = DEFAULT_DESC;
  let image = DEFAULT_IMAGE;
  let type: "website" | "article" = "website";

  // Sections mapping
  const SECTION_SEO: Record<string, { title: string; description: string; image?: string }> = {
    "/": { title: "Senior Product Designer & AI Strategist — Hiram Barsky", description: DEFAULT_DESC, image: DEFAULT_IMAGE },
    "/projects": { title: `Case Studies & Projects — ${SITE_NAME}`, description: "Explore selected work in product design, UX, and AI." },
    "/services": { title: `Design & AI Services — ${SITE_NAME}`, description: "UX research, design systems, and AI integration services." },
    "/about": { title: `About — ${SITE_NAME}`, description: "Designer and builder focused on impactful, AI-enhanced experiences." },
    "/blog": { title: `Blog — ${SITE_NAME}`, description: "Articles on product design, UX, and AI." },
    "/contact": { title: `Contact — ${SITE_NAME}`, description: "Get in touch to discuss product design, UX, and AI initiatives." },
  };

  // Direct section hits
  if (SECTION_SEO[clean]) {
    title = SECTION_SEO[clean].title;
    description = SECTION_SEO[clean].description;
    image = SECTION_SEO[clean].image ? toAbsoluteImage(SECTION_SEO[clean].image) : DEFAULT_IMAGE;
    return { title, description, image, type };
  }

  // Home fallback
  if (clean === "/") {
    title = "Senior Product Designer & AI Strategist — Hiram Barsky";
    description = DEFAULT_DESC;
    image = DEFAULT_IMAGE;
    return { title, description, image, type };
  }

  // Design services (and subsections)
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

  // Project detail
  if (clean.startsWith("/project/")) {
    const slug = clean.replace("/project/", "");
    const human = titleCaseFromSlug(slug || "Case Study");
    title = `${human} — Case Study | ${SITE_NAME}`;
    description = `Case study: ${human}. Outcomes, process, metrics, and visuals.`;
    type = "article";
    const mapped = PROJECT_IMAGE_MAP[slug];
    image = mapped ? toAbsoluteImage(mapped) : DEFAULT_IMAGE;
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

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${escapeAttr(canonical)}" />
  <meta http-equiv="refresh" content="0;url=${escapeAttr(canonical)}" />

  <!-- Open Graph -->
  <meta property="og:type" content="${type === "article" ? "article" : "website"}" />
  <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${escapeAttr(canonical)}" />
  <meta property="og:image" content="${escapeAttr(image)}" />
  <meta property="og:image:alt" content="${escapeHtml(title)}" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${escapeAttr(image)}" />

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

    // Only serve SEO content to bots to avoid duplicate canonicals
    if (!isBot(ua)) {
      return new Response('Not for browsers', { 
        status: 403,
        headers: corsHeaders 
      });
    }

    const canonical = resolveCanonical(targetUrlParam, pathParam);
    const pathname = new URL(canonical).pathname || "/";

    const { title, description, image, type } = getSeoForPath(pathname);

    const html = buildHtml({ title, description, canonical, image, type });

    const headers = new Headers({
      "Content-Type": "text/html; charset=utf-8",
      ...corsHeaders,
      // Cache for 10 minutes, allow stale for 1 day for crawlers
      "Cache-Control": "public, max-age=600, s-maxage=600, stale-while-revalidate=86400",
    });

    // If it's a bot, return the HTML. If not, still return HTML so it can be tested in a browser.
    const bot = isBot(ua);
    console.log("seo-handler invoked", { ua, bot, canonical, pathname });

    return new Response(html, { status: 200, headers });
  } catch (e) {
    console.error("seo-handler error", e);
    return new Response(
      JSON.stringify({ success: false, error: (e as Error).message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } },
    );
  }
});

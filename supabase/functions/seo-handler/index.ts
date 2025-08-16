
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
  "15+ years creating AI-enhanced digital experiences. Specializing in UX research, design systems, and Gen AI integration.";
const DEFAULT_IMAGE =
  "https://barskyux.com/wp-content/uploads/2025/06/IMG_20250531_123836_952.webp";

// Known crawler/bot user agents
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
  // Normalize double slashes and trailing slash for non-root
  const cleanPath = path === "/" ? "/" : path.replace(/\/+$/, "");
  return `${BASE_URL}${cleanPath}`;
}

function getSeoForPath(pathname: string) {
  // Default values
  let title = `${SITE_NAME} — Portfolio`;
  let description = DEFAULT_DESC;
  let image = DEFAULT_IMAGE;
  let type: "website" | "article" = "website";

  if (pathname === "/" || pathname === "") {
    title = `Hiram Barsky — Product Design & AI`;
    description = DEFAULT_DESC;
  } else if (pathname.startsWith("/project/")) {
    const slug = pathname.replace("/project/", "").replace(/\/+$/, "");
    const human = titleCaseFromSlug(slug || "Case Study");
    title = `${human} — Case Study | ${SITE_NAME}`;
    description = `Case study: ${human}. Outcomes, process, metrics, and visuals.`;
    type = "article";
    // If you have a convention for project images, set here (fallback to default)
    image = DEFAULT_IMAGE;
  } else if (pathname.startsWith("/blog/")) {
    const slug = pathname.replace("/blog/", "").replace(/\/+$/, "");
    const human = titleCaseFromSlug(slug || "Article");
    title = `${human} — ${SITE_NAME}`;
    description = `Article: ${human} — insights on product design and AI.`;
    type = "article";
  } else if (pathname.includes("contact")) {
    title = `Contact — ${SITE_NAME}`;
    description = `Get in touch to discuss product design, UX, and AI initiatives.`;
  }

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

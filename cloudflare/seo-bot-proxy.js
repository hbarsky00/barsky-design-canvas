// Cloudflare Worker: Route bot traffic to seo-handler edge function
// Human visitors pass through to the SPA normally

const BOT_AGENTS = [
  "googlebot", "bingbot", "yandex", "baiduspider",
  "facebookexternalhit", "twitterbot", "linkedinbot",
  "slackbot", "discordbot", "pinterest", "whatsapp",
  "telegrambot", "applebot", "duckduckbot", "embedly",
  "skypeuripreview", "redditbot", "ia_archiver",
  "gptbot", "chatgpt-user", "perplexitybot", "claude-web",
  "anthropic-ai", "google-inspectiontool", "chrome-lighthouse",
  "quora link preview", "rogerbot", "outbrain",
  "bitlybot", "tumblr", "flipboard",
];

const IGNORE_EXTENSIONS = [
  ".js", ".css", ".xml", ".png", ".jpg", ".jpeg", ".gif", ".pdf",
  ".ico", ".svg", ".woff", ".woff2", ".ttf", ".webp", ".mp4",
  ".webmanifest", ".json", ".txt", ".map",
];

export default {
  async fetch(request, env) {
    return await handleRequest(request, env).catch(
      (err) => new Response(err.stack, { status: 500 })
    );
  },
};

async function handleRequest(request, env) {
  const url = new URL(request.url);
  const userAgent = request.headers.get("User-Agent")?.toLowerCase() || "";
  const pathName = url.pathname.toLowerCase();
  const extension = pathName.substring(pathName.lastIndexOf(".") || pathName.length)?.toLowerCase();

  // Skip for non-bot requests or static assets
  if (
    !BOT_AGENTS.some((bot) => userAgent.includes(bot)) ||
    (extension.length > 1 && IGNORE_EXTENSIONS.includes(extension))
  ) {
    return fetch(request);
  }

  // Route bot traffic to seo-handler edge function
  const seoHandlerUrl = `${env.SUPABASE_FUNCTIONS_URL || 'https://bqrhacrfuateckrykcsj.supabase.co/functions/v1'}/seo-handler?url=${encodeURIComponent(request.url)}`;
  
  try {
    const seoResponse = await fetch(seoHandlerUrl, {
      method: "GET",
      headers: {
        "User-Agent": userAgent,
        "x-scrape-preview": "true",
        "Authorization": `Bearer ${env.SUPABASE_ANON_KEY}`,
      },
    });

    if (seoResponse.ok) {
      // Return the HTML from seo-handler with proper headers
      const html = await seoResponse.text();
      return new Response(html, {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "public, max-age=14400, s-maxage=14400",
          "X-Robots-Tag": "all",
        },
      });
    }
  } catch (err) {
    console.error("seo-handler proxy error:", err);
  }

  // Fallback: serve the SPA normally
  return fetch(request);
}

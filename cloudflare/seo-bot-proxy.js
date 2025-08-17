// Cloudflare Worker: Bot-aware SEO proxy to Supabase Edge Function
// Route suggestion: *barskydesign.pro/*
// For crawler/bot UAs, proxy to Supabase seo-handler so OG/Twitter tags render from the edge function
// For humans, pass-through to your origin (SPA)

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

const SUPABASE_PROJECT_REF = "ctqttomppgkjbjkckise"; // from supabase/config.toml
const SEO_HANDLER_BASE = `https://${SUPABASE_PROJECT_REF}.functions.supabase.co/seo-handler`;

function isBot(ua) {
  return !!ua && BOT_UA.some((re) => re.test(ua));
}

export default {
  async fetch(request) {
    const ua = request.headers.get("user-agent") || "";

    try {
      const url = new URL(request.url);

      if (isBot(ua)) {
        const target = `${SEO_HANDLER_BASE}?path=${encodeURIComponent(url.pathname + url.search)}`;
        return fetch(target, {
          headers: {
            "user-agent": ua,
            "accept": request.headers.get("accept") || "text/html",
          },
        });
      }

      // Human traffic: pass-through to origin
      return fetch(request);
    } catch (err) {
      return new Response("Worker error", { status: 500 });
    }
  },
};

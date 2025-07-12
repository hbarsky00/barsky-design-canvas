import type { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
  const userAgent = request.headers.get("user-agent")?.toLowerCase() || "";
  
  // List of known crawlers and social media bots
  const crawlers = [
    "googlebot",
    "bingbot", 
    "slurp",
    "duckduckbot",
    "baiduspider",
    "yandexbot",
    "facebookexternalhit",
    "twitterbot", 
    "linkedinbot",
    "whatsapp",
    "telegrambot"
  ];

  const isCrawler = crawlers.some(crawler => userAgent.includes(crawler));
  
  if (isCrawler) {
    console.log(`🤖 Crawler detected: ${userAgent}`);
    // Let Netlify serve the static pre-rendered page
    return;
  }
  
  console.log(`👤 Human visitor detected: ${userAgent}`);
  // Serve the main React app
  return context.rewrite("/index.html");
};
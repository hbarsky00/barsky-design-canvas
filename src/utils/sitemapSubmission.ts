
/**
 * Stub — sitemap submission is now handled server-side.
 * Client-side pings to google.com/ping fail due to CORS.
 */
export const submitSitemapToAllPlatforms = async (): Promise<void> => {
  console.log('Sitemap submission handled server-side via Cloudflare worker + seo-handler edge function.');
};

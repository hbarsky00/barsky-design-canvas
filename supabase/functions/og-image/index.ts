import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const title = url.searchParams.get('title') || 'Hiram Barsky - UX Designer';
    const subtitle = url.searchParams.get('subtitle') || '';
    const color = url.searchParams.get('color') || '0f172a';
    const icon = url.searchParams.get('icon') || '';
    
    // Simple SVG-based OG image generator (proof of concept)
    // TODO: Use @vercel/og or satori for more advanced image generation
    
    // Generate branded SVG with custom color
    const svg = `
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#${color};stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1e293b;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="1200" height="630" fill="url(#bg)"/>
        ${icon ? `<image x="60" y="60" width="80" height="80" href="${escapeXml(icon)}" />` : ''}
        <text x="60" y="280" font-family="system-ui, -apple-system, sans-serif" font-size="64" fill="#ffffff" font-weight="bold">
          ${escapeXml(title.length > 50 ? title.substring(0, 47) + '...' : title)}
        </text>
        ${subtitle ? `<text x="60" y="360" font-family="system-ui, -apple-system, sans-serif" font-size="32" fill="#94a3b8">${escapeXml(subtitle.substring(0, 80))}</text>` : ''}
        <text x="60" y="560" font-family="system-ui, -apple-system, sans-serif" font-size="24" fill="#64748b">
          barskydesign.pro
        </text>
      </svg>
    `;
    
    return new Response(svg, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    });
  } catch (error) {
    console.error('og-image error:', error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

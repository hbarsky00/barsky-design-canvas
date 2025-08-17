import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, user-agent, accept',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const targetUrl = url.searchParams.get('url');
    const targetPath = url.searchParams.get('path');
    
    // Get the original user agent and accept headers
    const originalUA = req.headers.get('user-agent') || 'PreRender-Bot';
    const originalAccept = req.headers.get('accept') || 'text/html';
    
    // Resolve the full URL to prerender
    let fullUrl: string;
    if (targetUrl) {
      fullUrl = targetUrl;
    } else if (targetPath) {
      // Construct full URL from path
      const baseUrl = 'https://barskydesign.pro';
      fullUrl = `${baseUrl}${targetPath.startsWith('/') ? targetPath : '/' + targetPath}`;
    } else {
      return new Response('Missing url or path parameter', { 
        status: 400,
        headers: corsHeaders 
      });
    }

    // Get Prerender token from environment
    const prerenderToken = Deno.env.get('PRERENDER_TOKEN');
    if (!prerenderToken) {
      console.error('PRERENDER_TOKEN not configured');
      return new Response('Prerender service not configured', { 
        status: 500,
        headers: corsHeaders 
      });
    }

    // Call Prerender.io service
    const prerenderUrl = `https://service.prerender.io/${encodeURIComponent(fullUrl)}`;
    
    console.log(`🔄 Prerendering: ${fullUrl} via ${prerenderUrl}`);
    
    const prerenderResponse = await fetch(prerenderUrl, {
      headers: {
        'X-Prerender-Token': prerenderToken,
        'User-Agent': originalUA,
        'Accept': originalAccept,
      },
      // 15 second timeout for prerender
      signal: AbortSignal.timeout(15000),
    });

    if (!prerenderResponse.ok) {
      console.error(`Prerender failed: ${prerenderResponse.status} ${prerenderResponse.statusText}`);
      return new Response(`Prerender service error: ${prerenderResponse.status}`, { 
        status: prerenderResponse.status,
        headers: corsHeaders 
      });
    }

    // Get the prerendered HTML
    const prerenderHtml = await prerenderResponse.text();
    
    // Set appropriate headers
    const responseHeaders = {
      ...corsHeaders,
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=600, s-maxage=600',
      'X-Prerender-Status': 'SUCCESS',
      'X-Prerender-URL': fullUrl,
    };

    console.log(`✅ Prerender successful for: ${fullUrl} (${prerenderHtml.length} chars)`);

    return new Response(prerenderHtml, {
      status: 200,
      headers: responseHeaders,
    });

  } catch (error) {
    console.error('Prerender proxy error:', error);
    
    // Return a meaningful error response
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return new Response(`Prerender service unavailable: ${errorMessage}`, {
      status: 503,
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/plain',
        'X-Prerender-Status': 'ERROR',
      },
    });
  }
});
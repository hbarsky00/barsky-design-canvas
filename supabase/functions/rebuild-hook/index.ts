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

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { 
      status: 405,
      headers: corsHeaders
    });
  }

  try {
    const BUILD_WEBHOOK_URL = Deno.env.get("BUILD_WEBHOOK_URL");
    
    if (!BUILD_WEBHOOK_URL) {
      console.error("❌ BUILD_WEBHOOK_URL not configured");
      return new Response("Missing BUILD_WEBHOOK_URL", { 
        status: 500,
        headers: corsHeaders
      });
    }

    // Optional: Validate a shared secret header
    const secret = req.headers.get("x-rebuild-secret");
    const expectedSecret = Deno.env.get("REBUILD_SECRET");
    
    if (expectedSecret && secret !== expectedSecret) {
      console.warn("⚠️ Invalid rebuild secret");
      return new Response("Unauthorized", { 
        status: 401,
        headers: corsHeaders
      });
    }

    console.log("🔄 Triggering rebuild webhook...");
    
    // Fire and forget - don't wait for response
    fetch(BUILD_WEBHOOK_URL, { 
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    }).catch((error) => {
      console.error("❌ Webhook call failed:", error);
    });

    console.log("✅ Rebuild webhook triggered");
    
    return new Response("Accepted", { 
      status: 202,
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/plain'
      }
    });

  } catch (error) {
    console.error("❌ rebuild-hook error:", error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }), 
      { 
        status: 500, 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});

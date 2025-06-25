
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🔧 Edge Function: generate-image-caption called');
    
    if (!openAIApiKey) {
      console.error('❌ OpenAI API key not configured');
      throw new Error('OpenAI API key not configured');
    }

    const { imageSrc, contextType = 'general', projectContext } = await req.json();
    console.log('📥 Request data:', { imageSrc: imageSrc?.substring(0, 50), contextType, hasProjectContext: !!projectContext });

    if (!imageSrc) {
      throw new Error('Image source is required');
    }

    // Convert relative URLs to absolute URLs using request origin
    const requestOrigin = req.headers.get('origin') || req.headers.get('referer')?.split('/').slice(0, 3).join('/') || 'https://0fd089db-a4e5-4e17-ab5f-74878fb2d656.lovableproject.com';
    const fullImageUrl = imageSrc.startsWith('http') 
      ? imageSrc 
      : `${requestOrigin}${imageSrc}`;

    console.log('🖼️ Processing image URL:', fullImageUrl);

    // Generate descriptive caption using OpenAI with STRICT length limit
    console.log('🤖 Calling OpenAI API...');
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert at creating EXTREMELY SHORT image captions. You MUST respond with EXACTLY 3-5 words maximum. No periods, no articles (a, an, the), just essential descriptive words. Examples: "Banking dashboard interface", "User profile screen", "Data visualization chart", "Mobile app design".'
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Describe this app interface in EXACTLY 3-5 words maximum. NO MORE than 5 words. Do not use articles (a, an, the). Just the most essential descriptive words.'
              },
              {
                type: 'image_url',
                image_url: {
                  url: fullImageUrl,
                  detail: 'low'
                }
              }
            ]
          }
        ],
        max_tokens: 20,
        temperature: 0.3,
      }),
    });

    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.text();
      console.error('❌ OpenAI API error:', openAIResponse.status, errorData);
      throw new Error(`OpenAI API error: ${openAIResponse.status} - ${errorData}`);
    }

    const data = await openAIResponse.json();
    let caption = data.choices?.[0]?.message?.content?.trim();

    if (!caption) {
      throw new Error('No caption generated from OpenAI');
    }

    // Enforce strict word limit - truncate if needed
    const words = caption.split(' ').filter(word => word.length > 0);
    if (words.length > 5) {
      caption = words.slice(0, 5).join(' ');
    }

    // Remove any periods or punctuation
    caption = caption.replace(/[.!?]/g, '');

    console.log('✅ Short caption generated:', caption);

    return new Response(JSON.stringify({ caption }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('❌ Error in generate-image-caption function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      caption: 'App interface design'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

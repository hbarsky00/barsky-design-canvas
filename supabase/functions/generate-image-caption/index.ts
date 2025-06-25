
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

    // Generate simple, user-friendly caption using OpenAI
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
            content: 'You are a helpful assistant that creates SHORT, simple captions for images. Write ONLY what a regular user would want to see - a brief, friendly description in 2-4 words. NO technical analysis, NO detailed breakdowns, NO interface descriptions. Just simple, clear captions like "Login screen", "Dashboard view", "User profile", "Settings page". Keep it short and user-friendly.'
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Create a simple, short caption for this image. Just 2-4 words maximum. Make it user-friendly, not technical.'
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

    // Ensure caption is short and clean
    const words = caption.split(' ').filter(word => word.length > 0);
    if (words.length > 4) {
      caption = words.slice(0, 4).join(' ');
    }

    // Remove punctuation except for necessary ones
    caption = caption.replace(/[.!?,;:]/g, '');

    console.log('✅ Simple caption generated:', caption);

    return new Response(JSON.stringify({ caption }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('❌ Error in generate-image-caption function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      caption: 'App interface'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});


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

    const getSystemPrompt = (contextType: string, projectContext?: string) => {
      const basePrompt = 'You are an expert at analyzing app interfaces and describing them in ONE SENTENCE ONLY. Your goal is to provide concise, specific descriptions that highlight what makes each interface unique.';
      
      if (projectContext) {
        return `${basePrompt} Context: ${projectContext}`;
      }
      
      return `${basePrompt} Analyze this app interface and describe the specific UI elements and functionality in exactly one sentence.`;
    };

    // Generate descriptive caption using OpenAI with one-sentence constraint
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
            content: getSystemPrompt(contextType, projectContext)
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Describe this app interface in EXACTLY ONE SENTENCE (maximum 25 words). Focus on the specific UI elements, features, and functionality you can see. Be concise but descriptive about what makes this particular screen unique.'
              },
              {
                type: 'image_url',
                image_url: {
                  url: fullImageUrl,
                  detail: 'high'
                }
              }
            ]
          }
        ],
        max_tokens: 50, // Reduced to enforce brevity
        temperature: 0.7,
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

    // Ensure it's exactly one sentence
    const firstSentence = caption.split(/[.!?]/)[0];
    if (firstSentence && firstSentence.length > 10) {
      caption = firstSentence + '.';
    }

    // Limit to 25 words maximum
    const words = caption.split(' ');
    if (words.length > 25) {
      caption = words.slice(0, 25).join(' ') + '.';
    }

    console.log('✅ OpenAI Caption generated successfully:', caption);

    return new Response(JSON.stringify({ caption }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('❌ Error in generate-image-caption function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      caption: 'Professional app interface with modern design.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

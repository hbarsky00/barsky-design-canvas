
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
      const basePrompt = 'You are an expert at analyzing app interfaces and describing them accurately for UX/UI design portfolios. Analyze each image carefully and provide a unique, specific description.';
      
      if (projectContext) {
        if (projectContext.includes('co-parenting')) {
          return `${basePrompt} You are analyzing a co-parenting coordination app interface. Look carefully at this specific image and describe EXACTLY what you see - whether it's a calendar view, messaging interface, child profile screen, scheduling tool, communication feature, or other co-parenting functionality. Focus on the specific UI elements, buttons, text, layouts, and features visible in THIS particular screen. Make each description completely unique and specific to what's actually shown in the image.`;
        } else if (projectContext.includes('food truck')) {
          return `${basePrompt} You are analyzing a food truck app interface. Look at this specific image and describe the exact UI elements, features, and functionality visible - whether it's menu browsing, ordering, GPS tracking, restaurant management, or customer features. Make each description unique to what's actually shown.`;
        } else if (projectContext.includes('herbal medicine')) {
          return `${basePrompt} You are analyzing a herbal medicine app interface. Describe the specific features visible - herbalist profiles, consultation booking, herb recommendations, patient records, or practitioner tools. Focus on what makes this screen unique.`;
        }
      }
      
      return `${basePrompt} Analyze this app interface and describe the specific UI elements, features, and functionality visible. Make each description unique and detailed.`;
    };

    // Generate descriptive caption using OpenAI
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
                text: 'Analyze this app interface image carefully. Describe exactly what you see in terms of UI elements, features, layout, text, buttons, and functionality. Be very specific about what makes this particular screen unique. Focus on the actual content visible in the image - don\'t make assumptions about features not shown. Provide a detailed, professional description suitable for a UX/UI portfolio that highlights the specific design and functionality visible in this exact image.'
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
        max_tokens: 300,
        temperature: 0.7
      }),
    });

    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.text();
      console.error('❌ OpenAI API error:', openAIResponse.status, errorData);
      throw new Error(`OpenAI API error: ${openAIResponse.status} - ${errorData}`);
    }

    const data = await openAIResponse.json();
    const caption = data.choices?.[0]?.message?.content?.trim();

    if (!caption) {
      throw new Error('No caption generated from OpenAI');
    }

    console.log('✅ OpenAI Caption generated successfully');

    return new Response(JSON.stringify({ caption }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('❌ Error in generate-image-caption function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      caption: 'Professional app interface designed for enhanced user experience and functionality'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

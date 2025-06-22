
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
      const basePrompt = 'You are an expert at analyzing medical app interfaces and describing them accurately for UX/UI design portfolios.';
      
      if (projectContext) {
        return `${basePrompt} You are analyzing images from a ${projectContext}. Focus specifically on the medication management features, user interface elements, patient-friendly design choices, accessibility features, and how the interface supports diabetic patients in managing their medication schedules. Be detailed about what functionality is visible and how it serves users.`;
      }
      
      switch (contextType) {
        case 'project':
          return `${basePrompt} You are analyzing images from a medication management app designed for diabetic patients. Focus on the user interface design, medication tracking features, appointment scheduling, accessibility elements, patient-friendly navigation, and any health-related functionality visible in the interface. Describe specific UI components and their purpose.`;
        case 'blog':
          return `${basePrompt} You are analyzing images for educational content about medication management app design. Focus on key UX/UI principles and patient-centered design approaches.`;
        default:
          return `${basePrompt} Look at this medication app interface carefully and describe exactly what you see - including specific UI elements, medication tracking features, patient interface components, accessibility features, and design elements that support healthcare management.`;
      }
    };

    // Generate descriptive caption using OpenAI with medication app focus
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
                text: 'Please analyze this medication management app interface and provide a specific, detailed description of what it shows. Focus on the user interface elements, medication tracking features, patient-friendly design elements, accessibility considerations, and any healthcare-related functionality visible. Make the caption professional and descriptive for a UX/UI portfolio, highlighting how the design serves diabetic patients.'
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
        temperature: 0.2
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
      caption: 'Professional medication management interface designed for enhanced patient experience and medication adherence'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

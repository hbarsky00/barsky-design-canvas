
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

    // Determine context-specific prompt based on project
    let systemPrompt = 'You are an expert at describing user interface screenshots. Write ONE simple, descriptive sentence about what you see in the image. Focus on the main interface elements and purpose.';
    
    if (projectContext?.includes('splittime')) {
      systemPrompt = 'You are describing screenshots from SplitTime, a co-parenting family scheduling app. Write ONE simple sentence describing what you see - focus on family scheduling, calendar views, messaging between parents, child activity planning, or custody arrangements. Examples: "Family calendar showing custody schedule" or "Parent messaging interface" or "Child activity planning screen".';
    } else if (projectContext?.includes('herbalink')) {
      systemPrompt = 'You are describing screenshots from HerbaLink, a herbal medicine platform. Write ONE simple sentence describing what you see - focus on herbal consultations, practitioner discovery, or wellness tracking. Examples: "Herbalist consultation booking interface" or "Herbal medicine recommendation screen".';
    } else if (projectContext?.includes('investor') || projectContext?.includes('loan')) {
      systemPromprompt = 'You are describing screenshots from a financial investment and loan platform. Write ONE simple sentence describing what you see - focus on banking, investments, or loan management. Examples: "Investment dashboard interface" or "Loan application screen".';
    }

    // Generate caption using OpenAI with improved prompting
    console.log('🤖 Calling OpenAI API with context-specific prompt...');
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
            content: systemPrompt
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Describe this user interface screenshot in one simple sentence:'
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
        max_tokens: 30,
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

    // Clean up the caption - remove unwanted formatting
    caption = caption
      .replace(/[#*_`\[\](){}|\\~><@!$%^&+=.,;:?]/g, '')
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    // Project-specific validation and fallbacks
    if (projectContext?.includes('splittime')) {
      // If caption doesn't seem relevant to family/parenting, use project-specific fallback
      if (!caption.toLowerCase().match(/(family|parent|child|calendar|schedule|custody|messaging|activity|coordination|planning)/)) {
        caption = getProjectSpecificFallback('splittime');
      }
    } else if (projectContext?.includes('herbalink')) {
      if (!caption.toLowerCase().match(/(herb|medicine|practitioner|consultation|wellness|health|natural)/)) {
        caption = getProjectSpecificFallback('herbalink');
      }
    }

    console.log('✅ Context-aware caption generated:', caption);

    return new Response(JSON.stringify({ caption }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('❌ Error in generate-image-caption function:', error);
    
    // Return project-specific fallback on error
    const { projectContext } = await req.json().catch(() => ({}));
    const fallbackCaption = getProjectSpecificFallback(projectContext || '');
    
    return new Response(JSON.stringify({ 
      error: error.message,
      caption: fallbackCaption
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function getProjectSpecificFallback(projectContext: string): string {
  if (projectContext.includes('splittime')) {
    const fallbacks = [
      'Family scheduling app interface',
      'Co-parenting communication screen',
      'Child custody calendar view',
      'Parent coordination dashboard'
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }
  
  if (projectContext.includes('herbalink')) {
    const fallbacks = [
      'Herbal medicine consultation interface',
      'Practitioner discovery screen',
      'Wellness tracking dashboard',
      'Natural health app interface'
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }
  
  if (projectContext.includes('investor') || projectContext.includes('loan')) {
    const fallbacks = [
      'Financial investment dashboard',
      'Loan management interface',
      'Banking application screen',
      'Investment portfolio view'
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }
  
  return 'Application interface';
}


import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CaptionStyle {
  type: 'alt-text' | 'descriptive' | 'seo-optimized' | 'technical';
  caption: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const { imageSrc, contextType = 'general', projectContext, requestMultipleStyles = false } = await req.json();

    if (!imageSrc) {
      throw new Error('Image source is required');
    }

    // Convert relative URLs to absolute URLs
    const fullImageUrl = imageSrc.startsWith('http') 
      ? imageSrc 
      : `${req.headers.get('origin') || 'https://barskydesign.pro'}${imageSrc}`;

    console.log('🤖 OpenAI Caption: Analyzing image with context:', contextType, 'URL:', fullImageUrl);

    const getSystemPrompt = (contextType: string, projectContext?: string) => {
      const basePrompt = 'You are an expert at analyzing images and describing them accurately and professionally for UX/UI design portfolios.';
      
      if (projectContext) {
        return `${basePrompt} You are analyzing images from a ${projectContext}. Focus on the user interface elements, functionality, user experience features, and design decisions that support the project goals. Be specific about what the interface shows and how it serves users.`;
      }
      
      switch (contextType) {
        case 'project':
          return `${basePrompt} You are analyzing images from a professional design portfolio. Focus on design elements, user interfaces, functionality, processes, workflows, and technical implementations. Be specific about what the interface shows, what functionality is visible, and notable design elements.`;
        case 'blog':
          return `${basePrompt} You are analyzing images for educational blog content. Focus on key concepts, actionable insights, and the educational value of what's shown in the image.`;
        default:
          return `${basePrompt} Look at the image carefully and describe exactly what you see - whether it's a user interface, design mockup, screenshot, process diagram, workflow, data visualization, mobile app screen, website layout, etc. Be specific about what the interface shows and any notable features.`;
      }
    };

    // Generate single descriptive caption using OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
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
                text: 'Please analyze this image and provide a specific, accurate description of what it shows. Focus on the actual content, interface elements, process steps, or functionality that is visible in the image. Make the caption professional and descriptive for a UX/UI portfolio.'
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
        max_tokens: 200,
        temperature: 0.3
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('❌ OpenAI API error:', response.status, errorData);
      throw new Error(`OpenAI API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    const caption = data.choices[0]?.message?.content?.trim();

    if (!caption) {
      throw new Error('No caption generated from OpenAI');
    }

    console.log('✅ OpenAI Caption: Generated caption:', caption);

    return new Response(JSON.stringify({ caption }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('❌ Error in OpenAI generate-image-caption function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      caption: 'Professional medication management interface designed for enhanced patient experience'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

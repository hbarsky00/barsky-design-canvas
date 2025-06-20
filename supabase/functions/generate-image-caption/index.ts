
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

    const { imageSrc, contextType = 'general', requestMultipleStyles = false } = await req.json();

    if (!imageSrc) {
      throw new Error('Image source is required');
    }

    // Convert relative URLs to absolute URLs
    const fullImageUrl = imageSrc.startsWith('http') 
      ? imageSrc 
      : `${req.headers.get('origin') || 'https://barskydesign.pro'}${imageSrc}`;

    console.log('🤖 Enhanced AI Caption: Analyzing image with context:', contextType, 'URL:', fullImageUrl);

    const getSystemPrompt = (contextType: string) => {
      const basePrompt = 'You are an expert at analyzing images and describing them accurately and professionally.';
      
      switch (contextType) {
        case 'project':
          return `${basePrompt} You are analyzing images from a professional design portfolio. Focus on design elements, user interfaces, functionality, processes, workflows, and technical implementations. Be specific about what the interface shows, what functionality is visible, and notable design elements.`;
        case 'blog':
          return `${basePrompt} You are analyzing images for educational blog content. Focus on key concepts, actionable insights, and the educational value of what's shown in the image.`;
        default:
          return `${basePrompt} Look at the image carefully and describe exactly what you see - whether it's a user interface, design mockup, screenshot, process diagram, workflow, data visualization, mobile app screen, website layout, etc. Be specific about what the interface shows and any notable features.`;
      }
    };

    if (requestMultipleStyles) {
      // Generate multiple caption styles
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
              content: `${getSystemPrompt(contextType)} 

              Generate 4 different caption styles:
              1. ALT-TEXT: Short, accessibility-focused description (8-12 words)
              2. DESCRIPTIVE: Detailed description of what's shown (15-30 words) 
              3. SEO-OPTIMIZED: Keyword-rich caption with relevant terms (20-35 words)
              4. TECHNICAL: Focus on technical implementation and features (15-25 words)
              
              Return as JSON array with objects containing "type" and "caption" fields.`
            },
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: 'Please analyze this image and provide all 4 caption styles as requested. Make sure captions are professional and accurate.'
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
          max_tokens: 500,
          temperature: 0.3,
          response_format: { type: "json_object" }
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('❌ OpenAI API error:', response.status, errorData);
        throw new Error(`OpenAI API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content?.trim();

      if (!content) {
        throw new Error('No caption generated from OpenAI');
      }

      let captions: CaptionStyle[];
      try {
        const parsed = JSON.parse(content);
        captions = parsed.captions || [
          { type: 'alt-text', caption: 'Professional design interface' },
          { type: 'descriptive', caption: 'Professional design interface showcasing modern user experience elements' },
          { type: 'seo-optimized', caption: 'Professional UX/UI design interface featuring modern user experience elements and intuitive navigation patterns' },
          { type: 'technical', caption: 'Advanced interface design implementing user-centered design principles and responsive layouts' }
        ];
      } catch (parseError) {
        console.warn('⚠️ Failed to parse JSON response, using fallback captions');
        captions = [
          { type: 'alt-text', caption: 'Professional design interface' },
          { type: 'descriptive', caption: content.substring(0, 100) },
          { type: 'seo-optimized', caption: `Professional design interface - ${content.substring(0, 80)}` },
          { type: 'technical', caption: content.substring(0, 80) }
        ];
      }

      console.log('✅ Enhanced AI Caption: Generated multiple styles:', captions.length);
      return new Response(JSON.stringify({ captions }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else {
      // Generate single descriptive caption (backward compatibility)
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
              content: getSystemPrompt(contextType)
            },
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: 'Please analyze this image and provide a specific, accurate description of what it shows. Focus on the actual content, interface elements, process steps, or functionality that is visible in the image.'
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

      console.log('✅ Enhanced AI Caption: Generated single caption:', caption);

      return new Response(JSON.stringify({ caption }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('❌ Error in enhanced generate-image-caption function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      caption: 'Image content analysis unavailable - please add a custom description'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

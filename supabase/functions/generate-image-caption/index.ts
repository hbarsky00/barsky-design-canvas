
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

    // Project-specific prompts
    let systemPrompt = 'You are an expert at describing user interface screenshots. Write ONE simple, descriptive sentence about what you see in the image. Focus on the main interface elements and purpose.';
    
    if (projectContext?.includes('splittime')) {
      systemPrompt = `You are describing screenshots from SplitTime, a co-parenting family scheduling and communication app. 

KEY FEATURES TO LOOK FOR:
- Dashboard views with family/child information
- Calendar interfaces for custody schedules
- Child profiles and wellbeing tracking
- Parent messaging and communication tools
- Document management for custody/medical records
- Notification panels and alerts
- Family coordination features
- Child activity planning screens

Write ONE simple sentence describing what you see. Use terms like:
- "Co-parenting dashboard showing..."
- "Child wellbeing tracking interface..."
- "Family calendar with custody schedule..."
- "Parent communication screen..."
- "Child profile management..."
- "Family notifications and alerts..."
- "Document center for family records..."

NEVER use generic terms like "banking," "financial," or "business application." This is specifically a family/parenting app.`;
    } else if (projectContext?.includes('barsky') || projectContext?.includes('joint')) {
      systemPrompt = `You are describing screenshots from Barsky Joint, a food truck and restaurant ordering platform. 

KEY FEATURES TO LOOK FOR:
- Food ordering interfaces and menus
- Restaurant/food truck location tracking
- Order status and delivery tracking
- Food menu browsing and selection
- Payment and checkout screens
- Restaurant reservation systems
- Food delivery status updates
- Mobile food ordering features

Write ONE simple sentence describing what you see. Use terms like:
- "Food ordering interface showing..."
- "Restaurant menu and ordering screen..."
- "Food truck location tracking display..."
- "Order status and delivery tracking..."
- "Restaurant reservation interface..."
- "Mobile food ordering dashboard..."
- "Food delivery status screen..."

Focus on food, restaurant, and ordering-related features. NEVER use terms like "banking," "financial," or "family/parenting."`;
    } else if (projectContext?.includes('herbalink')) {
      systemPrompt = 'You are describing screenshots from HerbaLink, a herbal medicine platform. Write ONE simple sentence describing what you see - focus on herbal consultations, practitioner discovery, or wellness tracking. Examples: "Herbalist consultation booking interface" or "Herbal medicine recommendation screen".';
    } else if (projectContext?.includes('investor') || projectContext?.includes('loan')) {
      systemPrompt = 'You are describing screenshots from a financial investment and loan platform. Write ONE simple sentence describing what you see - focus on banking, investments, or loan management. Examples: "Investment dashboard interface" or "Loan application screen".';
    }

    // Try OpenAI API first
    try {
      console.log('🤖 Calling OpenAI API with project-specific prompt for:', projectContext);
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
                  text: 'Describe this user interface screenshot in one simple sentence. Pay attention to the specific app features and interface elements:'
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
          max_tokens: 40,
          temperature: 0.2,
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

      // Project-specific validation
      if (projectContext?.includes('splittime')) {
        const inappropriateTerms = ['banking', 'financial', 'business', 'corporate', 'payment', 'transaction', 'account', 'investment', 'loan'];
        const hasInappropriateTerms = inappropriateTerms.some(term => 
          caption.toLowerCase().includes(term)
        );
        
        if (hasInappropriateTerms || !caption.toLowerCase().match(/(family|parent|child|custody|schedule|calendar|wellbeing|communication|dashboard|notification|co-parent|coordination)/)) {
          console.log('🔄 SplitTime caption validation failed, using fallback');
          caption = getSplitTimeFallback();
        }
      } else if (projectContext?.includes('barsky') || projectContext?.includes('joint')) {
        const inappropriateTerms = ['banking', 'financial', 'investment', 'loan', 'family', 'parent', 'child', 'custody'];
        const hasInappropriateTerms = inappropriateTerms.some(term => 
          caption.toLowerCase().includes(term)
        );
        
        if (hasInappropriateTerms || !caption.toLowerCase().match(/(food|restaurant|order|menu|delivery|truck|dining|meal|kitchen|chef|cuisine)/)) {
          console.log('🔄 Barsky Joint caption validation failed, using fallback');
          caption = getBarskyJointFallback();
        }
      }

      console.log('✅ Context-aware caption generated:', caption);

      return new Response(JSON.stringify({ caption }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } catch (apiError) {
      console.error('❌ OpenAI API failed, using project-specific fallback:', apiError);
      
      // Use project-specific fallback when API fails
      const fallbackCaption = getProjectSpecificFallback(projectContext || '');
      
      return new Response(JSON.stringify({ 
        caption: fallbackCaption,
        error: 'API unavailable, using fallback'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

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

function getSplitTimeFallback(): string {
  const fallbacks = [
    'Co-parenting dashboard showing custody schedule and family coordination tools',
    'Child wellbeing tracking interface with activity logs and health updates',
    'Family calendar displaying shared custody days and important events',
    'Parent communication center for coordinating child activities and schedules',
    'Child profile management screen showing health records and preferences',
    'Co-parenting notification panel with alerts for upcoming events and messages',
    'Family coordination dashboard with custody calendar and communication tools'
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

function getBarskyJointFallback(): string {
  const fallbacks = [
    'Food ordering interface showing restaurant menu and ordering options',
    'Restaurant menu browsing screen with food selection and pricing',
    'Food truck location tracking dashboard with real-time updates',
    'Order status and delivery tracking interface for restaurant orders',
    'Restaurant reservation and dining management screen',
    'Mobile food ordering dashboard with menu categories and cart',
    'Food delivery status display showing order progress and timing'
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

function getProjectSpecificFallback(projectContext: string): string {
  if (projectContext.includes('splittime')) {
    return getSplitTimeFallback();
  }
  
  if (projectContext.includes('barsky') || projectContext.includes('joint')) {
    return getBarskyJointFallback();
  }
  
  if (projectContext.includes('herbalink')) {
    const fallbacks = [
      'Herbal medicine consultation interface with practitioner matching',
      'Natural wellness platform showing herbal remedy recommendations',
      'Herbal practitioner discovery screen with consultation booking',
      'Wellness tracking dashboard for natural health management'
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }
  
  if (projectContext.includes('investor') || projectContext.includes('loan')) {
    const fallbacks = [
      'Financial investment dashboard with portfolio management tools',
      'Loan management interface showing application status and details',
      'Banking application screen with account overview and transactions',
      'Investment portfolio tracking interface with market data'
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }
  
  return 'Application interface display';
}

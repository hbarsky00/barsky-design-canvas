import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from "npm:resend@2.0.0";

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const openAIApiKey = Deno.env.get('OPENAI_API_KEY')!;
const resendApiKey = Deno.env.get('RESEND_API_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const resend = new Resend(resendApiKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LeadData {
  name: string;
  email: string;
  company?: string;
  project_type?: string;
  budget_range?: string;
  project_description?: string;
  phone?: string;
  website?: string;
  lead_source?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const leadData: LeadData = await req.json();

    // Store lead in database
    const { data: lead, error: dbError } = await supabase
      .from('leads')
      .insert([leadData])
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw dbError;
    }

    // Generate AI-powered personalized response
    const aiResponse = await generatePersonalizedResponse(leadData);
    
    // Send immediate acknowledgment email
    await sendAcknowledgmentEmail(leadData, aiResponse);
    
    // Send notification to you
    await sendLeadNotification(leadData, lead);
    
    // Schedule follow-up
    await scheduleFollowUp(lead.id, leadData);

    return new Response(JSON.stringify({ 
      success: true, 
      leadId: lead.id,
      message: 'Lead processed successfully'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error processing lead:', error);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function generatePersonalizedResponse(leadData: LeadData): Promise<string> {
  const prompt = `
Generate a personalized response for a potential client inquiry. 

Lead Details:
- Name: ${leadData.name}
- Company: ${leadData.company || 'Not specified'}
- Project Type: ${leadData.project_type || 'Not specified'}
- Budget Range: ${leadData.budget_range || 'Not specified'}
- Project Description: ${leadData.project_description || 'Not specified'}

Write a professional, warm response that:
1. Thanks them for their interest
2. Shows understanding of their specific needs
3. Highlights relevant experience (AI integration, UX/UI design)
4. Mentions next steps
5. Keeps it concise (under 200 words)

Tone: Professional but approachable, confident but not pushy.
`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are Hiram Barsky, an AI-fluent UX Designer. Write personalized responses to potential clients.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 300,
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
}

async function sendAcknowledgmentEmail(leadData: LeadData, personalizedMessage: string) {
  await resend.emails.send({
    from: "Hiram Barsky <hiram@barskydesign.pro>",
    to: [leadData.email],
    subject: `Thanks for reaching out about your ${leadData.project_type || 'project'}, ${leadData.name}!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb;">Hi ${leadData.name},</h2>
        
        <div style="margin: 20px 0; line-height: 1.6;">
          ${personalizedMessage.replace(/\n/g, '<br>')}
        </div>
        
        <div style="margin: 30px 0; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
          <h3 style="color: #1e40af; margin-top: 0;">What happens next?</h3>
          <ul style="color: #475569;">
            <li>I'll review your project details within 24 hours</li>
            <li>We'll schedule a brief discovery call</li>
            <li>I'll prepare a customized proposal for your needs</li>
          </ul>
        </div>
        
        <div style="margin: 30px 0;">
          <p><strong>Recent AI Integration Work:</strong></p>
          <ul style="color: #475569;">
            <li>ChatGPT-powered research tool for healthcare</li>
            <li>AI-enhanced e-commerce personalization</li>
            <li>Intelligent form automation for fintech</li>
          </ul>
        </div>
        
        <div style="margin: 30px 0; text-align: center;">
          <a href="https://barskydesign.pro/projects" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Portfolio</a>
        </div>
        
        <p style="color: #64748b; font-size: 14px;">
          Best regards,<br>
          Hiram Barsky<br>
          AI-Fluent UX Designer<br>
          <a href="mailto:hbarsky01@gmail.com">hbarsky01@gmail.com</a> | 
          <a href="tel:+12016684754">+1 (201) 668-4754</a>
        </p>
      </div>
    `,
  });
}

async function sendLeadNotification(leadData: LeadData, lead: any) {
  const priorityEmoji = lead.priority_score >= 70 ? '🔥' : lead.priority_score >= 40 ? '⭐' : '📋';
  
  await resend.emails.send({
    from: "Lead Notification <notifications@barskydesign.pro>",
    to: ["hbarsky01@gmail.com"],
    subject: `${priorityEmoji} New Lead: ${leadData.name} (Score: ${lead.priority_score})`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #dc2626;">New Lead Captured!</h2>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1f2937;">Lead Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold;">Name:</td><td>${leadData.name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td>${leadData.email}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Company:</td><td>${leadData.company || 'Not specified'}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Project Type:</td><td>${leadData.project_type || 'Not specified'}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Budget Range:</td><td>${leadData.budget_range || 'Not specified'}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Priority Score:</td><td><strong>${lead.priority_score}</strong></td></tr>
          </table>
        </div>
        
        ${leadData.project_description ? `
        <div style="margin: 20px 0;">
          <h3 style="color: #1f2937;">Project Description</h3>
          <p style="background-color: #f9fafb; padding: 15px; border-radius: 6px; border-left: 4px solid #2563eb;">
            ${leadData.project_description}
          </p>
        </div>
        ` : ''}
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://barskydesign.pro/admin/leads" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Manage Lead</a>
        </div>
      </div>
    `,
  });
}

async function scheduleFollowUp(leadId: string, leadData: LeadData) {
  // Schedule a follow-up interaction for 24 hours from now
  const followUpTime = new Date();
  followUpTime.setHours(followUpTime.getHours() + 24);
  
  await supabase
    .from('lead_interactions')
    .insert([{
      lead_id: leadId,
      interaction_type: 'email',
      subject: 'Follow up on your project inquiry',
      content: 'Scheduled follow-up to discuss project details and next steps',
      scheduled_at: followUpTime.toISOString(),
    }]);
}
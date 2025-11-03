import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { RateLimiter } from '../_shared/rateLimiter.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LeadData {
  email: string;
  name: string;
  company?: string;
  projectType?: string;
  budgetRange?: string;
  projectDescription?: string;
  phone?: string;
  website?: string;
  leadSource?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting by IP
    const clientIp = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for') || 'unknown';
    if (!RateLimiter.checkLimit(clientIp)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const leadData: LeadData = await req.json();
    
    // Comprehensive validation
    if (!leadData.email || typeof leadData.email !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const email = leadData.email.trim();
    if (email.length > 254 || email.length < 3) {
      return new Response(
        JSON.stringify({ error: 'Invalid email length' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!leadData.name || typeof leadData.name !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Name is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const name = leadData.name.trim();
    if (name.length < 2 || name.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Name must be 2-100 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate URL if provided
    if (leadData.website && leadData.website.length > 500) {
      return new Response(
        JSON.stringify({ error: 'Website URL too long' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Text field limits
    if (leadData.projectDescription && leadData.projectDescription.length > 2000) {
      return new Response(
        JSON.stringify({ error: 'Description too long (max 2000 chars)' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Sanitize inputs
    const sanitize = (text: string) => text.replace(/[\x00-\x1F\x7F]/g, '').trim();

    // Insert sanitized lead into database
    const { data, error } = await supabase
      .from('leads')
      .insert([{
        email: sanitize(email),
        name: sanitize(name),
        company: leadData.company ? sanitize(leadData.company.substring(0, 100)) : null,
        project_type: leadData.projectType ? sanitize(leadData.projectType.substring(0, 100)) : null,
        budget_range: leadData.budgetRange?.substring(0, 50) || null,
        project_description: leadData.projectDescription ? sanitize(leadData.projectDescription.substring(0, 2000)) : null,
        phone: leadData.phone ? sanitize(leadData.phone.substring(0, 20)) : null,
        website: leadData.website ? sanitize(leadData.website.substring(0, 500)) : null,
        lead_source: leadData.leadSource || 'website',
        status: 'new'
      }])
      .select()
      .single();

    if (error) {
      return new Response(
        JSON.stringify({ error: 'Failed to save lead' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Lead processed successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        leadId: data.id,
        message: 'Lead submitted successfully' 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error: any) {
    console.error('Error in process-lead function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
};

serve(handler);
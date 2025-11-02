import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { encryptLeadData } from '../_shared/encryption.ts';

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
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const leadData: LeadData = await req.json();
    
    // Basic validation
    if (!leadData.email || !leadData.name) {
      return new Response(
        JSON.stringify({ error: 'Email and name are required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Email validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(leadData.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Encrypt sensitive fields before storing
    const encryptedData = await encryptLeadData({
      email: leadData.email,
      phone: leadData.phone
    });

    // Insert lead into database with encrypted sensitive fields
    const { data, error } = await supabase
      .from('leads')
      .insert([{
        email: encryptedData.email,
        name: leadData.name,
        company: leadData.company,
        project_type: leadData.projectType,
        budget_range: leadData.budgetRange,
        project_description: leadData.projectDescription,
        phone: encryptedData.phone,
        website: leadData.website,
        lead_source: leadData.leadSource || 'website',
        lead_status: 'new'
      }])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to save lead' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Lead processed successfully:', data.id);

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
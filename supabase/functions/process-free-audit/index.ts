import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface FreeAuditRequest {
  name: string;
  email: string;
  company?: string;
  website?: string;
  projectType: string;
  budgetRange: string;
  projectDescription: string;
  timeline?: string;
  phone?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: FreeAuditRequest = await req.json();
    
    console.log("Processing free audit request for:", formData.email);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Save lead to database
    const { data: lead, error: leadError } = await supabase
      .from("leads")
      .insert({
        name: formData.name,
        email: formData.email,
        company: formData.company || null,
        website: formData.website || null,
        project_type: formData.projectType,
        budget_range: formData.budgetRange,
        project_description: formData.projectDescription,
        phone: formData.phone || null,
        lead_source: "Free Audit Form",
        lead_status: "new",
        notes: formData.timeline ? `Preferred timeline: ${formData.timeline}` : null
      })
      .select()
      .single();

    if (leadError) {
      console.error("Error saving lead:", leadError);
      throw new Error("Failed to save lead information");
    }

    console.log("Lead saved successfully:", lead.id);

    // Initialize Resend for email notifications
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

    // Send confirmation email to user
    const userEmailResponse = await resend.emails.send({
      from: "Hiram Barsky <hiram@barskydesign.pro>",
      to: [formData.email],
      subject: "Your Free UX Audit Request Received!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Thank you for your free audit request, ${formData.name}!</h1>
          
          <p>I've received your request for a free UX conversion audit and I'm excited to help you improve your ${formData.projectType.toLowerCase()}.</p>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1e293b;">What happens next:</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li>I'll review your project details and current setup</li>
              <li>You'll receive a calendar link within 24 hours to book your 30-minute audit call</li>
              <li>During our call, I'll provide 3 specific improvement recommendations</li>
              <li>You'll get a follow-up summary with actionable insights</li>
            </ul>
          </div>
          
          <p><strong>Your Project Details:</strong></p>
          <ul>
            <li>Project Type: ${formData.projectType}</li>
            <li>Budget Range: ${formData.budgetRange}</li>
            ${formData.company ? `<li>Company: ${formData.company}</li>` : ''}
            ${formData.website ? `<li>Website: <a href="${formData.website}">${formData.website}</a></li>` : ''}
          </ul>
          
          <p>Based on similar projects like <a href="https://barskydesign.pro/case-study-herbalink">Herbalink (65% engagement increase)</a> and <a href="https://barskydesign.pro/case-study-splittime">Splittime (50% faster onboarding)</a>, I'm confident we can identify significant improvement opportunities.</p>
          
          <p>Looking forward to our conversation!</p>
          
          <p>Best regards,<br>
          <strong>Hiram Barsky</strong><br>
          UX/UI Designer & Gen AI Developer<br>
          <a href="https://barskydesign.pro">barskydesign.pro</a></p>
        </div>
      `,
    });

    // Send notification email to Hiram
    const notificationEmailResponse = await resend.emails.send({
      from: "Lead Notifications <leads@barskydesign.pro>",
      to: ["hiram@barskydesign.pro"],
      subject: `🎯 New Free Audit Request: ${formData.name} (${formData.budgetRange})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #dc2626;">🎯 New Free Audit Request</h1>
          
          <div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 20px; margin: 20px 0;">
            <h2 style="color: #991b1b; margin-top: 0;">Lead Priority: ${formData.budgetRange === '$50k+' ? 'HIGH' : formData.budgetRange === '$20k-$50k' ? 'MEDIUM' : 'STANDARD'}</h2>
          </div>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; font-weight: bold;">Name:</td>
              <td style="padding: 12px 0;">${formData.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; font-weight: bold;">Email:</td>
              <td style="padding: 12px 0;"><a href="mailto:${formData.email}">${formData.email}</a></td>
            </tr>
            ${formData.phone ? `
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; font-weight: bold;">Phone:</td>
              <td style="padding: 12px 0;"><a href="tel:${formData.phone}">${formData.phone}</a></td>
            </tr>
            ` : ''}
            ${formData.company ? `
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; font-weight: bold;">Company:</td>
              <td style="padding: 12px 0;">${formData.company}</td>
            </tr>
            ` : ''}
            ${formData.website ? `
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; font-weight: bold;">Website:</td>
              <td style="padding: 12px 0;"><a href="${formData.website}" target="_blank">${formData.website}</a></td>
            </tr>
            ` : ''}
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; font-weight: bold;">Project Type:</td>
              <td style="padding: 12px 0;">${formData.projectType}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; font-weight: bold;">Budget Range:</td>
              <td style="padding: 12px 0;"><strong>${formData.budgetRange}</strong></td>
            </tr>
            ${formData.timeline ? `
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; font-weight: bold;">Timeline:</td>
              <td style="padding: 12px 0;">${formData.timeline}</td>
            </tr>
            ` : ''}
          </table>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0369a1; margin-top: 0;">Project Description:</h3>
            <p style="margin-bottom: 0;">${formData.projectDescription}</p>
          </div>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Next Steps:</strong></p>
            <ol>
              <li>Review their current setup (website/app)</li>
              <li>Send calendar booking link within 24 hours</li>
              <li>Prepare 3 specific recommendations for the audit call</li>
              <li>Follow up with summary and proposal if qualified</li>
            </ol>
          </div>
          
          <p><strong>Lead ID:</strong> ${lead.id}</p>
          <p><strong>Lead Score:</strong> ${lead.priority_score || 'Calculating...'}</p>
        </div>
      `,
    });

    console.log("Emails sent successfully:", { userEmailResponse, notificationEmailResponse });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Your free audit request has been submitted successfully!",
        leadId: lead.id 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error: any) {
    console.error("Error in process-free-audit function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to process audit request",
        success: false 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);
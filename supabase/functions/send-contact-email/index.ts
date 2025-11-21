
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();

    // Send email to site owner
    const emailToOwner = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["hbarsky01@gmail.com"],
      subject: `New Contact: ${formData.subject}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>From:</strong> ${formData.name} (${formData.email})</p>
        <p><strong>Subject:</strong> ${formData.subject}</p>
        <h2>Message:</h2>
        <p>${formData.message}</p>
      `,
    });

    // Send confirmation email to the person who submitted the form
    const emailToSender = await resend.emails.send({
      from: "Hiram Barsky <onboarding@resend.dev>",
      to: [formData.email],
      subject: "Thank you for your message",
      html: `
        <h1>Thank you for reaching out!</h1>
        <p>Hello ${formData.name},</p>
        <p>I've received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br>Hiram Barsky</p>
      `,
    });

    console.log("Emails sent successfully:", { emailToOwner, emailToSender });

    return new Response(
      JSON.stringify({ success: true, message: "Emails sent successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "Failed to send email", 
        error: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

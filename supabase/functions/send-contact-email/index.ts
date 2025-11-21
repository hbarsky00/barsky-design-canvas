
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import DOMPurify from "npm:isomorphic-dompurify@2.14.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Rate limiting
const rateLimiter = new Map<string, number[]>();

function checkRateLimit(identifier: string, maxRequests = 5, windowMs = 60000): boolean {
  const now = Date.now();
  const requests = rateLimiter.get(identifier) || [];
  
  const recentRequests = requests.filter(time => now - time < windowMs);
  
  if (recentRequests.length >= maxRequests) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimiter.set(identifier, recentRequests);
  return true;
}

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
    // Rate limiting check
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip') || 'unknown';
    if (!checkRateLimit(clientIP, 5, 60000)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const formData: ContactFormData = await req.json();

    // Input validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return new Response(
        JSON.stringify({ error: 'All fields are required' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Length validation
    if (formData.name.length > 100 || formData.subject.length > 200 || formData.message.length > 5000) {
      return new Response(
        JSON.stringify({ error: 'Input exceeds maximum length' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Email format validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Sanitize all inputs to prevent HTML injection
    const safeName = DOMPurify.sanitize(formData.name, { ALLOWED_TAGS: [] });
    const safeEmail = DOMPurify.sanitize(formData.email, { ALLOWED_TAGS: [] });
    const safeSubject = DOMPurify.sanitize(formData.subject, { ALLOWED_TAGS: [] });
    const safeMessage = DOMPurify.sanitize(formData.message, { 
      ALLOWED_TAGS: ['br', 'p'],
      ALLOWED_ATTR: []
    });

    // Send email to site owner
    const emailToOwner = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["hbarsky01@gmail.com"],
      subject: `New Contact: ${safeSubject}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>From:</strong> ${safeName} (${safeEmail})</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <h2>Message:</h2>
        <p>${safeMessage}</p>
      `,
    });

    // Send confirmation email to the person who submitted the form
    const emailToSender = await resend.emails.send({
      from: "Hiram Barsky <onboarding@resend.dev>",
      to: [safeEmail],
      subject: "Thank you for your message",
      html: `
        <h1>Thank you for reaching out!</h1>
        <p>Hello ${safeName},</p>
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

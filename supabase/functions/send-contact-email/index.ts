import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import DOMPurify from "npm:isomorphic-dompurify@2.14.0";

const OWNER_EMAIL = "hbarsky01@gmail.com";

// Resend's shared onboarding@resend.dev sender only delivers to the address on
// the Resend account. Set CONTACT_FROM once a domain is verified
// (e.g. "Hiram Barsky <hello@barskydesign.pro>") and both mails go out properly.
const FROM = Deno.env.get("CONTACT_FROM") || "Portfolio Contact <onboarding@resend.dev>";

// Built per request, not at module scope. `new Resend(undefined)` throws during
// import when the key is missing, which kills the worker at boot — the caller
// gets an opaque WORKER_ERROR and the logs show nothing but the status line.
// This way a missing key is a readable 500.
function getResend(): Resend | null {
  const key = Deno.env.get("RESEND_API_KEY");
  if (!key) return null;
  return new Resend(key);
}

const rateLimiter = new Map<string, number[]>();

function checkRateLimit(identifier: string, maxRequests = 5, windowMs = 60000): boolean {
  const now = Date.now();
  const requests = rateLimiter.get(identifier) || [];
  const recentRequests = requests.filter((time) => now - time < windowMs);
  if (recentRequests.length >= maxRequests) return false;
  recentRequests.push(now);
  rateLimiter.set(identifier, recentRequests);
  return true;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resend = getResend();
    if (!resend) {
      console.error("RESEND_API_KEY is not set on this project");
      return json({ success: false, error: "RESEND_API_KEY is not set" }, 500);
    }

    const clientIP =
      req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "unknown";
    if (!checkRateLimit(clientIP, 5, 60000)) {
      return json({ error: "Too many requests. Please try again later." }, 429);
    }

    const formData: ContactFormData = await req.json();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return json({ error: "All fields are required" }, 400);
    }
    if (formData.name.length > 100 || formData.subject.length > 200 || formData.message.length > 5000) {
      return json({ error: "Input exceeds maximum length" }, 400);
    }
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      return json({ error: "Invalid email format" }, 400);
    }

    const safeName = DOMPurify.sanitize(formData.name, { ALLOWED_TAGS: [] });
    const safeEmail = DOMPurify.sanitize(formData.email, { ALLOWED_TAGS: [] });
    const safeSubject = DOMPurify.sanitize(formData.subject, { ALLOWED_TAGS: [] });
    const safeMessage = DOMPurify.sanitize(formData.message, {
      ALLOWED_TAGS: ["br", "p"],
      ALLOWED_ATTR: [],
    });

    // The one that matters: the lead reaching Hiram.
    const owner = await resend.emails.send({
      from: FROM,
      to: [OWNER_EMAIL],
      reply_to: safeEmail,
      subject: `New Contact: ${safeSubject}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>From:</strong> ${safeName} (${safeEmail})</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <h2>Message:</h2>
        <p>${safeMessage}</p>
      `,
    });

    // resend.emails.send resolves with { data, error } instead of throwing, so
    // the previous version reported success even when the send was rejected —
    // the visitor got a thank-you and the message went nowhere.
    if (owner.error) {
      console.error("Owner email failed:", JSON.stringify(owner.error));
      return json({ success: false, error: owner.error.message ?? "Failed to send" }, 500);
    }

    // Best effort. Until a domain is verified in Resend, the shared sender
    // cannot mail a stranger — that must never fail the submission itself.
    let confirmationSent = false;
    try {
      const reply = await resend.emails.send({
        from: FROM,
        to: [safeEmail],
        subject: "Thank you for your message",
        html: `
          <h1>Thank you for reaching out!</h1>
          <p>Hello ${safeName},</p>
          <p>I've received your message and will get back to you as soon as possible.</p>
          <p>Best regards,<br>Hiram Barsky</p>
        `,
      });
      confirmationSent = !reply.error;
      if (reply.error) console.warn("Confirmation email skipped:", JSON.stringify(reply.error));
    } catch (e) {
      console.warn("Confirmation email threw:", e);
    }

    return json({ success: true, confirmationSent }, 200);
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return json({ success: false, error: error?.message ?? "Unknown error" }, 500);
  }
};

serve(handler);

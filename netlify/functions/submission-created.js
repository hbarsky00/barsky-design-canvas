/**
 * Emails Hiram whenever the contact form is submitted.
 *
 * The filename is the trigger — Netlify fires a function named
 * `submission-created` on every verified form submission, with no wiring to
 * forget. That is the point. The alternative is a notification configured by
 * hand in the Netlify UI: invisible to this repo, silently absent until
 * someone notices no email arrived. Which is what happened.
 *
 * Netlify stores every submission regardless of what this function does, so a
 * bad key or a Resend outage costs the notification, never the lead.
 */
const TO = "hbarsky01@gmail.com";
const FROM = "Barsky Design <hello@barskydesign.pro>";

const esc = (v) =>
  String(v == null ? "" : v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

exports.handler = async (event) => {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("RESEND_API_KEY not set — submission stored, no email sent");
    return { statusCode: 200, body: "no key" };
  }

  let data = {};
  try {
    const parsed = JSON.parse(event.body || "{}");
    data = (parsed.payload && parsed.payload.data) || parsed.data || {};
  } catch (e) {
    console.error("could not parse submission payload:", e);
  }

  const name = data.name || "";
  const email = data.email || "";
  const subject = data.subject || "";
  const message = data.message || "";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      // Replying goes straight back to whoever wrote in.
      reply_to: email || undefined,
      subject: `barskydesign.pro — ${subject || "New enquiry"} (from ${name || "unknown"})`,
      html:
        `<h2 style="font:600 18px system-ui;margin:0 0 16px">New message from barskydesign.pro</h2>` +
        `<p style="font:14px system-ui;margin:0 0 6px"><strong>Name:</strong> ${esc(name)}</p>` +
        `<p style="font:14px system-ui;margin:0 0 6px"><strong>Email:</strong> ${esc(email)}</p>` +
        `<p style="font:14px system-ui;margin:0 0 16px"><strong>Subject:</strong> ${esc(subject)}</p>` +
        `<div style="font:14px/1.6 system-ui;white-space:pre-wrap;border-left:3px solid #314ff6;padding-left:14px">${esc(message)}</div>`,
    }),
  });

  // Resend answers with a body rather than throwing, so the status has to be
  // checked explicitly or a rejected send reads as a successful one.
  if (!res.ok) {
    console.error("Resend rejected the send:", res.status, await res.text());
  } else {
    console.log("notification sent for submission from", email);
  }

  return { statusCode: 200, body: "ok" };
};

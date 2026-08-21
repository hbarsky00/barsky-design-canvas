/**
 * Sends Hiram the contact-form email.
 *
 * Called directly by the form, not wired to Netlify's `submission-created`
 * event. The event version was correctly bundled — Netlify returned 403 for it
 * versus 404 for a name that does not exist — and still never fired anything I
 * could observe, with no way to read its logs from here. A function the form
 * calls by name is one I can invoke and verify in a single request.
 *
 * This runs after the Netlify Forms POST has already succeeded, so the
 * submission is stored no matter what happens in here. Worst case is a missing
 * notification, never a lost message.
 */
const TO = "hbarsky01@gmail.com";
const FROM = "Barsky Design <hello@barskydesign.pro>";

const esc = (v) =>
  String(v == null ? "" : v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "POST only" };
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("RESEND_API_KEY missing");
    return { statusCode: 500, body: JSON.stringify({ ok: false, reason: "no-key" }) };
  }

  let d = {};
  try {
    d = JSON.parse(event.body || "{}");
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ ok: false, reason: "bad-json" }) };
  }

  const { name = "", email = "", subject = "", message = "" } = d;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
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

  const text = await res.text();
  if (!res.ok) {
    console.error("Resend rejected:", res.status, text);
    return { statusCode: 502, body: JSON.stringify({ ok: false, status: res.status, detail: text }) };
  }
  return { statusCode: 200, body: JSON.stringify({ ok: true, resend: text }) };
};

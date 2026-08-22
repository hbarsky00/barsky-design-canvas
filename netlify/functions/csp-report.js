/**
 * Collects Content-Security-Policy violation reports.
 *
 * The policy ships in Report-Only mode first: browsers evaluate it, report
 * what it *would* have blocked, and block nothing. Without somewhere to send
 * those reports the only evidence is whatever a person happens to notice in
 * their own DevTools, which is not a basis for turning enforcement on.
 *
 * Reports are logged rather than stored. Netlify keeps function logs, and this
 * exists to answer one question once — "what breaks?" — not to run forever.
 */
export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const r = body["csp-report"] || body;
    console.log(
      "CSP violation:",
      JSON.stringify({
        directive: r["effective-directive"] || r.effectiveDirective,
        blocked: r["blocked-uri"] || r.blockedURL,
        document: r["document-uri"] || r.documentURL,
      })
    );
  } catch (e) {
    console.error("unparseable CSP report:", e);
  }
  // 204 so the browser does not retry or surface anything to the visitor.
  return { statusCode: 204 };
};

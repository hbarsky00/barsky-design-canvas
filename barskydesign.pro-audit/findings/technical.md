# Technical SEO — score 90/100

## What works
- **All six security headers present:** HSTS (`max-age=31536000; includeSubDomains`), CSP (report-only), `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` denying camera/mic/geolocation and opting out of FLoC.
- **Canonicals are self-referential and correct** on every sampled page, in the slashless form the sitemap uses.
- **Sitemap is clean:** 30 URLs, 100% HTTPS, zero trailing slashes, `lastmod` present, referenced from robots.txt.
- **Retired URLs return true 301s** — `/project/splittime`, `/project/business-management`, `/project/wholesale-distribution` all → `/projects`.
- Pages are genuinely prerendered — real bodies, not an SPA shell.

## Findings

### 1. CSP has been report-only long enough to enforce — Medium
**Evidence:** response carries `content-security-policy-report-only`, not `content-security-policy`.
**Why it matters:** report-only blocks nothing. It was deployed this way deliberately to collect violations safely, which was right — but until it is enforced it provides no protection.
**Fix:** review the collected reports from the `csp-report` function, then flip the header name. One word.

### 2. Sitemap still emits `<priority>` and `<changefreq>` — Low
**Evidence:** both tags present in `sitemap.xml`.
**Why it matters:** Google has ignored both for years. Harmless, but it is noise that implies a control you do not have.

### 3. HSTS lacks `preload` — Low
**Evidence:** `max-age=31536000; includeSubDomains`, no `preload` directive.
**Fix:** add `preload` and submit to hstspreload.org — only if you are confident every subdomain will be HTTPS permanently. It is hard to reverse.

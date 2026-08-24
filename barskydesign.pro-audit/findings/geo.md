# GEO / AI Search Readiness — score 78/100

## What works
- **robots.txt allows every AI crawler.** `User-agent: * / Allow: /` means unnamed bots are permitted; GPTBot, ChatGPT-User, PerplexityBot and anthropic-ai are named and allowed.
- **llms.txt is accurate** — every internal link in it returns 200. It correctly reflects the current five live products and omits the retired SplitTime and Blue Sky.
- **The homepage FAQ is now in the served HTML** — 8 questions, present without JavaScript. This is the single most citable asset on the site and it was invisible to non-JS crawlers until 2026-08-22.
- Entity naming is consistent, and the positioning claim is specific enough to be quotable.

## Findings

### 1. Three homepage sections are absent from the served HTML — High
**Evidence:** measured on the live page. `adventures`, `contact` and `blog` return 0 occurrences of their section ids; exactly **3 `animate-pulse` placeholders** sit where they should be. `intro`, `case-studies`, `current-projects`, `bio`, `faq` and `internal-linking` are all present.
**Why it matters:** `LazySection` gates children behind an IntersectionObserver. Any engine that does not scroll — which is most of them — reads placeholder divs. The blog preview and its outbound links are part of how a crawler discovers the writing.
**Fix:** unwrap `blog` (links and cards, cheap). `contact` and `adventures` carry form libraries and media, so those are a real performance trade — decide deliberately.

### 2. robots.txt names a deprecated Anthropic token and misses the current ones — Medium
**Evidence:** `anthropic-ai` is named. **`ClaudeBot`, `Claude-User`, `OAI-SearchBot` and `Google-Extended` are not named at all.**
**Why it matters:** they fall through to `User-agent: *` and are allowed, so nothing is blocked today. But `anthropic-ai` is the legacy token; `ClaudeBot` and `Claude-User` are current. `OAI-SearchBot` is specifically the crawler behind ChatGPT search citations — the exact traffic this site wants.
**Fix:** name them explicitly. Costs nothing and removes the ambiguity.

### 3. `Crawl-delay: 1` applies to the wildcard group — Low
**Evidence:** present under `User-agent: *`.
**Why it matters:** Google ignores it, but several AI crawlers honour it, and it throttles them for no benefit on a 30-page site.

---
name: blog-content-refresh
description: Wipe and rebuild the portfolio blog (src/data/blogData.ts) with a fresh set of 6–8 themed posts, each shipping a generated cover and at least one inline image. Trigger when the user asks to replace, refresh, or re-theme the blog (e.g. "wipe the blogs and make new ones about X", "rebuild the blog around Y topic").
---

# Blog Content Refresh

The portfolio blog reads exclusively from `src/data/blogData.ts` — the `.md` files under `src/content/blog-posts/` are not wired in. To refresh the blog, you replace the `blogPosts` array. That is it.

## Hard rules

- 6 to 8 posts. No fewer, no more, unless the user explicitly asks.
- Every post gets a **cover image** AND at least **one inline image** placed inside the HTML content. "More images and that they make sense" is a recurring user demand — do not skip inline images.
- Generate all images in **one parallel batch** with `imagegen--generate_image` (model `fast`, 1280×720, `.jpg`). Saving them sequentially wastes the user's time and credits.
- Save images under `src/assets/blog/<slug-fragment>-cover.jpg` and `...-inline.jpg`. Do not reuse the legacy `src/assets/blog-*.jpg` files — they belong to the previous theme.
- Import every image at the top of `blogData.ts` with ES6 imports. No `/lovable-uploads/` paths, no remote URLs.
- Inline images render via `<figure><img src="..." loading="lazy" width="1280" height="720" class="w-full h-auto rounded-xl shadow-md" /></figure>`. A small `wrap()` helper at the top of the file keeps this consistent — reuse it.
- Apply the `strategic-principal-voice` skill to the body copy: lead with a belief shift, name the tradeoff, no banned buzzwords. Posts that read like generic Medium content are a failure.
- Tags should be specific to the theme (e.g. "Claude", "Prompt Engineering", "AI Trust") — not generic ("Design", "Tips").

## Workflow

1. **Confirm the theme** if it isn't crystal clear. One question, not three.
2. **Pick 6–8 post titles** that ladder up to the theme. Each title should promise one specific insight, not a topic survey.
3. **Generate all images in parallel** — one `imagegen--generate_image` call per image, all in the same tool-call block. For 7 posts that is 14 parallel calls.
4. **Rewrite `src/data/blogData.ts` end-to-end** with `code--write`. Do not try to surgically edit the old file; the imports and shape change too much.
5. **Verify** with `rg "function-bold|undefined|TODO" src/data/blogData.ts` — Tailwind class typos are the most common bug here (e.g. `function-bold` instead of `font-bold`).

## BlogPost shape (do not change)

```ts
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;       // HTML string, rendered via dangerouslySetInnerHTML downstream
  author: string;
  date: string;
  readTime: string;
  coverImage: string;    // imported asset
  tags: string[];
  slug: string;          // becomes /blog/<slug>
}
```

Author is always `"Hiram Barsky"`. Date format: `"Month D, YYYY"`. `readTime` is `"N min read"`.

## Content HTML conventions (already in use across the site)

- `<h2 class="text-2xl font-bold mt-8 mb-4">` for section headings.
- `<p>` for paragraphs, `<ol class="list-decimal pl-6 mb-4">` / `<ul class="list-disc pl-6 mb-4">` for lists.
- Inline image figure uses the wrapper above. Do not inline raw `<img>` without the figure + rounded-xl shell.
- No `<h1>` inside `content` — the page header owns the H1.

## Downstream that automatically picks up new posts

- `src/components/blog/BlogLanding.tsx` — lists every post in `blogPosts`.
- `src/pages/BlogPost.tsx` / `src/components/blog/BlogPostPage.tsx` — routes by `slug`.
- `src/utils/blogSitemapGenerator.ts` and `src/utils/sitemapGeneration.ts` — pull slugs for the sitemap.
- `src/hooks/useRelatedPosts.tsx` — picks related posts by overlapping tags.

You do not need to touch any of those files. If a post does not appear on `/blog`, check the import path and the slug, not the routing.

## Out of scope (do not touch unless asked)

- Blog landing or post page layout/spacing.
- SEO architecture (`UnifiedSEO`, edge function, index.html).
- The `.md` files under `src/content/blog-posts/` — they are legacy and not rendered.
- Existing non-blog assets in `src/assets/`.

## Pairs with

- `strategic-principal-voice` — required for the body copy.
- `scope-lock` — do not refactor `BlogLanding`, the post page, or SEO files while refreshing content.
- `no-assumptions` — if the theme is vague ("make it about AI" with no angle), ask one focused question before generating 14 images.

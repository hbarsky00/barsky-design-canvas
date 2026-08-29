# Image captions — the house rule

**Every image inside a case study or a blog post carries a caption.** No
exceptions, including hero images and blog cover images.

This is enforced by `scripts/check-image-captions.mjs`, which runs on every
`npm run build`. A missing caption fails the build before anything deploys.

Run it on its own with:

```bash
npm run check:captions
```

---

## Alt text and captions are different jobs

| | `alt` | caption |
|---|---|---|
| Who reads it | Someone who can't see the image | Someone looking right at it |
| When | *Instead of* the image | *Underneath* the image |
| Says | What the picture literally shows | Why it's on the page — the decision, the trade-off, the thing to notice |

There used to be a `caption ?? alt` fallback in `SimpleCaseStudyPage`, and
about half the studies quietly took it — printing screen-reader descriptions
as body prose. That fallback is gone, `caption` is a required field, and the
check rejects a caption that is byte-identical to its alt.

A good caption adds something the picture can't say on its own:

> alt: `"Choose a Park — a curated list with distance and amenities"`
> caption: `"A curated list of parks with distance and amenities. You can't drop your own pin, and the restriction is the feature."`

Write them in Hiram's voice — first person, direct, the decision rather than
the description. Never invent a metric, a client, or an outcome to fill one.

---

## Adding an image to a case study

Case-study pages live in `src/pages/Structured*CaseStudy.tsx` (plus
`ManuscriptRxCaseStudy.tsx`) and render through
`src/components/case-study/SimpleCaseStudyPage.tsx`.

```tsx
images: [
  {
    src: "/images/project/screen.webp",
    alt: "What the screenshot shows",
    caption: "Why it's here and what to notice in it.",
    width: 1440,          // intrinsic size — stops upscaling, reserves space
    height: 900,
  },
],
```

`caption` is required on `SimpleCaseStudyImage`, on `CaseStudyFigureProps`,
and on `HeroMediaProps`, so TypeScript catches a missing one while you type.
The build check catches it even though `vite build` doesn't typecheck.

Videos (`SimpleCaseStudyVideo`) already had a required `caption` and still do.

---

## Adding an image to a blog post

Blog bodies in `src/data/blogData.ts` are HTML strings, so TypeScript can't
see inside them. Always use this shape — never a bare `<img>`:

```html
<figure class="my-8">
  <img src="/images/project/screen.webp" alt="What the screenshot shows" class="w-full rounded-xs" />
  <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">Why it's here and what to notice in it.</figcaption>
</figure>
```

For a stock photo, the caption comes first and the credit follows it in a
muted span — a bare "Photo by … on Unsplash" is an attribution, not a caption,
and the check rejects it as one:

```html
<figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">The caption sentence. <span class="opacity-70">Photo by NAME on Unsplash</span></figcaption>
```

`figure`, `figcaption` and `span` are all allowlisted in
`src/utils/htmlSanitizer.ts`. If you reach for a new tag, add it there too or
DOMPurify will silently unwrap it.

### Cover images

Every post needs `coverCaption` next to `coverImage` in `blogData.ts`. It's a
required field on the `BlogPost` interface and it renders under the hero in
`src/pages/BlogPost.tsx`.

---

## What's out of scope

Navigational thumbnails — post cards, project cards, related-post strips —
don't need captions. Their link title is the label. This rule is about images
inside the body of a piece of writing.

---

## After changing visible copy

Captions are visible page copy, so crawlers see the prerendered snapshot, not
the React render. After any caption change:

```bash
npm run build && npm run capture-bodies && npm run build
```

The capture step needs a built `dist/index.html` to exist first, which is why
the build runs on both sides of it.

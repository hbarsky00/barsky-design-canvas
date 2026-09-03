/**
 * The small copy of a blog cover, for the card grids.
 *
 * Covers double as case-study heroes, so they are 1500-2880px wide, while the
 * cards on / and /blog draw them at about 339px. Asking for the hero there had
 * 22 of the 24 images on /blog oversized by 2.5x or more — the worst a 2880px
 * file rendered at 339px.
 *
 * The suffix is `-thumb`, not `-card`: `-card` already means the 900px images
 * the homepage case-study cards use, at a different slot size.
 *
 * `scripts/generate-card-images.mjs` writes a `<stem>-thumb.webp` at 678px next
 * to every cover, for every cover rather than only the large ones, so this
 * always points at a file that exists. Run that script after adding a post.
 */
export const cardImage = (src: string): string =>
  src.replace(/\.(webp|jpg|jpeg|png)$/i, "-thumb.webp");

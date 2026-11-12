import { Product, Category } from "@/types/product";

/**
 * Two templates, sold by request.
 *
 * Three things were removed here on 2026-11-12, all for the same reason —
 * nothing in this repo backed them up:
 *
 *  - a "Best Seller" badge on a product with no sales record anywhere
 *  - "helped me land high-paying clients", a claim with no traceable outcome
 *  - cover art containing a fake preview: grey skeleton bars arranged to look
 *    like template content a buyer could inspect. There is no preview until
 *    there is a real file to preview.
 *
 * FLAGGED for Hiram: the actual template files, and a payment link. Until both
 * exist the buy action routes to contact, which is true, rather than a cart,
 * which was not.
 */
export const products: Product[] = [
  {
    id: "case-study-templates",
    name: "Case study templates",
    description:
      "Five structures for writing up work you have already done — each one a sequence of prompts that forces the specifics a hiring manager reads for: what was at stake, what the constraint was, and what you decided when two good options conflicted.",
    price: 10,
    category: "templates",
  },
  {
    id: "content-templates",
    name: "Content templates",
    description:
      "Post structures for LinkedIn, email and short-form social, built around pointing people at work rather than at opinions. The same skeletons I use to make a case study travel further than its own page.",
    price: 10,
    category: "templates",
  },
];

export const categories: Category[] = [
  { id: "all", name: "All Products" },
  { id: "templates", name: "Templates" },
];

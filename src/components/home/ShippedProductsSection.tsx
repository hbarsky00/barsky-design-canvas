import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { imgDims } from "@/utils/imageDims";
import SectionHeader from "@/components/shared/SectionHeader";

/**
 * Replaces "What I'm Working On Now", which carried a hand-typed
 * "Last Updated Friday September 19th, 2025" eyebrow and four Loom videos of
 * experiments — all still labelled "Work in Progress" fourteen months later.
 * A section whose whole claim is "now" is worse than nothing once it rots, and
 * the hand-maintained date was the thing that rotted. There is no date here on
 * purpose: nothing in this section expires.
 *
 * What replaced it is the thing buyers actually filter on — products that are
 * live, with links that open them. Every URL below returned 200 when the
 * screenshots were captured; each image is a real 2x capture of that site, not
 * a mockup. Before adding a row here, load the URL and screenshot it.
 */

interface ShippedProduct {
  slug: string;
  name: string;
  url: string;
  what: string;
  stack: string;
}

const products: ShippedProduct[] = [
  {
    slug: "herbalink",
    name: "HerbaLink",
    url: "https://herbalink.live",
    what: "Booking marketplace for certified herbalists, with a searchable herb library behind every recommendation.",
    stack: "React · Supabase · Stripe",
  },
  {
    slug: "catchbuddy",
    name: "CatchBuddy",
    url: "https://catchbuddy.fit",
    what: "Pickup sports meetups built around a trust layer — you know who you are meeting before you show up at the park.",
    stack: "React · Supabase · PWA",
  },
  {
    slug: "stips",
    name: "Stips",
    url: "https://stips.bet",
    what: "Prediction markets anyone can open. Buy Yes or No on a real-world event and the price moves as people trade.",
    stack: "React · Supabase · Edge Functions",
  },
  {
    slug: "ringrival",
    name: "Ring Rival",
    url: "https://ringrival.today",
    what: "Mobile boxing game with a career mode — timing-based combat, opponent AI, persistent rankings.",
    stack: "React · Canvas · TypeScript",
  },
  {
    slug: "firelion",
    name: "Fire Lion",
    url: "https://firelion.me",
    what: "Canvas arcade game. Hold to fly, procedural obstacles, score that survives a refresh.",
    stack: "React · Canvas · TypeScript",
  },
];

const ShippedProductsSection: React.FC = () => {
  return (
    <section className="py-12 md:py-16 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <SectionHeader
          as="h2"
          eyebrow="Shipped, not mocked up"
          title="Five products you can open right now"
        />

        <div className="mb-8 md:mb-12 text-center">
          <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-3xl mx-auto">
            Each of these was designed and built by one person — me — from the
            first screen through the React front end, the database and the
            launch. The links go to the running product, not a case study.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {products.map((product, index) => (
            <motion.li
              key={product.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: Math.min(index, 3) * 0.08 }}
            >
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-md-sys-outline-variant/40 bg-background/70 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img
                    {...imgDims(`/images/shipped/${product.slug}.webp`)}
                    src={`/images/shipped/${product.slug}.webp`}
                    alt={`The ${product.name} home screen as it looks today`}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    loading="lazy"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="flex items-center gap-1.5 text-subsection-title font-semibold leading-tight text-foreground group-hover:text-primary">
                    {product.name}
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary motion-reduce:transform-none motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                  </h3>

                  <p className="mt-2 flex-1 leading-relaxed text-muted-foreground">
                    {product.what}
                  </p>

                  <p className="mt-5 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground/80">
                    {product.stack}
                  </p>

                  <span className="mt-4 inline-flex min-h-[44px] items-center text-sm font-medium text-primary">
                    Open {product.name}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                </div>
              </a>
            </motion.li>
          ))}

          {/* Sixth cell. Five products fill a three-column grid awkwardly, and a
              founder who has just opened two of these has nowhere to go next —
              so the empty cell becomes the next step rather than whitespace. */}
          <motion.li
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: 0.24 }}
          >
            <Link
              to="/contact"
              className="group flex h-full flex-col justify-center rounded-2xl border border-primary/30 bg-primary/5 p-6 transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <h3 className="text-subsection-title font-semibold leading-tight text-foreground">
                Want yours in this list?
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Tell me what you are building and where it is stuck. I will tell
                you what I would ship first.
              </p>
              <span className="mt-5 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-primary">
                Start a conversation
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </motion.li>
        </ul>
      </div>
    </section>
  );
};

export default ShippedProductsSection;

import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * Until now the router answered every unmatched URL with
 * `<Navigate to="/" replace />`: a visitor arriving on a dead link — a stale
 * share, an old barsky.design URL, a typo — was teleported to the homepage
 * with no word about what had happened, and the back button put them straight
 * back on the dead URL. Netlify was already serving these with a 404 status
 * and the title "Page not found", so the shell and the app disagreed.
 *
 * Four exits rather than one "go home": a reader who landed here wanted
 * something specific, and the work is the likeliest thing it was.
 */
const EXITS = [
  { to: "/#case-studies", label: "Case studies", hint: "How the work actually went, decisions included." },
  { to: "/services", label: "What I do", hint: "Design through React front end, database and launch." },
  { to: "/blog", label: "Writing", hint: "Notes on shipping software that holds up." },
  { to: "/contact", label: "Get in touch", hint: "Tell me what you're building." },
];

const NotFound: React.FC = () => (
  <div className="flex flex-col min-h-screen bg-muted/30">
    <Header />
    <main
      id="main-content"
      className="flex-grow pt-[calc(var(--header-height,64px)+24px)] pb-16 px-4 md:px-6"
    >
      <div className="max-w-3xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          404
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          That page isn't here
        </h1>
        <p className="mt-3 text-muted-foreground text-base md:text-lg">
          The link is probably out of date, or the address has a typo. Here is
          where to pick up whatever you came for:
        </p>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {EXITS.map((exit) => (
            <li key={exit.to}>
              <Link
                to={exit.to}
                className="flex h-full flex-col justify-start gap-1 rounded-lg border border-border/60 bg-white p-5
                           transition-colors hover:border-primary/40 hover:bg-primary/5
                           focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--blue-accent))]"
              >
                <span className="text-base font-semibold text-foreground">
                  {exit.label}
                </span>
                <span className="text-sm text-muted-foreground">{exit.hint}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
    <Footer />
  </div>
);

export default NotFound;

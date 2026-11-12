import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Service } from "@/data/servicesDetail";
import { getStructuredCaseStudy } from "@/data/structuredCaseStudies";

/**
 * The long-form service page carried over from barsky.design.
 *
 * It is a different shape from the existing ServiceDetail component, which
 * renders the three /design-services pages — this one has a definition, the
 * problem, what's included, the process, proof, FAQs, the engagement shape and
 * an honest "not for". Rather than flatten that into the older component and
 * lose two thirds of it, it gets its own renderer.
 */

/**
 * The source lists proof by case-study slug, and several of those studies
 * (nudgeme, stips, roicalc, ring-rival) were retired on this site — their
 * /project routes 301 to the homepage. Linking at them would ship dead links,
 * so proof is filtered to studies that actually exist here. Nothing is
 * substituted in; a service with no surviving proof simply shows none.
 */
const liveProof = (slugs: string[]) =>
  slugs
    .map((slug) => ({ slug, study: getStructuredCaseStudy(slug) }))
    .filter(
      (p): p is { slug: string; study: NonNullable<ReturnType<typeof getStructuredCaseStudy>> } =>
        Boolean(p.study)
    );

const ServiceLongform: React.FC<{ service: Service }> = ({ service }) => {
  const proof = liveProof(service.proof);

  return (
    <article className="pb-20">
      {/* Lede */}
      <header className="bg-gradient-to-b from-slate-50 via-white to-white">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 sm:py-20">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-slate-500 sm:text-xs">
            Services
          </p>
          <h1 className="mt-4 font-display text-[2rem] font-semibold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {service.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">{service.blurb}</p>

          <ul className="mt-7 flex flex-wrap gap-2">
            {service.points.map((point) => (
              <li
                key={point}
                className="rounded-full border border-slate-900/10 bg-white px-3 py-1.5 text-sm text-slate-700"
              >
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-9">
            <Link
              to="/contact"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary px-5 py-3 font-medium text-primary-foreground shadow-md transition-colors hover:bg-primary/90"
            >
              Start a conversation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        {/* The definition is written to stand alone if an answer engine lifts
            it, so it is the first prose on the page and is not buried. */}
        <section className="border-l-2 border-primary/40 py-8 pl-5">
          <p className="text-lg leading-relaxed text-slate-800">{service.definition}</p>
        </section>

        <section className="py-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-900">
            When this is the problem
          </h2>
          <ul className="mt-5 space-y-3">
            {service.problem.map((line) => (
              <li key={line} className="flex gap-3 text-slate-600">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span className="leading-relaxed">{line}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="py-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-900">
            What it includes
          </h2>
          <dl className="mt-5 space-y-5">
            {service.includes.map((item) => (
              <div key={item.title} className="rounded-xl border border-slate-900/10 bg-white p-5">
                <dt className="font-medium text-slate-900">{item.title}</dt>
                <dd className="mt-1.5 leading-relaxed text-slate-600">{item.body}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="py-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-900">
            How it runs
          </h2>
          <ol className="mt-5 space-y-5">
            {service.process.map((item, i) => (
              <li key={item.step} className="flex gap-4">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium text-slate-900">{item.step}</p>
                  <p className="mt-1 leading-relaxed text-slate-600">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {proof.length > 0 && (
          <section className="py-8">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-900">
              Where this shows up in the work
            </h2>
            <ul className="mt-5 space-y-3">
              {proof.map(({ slug, study }) => (
                <li key={slug}>
                  <Link
                    to={`/project/${slug}`}
                    className="group flex items-start gap-3 rounded-xl border border-slate-900/10 bg-white p-5 transition-colors hover:border-primary/40"
                  >
                    <span className="flex-1">
                      <span className="block font-medium text-slate-900 group-hover:text-primary">
                        {study.title}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-slate-600">
                        {study.description}
                      </span>
                    </span>
                    <ArrowRight
                      className="mt-1 h-4 w-4 shrink-0 text-slate-400 group-hover:text-primary"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="py-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-900">
            What an engagement looks like
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">{service.shape}</p>
          {/* Saying who this is not for stops bad-fit calls before they book —
              that is the whole reason the field exists, so it is not buried. */}
          <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50/60 p-5 leading-relaxed text-slate-700">
            <span className="font-medium text-slate-900">Not for: </span>
            {service.notFor}
          </p>
        </section>

        {service.faqs.length > 0 && (
          <section className="py-8">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-900">
              Questions
            </h2>
            <dl className="mt-5 space-y-6">
              {service.faqs.map((faq) => (
                <div key={faq.q}>
                  <dt className="font-medium text-slate-900">{faq.q}</dt>
                  <dd className="mt-1.5 leading-relaxed text-slate-600">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <section className="mt-6 rounded-2xl bg-slate-900 p-8 text-center">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-white">
            Think this is the one you need?
          </h2>
          <p className="mx-auto mt-3 max-w-md leading-relaxed text-white/70">
            Tell me what you are building and where it is stuck. I will tell you
            whether this is the right engagement, or which one is.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white px-5 py-3 font-medium text-slate-900 transition-colors hover:bg-white/90"
          >
            Get in touch
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      </div>
    </article>
  );
};

export default ServiceLongform;

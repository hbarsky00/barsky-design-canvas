/**
 * Long-form content for /services and the three /design-services/* pages.
 *
 * These four pages were 169-195 words each against an 800-word baseline, and
 * /services stuffed "design" at 10.31% density. They are the commercial-intent
 * landing pages on a site whose 40 blog posts are all substantial, so they were
 * the weakest content on the site and the pages a buyer actually lands on.
 *
 * Every claim here is either Hiram's own established positioning or verifiable
 * from the case studies. No rate, no certification claim, no invented metric.
 */

export interface ServiceSection {
  id: string;
  heading: string;
  /** Paragraphs of prose. Kept as prose deliberately — these pages were bullets. */
  body: string[];
  bullets?: { label: string; text: string }[];
}

export interface RelatedLink {
  href: string;
  label: string;
  note: string;
}

export interface ServicePageContent {
  /** The h1. */
  title: string;
  /** One-sentence standfirst under the h1. */
  standfirst: string;
  /**
   * The citable passage: a self-contained 40-80 word answer to the question the
   * page is trying to rank for. The audit found zero of these on / and /services —
   * this is the unit an answer engine needs in order to quote the page.
   */
  answer: string;
  sections: ServiceSection[];
  /** Real internal links. Case studies previously had 1-3 inbound links each. */
  work: RelatedLink[];
  reading: RelatedLink[];
}

const PROCESS_NOTE =
  "Every engagement starts with a call and a written scope before any money changes hands. I don't publish a day rate, because a two-week design pass and a six-month build aren't the same conversation — the scope decides the number, and you see it in writing first.";

export const UX_UI_DESIGN: ServicePageContent = {
  title: "Product Design Services",
  standfirst:
    "Research, interface design and a working front end — from one person who sees the decision through to production.",
  answer:
    "Product design here means the whole path: interviews and research, information architecture, interface design, a design system, then the React front end that ships it. I work as one person rather than a handoff chain, which means the person who chose the interaction is the person who builds it. Fifteen years across fintech, healthcare and pharma.",
  sections: [
    {
      id: "research",
      heading: "Research that changes the design",
      body: [
        "Research is only worth the time if it moves a decision. I start by finding out what people are actually doing today — the spreadsheet they keep alongside your product, the step they skip, the field they fill in wrong every time. That work is interviews, session recordings where they exist, and reading whatever support tickets you already have.",
        "On the DAE Search project, employee interviews were the thing that reframed the problem: the search box worked, but nobody trusted the results enough to stop asking a colleague. No amount of interface polish would have surfaced that. It changed what got built.",
        "If you have no users yet, research looks different and I say so rather than running a study that produces nothing. There are ways to validate a direction before anyone has signed up, and there are ways that only produce the answer you wanted.",
      ],
    },
    {
      id: "interface-design",
      heading: "Interface and interaction design",
      body: [
        "Screens, states, and the paths between them. The part that takes the time is not the happy path — it is the empty state, the error, the half-filled form, the record that arrived with a field missing. Those are where products feel broken, and they are usually what got skipped.",
        "I design in a system rather than as a pile of screens: type scale, spacing steps, colour roles, component states. That is what keeps the fortieth screen consistent with the first, and what makes the build fast instead of bespoke each time.",
        "Accessibility is part of the design pass, not an audit afterwards. Keyboard paths, visible focus, and contrast ratios measured with a contrast tool rather than judged by eye — hand-picked accent colours fail AA far more often than they look like they should. I work to the WCAG 2.2 AA criteria; that is a description of how I build, not a certification.",
      ],
    },
    {
      id: "prototyping",
      heading: "Prototypes, and when to skip them",
      body: [
        "A prototype earns its cost when there is a real disagreement to settle or a flow nobody can picture. Then it is the cheapest way to find out. When the team already agrees, a prototype is a rehearsal of work you could simply do — and building it in React often takes less time than faking it.",
        "That judgement is most of what you are buying. Generating screens is close to free now; deciding which four to delete is the work.",
      ],
    },
    {
      id: "deliverables",
      heading: "What you actually get",
      body: [
        "No slide deck as the final artefact. The output is the thing itself, plus enough written reasoning that the next person can tell why a decision went the way it did.",
      ],
      bullets: [
        { label: "Research notes", text: "what people said, what it implies, and which decisions it settles." },
        { label: "Design system", text: "tokens, components and their states — in code, not only in a design file." },
        { label: "Screens and flows", text: "including the empty, loading, error and partial-data states." },
        { label: "A front end", text: "React and TypeScript, responsive, keyboard-navigable, deployed where you can click it." },
        { label: "Written decisions", text: "short notes on the calls that were close, so they survive after I leave." },
      ],
    },
    {
      id: "how-it-works",
      heading: "How an engagement runs",
      body: [
        PROCESS_NOTE,
        "After that it is short cycles with something visible at the end of each one. You get a URL early and it stays current — reviewing a real page beats reviewing a screenshot, and it surfaces the problems that only appear at a real width on a real phone.",
        "I work remotely with teams anywhere. Async by default, with a call when a decision needs a conversation instead of a thread.",
      ],
    },
    {
      id: "who-its-for",
      heading: "Who this suits, and who it doesn't",
      body: [
        "It suits a team that needs one person to own product design through to a shipped front end — a founder without an in-house designer, or a product team that needs a specific surface built properly without adding headcount.",
        "It suits regulated work. Fintech, healthcare and pharma carry constraints that shape the interface rather than decorate it: approval gates, audit trails, the fields you may not pre-fill. I have spent fifteen years in those constraints.",
        "It does not suit a project that needs a five-person team in parallel, or one where the design is already finished and only needs pixel-pushing. I will say so on the call rather than take it.",
      ],
    },
  ],
  work: [
    { href: "/project/dae-search", label: "DAE Search", note: "enterprise data discovery — where research reframed the problem." },
    { href: "/project/herbalink", label: "HerbaLink", note: "designing credential trust into a practitioner marketplace." },
    { href: "/project/business-management", label: "Blue Sky", note: "consolidating small-business operations into one system." },
  ],
  reading: [
    { href: "/blog/research-without-users", label: "User research without users", note: "validating a direction before anyone has signed up." },
    { href: "/blog/design-systems-that-get-used", label: "Design systems that get used", note: "why most of them are abandoned." },
    { href: "/blog/beautiful-interface-doesnt-convert", label: "Why beautiful interfaces don't convert", note: "aesthetics are not the mechanism." },
  ],
};

export const MOBILE_APP_DESIGN: ServicePageContent = {
  title: "Mobile App Design Services",
  standfirst:
    "Design and build for phones — where the constraints are real and the excuses don't survive contact with a thumb.",
  answer:
    "Mobile app design here covers the interface, the interaction model and the front-end build for phone-first products. That means designing at 390 points wide before designing wide, treating touch targets and one-handed reach as constraints rather than checkboxes, and testing on a real device because a narrow browser window is not a phone.",
  sections: [
    {
      id: "phone-first",
      heading: "Designing at phone width first",
      body: [
        "A layout designed wide and then squeezed is obvious to anyone holding a phone: the type ends up a step too small, the hero pushes the actual content below the fold, and two sections collide in a way nobody saw on a laptop. Designing at phone width first and letting the layout earn its extra space is more work up front and far less rework later.",
        "Touch targets get a real minimum, not an aspiration. Reach matters too — a primary action at the top of a tall screen is a stretch on a large phone, and that shows up as hesitation rather than as a complaint anyone files.",
      ],
    },
    {
      id: "states",
      heading: "The states that make an app feel finished",
      body: [
        "Mobile punishes missing states harder than the web does. Connections drop mid-action, a screen gets backgrounded halfway through a form, a list arrives empty on first launch. An app that handles those reads as solid; one that doesn't reads as broken, whatever the visual design looks like.",
        "So the work covers first-run empty states, loading that reserves the space it will fill rather than shifting the page, offline and stale data, and errors that say what to do next instead of naming an exception.",
      ],
    },
    {
      id: "build",
      heading: "Build, and what runs where",
      body: [
        "For most products the honest answer is a responsive web app: one codebase, no store review, instant updates, and a home-screen install if people want it. That is the right default and I will say so even though a native build bills more.",
        "Native is the answer when you need what only native gives — background capture, system-level integration, hardware the browser can't reach. I have shipped against those APIs and their ordering traps are real, so I would rather scope that deliberately than discover it late.",
      ],
    },
    {
      id: "deliverables",
      heading: "What you actually get",
      body: [
        "A working app you can hold, not a set of exported screens.",
      ],
      bullets: [
        { label: "Phone-first screens", text: "designed at real device widths, with the tablet and desktop layouts derived from them." },
        { label: "Interaction model", text: "navigation, gestures, and what each one does when it fails." },
        { label: "Complete states", text: "first run, empty, loading, offline, stale, error, success." },
        { label: "The front end", text: "React and TypeScript, deployed to a URL you can open on your own phone." },
        { label: "Device verification", text: "checked on a real device and a simulator, not only in a resized browser." },
      ],
    },
    {
      id: "how-it-works",
      heading: "How an engagement runs",
      body: [
        PROCESS_NOTE,
        "You get a link you can open on your phone in the first cycle, and it stays current. That is deliberate: most of the useful feedback on a mobile product arrives the moment someone uses it standing up, one-handed, on their own connection.",
      ],
    },
    {
      id: "who-its-for",
      heading: "Who this suits",
      body: [
        "Founders taking a phone-first product from nothing to something people can use, and teams with a web product whose mobile experience was an afterthought and now carries most of the traffic.",
        "It suits work where trust has to be designed rather than asserted — booking a practitioner, handling money, anything where a person is deciding whether to rely on you. That is a large part of what fifteen years in fintech and healthcare teaches.",
      ],
    },
  ],
  work: [
    { href: "/project/herbalink", label: "HerbaLink", note: "phone-first booking for a marketplace where credentials decide trust." },
    { href: "/project/business-management", label: "Blue Sky", note: "operations work that had to survive being done on a phone." },
    { href: "/project/dae-search", label: "DAE Search", note: "enterprise search made usable away from a desk." },
  ],
  reading: [
    { href: "/blog/when-trust-is-the-product", label: "When trust is the product", note: "designing for the moment someone decides to rely on you." },
    { href: "/blog/demo-works-shipping-is-different", label: "The demo works; shipping is different", note: "the gap between a prototype and a product." },
    { href: "/blog/a-filter-nobody-opens", label: "A filter nobody opens", note: "what usage data says about features you were sure about." },
  ],
};

export const WEB_DEVELOPMENT: ServicePageContent = {
  title: "Web Development Services",
  standfirst:
    "React front ends, built by the person who designed them — including the database, the deploy and the parts nobody demos.",
  answer:
    "Web development here means the front end and the thin backend behind it: React and TypeScript, a real database, forms that actually deliver, and a deploy pipeline that runs on every push. I design and build the same product, so there is no handoff where intent gets lost between a design file and the code.",
  sections: [
    {
      id: "front-end",
      heading: "The front end",
      body: [
        "React and TypeScript, built with Vite, styled with a token system rather than ad-hoc values. Components carry their states, the type scale is a scale, and spacing comes from a step set — which is what stops the twentieth page drifting from the first.",
        "Performance is treated as a build concern rather than a later audit. Images get their intrinsic dimensions so the layout doesn't jump, photographs ship in a format sized for the web, and the critical path stays small enough that the first paint isn't waiting on a bundle.",
        "Keyboard and screen-reader paths get built as the component is built. Retrofitting focus management into a modal after the fact is strictly more expensive than writing it once.",
      ],
    },
    {
      id: "backend",
      heading: "The parts behind it",
      body: [
        "Most products of this size need less backend than people expect: a database, authentication, a few server functions, and somewhere for files to live. Reaching for more architecture than that buys complexity you will maintain forever.",
        "So: a managed Postgres database, row-level access rules that are actually tested with a signed-in user rather than assumed, serverless functions for the handful of things that must run server-side, and secrets held as environment variables rather than committed. The last one sounds obvious and is the most common thing I find broken.",
      ],
    },
    {
      id: "shipping",
      heading: "Shipping, and staying shipped",
      body: [
        "Continuous deploys from the main branch, with the build doing the work: type checking, the generated sitemap, prerendered HTML for every route so crawlers and AI agents get real content instead of an empty shell.",
        "That last point is worth saying plainly, because it is the most common defect I find on otherwise well-built React sites. A single-page app serves a crawler an empty div unless something renders it first. Prerendering every route at build time costs nothing per visit and is the difference between being indexed and being invisible.",
        "Then the checks that catch regressions rather than describing them: a link check across the built output, an image-weight budget, security headers set and verified in a real browser.",
      ],
    },
    {
      id: "deliverables",
      heading: "What you actually get",
      body: [
        "A repository you own, deployed, with the reasoning written down.",
      ],
      bullets: [
        { label: "The codebase", text: "React and TypeScript in your repository, with commit history that explains itself." },
        { label: "A live deploy", text: "continuous deploys from main, with preview builds for branches." },
        { label: "Database and functions", text: "schema, access rules, and the server-side pieces, documented." },
        { label: "Search and AI visibility", text: "prerendered routes, structured data, sitemap, robots and llms.txt." },
        { label: "Handover notes", text: "how to run it, how to deploy it, and which decisions were close calls." },
      ],
    },
    {
      id: "how-it-works",
      heading: "How an engagement runs",
      body: [
        PROCESS_NOTE,
        "Work lands in small pieces on a branch, deployed to a preview URL, reviewed, merged. You can watch it happen rather than waiting for a reveal.",
      ],
    },
    {
      id: "who-its-for",
      heading: "Who this suits",
      body: [
        "Teams that need a front end built properly by someone who will also make the design decisions, and founders who need one person to take a product from a design to something running on a domain.",
        "It also suits inheriting a codebase someone else abandoned. That work is unglamorous and I am willing to do it: read the thing, find out what is actually load-bearing, then change it without breaking the parts nobody documented.",
      ],
    },
  ],
  work: [
    { href: "/project/herbalink", label: "HerbaLink", note: "designed and built end to end, live in production." },
    { href: "/project/dae-search", label: "DAE Search", note: "enterprise search interface and data lineage views." },
    { href: "/project/business-management", label: "Blue Sky", note: "one system replacing a stack of disconnected tools." },
  ],
  reading: [
    { href: "/blog/designer-who-codes-argument-is-over", label: "The designer-who-codes argument is over", note: "why the handoff was the expensive part." },
    { href: "/blog/two-bugs-ai-wrote-that-i-had-to-find", label: "Two bugs AI wrote that I had to find", note: "what generated code gets wrong quietly." },
    { href: "/blog/finding-the-data-is-half-the-job", label: "Finding the data is half the job", note: "the unglamorous part of building on real data." },
  ],
};

export const SERVICE_PAGES: Record<string, ServicePageContent> = {
  "/design-services/ux-ui-design": UX_UI_DESIGN,
  "/design-services/mobile-app-design": MOBILE_APP_DESIGN,
  "/design-services/web-development": WEB_DEVELOPMENT,
};

/** The /services hub. Shorter per-section than the three detail pages, but it
 *  carries the answer passage and the links out, which it previously had neither of. */
export const SERVICES_OVERVIEW = {
  answer:
    "I design and develop SaaS, web apps, mobile apps and internal tools — one person, from product design through React front end, database and launch. Fifteen years across fintech, healthcare and pharma. That means research, interface design, a design system, the front end, the database and the deploy are one continuous job rather than a chain of handoffs.",
  sections: [
    {
      id: "one-person",
      heading: "One person, end to end",
      body: [
        "The usual arrangement splits a product across a researcher, a designer, a front-end developer and whoever owns the deploy. Every boundary is a place where intent gets restated and something gets lost — usually the reason behind a decision, which is the part that mattered.",
        "I do the whole path instead. The person who chose the interaction writes the component. The person who designed the empty state is the one who finds out it never renders. That is faster, and more importantly it is more accurate.",
      ],
    },
    {
      id: "what-a-project-looks-like",
      heading: "What a project looks like",
      body: [
        "A call, then a written scope with a number in it before anything starts. Then short cycles, each ending in something you can open — a URL, not a screenshot. Async by default, with calls when a decision needs a conversation.",
        "I don't publish a day rate. A two-week design pass and a six-month build are different conversations, and quoting before I understand the scope would only be a number I'd have to revise.",
      ],
    },
    {
      id: "industries",
      heading: "Where the experience is",
      body: [
        "Fintech, healthcare and pharma, across fifteen years. Those are domains where the constraints shape the interface rather than decorate it — approval gates, audit trails, compliance review, the fields you are not allowed to pre-fill, the disclosure that has to appear before the action and not after.",
        "Designing inside those rules is a different job from designing around them, and it is most of what I have done.",
      ],
    },
    {
      id: "what-it-costs",
      heading: "What it costs, and how scoping works",
      body: [
        "I don't publish a rate. It would be a number I'd have to revise the moment I understood the work, and a page that quotes a figure before hearing the problem is advertising, not pricing.",
        "What I do instead: a call, then a written scope that names the deliverables, the sequence and the number. If the scope changes mid-project — and it usually does, because building something teaches you what it should have been — we change it deliberately, in writing, rather than absorbing it quietly on either side.",
        "Two things make a project cheaper. Knowing what you are trying to learn, so research answers a question rather than surveying a field. And having someone who can decide — a project with three stakeholders and no decision-maker spends most of its budget on rework.",
      ],
    },
    {
      id: "ai-and-the-work",
      heading: "Where AI fits, honestly",
      body: [
        "Generating screens and generating code are both close to free now. That changed which parts of this job are hard, and it did not change the hard parts themselves.",
        "What it speeds up: first drafts, boilerplate, the fiftieth variation of a component, reading an unfamiliar codebase. What it does not do is tell you which four of those fifty screens to delete, notice that the flow contradicts how the business actually works, or catch the bug it wrote two files away. I use it heavily for the first list and do not trust it with the second.",
        "The practical effect for you is throughput, not a discount on judgement. More options explored, faster; the same care spent deciding between them.",
      ],
    },
    {
      id: "honest-limits",
      heading: "What I don't do",
      body: [
        "I am one person, so I am not the answer for work that needs several people in parallel on a deadline. I don't do brand identity or marketing campaigns. I don't take projects where the design is settled and the job is only to push pixels — that work is better and more cheaply done by someone else.",
        "Saying that on a services page costs me some enquiries. It costs both of us less than finding out on the second call.",
      ],
    },
  ],
};

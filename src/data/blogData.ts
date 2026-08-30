export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  coverImage: string;
  /**
   * The caption printed under the cover image. Required — every image on this
   * site carries a caption that says something the picture alone doesn't, and
   * the lead image is the one most people actually look at.
   */
  coverCaption: string;
  tags: string[];
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "23",
    title: "A Filter Nobody Opens Isn't a Feature",
    excerpt: "Some content is global, some is regional. Putting that in a filter menu means the one person who most needs it never sees it \u2014 because they never opened the menu.",
    author: "Hiram Barsky",
    date: "August 27, 2026",
    readTime: "4 min read",
    coverImage: "/images/bz-essentials/home.webp",
    coverCaption: "The portal's front door. The regional rule this post is about applies to every screen behind it, not just the one with the filter on it.",
    tags: ["Enterprise", "Information Architecture", "UX"],
    slug: "a-filter-nobody-opens",
    content: `
<p>I was building an internal knowledge portal from a client spec. Somewhere in the requirements was a line that looked routine: some documents apply globally, some apply only to the US.</p>

<p>The obvious way to build that is a filter. Add a region control to the search page, default it sensibly, done in an afternoon. I nearly did exactly that.</p>

<h2 class="text-2xl font-bold mt-8 mb-4">The Person Who Needs It Never Opens the Menu</h2>

<p>Here's what stopped me. Think about who actually gets hurt by regional content being wrong. It isn't the person carefully working through search filters — that person is already being deliberate, and they'll spot the mismatch.</p>

<p>It's the person who got a link in Slack. They click it, they land on a document, they read it, they follow it. They never touched search. A filter on the search page does nothing for them at all, because they never went near it.</p>

<p>So the thing I'd have shipped would have protected the users who needed it least, and left the ones who needed it most exactly where they started. It would also have looked complete on a requirements checklist, which is the part that bothers me.</p>

<figure class="my-8">
  <img src="/images/bz-essentials/domain.webp" alt="A domain landing — four categories with counts that are computed through the region lens, so they change when you switch" class="w-full rounded-xs" />
  <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">Every count on this page is computed through the region lens, so they change when you switch. A number that lies is worse than no number.</figcaption>
</figure>

<h2 class="text-2xl font-bold mt-8 mb-4">A Lens Instead</h2>

<p>What I built instead is a lens over the whole application. You set your region once, in the header, and every surface reads through it — the counts on the category cards, the featured lists, the search results, the badge on an individual document. There's nowhere you can be where it isn't applied.</p>

<p>That's a small technical change. It's a context provider rather than a prop, and one function decides visibility. The design decision is where to put the control, not how to write it.</p>

<h2 class="text-2xl font-bold mt-8 mb-4">The Rule Is Where It Gets Interesting</h2>

<p>The naive version of that function is an equality check: show this document if its region matches mine. Write that and switching to US empties most of the portal, because the bulk of the content is shared and shared content is tagged neither Global nor US.</p>

<p>So content gets three states, not two, and the rule reads: visible if it's tagged Both, or if it matches the region you're in. Now switching to US <em>adds</em> the US-specific material on top of everything shared, instead of hiding the portal. That's what people expect, and it's one clause different from the version that breaks.</p>

<p>I'd argue that's the whole shape of this kind of problem. The technical part is trivial and the two versions look nearly identical in a diff. One of them makes the product feel broken, and you only find out which by using it as somebody who doesn't already know where everything is.</p>

<figure class="my-8">
  <img src="/images/bz-essentials/search.webp" alt="Faceted search — business area, region, document type and status filtering a live result count" class="w-full rounded-xs" />
  <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">Search is where the filter would have lived. It's still here — for the people who came looking, which was never the group at risk.</figcaption>
</figure>

<h2 class="text-2xl font-bold mt-8 mb-4">What Transfers</h2>

<p>Any time you're about to put a scoping control in a filter menu — region, permission, team, environment, tenant — ask who gets hurt when it's wrong, and then ask whether that person ever opens filters. If the answer is no, a filter isn't the feature. It's a place to put the feature so it looks handled.</p>

<p>The full build, including the information architecture and the design system it runs on, is written up in the <a href="/project/bz-essentials" class="text-primary underline">BZ Essentials case study</a>.</p>
    `,
  },
  {
    id: "14",
    title: "The Work Is Deleting, Not Generating",
    excerpt: "AI made producing screens almost free. That moved the bottleneck from making things to deciding which ones to throw away \u2014 and no model will do that part for you.",
    author: "Hiram Barsky",
    date: "August 25, 2026",
    readTime: "5 min read",
    coverImage: "/images/ringrival-glassjoe-idle.webp",
    coverCaption: "Glass Joe, the first fighter through the rig — flat blocks and wedge arms. Almost everything after this was subtraction.",
    tags: ["AI", "Product Design", "Shipping"],
    slug: "the-work-is-deleting-not-generating",
    content: `
<p>Generating things is no longer the hard part. Describe a screen and you get a screen. Describe a feature and you get a feature. The constraint that shaped design work for twenty years — that making things was slow and expensive — is largely gone.</p>

<p>What replaced it's worse to sit with, because it doesn't look like work. The bottleneck now is judgement: deciding which of the things you can have, you should actually keep.</p>

<h2 class="text-2xl font-bold mt-8 mb-4">Twenty-Two Seconds of Nothing</h2>

<p>I built a boxing game for the mobile web. The first version opened with a splash screen, then a mode select, then a fighter select, then a tutorial. Every one of those was reasonable. Every one existed in games I had played.</p>

<p>It took <strong>twenty-two seconds</strong> from tapping the link to throwing a punch. On a phone, from a link someone sent you, twenty-two seconds is an eternity. People were leaving before the game started.</p>

<p>I deleted all four screens. Time to first punch went to <strong>six seconds</strong>. Nothing was added. The game got better by having less of itself in the way.</p>

<figure class="my-8">
  <img src="/images/ringrival-sprite-sheet-1.webp" alt="Ring-Rival sprite sheet — one sheet per fighter, every frame in a fixed grid" class="w-full rounded-xs" />
  <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">One sheet per fighter, every frame in a fixed grid. Generating these was the cheap part; deciding which frames survived was not.</figcaption>
</figure>

<h2 class="text-2xl font-bold mt-8 mb-4">The Model Will Happily Build All Four</h2>

<p>Here's the part that actually matters now. If I had asked for a splash screen, a mode select, a fighter select and a tutorial, I would have got all four, quickly, and they would have been fine. The model has no opinion about whether they should exist.</p>

<p>It can't tell you that a fighter select is dead weight when there are three fighters and the first one is the obvious choice. It can't tell you that a tutorial is an admission the controls aren't obvious. Those are judgements about a specific product for specific people, and they only come from watching someone use the thing.</p>

<figure class="my-8">
  <img src="/images/ringrival-vonkaiser.webp" alt="Von Kaiser on the shared rig at heavier proportions — the test that proved fighters could be data" class="w-full rounded-xs" />
  <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">Von Kaiser on the same rig at heavier proportions. Once a second fighter held, fighters could be data instead of drawings.</figcaption>
</figure>

<h2 class="text-2xl font-bold mt-8 mb-4">Cheap Generation Makes Deleting Harder</h2>

<p>There is a trap in this. When something took two days to build, cutting it was easy — you could see the cost of keeping it. When it took ninety seconds, it feels free to leave in. It's not free. The user pays for it in attention every single time.</p>

<p>So the discipline I've ended up with is the opposite of what the tools encourage. Generate freely, because it costs nothing. Then be ruthless, because the thing that costs is the shipped surface area, and that hasn't got cheaper at all.</p>

<p>The full build — sprite pipeline, opponent behaviour, the parts AI genuinely couldn't do — is in the <a href="/project/ring-rival" class="text-primary underline underline-offset-2 hover:text-primary/80">Ring-Rival case study</a>.</p>
`
  },
  {
    id: "15",
    title: "When Trust Is the Product, It Can't Be a Feature",
    excerpt: "Getting two strangers to agree to meet at a park is easy. Getting them to feel fine about it's the entire product \u2014 and it's not something you bolt on near the end.",
    author: "Hiram Barsky",
    date: "August 25, 2026",
    readTime: "5 min read",
    coverImage: "/images/catchbuddy-hero-landing.webp",
    coverCaption: "CatchBuddy's front door. Getting two strangers to a park is the easy half; this post is about the other one.",
    tags: ["Product Design", "Trust & Safety", "Shipping"],
    slug: "when-trust-is-the-product",
    content: `
<p>Most products treat safety as a section. There's a settings page, a reporting flow, a policy document nobody reads, and everyone agrees it's important in the way people agree flossing is important.</p>

<p>That works right up until trust <em>is</em> the thing you're selling. Then it stops being a section and becomes the shape of every screen.</p>

<h2 class="text-2xl font-bold mt-8 mb-4">The Real Problem Was Never Scheduling</h2>

<p>I built an app for pickup sports. The obvious framing is logistics: who is playing, where, at what time. Calendars, notifications, a map.</p>

<p>That framing is wrong. Scheduling is genuinely easy, and the existing apps do it fine. The reason nobody uses them is that they assume you want a season — a commitment, a recurring team, a roster. Most people want a game on Saturday.</p>

<p>Strip that away and what is left is the actual problem: <strong>two strangers agreeing to meet at a park, and both of them feeling fine about it.</strong> Everything else is a detail of that.</p>

<figure class="my-8">
  <img src="/images/catchbuddy-find-players.webp" alt="Find Players — match scores shown on each player card" class="w-full rounded-xs" />
  <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">Match scores on the player cards. The label used to say Matches, and testers read it as a dating app every single time.</figcaption>
</figure>

<figure class="my-8">
  <img src="/images/catchbuddy-signup-minor-gate.webp" alt="CatchBuddy sign-up with the 13+ age gate, the first checkpoint in the minor-protection flow" class="w-full rounded-xs" />
  <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">The 13+ gate at sign-up. Safety that arrives in v1 shapes the product; safety bolted on later is just a settings screen.</figcaption>
</figure>

<h2 class="text-2xl font-bold mt-8 mb-4">What That Changes</h2>

<p>Once you accept that, design decisions stop being about efficiency and start being about reassurance. Who is this person. Have they shown up before. Is this a public place. What happens if it goes badly.</p>

<p>None of those questions are answered by a faster flow. Some of them are answered by a <em>slower</em> one — a step that exists purely so the person on the other side has something to go on.</p>

<p>That is the part that gets cut in a normal design review, because it looks like friction and friction is the enemy. It's only the enemy when the thing you're optimising for is speed. Here the thing being optimised is somebody's willingness to get in the car.</p>

<figure class="my-8">
  <img src="/images/catchbuddy-choose-park.webp" alt="Choose a Park — a curated list with distance and amenities, not a drop-a-pin map" class="w-full rounded-xs" />
  <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">A curated list of parks with distance and amenities. You can't drop your own pin, and the restriction is the feature.</figcaption>
</figure>

<h2 class="text-2xl font-bold mt-8 mb-4">The Test</h2>

<p>The question I kept coming back to wasn't "is this easy" but "would I send my kid to this". That's a harder bar and it rules out designs that test well on every conventional metric.</p>

<p>If trust is the product, the honest version of your roadmap has safety at the top and the clever features underneath, not the other way round. Most roadmaps have it the other way round.</p>

<p>The specifics — the age gate, what I cut, what testers skipped every time — are in the <a href="/project/catchbuddy" class="text-primary underline underline-offset-2 hover:text-primary/80">CatchBuddy case study</a>.</p>
`
  },
  {
    id: "16",
    title: "If You Make People Do Maths, They Guess or They Leave",
    excerpt: "A price of 67\u00a2 tells you the odds are 67%. Almost nobody works that out in their head, and the ones who try get it wrong. Do the arithmetic for them.",
    author: "Hiram Barsky",
    date: "August 25, 2026",
    readTime: "4 min read",
    coverImage: "/images/stips/markets-board.webp",
    coverCaption: "A board of prices. Every one of them is a probability, and almost nobody converts it in their head.",
    tags: ["Product Design", "Fintech UX", "Shipping"],
    slug: "if-you-make-people-do-math",
    content: `
<p>A prediction market answers one question: how likely is this? The price is the answer. A share at 67¢ pays out $1 if the event happens, so the market is telling you it thinks there's a 67% chance.</p>

<p>That is elegant, and it's why the whole mechanism exists. It's also arithmetic, and arithmetic is where products lose people.</p>

<h2 class="text-2xl font-bold mt-8 mb-4">Every Interface I Opened Looked Like a Terminal</h2>

<p>Order books. Spreads. Share counts. Position sizing. The underlying question is simple — how likely is this — and the screen in front of you is not. People leave before placing anything, and the ones who stay are the ones who already knew.</p>

<p>Everyone calls that a learning curve and bolts on a tutorial. It's not a learning curve. It's the product asking you to do a calculation it could have done itself.</p>

<figure class="my-8">
  <img src="/images/stips/order-ticket.jpg" alt="Order ticket — $75 on Yes, showing $111.94 back and $36.94 profit before you commit" class="w-full rounded-xs" />
  <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">$75 on Yes, and the panel has already worked out $111.94 back with $36.94 of profit. Nobody should do that arithmetic in their head.</figcaption>
</figure>

<h2 class="text-2xl font-bold mt-8 mb-4">Show the Answer, Not the Inputs</h2>

<p>So the order ticket does the work. Pick Yes, put <strong>$75</strong> on it, and the panel tells you what happens: <strong>$111.94 back if you're right, $36.94 of that's profit.</strong> Not a share count. Not a spread. The two numbers you actually wanted.</p>

<p>Nobody should have to work out what 67¢ a share means for their stake. If you make them, one of two things happens — they guess, or they leave. Both are your fault, not theirs.</p>

<figure class="my-8">
  <img src="/images/stips/markets-board.webp" alt="The Stips board — price, close date and volume on every card, so the odds read without arithmetic" class="w-full rounded-xs" />
  <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">Price, close date and volume on every card, so the odds read at a glance instead of after a calculation.</figcaption>
</figure>

<h2 class="text-2xl font-bold mt-8 mb-4">This Generalises Further Than Finance</h2>

<p>Anywhere your interface shows a rate, a ratio, a per-unit price or a percentage, ask what the person is actually going to do with it. Usually they're going to multiply it by something to get a number they care about. You already know both values. Show them the result.</p>

<p>The unit price is for comparing. The total is for deciding. Most screens show the first and make you derive the second.</p>

<p>How the board, the market page and the ticket fit together — plus two things I got wrong — is in the <a href="/project/stips" class="text-primary underline underline-offset-2 hover:text-primary/80">Stips case study</a>.</p>
`
  },
  {
    id: "17",
    title: "Finding the Data Is Half the Job",
    excerpt: "An analyst searches for revenue and gets forty results. The search worked. The next twenty minutes \u2014 deciding which table to trust \u2014 is the part nobody designed.",
    author: "Hiram Barsky",
    date: "August 25, 2026",
    readTime: "5 min read",
    coverImage: "/images/dae-search/hero.webp",
    coverCaption: "Enterprise search rebuilt around whether you can trust a result, rather than how relevant it is.",
    tags: ["Enterprise UX", "Product Design", "Search"],
    slug: "finding-the-data-is-half-the-job",
    content: `
<p>Enterprise search gets measured on relevance. Did the right rows come back, how fast, ranked how well. By that measure the system I was asked to look at worked fine.</p>

<p>It was still costing people their afternoons.</p>

<h2 class="text-2xl font-bold mt-8 mb-4">Forty Results Is Not an Answer</h2>

<p>An analyst searches <em>revenue</em> and gets <strong>forty results</strong> back. Then the real work starts. Which table is current. Which one was deprecated but never deleted. Which one the finance team actually uses. Which one has the definition of revenue this question needs.</p>

<p>That is <strong>twenty minutes</strong> of asking colleagues, opening tables, and eventually picking one on a hunch. The search took half a second. The decision took the rest of the morning.</p>

<figure class="my-8">
  <img src="/images/dae-search/the-problem.webp" alt="The problem — forty results, and no way to tell which table is current" class="w-full rounded-xs" />
  <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">Forty results, all plausible, none of them saying which table is current. The search worked — that's the problem.</figcaption>
</figure>

<figure class="my-8">
  <img src="/images/dae-search/what-i-built.webp" alt="Lineage on the result itself — where a table came from, when it refreshed, what depends on it" class="w-full rounded-xs" />
  <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">Lineage moved onto the result row: where the table came from, when it last refreshed, what depends on it.</figcaption>
</figure>

<h2 class="text-2xl font-bold mt-8 mb-4">Trust Is a Design Problem, Not a Data Problem</h2>

<p>The instinct is to fix this upstream — better governance, cleaner catalogues, someone to deprecate old tables properly. Worth doing, and it never finishes. Meanwhile the analyst still has forty results.</p>

<p>The design answer is different: put the trust signals <em>on the result</em>, where the decision is being made. How fresh is it. Who owns it. How many people query it. Is it certified. Does it look abandoned.</p>

<p>None of that's new information. It exists in the metadata already. It was just kept somewhere the person deciding never looked.</p>

<figure class="my-8">
  <img src="/images/dae-search/decisions-1.webp" alt="Early concepts for the enterprise search result row" class="w-full rounded-xs" />
  <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">Early result-row concepts, from the pass where I was still designing consumer search with enterprise paint on it.</figcaption>
</figure>

<h2 class="text-2xl font-bold mt-8 mb-4">The Question Behind the Question</h2>

<p>Every search interface assumes the user's question is "where is it". Often the real question is "which of these should I believe". Those need different screens.</p>

<p>If your users routinely find something and then go and ask a human whether to trust it, that conversation is a missing feature, not a cultural quirk.</p>

<p>What I built, the two calls that changed it, and what I got wrong are in the <a href="/project/dae-search" class="text-primary underline underline-offset-2 hover:text-primary/80">DAE Search case study</a>.</p>
`
  },
  {
    id: "18",
    title: "Verification Is a Door, Not a Sticker",
    excerpt: "Most directories let anyone list, then put a badge on whoever checked out. Flipping that \u2014 nobody is visible until they're verified \u2014 gives you a smaller catalogue and a far more honest one.",
    author: "Hiram Barsky",
    date: "August 25, 2026",
    readTime: "5 min read",
    coverImage: "/images/herbalink/herbalist-directory.webp",
    coverCaption: "A directory where verification is the entry condition. Everything visible here already passed it.",
    tags: ["Trust & Safety", "Product Design", "Healthcare"],
    slug: "verification-is-a-door-not-a-sticker",
    content: `
<p>There are two ways to handle verification in a marketplace, and they look similar on a feature list.</p>

<p>The common one: anyone can list, and the ones who pass a check get a badge. The catalogue is big, and the reader does the sorting.</p>

<p>The other one: nobody is visible until they're verified. The catalogue is smaller, and the platform does the sorting.</p>

<h2 class="text-2xl font-bold mt-8 mb-4">Why the Badge Fails</h2>

<p>A badge assumes the reader knows what its absence means. They do not. An unbadged listing reads as "not checked yet", not as "we couldn't confirm this person is who they say they are".</p>

<p>Worse, it puts the judgement back on the person least equipped to make it. In a health category, that person came to you <em>because</em> they couldn't tell the difference. Handing them a mixed list and a badge system is handing back the exact problem they arrived with.</p>

<figure class="my-8">
  <img src="/images/herbalink/mobile-booking-guided.webp" alt="Booking on mobile — one guided question replaces the filter panel" class="w-full rounded-xs" />
  <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">One guided question in place of a filter panel. Filters assume you already know what you need, which is the reason you're here.</figcaption>
</figure>

<h2 class="text-2xl font-bold mt-8 mb-4">I Tested It the Other Way</h2>

<p>I tried adding a couple of hundred unverified practitioners to see how the product felt with a fuller catalogue. It felt worse. Every listing now needed a judgement call from the one person who came here specifically because they couldn't make one.</p>

<p>Smaller and honest beat bigger and ambiguous, and it wasn't close.</p>

<figure class="my-8">
  <img src="/images/herbalink/herbalist-directory.webp" alt="The HerbaLink directory — a smaller catalogue, because nothing unverified is listed at all" class="w-full rounded-xs" />
  <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">A deliberately smaller catalogue. Nothing unverified is listed at all, so there's no badge left for anyone to interpret.</figcaption>
</figure>

<h2 class="text-2xl font-bold mt-8 mb-4">The Cost, Stated Plainly</h2>

<p>This choice has a real price and I am not going to pretend otherwise. A gated directory grows slowly, because every listing is work. Mine is currently empty of practitioners — the product is built and verified sign-ups haven't happened yet.</p>

<p>That's the trade, and I'll own it. A badge system would have given me a full-looking directory much faster, and it would have been full of people I couldn't vouch for. In a category where being wrong lands on someone's health, I would rather have the empty version.</p>

<p>The research, what I cut, and where it actually stands are in the <a href="/project/herbalink" class="text-primary underline underline-offset-2 hover:text-primary/80">HerbaLink case study</a>.</p>
`
  },
  {
    id: "19",
    title: "You Don't Replace Excel by Being Better Than Excel",
    excerpt: "A bank was running multi-million-dollar loan deals in spreadsheets. The software that replaces that has to lose to Excel on flexibility and win on the thing Excel can't do at all.",
    author: "Hiram Barsky",
    date: "August 25, 2026",
    readTime: "5 min read",
    coverImage: "/images/investor-loan-app/hero.webp",
    coverCaption: "The platform that finally replaced the spreadsheet — by losing to it on flexibility and winning on the record.",
    tags: ["Enterprise UX", "Fintech UX", "Product Design"],
    slug: "you-dont-replace-excel-by-being-better",
    content: `
<p>A bank was running its loan operations in Excel. Deals worth millions of dollars. No audit trail, no validation, no way to tell who changed what or when.</p>

<p>Your first reaction is that this is madness. The better question is why it survived, because it survived against every enterprise system that bank already owned.</p>

<h2 class="text-2xl font-bold mt-8 mb-4">Excel Wins on the Thing People Feel</h2>

<p>A spreadsheet does exactly what you tell it, immediately, with no ceremony. Add a column. Paste a block. Restructure the whole thing on a phone call. Nothing asks you to file a change request.</p>

<p>Enterprise software loses that fight on purpose — structure is the point — but it usually loses it without offering enough in return. So people export to Excel, do the actual work there, and paste the result back. The system becomes a filing cabinet for decisions made somewhere else.</p>

<figure class="my-8">
  <img src="/images/investor-loan-app/user-journey.webp" alt="The loan journey mapped end to end, from intake to close" class="w-full rounded-xs" />
  <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">The loan journey end to end, from intake to close. Mapped first, so I could see what the spreadsheet was actually holding together.</figcaption>
</figure>

<figure class="my-8">
  <img src="/images/investor-loan-app/before-after.webp" alt="The old spreadsheet next to the platform that finally stopped pretending to be one" class="w-full rounded-xs" />
  <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">The spreadsheet next to the platform that replaced it. The win wasn't features — it was becoming the system of record.</figcaption>
</figure>

<h2 class="text-2xl font-bold mt-8 mb-4">Win on What Excel Cannot Do at All</h2>

<p>You won't out-flexible a spreadsheet. What a spreadsheet genuinely can't do is tell you who changed the rate at 4pm on Thursday, or stop someone typing a number that can't be true, or show the same deal to two people without one of them holding a stale copy.</p>

<p>Those aren't features you sell on a slide. They are the things that turn a spreadsheet into a liability the moment a deal goes wrong — and in lending, deals go wrong.</p>

<h2 class="text-2xl font-bold mt-8 mb-4">Keep the Workflow, Change the Substrate</h2>

<p>The mistake I've watched teams make is treating migration as an opportunity to fix how people work. It's not. The people doing the work built that process against real constraints, and most of it's load-bearing.</p>

<p>Match the shape of what they do now, then add the things only real software can give them. Ask them to change one thing at a time, and let the audit trail be the argument.</p>

<p>How that mapped onto the actual screens is in the <a href="/project/investor-loan-app" class="text-primary underline underline-offset-2 hover:text-primary/80">Investor Loan Platform case study</a>.</p>
`
  },
  {
    id: "20",
    title: "Beginner or Pro Is a False Choice, and Both Sides Pay for It",
    excerpt: "Easy apps hide complexity and charge for it. Pro apps expose everything and assume confidence you may not have. The split is a business decision dressed up as a design one.",
    author: "Hiram Barsky",
    date: "August 25, 2026",
    readTime: "4 min read",
    coverImage: "/images/crypto/hero.webp",
    coverCaption: "One account in two modes, on a phone and a desktop. The split the industry sells as segmentation.",
    tags: ["Fintech UX", "Product Design", "Design Systems"],
    slug: "beginner-or-pro-is-a-false-choice",
    content: `
<p>Every trading product picks a side. The easy ones hide the machinery: big buttons, few numbers, a reassuring tone. The pro ones expose all of it: order books, depth charts, slippage settings.</p>

<p>The industry treats this as a segmentation strategy. It's closer to a tax, and both segments pay it.</p>

<h2 class="text-2xl font-bold mt-8 mb-4">What Each Side Actually Pays</h2>

<p><strong>Beginners pay in spread.</strong> The simplicity is real, and it's funded by a worse price than the one on the pro venue. The interface that protects you from complexity is also the interface that stops you seeing what you were charged.</p>

<p><strong>Pros pay in friction.</strong> Every confirmation step, every are-you-sure, every hand-holding tooltip was designed for someone else and can't be turned off. They are paying, in time and clicks, for a safety net built to somebody else's size.</p>

<p>Neither group is being served well. Each is subsidising the other's assumptions.</p>

<figure class="my-8">
  <img src="/images/crypto/site-map.webp" alt="Site map — one platform serving both audiences without forking the product" class="w-full rounded-xs" />
  <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">One platform serving both audiences without forking the product. The mode is a setting, not a second app.</figcaption>
</figure>

<figure class="my-8">
  <img src="/images/crypto/competitive.webp" alt="Competitor teardown — easy apps hide the spread, pro apps assume confidence you may not have" class="w-full rounded-xs" />
  <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">The teardown: easy apps hide the spread, pro apps assume confidence you may not have. Both charge for the same decision.</figcaption>
</figure>

<h2 class="text-2xl font-bold mt-8 mb-4">Progressive Disclosure Is Not a Compromise</h2>

<p>The reason products fork into two apps is that "serving both" gets read as "average the two", which produces something nobody wants. That's a failure of execution, not of the idea.</p>

<p>The version that works is a single surface with one honest default and everything else one deliberate step away. The beginner never has to see the depth chart. The pro never has to click through a wizard to reach it. Nothing is hidden — it's layered.</p>

<h2 class="text-2xl font-bold mt-8 mb-4">The Question to Ask</h2>

<p>When someone tells you a product has to pick an audience, ask what specifically breaks if it does not. Often the honest answer is "the pricing model" rather than "the interface".</p>

<p>Worth knowing, because it means the constraint is commercial and can be argued with, instead of being a law of design that cannot.</p>

<p>The flows and the system that came out of it are in the <a href="/project/crypto" class="text-primary underline underline-offset-2 hover:text-primary/80">Gold2Crypto case study</a>.</p>
`
  },
  {
    id: "21",
    title: "A To-Do App Doesn't Prove Anything",
    excerpt: "Most “I built this with AI” portfolios pick something safe. Safe projects hide the only question worth answering: can you ship something that has to feel right?",
    author: "Hiram Barsky",
    date: "August 25, 2026",
    readTime: "4 min read",
    coverImage: "/images/firelion-cubmode-sunset.webp",
    coverCaption: "Cub Mode in Fire Lion. A game fails visibly, which is exactly why it's worth building to prove something.",
    tags: ["AI", "Solo Building", "Game Design"],
    slug: "a-to-do-app-doesnt-prove-anything",
    content: `
<p>Search for portfolios built with AI and you get a wall of the same three projects. A calculator. A to-do app. A weather dashboard. Clean, competent, forgettable.</p>

<p>They are all safe in the same way: nothing about them has to <em>feel</em> like anything. A to-do app either saves the item or it does not. There's no version of it that works but feels wrong.</p>

<h2 class="text-2xl font-bold mt-8 mb-4">Game Feel Cannot Be Prompted</h2>

<p>So I built an arcade game. You spell words mid-flight to cast spells, which means timing, responsiveness and difficulty curve all have to land or the whole thing is unpleasant to touch.</p>

<p>That's the whole point of picking it. You can't describe your way to good game feel. There's no prompt for "make the jump satisfying". You build it, play it, notice it's slightly wrong, and change one number. Then again. Then again.</p>

<figure class="my-8">
  <img src="/images/firelion-gameplay-lavagod.webp" alt="Fire Lion mid-flight — spelling a word to cast a spell" class="w-full rounded-xs" />
  <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">Spelling a word mid-flight to cast a spell. If this felt wrong everyone would know instantly, which is exactly why I picked it.</figcaption>
</figure>

<figure class="my-8">
  <img src="/images/firelion-lionwars-combat.webp" alt="Lion Wars — the strategic mode, isolated in its own component so refactors cannot reach it" class="w-full rounded-xs" />
  <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">Lion Wars in its own isolated component, so a refactor in one mode can't quietly break the other two.</figcaption>
</figure>

<h2 class="text-2xl font-bold mt-8 mb-4">Most of the Work Was Deleting</h2>

<p>The model was genuinely fast at producing mechanics. It would happily give me another mode, another power-up, another system. Each one worked in isolation.</p>

<p>Almost all of them made the game worse, because a game isn't a list of features — it's a small number of things that combine well. Scope discipline was most of the design work, and it's the part that no amount of generation speed helps with.</p>

<h2 class="text-2xl font-bold mt-8 mb-4">Pick the Project That Can Fail</h2>

<p>If you want to know whether someone can ship with AI, look at whether they picked something that could have come out bad. A to-do app can't really fail. A game can fail while every individual piece works.</p>

<p>That gap — between working and being good — is where the design job now lives, and it's exactly what a safe portfolio project is built to avoid.</p>

<p>What shipped, and what I cut to get there, is in the <a href="/project/fire-lion" class="text-primary underline underline-offset-2 hover:text-primary/80">Fire Lion case study</a>.</p>
`
  },
  {
    id: "22",
    title: "In Regulated Work, Design for the Gates \u2014 Not the AI",
    excerpt: "A pharma email takes two weeks and touches five teams in five tools. The AI's job is the work between the humans, not the work the humans are legally required to do.",
    author: "Hiram Barsky",
    date: "August 25, 2026",
    readTime: "5 min read",
    coverImage: "/images/emailai-screen1-content-planning.webp",
    coverCaption: "Content planning, step one of six. Every step names the human who owns it, and the AI works in the space between them.",
    tags: ["AI", "Enterprise UX", "Healthcare"],
    slug: "design-for-the-approval-gates",
    content: `
<p>A regulated pharma email touches a medical writer, content operations, brand, medical-legal-regulatory review, and CRM. Each of those works in a different tool. <strong>Two weeks to send one email is considered normal.</strong></p>

<p>Look at that and the AI pitch writes itself: generate the email. That's the wrong end of the problem.</p>

<h2 class="text-2xl font-bold mt-8 mb-4">The Slow Part Is Not the Writing</h2>

<p>Writing the copy was never two weeks. The two weeks is handoffs — packaging work for the next team, waiting, receiving comments in a format that doesn't match the tool you work in, and reassembling.</p>

<p>Automating the writing compresses the fastest step in the chain. You end up with a first draft in ten seconds and a two-week review, which is where you started.</p>

<figure class="my-8">
  <img src="/images/emailai-screen6-pre-mlr.webp" alt="Pre-MLR review — the packet assembled the way the reviewers expect it" class="w-full rounded-xs" />
  <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">The packet assembled the way reviewers expect it. The AI's job ends exactly where legal accountability starts.</figcaption>
</figure>

<h2 class="text-2xl font-bold mt-8 mb-4">The Gates Are Not Inefficiency</h2>

<p>It is tempting to treat regulatory review as friction to be designed away. It's not friction. It's the point. Somebody has to be accountable for what a pharmaceutical company tells a doctor, and that accountability is legally personal.</p>

<p>So the design rule I ended up with: <strong>the AI's job is the work between humans, not the work humans do.</strong> Assemble the packet. Pull the approved claim library. Pre-check the obvious failures before the reviewer sees it. Carry comments back without a copy-paste round trip.</p>

<p>Every one of those gives time back without moving a single decision away from the person responsible for it.</p>

<figure class="my-8">
  <img src="/images/emailai-screen3-iterate-qc.webp" alt="QC sitting inline with editing — AI auto-pass, Content Ops and Med Writer signing off while the writer is still in the content" class="w-full rounded-xs" />
  <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">QC inline with editing rather than after it, so a rejection arrives while there's still context to act on.</figcaption>
</figure>

<h2 class="text-2xl font-bold mt-8 mb-4">Where This Applies Beyond Pharma</h2>

<p>Any workflow with a sign-off has this shape — legal, finance, clinical, safety. The instinct is to point the model at the reviewed artefact. The gain is almost always in the space around the review instead.</p>

<p>Ask which steps exist because somebody must be accountable, and leave those alone. Everything else is fair game.</p>

<p>The six-step flow and what I haven't solved are in the <a href="/project/email-creation-ai" class="text-primary underline underline-offset-2 hover:text-primary/80">ManuscriptRx case study</a>.</p>
`
  },
  {
    id: "13",
    title: "I Just Wanted to Send Someone a Video",
    excerpt: "Recording your screen is free. Sending it to someone is what everybody charges for \u2014 with watermarks, five-minute caps, and a sign-in wall in front of the person you sent it to.",
    author: "Hiram Barsky",
    date: "August 25, 2026",
    readTime: "5 min read",
    coverImage: "/blog/send-someone-a-video-cover.jpg",
    coverCaption: "Recording your screen is free. Sending it is the part everyone charges for.",
    tags: ["Product Design", "Shipping", "Tools"],
    slug: "i-just-wanted-to-send-someone-a-video",
    content: `
      <p>Half the messages I write would be better as thirty seconds of me talking over my screen. Not a meeting. Not a document. Just: here is the thing, here is what I mean, watch it whenever.</p>

      <p>Your computer already does this. macOS records the screen. Windows records the screen. Your phone records the screen. The recording part has been free and built in for years.</p>

      <p>The part nobody gives you is everything after you press stop.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">The Charge Is Never for the Recording</h2>

      <p>Try to send that clip to someone. The file is 200 MB, so email rejects it. You put it in Drive and now they need permission. You use a proper tool instead and you meet the actual business model: a watermark across your face, a cap that cuts you off at five minutes, or a sign-in wall in front of the person you sent it to \u2014 who did not ask for an account, they asked for a video.</p>

      <p>None of those limits exist because recording is expensive. Recording costs nothing; your operating system does it for free. They exist because the recording is the hook and the sending is the product.</p>

      <p>What actually costs money is storage and bandwidth. Keeping your files. Streaming them to whoever opens the link. That is a real, boring, per-gigabyte cost, and it is the only line item that scales with how much you use something.</p>

      <figure class="my-8">
        <img src="/images/recast/launcher-modal.webp" alt="The Record button hands off to the native app or takes a file — it never opens a capture tab" class="w-full rounded-xs" />
        <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">The Record button hands you to the native app or takes a file. There's no browser-capture fallback, on purpose.</figcaption>
      </figure>

<h2 class="text-2xl font-bold mt-8 mb-4">So I Built the Version I Wanted</h2>

      <p>I made <a href="/project/recast" class="text-primary underline underline-offset-2 hover:text-primary/80">Recast</a> because I wanted the convenience without the tax. It records on your Mac or your Android phone, uploads while you are still talking, and hands you a link. Whoever you send it to presses play. No account, no app, no meeting.</p>

      <p>The pricing follows from that one idea: <strong>recording, sharing and downloads are identical on every plan, and nothing is watermarked.</strong> The only thing that changes is how much you can keep. Free gives you a gigabyte, which is about half an hour of video. Above that it is $9 a month for 50 GB, or $20 for 250 GB.</p>

      <p>You are not paying to remove a watermark. You are not paying to record for six minutes instead of five. You are paying for storage, because storage is the thing that costs me money.</p>

      <figure class="my-8">
        <img src="/blog/send-someone-a-video-body.jpg" alt="Recast on macOS — the player opens on the local file the moment recording stops, with the share link already there" class="w-full rounded-xs" />
        <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">Press stop and the player opens on the local file immediately, share link already there. The upload happens behind it.</figcaption>
      </figure>

      <figure class="my-8">
        <img src="/images/recast/web-library.webp" alt="The web library — the site stores and shares, and never records" class="w-full rounded-xs" />
        <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">The other half of the boundary: the site stores and shares, and never records.</figcaption>
      </figure>

<h2 class="text-2xl font-bold mt-8 mb-4">Convenience Is a Design Problem, Not a Feature List</h2>

      <p>The thing I cared most about is not on any pricing page. When you press stop, the video plays <em>immediately</em>, from the file already on your device, while the upload runs behind it. You are not watching a progress bar to find out whether the take was any good.</p>

      <p>That sounds obvious. It is not what most tools do, and I know because I got it wrong in my own app first \u2014 the Mac version quietly waited for the whole upload before opening the player. On a fast connection you would never notice. On a plane you pressed stop and stared at nothing.</p>

      <p>Offline still works now. The local file is the source of truth until the upload finishes. That is the actual convenience: the gap between finishing a thought and sending it is a few seconds, and nothing in the middle asks you for anything.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">What It Is Not</h2>

      <p>It is not an editor. There is a trim, and that is deliberate \u2014 if you are cutting between takes and adding captions, you want a real editor and Recast is the wrong tool.</p>

      <p>It runs on Mac and Android today. On iPhone you add it to your Home Screen and record with the iPhone's own screen recorder; the upload and the link work the same way, but there is no native iOS app yet.</p>

      <p>And it is one person's product. I designed it, built it, and I am the one who fixes it. That is the honest trade for the price.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">The Test I Would Apply to Anything</h2>

      <p>When a tool charges you, look at whether the thing you are paying for is the thing that costs the company money. If the fee is for removing an obstacle they invented \u2014 a watermark, a timer, a login for your viewer \u2014 you are paying for the obstacle, not for the service.</p>

      <p>If it is for storage, bandwidth, or somebody's time, that is a real cost and a fair ask.</p>

      <p>I built <a href="/project/recast" class="text-primary underline underline-offset-2 hover:text-primary/80">Recast</a> on the second version of that. You can <a href="https://recastvid.com" target="_blank" rel="noopener noreferrer" class="text-primary underline underline-offset-2 hover:text-primary/80">try it free</a> and never pay me anything, and that is fine \u2014 a gigabyte covers a lot of thirty-second explanations.</p>
    `
  },
  {
    id: "12",
    title: "The Demo Works. Shipping Is a Different Job.",
    excerpt: "A demo is the happy path with data you chose. Everything that made my products hard was in the part nobody demos \u2014 dates, permissions, empty screens, and the jobs that run while you sleep.",
    author: "Hiram Barsky",
    date: "August 10, 2026",
    readTime: "6 min read",
    coverImage: "/blog/demo-works-shipping-is-different-cover.jpg",
    coverCaption: "The distance between a thing that runs and a thing you can hand to a stranger.",
    tags: ["AI", "Shipping", "Product Design"],
    slug: "demo-works-shipping-is-different",
    content: `
      <p>Anyone can get a demo working now. You describe the thing, the model writes it, and within an hour there is a screen that does roughly what you said. That part is genuinely solved, and pretending otherwise makes you sound like you have not been paying attention.</p>

      <p>What is not solved is everything after. A demo is the happy path, run once, with data you picked because it makes the screen look right. Shipping is the same product surviving inputs you did not choose, users who are not you, and time passing. Almost everything that was hard about the products I have live was in that second category.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">The Model Has No Clock</h2>

      <p><a href="/project/stips" class="text-primary underline underline-offset-2 hover:text-primary/80">Stips</a> generates prediction markets from the news on a schedule, which means an AI is writing the close date for every market. That worked perfectly in testing. Then the first real batches came out already expired.</p>

      <p>Models do not have a clock. Asked for a date a week out, they produce something that looks like a date a week out, anchored to whenever their training data thinks "now" is. In a demo you never notice, because you write one market, look at it, and move on. On a schedule, running unattended, it quietly fills the board with markets nobody can bet on.</p>

      <p>The fix was boring, which is the point: put today's date in the prompt, and validate every generated date before it is allowed near the board. Ten minutes of work that only existed as a problem because the thing was actually running.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Testing As Yourself Hides Half the Product</h2>

      <figure class="my-8">
        <img src="/blog/demo-works-shipping-is-different-body.jpg" alt="Scaffolding around an unfinished building" loading="lazy" class="w-full rounded-lg" width="1400" height="940" />
        <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">A demo is the scaffolding. Everything that makes it safe to stand on gets built after the screenshot. <span class="opacity-70">Photo by <a href="https://unsplash.com/@reetoo?utm_source=barskydesign&utm_medium=referral" class="underline" target="_blank" rel="noopener noreferrer">Reto Simonet</a> on <a href="https://unsplash.com/?utm_source=barskydesign&utm_medium=referral" class="underline" target="_blank" rel="noopener noreferrer">Unsplash</a></span></figcaption>
      </figure>

      <p>The second Stips bug cost me considerably more time, and it is the one I would warn anyone about.</p>

      <p>I did most of my testing signed out, because it is faster to just open a page. Signed out, row-level security returns nothing rather than an error. So every bug that only existed for logged-in users looked exactly like an empty state working correctly. Pages that were broken and pages that were empty were indistinguishable, and I could not tell the difference from the outside.</p>

      <p>I did not find any of it until I started testing as a real account. Not a test fixture, not a mock \u2014 an actual signed-in user clicking through the actual product. Everything I had been calling "working" for a week turned out to be a category of bug I had no way to see.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Nobody Demos an Empty Screen</h2>

      <p>Every demo has data in it. That is what makes it a demo. Which means the state most new users actually hit \u2014 nothing here yet \u2014 is the one state you have never looked at.</p>

      <p>On Stips, a market with no bets says "Be the first to trade" instead of rendering an empty chart, because a market nobody has touched is still worth reading; it just has to say so. On <a href="/project/herbalink" class="text-primary underline underline-offset-2 hover:text-primary/80">HerbaLink</a>, the hard screens were never the search results. They were the ones where a practitioner had not filled in their profile yet, and the whole product is trust, so a half-empty profile is worse than no profile.</p>

      <p>You do not find these by designing. You find them by using the thing on a day when it has no data in it.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">The Parts That Run While You Sleep</h2>

      <p>The thing that separates a live product from a good prototype is usually not the interface. It is the scheduled job that keeps the content fresh, the auth that has to hold up, the database rules that decide who sees what, and the error path for when an external service is down.</p>

      <p>None of that shows up in a screenshot. All of it is what makes the screenshot still be true tomorrow. When I say Stips runs end to end, that is what I mean \u2014 design, front end, database, auth, and the cron that keeps the board from going stale. <a href="/project/ring-rival" class="text-primary underline underline-offset-2 hover:text-primary/80">Ring-Rival</a> is the same claim in a different shape: it is a URL you can open on your phone right now, which is a much harder standard than a video of it working.</p>

      <figure class="my-8">
        <img src="/images/stips/market-detail.jpg" alt="A market page with its resolution rules on it — the part a demo never has to answer for" class="w-full rounded-xs" />
        <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">Resolution rules written on the market page. A demo never has to answer for how a thing settles; a product does.</figcaption>
      </figure>

<h2 class="text-2xl font-bold mt-8 mb-4">Why This Matters More Than It Used To</h2>

      <p>When building was expensive, the demo was the hard part, and getting one working was real evidence. Now that generating is cheap, the demo proves almost nothing \u2014 <a href="/blog/taste-is-the-whole-job" class="text-primary underline underline-offset-2 hover:text-primary/80">which is why judgment became the whole job</a>. Everyone can produce the screenshot. Far fewer people have taken something all the way to the point where strangers use it and it holds.</p>

      <p>That gap is the entire difference between "I built a prototype" and <a href="/blog/what-one-person-can-ship-now" class="text-primary underline underline-offset-2 hover:text-primary/80">"I have products live that people use"</a>. It is also, conveniently, the thing that is hard to fake. You can generate a beautiful interface in an afternoon. You cannot generate the eighteen small corrections that come from a real thing being used by real people over real time.</p>

      <p>If you are evaluating someone's work \u2014 or your own \u2014 the useful question is not whether the demo works. It is what broke after it shipped, and what they did about it.</p>
    `
  },
  {
    id: "7",
    title: "What One Person Can Actually Ship Now",
    excerpt: "I have four products live that I built by myself. The useful version of that story is the one that includes where solo stops working, which is not where people expect.",
    author: "Hiram Barsky",
    date: "August 8, 2026",
    readTime: "5 min read",
    coverImage: "/blog/what-one-person-can-ship-now-cover.jpg",
    coverCaption: "What one person can carry end to end now — and the point where that still runs out.",
    tags: ["AI", "Solo Building", "Product Design"],
    slug: "what-one-person-can-ship-now",
    content: `
      <p>I have four products live that I designed and built by myself. No engineering team, no contractor, no cofounder. That sentence would have been a lie a few years ago, and I want to be precise about what it means now, because the honest version is more useful than the triumphant one.</p>

      <p>One person can ship real software. One person still cannot ship a real company. Most of the excitement about this moment lives in the gap between those two sentences.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">What Fits Inside One Head Now</h2>
      <figure class="my-8">
        <img src="/blog/what-one-person-can-ship-now-body.jpg" alt="A row of empty desk chairs — the team a solo builder does not have" loading="lazy" class="w-full rounded-lg" width="1400" height="788" />
        <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">The team a solo builder doesn't have. What changed is how much of that work now fits into one person's day. <span class="opacity-70">Photo by <a href="https://unsplash.com/@bruskrd?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Brusk Dede</a> on <a href="https://unsplash.com/?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Unsplash</a></span></figcaption>
      </figure>

      <p><a href="/project/stips" class="text-primary underline underline-offset-2 hover:text-primary/80">Stips</a> is a play-money prediction market with accounts, a database enforcing row-level security, market resolution, and a scheduled job that reads the news and writes new markets without me touching it. That is not a landing page with a waitlist attached. It is a running system with state, permissions, and a job that keeps going while I sleep.</p>

      <p><a href="/project/ring-rival" class="text-primary underline underline-offset-2 hover:text-primary/80">Ring-Rival</a> is a browser boxing game whose fighters are rigged from separate body, arm, and leg pieces so a punch can be tuned by hand instead of played back. <a href="/project/catchbuddy" class="text-primary underline underline-offset-2 hover:text-primary/80">CatchBuddy</a> organizes same-day pickup sports between strangers, with the safety architecture designed before the matching was. <a href="/project/recast" class="text-primary underline underline-offset-2 hover:text-primary/80">Recast</a> is a screen recorder that ships as a Mac app, an Android app and a website, so a recording made on one becomes a link the other two can serve.</p>

      <p>Four different shapes of product. Different data models, different users, different ways of failing. All built by one person around a full workload. Not long ago each of those is a team and a quarter.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">The Cheap Part Was Not the Part I Expected</h2>

      <p>Typing got cheap. That is the change. It is smaller than it sounds.</p>

      <p>What stayed expensive is knowing whether what you just generated is correct. The <a href="/blog/two-bugs-ai-wrote-that-i-had-to-find" class="text-primary underline underline-offset-2 hover:text-primary/80">two worst bugs I have shipped on Stips</a> were both written by a model, both looked completely right, and both were invisible to the thing that wrote them. Close dates that were already expired, because a language model has no clock. A whole category of permission bugs I could not see because I was testing signed out, and row-level security answers an unauthorized read with an empty list rather than an error.</p>

      <p>Writing the market generator took an afternoon. Trusting it took another week, and that week was me building the checks that would tell me when it was wrong. That ratio is the real shape of solo work now. Less typing, the same amount of judgment, packed into fewer decisions that each carry more weight.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Where Solo Actually Stops</h2>

      <p>Four walls, in the order I hit them.</p>

      <ul class="list-disc pl-6 mb-4">
        <li><strong>Distribution.</strong> Building got faster. Getting a stranger to open the thing costs exactly what it always did.</li>
        <li><strong>Institutional trust.</strong> Enterprises buy from organizations they can hold responsible, and a repository is not one.</li>
        <li><strong>Operations.</strong> Anything with real-world risk needs a human on a rotation, which is headcount rather than code.</li>
        <li><strong>Nobody checking your work.</strong> The missing colleague is the most expensive part of building alone.</li>
      </ul>

      <p>Distribution did not move an inch. Building got dramatically faster and getting a stranger to open the thing costs exactly what it always did. I can ship a working product over a weekend and then spend three months failing to get anyone to use it. That is a worse story and it is the true one.</p>

      <p>Institutional trust does not come in a repository. The <a href="/project/investor-loan-app" class="text-primary underline underline-offset-2 hover:text-primary/80">investor loan platform</a> I worked on replaced Excel as the system of record for multi-million-dollar deals after three previous attempts had failed. What finally made it stick was putting the audit trail next to the record, which turned compliance from the group blocking adoption into the group arguing for it. That is months of sitting with people who are not going to hand a solo builder the keys to their loan book, however good the demo looks.</p>

      <p>Operations are staffing, not code. CatchBuddy is strangers meeting up to play sports. Verification, curated meeting spots, and a panic button are design problems, and I solved them. Answering that panic button at nine at night is a headcount problem, and there is no model for it. Anything with real-world risk eventually needs a human on a rotation.</p>

      <p>And nobody is checking your work. I found the signed-out testing blind spot myself, late, because there was no second person in the room to ask whether I had tried it logged in. The missing colleague is the most expensive part of building alone and the part nobody puts in the thread.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">What Solo Is Genuinely Better At</h2>

      <p>Acting on a conviction before you can prove it. Inside a company, an unproven opinion needs a deck, a stakeholder, and a slot. Alone it needs a weekend.</p>

      <p>Ring-Rival went from twenty-two seconds to first punch down to six because I deleted the splash screen, the mode select, and the tutorial. Every one of those was a correct answer to a reasonable request, and defending their removal in a room would have taken longer than building the game. I just cut them and watched what happened.</p>

      <p>That is the loop solo is built for. Ship it, watch one real person use it, delete what they ignored, do it again. AI compressed the build step hard enough that the loop is now cheap to run, which is the best thing about the current moment.</p>

      <figure class="my-8">
        <img src="/images/recast/landing-light.webp" alt="recastvid.com — one person's product, designed, built and shipped end to end" loading="lazy" class="w-full rounded-xs" width="1500" height="831" />
        <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">One person's product, designed, built and shipped end to end — including all the parts nobody ever sees.</figcaption>
      </figure>

<h2 class="text-2xl font-bold mt-8 mb-4">The Honest Summary</h2>

      <p>One person can now build a product that works, holds real data, handles permissions, and does not fall over. That is new and it is not a small thing.</p>

      <p>One person still cannot manufacture demand, absorb an enterprise sales cycle, staff a support rotation, or catch their own blind spots. None of those were ever engineering problems, which is exactly why an engineering breakthrough did nothing to them.</p>

      <p>So the question is not whether you can build it alone. You probably can. The question is which of those four walls your idea reaches first, and whether your answer to that is something other than figuring it out later. Four products in, I am still working on mine.</p>
    `
  },
  {
    id: "1",
    title: "Two Bugs AI Wrote That I Had to Find Myself",
    excerpt: "Both came out of Stips, both looked perfectly correct, and neither was something the model could have caught on its own. One was about time. One was about permissions.",
    author: "Hiram Barsky",
    date: "August 5, 2026",
    readTime: "4 min read",
    coverImage: "/blog/two-bugs-ai-wrote-that-i-had-to-find-cover.jpg",
    coverCaption: "Two bugs that shipped because the model was confident and I wasn't reading closely enough.",
    tags: ["AI", "Engineering", "Debugging"],
    slug: "two-bugs-ai-wrote-that-i-had-to-find",
    content: `
      <p>I build products solo and AI writes most of the code. That works well enough that the interesting question stopped being whether the code compiles. The interesting question is which bugs survive.</p>

      <p>The two that cost me the most time on Stips, a play-money prediction market I designed and built, were both invisible to the model that wrote them. Neither was a syntax error. Neither would have been caught by a test the model could have written for itself.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">The Model Has No Clock</h2>
      <figure class="my-8">
        <img src="/blog/two-bugs-ai-wrote-that-i-had-to-find-body.jpg" alt="A calendar — the thing a language model doesn't have access to when it writes a close date" loading="lazy" class="w-full rounded-lg" width="1400" height="788" />
        <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">The thing a language model doesn't have: today's date. It will write you a close date anyway. <span class="opacity-70">Photo by <a href="https://unsplash.com/@towfiqu999999?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Towfiqu barbhuiya</a> on <a href="https://unsplash.com/?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Unsplash</a></span></figcaption>
      </figure>


      <p>Stips generates markets from news on a schedule. A model reads what happened, writes a question people can take a position on, and sets a close date.</p>

      <p>The close dates came out already expired.</p>

      <p>Not off by a day. Months in the past. The market would land in the database and be dead on arrival, because a model's sense of "now" is whatever felt current in its training data. Ask it to close a market in two weeks and it does the arithmetic honestly, from a starting point that is nowhere near today.</p>

      <p>What made this expensive is that everything else about the output was right. Valid JSON. Sensible question. Clean resolution criteria. Reasoning that read like a person who had actually understood the news story. One field was garbage, and it happened to be the field that decided whether any of the rest was usable.</p>

      <p>The fix is two rules I now apply by reflex. Today's date goes into the prompt as a stated fact, not something the model is left to infer. And no generated date is trusted until it has been compared against real system time. If a close date isn't in the future, the market never gets written.</p>

      <p>Time is the obvious version of this bug. It isn't the only one. Anything the model can't observe — a current price, who holds an office, whether a service still exists, what your schema looks like today — gets produced anyway, confidently, in exactly the right shape. Shape is not truth. And the model has no way to flag which of its outputs it actually knows.</p>

      <figure class="my-8">
        <img src="/images/stips/markets-board.webp" alt="The Stips board — where markets generated with no sense of today's date turned up already expired" class="w-full rounded-xs" />
        <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">The board where markets generated with no sense of today's date turned up already expired.</figcaption>
      </figure>

<h2 class="text-2xl font-bold mt-8 mb-4">Row-Level Security Doesn't Throw, It Filters</h2>

      <p>Second bug, different flavor. Stips runs on Postgres with row-level security. I did most of my testing signed out, because signing in was slower and I was moving fast.</p>

      <p>Signed out, every authenticated query returned an empty list. That looks exactly like a feature nobody has put data into yet. It does not look like a permission problem, because there is no problem to see. RLS doesn't reject the read. It returns the rows you're allowed to see, and when you're allowed to see none, it returns none. Zero rows, zero errors, no stack trace.</p>

      <p>So the app rendered empty states everywhere and I read those empty states as "nothing here yet." Every policy mistake, every query missing a user id, every place a session wasn't being passed through was sitting right there in plain sight. They surfaced the moment I tested as a real signed-in user, and they surfaced all at once.</p>

      <p>Signed-out testing is a permanent blind spot on anything with row-level security. I test signed in first now. Guest is the special case, not the default.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">What Review Actually Has to Look For</h2>

      <p>Reading generated code line by line for correctness is mostly wasted attention. It's usually correct. The failures live in what it assumed and had no way to verify.</p>

      <p>The questions I run on anything a model wrote:</p>

      <ul class="list-disc pl-6 mb-4">
        <li>Where does this get the current time, and is that source real?</li>
        <li>What does this return when the caller has no permission — an error, or silence?</li>
        <li>Which values here came from the world, and which came from the model's memory of the world?</li>
        <li>What happens on the second run, not the first?</li>
      </ul>

      <p>None of those are questions about code quality. They're questions about the boundary between the model and reality, which is exactly where a model is blind by construction.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Writing Got Faster. Verifying Didn't.</h2>

      <p>The assumption I see people make is that because generation got cheap, checking got cheap with it. It didn't. Writing the market generator took an afternoon. Trusting the market generator took another week, and that week was almost entirely me building the checks that would tell me when it was wrong.</p>

      <p>That ratio is the actual shape of the work now. Less typing. The same amount of judgment, concentrated into fewer decisions that matter more.</p>
    <p>Both of these came out of building <a href="/project/stips" class="text-primary underline">the Stips case study</a>.</p>
    `
  },
  {
    id: "8",
    title: "Designing for Trust When the Product Is the Risk",
    excerpt: "Most software fails softly. Some of it fails into someone's health, money, or safety. When being wrong has consequences, trust stops being a layer and becomes the product.",
    author: "Hiram Barsky",
    date: "August 1, 2026",
    readTime: "4 min read",
    coverImage: "/blog/designing-for-trust-when-the-product-is-the-risk-cover.jpg",
    coverCaption: "When meeting a stranger is the product, trust can't be a feature you add in v2.",
    tags: ["Product Design", "Trust", "Healthcare"],
    slug: "designing-for-trust-when-the-product-is-the-risk",
    content: `
      <p>Most software fails softly. A confusing checkout costs somebody four minutes and some patience. A cluttered dashboard produces a slightly worse decision on a Tuesday. Real costs, all recoverable.</p>

      <p>Some products are not like that. If <a href="/project/herbalink" class="text-primary underline underline-offset-2 hover:text-primary/80">a booking platform for herbalists</a> puts someone in front of a practitioner who is not what they claim to be, that is a health outcome. If <a href="/project/catchbuddy" class="text-primary underline underline-offset-2 hover:text-primary/80">an app that arranges pickup games between strangers</a> is casual about who shows up, that is somebody's physical safety. If a financial tool makes a position look more certain than it is, that is somebody's money.</p>

      <p>In those products, trust is not a layer you apply at the end. It is the thing you are actually shipping. Everything else is delivery.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">A Credential Is a Gate, Not a Badge</h2>
      <figure class="my-8">
        <img src="/blog/designing-for-trust-when-the-product-is-the-risk-body.jpg" alt="A padlock on a gate — verification that actually blocks something, rather than a badge that decorates it" loading="lazy" class="w-full rounded-lg" width="1400" height="788" />
        <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">Verification that actually blocks something, rather than a badge that decorates a listing. <span class="opacity-70">Photo by <a href="https://unsplash.com/@dizzydizz?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Zaqy Al Fattah</a> on <a href="https://unsplash.com/?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Unsplash</a></span></figcaption>
      </figure>

      <p>HerbaLink connects people with herbalists. The obvious design is a checkmark next to a name and an upload form somewhere in settings. I built the other version, where credentials are the gate.</p>

      <p>A badge decorates. It tells you somebody was checked once, by someone, at some point. A gate decides. Unverified practitioners do not appear in results, cannot accept bookings, and lose that ability the moment a credential lapses. None of that is visible in a screenshot. It lives in the state machine underneath — submitted, under review, approved, rejected, expired, resubmitted — and in the answer to the question nobody asks in a design review, which is what happens to a booking that already exists when the credential behind it goes stale.</p>

      <p>The harder decision was the catalog. It is smaller than it could be, deliberately. A bigger directory converts better in the first week and destroys the entire premise by the second month, because the promise was not selection. The promise was that anyone you find here has been checked. Honest and smaller beats comprehensive and padded whenever safety is the value proposition.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Safety Built Late Is Decoration</h2>

      <p>CatchBuddy matches people for same-day pickup sports, which means the core interaction is a stranger meeting a stranger somewhere physical within a few hours. The safety work came before the matching work, and the ordering mattered more than any individual feature.</p>

      <p>Build matching first and safety becomes a settings screen. It ends up as a toggle nobody finds, a report button three taps deep, and a set of guidelines in a modal that gets dismissed. Build it first and it constrains what matching is even allowed to do — who can see whom, where a first meetup is permitted to happen, what has to be true about an account before it can appear to anyone else.</p>

      <p>Same amount of code either way. Completely different product.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Trust Is Mostly What You Refuse to Hide</h2>

      <p>On <a href="/project/stips" class="text-primary underline underline-offset-2 hover:text-primary/80">Stips</a>, my play-money prediction market, the number on a card is a probability wearing a dollar sign. Sixty-seven cents means the crowd thinks it is sixty-seven percent likely. The temptation in that kind of interface is to make the number feel more authoritative than it is, because confident numbers look better. The design goes the other way: show what the payout would be before anyone commits, and let the price read as an estimate that can be wrong rather than a verdict.</p>

      <p>Stips also generates its markets from the news with a model, which is a trust liability sitting inside the product. <a href="/blog/two-bugs-ai-wrote-that-i-had-to-find" class="text-primary underline underline-offset-2 hover:text-primary/80">One of the first bugs I hit</a> was generated markets closing on dates already in the past, because a language model has no clock. A user who sees an expired market on a fresh board does not think the date logic is off. They think the whole thing is fake. Nothing about that failure is technically severe and it costs you the entire relationship.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">The Enterprise Version of the Same Problem</h2>

      <p>This is not only a consumer concern. The <a href="/project/investor-loan-app" class="text-primary underline underline-offset-2 hover:text-primary/80">investor loan platform</a> I worked on had to become the system of record for multi-million-dollar deals, replacing spreadsheets that people trusted because they had built them. Three earlier attempts had failed.</p>

      <p>What moved it was the audit trail sitting next to the record instead of in a separate log nobody opened. Compliance could see who changed what without asking anyone, so compliance stopped being the obstacle and started advocating for the tool. Visibility bought adoption. No amount of interface polish had.</p>

      <figure class="my-8">
        <img src="/images/catchbuddy-equipment-prefs.webp" alt="Equipment and preferences in CatchBuddy — the small disclosures two strangers trade before meeting" class="w-full rounded-xs" />
        <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">The small disclosures two strangers trade before meeting. Trust gets built out of specifics, not reassurance.</figcaption>
      </figure>

<h2 class="text-2xl font-bold mt-8 mb-4">What This Costs You</h2>

      <p>All of it is slower and none of it demos well. A verification gate means fewer listings at launch. Showing uncertainty means your numbers look less impressive than a competitor willing to round up. Designing safety first means the first release does less.</p>

      <p>I take that trade because trust is not a score you accumulate. It is a balance you can only spend down. Every product in this category dies the same way, which is one incident that confirms what a cautious person already suspected. You are not building toward a moment when users decide to trust you. You are avoiding the moment they decide not to.</p>
    `
  },
  {
    id: "9",
    title: "Why Enterprise Tools Lose to Excel",
    excerpt: "Your real competitor is not the other vendor in the bake-off. It is a spreadsheet one person built, everyone trusts, and nobody can be forced to abandon.",
    author: "Hiram Barsky",
    date: "July 25, 2026",
    readTime: "4 min read",
    coverImage: "/blog/why-enterprise-tools-lose-to-excel-cover.jpg",
    coverCaption: "Every enterprise tool is competing with a spreadsheet somebody already knows how to use.",
    tags: ["Enterprise", "Product Design", "Adoption"],
    slug: "why-enterprise-tools-lose-to-excel",
    content: `
      <p>I spent years designing software inside banks and large enterprises. Every one of those products had the same competitor, and it was never the one named in the evaluation. It was a spreadsheet on somebody's machine, maintained by one person, trusted by everyone, and mentioned in no strategy document anywhere.</p>

      <p>Teams lose that fight constantly and then explain it as change resistance. It is not change resistance. The spreadsheet is genuinely winning on the things that decide adoption.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">What the Spreadsheet Is Actually Beating You On</h2>
      <figure class="my-8">
        <img src="/blog/why-enterprise-tools-lose-to-excel-body.jpg" alt="A desk covered in paperwork — the workflow an enterprise tool is really competing against" loading="lazy" class="w-full rounded-lg" width="1400" height="788" />
        <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">The workflow an enterprise tool is really competing against — not the last tool, the habit. <span class="opacity-70">Photo by <a href="https://unsplash.com/@dkfra19?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Dimitri Karastelev</a> on <a href="https://unsplash.com/?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Unsplash</a></span></figcaption>
      </figure>

      <p>It fits the work exactly, because the person doing the work built it. Not approximately. Exactly, down to the column they added last Thursday for the one deal that behaves differently from every other deal.</p>

      <p>It never says no. Enterprise software is largely a catalog of things you are not permitted to do, enforced at the worst possible moment. A spreadsheet at six in the evening the night before a deadline lets you type whatever needs to be there and sort it out afterward.</p>

      <p>It has a perfect trust record. Nobody's spreadsheet has ever silently reassigned their data, lost a row to a sync, or shown them a number they could not trace. It has never surprised them. Your tool, on its first bad day, will.</p>

      <p>Nobody has to be trained on it. The person already knows where everything is because they put it there.</p>

      <p>Read that list back. Fit, permissiveness, trust, familiarity. Nothing on it is a feature. That is why feature parity never wins the argument.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">What Finally Worked</h2>

      <p>The <a href="/project/investor-loan-app" class="text-primary underline underline-offset-2 hover:text-primary/80">investor loan platform</a> I worked on had to replace Excel as the system of record for multi-million-dollar loan deals. Three previous attempts had already failed. Those attempts were not ugly and they were not technically incompetent. They lost on the four things above.</p>

      <p>What changed it was putting the audit trail next to the record. Not in a separate history view, not exported on request. Right there, so anyone could see who changed what and when without asking a person for it.</p>

      <p>That one decision moved compliance from the group slowing adoption to the group arguing for it, because the spreadsheet could not do it at all. I stopped competing on being a better place to store the data and started competing on something a spreadsheet is structurally incapable of. That is the only kind of argument that wins.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Trust Is a Separate Product Problem From Access</h2>

      <p><a href="/project/dae-search" class="text-primary underline underline-offset-2 hover:text-primary/80">DAE Search</a> was enterprise data discovery, and it taught me the version of this that applies to every internal tool. Finding the data is half the job. Trusting it is the rest.</p>

      <p>An analyst who finds a table but cannot tell where it came from, how fresh it is, or who owns it has not been helped. They will do what they have always done, which is pull it into a spreadsheet, verify it by hand, and keep that spreadsheet as the version they believe. Every internal tool that skips provenance manufactures the exact shadow copies it was built to eliminate.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Consolidation Is the Real Pitch</h2>

      <p>The operations platform I designed for small businesses did not win on any individual capability. Scheduling, invoicing, and tasks all existed elsewhere and mostly worked. What was killing people was that they lived in three places, so the same information got retyped and drifted apart.</p>

      <p>Fragmentation is the one thing a spreadsheet cannot fix, because the standard response to fragmentation is another spreadsheet. Being one place beats being better at any single thing.</p>

      <figure class="my-8">
        <img src="/images/investor-loan-app/loan-officer.webp" alt="The orderbook with the audit trail next to the record, rather than in an admin tool nobody opens" class="w-full rounded-xs" />
        <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">The audit trail next to the record instead of in an admin tool nobody opens. That's what made compliance argue for the platform.</figcaption>
      </figure>

<h2 class="text-2xl font-bold mt-8 mb-4">Design Rules I Actually Use Here</h2>

      <ul class="list-disc pl-6 mb-4">
        <li>Day one cannot be an empty screen. If the first task is manual entry of everything they already have, the spreadsheet stays open next to your tool and you have lost.</li>
        <li>Ship an escape hatch. A field for the case your model did not anticipate, and an export that works. Refusing to export does not trap anyone, it just tells them you know they want to leave.</li>
        <li>Show the whole thing. A spreadsheet puts everything on one surface. Paginated detail views feel tidier and make people feel like they cannot see their own work.</li>
        <li>Never lose an edit. One unexplained data loss costs more trust than a year of good behavior earns.</li>
      </ul>

      <p>None of this is discoverable from a requirements document. You find it by sitting with the people doing the work and watching which columns they actually touch, which is the same reason a <a href="/blog/designer-who-codes-argument-is-over" class="text-primary underline underline-offset-2 hover:text-primary/80">real workflow only reveals itself once something running is in front of someone</a>.</p>

      <p>You are not competing with the last vendor. You are competing with a habit that has never once let somebody down. Beat it on something it cannot do, or leave it alone.</p>
    `
  },
  {
    id: "2",
    title: "When Generating Is Free, Taste Is the Whole Job",
    excerpt: "Producing options was never the bottleneck. Ring-Rival got good because I deleted things a model would have been happy to keep building.",
    author: "Hiram Barsky",
    date: "July 22, 2026",
    readTime: "5 min read",
    coverImage: "/blog/taste-is-the-whole-job-cover.jpg",
    coverCaption: "When generating is free, the scarce thing is knowing which output to keep.",
    tags: ["AI", "Craft", "Product Design"],
    slug: "taste-is-the-whole-job",
    content: `
      <p>Generating a screen is free now. Generating fifty is nearly free. That changed less about design than people expected, because producing options was never the expensive part.</p>

      <p>The expensive part is knowing which one is right, and being willing to throw away the other forty-nine.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Twenty-Two Seconds to Six</h2>
      <figure class="my-8">
        <img src="/blog/taste-is-the-whole-job-body.jpg" alt="Hand tools on a workshop wall — the craft is choosing which one to reach for" loading="lazy" class="w-full rounded-lg" width="1400" height="788" />
        <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">When every tool is within reach, the craft is knowing which one to pick up. <span class="opacity-70">Photo by <a href="https://unsplash.com/@vatsaltyagi?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Vatsal Tyagi</a> on <a href="https://unsplash.com/?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Unsplash</a></span></figcaption>
      </figure>


      <p>Ring-Rival is a browser boxing game I designed and built. The first version had a splash screen, a mode select, a fighter select, and a tutorial. Twenty-two seconds from tapping the link to throwing your first punch.</p>

      <p>It's six seconds now. I got there by deleting, not adding. The menus went. The tutorial went. You land on the page, you're already in a fight, and you learn the controls by hitting someone with them.</p>

      <p>No model would have proposed that, and I don't blame it. Every screen I cut was a correct answer to a reasonable request. Mode select is standard. Onboarding is standard. What made them wrong was specific to this one product: it's a browser game somebody opens from a link with maybe fifteen seconds of curiosity attached. Every screen before the punch spends that budget on something that isn't the punch.</p>

      <p>Taste is knowing which good practice doesn't apply here.</p>

      <figure class="my-8">
        <img src="/images/ringrival-knockdown.webp" alt="A knockdown in Ring-Rival — the moment that stopped being a countdown you sit and watch" class="w-full rounded-xs" />
        <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">A knockdown that stopped being a countdown you sit and watch. No model told me the old one was wrong; it just felt wrong.</figcaption>
      </figure>

<h2 class="text-2xl font-bold mt-8 mb-4">The Bug Nobody Would Have Reported</h2>

      <p>Around forty percent of Ring-Rival sessions had no sound. Browsers block audio until the user does something, and the game was trying to start its AudioContext on load. It's under two percent now, because audio initialization waits for the first tap.</p>

      <p>The fix is a known thing. Any model will tell you about the autoplay policy if you ask. The part that was mine was noticing.</p>

      <p>Nothing errored. The game ran. Players weren't going to file a bug report about a silent boxing game — they were going to leave, and I'd have read that as the game not being fun. I found it because I have a habit of opening my own products on devices I haven't used before and paying attention to the first five seconds. That's not a skill anybody teaches. It's a habit, and habits are most of what taste turns out to be.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Feel Is Hand-Tuned or It's Nothing</h2>

      <p>The fighters in Ring-Rival are rigged from separate pieces — body, arms, legs — so a punch can be tuned rather than played back. That was a deliberate choice, and it cost more up front than dropping in a canned animation would have.</p>

      <p>It's worth it because a punch either lands or it doesn't, and the difference is in milliseconds you can only find by feel. How long the frame hangs on contact. How far the camera moves. How quickly control comes back. There's no correct value to look up. You change it, you throw a hundred punches, you change it again.</p>

      <p>A model has no body. It doesn't know what satisfying feels like in your hand, and it can't tell you when you've overshot. That entire category of work is untouched.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Fifty Options Is Worse Than Five</h2>

      <p>There's a version of using AI where you generate variations until something feels right. It doesn't work, and it took me a while to admit that.</p>

      <p>Past a handful of options, you stop evaluating and start comparing. Comparing is a different mental operation. You end up picking the one that stands out against the others instead of the one that's correct for the product, and the two are frequently not the same thing. The forty-ninth variation always looks fresher than the third, because you've been staring at the third longer.</p>

      <p>What works better is deciding what the screen has to do before generating anything, then producing three attempts at that and judging each one against the requirement rather than against the other two. Slower to set up. Much faster to finish, because you're not relitigating the decision every time a new option appears.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Taste Isn't Aesthetics</h2>

      <p>People hear taste and think visual polish. It isn't that, or at least that's the smallest part of it. Taste is a set of held opinions about what matters in a specific product, applied consistently, including when applying them costs you work you already did.</p>

      <p>It shows up as deletion more than creation. It shows up as noticing something is wrong before anyone complains. It shows up as being able to say why the obvious solution is wrong here without falling back on a rule you read somewhere.</p>

      <p>That's the part that didn't get automated, and it's the part that's hardest to fake, because it only develops one way.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">How You Actually Get It</h2>

      <p>Ship something. Watch a real person use it. Cut what they ignored. Repeat until your instinct about what to cut starts being right before you test it.</p>

      <p>There's no faster path. AI compressed the build step so hard that this loop is now cheap to run, which is genuinely the best thing about the current moment. You can be wrong on Tuesday and fixed by Wednesday. What you can't do is skip being wrong.</p>
    <p>The deletions this is drawn from are written up in <a href="/project/ring-rival" class="text-primary underline">the Ring-Rival case study</a>.</p>
    `
  },
  {
    id: "10",
    title: "Scope Discipline When Building Is Cheap",
    excerpt: "Engineering cost used to do your prioritization for you. It stopped. Deciding what not to ship is now the only constraint holding a product together.",
    author: "Hiram Barsky",
    date: "July 18, 2026",
    readTime: "4 min read",
    coverImage: "/blog/scope-discipline-when-building-is-cheap-cover.jpg",
    coverCaption: "Building got cheap. Deciding what not to build is now the expensive half.",
    tags: ["Product Design", "AI", "Craft"],
    slug: "scope-discipline-when-building-is-cheap",
    content: `
      <p>For most of my career, cost did the deciding. A feature was three weeks of somebody's time, so it had to be argued for, and the argument killed most of the bad ideas before anyone typed anything. Nobody had to be especially disciplined. The roadmap was rationed by scarcity.</p>

      <p>That rationing is gone. The feature is an afternoon now, sometimes an hour. Sure, why not has become a viable answer to almost any request, and it is quietly wrecking products.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">The Bill You Still Get</h2>
      <figure class="my-8">
        <img src="/blog/scope-discipline-when-building-is-cheap-body.jpg" alt="A handwritten list on a notebook — deciding what stays and what gets crossed off" loading="lazy" class="w-full rounded-lg" width="1400" height="788" />
        <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">The list matters less than the crossings-out. Deciding what doesn't get built is the expensive part now. <span class="opacity-70">Photo by <a href="https://unsplash.com/@glenncarstenspeters?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Glenn Carstens-Peters</a> on <a href="https://unsplash.com/?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Unsplash</a></span></figcaption>
      </figure>

      <p>Build time was never the real price of a feature. It was the part you could see.</p>

      <p>The real price is surface area. Every feature is another state to hold in your head, another thing to explain, another place for a bug to live, another decision handed to somebody who came here to do one specific thing. It is a permanent obligation to keep working while everything around it changes. None of that got cheaper. Generation collapsed the one cost that was visible and left every invisible cost exactly where it was.</p>

      <p>So the ratio inverted. It used to be expensive to build and easy to keep a product coherent, because you could not afford enough features to make it incoherent. Now it is cheap to build and expensive to stay coherent.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">The Deletion List Should Be Longer</h2>

      <p>On <a href="/project/fire-lion" class="text-primary underline underline-offset-2 hover:text-primary/80">Fire Lion</a>, the game I shipped solo, the list of things I cut ended up longer than the list of things I kept. That is not a confession. That is the correct ratio, and I would be suspicious of any product where it goes the other way now.</p>

      <p><a href="/project/ring-rival" class="text-primary underline underline-offset-2 hover:text-primary/80">Ring-Rival</a> is the sharper example because I can put a number on it. Time from tapping the link to throwing your first punch was twenty-two seconds. It is six now. I did not optimize anything. I deleted the splash screen, the mode select, the fighter select, and the tutorial.</p>

      <p>Every one of those was a correct answer to a reasonable request. Mode select is standard. Onboarding is standard. What made them wrong was this specific product: a browser game somebody opens from a link with about fifteen seconds of curiosity attached. Every screen before the punch spends that budget on something that is not the punch.</p>

      <p>No model was ever going to propose that, and I do not hold it against them. Nothing in the request said the interesting thing about this product is how fast you get hit.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Reasonable Is the Trap</h2>

      <p>Ask a model for a settings page and you get a good settings page. Ask for notification preferences, an onboarding flow, an empty state with a call to action, and each one comes back competent and defensible. Every single addition is reasonable in isolation.</p>

      <p>Products do not die of one unreasonable feature. They die of forty reasonable ones, each of which had a fine justification, arriving faster than anyone can evaluate whether the thing still has a shape. When the cost of a wrong yes was three weeks, you noticed. At an hour, you do not.</p>

      <p>This is the same problem as generating fifty design variations and picking the one that stands out rather than the one that is right. It is <a href="/blog/taste-is-the-whole-job" class="text-primary underline underline-offset-2 hover:text-primary/80">why taste turned into the whole job</a> the moment production stopped being the bottleneck.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">What I Do Instead</h2>

      <p>I set a budget that is not measured in time, because time no longer constrains anything. Screens before the core action. Decisions asked of the user in the first minute. Items in the main navigation. Those are the numbers I hold fixed. New thing goes in, old thing comes out.</p>

      <p>And I ask two questions before anything gets built. What does this take away — attention, speed, clarity, the ability to explain the product in a sentence. And is this worth being in the first five seconds, because everything visible on arrival is competing for the same fixed budget of patience.</p>

      <p>If a feature only survives on the grounds that it was easy to build, that is not a reason. That is the absence of one.</p>

      <figure class="my-8">
        <img src="/images/firelion-spelling-combo.webp" alt="Fire Lion mid-combo — what survived after the daily missions, streaks and upgrade screens were cut" class="w-full rounded-xs" />
        <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">What was left after the daily missions, streaks and upgrade screens came out. The game got better every time I cut one.</figcaption>
      </figure>

<h2 class="text-2xl font-bold mt-8 mb-4">Deleting After You Ship Got Easier</h2>

      <p>The one genuine gift here is that sunk cost mostly evaporated. I used to fight to keep things that had consumed a month of team time, because removing them felt like admitting waste and someone had to sit through that conversation.</p>

      <p>A feature that cost an afternoon is not hard to let go of. It cost an afternoon. And if I turn out to be wrong about cutting it, rebuilding it costs another afternoon.</p>

      <p>That is the actual superpower in the current moment, and it is not the speed of building. It is that being wrong stopped being expensive, which means you can afford to be much more aggressive about what you refuse to keep.</p>
    `
  },
  {
    id: "11",
    title: "How to Interview a Designer Now",
    excerpt: "Every portfolio is polished and every candidate has a shipped demo. What I would ask to find out whether there is judgment behind the artifacts.",
    author: "Hiram Barsky",
    date: "July 11, 2026",
    readTime: "4 min read",
    coverImage: "/blog/how-to-interview-a-designer-now-cover.jpg",
    coverCaption: "Portfolios stopped separating people. What you ask in the room has to do that work now.",
    tags: ["Hiring", "Career", "AI"],
    slug: "how-to-interview-a-designer-now",
    content: `
      <p>The signals hiring managers relied on for a decade stopped carrying information. Polished case study, working prototype, tidy design system, a portfolio that looks like it came out of a studio. All of that is now available to anyone with a weekend and a subscription.</p>

      <p>I am not going to argue about whether that is good. It happened. The question is what you ask instead, and most interview loops have not caught up.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Stop Grading the Artifact</h2>
      <figure class="my-8">
        <img src="/blog/how-to-interview-a-designer-now-body.jpg" alt="Two people working through a problem at a whiteboard" loading="lazy" class="w-full rounded-lg" width="1400" height="788" />
        <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">The part of an interview worth keeping: watching someone reason in front of you, instead of reviewing what they shipped. <span class="opacity-70">Photo by <a href="https://unsplash.com/@kaleidico?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Kaleidico</a> on <a href="https://unsplash.com/?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Unsplash</a></span></figcaption>
      </figure>

      <p>A portfolio used to be evidence of two things at once: this person can produce work at this level, and this person cared enough to finish. Both inferences were reliable for a long time and <a href="/blog/everyones-portfolio-looks-good-now" class="text-primary underline underline-offset-2 hover:text-primary/80">neither one survived polish becoming free</a>. A demo has the same problem. <a href="/blog/shipping-got-cheap-hiring-got-harder" class="text-primary underline underline-offset-2 hover:text-primary/80">A working prototype used to prove somebody had the skill to build it</a>, and now it proves they had a weekend.</p>

      <p>None of that makes the portfolio useless. It makes it a starting point for questions rather than an answer to them. Look at the work, then spend the whole conversation on what is not in it.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Ask What They Deleted</h2>

      <p>This is my first question and it separates people faster than anything else I have tried. What did you remove from this, and who was unhappy about it?</p>

      <p>Adding is easy to justify and easy to generate. Deletion requires an opinion about what the product is for and the willingness to defend it against someone who wanted the thing you cut. Nobody deletes by accident, so every deletion has a reason attached and the reason is where the judgment lives.</p>

      <p>The answer I want sounds like: we cut the tutorial because the product is opened from a link and the first ten seconds are all the attention we get. The answer that tells me to keep digging is a list of everything they built.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Ask Where the Number Came From</h2>

      <p>Every portfolio now has percentages in it. Most of them cannot survive one follow-up question, which makes the follow-up question extremely efficient.</p>

      <p>I can say that audio failed in about forty percent of <a href="/project/ring-rival" class="text-primary underline underline-offset-2 hover:text-primary/80">Ring-Rival</a> sessions and is under two percent now. If you ask how I know, there is an answer: browsers block audio until the user interacts, the game was starting its audio context on load, and moving that behind the first tap fixed it. Nothing errored the entire time, which is why nobody would have reported it.</p>

      <p>Ask how it was measured, what it was before, and how they found out it was a problem at all. A real number has a story about detection attached to it. An invented one has a story about success.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Ask About States, Not Screens</h2>

      <p>Screens are what got cheap. States are where products actually break.</p>

      <p>On <a href="/project/herbalink" class="text-primary underline underline-offset-2 hover:text-primary/80">HerbaLink</a>, practitioner verification looks like a checkmark and an upload form until you build it, at which point it is submitted, under review, approved, rejected, expired, and resubmitted, plus the question of what happens to an existing booking when the credential behind it lapses. That question has a right answer and it is not a visual one.</p>

      <p>So take any feature in their portfolio and ask for every state it can be in, and what the user sees in each. Designers who have shipped will enumerate them without hesitating. Designers who have only drawn will produce the happy path and then start improvising.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Give Them a Real Problem and Let Them Use AI</h2>

      <p>Banning AI in the exercise measures a skill the job no longer contains. Do the opposite. Hand over an actual unresolved problem from your backlog, give them thirty minutes, tell them to use whatever tools they want, and ask for no deliverable at all.</p>

      <p>Then watch two things. What they ask before they start producing anything, because the questions reveal how they frame a problem and questions cannot be generated for you. And what they overrode, because the interesting part of working with a model is the moment you look at a competent, reasonable output and decide it is wrong for this specific product.</p>

      <p>Somebody who accepts the first plausible answer will do that on your product too, every day, at speed.</p>

      <figure class="my-8">
        <img src="/images/investor-loan-app/my-deals-list-view.jpg" alt="My Deals — the screen loan officers recognised as their own job, which is the answer an interview should surface" class="w-full rounded-xs" />
        <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">The screen loan officers recognised as their own job. Getting there is what an interview should be trying to surface.</figcaption>
      </figure>

<h2 class="text-2xl font-bold mt-8 mb-4">The One Thing I Would Not Skip</h2>

      <p>Ask what they would fight for. Not what they believe about design in general. What in this specific piece of work they would defend if a senior person told them to change it, and what happened the last time that occurred.</p>

      <p>Conviction is the trait that survived. Producing options is free, defensible-looking work is free, and the scarce thing is somebody who can tell you why the reasonable answer is wrong here without falling back on a rule they read somewhere. That has never been visible in a portfolio, and now it is the only thing worth interviewing for.</p>
    `
  },
  {
    id: "3",
    title: "The Designer Who Codes Argument Is Over",
    excerpt: "Not because everyone won the debate, but because the gap between a design and a running product collapsed. Here's what that changes in practice.",
    author: "Hiram Barsky",
    date: "July 9, 2026",
    readTime: "4 min read",
    coverImage: "/blog/designer-who-codes-argument-is-over-cover.jpg",
    coverCaption: "The argument didn't get won. The gap it was about closed.",
    tags: ["Career", "AI", "Product Design"],
    slug: "designer-who-codes-argument-is-over",
    content: `
      <p>The debate ended without a winner. It ended because the distance between a design and a running product got short enough that arguing about who should cross it stopped making sense.</p>

      <p>I design and build my own products. Ring-Rival, Stips, HerbaLink, CatchBuddy are all live, all built solo. I'm not an engineer and I'm not pretending to be one. What I am is the person who doesn't hand anything off.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">What This Doesn't Mean</h2>
      <figure class="my-8">
        <img src="/blog/designer-who-codes-argument-is-over-body.jpg" alt="Hands on a keyboard — the gap between designing a thing and shipping it" loading="lazy" class="w-full rounded-lg" width="1400" height="788" />
        <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">The gap between designing a thing and shipping it, which used to be somebody else's problem. <span class="opacity-70">Photo by <a href="https://unsplash.com/@glenncarstenspeters?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Glenn Carstens-Peters</a> on <a href="https://unsplash.com/?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Unsplash</a></span></figcaption>
      </figure>


      <p>It doesn't mean learning React so you can argue about hooks in code review. It doesn't mean you should be shipping production infrastructure at a company that has engineers to do it properly.</p>

      <p>It means you can take your own idea all the way to something a stranger can use, without a second person's calendar in the way. That's the whole claim.</p>

      <figure class="my-8">
        <img src="/images/recast/mac-app.webp" alt="The Recast recorder panel, floating over a browser — designed and built by the same person" class="w-full rounded-xs" />
        <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">The recorder panel over a browser window — designed and built by the same person, which is why the seams line up.</figcaption>
      </figure>

<h2 class="text-2xl font-bold mt-8 mb-4">The Handoff Was Always the Expensive Part</h2>

      <p>I spent years in banks and enterprises where the gap between "designed" and "shipped" was measured in quarters. Most of that time wasn't build time. It was translation. Writing specs describing behavior that would have taken ten minutes to demonstrate. Answering questions about edge cases in a document instead of in the product. Watching a decision get quietly reinterpreted three steps downstream and finding out months later.</p>

      <p>When you build it yourself, that entire layer disappears. Not because you're faster at writing code than an engineer — you aren't — but because there's nothing to translate.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Building Changes the Design</h2>

      <p>This is the part people underrate. Designs that look complete in Figma routinely fall apart the first time they meet a database.</p>

      <p>HerbaLink is a booking platform where herbalist credentials are the gate. On a canvas, that's a verified badge and an upload form. In code, it's a state machine: submitted, under review, approved, rejected, expired, resubmitted. What does the practitioner see in each of those states? Can they take bookings while pending? What happens to a booking that already exists when a credential lapses?</p>

      <p>Those aren't implementation details. Those are the product, and you find them by building, not by drawing. Every one of them changed the design.</p>

      <p>The same thing happened on the investor loan platform I worked on at a bank, where the goal was replacing Excel as the actual system of record. Three previous attempts had failed. The reason wasn't visual and it wasn't technical. It was that the real workflow only shows itself once something real is in front of the people doing it.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">What's Actually Worth Learning</h2>

      <p>You do not need a computer science education. You need enough to stay oriented while a model does the typing:</p>

      <ul class="list-disc pl-6 mb-4">
        <li>How data is shaped and where it lives, because most product decisions bottom out in the data model.</li>
        <li>What a state is, and how to enumerate all of them for anything you design.</li>
        <li>How to read an error message and a network request, so a broken thing is a puzzle rather than a wall.</li>
        <li>How to run and deploy a project, because a product nobody can reach isn't a product.</li>
      </ul>

      <p>That's a matter of weeks, not years, and it's enough to make AI genuinely useful to you instead of confidently unhelpful.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Where This Goes Wrong</h2>

      <p>The failure mode is obvious once you've hit it. You ship fast, the product works, and six weeks later you're looking at a system you can't reason about because you never actually read half of it.</p>

      <p>I've done this. The fix isn't discipline about reading every line — that gives back the speed you just gained. The fix is knowing which parts you have to understand cold: anything touching money, anything touching permissions, anything that runs on a schedule without a human watching. Those I read carefully and often rewrite. The rest can stay a black box until it breaks.</p>

      <p>The other failure mode is thinking that because you can build it, you should be the one building it. On a team with engineers, the value of this skill isn't that you take their work. It's that you can prototype the argument instead of writing a document about it, and hand over something real when it's time.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">The Part That's Uncomfortable</h2>

      <p>Some design work is going away. Redlines, spec documents, the long tail of handoff artifacts — those existed to move intent across a gap that's closing. If your value was being excellent at producing them, that's worth confronting directly rather than waiting to be told.</p>

      <p>What replaces it is more interesting work and more responsibility for the result. When you own it end to end, you can't say the engineers ruined it. It shipped the way you built it.</p>

      <p>That's a better trade than it sounds like. It's also not optional much longer.</p>
    <p>What that looks like end to end is in <a href="/project/recast" class="text-primary underline">the Recast case study</a>.</p>
    `
  },
  {
    id: "4",
    title: "Shipping Got Cheap. Hiring Got Harder.",
    excerpt: "A working demo used to be evidence. Now anyone can produce one in a weekend, and the design job market is still figuring out what to screen for instead.",
    author: "Hiram Barsky",
    date: "June 26, 2026",
    readTime: "4 min read",
    coverImage: "/blog/shipping-got-cheap-hiring-got-harder-cover.jpg",
    coverCaption: "More people shipping polished work, and fewer signals left to tell them apart.",
    tags: ["Career", "Hiring", "AI"],
    slug: "shipping-got-cheap-hiring-got-harder",
    content: `
      <p>A working prototype used to mean something. It meant somebody had the skill to build it and cared enough to finish it. Both of those inferences were reliable for a long time. Neither is reliable now.</p>

      <p>That's the actual disruption in design hiring. Not that AI took the jobs. That the signals hiring managers used to sort candidates stopped carrying information.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">The Demo Is No Longer the Proof</h2>
      <figure class="my-8">
        <img src="/blog/shipping-got-cheap-hiring-got-harder-body.jpg" alt="A stack of applications on a desk" loading="lazy" class="w-full rounded-lg" width="1400" height="788" />
        <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">More applicants, all of them shipping polished work. The screen that used to filter people stopped filtering. <span class="opacity-70">Photo by <a href="https://unsplash.com/@resumegenius?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Resume Genius</a> on <a href="https://unsplash.com/?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Unsplash</a></span></figcaption>
      </figure>


      <p>I can build a polished, functional product in a weekend. So can a designer two years into their career. The artifact looks roughly the same either way, and it looks good, which is the problem — a good-looking artifact no longer separates anybody from anybody.</p>

      <p>What still separates people is what happened after the demo. Did anyone use it. What broke. What got cut and on what basis. Whether the person can explain a decision they made that turned out to be wrong.</p>

      <p>Those questions survive because you can only answer them by having lived through it.</p>

      <figure class="my-8">
        <img src="/images/herbalink/herbalist-directory.webp" alt="A product that works with nobody on it — the kind of outcome a portfolio usually hides" class="w-full rounded-xs" />
        <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">A product that works with nobody on it. That's the kind of outcome a portfolio usually leaves out.</figcaption>
      </figure>

<h2 class="text-2xl font-bold mt-8 mb-4">The Junior Pipeline Has a Real Problem</h2>

      <p>The tasks juniors used to learn on are the tasks AI does best. Building out the rest of the screens once the pattern is set. Producing variations. Cleaning up a component library. Writing the first draft of anything.</p>

      <p>That work was never valuable in itself. It was valuable because doing it a hundred times is how judgment got built. Remove the reps and you have people who can direct a model competently and have no accumulated sense of when the model is wrong.</p>

      <p>I don't have a clean answer for this and I'm suspicious of people who claim they do. What I'd tell someone starting now: build and ship your own things, publicly, on your own time. Not portfolio exercises. Real products with real users, even three of them. That's the only reliable way left to get reps that count.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">What I'd Screen For</h2>

      <p>If I were hiring designers today, I'd spend the whole interview on one project they actually shipped, and I'd push on:</p>

      <ul class="list-disc pl-6 mb-4">
        <li>What they removed, and what argument they had to win to remove it.</li>
        <li>A moment they were wrong, how they found out, and what they changed.</li>
        <li>Something they had to build or tune by hand because generating it produced something subtly bad.</li>
        <li>What they'd do differently with another month, stated specifically.</li>
      </ul>

      <p>Anyone can narrate a process. Almost nobody can narrate a reversal they made under pressure unless it happened to them.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">The Take-Home Test Is Dead</h2>

      <p>Any exercise a candidate completes alone, unobserved, over a weekend now tells you nothing. It never told you much. It tells you nothing at all today, and it still costs the candidate a weekend, which is the worst possible trade.</p>

      <p>The replacement isn't a harder exercise. It's a conversation about work that already exists. Open the product they built. Use it in front of them. Ask why the second screen looks the way it does. Ask what they tried first. Someone who did the work answers instantly and in detail, because they lived through the alternatives. Someone who didn't runs out of specifics in about ninety seconds.</p>

      <p>Portfolio presentations have the same problem for the same reason. A narrated deck is rehearsed. A product being poked at live isn't.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">The Roles Are Consolidating</h2>

      <p>The clean separation between designer, front-end engineer, and product manager is dissolving in small teams, and small teams are doing more than they used to. I've watched job descriptions quietly absorb responsibilities that used to belong to three people.</p>

      <p>That's harder on candidates and better for the work. Products get worse every time intent crosses a boundary. Fewer boundaries, fewer translation losses.</p>

      <p>It also means the safest position isn't specialization anymore. It's being the person who can carry something from idea to live and be accountable for how it turned out.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">If You're Looking Right Now</h2>

      <p>Stop optimizing the artifact. It's already at parity with everyone else's. Put a live URL on your site, be specific about what you cut and why, and go into every conversation able to defend one number you moved and one call you got wrong.</p>

      <p>The market is harder. It's not closed. It's just stopped rewarding the things it used to reward automatically.</p>
    <p>For a worked example, including one that did not find its audience, see <a href="/project/herbalink" class="text-primary underline">the HerbaLink case study</a>.</p>
    `
  },
  {
    id: "5",
    title: "Everyone's Portfolio Looks Good Now",
    excerpt: "Polish stopped being a signal the moment it became free. What's left is the stuff a model can't produce for you: constraints, deletions, and decisions you can defend.",
    author: "Hiram Barsky",
    date: "June 15, 2026",
    readTime: "4 min read",
    coverImage: "/blog/everyones-portfolio-looks-good-now-cover.jpg",
    coverCaption: "When every portfolio looks good, looking good stops being the thing being measured.",
    tags: ["Portfolio", "Career", "AI"],
    slug: "everyones-portfolio-looks-good-now",
    content: `
      <p>Portfolios used to sort themselves. The typography was right or it wasn't. The case study read well or it read like a template. You could tell a lot in ten seconds and you were usually correct.</p>

      <p>That's gone. Everything is well-typeset now. Every case study has a clean narrative arc and a confident opening line. The floor came up, which sounds like good news and mostly isn't, because a signal everyone can produce isn't a signal.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Polish Is Table Stakes, Not Evidence</h2>
      <figure class="my-8">
        <img src="/blog/everyones-portfolio-looks-good-now-body.jpg" alt="Rows of near-identical output" loading="lazy" class="w-full rounded-lg" width="1400" height="788" />
        <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">When everything is well-made, being well-made stops telling anyone anything. <span class="opacity-70">Photo by <a href="https://unsplash.com/@boliviainteligente?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">BoliviaInteligente</a> on <a href="https://unsplash.com/?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Unsplash</a></span></figcaption>
      </figure>


      <p>Being well-presented no longer earns you anything. It just avoids losing you something. Budget for it accordingly: get it clean, then stop, because additional polish past that point buys nothing and eats the time you should be spending on substance.</p>

      <figure class="my-8">
        <img src="/images/bz-essentials/design-system.webp" alt="A design system documented from the code it actually runs on, rather than a mood board" class="w-full rounded-xs" />
        <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">A design system documented from the code it actually runs on, rather than a mood board that never shipped.</figcaption>
      </figure>

<h2 class="text-2xl font-bold mt-8 mb-4">Put the Live URL First</h2>

      <p>A working product someone can open is the single hardest thing to fake, and it's still rare. Ring-Rival, Stips, HerbaLink, CatchBuddy are all live. Anyone can go use them, find the rough edges, and form their own opinion.</p>

      <p>That's uncomfortable, and it should be. A case study is a story you control. A live product is a claim anybody can check. The discomfort is exactly what makes it credible.</p>

      <p>Screens of something that never shipped read as speculation now, no matter how good they look.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Write the Deletions Down</h2>

      <p>Every case study on my site says what got cut. On Ring-Rival, that was the entire pre-fight flow: splash, mode select, fighter select, tutorial. Twenty-two seconds to first punch became six.</p>

      <p>The number is useful, but it isn't the point. The point is that removing four screens was a decision with an argument behind it, and I can walk you through the argument. A model will happily generate all four of those screens back for me. It won't tell me to delete them.</p>

      <p>Deletions are the cheapest way to prove you have judgment, and hardly anybody writes them down.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">One Real Number, Defended</h2>

      <p>Not a dashboard of metrics. One number you can explain: how you measured it, what it was before, what you changed, and why you believe the change caused it.</p>

      <p>Ring-Rival's audio failed in around forty percent of sessions until I gated the AudioContext behind the first tap. Under two percent now. I know why it was broken, I know why the fix works, and I can tell you how I noticed, which is that nothing errored and I only caught it by opening the game on unfamiliar devices.</p>

      <p>An unglamorous number you fully understand beats an impressive one you can't source. Interviewers ask a second question, and the second question is where invented numbers die.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Cut the Process Theater</h2>

      <p>Affinity maps. Persona cards. Journey maps with emoji sentiment tracks. Every portfolio has them and they've all looked the same for a decade, which was already true before AI could generate them in bulk.</p>

      <p>They're artifacts of a process, not evidence of thinking. Nobody reading your site is trying to verify that you know what a persona is. They're trying to find out whether you can reason about a specific problem under specific constraints, and a journey map doesn't answer that in either direction.</p>

      <p>If a research artifact changed what you built, show the change and skip the artifact. If it didn't change what you built, it doesn't belong on the page at all.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">The Structure I Use</h2>

      <p>Every case study I write follows the same shape: the problem, what I built, the parts AI couldn't do for me, what got cut and why, and the outcome measured honestly. If a section doesn't fit one of those, it doesn't go in.</p>

      <p>The third one is the differentiator right now. Naming what you had to do by hand — the game feel, the trust rules, the state you only discovered by building it — tells a reader exactly where your judgment ends and your tooling begins. That's the thing they're actually trying to figure out.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Assume They'll Ask</h2>

      <p>Every claim on your site is now a question in an interview. If AI wrote a section you can't defend line by line, cut it. Getting caught not knowing your own case study is worse than having a shorter one.</p>

      <p>Three projects you can defend completely beats eight that look impressive from a distance. That was always true. It's just enforceable now.</p>
    <p>The decisions behind one of these, documented from the code, are in <a href="/project/bz-essentials" class="text-primary underline">the BZ Essentials case study</a>.</p>
    `
  },
  {
    id: "6",
    title: "What AI Changed About Design Work, and What It Didn't",
    excerpt: "Two years of building products solo with AI. The changes are real and specific, and so is the list of things that are exactly as hard as they always were.",
    author: "Hiram Barsky",
    date: "June 4, 2026",
    readTime: "4 min read",
    coverImage: "/blog/what-ai-changed-and-what-it-didnt-cover.jpg",
    coverCaption: "What actually moved in design work, and what stayed exactly where it was.",
    tags: ["AI", "Product Design", "Process"],
    slug: "what-ai-changed-and-what-it-didnt",
    content: `
      <p>I've been designing products for fifteen years and building them solo with AI for a while now. The changes are real. They're also narrower and more specific than either the hype or the panic suggests.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Changed: Being Wrong Got Cheap</h2>
      <figure class="my-8">
        <img src="/blog/what-ai-changed-and-what-it-didnt-body.jpg" alt="A designer sketching by hand" loading="lazy" class="w-full rounded-lg" width="1400" height="788" />
        <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">The part that didn't change: deciding what's worth making, before anything gets made. <span class="opacity-70">Photo by <a href="https://unsplash.com/@medbadrc?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Med Badr  Chemmaoui</a> on <a href="https://unsplash.com/?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Unsplash</a></span></figcaption>
      </figure>


      <p>This is the big one and everything else follows from it. An idea used to cost weeks to test properly, which meant you argued about it instead, which meant the loudest person in the room won a lot of arguments that should have been settled by evidence.</p>

      <p>Now you build it and look. The cost of finding out you were wrong dropped enough that finding out is usually faster than debating. That changes how you should work, not just how fast you work.</p>

      <figure class="my-8">
        <img src="/images/ringrival-sprite-sheet-2.webp" alt="Nine poses per fighter — generated fast, then hand-tuned until a punch felt like a punch" class="w-full rounded-xs" />
        <figcaption class="mt-3 text-sm leading-relaxed text-muted-foreground">Nine poses per fighter, generated fast and then hand-tuned until a punch read as a punch. AI did the volume; the tuning was mine.</figcaption>
      </figure>

<h2 class="text-2xl font-bold mt-8 mb-4">Changed: The Deliverable Is the Product</h2>

      <p>I don't make specs for other people to implement. The design ends when the thing is live. That collapses a whole category of work — annotations, handoff documents, the meetings that exist to clarify the handoff documents — and it moves the accountability with it. Nobody else touched it, so nobody else is responsible for how it came out.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Changed: You Can Follow the Tangent</h2>

      <p>Small ideas used to die on cost. A weird interaction you wanted to try, a second version of a flow just to compare — not worth a sprint, so it never got built. Now it's an afternoon. Some of my best decisions came out of tangents I'd never have been able to justify to a team.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Didn't Change: Deciding What Not to Build</h2>

      <p>A model will build anything you ask for, immediately, without asking whether it should exist. It has no stake in the product being coherent and no memory of being annoyed by clutter.</p>

      <p>So the constraint moved. It used to be engineering capacity, which was an accidental but effective filter on bad ideas. That filter is gone. The only thing left standing between your product and a hundred features nobody wanted is your own willingness to say no, repeatedly, to work that costs almost nothing to produce.</p>

      <p>That's harder than it sounds. Deleting something that took a week feels responsible. Deleting something that took ten minutes feels like nothing, which is exactly why it accumulates.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Didn't Change: Feel</h2>

      <p>The fighters in Ring-Rival are rigged from separate body, arm, and leg pieces specifically so a punch can be tuned rather than replayed. How long contact hangs, how much the camera moves, when control returns — all hand-tuned, by throwing punches until it stops feeling wrong.</p>

      <p>No model can help with that. It has no body and no way to evaluate the result. Every product has a version of this somewhere, and it's usually the part people remember.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Didn't Change: Trust</h2>

      <p>CatchBuddy puts strangers in the same place to play a pickup game. HerbaLink puts people in front of practitioners whose credentials have to actually mean something. In both, the safety architecture is the product, not a layer applied to it.</p>

      <p>A model will scaffold verification tables in seconds. It cannot decide who is allowed to post, what happens when someone gets reported, or what the system should do when trust breaks down. Those are value judgments with consequences attached to real people, and they belong to a person who can be held to them.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Didn't Change: Nobody Knows Your Product Exists</h2>

      <p>The build stopped being the hard part. Distribution didn't get one bit easier. You can now produce a genuinely good product that nobody ever sees, faster than ever before.</p>

      <p>That's the trap in the current moment, and I've walked into it. Shipping feels like progress because it used to be the scarce thing. It isn't scarce anymore.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Didn't Change: Most Products Fail on the Problem</h2>

      <p>They don't fail because the build was bad. They fail because the problem wasn't real, or was real but shaped differently than anyone assumed. AI does nothing about that. It just gets you to the point of discovering it sooner and with less money spent, which is a genuine improvement and not a solution.</p>

      <p>The work is what it always was: figure out what's actually worth building, then build only that. The second half got dramatically easier. The first half didn't move.</p>
    <p>The clearest example of the split is in <a href="/project/ring-rival" class="text-primary underline">the Ring-Rival case study</a>.</p>
    `
  }
];

// blogPosts above isn't guaranteed to be in date order — every consumer that lists posts
// (BlogPreview, BlogLanding) needs the same "most recent first" ordering, so sort once here
// instead of each component silently trusting array order (which is how a "Latest Insights"
// section ended up showing posts that weren't the latest).
export const sortedBlogPosts: BlogPost[] = [...blogPosts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

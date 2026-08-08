// Import blog images
import blogFindingUxJob from '@/assets/blog-finding-ux-job.jpg';
import blogDesignSystems from '@/assets/blog-design-systems.jpg';
import blogCaseStudyWriting from '@/assets/blog-case-study-writing.jpg';
import blogAiInDesign from '@/assets/blog-ai-in-design.jpg';
import blogUserResearchBudget from '@/assets/blog-user-research-budget.jpg';
import blogVisualHierarchy from '@/assets/blog-visual-hierarchy.jpg';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  coverImage: string;
  tags: string[];
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "10",
    title: "Finding a UX Job – What Actually Works",
    excerpt: "Most portfolios fail because they're built to show range instead of depth. Here's how I'd fix one — and what's actually different about breaking in now that AI changes what a strong candidate can ship.",
    author: "Hiram Barsky",
    date: "January 15, 2025",
    readTime: "7 min read",
    coverImage: blogFindingUxJob,
    tags: ["UX Design", "Career", "Job Search", "Portfolio", "Networking"],
    slug: "finding-first-ux-job-guide",
    content: `
      <p>Fifteen years in this field, across PNC, Bank of America, Deloitte, TCS, and Express Scripts, and the resumes I get asked to look at all have the same problem: they're optimized for the wrong reader.</p>

      <p>Hiring managers don't read portfolios. They scan them. Ten seconds on the homepage, thirty seconds on a case study if the ten seconds worked. Everything after that is either interview-worthy or ignored.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Your Portfolio Is a Product, Not a Portfolio</h2>

      <p>Treat it like one. Who's the user? A hiring manager or a design lead skimming twenty tabs between meetings. What's their job to be done? Decide in under a minute whether you're worth a phone screen. Most portfolios fail this test because they're built to show range — ten projects, every tool you've touched, every methodology you know — when the actual job is proving depth on a handful of real decisions.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Three Case Studies, Not Ten</h2>

      <p>Pick three. One with genuinely messy constraints — a stakeholder fight, a legacy system you had to work around, a deadline that cut your process short. One that shows you can ship, not just design — a live product, ideally one you can point to and say "that's running right now." One with a number attached to the outcome, even an honest, unglamorous one.</p>

      <p>Cut everything else. A fourth case study doesn't add credibility — it adds skimming time, and skimming time is the thing working against you.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Show What You Decided, Not What Your Team Did</h2>

      <p>"We ran user interviews, we built personas, we shipped a redesign" tells a hiring manager nothing about you specifically. Say what you argued for. Say what you pushed back on. Say what you got wrong the first time and how you found out. That's the part they're actually screening for — not whether you know the process, but whether you can reason through a real decision under real constraints.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Networking Means Showing Up With Something to Say</h2>

      <p>Attending a meetup and collecting business cards doesn't move anyone. Having an opinion about a specific problem, saying it out loud, and following up with the two or three people who engaged does. The best roles I've heard about in fifteen years never had a job posting attached to them — they came from someone remembering a conversation.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">AI Didn't Lower the Bar. It Moved It.</h2>

      <p>The designers getting hired right now aren't the ones who learned a prompt-engineering trick. They're the ones who can take an idea from Figma to a working product, using AI as a build partner instead of stopping at the mockup. I ship my own products end to end now — design, then actual production code — and it changes what a case study can show. Not "here's the flow I designed" but "here's the thing I built, here's what I cut, here's why it works." That's a different, higher bar than the one that existed a few years ago, and it's worth aiming for even before you have a job depending on it.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">What Actually Moves the Needle</h2>
      <ul class="list-disc pl-6 mb-4">
        <li>Cut your portfolio to three case studies and rewrite each one around a decision, not a deliverable.</li>
        <li>Pick five companies you'd actually want to work for and learn their real design problems before you talk to anyone there.</li>
        <li>Build one thing — even small — that you designed and shipped yourself, AI-assisted or not. It's the strongest signal you have.</li>
      </ul>
    `
  },
  {
    id: "5",
    title: "Building Design Systems That Actually Get Used (Not Shelved)",
    excerpt: "I've seen more design systems die in Figma libraries than I care to count. Here's how to build ones that actually get used.",
    author: "Hiram Barsky",
    date: "January 8, 2025",
    readTime: "8 min read",
    coverImage: blogDesignSystems,
    tags: ["Design Systems", "Team Collaboration", "Process", "Documentation"],
    slug: "design-systems-that-get-used",
    content: `
      <p>I've watched design systems die in three different banks. Beautiful token libraries, fully documented, zero adoption. The pattern is always the same: the system got built as a design exercise instead of as a fix for a specific, visible problem.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Start With the Fight That's Already Happening</h2>

      <p>Every team has a component everyone quietly argues about — the button that's blue in one flow and navy in another, the form field that four different engineers have rebuilt from scratch. Start there. Not with a full inventory, not with an atomic-design diagram. Fix the thing people are already annoyed about, and you get your first adopters for free, because you just solved their problem, not yours.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Build It as the Answer to a Real Constraint</h2>

      <p>When I redesigned the interface loan officers used to manage multi-million-dollar deals, the pattern library came out of a much narrower question than "what should our components look like": what does an officer need to see first, and what can wait? Three previous attempts to replace the Excel workflow it was built on top of had already failed, each for the same reason — building toward familiarity instead of toward what officers actually needed to get through their day. A design system built to answer that question survives. One built to look tidy in Figma doesn't.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Developers Decide If This Survives</h2>

      <p>If engineering isn't excited about your design system, it's already dead — it just hasn't stopped moving yet. Bring them in before you've made any decisions, not after you've finished the Figma library and need someone to "implement" it. The systems that last are the ones where design tokens and coded components got built together, by the same conversation, not handed off across a wall.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Documentation That Gets Read Once and Then Trusted</h2>

      <p>Nobody reads a design system's philosophy page. They read it once, when they're stuck, looking for one of three answers: when do I use this, how do I implement it, what breaks if I use it wrong. Write for that moment. Skip the mission statement.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Governance Is a Habit, Not a Committee</h2>

      <p>The simplest version works: a clear place to propose a change, someone who actually responds to it within a few days, and a bias toward yes. Systems that require a review board to add a component train people to route around the system instead of through it.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">What Actually Proves It Worked</h2>

      <p>Component coverage is a vanity metric. Track whether teams are reaching for your system by default instead of building their own version, whether handoff arguments have gotten shorter, whether a new hire can ship something consistent without asking five questions first. Those are the signs a system earned its place instead of being tolerated.</p>

      <p>A design system that survives isn't the one with the most components. It's the one that solved a problem people could feel — and kept solving new ones as the product changed under it.</p>
    `
  },
  {
    id: "6",
    title: "Case Studies That Win Clients – Beyond Pretty Screens",
    excerpt: "After reviewing a few hundred UX portfolios, the pattern behind the silence is always the same. Here's what separates a case study that gets an interview from one that gets a polite scroll-past.",
    author: "Hiram Barsky",
    date: "December 28, 2025",
    readTime: "6 min read",
    coverImage: blogCaseStudyWriting,
    tags: ["Portfolio", "UX Design", "Career", "Job Search", "Interview"],
    slug: "case-study-writing",
    content: `
      <p>Your portfolio is getting views, no interviews. I've reviewed a few hundred UX portfolios at this point — as a hiring manager and as someone giving feedback to designers trying to break in — and the same handful of problems account for most of the silence.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Nobody Finishes a 47-Slide Case Study</h2>

      <p>If you can't explain your process in eight to ten slides, you don't understand it well enough yet. Long case studies aren't thorough — they're a sign the designer hasn't figured out which decisions actually mattered. Cut to the two or three that did.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Process Without Outcome Is Just Activity</h2>

      <p>"I conducted interviews, built personas, mapped the journey" is a list of things you did, not a story about what happened because you did them. Did the metric move? Did the thing you built actually ship? If you don't have a number, say what changed in plain terms — fewer support tickets, a workflow that used to take four steps and now takes one. Activity isn't the point. Consequence is.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Pretty Screens Are Not a Case Study</h2>

      <p>A gallery of polished screens with no context proves you can use Figma. It doesn't prove you can design. If someone can't tell from your case study what problem you were solving or why the interface looks the way it does, you've shown visual design, not product thinking.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Fake Projects Are Fine for Learning, Not for Proving You Can Ship</h2>

      <p>Redesigning an app you don't work on is a reasonable way to practice. It's a weak way to prove you can handle real constraints — a stakeholder who changes their mind, a legal team that blocks your favorite flow, a deadline that cuts your research in half. If your whole portfolio is speculative redesigns, that's what a hiring manager will assume about your experience with the real thing.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Start With Why It Mattered</h2>

      <p>"The client wanted a mobile app" is a requirement, not a problem. What were officers, or patients, or customers actually stuck on before this existed? What was the cost of that being unsolved? That's the sentence that makes someone want to keep reading.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Say What You Did, Not What the Team Did</h2>

      <p>"We did user research, we created wireframes" — who's we? Hiring managers are trying to isolate your judgment from your team's. Say what you personally argued for, decided, or pushed back on. If you can't separate your contribution from the group's, that's worth fixing before you write another case study.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Include the One That Didn't Go Cleanly</h2>

      <p>Real work is messy — budgets get cut, timelines compress, the first version is wrong. My first pass at replacing an Excel-based loan workflow tried to minimize how much different it looked from Excel. It was the worst of both — familiar-looking, but it didn't behave the way officers needed it to. The rewrite went the other direction entirely, and that failure is a more useful thing to show a hiring manager than a project that went perfectly. A portfolio where everything worked on the first try reads as either dishonest or under-ambitious.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">How I Structure Mine Now</h2>

      <p>Every case study on my own site follows the same shape: The Problem, What I Built, the parts of it AI couldn't do for me, what got cut and why, and the outcome — measured honestly, not dressed up. That structure forces the same discipline every time: state the constraint, show the decision, show the result. If a section doesn't fit one of those, it doesn't belong in the case study.</p>
    `
  },
  {
    id: "7",
    title: "How AI Is Changing UX Design – A Designer's Perspective",
    excerpt: "AI didn't replace UX designers — it replaced the version of the job that stopped at the mockup. Notes from designing and shipping my own products with AI as a build partner, not a replacement for judgment.",
    author: "Hiram Barsky",
    date: "December 15, 2025",
    readTime: "9 min read",
    coverImage: blogAiInDesign,
    tags: ["AI", "UX Design", "Future", "Career", "Technology"],
    slug: "ai-enhanced-ux-designer-future",
    content: `
      <p>AI didn't replace UX designers. It replaced the version of the job that stopped at the mockup. I design and ship my own products now — Figma to production code — with AI as a build partner, and that shift is a bigger deal than any individual tool.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Building Is Easy Now. Deciding What Not to Build Isn't.</h2>

      <p>Give an AI model a feature request and it will build it — cleanly, quickly, and without asking whether it should. On Fire Lion, an arcade game I designed and shipped solo, AI happily generated daily missions, streaks, a forge upgrade screen, mod gating, three premium fighter modes. Players used almost none of it. The deletion list ended up longer than the feature list, and the game got better with every removal. That's the actual design work now — not generating options, but killing the ones that don't earn their place. AI doesn't do that part. It has no opinion about what to cut, because it isn't the one who has to live with a cluttered product.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">The Parts AI Can't Do</h2>

      <p>On Ring-Rival, a mobile boxing game with AI-generated opponents and trash talk, the AI can write endless fighters. It can't tell you whether a punch feels like a punch. Hit-stop duration, screen shake amplitude, the exact haptic timing on a connect — that's all hand-tuned by feel, tested against a human reaction, adjusted, tested again. No model has a body. It doesn't know what "satisfying" feels like in your hand. That's still entirely yours.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Where AI Breaks Trust If You Let It</h2>

      <p>Safety can't be a bolt-on, and AI will happily bolt it on anyway. Building CatchBuddy, a same-day pickup-sports app where strangers meet from an app, meant phone verification, a panic button, and curated meeting spots weren't features to add later — they were the product. AI can scaffold a database schema in seconds. It can't decide who's allowed to post, what happens when someone reports another user, or what the failure mode should be when trust breaks down. Same with HerbaLink, a booking platform for verified herbalists — the credential gate is the actual product. Get that wrong and nothing else about the design matters.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">What I Actually Use AI For</h2>

      <p>Fast iteration on structure and flow, generating enough variations that I can see what I actually want by comparing options instead of staring at a blank canvas. Writing implementation code once a design decision is made, so the gap between "designed" and "shipped" is days, not months. Catching the boring bugs so I can spend my attention on the ones that are actually about the product. It's a build partner, not a decision-maker.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">What This Changes About a Portfolio</h2>

      <p>The bar used to be "here's the flow I designed." Now it can be "here's the product I shipped, here's what I cut, here's the part I had to hand-tune myself because nothing else would get it right." That's a harder story to tell and a much more convincing one. If your portfolio still stops at the prototype, that's the gap worth closing — not learning another prompting trick.</p>
    `
  },
  {
    id: "8",
    title: "User Research on a Shoestring Budget: Maximum Impact, Minimum Cost",
    excerpt: "I've never had a research budget on any of my own products, and the research still happened. Here's what it actually looked like without a department behind it.",
    author: "Hiram Barsky",
    date: "December 1, 2025",
    readTime: "7 min read",
    coverImage: blogUserResearchBudget,
    tags: ["User Research", "Budget", "Methods", "Strategy", "Process"],
    slug: "user-research-shoestring-budget",
    content: `
      <p>"We don't have budget for user research" is the most expensive sentence in product development. I've never had a research budget on any of my own products — Ring-Rival, Fire Lion, CatchBuddy, HerbaLink were all built solo — and the research still happened. It just didn't look like a research department.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Five Conversations Beat Zero Studies</h2>

      <p>The oft-cited rule that five users surface most usability problems isn't a precise law, but the direction of it is right: a handful of thoughtful conversations beats an infinite wait for a comprehensive study that never gets funded. Don't let "we should really talk to twenty people" be the reason you talk to none.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Your Existing Users Are Already Doing the Research For You</h2>

      <p>People already using your product are the best research participants you have — invested, opinionated, and usually willing to give you fifteen minutes if you ask directly instead of sending a survey into the void. When I was validating CatchBuddy's safety flow — phone verification, a panic button, curated meeting spots — the most useful feedback came from a handful of early users describing, in their own words, what would actually make them trust meeting a stranger from an app. No panel, no incentive budget. Just direct asks.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Talk to People Who Aren't Users Yet</h2>

      <p>When you don't have users, find people who live with the problem. For HerbaLink, that meant talking to herbalists themselves about what "verified" needed to mean before a client would trust a booking — not hypothetical users of a booking app, but the actual people the credential gate had to satisfy. Proto-users like this are often easier to reach than you'd expect: relevant subreddits, LinkedIn groups, a cold message to someone whose public complaint about the problem you're solving already told you they're worth talking to.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Free Tools Are Good Enough</h2>

      <p>Zoom for moderated sessions. Loom for async task recordings when scheduling is the real blocker. A plain Google Form for screening before you spend anyone's time. On the analytics side, session recordings from a free tier and the comments under your own product's App Store reviews will tell you more than most paid research platforms, because they show behavior instead of stated preference.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">A Research Week That Fits Around Real Work</h2>
      <ul class="list-disc pl-6 mb-4">
        <li>Write three questions you actually need answered — not twenty.</li>
        <li>Recruit in the community where the problem is already being complained about.</li>
        <li>Run sessions capped at thirty minutes, and spend most of them listening, not explaining your product.</li>
        <li>Share what you found the same week, while it's still specific instead of vague.</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">The Minimum That Actually Counts as Research</h2>

      <p>Every project needs at minimum: one method to understand what people actually need (interviews, or a well-written survey), one method to test whether your solution addresses it (prototype walkthroughs, not just opinions about a static mockup), and one method to check whether it worked after it shipped. Skip any of the three and you're guessing at that stage, not researching.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Make It Impossible to Ignore</h2>

      <p>Research that doesn't change a decision wasn't worth doing. Make findings visual — a real quote, a screen recording clip, not a slide of bullet points. Make them specific enough to act on, not just "users were confused." And keep the writeup short enough that someone actually reads the whole thing before your next stand-up.</p>

      <p>Imperfect research that changes what you build beats comprehensive research that sits in a doc nobody opens.</p>
    `
  },
  {
    id: "9",
    title: "From Wireframes to Wow: What Actually Makes Hierarchy Work",
    excerpt: "Visual hierarchy isn't a styling pass at the end. It's a decision about what matters, made before a single pixel moves. Here's how I actually work through it.",
    author: "Hiram Barsky",
    date: "October 18, 2025",
    readTime: "8 min read",
    coverImage: blogVisualHierarchy,
    tags: ["Visual Design", "Psychology", "Hierarchy", "UX Design", "Interface"],
    slug: "wireframes-to-wow-visual-hierarchy",
    content: `
      <p>Visual hierarchy gets treated like a styling skill — pick the right sizes, the right contrast, the right whitespace, done. It's not a styling skill. It's a priority skill wearing a styling costume. Every hierarchy problem I've been asked to fix turned out to be an unresolved argument about what actually matters on the screen, one that got pushed down into spacing and color because nobody wanted to have it out loud.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Decide Before You Design</h2>

      <p>Before I touch type scale or contrast, I ask one question: if a user can only look at this screen for two seconds, what's the one thing they need to walk away with? Not three things. One. If the answer is a list, the hierarchy is already broken — you just haven't drawn it yet.</p>

      <p>On the investor loan platform I rebuilt, the first version I shipped replicated too much of Excel's structure, because I was trying to minimize how much the system felt different. Rows, columns, dense grids — familiar, and wrong. It looked like the tool officers already knew, but it didn't behave like it, and it definitely didn't tell them what mattered first. The rewrite went the other direction: looked nothing like Excel, organized around what officers actually needed the moment they opened it.</p>

      <p>Officers don't start their day on a dashboard. They open a specific deal. So the deal — not the summary metrics, not the notifications, not the navigation — became the loudest thing on the screen. Everything else got quieter until it earned its place back.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">The Squint Test Still Works</h2>

      <p>Squint at the screen. What survives? That's your real hierarchy, whether you designed it on purpose or not. If the wrong element wins — a decorative header image beats the actual call to action, a badge beats the price — fix that before you fix anything else. Font sizes and colors are just the tools; the squint test tells you if you're using them correctly.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Where Hierarchy Actually Breaks</h2>

      <p>Three ways I see it go wrong, over and over:</p>

      <ul class="list-disc pl-6 mb-4">
        <li><strong>Everything is loud.</strong> When every element is fighting for attention, the user just tunes out the whole screen. Prioritizing ruthlessly means some things get to be boring on purpose.</li>
        <li><strong>The pattern isn't consistent.</strong> If the primary action is blue on one screen and green on the next, users have to relearn the interface every time they arrive. That's a tax you're charging them for no reason.</li>
        <li><strong>Visual weight doesn't match content weight.</strong> The most important information on the page has to be the most visually prominent thing on the page. If your legal disclaimer is styled bigger than your main action, something upstream went wrong.</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">Small Screens Don't Let You Cheat</h2>

      <p>Mobile forces the priority conversation whether you want to have it or not. There's no room to let five things share the spotlight. If you design the mobile version first, you're forced to decide what actually earns space — and that decision usually holds up when you expand back out to desktop. Designing hierarchy desktop-first and shrinking it down later just means you get to postpone the hard call, not skip it.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">How I Check It</h2>

      <p>Two tests, both cheap: show the design for five seconds and ask what someone remembers — it should match what you wanted them to focus on. Then hand them a real task and watch whether they hunt for anything. If they're scanning the whole screen looking for the button that should have been obvious, the hierarchy isn't done, no matter how the spec file looks.</p>

      <p>None of this is about making things pretty. It's about deciding, on purpose, what the user sees first, second, and not at all — and then having the discipline to make the visual design match that decision instead of your taste.</p>
    `
  },
  {
    id: "1",
    title: "From Zero to Launch: Shipping a Product with Placeholder Data and No Marketing Budget",
    excerpt: "No users yet. No ad budget. No team. Here's what actually gets a solo-built product seen — from someone who ships this way by default.",
    author: "Hiram Barsky",
    date: "May 16, 2025",
    readTime: "8 min read",
    coverImage: "https://barskydesign.pro/lovable-uploads/b05265c4-6699-47ae-9319-0fdea04fd57f.png",
    tags: ["Product Design", "Marketing", "Solo Designer", "UX Design"],
    slug: "built-product-without-real-data",
    content: `
      <p>I design and build solo. No team, no marketing budget, and for the first stretch of any product, no real users — just placeholder data and a working prototype I'm still arguing with myself about. Ring-Rival, Fire Lion, CatchBuddy — every one of them started exactly there. If you're a solo designer in that same spot, here's what I've actually found works, and what's a waste of time.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Stop Waiting for a Launch</h2>

      <p>There's no launch moment when you're solo and unfunded. Nobody's waiting for your product to go live. What people respond to is watching something get built — the decisions, the dead ends, the thing you ripped out three days before you were going to ship it. That's more interesting than a finished screenshot, and it's the one thing a big company with a marketing team can't fake, because it actually has to be true.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">The Build Is the Story</h2>

      <p>With Ring-Rival, the interesting part was never "I made a boxing game." It was the tuning nobody sees in a screenshot — hit-stop duration, screen shake amplitude, the exact curve of a health bar drain. No AI model knows whether a punch feels like a punch. That's hand-tuned, by feel, one build at a time. When I cut time-to-first-punch from 22 seconds to 6 by killing steps between install and action, that came from watching real people open the app and getting visibly impatient — not from a best-practices list.</p>

      <p>Same with the audio bugs. Early builds had an audio failure rate around 40% because AudioContext wasn't gated behind a user tap on iOS. Getting that under 2% wasn't glamorous work, but it's the difference between a game that feels broken and one that doesn't. That's the story worth telling — not "check out my app," but "here's the specific thing that was wrong and how I found it."</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Say It's Placeholder Data. Don't Apologize for It.</h2>

      <p>Placeholder data is fine. Pretending it isn't placeholder data is the problem. Say plainly what's real and what isn't: "The matchmaking works, the trash talk is generated live, the leaderboard is seeded." People trust a builder who's specific about the state of things far more than one who's vague and hoping nobody asks.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Killing Features Is Also Content</h2>

      <p>Building features with AI is fast now — almost too fast. On Fire Lion, AI happily generated daily missions, streaks, a forge upgrade screen, mod gating, three premium fighter modes. Users touched none of it. The deletion list ended up longer than the feature list, and the game got better with every cut. Writing about what I removed and why got more genuine engagement from other designers than anything about what I added. Cutting well is a skill people want to see, because most of them are drowning in the same AI-generated feature bloat.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Go Where Builders Actually Are</h2>

      <p>Skip the ad spend you don't have and go to the places where people talk shop: design-focused Reddit threads, LinkedIn posts that walk through a specific decision instead of announcing a launch, Discord servers full of other people building solo. You're not selling — you're trading notes with people doing the same thing.</p>

      <p>Ask for the right thing when you post. Not "check this out" — ask "would you have solved this differently?" or "is this actually usable, or does it just work for me because I built it?" Five real conversations with people who build things beat a hundred passive likes. The likes don't tell you anything. The conversations do.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">You Don't Need Permission to Call Yourself a Builder</h2>

      <p>You don't need real users to be a real designer, and you don't need a marketing budget to start showing people what you're doing. If you've shipped something alone — even something held together with placeholder data and duct tape — you already did the hard part. The rest is just being willing to show your work while it's still unfinished.</p>
    `
  },
  {
    id: "2",
    title: "What I Learned Building Products Nobody Asked For",
    excerpt: "Ring-Rival, Fire Lion, CatchBuddy — three solo-built products nobody requested. Here's what actually shipping them taught me that no course did.",
    author: "Hiram Barsky",
    date: "April 28, 2025",
    readTime: "6 min read",
    coverImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
    tags: ["Product Development", "Lessons Learned", "Side Projects", "Design Process"],
    slug: "building-products-nobody-asked-for",
    content: `
      <p>Ring-Rival, Fire Lion, CatchBuddy — nobody asked for any of these. No client brief, no market research deck, no stakeholder validating the idea before I started. I designed and built all three myself, with AI as a build partner rather than a shortcut, and they taught me more about product design than fifteen years of client work alone did. Here's what actually held up.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Your First Version Is a Hypothesis, Not a Plan</h2>

      <p>I used to spend weeks perfecting a concept before building anything — wireframes, competitor research, a PRD nobody but me would read. Then I'd build it and get silence. The problem was never execution. It was that I was solving a problem that only existed in my head. The faster I put something in front of a real person, even three people, the faster I found out whether the problem was real.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Cutting Is the Real Design Work</h2>

      <p>Building features is easy now. AI will happily generate a daily missions system, a streak tracker, a forge upgrade screen, mod gating, three premium modes — all in an afternoon, all working, all tested fine in isolation. That's exactly what happened on Fire Lion. Users touched almost none of it.</p>

      <p>The deletion list ended up longer than the feature list, and the game got better with every removal. The whole project came down to one question asked over every feature, mine or AI's: does this make the player want one more run? If yes, it stayed. If no — even if it took five minutes to build and passed every test — it got cut. Killing features that work is harder than shipping features that don't, and it's the part of the job AI can't do for you, because it doesn't know what "want one more run" feels like.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">The Details Nobody Requests Are the Product</h2>

      <p>Nobody asks for good game feel. They just quit playing games that don't have it. On Ring-Rival, hit-stop duration, screen shake amplitude, the 60ms haptic pulse on a connect, the curve of the health bar drain — all hand-tuned by feel, one build at a time. No model knows whether a punch feels like a punch. AI can generate an endless roster of fighters; sequencing them so a session feels like it's escalating is design, and it's mine to do.</p>

      <p>The unglamorous fixes mattered just as much. Time-to-first-punch dropped from 22 seconds to 6 once I killed the friction between install and the first hit landing. Audio failures dropped from roughly 40% to under 2% once I gated AudioContext behind the first tap instead of trying to start it on load. Neither of those came from a features list. They came from watching someone else's thumb hesitate.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Users Don't Want Your System — They Want Their Problem Solved Safely</h2>

      <p>CatchBuddy is a same-day pickup sports app — you show up, you play with strangers, today. That premise doesn't work without trust, so safety couldn't be a feature I bolted on after the core flow was done. Phone verification, a panic button, curated meeting spots — those aren't add-ons, they're the actual product. Nobody who's meeting a stranger for a pickup game an hour from now cares about your elegant component library. They care whether the app made it safe enough to show up.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">The Best Ideas Started With My Own Annoyance</h2>

      <p>None of these three came from a market opportunity I spotted in research. They came from a problem I personally ran into and got tired of working around. When you're solving your own problem, you already know exactly how the existing options fail, and you know the moment you've actually fixed it — no survey required.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">What Actually Changed</h2>

      <p>The real shift wasn't a new process. It was the questions. Not "what features should I add" but "what's the player actually trying to feel right now." Not "how do I make this more powerful" but "what can I cut without anyone noticing it's gone." Building things nobody asked for is the fastest way I know to learn that difference, because there's no client in the room to tell you which answer they'd prefer to hear.</p>
    `
  },
  {
    id: "4",
    title: "Why Your Beautiful Interface Doesn't Convert",
    excerpt: "A checkout flow can be flawless and still lose. Polish isn't the same as removing friction — here's where I actually put my attention now.",
    author: "Hiram Barsky",
    date: "March 30, 2025",
    readTime: "9 min read",
    coverImage: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=400&fit=crop",
    tags: ["Conversion Optimization", "UX Design", "User Psychology", "Interface Design"],
    slug: "beautiful-interface-doesnt-convert",
    content: `
      <p>I once spent three months on a checkout flow I was genuinely proud of — clean type, careful spacing, restrained animation, illustrations that actually fit the brand. It converted worse than the plain version it replaced. That's when beautiful and effective stopped being the same word in my head.</p>

      <p>If you're designing anything that needs to drive an action — a signup, a purchase, a download — this is what I actually changed after that.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Pretty Doesn't Mean Persuasive</h2>

      <p>The best-looking interface in the world is worthless if nobody takes the action you need them to take. I used to think conversion was about looking more trustworthy — more whitespace, more restrained colors, more sophisticated layout. Conversion isn't an aesthetic problem. It's a friction and anxiety problem wearing a UI. The question that actually matters isn't "does this look good," it's "does this help someone move forward without hesitating."</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Obvious Beats Clever</h2>

      <p>Designers like subtle interfaces — hidden nav that appears on hover, minimal buttons that blend into the layout, an interaction that surprises people. In a conversion flow, none of that helps. Someone filling out a form isn't touring your craft. They're trying to finish a task and get back to their day. Every second of confusion is a chance for them to leave.</p>

      <p>What actually works is unglamorous: buttons that are obviously buttons, form labels that say exactly what information you want, a progress indicator that shows how much is left, and error messages that tell someone precisely what to fix instead of just that something's wrong.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Anxiety Is the Real Blocker</h2>

      <p>People don't abandon a flow because the design is ugly. They abandon it because they're quietly worried about something you never addressed:</p>

      <ul class="list-disc pl-6 mb-4">
        <li><strong>Security</strong> — is this site going to do something with my card number.</li>
        <li><strong>Commitment</strong> — what am I actually agreeing to here.</li>
        <li><strong>Time</strong> — how long is this going to take.</li>
        <li><strong>Value</strong> — is this actually worth it.</li>
        <li><strong>Recovery</strong> — what happens if I mess this up.</li>
      </ul>

      <p>A gorgeous design does nothing for someone stuck on any of those five questions. Answer them directly — visible security cues, plain language about what they're signing up for, a stated time estimate, clear value at every step, and an easy way to correct a mistake without starting the whole flow over.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Copy Carries More Weight Than Layout</h2>

      <p>This one bruised my ego, but it's true: in a conversion flow, words usually matter more than visual design. People are scanning for specific answers — what does this cost, what do I get, how long does it take, can I cancel, is it secure. If the visual design makes those answers harder to find, the interface is losing conversions no matter how well it's typeset.</p>

      <p>Scannable headlines that answer the actual question. Bullet points over paragraphs. Specific details over vague promises. Button copy that says what happens next — "Start My Free Trial," not "Submit."</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Mobile Doesn't Forgive Ambiguity</h2>

      <p>A flow that works on desktop often falls apart on mobile — not from a responsive breakpoint bug, but from context. Mobile users are more distracted, more impatient, more cautious because it's harder to see the usual trust signals, and more error-prone on small touch targets. Bigger tap targets on primary actions, fewer fields per screen, trust signals that don't get lost, and error prevention that doesn't rely on someone squinting — all of it matters more on a phone, not less.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">What I Actually Check Now</h2>

      <p>Before I open a visual design tool, I answer five questions: what's the one action I need someone to take, what's likely to stop them, what do they need to know to feel confident, how do I make the next step obvious, and what's the simplest way to say why this is worth their time. Visual design comes after those are answered, not before.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">The Ugly Truth</h2>

      <p>Some of the highest-converting interfaces I've shipped were also some of the ugliest — big orange buttons, blunt headlines, obvious social proof, the same value proposition repeated at every step. They worked because they were built for the person trying to get through the flow, not for a portfolio screenshot.</p>

      <p>That doesn't mean give up on good design. It means remembering what good design is for. The most polished interface in the world is worthless if it doesn't help someone finish what they came to do.</p>
    `
  },
  {
    id: "3",
    title: "How to Research When You Don't Have Users Yet",
    excerpt: "You can't interview users who don't exist yet. You can still do real research — you just have to research the problem, not your solution.",
    author: "Hiram Barsky",
    date: "March 18, 2025",
    readTime: "8 min read",
    coverImage: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&h=400&fit=crop",
    tags: ["User Research", "Product Development", "Validation", "Design Process"],
    slug: "research-without-users",
    content: `
      <p>You have an idea. You know you're supposed to talk to users before you build it. But there are no users — the product doesn't exist yet. That chicken-and-egg problem kills more good ideas than bad execution does. Here's how I actually research something before anyone's used it, across fifteen years of doing this at banks, consultancies, and now on my own products.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Research the Problem, Not the Solution</h2>

      <p>Most early research asks about the solution: "would you use an app that does X." That's a hypothetical, and people are bad at predicting their own behavior around hypotheticals. What they're good at is describing what's actually frustrating them right now.</p>

      <p>Bad question: "would you use a meal planning app with AI recommendations." Good question: "how do you currently decide what to cook for dinner." Bad question: "what features would you want in a project management tool." Good question: "what's the most frustrating part of managing projects at your company." People can tell you exactly how they struggle today. They can't tell you how they'd use something they've never touched.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Find People Who Have the Problem, Not People Who'd Use Your Product</h2>

      <p>You don't have users yet, but you can find people living the problem you're trying to solve — proto-users, even if they've never heard of what you're building. Reddit threads where people vent about it. LinkedIn and industry groups. Reviews of the products you'd be replacing, where people describe exactly what's failing them. Your own network, if you're honest about asking for introductions instead of validation.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Watch the Workflow, Don't Ask About It</h2>

      <p>Every product replaces or improves an existing workflow. That workflow is your roadmap. What triggers someone to start the task. What tools they're duct-taping together right now. Where they get stuck. What workaround they invented because nothing did the job properly. How they know they're done, and what happens when they make a mistake. The gaps in that current process are where a real product opportunity lives — not in a feature list you brainstormed alone.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Use Their Words, Not Yours</h2>

      <p>Pay attention to the exact language people use — what they call the problem, how they describe the pain, what they call their current tools, how they describe what "better" would look like. This isn't for marketing copy later. It's for checking whether you actually understand the problem the way they experience it. If your product's language doesn't match theirs, that's usually a sign you're solving an adjacent problem, not the one they have.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Test the Idea Before It's Real</h2>

      <p>You don't need a working product to test your biggest assumptions. A sketch or a paper prototype can tell you whether your mental model matches theirs, whether they actually care about the outcome you're promising, and whether your proposed flow lets them get through a real task. I've killed bad concepts and sharpened good ones with nothing but a whiteboard and a conversation, before a single screen got built. ManuscriptRx, a concept I designed around approval gates for pharma HCP communication, started exactly that way — the gating logic got argued out on paper long before there was anything resembling a real interface.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Read the Reviews of Whatever You're Replacing</h2>

      <p>Your competitors' users are your future users. What people consistently praise is table stakes. What they consistently complain about is your opportunity. What workarounds they mention reveal a need nobody's met yet. Why they eventually switch products is a failure mode to avoid. App Store, Google Play, G2, Capterra — wherever your target users leave feedback about the tools they're stuck with now.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Name Your Riskiest Assumptions</h2>

      <p>List every assumption baked into the idea — who the users are, what problem they have, how painful it actually is, what kind of solution they'd want, what they'd pay. Then rank them by how bad it would be to be wrong. Test the riskiest ones first. If you're wrong about who the user is, nothing downstream matters.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Keep Sessions Small and Conversational</h2>

      <p>Five to eight conversations, not a hundred. Background, then how they handle this today, then what's actually frustrating, then what they'd change if nothing were constrained, then a reaction to whatever prototype you have, then space for their own questions. Keep it a conversation, not an interrogation — you're trying to understand their world, not get them to approve yours.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">What This Is Actually For</h2>

      <p>Early research doesn't prove people will love your product. It proves you understand the problem well enough to build something that fits how people actually work. Most products fail not because they're badly built, but because they solve a problem that isn't real, or solve a real problem in a shape that doesn't match anyone's day. You can't research your way to a guaranteed hit. You can research your way out of building something nobody needed in the first place.</p>
    `
  }
];

// blogPosts above isn't in date order — every consumer that lists posts (BlogPreview,
// BlogLanding) needs the same "most recent first" ordering, so sort once here instead
// of each component silently trusting array order (which is how a "Latest Insights"
// section ended up showing posts that weren't the latest).
export const sortedBlogPosts: BlogPost[] = [...blogPosts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

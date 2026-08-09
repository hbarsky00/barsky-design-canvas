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
    id: "7",
    title: "What One Person Can Actually Ship Now",
    excerpt: "I have four products live that I built by myself. The useful version of that story is the one that includes where solo stops working, which is not where people expect.",
    author: "Hiram Barsky",
    date: "August 8, 2026",
    readTime: "5 min read",
    coverImage: "/blog/what-one-person-can-ship-now-cover.jpg",
    tags: ["AI", "Solo Building", "Product Design"],
    slug: "what-one-person-can-ship-now",
    content: `
      <p>I have four products live that I designed and built by myself. No engineering team, no contractor, no cofounder. That sentence would have been a lie a few years ago, and I want to be precise about what it means now, because the honest version is more useful than the triumphant one.</p>

      <p>One person can ship real software. One person still cannot ship a real company. Most of the excitement about this moment lives in the gap between those two sentences.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">What Fits Inside One Head Now</h2>
      <figure class="my-8">
        <img src="/blog/what-one-person-can-ship-now-body.jpg" alt="A row of empty desk chairs — the team a solo builder does not have" loading="lazy" class="w-full rounded-lg" width="1400" height="788" />
        <figcaption class="mt-2 text-sm text-gray-500">Photo by <a href="https://unsplash.com/@bruskrd?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Brusk Dede</a> on <a href="https://unsplash.com/?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Unsplash</a></figcaption>
      </figure>

      <p><a href="/project/stips" class="text-primary underline underline-offset-2 hover:text-primary/80">Stips</a> is a play-money prediction market with accounts, a database enforcing row-level security, market resolution, and a scheduled job that reads the news and writes new markets without me touching it. That is not a landing page with a waitlist attached. It is a running system with state, permissions, and a job that keeps going while I sleep.</p>

      <p><a href="/project/ring-rival" class="text-primary underline underline-offset-2 hover:text-primary/80">Ring-Rival</a> is a browser boxing game whose fighters are rigged from separate body, arm, and leg pieces so a punch can be tuned by hand instead of played back. <a href="/project/catchbuddy" class="text-primary underline underline-offset-2 hover:text-primary/80">CatchBuddy</a> organizes same-day pickup sports between strangers, with the safety architecture designed before the matching was.</p>

      <p>Three different shapes of product. Different data models, different users, different ways of failing. All built by one person around a full workload. Not long ago each of those is a team and a quarter.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">The Cheap Part Was Not the Part I Expected</h2>

      <p>Typing got cheap. That is the change. It is smaller than it sounds.</p>

      <p>What stayed expensive is knowing whether what you just generated is correct. The <a href="/blog/two-bugs-ai-wrote-that-i-had-to-find" class="text-primary underline underline-offset-2 hover:text-primary/80">two worst bugs I have shipped on Stips</a> were both written by a model, both looked completely right, and both were invisible to the thing that wrote them. Close dates that were already expired, because a language model has no clock. A whole category of permission bugs I could not see because I was testing signed out, and row-level security answers an unauthorized read with an empty list rather than an error.</p>

      <p>Writing the market generator took an afternoon. Trusting it took another week, and that week was me building the checks that would tell me when it was wrong. That ratio is the real shape of solo work now. Less typing, the same amount of judgment, packed into fewer decisions that each carry more weight.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Where Solo Actually Stops</h2>

      <p>Four walls, in the order I hit them.</p>

      <p>Distribution did not move an inch. Building got dramatically faster and getting a stranger to open the thing costs exactly what it always did. I can ship a working product over a weekend and then spend three months failing to get anyone to use it. That is a worse story and it is the true one.</p>

      <p>Institutional trust does not come in a repository. The <a href="/project/investor-loan-app" class="text-primary underline underline-offset-2 hover:text-primary/80">investor loan platform</a> I worked on replaced Excel as the system of record for multi-million-dollar deals after three previous attempts had failed. What finally made it stick was putting the audit trail next to the record, which turned compliance from the group blocking adoption into the group arguing for it. That is months of sitting with people who are not going to hand a solo builder the keys to their loan book, however good the demo looks.</p>

      <p>Operations are staffing, not code. CatchBuddy is strangers meeting up to play sports. Verification, curated meeting spots, and a panic button are design problems, and I solved them. Answering that panic button at nine at night is a headcount problem, and there is no model for it. Anything with real-world risk eventually needs a human on a rotation.</p>

      <p>And nobody is checking your work. I found the signed-out testing blind spot myself, late, because there was no second person in the room to ask whether I had tried it logged in. The missing colleague is the most expensive part of building alone and the part nobody puts in the thread.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">What Solo Is Genuinely Better At</h2>

      <p>Acting on a conviction before you can prove it. Inside a company, an unproven opinion needs a deck, a stakeholder, and a slot. Alone it needs a weekend.</p>

      <p>Ring-Rival went from twenty-two seconds to first punch down to six because I deleted the splash screen, the mode select, and the tutorial. Every one of those was a correct answer to a reasonable request, and defending their removal in a room would have taken longer than building the game. I just cut them and watched what happened.</p>

      <p>That is the loop solo is built for. Ship it, watch one real person use it, delete what they ignored, do it again. AI compressed the build step hard enough that the loop is now cheap to run, which is the best thing about the current moment.</p>

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
    tags: ["AI", "Engineering", "Debugging"],
    slug: "two-bugs-ai-wrote-that-i-had-to-find",
    content: `
      <p>I build products solo and AI writes most of the code. That works well enough that the interesting question stopped being whether the code compiles. The interesting question is which bugs survive.</p>

      <p>The two that cost me the most time on Stips, a play-money prediction market I designed and built, were both invisible to the model that wrote them. Neither was a syntax error. Neither would have been caught by a test the model could have written for itself.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">The Model Has No Clock</h2>
      <figure class="my-8">
        <img src="/blog/two-bugs-ai-wrote-that-i-had-to-find-body.jpg" alt="A calendar — the thing a language model doesn't have access to when it writes a close date" loading="lazy" class="w-full rounded-lg" width="1400" height="788" />
        <figcaption class="mt-2 text-sm text-gray-500">Photo by <a href="https://unsplash.com/@towfiqu999999?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Towfiqu barbhuiya</a> on <a href="https://unsplash.com/?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Unsplash</a></figcaption>
      </figure>


      <p>Stips generates markets from news on a schedule. A model reads what happened, writes a question people can take a position on, and sets a close date.</p>

      <p>The close dates came out already expired.</p>

      <p>Not off by a day. Months in the past. The market would land in the database and be dead on arrival, because a model's sense of "now" is whatever felt current in its training data. Ask it to close a market in two weeks and it does the arithmetic honestly, from a starting point that is nowhere near today.</p>

      <p>What made this expensive is that everything else about the output was right. Valid JSON. Sensible question. Clean resolution criteria. Reasoning that read like a person who had actually understood the news story. One field was garbage, and it happened to be the field that decided whether any of the rest was usable.</p>

      <p>The fix is two rules I now apply by reflex. Today's date goes into the prompt as a stated fact, not something the model is left to infer. And no generated date is trusted until it has been compared against real system time. If a close date isn't in the future, the market never gets written.</p>

      <p>Time is the obvious version of this bug. It isn't the only one. Anything the model can't observe — a current price, who holds an office, whether a service still exists, what your schema looks like today — gets produced anyway, confidently, in exactly the right shape. Shape is not truth. And the model has no way to flag which of its outputs it actually knows.</p>

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
    tags: ["Product Design", "Trust", "Healthcare"],
    slug: "designing-for-trust-when-the-product-is-the-risk",
    content: `
      <p>Most software fails softly. A confusing checkout costs somebody four minutes and some patience. A cluttered dashboard produces a slightly worse decision on a Tuesday. Real costs, all recoverable.</p>

      <p>Some products are not like that. If <a href="/project/herbalink" class="text-primary underline underline-offset-2 hover:text-primary/80">a booking platform for herbalists</a> puts someone in front of a practitioner who is not what they claim to be, that is a health outcome. If <a href="/project/catchbuddy" class="text-primary underline underline-offset-2 hover:text-primary/80">an app that arranges pickup games between strangers</a> is casual about who shows up, that is somebody's physical safety. If a financial tool makes a position look more certain than it is, that is somebody's money.</p>

      <p>In those products, trust is not a layer you apply at the end. It is the thing you are actually shipping. Everything else is delivery.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">A Credential Is a Gate, Not a Badge</h2>
      <figure class="my-8">
        <img src="/blog/designing-for-trust-when-the-product-is-the-risk-body.jpg" alt="A padlock on a gate — verification that actually blocks something, rather than a badge that decorates it" loading="lazy" class="w-full rounded-lg" width="1400" height="788" />
        <figcaption class="mt-2 text-sm text-gray-500">Photo by <a href="https://unsplash.com/@dizzydizz?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Zaqy Al Fattah</a> on <a href="https://unsplash.com/?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Unsplash</a></figcaption>
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
    tags: ["Enterprise", "Product Design", "Adoption"],
    slug: "why-enterprise-tools-lose-to-excel",
    content: `
      <p>I spent years designing software inside banks and large enterprises. Every one of those products had the same competitor, and it was never the one named in the evaluation. It was a spreadsheet on somebody's machine, maintained by one person, trusted by everyone, and mentioned in no strategy document anywhere.</p>

      <p>Teams lose that fight constantly and then explain it as change resistance. It is not change resistance. The spreadsheet is genuinely winning on the things that decide adoption.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">What the Spreadsheet Is Actually Beating You On</h2>
      <figure class="my-8">
        <img src="/blog/why-enterprise-tools-lose-to-excel-body.jpg" alt="A desk covered in paperwork — the workflow an enterprise tool is really competing against" loading="lazy" class="w-full rounded-lg" width="1400" height="788" />
        <figcaption class="mt-2 text-sm text-gray-500">Photo by <a href="https://unsplash.com/@dkfra19?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Dimitri Karastelev</a> on <a href="https://unsplash.com/?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Unsplash</a></figcaption>
      </figure>

      <p>It fits the work exactly, because the person doing the work built it. Not approximately. Exactly, down to the column they added last Thursday for the one deal that behaves differently from every other deal.</p>

      <p>It never says no. Enterprise software is largely a catalog of things you are not permitted to do, enforced at the worst possible moment. A spreadsheet at six in the evening the night before a deadline lets you type whatever needs to be there and sort it out afterward.</p>

      <p>It has a perfect trust record. Nobody's spreadsheet has ever silently reassigned their data, lost a row to a sync, or shown them a number they could not trace. It has never surprised them. Your tool, on its first bad day, will.</p>

      <p>Nobody has to be trained on it. The person already knows where everything is because they put it there.</p>

      <p>Read that list back. Fit, permissiveness, trust, familiarity. Nothing on it is a feature. That is why feature parity never wins the argument.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">What Finally Worked</h2>

      <p>The <a href="/project/investor-loan-app" class="text-primary underline underline-offset-2 hover:text-primary/80">investor loan platform</a> I worked on had to replace Excel as the system of record for multi-million-dollar loan deals. Three previous attempts had already failed. Those attempts were not ugly and they were not technically incompetent. They lost on the four things above.</p>

      <p>What changed it was putting the audit trail next to the record. Not in a separate history view, not exported on request. Right there, so anyone could see who changed what and when without asking a person for it.</p>

      <p>That one decision moved compliance from the group slowing adoption to the group arguing for it, because the spreadsheet could not do it at all. We stopped competing on being a better place to store the data and started competing on something a spreadsheet is structurally incapable of. That is the only kind of argument that wins.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Trust Is a Separate Product Problem From Access</h2>

      <p><a href="/project/dae-search" class="text-primary underline underline-offset-2 hover:text-primary/80">DAE Search</a> was enterprise data discovery, and it taught me the version of this that applies to every internal tool. Finding the data is half the job. Trusting it is the rest.</p>

      <p>An analyst who finds a table but cannot tell where it came from, how fresh it is, or who owns it has not been helped. They will do what they have always done, which is pull it into a spreadsheet, verify it by hand, and keep that spreadsheet as the version they believe. Every internal tool that skips provenance manufactures the exact shadow copies it was built to eliminate.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Consolidation Is the Real Pitch</h2>

      <p>The <a href="/project/business-management" class="text-primary underline underline-offset-2 hover:text-primary/80">operations platform I designed for small businesses</a> did not win on any individual capability. Scheduling, invoicing, and tasks all existed elsewhere and mostly worked. What was killing people was that they lived in three places, so the same information got retyped and drifted apart.</p>

      <p>Fragmentation is the one thing a spreadsheet cannot fix, because the standard response to fragmentation is another spreadsheet. Being one place beats being better at any single thing.</p>

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
    tags: ["AI", "Craft", "Product Design"],
    slug: "taste-is-the-whole-job",
    content: `
      <p>Generating a screen is free now. Generating fifty is nearly free. That changed less about design than people expected, because producing options was never the expensive part.</p>

      <p>The expensive part is knowing which one is right, and being willing to throw away the other forty-nine.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Twenty-Two Seconds to Six</h2>
      <figure class="my-8">
        <img src="/blog/taste-is-the-whole-job-body.jpg" alt="Hand tools on a workshop wall — the craft is choosing which one to reach for" loading="lazy" class="w-full rounded-lg" width="1400" height="788" />
        <figcaption class="mt-2 text-sm text-gray-500">Photo by <a href="https://unsplash.com/@vatsaltyagi?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Vatsal Tyagi</a> on <a href="https://unsplash.com/?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Unsplash</a></figcaption>
      </figure>


      <p>Ring-Rival is a browser boxing game I designed and built. The first version had a splash screen, a mode select, a fighter select, and a tutorial. Twenty-two seconds from tapping the link to throwing your first punch.</p>

      <p>It's six seconds now. I got there by deleting, not adding. The menus went. The tutorial went. You land on the page, you're already in a fight, and you learn the controls by hitting someone with them.</p>

      <p>No model would have proposed that, and I don't blame it. Every screen I cut was a correct answer to a reasonable request. Mode select is standard. Onboarding is standard. What made them wrong was specific to this one product: it's a browser game somebody opens from a link with maybe fifteen seconds of curiosity attached. Every screen before the punch spends that budget on something that isn't the punch.</p>

      <p>Taste is knowing which good practice doesn't apply here.</p>

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
    tags: ["Product Design", "AI", "Craft"],
    slug: "scope-discipline-when-building-is-cheap",
    content: `
      <p>For most of my career, cost did the deciding. A feature was three weeks of somebody's time, so it had to be argued for, and the argument killed most of the bad ideas before anyone typed anything. Nobody had to be especially disciplined. The roadmap was rationed by scarcity.</p>

      <p>That rationing is gone. The feature is an afternoon now, sometimes an hour. Sure, why not has become a viable answer to almost any request, and it is quietly wrecking products.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">The Bill You Still Get</h2>
      <figure class="my-8">
        <img src="/blog/scope-discipline-when-building-is-cheap-body.jpg" alt="A handwritten list on a notebook — deciding what stays and what gets crossed off" loading="lazy" class="w-full rounded-lg" width="1400" height="788" />
        <figcaption class="mt-2 text-sm text-gray-500">Photo by <a href="https://unsplash.com/@glenncarstenspeters?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Glenn Carstens-Peters</a> on <a href="https://unsplash.com/?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Unsplash</a></figcaption>
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
    tags: ["Hiring", "Career", "AI"],
    slug: "how-to-interview-a-designer-now",
    content: `
      <p>The signals hiring managers relied on for a decade stopped carrying information. Polished case study, working prototype, tidy design system, a portfolio that looks like it came out of a studio. All of that is now available to anyone with a weekend and a subscription.</p>

      <p>I am not going to argue about whether that is good. It happened. The question is what you ask instead, and most interview loops have not caught up.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Stop Grading the Artifact</h2>
      <figure class="my-8">
        <img src="/blog/how-to-interview-a-designer-now-body.jpg" alt="Two people working through a problem at a whiteboard" loading="lazy" class="w-full rounded-lg" width="1400" height="788" />
        <figcaption class="mt-2 text-sm text-gray-500">Photo by <a href="https://unsplash.com/@kaleidico?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Kaleidico</a> on <a href="https://unsplash.com/?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Unsplash</a></figcaption>
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
    tags: ["Career", "AI", "Product Design"],
    slug: "designer-who-codes-argument-is-over",
    content: `
      <p>The debate ended without a winner. It ended because the distance between a design and a running product got short enough that arguing about who should cross it stopped making sense.</p>

      <p>I design and build my own products. Ring-Rival, Stips, HerbaLink, CatchBuddy are all live, all built solo. I'm not an engineer and I'm not pretending to be one. What I am is the person who doesn't hand anything off.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">What This Doesn't Mean</h2>
      <figure class="my-8">
        <img src="/blog/designer-who-codes-argument-is-over-body.jpg" alt="Hands on a keyboard — the gap between designing a thing and shipping it" loading="lazy" class="w-full rounded-lg" width="1400" height="788" />
        <figcaption class="mt-2 text-sm text-gray-500">Photo by <a href="https://unsplash.com/@glenncarstenspeters?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Glenn Carstens-Peters</a> on <a href="https://unsplash.com/?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Unsplash</a></figcaption>
      </figure>


      <p>It doesn't mean learning React so you can argue about hooks in code review. It doesn't mean you should be shipping production infrastructure at a company that has engineers to do it properly.</p>

      <p>It means you can take your own idea all the way to something a stranger can use, without a second person's calendar in the way. That's the whole claim.</p>

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
    tags: ["Career", "Hiring", "AI"],
    slug: "shipping-got-cheap-hiring-got-harder",
    content: `
      <p>A working prototype used to mean something. It meant somebody had the skill to build it and cared enough to finish it. Both of those inferences were reliable for a long time. Neither is reliable now.</p>

      <p>That's the actual disruption in design hiring. Not that AI took the jobs. That the signals hiring managers used to sort candidates stopped carrying information.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">The Demo Is No Longer the Proof</h2>
      <figure class="my-8">
        <img src="/blog/shipping-got-cheap-hiring-got-harder-body.jpg" alt="A stack of applications on a desk" loading="lazy" class="w-full rounded-lg" width="1400" height="788" />
        <figcaption class="mt-2 text-sm text-gray-500">Photo by <a href="https://unsplash.com/@resumegenius?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Resume Genius</a> on <a href="https://unsplash.com/?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Unsplash</a></figcaption>
      </figure>


      <p>I can build a polished, functional product in a weekend. So can a designer two years into their career. The artifact looks roughly the same either way, and it looks good, which is the problem — a good-looking artifact no longer separates anybody from anybody.</p>

      <p>What still separates people is what happened after the demo. Did anyone use it. What broke. What got cut and on what basis. Whether the person can explain a decision they made that turned out to be wrong.</p>

      <p>Those questions survive because you can only answer them by having lived through it.</p>

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
    tags: ["Portfolio", "Career", "AI"],
    slug: "everyones-portfolio-looks-good-now",
    content: `
      <p>Portfolios used to sort themselves. The typography was right or it wasn't. The case study read well or it read like a template. You could tell a lot in ten seconds and you were usually correct.</p>

      <p>That's gone. Everything is well-typeset now. Every case study has a clean narrative arc and a confident opening line. The floor came up, which sounds like good news and mostly isn't, because a signal everyone can produce isn't a signal.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Polish Is Table Stakes, Not Evidence</h2>
      <figure class="my-8">
        <img src="/blog/everyones-portfolio-looks-good-now-body.jpg" alt="Rows of near-identical output" loading="lazy" class="w-full rounded-lg" width="1400" height="788" />
        <figcaption class="mt-2 text-sm text-gray-500">Photo by <a href="https://unsplash.com/@boliviainteligente?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">BoliviaInteligente</a> on <a href="https://unsplash.com/?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Unsplash</a></figcaption>
      </figure>


      <p>Being well-presented no longer earns you anything. It just avoids losing you something. Budget for it accordingly: get it clean, then stop, because additional polish past that point buys nothing and eats the time you should be spending on substance.</p>

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
    tags: ["AI", "Product Design", "Process"],
    slug: "what-ai-changed-and-what-it-didnt",
    content: `
      <p>I've been designing products for fifteen years and building them solo with AI for a while now. The changes are real. They're also narrower and more specific than either the hype or the panic suggests.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Changed: Being Wrong Got Cheap</h2>
      <figure class="my-8">
        <img src="/blog/what-ai-changed-and-what-it-didnt-body.jpg" alt="A designer sketching by hand" loading="lazy" class="w-full rounded-lg" width="1400" height="788" />
        <figcaption class="mt-2 text-sm text-gray-500">Photo by <a href="https://unsplash.com/@medbadrc?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Med Badr  Chemmaoui</a> on <a href="https://unsplash.com/?utm_source=barskydesign&utm_medium=referral" target="_blank" rel="noopener noreferrer nofollow" class="underline">Unsplash</a></figcaption>
      </figure>


      <p>This is the big one and everything else follows from it. An idea used to cost weeks to test properly, which meant you argued about it instead, which meant the loudest person in the room won a lot of arguments that should have been settled by evidence.</p>

      <p>Now you build it and look. The cost of finding out you were wrong dropped enough that finding out is usually faster than debating. That changes how you should work, not just how fast you work.</p>

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

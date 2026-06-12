// AI design learning blog — covers and inline images
import claudeStarterCover from '@/assets/blog/ai-claude-starter-cover.jpg';
import claudeStarterInline from '@/assets/blog/ai-claude-starter-inline.jpg';
import promptEngCover from '@/assets/blog/prompt-engineering-cover.jpg';
import promptEngInline from '@/assets/blog/prompt-engineering-inline.jpg';
import aiNativeCover from '@/assets/blog/ai-native-interfaces-cover.jpg';
import aiNativeInline from '@/assets/blog/ai-native-interfaces-inline.jpg';
import modelCompareCover from '@/assets/blog/ai-model-comparison-cover.jpg';
import modelCompareInline from '@/assets/blog/ai-model-comparison-inline.jpg';
import weekendCover from '@/assets/blog/ai-prototype-weekend-cover.jpg';
import weekendInline from '@/assets/blog/ai-prototype-weekend-inline.jpg';
import trustCover from '@/assets/blog/ai-trust-cover.jpg';
import trustInline from '@/assets/blog/ai-trust-inline.jpg';
import figmaProdCover from '@/assets/blog/figma-to-production-cover.jpg';
import figmaProdInline from '@/assets/blog/figma-to-production-inline.jpg';

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

const wrap = (intro: string, inline: string, alt: string, body: string) => `
  <p>${intro}</p>
  <figure class="my-8">
    <img src="${inline}" alt="${alt}" loading="lazy" width="1280" height="720" class="w-full h-auto rounded-xl shadow-md" />
  </figure>
  ${body}
`;

export const blogPosts: BlogPost[] = [
  {
    id: "ai-1",
    title: "Learning AI Design with Claude: A Designer's Starter Kit",
    excerpt: "How to get from zero to shipping AI-assisted design work using Claude as your daily thinking partner.",
    author: "Hiram Barsky",
    date: "June 10, 2026",
    readTime: "7 min read",
    coverImage: claudeStarterCover,
    tags: ["AI Design", "Claude", "Learning", "Workflow"],
    slug: "learning-ai-design-with-claude",
    content: wrap(
      "Claude is not a magic button — it is a junior collaborator that never gets tired. The designers getting real leverage from it treat it like a teammate with a clear brief, not a search engine you yell at.",
      claudeStarterInline,
      "Designer chatting with Claude AI on a laptop",
      `
      <h2 class="text-2xl font-bold mt-8 mb-4">Start with one workflow, not the whole toolkit</h2>
      <p>Pick the most boring part of your week — competitive teardown, IA audits, writing empty states — and move only that into Claude. You learn the model's edges faster on a narrow loop than by experimenting everywhere at once.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Give it a role, a goal, and a constraint</h2>
      <p>The three-line opener that changed my output quality: <em>"You are a senior product designer reviewing my flow. Goal: find the two weakest screens. Constraint: explain in one paragraph each, no bullet lists."</em></p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Use projects, not one-off chats</h2>
      <p>Claude's Projects feature lets you upload your design system, brand voice, and past decisions once and reuse them. This is where it stops sounding like generic AI advice and starts sounding like your team.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Where to go next</h2>
      <p>Once one workflow feels boring-easy, add the next: research synthesis, copy variants, accessibility passes. Compound, don't sprint.</p>
      `
    )
  },
  {
    id: "ai-2",
    title: "Prompt Engineering for Designers: From Brief to Pixel",
    excerpt: "Prompts are the new design brief. Here is the structure that consistently turns a vague ask into usable output.",
    author: "Hiram Barsky",
    date: "June 5, 2026",
    readTime: "6 min read",
    coverImage: promptEngCover,
    tags: ["Prompt Engineering", "AI Design", "Workflow"],
    slug: "prompt-engineering-for-designers",
    content: wrap(
      "Most bad AI output is a bad brief in disguise. Designers already know how to write briefs — we just have to apply that muscle to prompts.",
      promptEngInline,
      "Notebook with prompt templates next to a tablet showing AI-generated UI",
      `
      <h2 class="text-2xl font-bold mt-8 mb-4">The four-part prompt</h2>
      <ol class="list-decimal pl-6 mb-4">
        <li><strong>Role</strong> — who the model is pretending to be</li>
        <li><strong>Context</strong> — the constraints, audience, brand</li>
        <li><strong>Task</strong> — the one specific thing you want back</li>
        <li><strong>Format</strong> — the shape of the answer (paragraph, table, JSON, Figma description)</li>
      </ol>

      <h2 class="text-2xl font-bold mt-8 mb-4">Treat the first reply as a draft</h2>
      <p>If you accept the first answer, you are using the model at 30% of its capability. Follow up with <em>"now make it shorter,"</em> <em>"now argue the opposite,"</em> <em>"now write it for a skeptical CFO."</em></p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Save the winners</h2>
      <p>The prompts that work become reusable templates — your personal design system for thinking. Keep them in a Notion page or a Claude Project, not in your scroll history.</p>
      `
    )
  },
  {
    id: "ai-3",
    title: "Designing AI-Native Interfaces: Patterns Beyond the Chatbox",
    excerpt: "The chat bubble is the iframe of the AI era — useful, lazy, and rarely the right answer.",
    author: "Hiram Barsky",
    date: "May 28, 2026",
    readTime: "8 min read",
    coverImage: aiNativeCover,
    tags: ["AI UX", "Interface Design", "Patterns"],
    slug: "designing-ai-native-interfaces",
    content: wrap(
      "Slapping a chat panel on every product is the 2026 equivalent of putting a hamburger menu on every page. AI-native design starts when the model disappears into the workflow instead of demanding its own room.",
      aiNativeInline,
      "Inline AI suggestions inside a document editor interface",
      `
      <h2 class="text-2xl font-bold mt-8 mb-4">Inline over modal</h2>
      <p>Suggestions that appear next to the cursor outperform suggestions hidden behind a button — every time we have tested it. Reduce the distance between intent and answer.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Generative surfaces</h2>
      <p>Instead of a fixed UI, let the model assemble the surface — cards, forms, tables — based on what the user just asked. This is harder to design but is where the real differentiation lives.</p>

      <h2 class="text-2xl function-bold mt-8 mb-4">Confidence as a first-class element</h2>
      <p>Every AI output should ship with a visible signal of how much to trust it. A subtle bar, a citation, a "regenerate" affordance — pick one and use it consistently.</p>
      `
    )
  },
  {
    id: "ai-4",
    title: "ChatGPT vs Claude vs Gemini for UX Workflows",
    excerpt: "I ran the same week of design work through all three. Here is where each one actually pulled its weight.",
    author: "Hiram Barsky",
    date: "May 20, 2026",
    readTime: "7 min read",
    coverImage: modelCompareCover,
    tags: ["AI Tools", "Comparison", "Workflow"],
    slug: "chatgpt-vs-claude-vs-gemini-for-ux",
    content: wrap(
      "There is no single best model — only the best model for the task at hand. After a week of running the same prompts through ChatGPT, Claude, and Gemini, my workflow now uses all three on purpose.",
      modelCompareInline,
      "Three laptops side by side running ChatGPT, Claude, and Gemini",
      `
      <h2 class="text-2xl font-bold mt-8 mb-4">Claude — the structured thinker</h2>
      <p>Best for long-form synthesis, IA, and writing in a tight brand voice. Refuses confidently when it doesn't know something, which I now treat as a feature.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">ChatGPT — the generalist</h2>
      <p>Fastest at code-adjacent design tasks, image generation, and "give me 20 variants" ideation. The default when I have no opinion on which to use.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Gemini — the multimodal one</h2>
      <p>Best when I am screenshotting a Figma file and asking what is wrong with it. Image reasoning is where it quietly pulls ahead.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Use them like a team</h2>
      <p>I draft in Claude, brainstorm in ChatGPT, and audit visuals in Gemini. The skill is knowing which tool the task wants.</p>
      `
    )
  },
  {
    id: "ai-5",
    title: "Building Your First AI-Powered Prototype in a Weekend",
    excerpt: "A two-day plan to go from idea to a working AI prototype your users can actually click through.",
    author: "Hiram Barsky",
    date: "May 12, 2026",
    readTime: "9 min read",
    coverImage: weekendCover,
    tags: ["Prototyping", "AI", "Hands-on"],
    slug: "ai-powered-prototype-weekend",
    content: wrap(
      "You do not need an engineering team to test an AI idea anymore. A weekend, an API key, and a willingness to break things is enough to ship a prototype real users can react to.",
      weekendInline,
      "AI-powered mobile app prototype shown on two phone screens",
      `
      <h2 class="text-2xl font-bold mt-8 mb-4">Saturday — define the bet</h2>
      <p>Write one sentence: <em>"I believe [user] will [behavior] if we [AI capability]."</em> That sentence is the only spec you need. Everything else is in service of testing it.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Saturday afternoon — pick the cheapest scaffold</h2>
      <p>Lovable, v0, or a Replit template will get you a working chat-style frontend in an hour. Do not build auth, do not style, do not optimize.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Sunday — design the failure modes</h2>
      <p>This is the part that separates a demo from a prototype: what happens when the model is wrong, slow, or refuses? Design those states deliberately. They are the actual experience.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Sunday night — put it in front of someone</h2>
      <p>A prototype no one touches is just a project. Even one user session will tell you more than another day of polish.</p>
      `
    )
  },
  {
    id: "ai-6",
    title: "Designing Trust into AI: Handling Hallucinations and Uncertainty",
    excerpt: "Users do not lose trust when AI is wrong. They lose trust when it is wrong and pretends to be sure.",
    author: "Hiram Barsky",
    date: "May 4, 2026",
    readTime: "8 min read",
    coverImage: trustCover,
    tags: ["AI Trust", "UX Patterns", "Hallucinations"],
    slug: "designing-trust-into-ai",
    content: wrap(
      "Every AI-powered product I have shipped lives or dies on one design decision: how it behaves when it is uncertain. Get this right and users forgive almost anything else.",
      trustInline,
      "AI response UI showing citations, confidence indicator, and regenerate button",
      `
      <h2 class="text-2xl font-bold mt-8 mb-4">Show your sources</h2>
      <p>Linked citations cut perceived hallucination rates dramatically — not because the answers are better, but because users can verify them in one click.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Make uncertainty visible</h2>
      <p>A small "draft" label, a softer color, or a "double-check this" tag costs you nothing and buys users a mental model that matches reality.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Always offer an exit</h2>
      <p>Regenerate, edit, escalate to a human — pick at least one. Trapped users churn.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">The tradeoff</h2>
      <p>Confidence UI makes the product feel less magical. That is fine. Magic that backfires is worse than honesty that holds up.</p>
      `
    )
  },
  {
    id: "ai-7",
    title: "From Figma to Production with AI: A Modern Designer's Stack",
    excerpt: "The handoff is dead. Here is the AI-assisted stack I use to ship designs straight into a live React app.",
    author: "Hiram Barsky",
    date: "April 25, 2026",
    readTime: "8 min read",
    coverImage: figmaProdCover,
    tags: ["Workflow", "Figma", "React", "AI Tools"],
    slug: "figma-to-production-with-ai",
    content: wrap(
      "The classic handoff — designer ships a Figma file, dev rebuilds it from scratch — is the most expensive ritual in software. AI tools finally let designers close that loop themselves.",
      figmaProdInline,
      "Figma design on one screen and rendered React app on the other",
      `
      <h2 class="text-2xl font-bold mt-8 mb-4">Design in Figma, structure for code</h2>
      <p>Name your layers like a developer would name components. Auto-layout everything. The cleaner your file, the better AI translates it.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Translate with Lovable or v0</h2>
      <p>Drop the screenshot in, describe the behavior, and you get a React component you can edit in plain English. Treat the first pass as scaffolding, not the final product.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Iterate with Claude or Cursor</h2>
      <p>Refinements — accessibility, responsive states, animations — happen in conversation now. "Make the empty state friendlier" is a real instruction.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">What you give up</h2>
      <p>You lose some of the engineering rigor a senior dev would catch. You gain the ability to ship a working version while the spec is still warm. For most products at most stages, that trade is worth it.</p>
      `
    )
  }
];

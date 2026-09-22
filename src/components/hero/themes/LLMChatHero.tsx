import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HERO_PROJECTS } from "./projects";

type Msg =
  | { role: "user" | "ai"; kind: "text"; text: string }
  | { role: "ai"; kind: "projects" }
  | { role: "ai"; kind: "typing" };

const INITIAL: Msg[] = [
  { role: "ai", kind: "text", text: "Hey — I'm Hiram. Ask me about my work, what I do, or how to hire me." },
];

const respondTo = (input: string): Msg[] => {
  const q = input.toLowerCase();
  if (/(work|project|portfolio)/.test(q)) {
    return [
      { role: "ai", kind: "text", text: "Here's what I've shipped and what's in concept:" },
      { role: "ai", kind: "projects" },
    ];
  }
  if (/(hire|contact|reach|email)/.test(q)) {
    return [
      {
        role: "ai",
        kind: "text",
        text: "Best way to reach me is via the calendar link below. I respond within 24 hours.",
      },
    ];
  }
  if (/(ai|gen ai|llm|gpt)/.test(q)) {
    return [
      {
        role: "ai",
        kind: "text",
        text:
          "I've been designing AI-first products since before it was a job title. Check out ManuscriptRx for my pharma AI work.",
      },
    ];
  }
  if (/(game|fire lion|ring rival|ring-rival)/.test(q)) {
    return [
      {
        role: "ai",
        kind: "text",
        text:
          "I built two shipped games solo with AI as a co-builder. Fire Lion is a word-casting arcade game. Ring-Rival is mobile boxing.",
      },
    ];
  }
  if (/(location|where|based|live)/.test(q)) {
    return [{ role: "ai", kind: "text", text: "Clifton, NJ. Available for remote work globally." }];
  }
  return [
    {
      role: "ai",
      kind: "text",
      text: `Good question. I'd say: "${input.trim()}" is something I'd love to dig into. Want to see my work instead?`,
    },
  ];
};

const LLMChatHero: React.FC = () => {
  const [messages, setMessages] = useState<Msg[]>(INITIAL);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", kind: "text", text }, { role: "ai", kind: "typing" }]);
    setTimeout(() => {
      setMessages((m) => {
        const withoutTyping = m.filter((x) => x.kind !== "typing");
        return [...withoutTyping, ...respondTo(text)];
      });
    }, 800);
  };

  return (
    <div className="llm-hero">
      <div className="llm-header">
        <div className="llm-avatar" aria-hidden>HB</div>
        <div>
          <div className="llm-name">Hiram Barsky</div>
          <div className="llm-sub">Lead Product &amp; AI Designer · Clifton, NJ</div>
        </div>
      </div>

      <div className="llm-scroll" ref={scrollRef}>
        {messages.map((m, i) => {
          if (m.kind === "typing") {
            return (
              <div key={i} className="llm-bubble llm-bubble--ai llm-typing" aria-label="Hiram is typing">
                <span /><span /><span />
              </div>
            );
          }
          if (m.kind === "projects") {
            return (
              <div key={i} className="llm-bubble llm-bubble--ai llm-projects">
                {HERO_PROJECTS.map((p) => (
                  <Link key={p.id} to={p.to} className="llm-project-link">
                    {p.label} <span>— {p.desc}</span>
                  </Link>
                ))}
              </div>
            );
          }
          return (
            <div
              key={i}
              className={`llm-bubble ${m.role === "user" ? "llm-bubble--user" : "llm-bubble--ai"}`}
            >
              {m.text}
            </div>
          );
        })}
      </div>

      <form
        className="llm-input-row"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <input
          className="llm-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about my work, AI, or how to hire me…"
          aria-label="Message Hiram"
        />
        <button type="submit" className="llm-send" disabled={!input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
};

export default LLMChatHero;

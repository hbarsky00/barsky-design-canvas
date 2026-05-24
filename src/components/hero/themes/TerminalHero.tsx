import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HERO_PROJECTS } from "./projects";

type Line = { kind: "out" | "cmd"; text: string };

const INTRO = [
  "Hey there! I am",
  "HIRAM BARSKY",
  "Lead Product & AI Designer · Clifton, NJ",
  "I design AI-first products that ship.",
];

const HELP = "available: ls ./projects · whoami · cat skills.txt · open <project-id> · clear · help";

const HISTORY_KEY = "barsky-terminal-history";

const TerminalHero: React.FC = () => {
  const navigate = useNavigate();
  const [intro, setIntro] = useState<string[]>([""]);
  const [introDone, setIntroDone] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Typing intro
  useEffect(() => {
    let lineIdx = 0;
    let charIdx = 0;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      if (lineIdx >= INTRO.length) {
        setIntroDone(true);
        return;
      }
      const target = INTRO[lineIdx];
      charIdx += 1;
      setIntro((prev) => {
        const next = [...prev];
        next[lineIdx] = target.slice(0, charIdx);
        return next;
      });
      if (charIdx >= target.length) {
        lineIdx += 1;
        charIdx = 0;
        setIntro((prev) => (lineIdx < INTRO.length ? [...prev, ""] : prev));
        setTimeout(tick, 250);
      } else {
        setTimeout(tick, 40);
      }
    };
    const t = setTimeout(tick, 200);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    if (introDone) inputRef.current?.focus();
  }, [introDone]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, intro, introDone]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    const append = (text: string) => setLines((l) => [...l, { kind: "cmd", text: raw }, { kind: "out", text }]);

    if (!cmd) {
      setLines((l) => [...l, { kind: "cmd", text: "" }]);
      return;
    }

    // Save to history
    const newHistory = [...history, cmd].slice(-50);
    setHistory(newHistory);
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    } catch {
      /* noop */
    }

    if (cmd === "clear") {
      setLines([]);
      return;
    }
    if (cmd === "help") return append(HELP);
    if (cmd === "ls ./projects" || cmd === "ls") {
      return append(HERO_PROJECTS.map((p) => `${p.id.padEnd(22)}  ${p.desc}`).join("\n"));
    }
    if (cmd === "whoami") return append("Lead Product & AI Designer. Clifton, NJ.");
    if (cmd === "cat skills.txt") return append("Gen AI · Fintech · Cyber · UX/UI");
    if (cmd.startsWith("open ")) {
      const id = cmd.slice(5).trim();
      const proj = HERO_PROJECTS.find((p) => p.id === id);
      if (proj) {
        append(`opening ${proj.label}...`);
        setTimeout(() => navigate(proj.to), 250);
        return;
      }
      return append(`unknown project: ${id}. try 'ls ./projects'`);
    }
    append(`command not found: ${cmd}. try 'ls ./projects'`);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
      setHistoryIdx(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const nextIdx = historyIdx < 0 ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setInput(history[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx < 0) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx >= history.length) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        setHistoryIdx(nextIdx);
        setInput(history[nextIdx]);
      }
    }
  };

  return (
    <div className="terminal-hero" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-screen" ref={scrollRef}>
        {intro.map((text, i) => (
          <div key={`intro-${i}`} className={`terminal-line terminal-intro-${i}`}>
            {text}
            {!introDone && i === intro.length - 1 && <span className="terminal-cursor" />}
          </div>
        ))}
        {introDone && (
          <>
            <div className="terminal-line terminal-help">type 'help' for commands</div>
            {lines.map((l, i) =>
              l.kind === "cmd" ? (
                <div key={i} className="terminal-line">
                  <span className="terminal-prompt">hiram@barskydesign:~$</span> {l.text}
                </div>
              ) : (
                <pre key={i} className="terminal-out">
                  {l.text}
                </pre>
              )
            )}
            <div className="terminal-line terminal-input-line">
              <span className="terminal-prompt">hiram@barskydesign:~$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                spellCheck={false}
                autoCapitalize="off"
                autoCorrect="off"
                className="terminal-input"
                aria-label="Terminal input"
              />
              <span className="terminal-cursor" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TerminalHero;

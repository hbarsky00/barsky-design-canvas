import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HERO_PROJECTS } from "./projects";

type Line = { kind: "out" | "cmd"; text: string };

const HELP = "available: ls · whoami · cat skills.txt · open <project-id> · clear · help";
const HISTORY_KEY = "barsky-terminal-history";

const projectListing = () =>
  HERO_PROJECTS.map((p) => `  ${p.id.padEnd(22)}  ${p.desc}`).join("\n");

const TerminalHero: React.FC = () => {
  const navigate = useNavigate();
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

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    const append = (text: string) =>
      setLines((l) => [...l, { kind: "cmd", text: raw }, { kind: "out", text }]);

    if (!cmd) {
      setLines((l) => [...l, { kind: "cmd", text: "" }]);
      return;
    }

    const newHistory = [...history, cmd].slice(-50);
    setHistory(newHistory);
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    } catch {
      /* noop */
    }

    if (cmd === "clear") return setLines([]);
    if (cmd === "help") return append(HELP);
    if (cmd === "ls" || cmd === "ls ./projects" || cmd === "projects")
      return append(projectListing());
    if (cmd === "whoami") return append("Hiram Barsky — Lead Product & AI Designer, Clifton, NJ");
    if (cmd === "cat skills.txt") return append("Gen AI · Fintech · Cyber · UX/UI · Product Design");
    if (cmd.startsWith("open ")) {
      const id = cmd.slice(5).trim();
      const proj = HERO_PROJECTS.find((p) => p.id === id);
      if (proj) {
        append(`opening ${proj.label}...`);
        setTimeout(() => navigate(proj.to), 250);
        return;
      }
      return append(`unknown project: ${id}. try 'ls'`);
    }
    append(`command not found: ${cmd}. try 'help' or 'ls'`);
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
        <div className="terminal-line terminal-intro-0">Hey there! I am</div>
        <div className="terminal-line terminal-intro-1">HIRAM BARSKY</div>
        <div className="terminal-line terminal-intro-2">Lead Product &amp; AI Designer · Clifton, NJ</div>
        <div className="terminal-line terminal-intro-3">I design AI-first products that ship.</div>

        <div className="terminal-line terminal-help" style={{ marginTop: 14 }}>
          shipped &amp; concept projects — type{" "}
          <span style={{ color: "#7CFFB2" }}>open &lt;project-id&gt;</span> to view
        </div>
        <pre className="terminal-out">{projectListing()}</pre>

        <div className="terminal-line terminal-help" style={{ marginTop: 8 }}>
          type 'help' for commands
        </div>

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
      </div>
    </div>
  );
};

export default TerminalHero;

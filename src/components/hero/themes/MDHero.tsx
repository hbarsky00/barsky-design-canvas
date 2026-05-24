import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HERO_PROJECTS } from "./projects";

const FULL = `# HIRAM BARSKY

**Lead Product & AI Designer** · Clifton, NJ

> I design AI-first products that ship.

## Shipped Products

${HERO_PROJECTS.slice(0, 4).map((p) => `- [${p.label}](${p.to}) — ${p.desc}`).join("\n")}

## Concept Work

${HERO_PROJECTS.slice(4).map((p) => `- [${p.label}](${p.to}) — ${p.desc}`).join("\n")}

---

[Book a call →](https://calendly.com/barskyuxdesignservices/30min)
`;

const MDHero: React.FC = () => {
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);
  const cancelRef = useRef(false);

  useEffect(() => {
    let i = 0;
    cancelRef.current = false;
    const step = () => {
      if (cancelRef.current) return;
      i += 1;
      setText(FULL.slice(0, i));
      if (i >= FULL.length) {
        setDone(true);
        return;
      }
      setTimeout(step, 20);
    };
    const t = setTimeout(step, 200);
    return () => {
      cancelRef.current = true;
      clearTimeout(t);
    };
  }, []);

  const skip = () => {
    cancelRef.current = true;
    setText(FULL);
    setDone(true);
  };

  // Render the streamed text with anchors live-clickable
  const lines = text.split("\n");

  return (
    <div className="md-hero" onClick={skip}>
      <pre className="md-stream">
        {lines.map((line, i) => {
          // Convert markdown links [label](url) into <Link>
          const linkMatch = line.match(/^- \[([^\]]+)\]\(([^)]+)\) — (.+)$/);
          if (linkMatch && done) {
            return (
              <div key={i}>
                - <Link to={linkMatch[2]}>{linkMatch[1]}</Link> — {linkMatch[3]}
              </div>
            );
          }
          const ctaMatch = line.match(/^\[Book a call →\]\(([^)]+)\)$/);
          if (ctaMatch && done) {
            return (
              <div key={i}>
                <a href={ctaMatch[1]} target="_blank" rel="noopener noreferrer">
                  [Book a call →]
                </a>
              </div>
            );
          }
          return <div key={i}>{line || "\u00A0"}</div>;
        })}
        {!done && <span className="md-cursor">|</span>}
      </pre>
    </div>
  );
};

export default MDHero;

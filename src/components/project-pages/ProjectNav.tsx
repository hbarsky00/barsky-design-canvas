import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface ProjectNavProps {
  brand: React.ReactNode;
  links: { label: string; href: string }[];
  cta: { label: string; href: string };
  bg: string;
  border?: string;
  textColor: string;
  backColor: string;
  ctaBg: string;
  ctaColor: string;
  blur?: boolean;
}

const ProjectNav: React.FC<ProjectNavProps> = ({
  brand, links, cta, bg, border, textColor, backColor, ctaBg, ctaColor, blur,
}) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "sticky", top: 0, zIndex: 100,
        background: bg,
        backdropFilter: blur ? "blur(10px)" : undefined,
        WebkitBackdropFilter: blur ? "blur(10px)" : undefined,
        borderBottom: border || "none",
        transition: "background 0.2s",
      }}
    >
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: "12px 24px",
        display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 16,
      }}>
        <div style={{ justifySelf: "start" }}>
          <Link to="/" style={{ color: backColor, fontSize: 12, textDecoration: "none", letterSpacing: 0.2 }}>
            ← barskydesign.pro
          </Link>
        </div>
        <div style={{ justifySelf: "center", color: textColor, fontWeight: 700, letterSpacing: 0.04 }}>
          {brand}
        </div>
        <div style={{ justifySelf: "end", display: "flex", alignItems: "center", gap: 18 }}>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => {
                if (l.href.startsWith("#")) {
                  e.preventDefault();
                  document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              style={{ color: textColor, fontSize: 13, textDecoration: "none", opacity: 0.85 }}
              className="hidden md:inline"
            >
              {l.label}
            </a>
          ))}
          <a
            href={cta.href}
            target={cta.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            style={{
              background: ctaBg, color: ctaColor, padding: "8px 16px",
              borderRadius: 6, fontWeight: 700, fontSize: 13, textDecoration: "none",
              display: "inline-block", whiteSpace: "nowrap",
            }}
          >
            {cta.label}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default ProjectNav;

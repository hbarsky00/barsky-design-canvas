import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackButton from "@/components/ui/BackButton";

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
      <div
        style={{
          maxWidth: 1280, margin: "0 auto", padding: "10px 12px",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
        }}
      >
        <Link
          to="/projects"
          aria-label="Back to projects"
          style={{
            color: textColor,
            fontSize: 13,
            fontWeight: 600,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            flexShrink: 0,
            padding: "8px 12px",
            minHeight: 40,
            borderRadius: 999,
            border: `1px solid ${textColor}33`,
            background: `${textColor}0D`,
          }}
        >
          <span aria-hidden="true" style={{ fontSize: 16, lineHeight: 1 }}>←</span>
          <span>Back</span>
        </Link>

        <div
          style={{
            color: textColor, fontWeight: 700, letterSpacing: 0.04,
            fontSize: 14, flex: "1 1 auto", textAlign: "center",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            minWidth: 0, padding: "0 8px",
          }}
        >
          {brand}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0, minWidth: 0 }}>
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
              style={{ color: textColor, fontSize: 13, textDecoration: "none", opacity: 0.85, whiteSpace: "nowrap" }}
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
              background: ctaBg, color: ctaColor, padding: "8px 12px",
              borderRadius: 6, fontWeight: 700, fontSize: 13, textDecoration: "none",
              display: "inline-block", whiteSpace: "nowrap",
              maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis",
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

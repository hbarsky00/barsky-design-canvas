import React, { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { Mail, Linkedin, Github, Calendar } from "lucide-react";

const SHIPPED = [
  { label: "Fire Lion", desc: "word-casting arcade game", to: "/project/fire-lion" },
  { label: "Ring-Rival", desc: "mobile web boxing", to: "/project/ring-rival" },
  { label: "CatchBuddy", desc: "same-day pickup sports", to: "/project/catchbuddy" },
  { label: "HerbaLink", desc: "verified herbalist platform", to: "/project/herbalink" },
];

const CONCEPTS = [
  { label: "QR Code Builder", desc: "generate branded QR codes with analytics", to: "/project/qr-code-builder" },
  { label: "ROI Design Builder", desc: "calculate design ROI for stakeholder buy-in", to: "/project/roi-design-builder" },
];

type Star = { x: number; y: number; size: number; depth: number };

const ParallaxHero: React.FC = () => {
  const skyRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const mountainsRef = useRef<HTMLDivElement>(null);

  const stars = useMemo<Star[]>(() => {
    const rng = (seed: number) => {
      let s = seed;
      return () => {
        s = (s * 9301 + 49297) % 233280;
        return s / 233280;
      };
    };
    const r = rng(42);
    return Array.from({ length: 80 }, () => ({
      x: r() * 100,
      y: r() * 85,
      size: r() > 0.85 ? 3 : 2,
      depth: r() * 0.6 + 0.4,
    }));
  }, []);

  useEffect(() => {
    let raf = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMx = 0;
    let targetMy = 0;

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const mx = mouseX;
        const my = mouseY;
        if (skyRef.current) skyRef.current.style.transform = `translate3d(${mx * 0.3}px, ${y * 0.05 + my * 0.3}px, 0)`;
        if (starsRef.current) starsRef.current.style.transform = `translate3d(${mx * 0.8}px, ${y * 0.15 + my * 0.8}px, 0)`;
        if (mountainsRef.current) mountainsRef.current.style.transform = `translate3d(${mx * 1.5}px, ${y * 0.25 + my * 1.5}px, 0)`;
        raf = 0;
      });
    };

    const tick = () => {
      mouseX += (targetMx - mouseX) * 0.08;
      mouseY += (targetMy - mouseY) * 0.08;
      onScroll();
      requestAnimationFrame(tick);
    };

    const onMouse = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetMx = nx * 10;
      targetMy = ny * 10;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });
    const id = requestAnimationFrame(tick);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(id);
    };
  }, []);

  return (
    <section
      aria-label="Hiram Barsky portfolio hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        background: "#0d0a1a",
        color: "#fff",
      }}
    >
      {/* Layer 1: Sky gradient */}
      <div
        ref={skyRef}
        aria-hidden
        style={{
          position: "absolute",
          inset: "-5% -5% -5% -5%",
          background: "linear-gradient(180deg, #1a1a2e 0%, #2d1b4e 55%, #8b3a3a 100%)",
          willChange: "transform",
          zIndex: 0,
        }}
      />

      {/* Layer 2: Stars */}
      <div
        ref={starsRef}
        aria-hidden
        style={{
          position: "absolute",
          inset: "-5%",
          willChange: "transform",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        {stars.map((s, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              borderRadius: "50%",
              background: `rgba(255,255,255,${0.4 + s.depth * 0.4})`,
              boxShadow: s.size === 3 ? "0 0 4px rgba(255,255,255,0.4)" : undefined,
            }}
          />
        ))}
      </div>

      {/* Layer 3: Mountains */}
      <div
        ref={mountainsRef}
        aria-hidden
        style={{
          position: "absolute",
          bottom: -20,
          left: "-5%",
          right: "-5%",
          height: "30%",
          willChange: "transform",
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        <svg viewBox="0 0 1200 240" preserveAspectRatio="none" style={{ position: "absolute", bottom: 8, left: 0, width: "100%", height: "85%", display: "block" }}>
          <path
            d="M0,240 L0,150 L80,110 L160,140 L240,90 L340,130 L440,80 L540,120 L640,70 L760,110 L880,90 L1000,130 L1100,100 L1200,140 L1200,240 Z"
            fill="#1a0f1f"
          />
        </svg>
        <svg viewBox="0 0 1200 240" preserveAspectRatio="none" style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "70%", display: "block" }}>
          <path
            d="M0,240 L0,180 L100,140 L200,170 L300,120 L420,160 L520,110 L640,150 L760,120 L880,160 L1000,130 L1120,170 L1200,140 L1200,240 Z"
            fill="#0d0d0d"
          />
        </svg>
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          maxWidth: 720,
          margin: "0 auto",
          padding: "120px 24px 80px",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", margin: 0, marginBottom: 8 }}>
          Hey there! I am
        </p>
        <h1
          style={{
            fontSize: "clamp(36px, 8vw, 56px)",
            fontWeight: 800,
            letterSpacing: "0.04em",
            margin: 0,
            color: "#fff",
            textShadow: "0 0 40px rgba(139,58,58,0.4)",
            lineHeight: 1.05,
          }}
        >
          HIRAM BARSKY
        </h1>
        <div style={{ width: 60, height: 2, background: "rgba(255,255,255,0.4)", margin: "10px auto" }} />
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", margin: 0 }}>
          Lead Product &amp; AI Designer · Clifton, NJ
        </p>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", marginTop: 10, marginBottom: 0, fontWeight: 500 }}>
          I design AI-first products that ship.
        </p>

        {/* Product list */}
        <div style={{ maxWidth: 480, margin: "32px auto 0", textAlign: "left" }}>
          <ProductSection label="Shipped Products" items={SHIPPED} />
          <ProductSection label="Concept Work" items={CONCEPTS} />
        </div>

        {/* Social icons */}
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 28 }}>
          {[
            { Icon: Mail, href: "mailto:hbarsky01@gmail.com", label: "Email" },
            { Icon: Linkedin, href: "https://www.linkedin.com/in/hiram-barsky", label: "LinkedIn" },
            { Icon: Github, href: "https://github.com/hbarsky", label: "GitHub" },
            { Icon: Calendar, href: "https://calendly.com/barskyuxdesignservices/30min", label: "Book" },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{ color: "rgba(255,255,255,0.45)", transition: "color 0.15s", display: "inline-flex" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
            >
              <Icon size={20} />
            </a>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <a
            href="https://calendly.com/barskyuxdesignservices/30min"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", textDecoration: "none" }}
            onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none"; e.currentTarget.style.color = "rgba(255,255,255,0.35)"; }}
          >
            Book a Call
          </a>
        </div>
      </div>
    </section>
  );
};

const ProductSection: React.FC<{ label: string; items: { label: string; desc: string; to: string }[] }> = ({ label, items }) => (
  <div>
    <div
      style={{
        fontSize: 11,
        letterSpacing: "0.18em",
        color: "rgba(255,255,255,0.35)",
        textTransform: "uppercase",
        textAlign: "center",
        marginTop: 32,
        marginBottom: 14,
      }}
    >
      {label}
    </div>
    {items.map((it) => (
      <Link
        key={it.label}
        to={it.to}
        title={`${it.label} — ${it.desc}`}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 12,
          textDecoration: "none",
          color: "inherit",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: 6,
            padding: "5px 14px",
            fontSize: 13,
            color: "#fff",
            background: "transparent",
            whiteSpace: "nowrap",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          {it.label}
        </span>
        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", flex: 1 }}>{it.desc}</span>
      </Link>
    ))}
  </div>
);

export default ParallaxHero;

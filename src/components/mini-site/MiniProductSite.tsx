import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

export interface MiniSiteFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface MiniSitePressRow {
  field: string;
  value: string;
}

export interface MiniSiteConfig {
  id: string;
  brandName: string;
  colors: {
    bg: string;
    text: string;
    accent: string;
    secondary?: string;
    navText?: string;
    navBgOnScroll?: string;
    cardBg?: string;
    border?: string;
    muted?: string;
  };
  nav: {
    ctaLabel: string;
    ctaHref?: string;
    ctaDisabled?: boolean;
  };
  hero: {
    eyebrow: string;
    headline: string;
    subhead: string;
    ctaLabel: string;
    ctaHref?: string;
    ctaDisabled?: boolean;
    statusBadge?: string;
    image?: { src: string; alt: string };
    placeholderText?: string;
  };
  features: MiniSiteFeature[];
  about: {
    body: string;
    honest: string;
  };
  press: MiniSitePressRow[];
  bottomCta: {
    label: string;
    href?: string;
    disabled?: boolean;
  };
  seo: {
    title: string;
    description: string;
  };
}

const MiniProductSite: React.FC<{ config: MiniSiteConfig }> = ({ config }) => {
  const { colors: c } = config;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navText = c.navText ?? "#ffffff";
  const muted = c.muted ?? "rgba(255,255,255,0.65)";
  const border = c.border ?? "rgba(255,255,255,0.12)";
  const cardBg = c.cardBg ?? "rgba(255,255,255,0.04)";
  const isLight = c.bg.toLowerCase() === "#ffffff" || c.bg.toLowerCase() === "#faf9f6";

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top, behavior: "smooth" });
    setMenuOpen(false);
  };

  const navBgScrolled = c.navBgOnScroll ?? (isLight ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.6)");

  const navLinks = [
    { label: "Home", id: "hero" },
    { label: "Features", id: "features" },
    { label: "About", id: "about" },
    { label: "Press Kit", id: "press" },
  ];

  return (
    <div style={{ background: c.bg, color: c.text, minHeight: "100vh", fontFamily: "Inter, system-ui, -apple-system, sans-serif" }}>
      <Helmet>
        <title>{config.seo.title}</title>
        <meta name="description" content={config.seo.description} />
        <meta property="og:title" content={config.seo.title} />
        <meta property="og:description" content={config.seo.description} />
        {config.hero.image?.src && <meta property="og:image" content={config.hero.image.src} />}
        <link rel="canonical" href={`https://barskydesign.pro/project/${config.id}`} />
      </Helmet>

      {/* Sticky Nav */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: scrolled ? navBgScrolled : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(10px)" : "none",
          borderBottom: scrolled ? `1px solid ${border}` : "1px solid transparent",
          transition: "background 0.2s, border 0.2s",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <a href="#hero" onClick={scrollTo("hero")} style={{ color: navText, fontWeight: 700, fontSize: 17, textDecoration: "none", letterSpacing: "-0.01em" }}>
            {config.brandName}
          </a>

          <div className="mini-nav-links" style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {navLinks.map((l) => (
              <a key={l.id} href={`#${l.id}`} onClick={scrollTo(l.id)} style={{ color: navText, opacity: 0.7, fontSize: 14, textDecoration: "none" }}>
                {l.label}
              </a>
            ))}
          </div>

          {config.nav.ctaDisabled ? (
            <span style={{ background: c.accent, color: isLight ? "#fff" : "#fff", padding: "8px 16px", borderRadius: 8, fontSize: 14, fontWeight: 600, opacity: 0.5, cursor: "not-allowed" }}>
              {config.nav.ctaLabel}
            </span>
          ) : (
            <a
              href={config.nav.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: c.accent, color: "#fff", padding: "8px 16px", borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}
            >
              {config.nav.ctaLabel}
            </a>
          )}

          <button
            className="mini-nav-burger"
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            style={{ display: "none", background: "transparent", border: `1px solid ${border}`, borderRadius: 6, padding: "6px 10px", color: navText, cursor: "pointer" }}
          >
            ☰
          </button>
        </div>

        {menuOpen && (
          <div className="mini-nav-mobile" style={{ background: navBgScrolled, borderTop: `1px solid ${border}`, padding: "12px 24px", display: "none", flexDirection: "column", gap: 12 }}>
            {navLinks.map((l) => (
              <a key={l.id} href={`#${l.id}`} onClick={scrollTo(l.id)} style={{ color: navText, fontSize: 15, textDecoration: "none" }}>
                {l.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .mini-nav-links { display: none !important; }
          .mini-nav-burger { display: inline-block !important; }
          .mini-nav-mobile { display: flex !important; }
        }
      `}</style>

      {/* Hero */}
      <section id="hero" style={{ padding: "80px 24px 60px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 48, alignItems: "center" }}>
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <div style={{ fontSize: 12, letterSpacing: "0.18em", color: c.accent, textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
              {config.hero.eyebrow}
            </div>
            <h1 style={{ fontSize: "clamp(36px, 6vw, 60px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0, color: c.text }}>
              {config.hero.headline}
            </h1>
            <p style={{ fontSize: 18, color: muted, marginTop: 20, lineHeight: 1.5 }}>{config.hero.subhead}</p>

            {config.hero.statusBadge && (
              <div style={{ marginTop: 20 }}>
                <span style={{ display: "inline-block", padding: "6px 14px", borderRadius: 999, background: cardBg, border: `1px solid ${border}`, color: muted, fontSize: 13 }}>
                  {config.hero.statusBadge}
                </span>
              </div>
            )}

            <div style={{ marginTop: 28 }}>
              {config.hero.ctaDisabled ? (
                <span style={{ display: "inline-block", background: c.accent, color: "#fff", padding: "14px 28px", borderRadius: 10, fontSize: 16, fontWeight: 600, opacity: 0.5, cursor: "not-allowed" }}>
                  {config.hero.ctaLabel}
                </span>
              ) : (
                <a
                  href={config.hero.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-block", background: c.accent, color: "#fff", padding: "14px 28px", borderRadius: 10, fontSize: 16, fontWeight: 600, textDecoration: "none" }}
                >
                  {config.hero.ctaLabel}
                </a>
              )}
            </div>
          </div>

          <div style={{ width: "100%", maxWidth: 960, margin: "0 auto" }}>
            {config.hero.image ? (
              <img
                src={config.hero.image.src}
                alt={config.hero.image.alt}
                loading="lazy"
                style={{ width: "100%", height: "auto", borderRadius: 16, border: `1px solid ${border}`, display: "block" }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  aspectRatio: "16 / 9",
                  borderRadius: 16,
                  background: `linear-gradient(135deg, ${c.accent}, ${c.secondary ?? c.accent})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "clamp(32px, 6vw, 64px)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  textAlign: "center",
                  padding: 24,
                }}
              >
                {config.hero.placeholderText ?? config.brandName}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: "80px 24px", borderTop: `1px solid ${border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-0.02em", margin: 0, marginBottom: 40, color: c.text }}>
            What it does
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {config.features.map((f) => (
              <div key={f.title} style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 14, padding: 24 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: c.accent, marginBottom: 16, opacity: 0.9 }} />
                <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0, marginBottom: 8, color: c.text }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: muted, lineHeight: 1.55, margin: 0 }}>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" style={{ padding: "80px 24px", borderTop: `1px solid ${border}` }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-0.02em", margin: 0, marginBottom: 24, color: c.text }}>
            Why it exists
          </h2>
          <p style={{ fontSize: 17, color: muted, lineHeight: 1.65 }}>{config.about.body}</p>

          <div style={{ marginTop: 32, padding: 24, borderRadius: 12, border: `1px solid ${border}`, background: cardBg }}>
            <div style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: c.accent, fontWeight: 600, marginBottom: 10 }}>
              What I haven't solved
            </div>
            <p style={{ margin: 0, color: muted, fontSize: 15, lineHeight: 1.6 }}>{config.about.honest}</p>
          </div>
        </div>
      </section>

      {/* Press Kit */}
      <section id="press" style={{ padding: "80px 24px", borderTop: `1px solid ${border}` }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-0.02em", margin: 0, marginBottom: 24, color: c.text }}>
            Press Kit
          </h2>
          <div style={{ border: `1px solid ${border}`, borderRadius: 12, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <tbody>
                {config.press.map((row, i) => (
                  <tr key={row.field} style={{ borderTop: i === 0 ? "none" : `1px solid ${border}` }}>
                    <td style={{ padding: "14px 18px", color: muted, width: "35%", verticalAlign: "top" }}>{row.field}</td>
                    <td style={{ padding: "14px 18px", color: c.text }}>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ background: c.accent, padding: "60px 24px", textAlign: "center", marginTop: 40 }}>
        {config.bottomCta.disabled ? (
          <span style={{ color: "#fff", fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 700, letterSpacing: "-0.01em" }}>
            {config.bottomCta.label}
          </span>
        ) : (
          <a
            href={config.bottomCta.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#fff", fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 700, letterSpacing: "-0.01em", textDecoration: "none" }}
          >
            {config.bottomCta.label}
          </a>
        )}
      </section>
    </div>
  );
};

export default MiniProductSite;

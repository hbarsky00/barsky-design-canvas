import React from "react";
import { Mail, Linkedin, Github, Calendar } from "lucide-react";
import WebGLFxWrap from "@/components/shared/WebGLFxWrap";

const SHIPPED = [
  { label: "CatchBuddy", desc: "Same-day pickup sports", to: "/project/catchbuddy" },
  { label: "HerbaLink", desc: "Verified herbalist platform", to: "/project/herbalink" },
  { label: "Valora Bet", desc: "Social prediction markets platform", to: "/project/valora-bet" },
];

const CONCEPTS = [
  { label: "Ring-Rival", desc: "Mobile web boxing", to: "/project/ring-rival" },
  { label: "Fire Lion", desc: "Word-casting arcade game", to: "/project/fire-lion" },
];

const ProductSection: React.FC<{ label: string; items: typeof SHIPPED; baseOffset: number }> = ({ label, items, baseOffset }) => (
  <div className="product-section">
    <h2 className="section-label">
      <WebGLFxWrap offsetMs={baseOffset} startEffect={2}>{label}</WebGLFxWrap>
    </h2>
    {items.map((it, i) => (
      <a
        key={it.label}
        href={it.to}
        title={`${it.label} — ${it.desc}`}
        className="product-row"
      >
        <WebGLFxWrap className="product-pill" offsetMs={baseOffset + 1200 + i * 600} startEffect={(i + 1) % 6}>
          {it.label}
        </WebGLFxWrap>
        <span className="product-description">{it.desc}</span>
      </a>
    ))}
  </div>
);

const HeroContent: React.FC = () => {
  return (
    <div className="hero-inner">
      <p className="hero-eyebrow">
        <WebGLFxWrap offsetMs={0} startEffect={4}>Hey there! I am</WebGLFxWrap>
      </p>
      <h1 className="hero-name">
        <WebGLFxWrap offsetMs={400} startEffect={0}>HIRAM BARSKY</WebGLFxWrap>
        <span className="sr-only"> — Lead Product & AI Designer</span>
      </h1>
      <div className="hero-divider" />
      <p className="hero-role">
        <WebGLFxWrap offsetMs={900} startEffect={1}>Lead Product &amp; AI Designer · Clifton, NJ</WebGLFxWrap>
      </p>
      <p className="hero-tagline">
        <WebGLFxWrap offsetMs={1400} startEffect={3}>I design AI-first products that ship.</WebGLFxWrap>
      </p>

      <div id="projects" className="product-list">
        <ProductSection label="SHIPPED PRODUCTS" items={SHIPPED} baseOffset={2000} />
        <ProductSection label="CONCEPT GAMES" items={CONCEPTS} baseOffset={5000} />
      </div>

      <div className="social-icons hero-bottom-contrast">
        {[
          { Icon: Mail, href: "mailto:hbarsky01@gmail.com", label: "Email" },
          { Icon: Linkedin, href: "https://www.linkedin.com/in/hiram-barsky", label: "LinkedIn" },
          { Icon: Github, href: "https://github.com/hbarsky", label: "GitHub" },
          { Icon: Calendar, href: "https://calendly.com/barskyuxdesignservices/30min", label: "Book" },
        ].map(({ Icon, href, label }, i) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="social-link">
            <WebGLFxWrap offsetMs={3000 + i * 700} startEffect={(i + 2) % 6}>
              <Icon size={20} />
            </WebGLFxWrap>
          </a>
        ))}
      </div>

      <div className="book-call-wrap hero-bottom-contrast">
        <a
          className="book-call"
          href="https://calendly.com/barskyuxdesignservices/30min"
          target="_blank"
          rel="noopener noreferrer"
        >
          <WebGLFxWrap offsetMs={1800} startEffect={5}>Book a Call</WebGLFxWrap>
        </a>
      </div>
    </div>
  );
};

export default HeroContent;

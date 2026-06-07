import React from "react";
import { Link } from "react-router-dom";
import { Linkedin, Github } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  // One theme-aware token drives every text color. --site-fg is set on <body>
  // by ParallaxHero (dark in day, light at night). Falls back to slate-50 if
  // the hero hasn't mounted yet (other themes).
  const fg = { color: "var(--site-fg, #f8fafc)" } as React.CSSProperties;
  const muted = { color: "color-mix(in srgb, var(--site-fg, #f8fafc) 75%, transparent)" } as React.CSSProperties;
  const border = { borderColor: "color-mix(in srgb, var(--site-fg, #f8fafc) 25%, transparent)" } as React.CSSProperties;

  const linkCls = "hover:text-blue-vibrant focus:text-blue-vibrant transition-colors duration-300 underline-offset-4 hover:underline focus:underline focus:outline-none rounded";

  return (
    <footer className="bg-transparent py-12" role="contentinfo" aria-label="Site footer" style={fg}>
      <div className="section-container">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <h3 className="heading-card mb-6" style={fg}>
              Hiram <span className="text-blue-vibrant">Barsky</span>
            </h3>
            <p className="mb-6 leading-relaxed" style={fg}>
              Product Designer & Gen AI Developer creating intelligent, user-centered digital experiences.
            </p>
            <p className="text-sm" style={muted}>
              &copy; {currentYear} Hiram Barsky. All rights reserved.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h4 className="text-lg heading-medium mb-6" style={fg}>Navigation</h4>
            <ul className="space-y-3" role="list">
              {[
                { to: "/", label: "Home" },
                { to: "/projects", label: "Projects" },
                { to: "/services", label: "Services" },
                { to: "/store", label: "Store" },
                { to: "/blog", label: "Blog" },
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className={linkCls} style={fg}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="text-lg heading-medium mb-6" style={fg}>Contact</h4>
            <ul className="space-y-3" role="list">
              <li className="flex items-center gap-2">
                <span className="text-blue-vibrant font-medium" aria-label="Email address">Email:</span>
                <a href="mailto:hbarsky01@gmail.com" className={linkCls} style={fg}>hbarsky01@gmail.com</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-vibrant font-medium" aria-label="Phone number">Phone:</span>
                <a href="tel:2016684754" className={linkCls} style={fg}>(201) 668-4754</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-vibrant font-medium" aria-label="Location">Location:</span>
                <span style={fg}>Clifton, NJ</span>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-lg heading-medium mb-4" style={fg}>Connect</h4>
              <div className="flex space-x-4" role="list">
                <a
                  href="https://www.linkedin.com/in/hiram-barsky"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="hover:text-blue-vibrant focus:text-blue-vibrant transition-colors duration-300 p-2 rounded focus:outline-none"
                  style={fg}
                  aria-label="Connect on LinkedIn (opens in new tab)"
                >
                  <Linkedin size={24} strokeWidth={2.5} />
                </a>
                <a
                  href="https://github.dev/hbarsky00"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="hover:text-blue-vibrant focus:text-blue-vibrant transition-colors duration-300 p-2 rounded focus:outline-none"
                  style={fg}
                  aria-label="View GitHub profile (opens in new tab)"
                >
                  <Github size={24} strokeWidth={2.5} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-sm" style={{ ...muted, ...border }}>
          <p>Engineered with precision and passion</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

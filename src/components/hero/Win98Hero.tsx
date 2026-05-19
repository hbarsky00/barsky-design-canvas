import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Folder, Mail, Github, Linkedin, Calendar, LayoutGrid } from "lucide-react";

/**
 * Windows 98 styled hero. Visual-only; preserves nav to /projects and Calendly.
 * Styles are scoped via the `.win98` wrapper to avoid leaking into the rest of the app.
 */
const Win98Hero: React.FC = () => {
  const [clock, setClock] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      let h = now.getHours();
      const m = String(now.getMinutes()).padStart(2, "0");
      const ampm = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      setClock(`${h}:${m} ${ampm}`);
    };
    tick();
    const id = setInterval(tick, 1000 * 30);
    return () => clearInterval(id);
  }, []);

  const imageUrl =
    "https://barskyux.com/wp-content/uploads/2025/06/IMG_20250531_123836_952.webp";

  return (
    <section
      aria-label="Hiram Barsky portfolio hero"
      className="win98 relative px-3 py-3 sm:px-4 sm:py-4 min-h-screen flex flex-col"
      style={{ background: "#008080", fontFamily: "'MS Sans Serif', 'Tahoma', Arial, sans-serif" }}
    >
      <style>{`
        .win98 .raise { border-top:2px solid #fff; border-left:2px solid #fff; border-right:2px solid #808080; border-bottom:2px solid #808080; background:#c0c0c0; }
        .win98 .sunk  { border-top:2px solid #808080; border-left:2px solid #808080; border-right:2px solid #fff; border-bottom:2px solid #fff; background:#fff; }
        .win98 .raise-thin { border-top:1px solid #fff; border-left:1px solid #fff; border-right:1px solid #808080; border-bottom:1px solid #808080; background:#c0c0c0; }
        .win98 .w98-btn { color:#000; padding:4px 14px; font-size:12px; cursor:pointer; min-width:96px; text-align:center; display:inline-block; text-decoration:none; }
        .win98 .w98-btn:active { border-top:2px solid #808080; border-left:2px solid #808080; border-right:2px solid #fff; border-bottom:2px solid #fff; }
        .win98 .menu-item:hover { background:#000080; color:#fff; }
        .win98 .desktop-icon span { color:#fff; text-shadow:1px 1px #000; }
        .win98 * { box-sizing: border-box; }
      `}</style>

      <div className="flex gap-3 sm:gap-4 flex-1 items-center">
        {/* Desktop icons column */}
        <div className="hidden sm:flex flex-col gap-3 pt-1 shrink-0">
          {[
            { Icon: Folder, label: "My Work", onClick: () => document.getElementById("case-studies")?.scrollIntoView({ behavior: "smooth" }) },
            { Icon: Mail, label: "Contact", to: "/contact" as const },
            { Icon: Github, label: "GitHub", href: "https://github.dev/hbarsky00" },
          ].map(({ Icon, label, to, href, onClick }) => {
            const inner = (
              <div className="flex flex-col items-center w-16 cursor-pointer">
                <div className="raise w-8 h-8 flex items-center justify-center mb-1">
                  <Icon className="w-4 h-4" style={{ color: "#000080" }} />
                </div>
                <span className="text-[11px] text-center leading-tight">{label}</span>
              </div>
            );
            if (onClick) return <button key={label} onClick={onClick} className="desktop-icon bg-transparent border-0 p-0">{inner}</button>;
            return to ? (
              <Link key={label} to={to} className="desktop-icon">{inner}</Link>
            ) : (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="desktop-icon">{inner}</a>
            );
          })}
        </div>


        {/* Window */}
        <div className="flex-1 flex justify-center">
          <div className="raise w-full max-w-2xl">
            {/* Title bar */}
            <div className="flex items-center justify-between px-1 py-[3px] text-white text-xs font-bold select-none" style={{ background: "#000080" }}>
              <div className="flex items-center gap-1">
                <div className="raise-thin w-[14px] h-[14px] flex items-center justify-center text-[9px] text-black">H</div>
                <span>Hiram Barsky — Portfolio</span>
              </div>
              <div className="flex gap-[2px]">
                {["_", "□", "✕"].map((s, i) => (
                  <div key={i} className="raise w-4 h-[14px] flex items-center justify-center text-[9px] font-bold text-black leading-none">{s}</div>
                ))}
              </div>
            </div>

            {/* Menu bar */}
            <div className="flex px-1 py-[2px]" style={{ background: "#c0c0c0", borderBottom: "1px solid #808080" }}>
              {["File", "View", "Work", "Help"].map((m) => (
                <div key={m} className="menu-item text-[12px] px-[6px] py-[2px] cursor-pointer text-black">
                  <span className="underline">{m[0]}</span>{m.slice(1)}
                </div>
              ))}
            </div>

            {/* Body */}
            <div className="p-4 flex flex-col sm:flex-row gap-4 items-start">
              <div className="shrink-0 w-20">
                <div className="sunk w-20 h-20 overflow-hidden">
                  <img src={imageUrl} alt="Hiram Barsky" className="w-full h-full object-cover" loading="eager" />
                </div>
                <div className="text-[11px] text-black text-center mt-1 break-words">hiram_barsky.bmp</div>
              </div>

              <div className="flex-1">
                <h1 className="text-[20px] font-bold m-0 mb-[2px]" style={{ color: "#000080" }}>Hiram Barsky</h1>
                <div className="text-[12px] text-black m-0 mb-2">Lead Product &amp; AI Designer · Clifton, NJ</div>

                <div className="sunk p-2 text-[12px] text-black mb-3 leading-[1.6]">
                  Passion for high craft, Gen AI,<br />
                  Cybersecurity &amp; Fintech design.
                </div>

                <div className="flex gap-[6px] flex-wrap mb-3">
                  {["Gen AI", "Fintech", "Cyber", "UX/UI"].map((s) => (
                    <div key={s} className="raise text-[11px] px-2 py-[2px] text-black">{s}</div>
                  ))}
                </div>

                <div className="flex gap-2 flex-wrap">
                  <a
                    href="#case-studies"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("case-studies")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="raise w98-btn"
                  >
                    See My Work
                  </a>
                  <a
                    href="https://calendly.com/barskyuxdesignservices/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="raise w98-btn"
                  >
                    Book a Call
                  </a>
                </div>
              </div>
            </div>

            {/* Status bar */}
            <div className="flex gap-[2px] px-1 py-[2px]" style={{ background: "#c0c0c0", borderTop: "1px solid #808080" }}>
              <div className="sunk text-[11px] text-black px-2 py-[1px] flex-1">barskydesign.pro</div>
              <div className="sunk text-[11px] text-black px-2 py-[1px] flex-1">Ready</div>
              <div className="sunk text-[11px] text-black px-2 py-[1px] flex-1 hidden sm:block">1 object selected</div>
            </div>
          </div>
        </div>
      </div>

      {/* Taskbar */}
      <div className="raise mt-2 flex items-center gap-1 px-1 py-[2px]">
        <div className="raise px-2 py-[3px] flex items-center gap-1 text-[12px] font-bold text-black cursor-default">
          <LayoutGrid className="w-[14px] h-[14px]" />
          Start
        </div>
        <div className="sunk text-[11px] text-black px-2 py-[2px]">Hiram Barsky — Portfolio</div>
        <div className="ml-auto flex items-center gap-2">
          <a href="mailto:hbarsky01@gmail.com" aria-label="Email" className="sunk px-2 py-[2px] text-black"><Mail className="w-3 h-3" /></a>
          <a href="https://www.linkedin.com/in/hiram-barsky/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="sunk px-2 py-[2px] text-black"><Linkedin className="w-3 h-3" /></a>
          <a href="https://calendly.com/barskyuxdesignservices/30min" target="_blank" rel="noopener noreferrer" aria-label="Book a call" className="sunk px-2 py-[2px] text-black"><Calendar className="w-3 h-3" /></a>
          <div className="sunk text-[11px] text-black px-2 py-[2px]">{clock}</div>
        </div>
      </div>
    </section>
  );
};

export default Win98Hero;

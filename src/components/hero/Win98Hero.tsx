import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Folder, Mail, Github, Linkedin, Calendar, LayoutGrid, Gamepad2, ChevronRight } from "lucide-react";
import win98Bg from "@/assets/win98-ai-bg.jpg";
import Win98Window from "@/components/win98/Win98Window";
import Minesweeper from "@/components/win98/games/Minesweeper";

/**
 * Windows 98 styled hero. Visual-only; preserves nav to /projects and Calendly.
 * Styles are scoped via the `.win98` wrapper to avoid leaking into the rest of the app.
 */
type GameId = "minesweeper" | "solitaire" | "pacman";

const Win98Hero: React.FC = () => {
  const [clock, setClock] = useState("");
  const [startOpen, setStartOpen] = useState(false);
  const [gamesOpen, setGamesOpen] = useState(false);
  const [openGames, setOpenGames] = useState<GameId[]>([]);

  const launchGame = (id: GameId) => {
    setStartOpen(false);
    setGamesOpen(false);
    setOpenGames((g) => (g.includes(id) ? g : [...g, id]));
  };
  const closeGame = (id: GameId) => setOpenGames((g) => g.filter((x) => x !== id));

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
    "/images/hiram-barsky-profile.png";

  const scrollToCaseStudies = () => {
    const target =
      document.getElementById("case-study-1") ||
      document.getElementById("case-studies");
    if (!target) return;
    const headerHeight = 72;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top, behavior: "smooth" });
  };



  return (
    <section
      aria-label="Hiram Barsky portfolio hero"
      className="win98 relative px-3 py-3 sm:px-4 sm:py-4 min-h-screen flex flex-col"
      style={{
        backgroundColor: "#008080",
        backgroundImage: `url(${win98Bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "multiply",
        fontFamily: "'MS Sans Serif', 'Tahoma', Arial, sans-serif",
      }}
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
        .win98 a:hover .cs-thumb-label { background:#000080; color:#fff; }
      `}</style>

      <div className="flex gap-3 sm:gap-4 flex-1 items-center">
        {/* Desktop icons column */}
        <div className="hidden sm:flex flex-col gap-3 pt-1 shrink-0">
          {[
            { Icon: Folder, label: "My Work", onClick: scrollToCaseStudies },
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
                  <img src={imageUrl} alt="Hiram Barsky" width={80} height={80} className="w-full h-full object-cover" loading="eager" fetchPriority="high" decoding="async" />
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
                      scrollToCaseStudies();
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

                {/* Divider */}
                <div className="mt-4 mb-3">
                  <div style={{ height: 0, borderTop: "1px solid #808080" }} />
                  <div style={{ height: 0, borderTop: "1px solid #fff" }} />
                </div>

                {/* Case study thumbnails grid */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "case-study-1", label: "Fire Lion", img: "/images/firelion-hero-title.png" },
                    { id: "case-study-2", label: "Ring-Rival", img: "/images/ringrival-hero-title.png" },
                    { id: "case-study-3", label: "CatchBuddy", img: "/images/catchbuddy-hero-landing.png" },
                    { id: "case-study-4", label: "HerbaLink", img: "https://barskyux.com/wp-content/uploads/2025/08/Bookanherbalistpromomobile.png" },
                    { id: "case-study-5", label: "Email Creation AI", img: "/images/email-ai-promo.png" },
                    { id: "case-study-6", label: "DAE Search", img: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/dae-search/DAE-Project-1.jpg" },
                  ].map((c) => (
                    <a
                      key={c.id}
                      href={`#${c.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(c.id);
                        if (!el) return;
                        const top = el.getBoundingClientRect().top + window.scrollY - 72;
                        window.scrollTo({ top, behavior: "smooth" });
                      }}
                      className="group flex flex-col gap-1 no-underline"
                    >
                      <div className="sunk w-full aspect-[4/3] overflow-hidden">
                        <img
                          src={c.img}
                          alt={c.label}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="cs-thumb-label sunk text-[11px] text-black px-2 py-[2px] text-center truncate">
                        {c.label}
                      </div>

                    </a>
                  ))}
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
      <div className="raise mt-2 flex items-center gap-1 px-1 py-[2px] sticky bottom-0 z-20">

        <button
          onClick={() => setStartOpen((v) => !v)}
          className={`${startOpen ? "sunk" : "raise"} px-2 py-[3px] flex items-center gap-1 text-[12px] font-bold text-black cursor-pointer`}
        >
          <LayoutGrid className="w-[14px] h-[14px]" />
          Start
        </button>
        <div className="sunk text-[11px] text-black px-2 py-[2px]">Hiram Barsky — Portfolio</div>
        <div className="ml-auto flex items-center gap-2">
          <a href="mailto:hbarsky01@gmail.com" aria-label="Email" className="sunk px-2 py-[2px] text-black"><Mail className="w-3 h-3" /></a>
          <a href="https://www.linkedin.com/in/hiram-barsky/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="sunk px-2 py-[2px] text-black"><Linkedin className="w-3 h-3" /></a>
          <a href="https://calendly.com/barskyuxdesignservices/30min" target="_blank" rel="noopener noreferrer" aria-label="Book a call" className="sunk px-2 py-[2px] text-black"><Calendar className="w-3 h-3" /></a>
          <div className="sunk text-[11px] text-black px-2 py-[2px]">{clock}</div>
        </div>

        {startOpen && (
          <div className="raise absolute bottom-full left-0 mb-1 w-60 flex z-30" onMouseLeave={() => { setStartOpen(false); setGamesOpen(false); }}>
            <div className="w-7 flex items-end justify-center py-2 text-white font-bold text-[11px] tracking-widest" style={{ background: "#000080", writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
              Barsky<span className="font-normal">98</span>
            </div>
            <ul className="flex-1 py-1 text-[12px] text-black relative">
              {[
                { label: "Case Studies", Icon: Folder, onClick: () => { setStartOpen(false); scrollToCaseStudies(); } },
                { label: "All Projects", Icon: LayoutGrid, onClick: () => { setStartOpen(false); scrollToCaseStudies(); } },
                { label: "Contact", Icon: Mail, onClick: () => { setStartOpen(false); window.location.assign("/contact"); } },
                { label: "LinkedIn", Icon: Linkedin, onClick: () => { setStartOpen(false); window.open("https://www.linkedin.com/in/hiram-barsky/", "_blank"); } },
                { label: "GitHub", Icon: Github, onClick: () => { setStartOpen(false); window.open("https://github.dev/hbarsky00", "_blank"); } },
                { label: "Book a Call", Icon: Calendar, onClick: () => { setStartOpen(false); window.open("https://calendly.com/barskyuxdesignservices/30min", "_blank"); } },
              ].map(({ label, Icon, onClick }) => (
                <li key={label}>
                  <button onClick={onClick} onMouseEnter={() => setGamesOpen(false)} className="w-full flex items-center gap-2 px-2 py-[5px] hover:bg-[#000080] hover:text-white text-left">
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </button>
                </li>
              ))}
              {/* Games submenu */}
              <li>
                <button
                  onMouseEnter={() => setGamesOpen(true)}
                  onClick={() => setGamesOpen((v) => !v)}
                  className={`w-full flex items-center gap-2 px-2 py-[5px] text-left ${gamesOpen ? "bg-[#000080] text-white" : "hover:bg-[#000080] hover:text-white"}`}
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span className="flex-1">Games</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
                {gamesOpen && (
                  <div className="raise absolute left-full top-0 ml-[1px] w-44 py-1 z-40">
                    {[
                      { id: "minesweeper" as GameId, label: "Minesweeper" },
                      { id: "solitaire" as GameId, label: "Solitaire", disabled: true },
                      { id: "pacman" as GameId, label: "Pac-Man", disabled: true },
                    ].map((g) => (
                      <button
                        key={g.id}
                        disabled={g.disabled}
                        onClick={() => !g.disabled && launchGame(g.id)}
                        className={`w-full flex items-center gap-2 px-2 py-[5px] text-left ${g.disabled ? "text-[#808080] cursor-not-allowed" : "hover:bg-[#000080] hover:text-white"}`}
                      >
                        <Gamepad2 className="w-4 h-4" />
                        <span>{g.label}</span>
                        {g.disabled && <span className="ml-auto text-[10px]">soon</span>}
                      </button>
                    ))}
                  </div>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Game windows */}
      {openGames.includes("minesweeper") && (
        <Win98Window
          title="Minesweeper"
          icon="M"
          width={340}
          initialX={120}
          initialY={100}
          onClose={() => closeGame("minesweeper")}
        >
          <Minesweeper />
        </Win98Window>
      )}

    </section>
  );
};

export default Win98Hero;

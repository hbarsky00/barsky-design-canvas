
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { navHrefToUrl } from "./useHeaderNavigation";
import { Menu, X, Briefcase, User, Mail, BookOpen, ShoppingBag, Palette } from "lucide-react";

interface MobileMenuProps {
  links: Array<{ name: string; href: string }>;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  handleLinkClick: (href: string) => void;
  isLinkActive: (link: string) => boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  links,
  isMobileMenuOpen,
  toggleMobileMenu,
  handleLinkClick,
  isLinkActive,
}) => {
  // Show all links in one list across all breakpoints
  const menuLinks = links;

  const toggleRef = React.useRef<HTMLButtonElement | null>(null);
  const panelRef = React.useRef<HTMLDivElement | null>(null);

  /* Escape had no handler at all: measured 2026-11-26 at 375px, opening the
     menu and pressing Escape left aria-expanded="true" and the panel on screen.
     An overlay that covers the page needs a keyboard way out (WCAG 2.1.2). */
  React.useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.preventDefault();
      toggleMobileMenu();
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen, toggleMobileMenu]);

  /* Focus walked straight out of the open panel into the page it covers.
     Measured at 375px: twelve Tabs from the open menu reached "See My Work",
     "Book a Call" and a case-study link — all behind the panel, none of them
     visible. Keep the loop inside the toggle plus the panel; the toggle is the
     close button while the menu is open, so it belongs in the cycle. */
  React.useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      const toggle = toggleRef.current;
      if (!panel || !toggle) return;
      const stops = [
        toggle,
        ...Array.from(
          panel.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ),
      ];
      const first = stops[0];
      const last = stops[stops.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (active === first || !stops.includes(active as HTMLElement))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onTab);
    return () => document.removeEventListener("keydown", onTab);
  }, [isMobileMenuOpen]);

  /* The page kept scrolling under the open panel — measured body overflow-y
     "auto" while open at 375px — so a flick aimed at the menu moved the page
     behind it instead, and the panel is anchored to the header, which scrolls
     away. Lock the document while it is open and put the scrollbar's width
     back as padding so desktop does not shift when it is briefly open there. */
  React.useEffect(() => {
    if (!isMobileMenuOpen) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    const previousPadding = root.style.paddingRight;
    const scrollbar = window.innerWidth - root.clientWidth;
    root.style.overflow = "hidden";
    if (scrollbar > 0) root.style.paddingRight = `${scrollbar}px`;
    return () => {
      root.style.overflow = previousOverflow;
      root.style.paddingRight = previousPadding;
    };
  }, [isMobileMenuOpen]);
  // Function to get the appropriate icon for each link
  const getIcon = (linkName: string) => {
    switch (linkName.toLowerCase()) {
      case "case studies":
        return <Briefcase className="h-5 w-5 mr-3" />;
      case "services":
        return <Palette className="h-5 w-5 mr-3" />;
      case "store":
        return <ShoppingBag className="h-5 w-5 mr-3" />;
      case "blog":
        return <BookOpen className="h-5 w-5 mr-3" />;
      case "about":
        return <User className="h-5 w-5 mr-3" />;
      case "contact me":
        return <Mail className="h-5 w-5 mr-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      <button 
        ref={toggleRef}
        /* 24px icon + p-1 measured 32x32 on a phone — the primary mobile nav
           control, 12px under the 44x44 minimum. The icon stays 24px; the hit
           area grows around it. */
        className="text-barsky-dark inline-flex h-11 w-11 items-center justify-center transition-colors duration-200 hover:text-[hsl(var(--blue-accent))] focus-visible:text-[hsl(var(--blue-accent))] focus-visible:outline-2 focus-visible:outline-[hsl(var(--blue-accent))] focus-visible:outline-offset-2 focus:outline-none" 
        onClick={toggleMobileMenu}
        aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-navigation"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

        {isMobileMenuOpen && (
          <div
            ref={panelRef}
            id="mobile-navigation"
            role="menu"
            aria-label="Mobile navigation menu"
            className="fixed inset-x-0 top-[var(--header-height,64px)] w-screen max-w-none rounded-none border-t border-gray-200/60 bg-white shadow-lg z-40 p-2"
          >
            <nav className="flex flex-col space-y-1">
              {menuLinks.map((link) => {
                if (link.href.startsWith('http')) {
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={toggleMobileMenu}
                      className="nav-link w-full text-base flex items-center justify-start px-3 py-2 rounded-md hover:bg-blue-50 transition-colors"
                    >
                      {getIcon(link.name)}
                      {link.name}
                    </a>
                  );
                }
                return (
                  <Link
                    key={link.name}
                    to={navHrefToUrl(link.href)}
                    onClick={link.href.startsWith('#') ? (e) => {
                      // Allow native anchor for contact; prevent only for other anchors
                      if (link.href !== '#contact') {
                        e.preventDefault();
                        handleLinkClick(link.href);
                      }
                      toggleMobileMenu();
                    } : () => {
                      toggleMobileMenu();
                    }}
                    aria-label={link.name.toLowerCase().includes('contact') ? 'Contact' : link.name}
                    className={cn(
                      "nav-link w-full text-base flex items-center justify-start px-3 py-2 rounded-md transition-colors",
                      isLinkActive(link.href)
                        ? "bg-blue-100 text-blue-700"
                        : "hover:bg-blue-50"
                    )}
                  >
                    {getIcon(link.name)}
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
    </div>
  );
};

export default MobileMenu;

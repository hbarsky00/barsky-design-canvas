import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        // Mobile-specific breakpoints
        'mobile': {'max': '767px'},
        'tablet': {'min': '768px', 'max': '1023px'},
        'desktop': {'min': '1024px'},
      },
      colors: {
        // Legacy color mappings for compatibility
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        
        // Material Design 3.0 Color System
        "md-sys": {
          "primary": "hsl(var(--md-sys-color-primary))",
          "on-primary": "hsl(var(--md-sys-color-on-primary))",
          "primary-container": "hsl(var(--md-sys-color-primary-container))",
          "on-primary-container": "hsl(var(--md-sys-color-on-primary-container))",
          "secondary": "hsl(var(--md-sys-color-secondary))",
          "on-secondary": "hsl(var(--md-sys-color-on-secondary))",
          "secondary-container": "hsl(var(--md-sys-color-secondary-container))",
          "on-secondary-container": "hsl(var(--md-sys-color-on-secondary-container))",
          "tertiary": "hsl(var(--md-sys-color-tertiary))",
          "on-tertiary": "hsl(var(--md-sys-color-on-tertiary))",
          "tertiary-container": "hsl(var(--md-sys-color-tertiary-container))",
          "on-tertiary-container": "hsl(var(--md-sys-color-on-tertiary-container))",
          "error": "hsl(var(--md-sys-color-error))",
          "on-error": "hsl(var(--md-sys-color-on-error))",
          "error-container": "hsl(var(--md-sys-color-error-container))",
          "on-error-container": "hsl(var(--md-sys-color-on-error-container))",
          "surface-dim": "hsl(var(--md-sys-color-surface-dim))",
          "surface": "hsl(var(--md-sys-color-surface))",
          "surface-bright": "hsl(var(--md-sys-color-surface-bright))",
          "surface-container-lowest": "hsl(var(--md-sys-color-surface-container-lowest))",
          "surface-container-low": "hsl(var(--md-sys-color-surface-container-low))",
          "surface-container": "hsl(var(--md-sys-color-surface-container))",
          "surface-container-high": "hsl(var(--md-sys-color-surface-container-high))",
          "surface-container-highest": "hsl(var(--md-sys-color-surface-container-highest))",
          "on-surface": "hsl(var(--md-sys-color-on-surface))",
          "on-surface-variant": "hsl(var(--md-sys-color-on-surface-variant))",
          "outline": "hsl(var(--md-sys-color-outline))",
          "outline-variant": "hsl(var(--md-sys-color-outline-variant))",
          "inverse-surface": "hsl(var(--md-sys-color-inverse-surface))",
          "inverse-on-surface": "hsl(var(--md-sys-color-inverse-on-surface))",
          "inverse-primary": "hsl(var(--md-sys-color-inverse-primary))",
          "scrim": "hsl(var(--md-sys-color-scrim))",
          "shadow": "hsl(var(--md-sys-color-shadow))",
        },
        
        // Barsky brand colors
        barsky: {
          blue: "hsl(var(--barsky-blue))",
          dark: "hsl(var(--barsky-dark))",
          text: "hsl(var(--barsky-text))",
          "text-light": "hsl(var(--barsky-text-light))",
          "bg-light": "hsl(var(--barsky-bg-light))",
          accent: "hsl(var(--barsky-accent))",
          "accent-light": "hsl(var(--barsky-accent-light))",
        },
        // Tech Stack colors for Gen-AI First badges
        tech: {
          ai: "hsl(var(--tech-ai))",
          "ai-glow": "hsl(var(--tech-ai-glow))",
          dev: "hsl(var(--tech-dev))",
          "dev-glow": "hsl(var(--tech-dev-glow))",
          design: "hsl(var(--tech-design))",
          "design-glow": "hsl(var(--tech-design-glow))",
          "badge-bg": "hsl(var(--tech-badge-bg))",
        },
      },
      borderRadius: {
        // Material Design 3.0 Shape System
        "none": "var(--md-sys-shape-corner-none)",
        "xs": "var(--md-sys-shape-corner-extra-small)",
        "sm": "var(--md-sys-shape-corner-small)",
        "md": "var(--md-sys-shape-corner-medium)",
        "lg": "var(--md-sys-shape-corner-large)",
        "xl": "var(--md-sys-shape-corner-extra-large)",
        "full": "var(--md-sys-shape-corner-full)",
        // Legacy support
        DEFAULT: "var(--radius)",
      },
      boxShadow: {
        // Material Design 3.0 Elevation System
        "elevation-0": "var(--md-sys-elevation-level0)",
        "elevation-1": "var(--md-sys-elevation-level1)",
        "elevation-2": "var(--md-sys-elevation-level2)",
        "elevation-3": "var(--md-sys-elevation-level3)",
        "elevation-4": "var(--md-sys-elevation-level4)",
        "elevation-5": "var(--md-sys-elevation-level5)",
      },
      fontSize: {
        // Material Design 3.0 Typography Scale
        "display-large": ["var(--md-sys-typescale-display-large)", { lineHeight: "var(--md-sys-typescale-display-large-line-height)" }],
        "display-medium": ["var(--md-sys-typescale-display-medium)", { lineHeight: "var(--md-sys-typescale-display-medium-line-height)" }],
        "display-small": ["var(--md-sys-typescale-display-small)", { lineHeight: "var(--md-sys-typescale-display-small-line-height)" }],
        "headline-large": ["var(--md-sys-typescale-headline-large)", { lineHeight: "var(--md-sys-typescale-headline-large-line-height)" }],
        "headline-medium": ["var(--md-sys-typescale-headline-medium)", { lineHeight: "var(--md-sys-typescale-headline-medium-line-height)" }],
        "headline-small": ["var(--md-sys-typescale-headline-small)", { lineHeight: "var(--md-sys-typescale-headline-small-line-height)" }],
        "title-large": ["var(--md-sys-typescale-title-large)", { lineHeight: "var(--md-sys-typescale-title-large-line-height)" }],
        "title-medium": ["var(--md-sys-typescale-title-medium)", { lineHeight: "var(--md-sys-typescale-title-medium-line-height)" }],
        "title-small": ["var(--md-sys-typescale-title-small)", { lineHeight: "var(--md-sys-typescale-title-small-line-height)" }],
        "body-large": ["var(--md-sys-typescale-body-large)", { lineHeight: "var(--md-sys-typescale-body-large-line-height)" }],
        "body-medium": ["var(--md-sys-typescale-body-medium)", { lineHeight: "var(--md-sys-typescale-body-medium-line-height)" }],
        "body-small": ["var(--md-sys-typescale-body-small)", { lineHeight: "var(--md-sys-typescale-body-small-line-height)" }],
        "label-large": ["var(--md-sys-typescale-label-large)", { lineHeight: "var(--md-sys-typescale-label-large-line-height)" }],
        "label-medium": ["var(--md-sys-typescale-label-medium)", { lineHeight: "var(--md-sys-typescale-label-medium-line-height)" }],
        "label-small": ["var(--md-sys-typescale-label-small)", { lineHeight: "var(--md-sys-typescale-label-small-line-height)" }],
      },
      spacing: {
        'safe-top': 'var(--safe-area-inset-top)',
        'safe-right': 'var(--safe-area-inset-right)',
        'safe-bottom': 'var(--safe-area-inset-bottom)',
        'safe-left': 'var(--safe-area-inset-left)',
      },
      minWidth: {
        'touch': '44px',
      },
      minHeight: {
        'touch': '44px',
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        mono: ["ui-monospace", "SFMono-Regular"],
        display: ["Space Grotesk", "ui-sans-serif", "system-ui"],
        body: ["Inter", "ui-sans-serif", "system-ui"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "gentle-float": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-5px) rotate(1deg)" },
          "66%": { transform: "translateY(-3px) rotate(-1deg)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-2px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(2px)" },
        },
        // Award-winning ultra-modern animations
        "magnetic-hover": {
          "0%": { transform: "scale(1) rotate(0deg)" },
          "50%": { transform: "scale(1.02) rotate(1deg)" },
          "100%": { transform: "scale(1.05) rotate(0deg)" },
        },
        "glow-pulse": {
          "0%, 100%": { 
            "box-shadow": "0 0 0 0 rgba(59, 130, 246, 0.3)",
            opacity: "1"
          },
          "50%": { 
            "box-shadow": "0 0 0 16px rgba(59, 130, 246, 0)",
            opacity: "0.8"
          },
        },
        "shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "morphing": {
          "0%, 100%": { 
            "border-radius": "12px",
            transform: "rotate(0deg) scale(1)"
          },
          "33%": { 
            "border-radius": "50% 12px",
            transform: "rotate(2deg) scale(1.01)"
          },
          "66%": { 
            "border-radius": "12px 50%",
            transform: "rotate(-1deg) scale(0.99)"
          },
        },
        "spring-bounce": {
          "0%": { transform: "scale(1)" },
          "10%": { transform: "scale(0.95)" },
          "40%": { transform: "scale(1.08)" },
          "60%": { transform: "scale(0.98)" },
          "80%": { transform: "scale(1.02)" },
          "100%": { transform: "scale(1)" },
        },
        "glass-float": {
          "0%, 100%": { 
            transform: "translateY(0px) rotateX(0deg)",
            "backdrop-filter": "blur(8px)",
          },
          "50%": { 
            transform: "translateY(-8px) rotateX(2deg)",
            "backdrop-filter": "blur(12px)",
          },
        },
        "ripple": {
          "0%": { 
            transform: "scale(0)",
            opacity: "1"
          },
          "100%": { 
            transform: "scale(4)",
            opacity: "0"
          },
        },
        "text-reveal": {
          "0%": { 
            opacity: "0",
            transform: "translateY(100%) rotateX(-90deg)",
          },
          "100%": { 
            opacity: "1",
            transform: "translateY(0%) rotateX(0deg)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        fadeIn: "fadeIn 0.5s ease-out",
        slideIn: "slideIn 0.3s ease-out",
        bounce: "bounce 1s infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        "gentle-float": "gentle-float 6s ease-in-out infinite",
        shake: "shake 0.5s ease-in-out",
        // Award-winning ultra-modern animations
        "magnetic-hover": "magnetic-hover 0.4s var(--ease-spring)",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "morphing": "morphing 4s ease-in-out infinite",
        "spring-bounce": "spring-bounce 0.6s var(--ease-spring)",
        "glass-float": "glass-float 3s ease-in-out infinite",
        "ripple": "ripple 0.6s ease-out",
        "text-reveal": "text-reveal 0.8s var(--ease-out-expo)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;

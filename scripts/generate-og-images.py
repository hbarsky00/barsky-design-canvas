#!/usr/bin/env python3
"""
Generate Open Graph cards — 1200x630, one per case study, plus the site card.

Why generate rather than point og:image at a screenshot:

Social platforms crop to roughly 1.91:1 and scale hard. The old setup pointed
each case study at its raw hero file, which meant a 1500x1125 studio mockup or
a 1080x624 game capture got centre-cropped by LinkedIn into whatever happened
to be in the middle — usually not the part that reads. And several of those
files are 1-2MB, over the point where some scrapers give up fetching.

So each card is composed at exactly 1200x630: the product art bleeds off the
right edge where cropping does least damage, and the title and one line of
description live on the left in the site's own typefaces, at a size that
survives being shown as a 400px-wide thumbnail in a feed.

Run:  python3 scripts/generate-og-images.py
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PUB = ROOT / "public"
OUT = PUB / "images" / "og"
FONTS = Path.home() / "Library" / "Fonts"

W, H = 1200, 630

# Pulled from the site's own tokens (src/index.css :root)
INK = (14, 16, 22)
INK_SOFT = (150, 158, 178)
WHITE = (255, 255, 255)
PRIMARY = (49, 79, 246)      # --md-sys-color-primary
ACCENT = (150, 92, 214)      # tertiary / purple

DISPLAY = FONTS / "SpaceGrotesk-700.ttf"
BODY = FONTS / "Inter-400.ttf"
LABEL = FONTS / "Inter-600.ttf"


def font(path, size):
    return ImageFont.truetype(str(path), size)


def wrap(draw, text, fnt, max_w):
    words, lines, cur = text.split(), [], ""
    for w in words:
        trial = f"{cur} {w}".strip()
        if draw.textlength(trial, font=fnt) <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def backdrop():
    """Dark ground with two brand glows — the page's own palette, not a flat fill."""
    base = Image.new("RGB", (W, H), INK)
    glow = Image.new("RGB", (W, H), INK)
    g = ImageDraw.Draw(glow)
    g.ellipse([W * 0.44, -260, W * 1.18, 420], fill=PRIMARY)
    g.ellipse([-200, H * 0.52, 460, H * 1.5], fill=ACCENT)
    glow = glow.filter(ImageFilter.GaussianBlur(190))
    return Image.blend(base, glow, 0.42)


def cover(img, box_w, box_h):
    """Fill the box, cropping the overflow — never letterbox, never squash."""
    img = img.convert("RGB")
    scale = max(box_w / img.width, box_h / img.height)
    img = img.resize((max(1, round(img.width * scale)), max(1, round(img.height * scale))), Image.LANCZOS)
    left = (img.width - box_w) // 2
    # Bias to the top: UI screenshots carry their identity in the header/nav,
    # and a centre crop on a tall capture throws that away.
    top = min((img.height - box_h) // 2, round(img.height * 0.06))
    return img.crop((left, top, left + box_w, top + box_h))


def rounded(img, radius):
    mask = Image.new("L", img.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, img.width - 1, img.height - 1], radius, fill=255)
    out = img.copy()
    out.putalpha(mask)
    return out


def card(title, desc, tag, art_path, out_name):
    canvas = backdrop()

    # ── product art, bleeding off the right edge ──────────────────────────
    art_w, art_h = 560, 470
    src = PUB / art_path.lstrip("/")
    if src.exists():
        art = cover(Image.open(src), art_w, art_h)
        art = rounded(art, 18)
        shadow = Image.new("RGBA", (art_w + 80, art_h + 80), (0, 0, 0, 0))
        ImageDraw.Draw(shadow).rounded_rectangle([40, 46, art_w + 40, art_h + 46], 18, fill=(0, 0, 0, 150))
        shadow = shadow.filter(ImageFilter.GaussianBlur(24))
        canvas.paste(shadow, (W - art_w - 40, 80), shadow)
        canvas.paste(art, (W - art_w - 0, 80), art)
    else:
        print(f"   ! missing art: {art_path}")

    d = ImageDraw.Draw(canvas)
    x, max_w = 72, 520

    # ── tag ───────────────────────────────────────────────────────────────
    f_tag = font(LABEL, 21)
    d.text((x, 92), tag.upper(), font=f_tag, fill=(168, 180, 232))

    # ── title, shrinking to fit rather than overflowing ────────────────────
    size, lines = 62, []
    while size >= 38:
        f_title = font(DISPLAY, size)
        lines = wrap(d, title, f_title, max_w)
        if len(lines) <= 3:
            break
        size -= 5
    y = 146
    for ln in lines:
        d.text((x, y), ln, font=f_title, fill=WHITE)
        y += round(size * 1.14)

    # ── description ───────────────────────────────────────────────────────
    f_desc = font(BODY, 25)
    y += 16
    for ln in wrap(d, desc, f_desc, max_w)[:3]:
        d.text((x, y), ln, font=f_desc, fill=INK_SOFT)
        y += 37

    # ── footer ────────────────────────────────────────────────────────────
    d.rectangle([x, H - 92, x + 46, H - 88], fill=PRIMARY)
    d.text((x, H - 72), "barskydesign.pro", font=font(LABEL, 23), fill=(206, 213, 232))

    OUT.mkdir(parents=True, exist_ok=True)
    dest = OUT / out_name
    canvas.save(dest, "PNG", optimize=True)
    kb = dest.stat().st_size // 1024
    print(f"   {out_name:<34} {kb} KB")


CASE_STUDIES = [
    ("ring-rival", "Ring-Rival",
     "Console boxing feel on the mobile web. Built solo with AI as a co-builder.",
     "AI-Assisted Product", "/images/ringrival-now/card-poster.jpg"),
    ("catchbuddy", "CatchBuddy",
     "Same-day pickup sports, designed for trust from the safety layer up.",
     "Trust & Safety", "/images/catchbuddy-hero-landing.webp"),
    ("herbalink", "HerbaLink",
     "A booking platform where the real product is trust, not search.",
     "Health · Marketplace", "/images/herbalink/card-poster-home.jpg"),
    ("stips", "Stips",
     "Prediction markets you can actually read, where the price is the probability.",
     "Fintech UX", "/images/stips/card-poster-home.jpg"),
    ("dae-search", "DAE Search",
     "Enterprise search built around whether you can trust the data you found.",
     "Enterprise · Search", "/images/dae-search/hero.webp"),
    ("investor-loan-app", "Investor Loan Platform",
     "Replacing Excel as the system of record for multi-million-dollar loan deals.",
     "Enterprise · FinTech", "/images/investor-loan-app/card-poster-home.jpg"),
    ("fire-lion", "Fire Lion",
     "A canvas arcade game that runs in a phone browser with no install.",
     "Game Design", "/images/firelion-hero-title.webp"),
    ("splittime", "SplitTime",
     "Co-parenting logistics designed to lower the temperature, not raise it.",
     "Product Design", "/images/splittime/hero.webp"),
    ("crypto", "Gold2Crypto",
     "Turning a commodity trading flow into something a first-timer can follow.",
     "FinTech", "/images/crypto/hero.webp"),
    ("recast", "Recast",
     "Record once, send a link. Native capture on Mac and Android, one web library.",
     "Cross-Platform", "/images/recast/landing-hero.webp"),
    ("email-creation-ai", "ManuscriptRx",
     "AI-assisted pharma email built to survive a six-step regulated review.",
     "Pharma \u00b7 AI", "/images/emailai-screen1-content-planning.webp"),
]


# Static and service pages. The 2026-08 OG pass covered case studies and blog
# posts only, so these nine were still falling back to whatever hero image the
# page happened to use — including the 480x640 portrait headshot, which every
# share preview (LinkedIn, Slack, iMessage, X) letterboxed or centre-cropped,
# and which was identical across /about, /contact, /services and /store.
STATIC_PAGES = [
    ("page-about", "About Hiram Barsky",
     "15+ years designing and developing software in regulated industries.",
     "About", "/images/hiram-barsky-profile.webp"),
    ("page-contact", "Tell me what you are building",
     "SaaS, an app, or the internal tool nobody wants to touch. Remote, worldwide.",
     "Contact", "/images/herbalink/card-poster-home.jpg"),
    ("page-services", "What I design and develop",
     "SaaS, web apps, mobile apps and internal tools. One person, start to finish.",
     "Services", "/images/stips/card-poster-home.jpg"),
    ("page-projects", "Products I designed and built",
     "Case studies from 15+ years: the decisions, the trade-offs, and what I cut.",
     "Case Studies", "/images/ringrival-now/card-poster.jpg"),
    ("page-blog", "Designing and developing software",
     "Notes on AI-assisted workflow, design systems, and what shipping solo takes.",
     "Blog", "/images/dae-search/hero.webp"),
    ("page-store", "Design resources and templates",
     "Wireframe kits and UX templates pulled from my own product work.",
     "Store", "/images/herbalink/home-2026.webp"),
    ("service-ux-ui-design", "UX/UI Design",
     "Research through high-fidelity UI, and the design system that holds it together.",
     "Service", "/images/herbalink/home-2026.webp"),
    ("service-mobile-app-design", "Mobile App Design & Development",
     "iOS and Android app design, plus the build to go with it.",
     "Service", "/images/catchbuddy-hero-landing.webp"),
    ("service-web-development", "Web Development",
     "React and TypeScript web apps, built by the person who designed them.",
     "Service", "/images/dae-search/hero.webp"),
]

def blog_posts():
    """
    Read the posts out of blogData.ts rather than restating them here.

    Duplicating twelve titles and excerpts into this script would guarantee
    they drift the first time a post is edited, and the failure is silent —
    the card keeps rendering, just with last month's headline on it.
    """
    import re

    src = (ROOT / "src" / "data" / "blogData.ts").read_text()
    posts, seen = [], set()
    for m in re.finditer(r"\bslug:\s*[`\"']([a-z0-9-]+)[`\"']", src):
        slug = m.group(1)
        if slug in seen:
            continue
        seen.add(slug)
        window = src[max(0, m.start() - 1600): m.start() + 1600]
        title = re.search(r"title:\s*[`\"']([^`\"']+)", window)
        excerpt = re.search(r"excerpt:\s*[`\"']([^`\"']+)", window)
        art = re.search(r"coverImage:\s*[`\"']([^`\"']+)", window)
        if not (title and art):
            print(f"   ! skipping {slug}: no title or cover in blogData.ts")
            continue
        posts.append((slug, title.group(1), (excerpt.group(1) if excerpt else ""), art.group(1)))
    return posts


if __name__ == "__main__":
    print("Case study cards:")
    for slug, title, desc, tag, art in CASE_STUDIES:
        card(title, desc, tag, art, f"{slug}.png")

    print("Static & service page cards:")
    for slug, title, desc, tag, art in STATIC_PAGES:
        card(title, desc, tag, art, f"{slug}.png")

    print("Blog cards:")
    for slug, title, excerpt, art_path in blog_posts():
        # One sentence is all that fits at a legible size; the excerpts run
        # long, so cut at the first full stop rather than mid-clause.
        first = excerpt.split(". ")[0].strip()
        if first and not first.endswith("."):
            first += "."
        card(title, first, "Writing", art_path, f"blog-{slug}.png")

    print("Site card:")
    card("I design AI-first products that ship.",
         "Lead Product & AI Designer. 15+ years in regulated enterprise software.",
         "Hiram Barsky",
         "/images/hiram-barsky-profile.webp",
         "site.png")

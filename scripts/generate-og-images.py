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
     "Trust & Safety", "/images/catchbuddy-hero-landing.png"),
    ("herbalink", "HerbaLink",
     "A booking platform where the real product is trust, not search.",
     "Health · Marketplace", "/images/herbalink/card-poster-home.jpg"),
    ("stips", "Stips",
     "Prediction markets you can actually read, where the price is the probability.",
     "Fintech UX", "/images/stips/card-poster-home.jpg"),
    ("dae-search", "DAE Search",
     "Enterprise search built around whether you can trust the data you found.",
     "Enterprise · Search", "/images/dae-search/hero.jpg"),
    ("investor-loan-app", "Investor Loan Platform",
     "Replacing Excel as the system of record for multi-million-dollar loan deals.",
     "Enterprise · FinTech", "/images/investor-loan-app/card-poster-home.jpg"),
    ("fire-lion", "Fire Lion",
     "A canvas arcade game that runs in a phone browser with no install.",
     "Game Design", "/images/firelion-hero-title.png"),
    ("splittime", "SplitTime",
     "Co-parenting logistics designed to lower the temperature, not raise it.",
     "Product Design", "/images/splittime/hero.jpg"),
    ("crypto", "Gold2Crypto",
     "Turning a commodity trading flow into something a first-timer can follow.",
     "FinTech", "/images/crypto/hero.jpg"),
]

if __name__ == "__main__":
    print("Case study cards:")
    for slug, title, desc, tag, art in CASE_STUDIES:
        card(title, desc, tag, art, f"{slug}.png")

    print("Site card:")
    card("I design AI-first products that ship.",
         "Lead Product & AI Designer. 15+ years in regulated enterprise software.",
         "Hiram Barsky",
         "/images/hiram-barsky-profile.png",
         "site.png")

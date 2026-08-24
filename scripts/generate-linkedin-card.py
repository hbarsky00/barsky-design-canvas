#!/usr/bin/env python3
"""
Builds the LinkedIn showcase image — five live products in one frame.

4:5 (1200x1500) because LinkedIn gives portrait images the most feed height
before the fold, and this needs to survive being scrolled past at speed.

Same visual language as the OG cards in generate-og-images.py: dark ground,
the site's own brand glows, Space Grotesk for display and Inter for the rest.
Deliberately not a template — it should look like it came off the same site
it points at.

Run:  python3 scripts/generate-linkedin-card.py
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PUB = ROOT / "public"
FONTS = Path.home() / "Library" / "Fonts"

W, H = 1200, 1500
INK = (12, 14, 20)
WHITE = (255, 255, 255)
DIM = (156, 165, 186)
PRIMARY = (49, 79, 246)
ACCENT = (150, 92, 214)
CYAN = (56, 178, 210)

DISPLAY = FONTS / "SpaceGrotesk-700.ttf"
BODY = FONTS / "Inter-400.ttf"
LABEL = FONTS / "Inter-600.ttf"
f = lambda p, s: ImageFont.truetype(str(p), s)

# Every one of these returns 200 — checked before building the image, because
# a showcase pointing at a dead domain is worse than no showcase.
PRODUCTS = [
    ("Ring-Rival", "ringrival.today", "Mobile boxing, no install", "/images/ringrival-now/card-poster.jpg"),
    ("Stips", "stips.bet", "Prediction markets you can read", "/images/stips/markets-board.webp"),
    ("HerbaLink", "herbalink.live", "Verified herbalists, trust-first", "/images/herbalink/card-poster-home.jpg"),
    ("CatchBuddy", "catchbuddy.fit", "Pickup sports, safety by design", "/images/catchbuddy-hero-landing.webp"),
    ("Fire Lion", "firelion.me", "Canvas arcade in a browser", "/images/firelion-hero-title.webp"),
]


def backdrop():
    base = Image.new("RGB", (W, H), INK)
    glow = Image.new("RGB", (W, H), INK)
    g = ImageDraw.Draw(glow)
    g.ellipse([W * 0.30, -320, W * 1.25, 480], fill=PRIMARY)
    g.ellipse([-260, H * 0.60, 520, H * 1.15], fill=ACCENT)
    g.ellipse([W * 0.45, H * 0.82, W * 1.2, H * 1.3], fill=CYAN)
    return Image.blend(base, glow.filter(ImageFilter.GaussianBlur(210)), 0.40)


def cover(img, w, h):
    img = img.convert("RGB")
    s = max(w / img.width, h / img.height)
    img = img.resize((round(img.width * s), round(img.height * s)), Image.LANCZOS)
    left = (img.width - w) // 2
    top = min((img.height - h) // 2, round(img.height * 0.04))
    return img.crop((left, top, left + w, top + h))


def rounded(img, r):
    m = Image.new("L", img.size, 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, img.width - 1, img.height - 1], r, fill=255)
    out = img.copy()
    out.putalpha(m)
    return out


def build():
    c = backdrop()
    d = ImageDraw.Draw(c)
    x = 72

    d.text((x, 92), "BUILT AND SHIPPED SOLO", font=f(LABEL, 22), fill=(170, 182, 235))
    d.text((x, 132), "Five products.", font=f(DISPLAY, 66), fill=WHITE)
    d.text((x, 206), "One person.", font=f(DISPLAY, 66), fill=WHITE)
    d.text((x, 300), "Designed, built and deployed end to end —",
           font=f(BODY, 26), fill=DIM)
    d.text((x, 336), "front end, database, auth, the lot. All live right now.",
           font=f(BODY, 26), fill=DIM)

    # Two columns; the first product gets a full-width slot so the grid has a
    # focal point rather than reading as five equal thumbnails.
    top = 410
    big_h = 276
    src = PUB / PRODUCTS[0][3].lstrip("/")
    art = rounded(cover(Image.open(src), W - 144, big_h), 14)
    c.paste(art, (x, top), art)
    d.text((x + 4, top + big_h + 16), PRODUCTS[0][0], font=f(DISPLAY, 30), fill=WHITE)
    d.text((x + 4, top + big_h + 54), f"{PRODUCTS[0][1]}  ·  {PRODUCTS[0][2]}",
           font=f(BODY, 21), fill=DIM)

    cw, ch, gap = (W - 144 - 28) // 2, 190, 28
    cy = top + big_h + 112
    for i, (name, url, blurb, path) in enumerate(PRODUCTS[1:]):
        col, row = i % 2, i // 2
        px = x + col * (cw + gap)
        py = cy + row * (ch + 106)
        p = PUB / path.lstrip("/")
        if not p.exists():
            continue
        a = rounded(cover(Image.open(p), cw, ch), 12)
        c.paste(a, (px, py), a)
        d.text((px + 2, py + ch + 12), name, font=f(DISPLAY, 25), fill=WHITE)
        d.text((px + 2, py + ch + 44), url, font=f(LABEL, 18), fill=(150, 165, 235))
        d.text((px + 2, py + ch + 68), blurb, font=f(BODY, 17), fill=DIM)

    d.rectangle([x, H - 96, x + 52, H - 92], fill=PRIMARY)
    d.text((x, H - 74), "barskydesign.pro", font=f(LABEL, 25), fill=(206, 214, 236))

    out = PUB / "images" / "linkedin-products.png"
    c.save(out, "PNG", optimize=True)
    print(f"  {out.relative_to(ROOT)}  {out.stat().st_size // 1024} KB  {W}x{H}")
    return out


if __name__ == "__main__":
    build()

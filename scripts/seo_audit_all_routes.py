#!/usr/bin/env python3
"""Per-route SEO audit over the built dist/: title, description, image.

Run after `npm run build`. Exits non-zero-ish by reporting PROBLEMS > 0.
Used by the every-2-days loop in docs/auto-improve-loop.md.

Deterministic — parses the actual shipped HTML, not the source. Checks the
three things Hiram asked for on every page, plus whether each OG image really
exists on disk at the size the card declares.
"""
import re, os, sys, json
from pathlib import Path

DIST = Path("dist")
PUB  = Path("public")

def meta(html, **kw):
    # Capture with a backreference on the opening quote, not a [^"\'] class:
    # a class stops dead at the first apostrophe, so "It won\'t tell you..."
    # was being read as a 47-character description and flagged THIN.
    k, v = list(kw.items())[0]
    m = re.search(r'<meta[^>]+%s=["\']%s["\'][^>]*content=("|\')(.*?)\1' % (k, re.escape(v)), html, re.I | re.S)
    if not m:
        m = re.search(r'<meta[^>]+content=("|\')(.*?)\1[^>]*%s=["\']%s["\']' % (k, re.escape(v)), html, re.I | re.S)
    return m.group(2) if m else None

def png_size(p):
    try:
        b = p.read_bytes()[:33]
        if b[:8] == b'\x89PNG\r\n\x1a\n':
            return int.from_bytes(b[16:20], 'big'), int.from_bytes(b[20:24], 'big')
        if b[:2] == b'\xff\xd8':
            d = p.read_bytes(); i = 2
            while i < len(d) - 9:
                if d[i] != 0xFF: i += 1; continue
                m = d[i+1]
                if m in (0xC0,0xC1,0xC2,0xC3):
                    return int.from_bytes(d[i+7:i+9],'big'), int.from_bytes(d[i+5:i+7],'big')
                i += 2 + int.from_bytes(d[i+2:i+4],'big')
    except Exception:
        pass
    return None

rows = []
for f in sorted(DIST.rglob("index.html")):
    route = "/" + str(f.parent.relative_to(DIST)).replace(".", "").strip("/")
    if route == "/": route = "/"
    h = f.read_text(errors="ignore")
    t  = re.search(r"<title>(.*?)</title>", h, re.S)
    title = (t.group(1).strip() if t else None)
    desc  = meta(h, name="description")
    ogi   = meta(h, property="og:image")
    ogt   = meta(h, property="og:title")
    ogd   = meta(h, property="og:description")
    twi   = meta(h, name="twitter:image") or meta(h, property="twitter:image")
    can   = (re.search(r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\']([^"\']+)["\']', h, re.I) or [None,None])[1] \
            if re.search(r'rel=["\']canonical["\']', h, re.I) else None
    rows.append(dict(route=route, title=title, desc=desc, og_image=ogi,
                     og_title=ogt, og_desc=ogd, tw_image=twi, canonical=can))

# ---- report ----
W = 52
print("=" * 118)
print("%-46s %-5s %-5s %-9s %-9s %s" % ("ROUTE", "TITLE", "DESC", "OG:IMAGE", "CANON", "IMAGE FILE"))
print("=" * 118)

problems = []
imgs = {}
for r in rows:
    tl = len(r["title"]) if r["title"] else 0
    dl = len(r["desc"]) if r["desc"] else 0
    tflag = "MISS" if not r["title"] else ("LONG" if tl > 60 else str(tl))
    dflag = "MISS" if not r["desc"] else ("LONG" if dl > 160 else ("THIN" if dl < 70 else str(dl)))
    img = r["og_image"]
    istat, ifile = "MISS", "-"
    if img:
        rel = img.replace("https://barskydesign.pro", "").lstrip("/")
        p = DIST / rel
        if p.exists():
            sz = png_size(p)
            istat = "ok"
            ifile = "%s %s" % (rel.split("/")[-1], ("%dx%d" % sz) if sz else "?")
            if sz and sz != (1200, 630):
                istat = "SIZE"
        else:
            istat, ifile = "404", rel
        imgs.setdefault(img, []).append(r["route"])
    cflag = "ok" if r["canonical"] else "MISS"
    print("%-46s %-5s %-5s %-9s %-9s %s" % (r["route"][:46], tflag, dflag, istat, cflag, ifile))
    for label, bad in (("title", tflag in ("MISS","LONG")), ("description", dflag in ("MISS","LONG","THIN")),
                       ("og:image", istat in ("MISS","404","SIZE")), ("canonical", cflag=="MISS")):
        if bad: problems.append((r["route"], label))

print("=" * 118)
print("routes audited: %d" % len(rows))
missing_ogt = [r["route"] for r in rows if not r["og_title"]]
missing_ogd = [r["route"] for r in rows if not r["og_desc"]]
missing_twi = [r["route"] for r in rows if not r["tw_image"]]
print("missing og:title: %d   missing og:description: %d   missing twitter:image: %d"
      % (len(missing_ogt), len(missing_ogd), len(missing_twi)))

dupes = {k:v for k,v in imgs.items() if len(v) > 1}
print("\nSHARED OG IMAGES (same card on multiple routes): %d" % len(dupes))
for k,v in sorted(dupes.items(), key=lambda x:-len(x[1])):
    print("  %-58s %d routes: %s" % (k.split("/")[-1], len(v), ", ".join(v[:6]) + ("..." if len(v)>6 else "")))

print("\nPROBLEMS: %d" % len(problems))
for r,l in problems: print("  %-46s %s" % (r, l))

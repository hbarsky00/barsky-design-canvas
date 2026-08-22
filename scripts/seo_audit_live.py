#!/usr/bin/env python3
"""Live audit of barskydesign.pro: title / description / og:image per route.

Fetches the real site, not dist. Each og:image is fetched over HTTP and its
PNG/JPEG header parsed, so "the card exists at 1200x630" is measured, not assumed.
Redirects are NOT followed (no -L): the status of the URL asked for is the point.
"""
import re, sys, json, urllib.request, concurrent.futures as cf

BASE = "https://barskydesign.pro"
UA = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124 Safari/537.36"}

def get(url, nbytes=None):
    r = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(r, timeout=30) as f:
        return f.status, (f.read(nbytes) if nbytes else f.read())

def meta(h, **kw):
    # group 1 is the opening quote, group 2 the content. The first version
    # backreferenced \2 (the content itself) instead of \1, so nothing matched.
    k, v = list(kw.items())[0]
    pats = [r'<meta[^>]+%s=["\']%s["\'][^>]*content=("|\')(.*?)\1' % (k, re.escape(v)),
            r'<meta[^>]+content=("|\')(.*?)\1[^>]*%s=["\']%s["\']' % (k, re.escape(v))]
    for pat in pats:
        m = re.search(pat, h, re.I | re.S)
        if m:
            return m.group(2)
    return None

def dims(b):
    if b[:8] == b'\x89PNG\r\n\x1a\n':
        return int.from_bytes(b[16:20],'big'), int.from_bytes(b[20:24],'big')
    if b[:2] == b'\xff\xd8':
        i = 2
        while i < len(b)-9:
            if b[i] != 0xFF: i += 1; continue
            if b[i+1] in (0xC0,0xC1,0xC2,0xC3):
                return int.from_bytes(b[i+7:i+9],'big'), int.from_bytes(b[i+5:i+7],'big')
            i += 2 + int.from_bytes(b[i+2:i+4],'big')
    return None

ROUTES = json.load(open(sys.argv[1]))

def check(route):
    try:
        st, body = get(BASE + route)
        h = body.decode("utf-8", "ignore")
    except Exception as e:
        return route, "FETCH", str(e)[:40], None, None, None
    t = re.search(r"<title>(.*?)</title>", h, re.S)
    title = t.group(1).strip() if t else None
    d = meta(h, name="description")
    ogi = meta(h, property="og:image")
    isz = None
    if ogi:
        try:
            ist, ib = get(ogi, 4096)
            isz = dims(ib) if ist == 200 else "HTTP%d" % ist
        except Exception:
            isz = "ERR"
    return route, st, title, d, ogi, isz

with cf.ThreadPoolExecutor(max_workers=8) as ex:
    res = list(ex.map(check, ROUTES))

print("=" * 104)
print("%-46s %-4s %-6s %-6s %s" % ("ROUTE", "HTTP", "TITLE", "DESC", "OG IMAGE (live fetch)"))
print("=" * 104)
bad = 0
for route, st, title, d, ogi, isz in sorted(res):
    tl = len(title) if title else 0
    dl = len(d) if d else 0
    ok = (st == 200 and title and d and 0 < tl <= 60 and 70 <= dl <= 160 and isz == (1200, 630))
    if not ok: bad += 1
    szs = ("%dx%d" % isz) if isinstance(isz, tuple) else str(isz)
    print("%-46s %-4s %-6s %-6s %s %s" % (route[:46], st, tl or "MISS", dl or "MISS",
                                          szs, "" if ok else "  <-- CHECK"))
print("=" * 104)
print("routes: %d   failing: %d" % (len(res), bad))

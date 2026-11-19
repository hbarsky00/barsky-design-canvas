# Google Business Profile — Barsky Design

Everything below is drafted and ready to paste. Google cross-references a
profile against the website it points at, so every field here is taken from
copy already published on barskydesign.pro rather than written fresh for the
listing. Nothing is invented.

**Create it at:** https://business.google.com/create

**What only you can do:** the account creation, the street address used for
verification, and the verification itself (video walkthrough or postcard).
Everything else is below.

---

## Why this is worth the twenty minutes

The site's head terms are unwinnable — that was settled earlier. Local intent
is the opposite situation: "product designer near me", "UX designer New
Jersey", "web designer Clifton NJ" are low-competition queries with buyers
behind them, and a Business Profile is the only way to appear in the map pack
or the knowledge panel at all. The site has published a NJ/NYC-metro service
area in its structured data for months with no profile for Google to attach it
to.

---

## 1. Business name

```
Barsky Design
```

Exactly that. No suffix, no "| AI Product Designer NYC", no city. Keyword
stuffing the name is the single most common cause of a suspension, and the name
must match what the site says — the site says "Barsky Design" in both the
static and runtime structured data.

---

## 2. Business type

Choose **Service area business** — "I deliver goods and services to my
customers" with no storefront customers visit.

Google will still ask for a street address to verify you. Mark it **hidden**;
it is used for verification only and is not shown publicly. Service-area
businesses are not required to display an address.

---

## 3. Categories

Google's category list is theirs and it changes, so type each phrase into the
category field and pick the closest thing that autocompletes rather than
trusting a list from me.

**Primary category — try in this order, take the first that appears:**

1. `Web designer`
2. `Website designer`
3. `Graphic designer`

Primary category does most of the ranking work. Pick the one that best matches
what someone would search, not the most impressive-sounding one.

**Additional categories (up to 9) — add whichever of these exist:**

- `Software company`
- `Design agency`
- `Computer consultant`
- `Graphic designer`
- `Marketing consultant`

Do not add categories for work you do not do. Irrelevant categories dilute the
primary one.

---

## 4. Service areas

Up to 20 allowed. These are exactly the areas the site's structured data
already claims, so the profile and the site will agree:

```
New York, NY
Brooklyn, NY
Jersey City, NJ
Newark, NJ
Hoboken, NJ
Clifton, NJ
Montclair, NJ
Paterson, NJ
Passaic, NJ
```

Plus, as broader entries if Google offers them:

```
New Jersey
New York City Metropolitan Area
```

Do not set the radius to the whole country. A service area that covers
everywhere reads as covering nowhere and weakens the local signal.

---

## 5. Contact details

| Field | Value |
|---|---|
| Phone | `(201) 668-4754` |
| Website | `https://barskydesign.pro` |
| Appointment link | `https://calendly.com/barskyuxdesignservices/30min` |

The phone matches the footer, the contact page and — as of this change — the
structured data. All four now agree.

---

## 6. Hours

Set **Open with main hours** rather than leaving it blank; a profile with no
hours is ranked and displayed worse.

```
Monday    9:00 AM – 6:00 PM
Tuesday   9:00 AM – 6:00 PM
Wednesday 9:00 AM – 6:00 PM
Thursday  9:00 AM – 6:00 PM
Friday    9:00 AM – 6:00 PM
Saturday  Closed
Sunday    Closed
```

**These are a placeholder, not a fact.** The site deliberately publishes no
opening hours — there is a comment in `index.html` saying inventing hours for a
remote practice is worse than omitting the field, and that was the right call
for schema. A Business Profile is different: the field is effectively required.
Change these to whatever you will actually answer the phone during. Once you
set them, I can add matching `openingHours` to the schema so the two agree.

---

## 7. Business description

746 characters; the limit is 750. Paste as-is.

```
Barsky Design is the practice of Hiram Barsky, a product designer and front-end developer based in Clifton, New Jersey, serving the New York City metro area and clients remotely across the US.

I design and develop SaaS, web apps, mobile apps and internal tools - one person, from product design through React front end, database and launch. Fifteen years across fintech, healthcare and pharma, where approval gates, audit trails and compliance review shape the interface rather than decorate it.

Projects usually start one of four ways: AI product design, design systems, UX strategy and research, or prototype to ship. Each one begins with a call and a written scope naming the deliverables, the sequence and the number before any work starts.
```

No phone number, URL or promotional language in the description — Google
strips descriptions that contain them.

---

## 8. Services

Add these four under **Services**. Names and descriptions are the ones already
on `/services`, so the profile echoes the page. Each is inside GBP's 300-char
description limit.

**AI Product Design**
```
End-to-end design for AI-first products - from the model's behavior to the interface people actually touch. Covers concept through shipped UI, prompt and interaction design, and the trust and safety patterns that decide whether people believe what the product tells them.
```

**Design Systems**
```
Scalable component libraries and tokens that keep a growing product consistent and fast to build. Token architecture, the component library itself, and the governance and documentation that stop it drifting the moment more than one person touches it.
```

**UX Strategy & Research**
```
Turn ambiguity into a plan - user research, journey mapping, and a roadmap tied to measurable outcomes rather than a list of screens. The output is a sequence you can act on and the reasoning behind it.
```

**Prototype to Ship**
```
Not a handoff file. The real thing, built and shipped with React, TypeScript and modern AI tooling - rapid prototyping through production front end, by the same person who designed it.
```

---

## 9. Photos

Profiles with photos get materially more engagement, and the first upload sets
the tone. Use what the site already has rather than shooting anything new:

| Slot | File |
|---|---|
| Logo | `public/logo.png` |
| Profile / cover | `public/images/hiram-barsky-headshot.webp` — the headshot the LocalBusiness schema already points at |
| Additional (5–10) | Case-study hero images from `public/images/` |

Do not upload stock photography or anything with text overlaid — Google
sometimes rejects those, and they read as filler.

---

## 10. Attributes

Turn on whichever of these Google offers:

- Online appointments
- Online estimates
- Identifies as veteran-owned / other identity attributes — **only if true**

---

## 11. After it is verified

In order of value:

1. **Add the profile URL to the site's `sameAs`.** Once the profile has a
   public URL, it belongs in `SAME_AS` in
   `src/utils/seo/structuredDataUtils.ts` alongside LinkedIn and GitHub. That
   is the link that ties the listing to the website as one entity — tell me and
   I will add it.
2. **Set real hours**, then I will mirror them into the schema.
3. **Ask the last three clients for a review.** Reviews are the strongest
   single ranking factor in the map pack, and the profile starts at zero. Three
   real reviews beats everything else on this page.
4. **Post once a month.** Profile posts are low effort and keep the listing
   active; a case-study link is enough.

---

## Nothing left open

Every field above is confirmed. The booking URL is
`https://calendly.com/barskyuxdesignservices/30min` — read from
`CALENDLY_BASE` in `src/lib/analytics.ts` and checked live (200).

The only two things still yours: the street address for verification, and
whether the placeholder hours in section 6 are the hours you actually keep.

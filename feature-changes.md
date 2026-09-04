# ACE-VSS Website Update — Developer Task Tracker
*Source: Website Update Brief v1.1, July 2026*

## What you were asked to do

Update acevirtualsupportservices.com to fix factually inaccurate live copy, apply a new brand (colours, fonts, logo), restructure the services section around visitor situations instead of product names, build out a missing VSP journey section with careful fee-disclosure rules, add new components (testimonials, FAQ, a Nigeria pricing page), and tighten up accessibility/technical details — all while respecting two hard rules that apply everywhere: **British spelling throughout**, and **never publish the VSP network activation fee percentage** (only its existence).

Work is explicitly ordered by priority (P1 → P3), and three items are marked out of scope for this round.

---

## Two rules that apply to EVERY task below
- [ ] British spelling throughout (including code comments, alt text)
- [ ] No em dashes anywhere
- [ ] Never publish the VSP activation fee **percentage** — existence of the fee is public, the figure is not

---

## PHASE 1 — Priority 1: Fix what's factually wrong (do first)

### 1.1 Correct inaccurate copy
- [ ] Homepage marquee: "VSPs Keep 100% of Earnings" → "Your agreed compensation is yours in full"
- [ ] Values section: "ACE-VSS earns only from client-side fees" → "ACE-VSS earns from the businesses we serve"
- [ ] Values/pricing section: "Fees are always separated on every invoice" → "Our fees are charged to you, never taken from your VSP's compensation"
- [ ] VSP page (every instance): "Placement fee" → "Network activation fee"
- [ ] All pages: remove any published pricing figures (see Phase 2, Section 5 rules)
- [ ] Nav, services, footer: remove "ACE Match Pro" entirely — service line is retired

### 1.2 Apply the brand
- [ ] Replace deprecated colour palette sitewide with:
  - `--charcoal #3c3c3b` — body text on light/dark backgrounds, footer
  - `--peach #e3a575` — buttons, links, dividers, headings on dark (never body text)
  - `--brown #473f35` — subheadings on light, hover states, table headers
  - `--cream #fde3cb` — page background (replaces white)
  - `--sand #ebd4bb` — cards, callouts, alternating sections
- [ ] Self-host **Kelvinch** via `@font-face` (4 OTF files supplied) — headings only
- [ ] Set **Public Sans** for all body text, labels, captions, interface elements
- [ ] Replace logo files with supplied pack (transparent PNG + SVG, two colourways)
- [ ] Ensure logo is never rendered as live text — image asset only
- [ ] Check accessibility: peach is decoration/buttons/dark-headings only (fails contrast on cream/sand) — confirm all text pairings against Brand Guidelines v1.2 p.6

---

## PHASE 2 — Priority 2: Restructure and expand

### 2.1 Restructure services by visitor situation
- [ ] Rebuild services section copy around situation-first framing:
  - "I need tasks done each month" → **ACE Micro**
  - "I need my own dedicated person" → **ACE Match**
  - "I need my own person, don't want to manage them" → **ACE Manage**
  - "I don't know what I need" → **Start here** (scope session)
- [ ] Insert final copy blocks for ACE Micro / ACE Match / ACE Manage exactly as given in brief §3

### 2.2 Build the VSP journey section
Add new section on VSP page, after existing vetting stages, covering in this order:
- [ ] Database activation — what it means in practice
- [ ] How matching works (matched to briefs, no bidding/competing)
- [ ] The three engagement types explained from the professional's POV (ACE Micro / ACE Match / ACE Manage — who pays whom, who manages)
- [ ] Fees section using exact copy from §2.3 below
- [ ] Expectation-setting line: activation = standard met, **not** a placement guarantee

### 2.3 Pricing disclosure — implement exactly per these rules
| Item | Show on site? | How |
|---|---|---|
| Micro packages | Yes | "From" prices with hours shown |
| Scope session fee | Yes | Stated, with credit-against-first-invoice explained |
| Sourcing fee | Rule only | "30% of first month, min $100, quoted after scope session" |
| Management retainer | Described only | "% of monthly engagement value, quoted per engagement" — no worked figures |
| Markup percentages | No | Never itemised/published |
| VSP activation fee | Existence only | Never the percentage |

- [ ] Insert **VSP fee copy** verbatim (final, do not paraphrase) — "On fees" block from brief §5
- [ ] Insert **Client fee copy** verbatim — "Our fees are charged to you..." block from brief §5

### 2.4 Add the scope session (primary conversion point)
- [ ] Add scope session module to client-facing pages, behind the existing free 15–20 min fit call
- [ ] Insert copy block verbatim from brief §6
- [ ] Confirm messaging: fee is credited in full against first invoice if client proceeds

---

## PHASE 3 — Priority 3: New components

### 3.1 Testimonials section
- [ ] Build component now on both client-facing and VSP-facing pages
- [ ] Fields per entry: quote, name, role, company, photo (where permission exists)
- [ ] **Do not** use placeholder/invented testimonials anywhere, including staging
- [ ] Leave empty/pending — content arrives later (founding clients + vetted VSPs)

### 3.2 FAQ content
- [ ] Add 3–4 inline FAQs on each relevant page (in-page, not just linked)
- [ ] Build dedicated FAQ page for the long tail
- [ ] Route "what is this service" type content into page flow, not FAQ
- [ ] Stub out placeholders for these question sets (final wording pending):
  - **Client-side:** what if it doesn't work out / how long does placement take / employee vs contractor / time zones / who provides tools / multiple professionals / confidentiality & data access
  - **VSP-side:** vetting process & timeline / cost to join / payment timing / non-paying client / multiple clients / early placement end

### 3.3 Nigeria pricing page
- [ ] Build at path `/nigeria` (same domain, not subdomain)
- [ ] Link from footer
- [ ] Add one line to international pricing sections: "Based in Nigeria? See our local pricing."
- [ ] **Exclude** from main navigation
- [ ] No IP-based auto-redirect; no currency toggle on main pricing page
- [ ] Populate with naira packages, local sourcing fee (% of first month + stated minimum), local scope session fee — figures from Nigeria Pricing Reference v1
- [ ] Apply local-search SEO optimisation (this page is expected to drive acquisition)

---

## PHASE 4 — Technical & accessibility pass (do alongside/after above)
- [ ] Self-host Kelvinch on Cloudflare Pages via `@font-face` — no webfont CDN
- [ ] One `<h1>` per page, correct semantic heading nesting throughout
- [ ] All interactive controls properly labelled
- [ ] All images have meaningful alt text (British spelling applies here too)
- [ ] No copy rendered as an image anywhere except the logo
- [ ] Verify colour contrast against approved pairings table before shipping
- [ ] Confirm the logo's asymmetric arc is preserved exactly as supplied — never "corrected"

---

## Explicitly OUT of scope this round — do not build
- Founding client offer page (terms not yet confirmed)
- Final FAQ wording (pending query review)
- Testimonial content (pending collection — component only, per 3.1)
- Client portal, VSP dashboard, or any assessment platform integration

---

## Reference documents needed
- Brand Guidelines v1.2
- Pricing Reference v3
- Nigeria Pricing Reference v1
- Messaging Bank v1
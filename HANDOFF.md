# Portfolio — handoff

State as of **2026-09-13** (second pass: routing + shell overlay). Written so a fresh session can pick this up without
replaying the design conversation.

---

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck is separate: npx tsc --noEmit
npm run lint       # oxlint; scope it with: npx oxlint src
```

Git repo; work happens on `develop`.

---

## Stack

React 19 · Vite 8 · TypeScript (strict) · Tailwind v4 · oxlint.
One font: **JetBrains Mono** (400/500/700/800), loaded from Google Fonts in
`index.html`. One icon set: **lucide-react**, plus two hand-authored brand
marks (lucide dropped GitHub/LinkedIn for trademark reasons).

### File map

```
index.html                     fonts, meta, <noscript> fade-in fallback
vercel.json                    SPA rewrite so /contact survives a hard refresh
src/index.css                  ALL design tokens + every keyframe. Start here.
src/App.tsx                    BrowserRouter + the three routes
src/lib/typewriter.ts          types the `whoami` command + runs the hero boot sequence
src/portfolio/
  data.ts                      ALL content. Bilingual {en,es}. Single source of truth.
  Layout.tsx                   lang, nav highlight, scroll manager, hotkey, shell, footer
  HomePage.tsx                 route /        — the four sections + the contact CTA
  ContactPage.tsx              route /contact — the form
  NotFound.tsx                 route *
  ShellDialog.tsx              the shell, as a <dialog> over every route
  Nav.tsx                      fixed nav, numbered `// name` items, shell button
  Hero.tsx                     section 01
  Section.tsx                  <Section> frame + <CodeFramed> + <Dot> primitives
  Sections.tsx                 sections 02–05 (Expertise, Experience, Projects, ContactCta)
  Terminal.tsx                 the working shell + its command registry
  BrandIcons.tsx               GitHub / LinkedIn SVG marks
public/Landajo_Ramiro_CV.pdf   linked from the hero and contact
public/projects/*.webp         project screenshots, cropped from each repo's README
```

---

## The design (settled — don't re-litigate)

Six sections, numbered `// nav` in the Tamal Sen idiom:

| # | id | What it is |
|---|----|----|
| 01 | `home` | Full-viewport terminal hero. Prompt types `whoami`, a block cursor appears on the empty line below and blinks alone, then **RAMIRO** / **LANDAJO** is written out one character at a time, offset, `clamp(2.9rem, 11.5vw, 9.5rem)`. The cursor rides the end of it and blinks forever after. |
| 02 | `expertise` | Four areas in one bordered block, bodies wrapped in `<h3>…</h3>` code tags. Full grouped stack below. |
| 03 | `experience` | Role cards, **technical first**, then other roles, then education / certs / languages. |
| 04 | `projects` | Bento: `4 cols × 15rem rows`, one full row. CompuMundoHMR 2×2 with the storefront screenshot, the two mobile apps beside it as 1×2 columns with portrait screenshots. Filled with real repos on 2026-09-13. No lede under the heading — Ramiro's call. |
| 05 | `contact` | A call-to-action band, not the form. Links to `/contact`, with the address and LinkedIn inline so the fast path stays one click. |

Plus two things that are no longer sections:

| | What it is |
|---|---|
| `/contact` | The validated `mailto:` form, on its own route. |
| the shell | A `<dialog>` over every route — nav button, `~`, or Ctrl/⌘+K. |

**References this was built from** — if a future change contradicts these, it is
probably wrong: Nikita Khvatov (giant offset mono hero), tamalsen.dev (numbered
`//` nav, `<h3>` card framing), gianmarcocavallo.com, radnaabazar.com,
robbowen.digital.

### Locked decisions

- **Bilingual EN/ES.** Every user-facing string is `{ en, es }` in `data.ts`.
  Toggle in the nav. Ramiro is C2 Cambridge — the toggle is partly the point.
- **One accent: `green`.** The three-theme switcher (nav dots, the shell's
  `theme` command, `data-accent` on `<html>`, `rl.accent` in `localStorage`) was
  removed on 2026-09-02 — Ramiro's call. The accent hues live in `:root` in
  `src/index.css`; the nav's top-right now holds the EN/ES toggle only.
- **Near-monochrome.** Black, white, one accent used sparingly.
- **Technical roles before non-technical ones.** Ramiro's explicit instruction.
- **Contact = `mailto:` compose.** Chosen over Formspree/Web3Forms so it works
  on deploy with no signup. If this changes, the handler is `submit()` in
  `Contact` (`Sections.tsx`).
- **The shell is an overlay, not a section.** Moved 2026-09-13: it cost a
  `26rem` card most visitors never used, and as a dialog it is louder, not
  quieter — it follows you to `/contact`. Opened by the nav button (the only
  affordance that always works), `~`, or Ctrl/⌘+K. **Do not put it back in the
  page flow.**
- **Contact is a route.** `/contact` holds the form; section 05 on home is the
  invitation. The band keeps `id="contact"` so `/#contact` and the scroll-spy
  still resolve.
- **Projects are three real repos**, in Ramiro's order of weight:
  CompuMundoHMR, CABA+ (AppMunicipal), Game Shop (video-game-ecommerce).
  Filled 2026-09-13, replacing the four empty slots. A fourth card — the
  Arquitectura de Aplicaciones microservices ecosystem — was built and then
  **removed on Ramiro's instruction**; don't re-add it. Nothing here is
  invented: descriptions come from each repo's README, and each `mine` line
  comes from that repo's commit history filtered to Ramiro. **If you add a
  project, source it the same way.**
- **No year on the cards, no lede under the heading.** Both removed on
  2026-09-13 at Ramiro's request; `year` is gone from the `Project` type.

### Motion

Thesis: *the page paints itself the way a terminal paints a buffer.*

- Hero boot (`useHeadlineBoot`, `src/lib/typewriter.ts`) — four beats, in
  terminal order: the command types (58ms/char) and its cursor goes out; 420ms
  later a block cursor appears on the headline's line and blinks alone for
  940ms; the name is written at 74ms/char, 260ms between the two lines, the
  cursor solid while characters land; 240ms after the last one it resumes
  blinking. Only then does the rest of the hero fade in (`.reveal-in`).
  End to end, about 3.7s to the finished name, 4.4s to the last fade.
- The headline's untyped remainder stays in the flow as `visibility: hidden`,
  so the block is full size from the first frame and nothing below it moves.
  Don't replace it with conditional rendering — the page will jump.
- Sections/cards: fade + rise on entry, once, staggered `--i * 70ms`.
- Section headings: an underline rule draws itself in.
- **The hero boot plays once per page load, not per mount.** `booted` in
  `typewriter.ts` is module-level and snapshotted at mount; without it the full
  ~4s sequence replayed every time you came back from `/contact`, which reads
  as a bug. A real reload still gets the show.
- **Every effect has a `prefers-reduced-motion` path.** The caret goes solid —
  blinking is the one effect with a real accessibility cost. Note that a JS
  `scrollIntoView({behavior:'smooth'})` ignores the CSS reset, so `Layout`
  checks `matchMedia` itself before choosing a behavior.

---

## Approved exceptions to `.claude/CLAUDE.md`

Ramiro said, verbatim: *"Prioritize making a good design like the ones I tell you
to over following the CLAUDE.md."* These are deliberate. **Do not "fix" them.**

| Rule | Why it was overridden |
|---|---|
| No continuous looping animations | The blinking caret. Requested by name; it is what sells the terminal. Goes solid under reduced motion. |
| No auto-typing hero headers | Both the command and the name type, on Ramiro's explicit request (2026-08-28). The whole hero is one boot sequence; see Motion. |
| No section numbers (`01/02/03`) | They are the nav's own idiom and serve wayfinding. |

---

## Content status

**Real** — everything sourced from `Landajo_Ramiro_CV.pdf`: all four roles with
dates and bullets, the full skills breakdown, both UADE degrees, Colegio Santa
Teresa secondary, both CoderHouse certifications, languages, contact details.

**Placeholder** — anything in `[BRACKETS]` renders visibly so it cannot ship by
accident:

- `roles[0].todo` — the GardenLife backend role has three TODO slots (what the
  tool does, scale, a decision argued for).

`projects[2]` (Game Shop) is `mine: null` because it is solo — the card says
*Solo* and needs no attribution line. The other two carry a `mine` line.

---

## TODO — Ramiro

1. **Fill the three GardenLife TODOs** in `roles[0].todo`.
2. **Rewrite `story.lede`** (`data.ts`) in your own voice — the facts are yours,
   the phrasing is mine.
3. **Decide about a photo.** There is currently no portrait anywhere on the
   page. Every reference site has a face. If you want one, `src/assets/` was
   deleted — recreate it.
4. Confirm `identity.availability` still says what you want it to.

## TODO — next session

1. **Run the visual QA pass.** Nothing in the current design has ever been
   rendered and looked at. Deferred at Ramiro's request. Highest-risk spots:
   - Hero giant type at 1440 / 1024 / 390 — does `11.5vw` overflow or clip?
   - Projects bento row/col spans at `md` — do the four slots tile cleanly?
   - The mobile nav strip (six scrollable items under the bar).
   - Contact form error states and focus ring contrast.
   - `prefers-reduced-motion` — confirm the caret really holds solid.
2. **`story.more` is rendered nowhere.** Three paragraphs of Ramiro's origin
   story (order desk → automating it → hired to write the backend) exist in
   `data.ts` and never reach the page. Either add an About block or delete them.
   This is his most distinctive material, so probably add it.
3. **Dead code to remove:** the `now` and `form` exports in `data.ts` are unused
   (`form`'s strings were inlined into `Contact`).
4. **Unused dependencies:** `framer-motion`, `clsx`, `tailwind-merge` are in
   `devDependencies` and imported nowhere.
5. Consider `git init` + a first commit.

---

## Gotchas

- **The fade observer must re-run per route** (`Layout.tsx`, deps
  `[lang, pathname]`). `[data-fade]` starts at `opacity: 0`; a route whose
  elements mount after the observer was built renders permanently invisible.
  This is the single easiest way to ship a blank `/contact`.
- **The scroll effect keys on `location.key`, not `pathname + hash`.**
  Navigating to the hash you are already on produces an identical location, so
  a `[pathname, hash]` dep would never fire and `open projects` twice in a row
  would do nothing the second time.
- **Every in-page anchor goes through `<Link>`.** A raw `<a href="#x">` fires
  `hashchange`, not `popstate`, so BrowserRouter never sees it and
  `location.hash` goes stale. The skip link is the one exception — it targets
  `#main` and must work with no JS.
- **The shell dialog is opened imperatively.** Rendering `<dialog open>` gives
  a NON-modal dialog: no backdrop, no focus trap, no inert background. And
  `m-auto` is load-bearing — Tailwind's preflight zeroes the UA's
  `dialog { margin: auto }`, which otherwise pins the panel to the top-left.
- **`~` is a dead key on Latin-American keyboard layouts.** That is why
  Ctrl/⌘+K exists as a second binding and why the nav button is never hidden
  behind a breakpoint.

- **`data.ts` is the only place content lives.** Never hardcode a user-facing
  string in a component; it breaks the ES translation silently.
- **Scroll-spy holds a `Set` across observer callbacks** (`Portfolio.tsx`). A
  callback only reports what *changed* — deciding from one batch leaves the nav
  highlight stale. This was a real bug once; don't "simplify" it back.
- **Hairline dividers use `gap-px` over a ruled background**, not `nth-child`
  border overrides. The nth-child version broke at breakpoints.
- **Fade-ins default to `opacity: 0`.** `index.html` carries a `<noscript>`
  block forcing them visible. Keep it.
- `.claude/skills/` and `.claude/settings.local.json` are tooling, not app code.
  `npx oxlint src` scopes lint to the app; bare `npm run lint` also walks the
  skill scripts and reports their warnings.

# Project Directives & Design Authority

## 0. Design Authority (governs everything below)

Ramiro's instruction, verbatim: *"Prioritize making a good design like the ones I
tell you to over following the CLAUDE.md."*

That is the ranking. When a reference Ramiro names, or a design decision he has
already approved, conflicts with a rule in this file, **the design wins** — build
it, then record the exception in §3 with the reason. This file exists to stop
generic AI-portfolio defaults, not to override Ramiro's own direction.

Two limits on that latitude:

- **Accessibility is not up for override.** Semantic elements, `:focus-visible`
  states, ARIA labels, and a `prefers-reduced-motion` path for every effect stay
  mandatory. An effect that cannot degrade gracefully does not ship.
- **Ask before reverting.** Anything in §3 was a deliberate call. Do not "fix" it
  back into compliance; if you think it is wrong, raise it with Ramiro first.

`HANDOFF.md` at the repo root is the authority on current project state and on
which decisions are settled.

## 1. Skill Invocations & Methodology
- **Visual Design & Typography:** Strictly consult and apply the rules from `taste` and `ui-ux-pro-max-skill`.
- **Engineering & Standards:** Adhere to `web-design-guidelines` for semantic structure, performance, and accessibility.
- **Component Sourcing:** Use `magic-mcp` to source production-ready components instead of generating standard UI from scratch.
- **Visual QA:** Use `playwright-cli` to capture full-page desktop and mobile renders to visually audit output before finalizing.

## 2. Hard Negative Constraints (Anti-Patterns)
Default anti-patterns. They hold unless §0 applies and the exception is logged in
§3. Regardless of suggestions from skills or training defaults, do not include:
- Glowing purple/cyan gradient text, neon border glows, or decorative particle canvas backgrounds.
- Floating decorative shapes (e.g., blurred blobs) or generic background grids.
- Generic filler copy (e.g., "Passionate developer crafting modern experiences") or percentage-based skill meters.
- Clickable non-semantic `div` elements lacking ARIA labels or `:focus-visible` states. **(Not overridable — see §0.)**
- Continuous looping animations, auto-typing hero headers, or scroll-jacking.
- Document- or blog-style layouts. This page is sections, cards, and bento —
  four document-style drafts were rejected on exactly this ground.

## 3. Approved Exceptions (granted 2026-08-26)

The following violate §2 **deliberately**, under §0. Do not revert them without
asking.

- **Blinking terminal caret** (`.caret` in `src/index.css`) — a continuous loop.
  Requested by name; it is what makes the hero read as a terminal. It holds
  solid under `prefers-reduced-motion`.
- **Typewriter effect** on the hero — the command `whoami`, and, since
  2026-08-28, the headline itself: the cursor blinks alone on an empty line and
  then writes the name out character by character. Ramiro asked for this
  sequence directly. The rest of the hero waits for it and then fades in.
- **Section numbers** (`// 01`, `// 02`, …) — the nav's own idiom, serving
  wayfinding rather than decoration.

Everything else in §2 still stands: no gradient text, no neon glow, no particle
canvases, no floating blobs, no filler copy, no percentage skill meters, no
unlabelled clickable `div`s.

See `HANDOFF.md` at the repo root for full project state.

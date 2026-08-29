# Project Directives & Design Authority

## 1. Skill Invocations & Methodology
- **Visual Design & Typography:** Strictly consult and apply the rules from `taste` and `ui-ux-pro-max-skill`.
- **Engineering & Standards:** Adhere to `web-design-guidelines` for semantic structure, performance, and accessibility.
- **Component Sourcing:** Use `magic-mcp` to source production-ready components instead of generating standard UI from scratch.
- **Visual QA:** Use `playwright-cli` to capture full-page desktop and mobile renders to visually audit output before finalizing.

## 2. Hard Negative Constraints (Anti-Patterns)
Regardless of suggestions from skills or training defaults, NEVER include:
- Glowing purple/cyan gradient text, neon border glows, or decorative particle canvas backgrounds.
- Floating decorative shapes (e.g., blurred blobs) or generic background grids.
- Generic filler copy (e.g., "Passionate developer crafting modern experiences") or percentage-based skill meters.
- Clickable non-semantic `div` elements lacking ARIA labels or `:focus-visible` states.
- Continuous looping animations, auto-typing hero headers, or scroll-jacking.

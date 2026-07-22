---
name: capachica-design
description: Use this skill to generate well-branded interfaces and assets for Capachica Turismo — a community tourism platform for Capachica, Puno, Peru. Contains essential design guidelines, rustic Andean color tokens, typography, and UI components for prototyping or production work.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

Key design principles to internalize from README.md:
- **Earthy & rustic**: deep earth-brown backgrounds (#100806), terracotta clay accents (#B8531F), alpaca-cream text (#F5EDD8)
- **No digital/techy feel**: no round pills for buttons, no navy, no neon — everything pulls from the physical Andean landscape
- **Typography**: Playfair Display (headings), Lora (body), Josefin Sans (UI labels — uppercase, letter-spaced)
- **Border-radius**: 6px default (angular, not pill), 4px for small elements
- **Andean weave**: use `repeating-linear-gradient` pattern as section dividers
- **Grain texture**: SVG fractalNoise overlay on dark surfaces

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

When building new UI, always reference:
1. `tokens/colors.css` — full palette + semantic aliases
2. `tokens/typography.css` — type scale
3. `tokens/spacing.css` — spacing, radii, shadows
4. `tokens/textures.css` — grain + weave patterns
5. `components/core/` — Button, Card, Badge, Tag, SectionLabel
6. `ui_kits/turismo/index.html` — the full homepage as a visual reference

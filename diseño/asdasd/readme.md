# Capachica Design System

> **Visual identity for Capachica Turismo** — the community tourism platform for Capachica, a quechua peninsula on the shores of Lago Titicaca, Puno, Peru (3,820 msnm).

---

## Sources

- **GitHub repo**: [Iosef296/CAPACHICA](https://github.com/Iosef296/CAPACHICA) — full project with backend (Node/Express), IA chatbot, and Astro frontend
- **Frontend path**: `PROYECTO NUEVO/frontend mejorado/` — Astro 6 + React 19 + Tailwind, port 4322
- **Backend API**: Node.js / Express 5, port 3000
- **IA chatbot**: OpenRouter-powered, port 5000

The reader is encouraged to explore the GitHub repository to find additional components, backend routes, and CMS configuration that may inform more accurate UI recreation.

---

## Product Context

Capachica is an 8-community quechua peninsula 80 km from Puno, Peru. The site is a **community tourism platform** offering:

| Section | Description |
|---|---|
| **Vivencial** | Stay with local families, learn Andean life |
| **Actividades** | Kayak, fishing, horseback riding, climbing |
| **Gastronomía** | Trucha, quinua, chuño — altiplano cooking |
| **Festividades** | Virgen Candelaria, Inti Raymi, local festivals |
| **Artesanía** | Aguayos, chullos, traditional weaving |
| **Destinos** | Llachón beach, Ticonata island, Amaru viewpoint |
| **Alojamiento** | Host family homestays |
| **Cómo Llegar** | Lima → Juliaca → Puno → Capachica directions |

Tech stack: Astro SSR + React islands + dual backend (TypeORM + pg Pool). IA chatbot handles multilingual reservations (ES/EN/FR/JA/KO/QU/PT) + WhatsApp notifications.

---

## Content Fundamentals

**Tone**: Warm, authentic, poetic. Speaks directly to the traveler ("Vive con familias quechuas", "Descubre Capachica"). Uses second-person "tú" intimacy without being overly casual.

**Language**: Spanish primary, with multilingual support (English, French, Japanese, Korean, Quechua, Portuguese).

**Casing**: Sentence case for headings. ALL CAPS with letter-spacing for section labels and UI tags.

**Copy style**: Short, evocative phrases. Strong verbs. Example: *"Trucha del lago, quinua nativa, chuño ancestral"* — not a sentence, a lived experience.

**Emoji**: Used sparingly for wayfinding and decoration (🌊 🏔️ 🎊 🧶). Not used inline in body copy.

**Numbers as anchors**: Altitude (3,820 msnm), distance (80 km), history (500+ años) are used as credibility signals.

**Brand voice**: Humble, community-first. "100% ingresos a comunidades locales" is a pride point. The word *vivencial* (experiential) is central to the identity.

---

## Visual Foundations

### Color vibe
Deep warm earth tones — the terracotta clay of Andean soil, the warm amber of altiplano sunsets, the deep lake blue of Titicaca, and alpaca-cream text on dark earthy backgrounds. **Not cold or digital** — no navy, no cyan, no neon. Every hue pulls from the physical landscape.

### Typography
- **Display**: Playfair Display — elegant, literary, slightly weathered. Used for all headings.
- **Body**: Lora — grounded, readable serif. Replaces Crimson Pro for a sturdier rustic feel.
- **UI/Labels**: Josefin Sans — clean geometric, good contrast against the ornate serifs.
- Heading sizes: very large (`clamp(3rem, 8vw, 6.5rem)` for hero). Body text generous at 15-16px.

### Spacing & Layout
- Section padding: 80–96px vertical
- Container max: 1200px with 24px horizontal padding
- Grid: CSS Grid with `auto-fill` / `minmax(280px, 1fr)` for responsive card grids

### Backgrounds
- Primary dark: `#100806` — deep night-earth
- Section variation: `#180C06`, `#201008`
- **Grain overlay**: SVG noise filter at ~5% opacity gives a paper/stone texture
- No gradients to sky/navy — all gradients stay in the warm earth range

### Cards
- Background: `rgba(26, 10, 4, 0.85)` — dark earth surface
- Border: `1px solid rgba(184, 83, 31, 0.24)` — warm clay border
- Border-radius: `6px` — slightly angular, not round-pill
- Hover: `translateY(-4px)` + warm clay glow shadow
- No glass-morphism; solid, grounded surfaces

### Buttons
- **Primary**: clay gradient (`#B8531F → #7C2D0C`), `6px` radius, no pill
- **Outline**: warm gold border, transparent fill → fill-on-hover
- **Ghost**: text-only, warm color, arrow suffix
- No pill-shape buttons on desktop; pills only on mobile tags/badges

### Borders & Dividers
- Standard: `1px solid var(--border)` — thin warm-clay line
- **Andean weave border**: repeating gradient of clay/gold/reed for accent dividers
- Section dividers: thin line + decorative diamond ornament (CSS only)

### Shadows
- All shadows warm-tinted: `rgba(16, 8, 4, ...)` — not neutral grey
- Glow shadows: warm orange-clay or gold for interactive elements
- No cool/blue drop shadows

### Animations
- Gentle, deliberate: `0.3s ease` for micro-interactions, `0.55s` for reveal animations
- Scroll-triggered `fadeUp`: `opacity 0 → 1` + `translateY(24px → 0)`
- No bouncy or playful easing — the landscape feels timeless

### Hover states
- Cards: lift (`translateY(-4px)`) + warm glow
- Buttons: darker gradient + `translateY(-2px)` + stronger glow
- Links: color shift to `var(--warm)`
- Nav items: warm fill background

### Corner radii
- Default: `6px` (most cards, buttons)
- Small: `4px` (badges, tags)
- Pill: `999px` (only for small inline tags/chips)
- Zero: `0` (weave borders, textile-pattern accents)

### Iconography
See ICONOGRAPHY section below.

### Imagery
- Color vibe: warm, golden-hour toned. Avoid cold filters.
- Content: lake landscapes, traditional textiles, family life, food, festivities
- No stock photography feel — candid, authentic

### Pattern/texture language
- **Andean weave stripe**: repeating 4-color gradient (clay/gold/reed) used as accent borders
- **Grain overlay**: SVG fractal noise at low opacity on dark surfaces
- **Sun ornament** (`✦` or `◆`) used as section markers and dividers

---

## Iconography

The codebase primarily uses **emoji as icons** (🏠 🚣 🍽️ 🎊 🧶 🏔️ etc.) for section categories, and **SVG inline icons** (hand-coded) for UI controls (hamburger, close, arrows). No external icon font/library is used.

**Approach**:
- Category icons: emoji (☀️ 🌊 🏔️ 🎊 🧶 🚌 📅 🤝 💚)
- UI icons: minimal inline SVG paths (chevrons, X, hamburger, arrow)
- No Lucide, Heroicons, or other CDN icon library is used in the codebase

**Recommendations for improvement**:
- Consider replacing emoji category icons with custom SVG illustrations inspired by traditional Andean symbols (sun, mountain, wave, loom)
- A custom icon set using the weave/textile aesthetic would reinforce the rustic brand

---

## File Index

```
styles.css                  ← root entry, @import only
tokens/
  fonts.css                 ← @font-face + font family vars
  colors.css                ← full color palette + semantic aliases
  typography.css            ← size scale, leading, tracking, weights
  spacing.css               ← space scale, radii, shadows, z-index
  textures.css              ← grain, weave patterns, texture utilities
guidelines/
  colors-primary.card.html  ← Clay + Gold swatches
  colors-nature.card.html   ← Lake + Reed + Earth palettes
  colors-semantic.card.html ← Semantic token reference
  type-display.card.html    ← Display & heading specimens
  type-body.card.html       ← Body text specimens
  type-scale.card.html      ← Full type scale ramp
  spacing-radii.card.html   ← Spacing scale + border-radius
  shadows.card.html         ← Shadow + glow system
  textures.card.html        ← Grain + weave pattern specimens
  brand-overview.card.html  ← Brand overview / color palette
components/
  core/
    Button.jsx + .d.ts      ← Primary, Secondary, Ghost, Danger
    Card.jsx + .d.ts        ← Destination & Experience cards
    Badge.jsx + .d.ts       ← Status badges
    Tag.jsx + .d.ts         ← Inline category tags
    SectionLabel.jsx + .d.ts← Section eyebrow labels
    buttons.card.html       ← Component card: Buttons
    cards.card.html         ← Component card: Cards
    badges.card.html        ← Component card: Badges + Tags
ui_kits/
  turismo/
    index.html              ← Full homepage recreation
readme.md                   ← This file
SKILL.md                    ← Agent skill entrypoint
```

---

## Components

| Component | Location | Description |
|---|---|---|
| `Button` | `components/core/` | Primary, Secondary, Ghost, Danger; sm/md/lg |
| `Card` | `components/core/` | Destination card with gradient bg + hover |
| `Badge` | `components/core/` | Status / category indicator |
| `Tag` | `components/core/` | Inline chip / filter tag |
| `SectionLabel` | `components/core/` | Eyebrow label with earthy border |

---

## UI Kits

| Kit | Location | Description |
|---|---|---|
| **Turismo Homepage** | `ui_kits/turismo/index.html` | Full rustic homepage — hero, sections, footer |

---

## Caveats

- No actual image assets were available in the repo (public/images/ was empty); the UI kit uses gradient placeholders. Add real photos to `assets/images/` for production.
- The campfire animation (campfire.png / campfire.gif) from the public folder was referenced but not importable — placeholders used.
- Font substitution: original site used `Crimson Pro` for body; replaced with **Lora** for a sturdier rustic feel. Swap back if needed in `tokens/fonts.css`.
- The IA chatbot widget (`ChatWidget.tsx`) and full admin panel are not included in the UI kit, only the static design layer.

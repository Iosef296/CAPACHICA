---
name: Andean Contemporary Intelligence
colors:
  surface: '#f8f9fe'
  surface-dim: '#d8dadf'
  surface-bright: '#f8f9fe'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3f8'
  surface-container: '#eceef2'
  surface-container-high: '#e7e8ed'
  surface-container-highest: '#e1e2e7'
  on-surface: '#191c1f'
  on-surface-variant: '#41474f'
  inverse-surface: '#2e3134'
  inverse-on-surface: '#eff1f5'
  outline: '#717880'
  outline-variant: '#c1c7d0'
  surface-tint: '#166395'
  primary: '#004268'
  on-primary: '#ffffff'
  primary-container: '#005a8c'
  on-primary-container: '#9fd0ff'
  inverse-primary: '#95ccff'
  secondary: '#9d4320'
  on-secondary: '#ffffff'
  secondary-container: '#fd8c63'
  on-secondary-container: '#742503'
  tertiary: '#810031'
  on-tertiary: '#ffffff'
  tertiary-container: '#ac0044'
  on-tertiary-container: '#ffb8c3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cde5ff'
  primary-fixed-dim: '#95ccff'
  on-primary-fixed: '#001d32'
  on-primary-fixed-variant: '#004a75'
  secondary-fixed: '#ffdbcf'
  secondary-fixed-dim: '#ffb59b'
  on-secondary-fixed: '#380d00'
  on-secondary-fixed-variant: '#7e2c0a'
  tertiary-fixed: '#ffd9de'
  tertiary-fixed-dim: '#ffb2be'
  on-tertiary-fixed: '#400014'
  on-tertiary-fixed-variant: '#900038'
  background: '#f8f9fe'
  on-background: '#191c1f'
  surface-variant: '#e1e2e7'
typography:
  display-lg:
    fontFamily: EB Garamond
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: EB Garamond
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: EB Garamond
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
  headline-md:
    fontFamily: EB Garamond
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-padding: 24px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 40px
  gutter: 16px
---

## Brand & Style
The design system establishes a "Modern Andean Contemporary" aesthetic, bridging the gap between ancient Titicaca traditions and forward-thinking AI technology. It is a premium, immersive experience designed for high-end travelers and cultural explorers. 

The brand personality is **Majestic, Scholarly, and Intuitive**. It moves away from cold tech-minimalism toward a **Tactile Glassmorphism** style—where the clarity of modern interfaces meets the warmth of organic, earthy textures. The emotional response should be one of "Guided Discovery"—feeling both grounded by the earth (Terracotta/Slate) and elevated by the sky and water (Deep Blue/AI overlays).

## Colors
The palette is rooted in the landscape of the Capachica Peninsula.
- **Deep Titicaca Blue (#005A8C):** Used for primary actions, headers, and the core identity of the Killa AI.
- **Earthy Terracotta (#C05D38):** Used for structural elements, secondary buttons, and icons representing community and land.
- **Andean Textile Pink (#E91E63):** A high-energy accent for notifications, active states, and critical CTA highlights.
- **Sun Gold (#FFC107):** Reserved for "Premium" or "Gold" tier experiences and AI "spark" moments.
- **Backgrounds:** We avoid pure white. Use `Warm Off-White` for content areas to reduce eye strain and `Light Slate` for secondary containers to provide a contemporary architectural feel.

## Typography
The typography pairing reflects the "Tradition meets AI" narrative. 
- **Headlines (EB Garamond):** A classic, elegant serif that evokes the luxury of editorial travel journals and historical prestige. 
- **UI & Body (Hanken Grotesk):** A sharp, contemporary sans-serif that ensures high legibility for AI data and technical interactions.
- **Styling:** Use all-caps with generous letter spacing for `label-md` to denote section headers or categories, creating a sophisticated architectural rhythm.

## Layout & Spacing
This design system utilizes a **Fluid Grid** optimized for mobile-first luxury. 
- **Margins:** A generous 24px side margin ensures content feels "breathable" and premium.
- **Rhythm:** An 8px base unit drives all spacing. Use `stack-lg` (40px) to separate major content blocks to emphasize the minimalist, high-end feel.
- **AI Focus:** Centralize AI interactions within "Safe Areas" that use backdrop blurs, ensuring the user feels the interface is floating over the majestic imagery of the landscape.

## Elevation & Depth
Depth is achieved through a combination of **Ambient Shadows** and **Glassmorphism**:
- **Level 1 (Base):** Off-white background.
- **Level 2 (Cards):** Surface color with a 24px corner radius and a soft, wide-dispersion shadow (`y-10, blur-30, opacity-0.05`) using a Primary Blue tint.
- **Level 3 (Overlays/AI):** Killa AI panels use a 70% opacity white fill with a `20px backdrop-blur`. This represents the "mist" of the Andes, creating a lens through which data is viewed.
- **Outlines:** Use 1px borders in Earthy Terracotta at 10% opacity for subtle definition without breaking the soft aesthetic.

## Shapes
Shapes are intentionally soft to mimic the eroded stones of the Andes and the fluidity of Lake Titicaca. 
- **Standard Radius:** 24px for all primary cards and modal containers.
- **Button Radius:** 16px to create a "squircle" feel that is tactile and inviting.
- **Patterns:** Integrate subtle SVG masks of Andean geometric patterns (Chakana) within the corners of large containers to reinforce cultural identity.

## Components
- **Buttons:** Large (min-height: 56px). Primary buttons use a subtle vertical gradient from Deep Blue to a slightly lighter navy. Secondary buttons use a hollow "ghost" style with a 2px Terracotta border.
- **Cards:** 24px radius. Content should be padded by 24px. Use high-quality photography as the background for cards, using a "Glass" footer at the bottom for text.
- **Chips/Filters:** Pill-shaped with a 1px border. When active, fill with Textile Pink to provide a vibrant contrast against the neutral background.
- **Killa AI Input:** A floating text field at the bottom of the screen with a heavy backdrop blur and a "Sun Gold" glow effect when the AI is processing.
- **Iconography:** Use 2px stroke weight for icons. Mix standard navigation icons with custom-drawn Andean motifs for category indicators (e.g., a stylized Sun for "Weather" or a llama profile for "Experience").
- **Lists:** Clean, separated by 1px Slate dividers with generous 20px vertical padding per item.
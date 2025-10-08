---
description: Tailwind-first token source consolidation plan
---
# Current Token Systems
- **`components/ui/gluestack-ui-provider/config.ts`** Sets NativeWind CSS variables through `vars()`. Holds the canonical hex values for primary, secondary, sentiment, background, and status palettes for both light and dark modes. The values are repeated verbatim across modes and live only in this React Native provider.
- **`components/ui/gluestack-ui-provider/index.tsx`** Creates the Gluestack design system runtime using `createConfig()`. Re-defines colors, spacing, and radii without referencing the CSS variables from `config.ts`, so any palette tweaks must be applied twice.
- **`tailwind.config.js`** Extends the NativeWind preset and maps Tailwind color utilities (e.g., `bg-primary-500`) to the `--color-*` CSS variables exposed by `config.ts`. Adds extra literal colors (`white`, `black`, `light`, `dark`) that bypass the variable system.
- **`constants/ui-tokens.ts`** Provides runtime numbers for icons, gauges, spacing, and also embeds an independent color palette used for SVGs/Reanimated logic (e.g., `COLORS.success[500]`). Only partially aligned with the Gluestack/Tailwind values.
- **`tsconfig.json`** Adds a `tailwind.config` path alias so TypeScript code can import the Tailwind configuration directly. This allows reuse of design tokens at build time, but it is rarely exercised today and brings CJS/TS interop friction.

# Consistency Risks
- **Palette duplication**: Brand and status colors exist in `config.ts`, `index.tsx`, `tailwind.config.js`, and `constants/ui-tokens.ts`. Divergence is already visible (`COLORS.success[500]` is `#22c55e` while Tailwind/NativeWind uses `rgb(16 185 129)`).
- **Spacing mismatch**: The Gluestack `space` scale in `index.tsx` mirrors—but does not reference—the runtime `SPACING` map in `constants/ui-tokens.ts`. Future edits could desync component padding from tokens used in calculations.
- **Dark mode drift**: Only `config.ts` defines dark variants. Tailwind classes and runtime helpers rely on those variables indirectly; any future dark-specific tokens added elsewhere would not propagate unless manually duplicated.
- **Import ergonomics**: Pulling Tailwind data into runtime code through the `tailwind.config` alias requires CJS interop and increases bundle size. Teams may avoid it, opting to recreate constants locally.

# Tailwind-First Consolidation Strategy
- **Single palette source of truth**
  - Create `constants/design-palette.js` exporting plain JS objects for brand, neutrals, sentiments, and background color ramps. Keep it framework-agnostic so `tailwind.config.js` can `require()` it.
  - Add `constants/design-palette.ts` that re-exports the same data with TypeScript typing for app code. The `.ts` file should only `import { palette } from './design-palette.js'` to avoid duplication.
  - Update `config.ts`, `tailwind.config.js`, and `constants/ui-tokens.ts` to consume the palette rather than embedding raw literals. Any color additions then flow through all layers automatically.
- **Expose Tailwind-friendly helpers**
  - Add a `constants/ui-tailwind.ts` helper that maps semantic states to Tailwind class strings (e.g., `{ success: 'bg-success-500 text-background-0' }`). Components can prefer classNames while logic can still import plain strings when necessary.
  - For runtime-only code (SVG/Reanimated), expose a `getTokenColor('success', 500)` utility that reads from the shared palette. Avoid defining new hex codes outside that helper.
- **Align spacing and radii**
  - Derive the Gluestack `space` and `radii` tokens from the same shared scale defined in `constants/ui-tokens.ts` (or vice versa). Consider representing spacing as a numeric scale that both Tailwind (via `theme.extend.spacing`) and runtime constants import.
  - Document the pixel-to-class mapping (`SPACING.lg -> px-4`) in `planned-changes/nativewind-token-alignment-plan.md` to reinforce className usage first.
- **Centralize mode-aware variables**
  - Keep `config.ts` responsible for generating NativeWind `vars`, but build its light/dark objects from the shared palette plus optional mode overrides. This avoids duplicated color ramps while retaining the ability to diverge per theme if required later.
- **Clarify usage guidelines**
  - Update contributor docs to state: "Use Tailwind/NativeWind classNames when styling supported props. Use runtime tokens only for SVG, animation math, or when Tailwind lacks a utility." Point to the shared helpers for sentiment/background tokens.

# Implementation Sequence
- **Step 1 – Extract palette**: Move current hex values from `config.ts` into `constants/design-palette.js` and reference them in Tailwind and Gluestack providers. Validate that `tailwind.config.js` still resolves colors at build time.
- **Step 2 – Sync runtime tokens**: Replace the literal color entries in `constants/ui-tokens.ts` with imports from the shared palette and remove redundant definitions in `index.tsx` (use Tailwind classes for surface/background colors where possible).
- **Step 3 – Harmonize spacing**: Define a single spacing scale (JS object) consumed by `tailwind.config.js` (`theme.extend.spacing`), Gluestack `space`, and runtime constants.
- **Step 4 – Authoring guardrails**: Add checklist items (PR template / lint rule) that flag new hex literals outside the shared palette and encourage Tailwind class usage.
- **Step 5 – Optional automation**: Consider a Jest snapshot or custom lint that diffs Gluestack/Tailwind tokens against the shared palette to catch regressions early.

# Operational Notes
- Favor Tailwind classNames for layout, spacing, colors, and typography on NativeWind-supported components.
- Restrict runtime-only tokens to numeric values or scenarios where Tailwind utilities cannot apply (SVG stroke widths, animation calculations, etc.).
- Whenever a new token is required, add it to the shared palette/scale first, then expose it through Tailwind utilities and runtime helpers rather than inlining values.

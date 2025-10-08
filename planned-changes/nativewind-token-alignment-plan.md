---
description: NativeWind and runtime token alignment plan
---
# Objective
Clarify how the Tailwind/NativeWind system and `constants/ui-tokens.ts` work today, what can be shared between them, and how to keep their values aligned.

## Systems Overview
- **Tailwind / NativeWind stack** Provides class-based utilities via `className`. Values originate from `tailwind.config.js`, which extends Gluestack presets and CSS variables (`--color-*`). Ideal for styling standard React Native primitives that NativeWind supports (e.g., `View`, `Text`, `Pressable`).
- **Runtime UI tokens (`constants/ui-tokens.ts`)** Exports TypeScript constants (size numbers, spacing, sentiments) consumed directly inside components. Required for logic-driven styling such as SVG gauges, Reanimated animations, or calculations that Tailwind cannot express.

## Shareable Elements
- **Color palette source** Maintain hex values in a neutral module (e.g., `constants/design-palette.ts`). `tailwind.config.js` can `require` this file while `constants/ui-tokens.ts` re-exports needed colors, keeping class utilities (`bg-success-500`) and runtime constants (`COLORS.success[500]`) in sync.
- **Semantic sentiment mapping** Define the sentiment-to-color dictionary once, then expose Tailwind class names (e.g., `bg-success-600`) alongside runtime hex strings so UI components and utility classes communicate the same state.
- **Spacing scale documentation** Publish a single spacing table mapping Tailwind tokens (`px-4`, `gap-6`) to pixel counts used in runtime calculations. This ensures everyone references identical spacing decisions even when Tailwind cannot apply directly.

## Non-shareable Elements
- **Runtime-only numeric tokens** Items such as `ICON_SIZES`, `GAUGE_SIZES`, `HEADER_HEIGHTS`, or timing values must stay in TypeScript because NativeWind cannot inject numbers into JS logic or unsupported style props.
- **SVG and animation styling** Tailwind classes do not affect `react-native-svg` elements or Reanimated `useAnimatedStyle` outputs. Keep gradients, stroke widths, and animated transforms defined with runtime constants.
- **Conditional or computed styles** Anything derived from state (e.g., gradient intensity, dynamic padding) needs to remain in the runtime layer, with Tailwind reserved for static styling.

## Alignment Plan
- **Audit and normalize colors** Compare `COLORS` in `constants/ui-tokens.ts` with the Tailwind palette powered by Gluestack variables. Update discrepancies and add tests or lint checks if possible.
- **Introduce shared palette module** Create `constants/design-palette.ts` exporting plain JS objects (no TS-only syntax) so both Tailwind config and runtime tokens import from a single source.
- **Document utility mappings** Extend `planned-changes/styling-utility-conversion-plan.md` with a matrix showing runtime tokens versus recommended Tailwind classes. Call out exceptions requiring inline styles.
- **Guardrails for new tokens** Update the PR template or contributor checklist: "If you add or tweak a color/size, update the shared palette or explain why it's runtime-only." Encourage `className` usage first, with tokens as a fallback.
- **Future automation** Consider a lint rule or script that diff-checks palette files against Tailwind config to flag drift early (run via `npm run lint` or CI once implemented).

## Usage Guidance
- **Prefer Tailwind/NW utilities** Use `className` for layout, spacing, and colors whenever NativeWind supports the prop. Benefits: theming, dark mode, tokens from Gluestack.
- **Reach for runtime tokens** When dealing with SVGs, animated styles, or numeric calculations (e.g., arc length, header heights), import from `constants/ui-tokens.ts` to guarantee runtime availability.
- **Validate new designs** During design reviews, confirm whether a requirement fits NativeWind utilities. If not, capture the gap in this plan so future automation or preset work can address it.

---
description: Add gradient background support to Review header
---

# Objective
Deliver a repeatable approach for rendering the review header with the brand gradient instead of the solid `COLORS.background[950]` fallback. Keep the solution reusable for other screens that rely on `AnimatedHeader`.

## Current Behavior
- **AnimatedHeader** `components/common/AnimatedHeader.tsx` accepts only a `backgroundColor` prop and falls back to `COLORS.background[950]`.
- **ReviewScreen** `app/review.tsx` renders the header via `AnimatedHeader` but does not override the default background. Visible result is a dark solid header contrasting with the white body.
- **BrandGradient** `components/common/BrandGradient.tsx` already wraps `expo-linear-gradient` with brand colors but is unused by the header.

## Proposed Changes
- **[Step 1] Token audit** Document gradient token usage in `constants/ui-tokens.ts` and confirm the `BrandGradient` color stops align with design expectations. Decide whether we need named gradient tokens (e.g., `GRADIENTS.brand`).
- **[Step 2] AnimatedHeader refactor**
  - Add optional props to support gradient rendering (e.g., `backgroundVariant?: 'solid' | 'brandGradient'` or accept `gradientProps`).
  - Internally wrap the header container with `BrandGradient` when gradient props are provided; maintain the existing solid color fallback for backwards compatibility.
  - Ensure Reanimated styles still apply when the header is wrapped (likely move animated padding into an inner container).
- **[Step 3] ReviewScreen update** Pass the new gradient variant/props from `app/review.tsx` so the review header renders with the brand gradient.
- **[Step 4] Cross-screen check** Search for other `AnimatedHeader` usages to decide if they should adopt the gradient or stay solid. Document defaults in component JSDoc.
- **[Step 5] Documentation & design tokens** Update `docs/design-token-system.md` (or add a new section) with guidance on when to use the gradient vs. solid backgrounds. If gradient tokens are introduced, reflect them in Tailwind/NativeWind docs.

## Deliverables
- Updated `AnimatedHeader` implementation supporting gradient backgrounds without breaking existing solid use cases.
- Review header using brand gradient by default.
- Documentation covering gradient token usage and component props.

## Validation & QA
- **Visual**: Run `npx expo start` and verify the review header gradient across scroll states (expanded and collapsed).
- **Regression**: Check any other screens using `AnimatedHeader` to confirm they retain their intended backgrounds.
- **Accessibility**: Validate contrast of title/subtitle text against the gradient stops.

## Follow-ups / Nice-to-haves
- Consider exposing gradient choices via theme tokens for future dark-mode or seasonal themes.
- Evaluate whether `BrandGradient` should accept semantic names instead of raw stop arrays for consistency with tokens.

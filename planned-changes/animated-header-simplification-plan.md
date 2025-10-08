---
description: animated header simplification tailored to review screen
---

# Summary

- **Problem** `components/common/AnimatedHeader.tsx` carries options (background variants, icon controls, positioning branches) that `app/review.tsx` no longer needs, making updates fragile.
- **Goal** Deliver a lean header purpose-built for the review flow while preserving the scroll-driven collapse powered by `hooks/use-animated-header.ts`.

# Current Usage Snapshot

- **Review screen** `app/review.tsx` mounts the header with brand gradient styling, title/subtitle text, and a `CircularScoreGauge` rendered inline.
- **Practice screen** `app/(tabs)/practice.tsx` will drop the header, leaving `AnimatedHeader` without multi-screen consumers.
- **Shared hook** `hooks/use-animated-header.ts` supplies the animated height and container style that the header should continue to respect.

# Simplification Principles

- **Single variant** Lock the background to the brand gradient from `components/common/BrandGradient.tsx`; remove `backgroundVariant` and `backgroundColor` props.
- **Purpose-built slots** Accept `title`, `subtitle`, and a single `metricContent` React node; eliminate `rightContent`, `centerContent`, and `topRightIcon` branches.
- **Token-first layout** Replace inline spacing/radius values with Tailwind utilities backed by tokens, reserving inline styles only for animated font sizing.
- **Centralized animation math** Compute title/subtitle scale and opacity once from the shared height value; avoid per-branch `interpolate` calls.

# Implementation Plan

1. **Create dedicated component** Move the header into `components/review/ReviewHeader.tsx`, wrapping `BrandGradient` and Reanimated text/view primitives configured for NativeWind classes.
2. **Simplify props** Define a narrow `ReviewHeaderProps` contract (`height`, `title`, `subtitle`, `metricContent`), dropping unused options and re-exporting types where necessary.
3. **Refactor layout** Use flexbox (no `position: absolute`) to place the metric content below the title; rely on class utilities like `items-center` to handle alignment.
4. **Update consumers** Swap `AnimatedHeader` for the new component inside `app/review.tsx`; remove related imports/props from `app/(tabs)/practice.tsx` as that screen retires the header.
5. **Retire legacy file** Delete or convert `components/common/AnimatedHeader.tsx` to a temporary re-export that warns if used elsewhere, then clean up once no references remain.
6. **Adjust hook defaults** Ensure `hooks/use-animated-header.ts` height defaults align with the review layout and export any shared constants (`HEADER_HEIGHTS`) from `constants/ui-tokens.ts`.

# Validation

- **Visual QA** Launch the iOS simulator (`npx expo start`) and confirm the header collapses smoothly while keeping typography legible.
- **Type safety** Run `npm run lint` to catch lingering prop references or unused imports after removal.
- **Design review** Verify background gradient, text contrast, and metric positioning against design mocks or existing screenshots.

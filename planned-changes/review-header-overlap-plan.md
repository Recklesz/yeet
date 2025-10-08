---
description: review screen header overlap mitigation
---

## Observations
- Animated header wraps a `CircularScoreGauge` that is 160px tall while `HEADER_HEIGHTS.min` is 140, so the gauge clips when collapsed.
- `Animated.ScrollView` in `app/review.tsx` uses a hard-coded `pt-60` (~240px) top padding that does not account for the actual header height plus safe-area inset, causing the first content block to sit under the header.

## Mitigation Steps
1. **Recalculate header heights**
   - Bump `HEADER_HEIGHTS.min` to at least the gauge size plus interior padding (e.g., 180px) or compute it from `GAUGE_SIZES.default` so the score widget always fits when collapsed.
   - Optionally expose a `minHeight` prop override on the review screen so future gauge changes do not require token edits.
2. **Align scroll padding with header**
   - Replace `contentContainerClassName="pt-60"` with a runtime-calculated padding that adds `HEADER_HEIGHTS.max + topInset + extraSpacing`.
   - Use `useSafeAreaInsets()` inside `ReviewScreen` or extend `useAnimatedHeader` to return a `contentPaddingTop` helper.
3. **Spacing polish**
   - Add a small bottom spacer under the header (e.g., `pb-4`) so the first card never feels pinched when the header is fully collapsed.
   - Ensure the header container keeps `overflow: visible` off to avoid accidental clipping shadows.

## Validation
- Test on 14/15/Pro Max simulators to cover different notch sizes.
- Scroll from top to bottom verifying the gauge remains fully visible and the metric grid never tucks under the header.
- Confirm landscape and dark mode still look correct after token updates.

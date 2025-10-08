---
description: migrate components from inline style + className mix to utility-first styling
---

# Objective
- **Unify styling** Prefer NativeWind/Tailwind utilities in place of static inline styles wherever feasible to keep our styling declarative and token-driven.

# Targets
- **BrandGradient wrapper** `components/common/BrandGradient.tsx`
  - Replace the static `style={{ overflow: 'hidden' }}` with `className={cx('overflow-hidden', className)}`.
  - Ensure we keep `flex: 1` on the inner `LinearGradient` via utilities (`className="flex-1"`), using `style` only for props passed in by consumers when necessary.
- **CustomHeader backgrounds** `components/common/CustomHeader.tsx`
  - Move the hard-coded `backgroundColor` hex to a Tailwind utility (`bg-[#1a1f36]`).
  - Leave `paddingTop: insets.top` inline because it is dynamic; everything else should move to `className`.
  - Confirm nested `Box` elements rely on utilities (`px-5`, `pb-6`, etc.) instead of inline padding.

# Out of Scope (retain inline styles)
- **Animated transforms / dynamic sizing**
  - `app/review.tsx`: `style={[headerStyle]}` contains animated transitions.
  - `components/common/AnimatedHeader.tsx`: animated layout styles and computed heights.
  - `components/review/CircularScoreGauge.tsx`: runtime `width`/`height` depend on gauge size tokens.
- **Props forwarding on LinearGradient**
  - Retain `{...props}` support so consumers can still attach custom styles when needed; this plan only removes our static inline defaults.

# Next Steps
- **Implement** scoped refactors in `BrandGradient` and `CustomHeader` to rely solely on utilities for all static styling concerns.
- **Verify** visual parity on Review and Explore screens after the change, focusing on rounded gradient containers and header spacing.

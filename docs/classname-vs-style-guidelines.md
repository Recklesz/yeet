# Styling with `className` vs `style`

## Use `className` when the value is static or token-based
- **Layout & spacing** Use Tailwind/NativeWind utilities for flexbox, padding, margin, gap, alignment, and positioning (e.g. `app/review.tsx` scroll container, `components/review/CircularScoreGauge.tsx` overlay).
- **Color & radius tokens** Prefer utilities such as `bg-[#1a1f36]`, `text-white`, `rounded-2xl`—see `components/common/CustomHeader.tsx` and `components/common/BrandGradient.tsx`.
- **Typography** Apply font weight, size, leading, tracking, and text color through utilities (e.g. `text-sm`, `font-semibold`).
- **Opacity & blend tweaks** Use provided modifiers (`text-white/80`, `bg-white/15`).
- **Utility composition** Combine with `clsx` when optional classes depend on props.

## Keep `style` for dynamic or unsupported cases
- **Runtime measurements** Values derived from constants or props at runtime, such as gauge `size` (`components/review/CircularScoreGauge.tsx`) or percentage widths (`components/review/MetricGrid.tsx`).
- **Safe area offsets & platform insets** Padding that depends on `useSafeAreaInsets()` (`components/common/CustomHeader.tsx`).
- **Animated values** Objects coming from Reanimated/shared values (`app/review.tsx` header, `components/common/AnimatedHeader.tsx`).
- **Transforms & arrays** Properties like `transform`, `shadowOffset`, gradients, or other arrays that Tailwind doesn’t cover (`components/ui/collapsible.tsx`, `components/parallax-scroll-view.tsx`).
- **Third-party prop passthrough** When a component forwards `style` to libraries expecting inline styles (e.g. `LinearGradient` in `components/common/BrandGradient.tsx`).

## Decision checklist
1. **Is the value fixed and expressible with utilities?** Use `className`.
2. **Does it rely on runtime/animated data or unsupported properties?** Keep it in `style`.
3. **Mixing both?** Ensure `style` only contains the minimal dynamic bits; everything static should live in `className`.

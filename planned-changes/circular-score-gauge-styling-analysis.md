---
description: Circular Score Gauge overlay styling analysis
---

# Summary
- **Observation** `components/review/CircularScoreGauge.tsx` uses a `VStack` overlay with `className="items-center justify-center gap-0"` plus inline `style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}` to center text over the SVG ring.
- **Question** Can the absolute fill and centering be expressed purely via Tailwind/NativeWind `className` utilities instead of inline styles?

# Findings
- **Absolute fill via utilities** NativeWind exposes the standard Tailwind positioning utilities (e.g. `absolute`, `inset-0`, `top-0`, `left-0`). Because `VStack` from `@gluestack-ui/themed` already honors `className`-driven utilities (evidenced by `items-center` and `gap-0` working today), we can replace the inline `style` block with `className="absolute inset-0 items-center justify-center gap-0"`. This keeps the overlay fully stretched and centered without inline styles.
- **Parent context requirement** The parent `View` currently sets `style={{ width: size, height: size, position: 'relative' }}`. The `relative` qualifier can move to `className="relative"`, but the computed `width`/`height` must remain inline (Tailwind cannot handle runtime numeric tokens like the `size` constant). Leaving those two numeric assignments inline is expected.
- **Why removing either block currently breaks**
  - Removing the inline `style` today drops the absolute fill, so the overlay shrinks to its content size and no longer sits over the gauge.
  - Removing `className` removes `items-center`/`justify-center`, so the text is no longer centered inside the overlay even though the absolute fill remains.

# Recommendation
- **Overlay refactor** Update the overlay to rely on utilities only:
  ```tsx
  <VStack className="absolute inset-0 items-center justify-center gap-0">
    <Text className={cx('text-5xl font-bold', 'text-white')}>{score}</Text>
    <Text className={cx('text-sm font-medium', 'text-white/80')}>{label}</Text>
  </VStack>
  ```
- **Parent container** Optionally move `position: 'relative'` to a `className` on the wrapping `View`, but keep inline `width`/`height` since they rely on dynamic runtime values.
- **No blocking constraints** There is no technical limitation preventing the overlay from being expressed purely with `className`; only the dynamic dimensions of the parent need inline styles.

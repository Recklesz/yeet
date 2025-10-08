# Gradient Background Exploration

**Date:** 2025-10-08  
**Status:** Proposed

## Summary
- **Goal** Establish tasteful, light gradients across primary screens without refactoring shared layout primitives.
- **Screens** `app/(tabs)/index.tsx`, `app/(tabs)/explore.tsx`, `app/review.tsx`.
- **Approach** Use `LinearGradient` from `expo-linear-gradient` with screen-specific palettes, keeping gradients behind existing scrollable content.

## Current Layouts
- **Home (`app/(tabs)/index.tsx`)** Uses `SafeAreaScreen` with `className="bg-background-0"` and card-like interior blocks. Fully scrollable vertical layout.
- **Explore (`app/(tabs)/explore.tsx`)** Sets `SafeAreaScreen` style background to `#ffffff`. `AnimatedHeader` currently renders a solid navy backdrop.
- **Review (`app/review.tsx`)** Also forces a white background via inline style on `SafeAreaScreen`; header shares the same solid color treatment.

## Gradient Concepts
- **Palette** Favor airy blues and soft purples to match brand voice. Example stops: `#F4F7FF → #F9F5FF → #FFF8F1` for warm mornings, `#1E2447 → #3A2E62` for immersive coaching moments.
- **Placement** Layer gradients as absolutely positioned backgrounds inside each screen to avoid interfering with layout padding/margins.
- **Tooling** Leverage `LinearGradient` directly; `BrandGradient` remains available but is scoped to reusable capsules rather than full-screen wraps.

## Screen-Specific Proposals
- **Home (`app/(tabs)/index.tsx`)**
  - Drop the `bg-background-0` class on `SafeAreaScreen`.
  - Insert a full-screen `LinearGradient` (soft cream → blush) positioned behind content via `StyleSheet.absoluteFill`.
  - Keep card surfaces white with subtle opacity so gradient peeks through.
- **Explore (`app/(tabs)/explore.tsx`)**
  - Wrap top portion (header + hero area) in a dark-to-vibrant gradient (`#1A1F36 → #3C2A64`).
  - Extend gradient to `Animated.View` background; optionally pass a gradient-aware prop to `AnimatedHeader` or overlay a sibling `LinearGradient` with matching corner radius.
  - Lower section transitions into a lighter gradient (`#F2F6FF → transparent`) to keep CTA buttons legible.
- **Review (`app/review.tsx`)**
  - Apply a tranquil gradient (`#F6F7FF → #FDF3FB`) across the safe area.
  - Tint `AnimatedHeader` background with an accent gradient (`#302B63 → #4A3F8C`) to reinforce achievement tone.
  - Use semi-transparent cards (`bg-white/95`) so gradient remains visible yet content stays readable.

## Implementation Steps
1. **Introduce shared background wrapper** per screen: add `LinearGradient` with `StyleSheet.absoluteFill` before scroll content; preserve `SafeAreaScreen` structure.
2. **Update headers**: allow `AnimatedHeader` to accept `backgroundGradientProps` (temporary prop) or overlay explicit gradient where it is used.
3. **Tweak card surfaces**: adjust `Box` backgrounds to semi-transparent or keep solid white with drop shadows to contrast the gradient.
4. **Validate accessibility**: confirm text contrast (WCAG AA) against new gradient hues using Expo dev tools.
5. **Smoke test** on iOS simulator (`npx expo start --dev-client`, `npm run ios:sim`) to verify gradients render smoothly with Reanimated scroll.

## Open Questions / Risks
- **Performance**: Gradients are lightweight, but stacking multiple `LinearGradient` instances should be verified on lower-end devices.
- **Dark Mode**: Need complementary darker palettes if system theme is enabled. Initial exploration can stay in light mode; future iteration should extend to `useColorScheme()`.
- **AnimatedHeader Integration**: Temporary prop may introduce duplication; longer term we can refactor header to accept a render prop for backgrounds.

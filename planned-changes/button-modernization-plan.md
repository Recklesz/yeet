---
description: standard button modernization plan
---

## Goals
- **Modernize baseline**: Align our standard button styling with the provided review screen mock (rounded-full silhouette, high-contrast typography, polished focus/press states).
- **Componentize**: Ship a reusable button wrapper that encapsulates the styling instead of duplicating `className` blocks across screens.
- **State coverage**: Define visual tokens for rest, hover/press, disabled, and loading states for both primary and secondary variants.

## Proposed Approach
1. **Audit current usage**
   - Collect all instances of the Gluestack `Button` in `app/` and `components/` (notably `app/review.tsx`) to understand variant needs (primary, secondary, tertiary, icon-only).
   - Note any screen-specific overrides (e.g., shadow, icon alignment) that should become props on the shared button.

2. **Define design tokens & utilities**
   - Lock the core dimensions: full-width by default, min height `48px`, rounded-full radius (`className="rounded-full"`), and padding `py-3 px-4` to mirror the mock.
   - Map colors to existing tokens: `bg-primary` + `text-white` for primary, `bg-surface-dark` + `text-text-primary-dark` for secondary, and set borders (`border-primary-400`) per mock.
   - Add pressed/focused states using NativeWind pseudo-class utilities (`pressed:bg-primary-800`, `focus-visible:ring-2 focus-visible:ring-primary-300`).
   - Confirm shadow recipe (e.g., `shadow-lg shadow-black/10`) that matches the mock’s subtle elevation.

3. **Create `YeetButton` wrapper**
   - Build `components/common/YeetButton.tsx` exporting variants (`type="primary" | "secondary"`) and props for `icon`, `loading`, `fullWidth`, `onPress`.
   - Use Gluestack primitives (`Button`, `ButtonText`) but control appearance via `className`; fall back to `Pressable` if needed for richer state handling.
   - Ensure text inherits `font-semibold text-base` and optionally allow size prop (`sm`, `md`, `lg`).

4. **Implement interaction states**
   - Add animated feedback using Reanimated or `Pressable` scale for press-in (optional stretch goal).
   - Provide loading state with spinner from `@gluestack-ui/themed` and accessible label updates.

5. **Refactor callers**
   - Replace the bottom CTA buttons in `app/review.tsx` with `YeetButton` variants.
   - Update other screens (e.g., `app/(tabs)/explore.tsx`) to adopt the new component, eliminating redundant styles.

6. **QA & documentation**
   - Snapshot test the component, verify dark/light modes, and run on device for tactile feedback.
   - Update `planned-changes/gluestack-design-system-integration.md` (if necessary) with button token references for future work.

---
description: plan to anchor practice controls to bottom during active call
---

# Context
- **Screen** `app/(tabs)/practice.tsx` renders the active call state with an `ImageBackground` and an `expo-linear-gradient` overlay.
- **Controls** `PracticeControls` are placed inside the gradient and should be anchored to the bottom of the screen while a call is active.
- **Observed issue** During live testing, the control cluster appears near the top instead of the bottom after `handleStart()` transitions `status` to `connecting` / `connected`.

# Findings
- **Layout container** The gradient element uses `className="flex-1 justify-end"` to push children to the bottom.
- **Library limitation** `expo-linear-gradient` is not mapped to Tailwind/NativeWind by default, so the `className` utilities do not apply, leaving the gradient at its default `justify-content: flex-start` layout.
- **Comparison** Other screens (e.g. idle state in the same file) rely on `View` wrappers for layout; they do not apply `className` directly to `LinearGradient` primitives.

# Plan
- **Add wrapper view** Wrap the gradient with a `View` that applies the `flex-1 justify-end` layout via `className`. Keep the gradient focused on visual styling only.
  ```tsx
  <View className="flex-1 justify-end">
    <LinearGradient ...>
      {...existing content}
    </LinearGradient>
  </View>
  ```
- **Fallback styling** Alternatively, set `style={{ flex: 1, justifyContent: 'flex-end' }}` directly on `LinearGradient` if wrapper introduces unwanted overlap. Prefer wrapper to stay aligned with our `className` practice.
- **Regression checks**
  - Verify idle state layout still centers the start card.
  - During `connecting` and `connected`, confirm controls sit above bottom padding and progress bar/hints remain visible.
  - Ensure `StatusBar` styling and gradient coverage still span the full screen.

# Follow-ups
- **NativeWind mapping** Consider adding a custom NativeWind configuration for `LinearGradient` if we need direct utility classes on this component in the future.
- **Reusable pattern** Document in `planned-changes/` or `docs/` how to handle layout for non-mapped components when using Tailwind utilities.

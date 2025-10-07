---
description: Safe area handling migration options
---

# Context
- **Trigger**: Runtime warning `SafeAreaView has been deprecated and will be removed in a future release. Please use 'react-native-safe-area-context' instead.`
- **Current setup**:
  - **`app/_layout.tsx`** already wraps the tree in `SafeAreaProvider` from `react-native-safe-area-context`.
  - **`components/common/AnimatedHeader.tsx`** and **`components/common/CustomHeader.tsx`** consume `useSafeAreaInsets` for padding.
  - No direct imports of `SafeAreaView` from `react-native`, so warning likely originates from an upstream dependency or Expo template code.

# Goals
- Eliminate the deprecation warning.
- Standardize safe-area handling for consistency across screens.
- Provide a reusable approach for future screens and components.

# Option A — Replace third-party `SafeAreaView` usages
- **Actions**
  - Audit dependencies (Expo Router shell, Gluestack UI, etc.) for bundled `SafeAreaView` imports.
  - Patch or override offending components by swapping to `SafeAreaView` from `react-native-safe-area-context`.
- **Pros**
  - Directly addresses the existing warning source.
  - Minimal impact on our own components.
- **Cons**
  - Requires spelunking through node_modules or waiting for upstream updates.
  - Custom patches may break on dependency updates.
- **Effort**: Medium (dependency investigation + potential patching).
- **Risks**: High maintenance burden if upstream lag persists.

# Option B — Introduce a shared `SafeAreaScreen` wrapper
- **Actions**
  - Create `components/common/SafeAreaScreen.tsx` exporting a wrapper around `SafeAreaView` from `react-native-safe-area-context` (with configurable edges and background color).
  - Ensure every screen (e.g., `app/(tabs)/index.tsx`, `app/(tabs)/explore.tsx`, `app/review.tsx`) uses the wrapper instead of relying on any implicit safe area views.
- **Pros**
  - Centralizes safe area handling with consistent styling.
  - Easy to adjust padding, colors, or status bar handling in one place.
- **Cons**
  - Requires refactoring every screen.
  - Does not fix warnings originating from third-party layouts.
- **Effort**: Medium (new component + refactors).
- **Risks**: Low; mostly controlled changes in our code.

# Option C — Move to padding-only strategy via `useSafeAreaInsets`
- **Actions**
  - Remove any `SafeAreaView` usage and rely solely on `useSafeAreaInsets` for padding adjustments at container roots.
  - Extend existing patterns in `CustomHeader` across all screens.
- **Pros**
  - Avoids extra view hierarchy; aligns with current header implementation.
  - Gives fine-grained control per component.
- **Cons**
  - Easy to miss coverage on new screens or nested navigators.
  - Still reliant on third-party code not doing the same.
- **Effort**: Medium-High (audit padding everywhere).
- **Risks**: Medium; regressions possible if padding misses any edge cases.

# Recommended Path
1. **Audit dependencies** (Option A) to confirm warning source. If found in our control (e.g., Expo Router layouts), submit upstream fix or create a patch package.
2. In parallel, **implement Option B** by introducing `SafeAreaScreen` to enforce consistency across our screens. This ensures we are not contributing to future warnings and benefits layout clarity.
3. Use `useSafeAreaInsets` selectively for components needing bespoke padding (Option C as a complementary pattern).

# Next Steps Checklist
- [ ] Identify the module emitting the warning (enable component stack traces in Metro logs).
- [ ] Draft `SafeAreaScreen` wrapper in `components/common/` and migrate key screens.
- [ ] Verify on iOS simulator across portrait/landscape for regressions.
- [ ] Monitor for warning disappearance; escalate to dependency maintainers if it persists.

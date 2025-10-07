---
description: Tailwind-first strategy for colors and fonts
---

# Goals
- **Align palette**: Remove `constants/theme.ts` and ensure all color consumption flows through Tailwind/NativeWind CSS variables.
- **Unify typography**: Adopt Tailwind font families everywhere, eliminating the redundant `Fonts` export.
- **Prevent regressions**: Migrate incrementally with validation to avoid UI drift.

# Current State
- **Colors**: Tailwind palette defined in `tailwind.config.js`; CSS variables sourced from `components/ui/gluestack-ui-provider/config.ts`. Legacy light-only values linger in `constants/theme.ts` and are consumed via `Colors` import or `useThemeColor()`.
- **Fonts**: Tailwind `extend.fontFamily` provides families (`inter`, `jakarta`, etc.), but many components still rely on RN defaults or the unused `Fonts` export.

# Phase 1 – Inventory & Prep
1. **Audit usages**
   - **Colors**: List every `Colors.*`, `useThemeColor()`, and any inline hex values that should map to Tailwind tokens.
   - **Fonts**: Identify text components using RN styles with `fontFamily`, including Gluestack `Text` variants.
2. **Decide canonical tokens**
   - Document the Tailwind palette we expect to keep (e.g., `primary`, `background`, `typography`).
   - Confirm font stack priorities (primary sans, secondary sans, monospace, display if needed).
3. **Create helper doc**
   - Publish a cheat sheet mapping `Colors` keys and font names to Tailwind equivalents for dev reference.
4. **Owners**: Frontend core (Ivelin) with design sign-off.

# Phase 2 – Color Migration
1. **Replace direct `Colors` usage**
   - Update `app/(tabs)/_layout.tsx` to consume Tailwind variable (`rgb(var(--color-primary-500))`) via a small helper, or define a `tabBarActiveTintColor` constant exporting from a new `theme/tokens.ts` that reads the same CSS variables.
   - Adjust any `Colors.icon` or similar references (e.g., `components/ui/collapsible.tsx`) to use Tailwind tokens.
2. **Retire `useThemeColor()`**
   - Convert `ThemedText`, `ThemedView`, and `ParallaxScrollView` to accept `className` and rely on Tailwind utility props. Where raw styles are necessary (e.g., RN `StyleSheet`), read from Tailwind CSS variables using `useMemo` or a utility helper.
   - Migrate all call sites to Tailwind classes or dedicated props.
3. **Delete `constants/theme.ts`** once no imports remain.
4. **Validation**
   - Run through key screens (Explore, Review, any modals) to confirm color alignment with design tokens.
   - Update screenshots/documentation if needed.

# Phase 3 – Font Migration
1. **Tailwind font helpers**
   - Confirm `tailwind.config.js` `fontFamily` entries align with design requirements (e.g., `inter`, `jakarta`).
   - Ensure fonts are loaded via Expo `@expo-google-fonts` or asset pipeline if custom.
2. **Component updates**
   - Replace inline `fontFamily` usage in RN `StyleSheet` objects with Tailwind classes (`font-jakarta`, `font-inter`).
   - For Gluestack components, define token-based font variants or use `className` bridging.
3. **Remove `Fonts` export** after verifying no residual references.
4. **QA**
   - Check typography hierarchy across screens; confirm fallback behavior on iOS/Android (e.g., using `className="font-inter"` + Expo font loading).

# Risk & Mitigation
- **Risk**: Palette mismatch after migration → Mitigate with visual regression checks and staging review with design.
- **Risk**: Missing font assets on device → Integrate font loading in `app/_layout.tsx` using Expo `useFonts()` prior to enforcing Tailwind font utilities.
- **Risk**: Mixed styling approaches cause inconsistency → Enforce lint rule/eslint custom rule to ban `Colors`/`Fonts` imports post-migration.

# Success Criteria
- No imports from `constants/theme.ts`.
- Tailwind classes or CSS-variable helpers drive all color/typography styling.
- Documented token mapping shared with the team.
- Screens verified on simulator with expected palette and type ramp.

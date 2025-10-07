# Dark Mode Support Audit

## Current Support
- **System hook**: `useColorScheme()` re-exported from `react-native` and specialized web version in `hooks/use-color-scheme.ts` and `hooks/use-color-scheme.web.ts` drives light/dark detection.
- **Color resolution**: `useThemeColor()` in `hooks/use-theme-color.ts` selects palette values from `Colors.light`/`Colors.dark` defined in `constants/theme.ts`.
- **Navigation theme**: `app/_layout.tsx` passes `DarkTheme`/`DefaultTheme` and toggles `GluestackUIProvider` `mode` based on `colorScheme`.
- **Tabs styling**: `app/(tabs)/_layout.tsx` sets `tabBarActiveTintColor` from the selected palette.
- **Screen-specific logic**: `app/(tabs)/index.tsx` and other components conditionally style UI using `isDark` or `useThemeColor()`.

## Steps to Remove Dark Mode
- **Lock the app theme**: In `app/_layout.tsx`, stop calling `useColorScheme()`; hardcode `mode="light"`, use `DefaultTheme`, and set `<StatusBar style="dark" />`.
- **Simplify Gluestack provider**: In `components/ui/gluestack-ui-provider/index.tsx`, remove the `nativewind` color scheme hook and `useEffect`; export a provider that always uses the light config.
- **Collapse color utilities**:
  - Replace `Colors` in `constants/theme.ts` with a single palette object.
  - Update `useThemeColor()` to ignore dark props and only return light colors.
  - Remove or simplify `hooks/use-color-scheme.ts` and `hooks/use-color-scheme.web.ts` if no longer needed.
- **Update consumers**:
  - Refactor components like `app/(tabs)/_layout.tsx`, `app/(tabs)/index.tsx`, and widgets in `components/` that read `useColorScheme()` or accept `darkColor` overrides to use static light styles.
  - Clean up conditional class logic (e.g., `isDark ? ... : ...`) so light variants become the default and redundant branches are deleted.
- **Tailwind/NativeWind alignment**: Ensure any `className` references to dark tokens (`bg-gray-900`, etc.) are removed or replaced with light counterparts.
- **Testing**: Run through iOS simulator to confirm no references to removed hooks remain and visual appearance matches the light theme.

## Follow-up Considerations
- **Docs & onboarding**: Update README or onboarding notes indicating the app only supports a light theme.
- **Future-proofing**: If reintroducing dark mode later, keep a copy of the previous palette or document the removal commit.

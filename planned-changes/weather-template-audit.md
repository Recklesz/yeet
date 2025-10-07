# Weather App Template Audit

_Date: October 7, 2025_

## TL;DR
- Template ships with a full Gluestack + NativeWind design layer (`components/ui`) that we can lift to accelerate consistent styling tokens, but it targets Expo SDK 52 / RN 0.76 so we must cherry-pick and refit pieces rather than copy the whole project.
- Screen modules (weather, location, settings, maps) demonstrate reusable card layouts, animated headers, charts, and theme toggles that map to our scenario picker, feedback dashboards, and preferences flows.
- Third-party integrations (react-native-maps, react-native-calendars, react-native-gifted-charts) are optional accelerators; adoption requires native config updates and vetting against Expo SDK 54 + RN 0.81.
- Recommend porting the UI component wrappers, tab bar, card primitives, and theme toggles; skip weather-specific mock data, hard-coded imagery, and redundant theme context wiring.

## Template Snapshot
- Location: `tmp/weather-app-main`
- Framework: Expo SDK 52 (`expo@~52.0.11`), React Native 0.76.3 (`package.json`)
- Styling: Gluestack component packages (`@gluestack-ui/*`) + NativeWind + Tailwind (`components/ui`, `tailwind.config.js`)
- State helpers: lightweight `ThemeContext` + `WeatherTabContext` (`contexts/*`)
- Feature screens:
  - Weather tab with animated collapsible header and tabbed content (`app/(tabs)/(weather)`)
  - Location list with animated cards (`app/(tabs)/location.tsx`)
  - Map search overlay (`app/(tabs)/maps.tsx`, `components/screens/maps/current-location-map/index.tsx`)
  - Settings with theme toggle cards (`app/(tabs)/settings.tsx`)

## Borrowable Building Blocks

### 1. Gluestack + NativeWind Wrappers
- **Purpose:** Opinionated wrappers that bridge Gluestack primitives with Tailwind utility classes for consistent styling and variants.
- **Where:** `components/ui/*` (e.g., `button/index.tsx`, `input/index.tsx`, `text/index.tsx`, `pressable/index.tsx`, `box/index.tsx`).
- **Value:**
  - Ready-made `tva` variant maps (sizes, actions, states) accelerate uniform button/input styling.
  - `cssInterop` configuration already handled for icons and pressables.
  - Works with color tokens defined in `tailwind.config.js` and `components/ui/gluestack-ui-provider/config.ts`.
- **Adoption Notes:**
  - Swap `@gluestack-ui/*` component-level packages for `@gluestack-ui/core` / `@gluestack-ui/themed` equivalents we already ship, or add the missing packages if we prefer their split structure.
  - Update import aliases from `@/...` to match Yeet’s existing module resolver (we already use `@` pointing to project root).

### 2. Navigation & Layout Patterns
- **Bottom tab bar:** Custom renderer with active/inactive icon handling and safe-area padding (`components/shared/bottom-tab-bar/index.tsx`). Useful template for Yeet’s eventual multi-tab layout (e.g., Explore, Progress, Settings) with Gluestack icons.
- **Collapsible header:** Weather layout uses Reanimated to shrink a hero header while scrolling (`app/(tabs)/(weather)/_layout.tsx` and `components/screens/weather/header/index.tsx`). Could inspire a conversational summary header that snaps to a compact status bar on scroll.
- **Custom header with search/action slots:** `components/shared/custom-header/index.tsx` shows a hero card with optional search bar—adaptable for scenario search or onboarding hero blocks.

### 3. Screen Modules to Repurpose
- **Scenario picker analogue:** Location cards (`components/screens/location/location-card/index.tsx`) provide animated press feedback, selection state, and metric rows. Convert content to “Scenario difficulty, last attempted, key focus” instead of weather stats.
- **Progress dashboard seeds:**
  - Line chart block (`components/screens/weather/chart/index.tsx`) using `react-native-gifted-charts` suits our longitudinal progress view with minor styling tweaks.
  - Rain probability list (`components/screens/weather/rain-card/index.tsx`) is effectively a progress bar list we can reuse for graded metrics.
- **Practice calendar idea:** Monthly calendar screen (`app/(tabs)/(weather)/monthly.tsx`) demonstrates custom day rendering and icon badges; reuse for scheduling practice sessions or visualizing streaks.
- **Settings theme toggle:** Theme cards (`components/screens/settings/theme-card/index.tsx`) and context toggle show a simple pattern we can integrate into Yeet’s preference screen without reimplementing.
- **Map overlay pattern:** If we later surface in-person venue recommendations, `app/(tabs)/maps.tsx` + `components/screens/maps/current-location-map/index.tsx` illustrate overlay controls atop a full-screen map view.

### 4. Utility Hooks & Context
- `useChildVisibility` (`hooks/useChildVisibility/index.ts`) couples ScrollView position to animation triggers—handy for staggering metric reveals on the Review screen.
- `WeatherTabContext` (`contexts/weather-screen-context/index.tsx`) provides a blueprint for coordinating tabbed analytics (selected index, shared refs). Could be refactored into a `useProgressTabs` helper.
- `ThemeContext` is redundant with our current NativeWind color-scheme handling; we can extract only the toggle UI and rely on existing `useColorScheme` logic.

### 5. Assets & Styling Tokens
- Tailwind extension and Gluestack color tokens (`tailwind.config.js`, `components/ui/gluestack-ui-provider/config.ts`) mirror what we already have but include richer purple/orange palettes that may align with Yeet branding.
- DM Sans font wiring in `app/_layout.tsx` ensures typography parity if we stay with DM Sans; otherwise swap for our chosen typeface.

## Third-Party Modules Worth Evaluating
| Module | Used For | Keep? | Considerations |
| --- | --- | --- | --- |
| `react-native-gifted-charts` | Line/area chart in progress card | ✅ | Works in Expo; verify with RN 0.81 + Reanimated 4 (our stack). Lightweight and declarative.
| `react-native-calendars` | Monthly planner view | ✅ | Compatible with Expo 54; re-theme to match Yeet palette.
| `react-native-maps` + `expo-location` | Current location map | ⚠️ Optional | Requires iOS pod install & Google Maps keys if we need advanced styles; only adopt with a concrete map feature.
| `@expo-google-fonts/dm-sans` | Font loading | ⚠️ Maybe | Swap to our chosen typography or keep DM Sans for quick parity.
| `lucide-react-native` | Icon pack | ✅ | Provides broad icon set complementary to Gluestack icons; ensure tree-shaking to limit bundle size.

## Gaps, Risks, and Cleanup Items
- **SDK mismatch:** Template targets Expo 52 / RN 0.76.3 / Reanimated 3; Yeet is on Expo 54 / RN 0.81.4 / Reanimated 4. Migrate code snippets, not dependencies, to avoid downgrading our stack.
- **Gluestack package split:** Template imports dozens of component-specific packages (`@gluestack-ui/button`, etc.). Either add them or rewrite imports to our existing `@gluestack-ui/themed` primitives to avoid dependency bloat.
- **Context duplication:** Their ThemeContext duplicates what NativeWind already handles for us. Integrate just the UI toggle and tie into our existing theme mechanism.
- **Mock data & imagery:** Weather-specific assets (`assets/images/*`, `data/screens/*`) are filler and should be replaced with Yeet domain data before shipping.
- **Expo config:** `app.json` lacks microphone/background audio permissions we already manage; do not copy wholesale.
- **Animations:** Some hooks rely on `measureLayout` and private `_scrollY` fields (`hooks/useChildVisibility`). Ensure compatibility with Fabric (enabled in RN 0.81) and guard against undefined refs.

## Quick Wins for Yeet
1. **Adopt the UI component wrappers** (`components/ui`), refactoring imports to our Gluestack packages. This unlocks consistent button/input/text variants without fresh implementation work.
2. **Port the Location card pattern** as a starting point for the Scenario picker (swap metrics, replace icons, hook into navigation) and reuse the `AnimatedPressable` interaction.
3. **Leverage the chart + progress components** (`components/screens/weather/chart`, `rain-card`) for our Review dashboard to visualize conversation scores and improvement trajectories.
4. **Reuse the Settings theme toggle UI** inside our preferences screen, wiring button handlers to our existing color-scheme setter.
5. **Incorporate the custom tab bar** once we introduce multiple tabs (Explore, Review history, Settings) to maintain a cohesive branded navigation.

## Suggested Next Steps
1. Extract `components/ui` into Yeet, reconcile Gluestack imports, and validate them against Expo 54 nativewind linking.
2. Prototype a Scenario picker screen by re-skinning `LocationCard` with Yeet data, integrating with our router.
3. Spike a “Progress” view using the chart & rain-card components fed with `mockReviewData` to confirm styling + performance.
4. Document required dependency additions (charts, calendars) and update the engineering backlog for any native configuration tasks (e.g., maps) before adoption.

---
description: practice screen minimal redesign
---

# Goals
- Deliver minimal practice experience aligned with reference mockups while keeping call controls functional.
- Remove non-essential copy and cards from `app/(tabs)/practice.tsx` until they support future iterations.

# Reference
- **Idle screen composition**: Full-bleed light gray background with a rounded rectangle card centered vertically. Card has soft drop shadow and large circular illustration (two characters facing each other) centered near top. Below illustration, typography stacks as `Coffee Shop Encounter` title in bold white, `with Amelia` subtitle in lighter weight. Beneath text sits a pill-shaped goal card containing an icon on the left and two-line copy describing the objective. A single wide primary button labeled `Begin Practice` anchors the bottom of the card. Top corners show subtle back (`<`) and close (`x`) controls in translucent circles.
- **Active call composition**: Portrait of the woman's face fills the entire screen, slightly softened with vertical light gray gradient fade near bottom. A thin horizontal progress bar sits about 20 px above bottom edge, colored light blue on gray track. Directly below bar is a single-line hint such as "Hint: Ask about her interests" in small gray text. Control cluster floats above bottom safe area: central red circular stop button flanked by white circular mute/unmute buttons (left = microphone with slash to mute/unmute audio input, right = speaker icon for output). Buttons cast subtle drop shadows against the image.
- **Avatar asset**: Use `assets/images/avatars/cute_lady_1.png` for the full-screen portrait. For idle illustration, reference current vector style until a dedicated asset is provided; maintain circular crop with soft shadow.

# Implementation Plan
1. **Restructure Idle Layout**
   - Replace current `ScrollView` stack with a centered column that mirrors the mock: back/close icons in header, large circular illustration, scenario title/subtitle, goal card, primary CTA.
   - Remove `PracticeHeader`, `PracticeTipCard`, idle descriptive text, and dev-only navigation button from `practice.tsx`.
   - Create minimal goal card UI directly in the screen or via lightweight inline component using `className` utilities.

2. **Simplify Active Call View**
   - When status is `connecting` or `connected`, render a dedicated full-screen layout with blurred/gradient overlay on top of the avatar image.
   - Introduce a bottom section containing:
     - Linear progress bar placeholder bound to session timers (stub with static progress for now if timing not available).
     - Hint text surface.
     - Control cluster with `toggleMute`, `stop`, and `start` (only when relevant) styled as circular buttons.
   - Remove `PracticeCoachCard` and reuse only necessary pieces (status text handled inline).

3. **Update Controls Component**
   - Refactor `PracticeControls` to support the new visual: center `stop` button (red), flank with audio/mic toggles using icon-only buttons.
   - Ensure component accepts minimal props (`status`, `isMuted`, handlers) and returns different layouts for idle vs active to reduce conditional clutter in the screen.

4. **Content & Assets**
   - Define scenario metadata (title, subtitle, goal copy) close to the screen or within `constants/practice.ts` for reuse.
   - Load `cute_lady_1.png` via `Image`/`ImageBackground` with `require` to keep bundler support; ensure accessibility labels reference scenario name.

5. **Cleanup & Styling**
   - Delete unused imports and supporting components that are no longer referenced by the screen after the redesign.
   - Confirm styles align with Gluestack + NativeWind preferences, using `className` utilities and tokens where possible.
   - Verify StatusBar styling matches light-on-dark transitions between idle and active states.

# Validation
- Manually toggle session states (`idle`, `connecting`, `connected`) to confirm layouts render correctly and controls trigger `usePracticeSession` handlers.
- Run `npm run lint` to catch any TypeScript or styling regressions.

# Open Questions
- Determine final source for progress bar updates (real-time waveform vs. static timer).
- Confirm if back/close affordances should share functionality (e.g., exit screen vs. dismiss modal).

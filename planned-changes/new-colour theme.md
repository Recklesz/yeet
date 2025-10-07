## Color Palette - Hex Codes

### Primary Colors

**Dark Backgrounds:**
- Deep Navy: `#0A0E27` or `#1a1f36`
- Charcoal: `#2d3142`

**Primary Action Color:**
- Electric Blue: `#0ea5e9`
- Cyan Alternative: `#00d4ff`

**Your Brand Gradient (Logo/Key Moments):**
- Orange: `#FF6B35` (left side of your gradient)
- Red: `#FF1744` (right side of your gradient)

### Accent Colors

**Vibrant Accent (Alternative to your gradient):**
- Coral: `#ff6b6b`
- Lime Green: `#00ff88`

**Supporting Colors:**
- Success Green: `#10b981`
- Warning Yellow: `#fbbf24`
- Soft White: `#f8fafc`
- Light Gray: `#e2e8f0`
- Medium Gray: `#64748b`

## Recommended Usage

**App Structure:**
- Background: `#0A0E27`
- Cards/Surfaces: `#1a1f36`
- Primary buttons: `#0ea5e9`
- "Start Practice" CTA: Your orange-red gradient (`#FF6B35` → `#FF1744`)
- Text on dark: `#f8fafc`
- Secondary text: `#64748b`
- Success feedback: `#10b981`
- Achievements/Streaks: Your gradient

This gives you the coaching tool vibe with strategic pops of your signature YEET energy.

## Implementation Plan

- **Update NativeWind tokens**: Remap every palette variable in `components/ui/gluestack-ui-provider/config.ts` so `--color-background-*`, `--color-primary-*`, `--color-typography-*`, etc. convert the new hex codes to RGB triplets (e.g., `#0A0E27` → `10 14 39`, `#0ea5e9` → `14 165 233`). Add dedicated entries for gradient endpoints if required for CTA styling.
- **Sync Gluestack token defaults**: Align `tokens.colors` in `components/ui/gluestack-ui-provider/index.tsx` with the refreshed palette (set `gray*`, `green500`, `amber500`, `red500` to match `#1a1f36`, `#10b981`, `#fbbf24`, `#FF1744`, etc.) so `$color` references stay consistent.
- **Replace hardcoded hex values**: Sweep components such as `components/common/AnimatedHeader.tsx`, `components/common/CustomHeader.tsx`, `components/themed-text.tsx`, `components/themed-view.tsx`, `components/parallax-scroll-view.tsx`, `components/ui/collapsible.tsx`, and review widgets to replace inline colors (`#7C5CFF`, `#11181C`, `#6B7280`, `#fff`) with Tailwind/NativeWind tokens tied to the updated variables.
- **Refresh navigation styling**: Update `TAB_ACTIVE_TINT` in `app/(tabs)/_layout.tsx` and any `ThemeProvider` overrides or `StatusBar` props to ensure active states and system UI complement the dark background and electric blue primary.
- **Adjust platform assets**: In `app.json`, change splash/icon `backgroundColor` values from white/black to the new dark base `#0A0E27` (or appropriate gradient fallback) so launch visuals match the refreshed theme.
- **Verify appearance**: Run the Expo Dev Client, navigate across tabs, and confirm dark surfaces, primary actions, gradients, and success/warning accents render as intended; tweak spacing or contrast as needed before sign-off.
# Design Token System

## Architecture

Single source of truth: `constants/design-palette.js` → Consumed by all systems

```
design-palette.js (RGB space format)
├→ config.ts (NativeWind CSS variables)
│  └→ tailwind.config.js (references CSS vars)
├→ gluestack-ui-provider/index.tsx (Gluestack tokens)
└→ ui-tokens.ts (runtime constants)
```

## Files

### `constants/design-palette.js`
**Purpose:** Single source of truth for all design tokens
**Format:** CommonJS module exporting RGB space format colors (`'14 165 233'`)

**Exports:**
- `primary`, `secondary`, `tertiary` — Brand colors
- `error`, `success`, `warning`, `info` — Status colors
- `typography`, `outline`, `background` — Neutral colors
- `backgroundSpecial` — Named backgrounds (`{ error, warning, success, muted, info }`)
- `indicator` — Focus ring colors
- `gradient` — Gradient stops
- `spacing` — Numeric spacing scale (px values)
- `radii` — Border radius scale (px values)

**Example:**
```js
const primary = {
  0: '224 248 255',
  50: '186 230 253',
  500: '14 165 233',
  // ...
};
```

### `constants/design-palette.ts`
**Purpose:** TypeScript wrapper with helper functions
**Exports:**
- `designPalette` — Typed palette object
- `rgbToHex(rgb)` — Convert `'14 165 233'` → `'#0ea5e9'`
- `rgbToRgba(rgb, alpha)` — Convert to rgba string
- `getTokenColor(category, shade)` — Get hex color for runtime use

**Usage:**
```ts
import { getTokenColor } from './design-palette';
const color = getTokenColor('success', 500); // '#10b981'
```

### `components/ui/gluestack-ui-provider/config.ts`
**Purpose:** Builds NativeWind CSS variables from shared palette
**How it works:**
1. Imports `design-palette.js`
2. Generates CSS variables (`--color-primary-500`, etc.)
3. Exports `config.light` and `config.dark` for NativeWind

### `tailwind.config.js`
**Purpose:** Tailwind configuration
**How it works:**
1. Imports `design-palette.js`
2. References CSS variables for color ramps (`rgb(var(--color-primary-500)/<alpha-value>)`)
3. Converts palette values to hex for static colors (`typography.white`)
4. Extends spacing and borderRadius with shared scales

**Result:** `className="bg-primary-500"` → CSS var → shared palette value

### `constants/ui-tokens.ts`
**Purpose:** Runtime constants for SVG, animations, calculations
**Exports:**
- `COLORS` — Hex colors derived from palette
- `GRADIENTS` — Brand gradient stops (hex format for LinearGradient)
- `SPACING` — Semantic spacing (`xs`, `sm`, `md`, etc.)
- `SPACING_SCALE` — Direct access to numeric scale
- `RADII` — Border radius scale
- `ICON_SIZES`, `GAUGE_SIZES`, `HEADER_HEIGHTS` — Component-specific values

**Usage:**
```ts
import { COLORS, SPACING, GRADIENTS } from '@/constants/ui-tokens';
<Svg stroke={COLORS.success[500]} strokeWidth={SPACING.sm} />
<LinearGradient colors={GRADIENTS.brand} />
```

### `components/ui/gluestack-ui-provider/index.tsx`
**Purpose:** Gluestack UI configuration
**How it works:**
1. Imports `design-palette.js` and helper functions
2. Creates Gluestack tokens from palette (colors, spacing, radii)
3. Provides styled component system

## Adding New Tokens

### Add a color
1. Add to `constants/design-palette.js` in RGB space format
2. Done. It propagates automatically.

**Example:**
```js
// design-palette.js
const accent = {
  500: '255 107 53',
  // ...
};
module.exports = { /* ... */, accent };
```

### Add a spacing value
1. Add to `spacing` object in `constants/design-palette.js`
2. Done. Available in Tailwind and Gluestack.

**Example:**
```js
const spacing = {
  // ...
  40: 160,
};
```

## Using Tokens

### In components (preferred)
Use Tailwind/NativeWind classNames:
```tsx
<View className="bg-primary-500 p-4 rounded-lg" />
```

### In runtime code (SVG, Reanimated)
Use `ui-tokens.ts` constants:
```tsx
import { COLORS } from '@/constants/ui-tokens';
<Circle fill={COLORS.success[500]} />
```

### In styles requiring hex
Use helper functions:
```tsx
import { getTokenColor } from '@/constants/design-palette';
const color = getTokenColor('primary', 500);
```

## Rules

1. **Never hardcode design values** — All colors, spacing, radii must come from `design-palette.js`
2. **Prefer classNames** — Use Tailwind utilities over inline styles when possible
3. **Use runtime helpers** — For SVG/animations, use `getTokenColor()` or `COLORS` from `ui-tokens.ts`
4. **Single edit point** — Design changes happen only in `design-palette.js`

## Common Patterns

### Color with opacity
```tsx
// Tailwind
<View className="bg-primary-500/20" />

// Runtime
import { rgbToRgba, designPalette } from '@/constants/design-palette';
const color = rgbToRgba(designPalette.primary[500], 0.2);
```

### Spacing calculation
```tsx
import { SPACING_SCALE } from '@/constants/ui-tokens';
const headerHeight = SPACING_SCALE[16] + SPACING_SCALE[8]; // 64 + 32
```

### Dynamic color selection
```tsx
import { SENTIMENT_COLORS } from '@/constants/ui-tokens';
const color = SENTIMENT_COLORS[sentiment]; // 'excellent' | 'great' | 'good' | 'needs-work'
```

### Using gradients
```tsx
// Using BrandGradient component (recommended)
import { BrandGradient } from '@/components/common/BrandGradient';
<BrandGradient className="rounded-lg">
  <View>Content</View>
</BrandGradient>

// Using LinearGradient directly with GRADIENTS token
import { LinearGradient } from 'expo-linear-gradient';
import { GRADIENTS } from '@/constants/ui-tokens';
<LinearGradient colors={GRADIENTS.brand} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}>
  <View>Content</View>
</LinearGradient>

// AnimatedHeader with gradient background
import { AnimatedHeader } from '@/components/common/AnimatedHeader';
<AnimatedHeader
  height={headerHeight}
  title="Title"
  backgroundVariant="gradient"  // Use 'solid' for single color (default)
/>
```

**When to use gradients:**
- Use the brand gradient for high-impact header areas (review screens, achievements)
- Use solid colors for most UI elements to maintain hierarchy
- The gradient creates visual emphasis, so use sparingly

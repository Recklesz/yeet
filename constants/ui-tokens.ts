/**
 * UI Design Tokens
 * Centralized sizing, spacing, and color constants for consistent theming
 */

import { designPalette, getTokenColor, rgbToHex, rgbToRgba } from './design-palette';

/**
 * Shared numeric spacing scale (from design palette)
 * Use this for direct numeric values in calculations
 */
export const SPACING_SCALE = designPalette.spacing;

/**
 * Shared radii scale (from design palette)
 */
export const RADII = designPalette.radii;

// Icon sizes (in pixels, mapped to design scale)
export const ICON_SIZES = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
} as const;

// Gauge/Chart sizing
export const GAUGE_SIZES = {
  default: 160,
  strokeWidth: 12,
} as const;

// Header heights (in pixels)
export const HEADER_HEIGHTS = {
  max: 260, // Accommodate 160px gauge + sentiment text + safe area + padding
  min: 200, // Accommodate collapsed gauge + sentiment text
} as const;

// Spacing values (semantic mapping to shared scale)
export const SPACING = {
  xs: SPACING_SCALE[1], // 4px
  sm: SPACING_SCALE[2], // 8px
  md: SPACING_SCALE[3], // 12px
  lg: SPACING_SCALE[4], // 16px
  xl: SPACING_SCALE[5], // 20px
  '2xl': SPACING_SCALE[6], // 24px
} as const;

// Brand color tokens (derived from shared design palette)
export const COLORS = {
  // Success/positive
  success: {
    0: getTokenColor('success', 0),
    50: getTokenColor('success', 50),
    500: getTokenColor('success', 500),
    600: getTokenColor('success', 600),
  },
  // Primary (Electric Blue)
  primary: {
    500: getTokenColor('primary', 500),
    600: getTokenColor('primary', 600),
  },
  // Warning
  warning: {
    0: getTokenColor('warning', 0),
    50: getTokenColor('warning', 50),
    500: getTokenColor('warning', 500),
  },
  // Error
  error: {
    500: getTokenColor('error', 500),
  },
  // Background
  background: {
    950: getTokenColor('background', 950),
  },
  // Typography (gray scale)
  typography: {
    50: getTokenColor('typography', 50),
    200: getTokenColor('typography', 200),
    500: getTokenColor('typography', 500),
    600: getTokenColor('typography', 600),
    700: getTokenColor('typography', 700),
    900: getTokenColor('typography', 900),
  },
  // Whites with opacity
  white: {
    solid: rgbToHex(designPalette.typography[0]!),
    80: rgbToRgba(designPalette.typography[0]!, 0.8),
    20: rgbToRgba(designPalette.typography[0]!, 0.2),
  },
} as const;

// Sentiment color mapping (for scores/feedback)
export const SENTIMENT_COLORS = {
  excellent: COLORS.success[600],
  great: COLORS.success[500],
  good: COLORS.primary[500],
  'needs-work': COLORS.warning[500],
} as const;

// Softer sentiment colors for light backgrounds (pastel aesthetic)
export const SENTIMENT_COLORS_SOFT = {
  excellent: getTokenColor('success', 200), // Pastel mint green
  great: getTokenColor('success', 200), // Pastel mint green
  good: getTokenColor('primary', 200), // Pastel blue
  'needs-work': getTokenColor('warning', 300), // Pastel yellow
} as const;

// Brand gradient stops (in hex format for LinearGradient)
export const GRADIENTS = {
  brand: [
    rgbToHex(designPalette.gradient.brandFrom), // Light blue
    rgbToHex(designPalette.gradient.brandVia), // Light mint
    rgbToHex(designPalette.gradient.brandTo), // Light green
  ],
} as const;

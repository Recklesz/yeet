/**
 * UI Design Tokens
 * Centralized sizing, spacing, and color constants for consistent theming
 */

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
  max: 240,
  min: 140,
} as const;

// Spacing values (in pixels, aligned with Tailwind scale)
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
} as const;

// Brand color tokens (matching Tailwind palette)
export const COLORS = {
  // Success/positive
  success: {
    50: '#f0fdf4',
    500: '#22c55e',
    600: '#16a34a',
  },
  // Info/neutral
  blue: {
    500: '#3b82f6',
    600: '#2563eb',
  },
  // Warning
  amber: {
    50: '#fffbeb',
    500: '#f59e0b',
  },
  // Error
  red: {
    500: '#ef4444',
  },
  // Background
  background: {
    950: '#1a1f36',
  },
  // Gray scale
  gray: {
    50: '#f9fafb',
    200: '#e5e7eb',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    900: '#111827',
  },
  // Whites with opacity
  white: {
    solid: '#ffffff',
    80: 'rgba(255, 255, 255, 0.8)',
    20: 'rgba(255, 255, 255, 0.2)',
  },
} as const;

// Sentiment color mapping (for scores/feedback)
export const SENTIMENT_COLORS = {
  excellent: COLORS.success[600],
  great: COLORS.success[500],
  good: COLORS.blue[500],
  'needs-work': COLORS.amber[500],
} as const;

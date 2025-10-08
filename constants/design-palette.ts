/**
 * Design Palette - TypeScript Wrapper
 *
 * Re-exports the shared design palette with TypeScript types.
 * Provides runtime helpers for converting RGB space format to hex/rgba.
 */

import paletteJson from './design-palette.json';

/**
 * Type definitions for color ramps
 */
export type ColorRamp = {
  [K in 0 | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950]?: string;
};

export type BackgroundSpecial = {
  error: string;
  warning: string;
  success: string;
  muted: string;
  info: string;
};

export type Indicator = {
  primary: string;
  info: string;
  error: string;
};

export type Gradient = {
  brandFrom: string;
  brandVia: string;
  brandTo: string;
};

export type Spacing = {
  px: string;
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  8: number;
  10: number;
  12: number;
  16: number;
  20: number;
  24: number;
  32: number;
};

export type Radii = {
  none: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
  full: number;
};

export interface DesignPalette {
  primary: ColorRamp;
  secondary: ColorRamp;
  tertiary: ColorRamp;
  error: ColorRamp;
  success: ColorRamp;
  warning: ColorRamp;
  info: ColorRamp;
  typography: ColorRamp;
  outline: ColorRamp;
  background: ColorRamp;
  backgroundSpecial: BackgroundSpecial;
  indicator: Indicator;
  gradient: Gradient;
  spacing: Spacing;
  radii: Radii;
}

/**
 * Shared design palette (re-exported from JSON for type safety)
 */
export const designPalette = paletteJson as unknown as DesignPalette;

/**
 * Helper: Convert RGB space format to hex
 * @param rgb - RGB space format string (e.g., '14 165 233')
 * @returns Hex color string (e.g., '#0ea5e9')
 */
export function rgbToHex(rgb: string): string {
  const [r, g, b] = rgb.split(' ').map(Number);
  return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
}

/**
 * Helper: Convert RGB space format to rgba
 * @param rgb - RGB space format string (e.g., '14 165 233')
 * @param alpha - Alpha value (0-1)
 * @returns rgba color string (e.g., 'rgba(14, 165, 233, 0.5)')
 */
export function rgbToRgba(rgb: string, alpha: number): string {
  const [r, g, b] = rgb.split(' ').map(Number);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Helper: Get token color in hex format for runtime use (SVG, Reanimated)
 * @param category - Color category (e.g., 'success', 'error')
 * @param shade - Color shade (e.g., 500, 600)
 * @returns Hex color string
 */
export function getTokenColor(
  category: keyof Omit<
    DesignPalette,
    'backgroundSpecial' | 'indicator' | 'gradient' | 'spacing' | 'radii'
  >,
  shade: 0 | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950
): string {
  const ramp = designPalette[category] as ColorRamp;
  const rgb = ramp[shade];
  if (!rgb) {
    throw new Error(`Color token not found: ${category}[${shade}]`);
  }
  return rgbToHex(rgb);
}

/**
 * Helper: Get special background color in hex format
 * @param name - Background name (e.g., 'error', 'warning')
 * @returns Hex color string
 */
export function getBackgroundColor(name: keyof BackgroundSpecial): string {
  const rgb = designPalette.backgroundSpecial[name];
  if (!rgb) {
    throw new Error(`Background color not found: ${name}`);
  }
  return rgbToHex(rgb);
}

/**
 * Helper: Get indicator color in hex format
 * @param name - Indicator name (e.g., 'primary', 'error')
 * @returns Hex color string
 */
export function getIndicatorColor(name: keyof Indicator): string {
  const rgb = designPalette.indicator[name];
  if (!rgb) {
    throw new Error(`Indicator color not found: ${name}`);
  }
  return rgbToHex(rgb);
}

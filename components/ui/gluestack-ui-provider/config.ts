'use client';
import { vars } from 'nativewind';

const palette = require('../../../constants/design-palette.js');

/**
 * Helper: Build CSS variable object from color ramp
 */
function buildColorVars(prefix: string, ramp: Record<string, string>) {
  const result: Record<string, string> = {};
  Object.entries(ramp).forEach(([shade, value]) => {
    result[`--color-${prefix}-${shade}`] = value;
  });
  return result;
}

/**
 * Build theme configuration from shared design palette
 */
function buildThemeVars() {
  return {
    // Color ramps
    ...buildColorVars('primary', palette.primary),
    ...buildColorVars('secondary', palette.secondary),
    ...buildColorVars('tertiary', palette.tertiary),
    ...buildColorVars('error', palette.error),
    ...buildColorVars('success', palette.success),
    ...buildColorVars('warning', palette.warning),
    ...buildColorVars('info', palette.info),
    ...buildColorVars('typography', palette.typography),
    ...buildColorVars('outline', palette.outline),
    ...buildColorVars('background', palette.background),

    // Background special
    '--color-background-error': palette.backgroundSpecial.error,
    '--color-background-warning': palette.backgroundSpecial.warning,
    '--color-background-success': palette.backgroundSpecial.success,
    '--color-background-muted': palette.backgroundSpecial.muted,
    '--color-background-info': palette.backgroundSpecial.info,

    // Indicators
    '--color-indicator-primary': palette.indicator.primary,
    '--color-indicator-info': palette.indicator.info,
    '--color-indicator-error': palette.indicator.error,

    // Gradients
    '--gradient-brand-from': palette.gradient.brandFrom,
    '--gradient-brand-via': palette.gradient.brandVia,
    '--gradient-brand-to': palette.gradient.brandTo,
  };
}

// Build theme vars once from shared palette
const themeVars = buildThemeVars();

export const config = {
  // Light and dark modes currently use the same values
  // Future mode-specific overrides can be added here
  light: vars(themeVars),
  dark: vars(themeVars),
};

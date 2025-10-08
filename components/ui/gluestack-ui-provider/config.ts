'use client';
import { vars } from 'nativewind';

import { designPalette } from '../../../constants/design-palette';

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
    ...buildColorVars('primary', designPalette.primary),
    ...buildColorVars('secondary', designPalette.secondary),
    ...buildColorVars('tertiary', designPalette.tertiary),
    ...buildColorVars('error', designPalette.error),
    ...buildColorVars('success', designPalette.success),
    ...buildColorVars('warning', designPalette.warning),
    ...buildColorVars('info', designPalette.info),
    ...buildColorVars('typography', designPalette.typography),
    ...buildColorVars('outline', designPalette.outline),
    ...buildColorVars('background', designPalette.background),

    // Background special
    '--color-background-error': designPalette.backgroundSpecial.error,
    '--color-background-warning': designPalette.backgroundSpecial.warning,
    '--color-background-success': designPalette.backgroundSpecial.success,
    '--color-background-muted': designPalette.backgroundSpecial.muted,
    '--color-background-info': designPalette.backgroundSpecial.info,

    // Indicators
    '--color-indicator-primary': designPalette.indicator.primary,
    '--color-indicator-info': designPalette.indicator.info,
    '--color-indicator-error': designPalette.indicator.error,

    // Gradients
    '--gradient-brand-from': designPalette.gradient.brandFrom,
    '--gradient-brand-via': designPalette.gradient.brandVia,
    '--gradient-brand-to': designPalette.gradient.brandTo,
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

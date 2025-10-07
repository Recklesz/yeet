import React from 'react';
import { config } from './config';
import { View, ViewProps } from 'react-native';
import { OverlayProvider } from '@gluestack-ui/core/overlay/creator';
import { ToastProvider } from '@gluestack-ui/core/toast/creator';
import { StyledProvider, createConfig } from '@gluestack-style/react';

export type ModeType = 'light';

// Create proper Gluestack UI configuration with essential tokens
const gluestackConfig = createConfig({
  aliases: {
    bg: 'backgroundColor',
    bgColor: 'backgroundColor',
    h: 'height',
    w: 'width',
    p: 'padding',
    px: 'paddingHorizontal',
    py: 'paddingVertical',
    pt: 'paddingTop',
    pb: 'paddingBottom',
    pr: 'paddingRight',
    pl: 'paddingLeft',
    m: 'margin',
    mx: 'marginHorizontal',
    my: 'marginVertical',
    mt: 'marginTop',
    mb: 'marginBottom',
    mr: 'marginRight',
    ml: 'marginLeft',
    rounded: 'borderRadius',
  },
  tokens: {
    colors: {
      // Updated color palette
      white: '#ffffff',
      black: '#000000',
      // Deep Navy backgrounds
      gray50: '#f8fafc',
      gray100: '#e2e8f0',
      gray200: '#cbd5e1',
      gray300: '#94a3b8',
      gray400: '#64748b',
      gray500: '#1a1f36',
      gray600: '#334155',
      gray700: '#1e2a39',
      gray800: '#1a1f36',
      gray900: '#0e1225',
      // Status colors
      green500: '#10b981',
      red500: '#ff1744',
      amber500: '#fbbf24',
    },
    space: {
      px: '1px',
      '0': 0,
      '1': 4,
      '2': 8,
      '3': 12,
      '4': 16,
      '5': 20,
      '6': 24,
      '8': 32,
      '10': 40,
      '12': 48,
      '16': 64,
      '20': 80,
      '24': 96,
      '32': 128,
    },
    radii: {
      none: 0,
      xs: 2,
      sm: 4,
      md: 6,
      lg: 8,
      xl: 12,
      '2xl': 16,
      '3xl': 24,
      full: 9999,
    },
  },
});

export function GluestackUIProvider({
  mode = 'light',
  ...props
}: {
  mode?: ModeType;
  children?: React.ReactNode;
  style?: ViewProps['style'];
}) {
  return (
    <View style={[config.light, { flex: 1, height: '100%', width: '100%' }, props.style]}>
      <StyledProvider config={gluestackConfig}>
        <OverlayProvider>
          <ToastProvider>{props.children}</ToastProvider>
        </OverlayProvider>
      </StyledProvider>
    </View>
  );
}

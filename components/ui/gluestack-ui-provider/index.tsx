import { StyledProvider, createConfig } from '@gluestack-style/react';
import { OverlayProvider } from '@gluestack-ui/core/overlay/creator';
import { ToastProvider } from '@gluestack-ui/core/toast/creator';
import React from 'react';
import { View, ViewProps } from 'react-native';
import { getTokenColor } from '../../../constants/design-palette';
import { config } from './config';

const palette = require('../../../constants/design-palette.js');

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
      // Base colors
      white: getTokenColor('typography', 0),
      black: '#000000',
      // Typography grays (derived from shared palette)
      gray50: getTokenColor('typography', 50),
      gray100: getTokenColor('typography', 100),
      gray200: getTokenColor('typography', 200),
      gray300: getTokenColor('typography', 300),
      gray400: getTokenColor('typography', 400),
      gray500: getTokenColor('typography', 500),
      gray600: getTokenColor('typography', 600),
      gray700: getTokenColor('typography', 700),
      gray800: getTokenColor('typography', 800),
      gray900: getTokenColor('typography', 900),
      // Status colors (derived from shared palette)
      green500: getTokenColor('success', 500),
      red500: getTokenColor('error', 500),
      amber500: getTokenColor('warning', 500),
    },
    // Shared spacing scale
    space: palette.spacing,
    // Shared radii scale
    radii: palette.radii,
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

import { View, type ViewProps } from 'react-native';

// Default background color from Tailwind (white)
const DEFAULT_BACKGROUND_COLOR = '#fff';

export type ThemedViewProps = ViewProps;

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
  return <View style={[{ backgroundColor: DEFAULT_BACKGROUND_COLOR }, style]} {...otherProps} />;
}

import { View, type ViewProps } from 'react-native';

// Default background color - Deep Navy
const DEFAULT_BACKGROUND_COLOR = '#0A0E27';

export type ThemedViewProps = ViewProps;

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
  return <View style={[{ backgroundColor: DEFAULT_BACKGROUND_COLOR }, style]} {...otherProps} />;
}

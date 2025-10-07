# AnimatedHeader Component

A scroll-responsive header component that smoothly animates between expanded and collapsed states, adapted from the weather app pattern.

## Features

- 🎨 Smooth scroll-driven animations using Reanimated
- 📏 Configurable min/max heights
- 🎯 Flexible content areas (title, subtitle, right content)
- 🌗 Theme-aware with custom background support
- 📱 Safe area insets handling
- ⚡ Optimized performance with worklets

## Basic Usage

```tsx
import { AnimatedHeader } from '@/components/common/AnimatedHeader';
import { useAnimatedHeader } from '@/hooks/use-animated-header';

function MyScreen() {
  const { height, headerStyle, handleScroll } = useAnimatedHeader({
    maxHeight: 280,
    minHeight: 120,
  });

  return (
    <View style={{ flex: 1 }}>
      {/* Fixed header */}
      <Animated.View style={[{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }, headerStyle]}>
        <AnimatedHeader
          height={height}
          maxHeight={280}
          minHeight={120}
          title="Session Review"
          subtitle="See how you performed"
          rightContent="8.5/10"
        />
      </Animated.View>

      {/* Scrollable content */}
      <Animated.ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: 280 }}
      >
        {/* Your content */}
      </Animated.ScrollView>
    </View>
  );
}
```

## Props

### AnimatedHeader Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `height` | `number` | ✅ | - | Current animated height (from hook) |
| `maxHeight` | `number` | ❌ | `300` | Maximum height when expanded |
| `minHeight` | `number` | ❌ | `120` | Minimum height when collapsed |
| `title` | `string` | ✅ | - | Main header title |
| `subtitle` | `string` | ❌ | - | Subtitle (fades on collapse) |
| `rightContent` | `ReactNode \| string` | ❌ | - | Content on bottom-right |
| `topRightIcon` | `Feather icon name` | ❌ | - | Icon on top-right (fades out) |
| `onTopRightIconPress` | `() => void` | ❌ | - | Icon press handler |
| `backgroundColor` | `string` | ❌ | Theme-based | Background color |

### useAnimatedHeader Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `maxHeight` | `number` | `300` | Maximum header height |
| `minHeight` | `number` | `120` | Minimum header height |
| `scrollThreshold` | `number` | `0` | Scroll position to start collapsing |
| `collapseDistance` | `number` | `150` | Scroll distance for full collapse |

## Examples

### 1. Review Screen with Score

```tsx
<AnimatedHeader
  height={height}
  title="Session Review"
  subtitle="Practice with Sarah • 5 mins ago"
  rightContent="8.5/10"
  topRightIcon="share"
  onTopRightIconPress={handleShare}
/>
```

### 2. Custom Right Content

```tsx
<AnimatedHeader
  height={height}
  title="Progress"
  subtitle="Your practice journey"
  rightContent={
    <VStack className="items-end">
      <Text className="text-white/80 text-xs">Streak</Text>
      <Text className="text-white text-4xl font-bold">🔥 7</Text>
      <Text className="text-white/60 text-xs">days</Text>
    </VStack>
  }
/>
```

### 3. Simple Header (No Right Content)

```tsx
<AnimatedHeader
  height={height}
  title="All Scenarios"
  subtitle="Choose your next challenge"
/>
```

### 4. Custom Background Color

```tsx
<AnimatedHeader
  height={height}
  title="Settings"
  backgroundColor="#FF6B6B"
/>
```

## Animation Details

### What Animates?

1. **Header Height**: Smoothly transitions from `maxHeight` to `minHeight`
2. **Title Font Size**: Shrinks from 28px to 20px
3. **Subtitle**: Fades out and shrinks (opacity + font size)
4. **Top Right Icon**: Fades out when collapsing
5. **Right Content**: Scales down and reduces opacity
6. **Content Margin**: Adjusts for safe area

### Interpolation Ranges

The component uses these interpolation ranges by default:

```tsx
// Title size
[maxHeight, minHeight] → [28px, 20px]

// Subtitle size
[maxHeight, minHeight] → [16px, 12px]

// Subtitle opacity
[maxHeight, minHeight] → [1, 0]

// Right content scale
[maxHeight, minHeight] → [1, 0.8]
```

## Use Cases in Yeet

### ✅ Perfect For:

1. **Review Screen**
   - Title: "Session Review"
   - Right content: Overall score
   - Scrollable feedback details below

2. **Progress/Stats Screen**
   - Title: "Your Progress"
   - Right content: Total sessions or streak
   - Scrollable charts and history

3. **Scenario Detail**
   - Title: Scenario name
   - Right content: Difficulty or success rate
   - Scrollable description and tips

4. **Profile Screen**
   - Title: User name
   - Right content: Level or avatar
   - Scrollable settings

### ❌ Not Recommended For:

- Main home screen (better with static CustomHeader)
- Screens with tabs at top (conflicts with tab bar)
- Very short content (no scroll = no animation)

## Performance Notes

- Uses Reanimated worklets for 60fps animations
- Scroll events throttled to 16ms (60fps)
- All calculations run on UI thread
- Zero re-renders during scroll

## Customization

### Adjusting Scroll Sensitivity

```tsx
const { height, headerStyle, handleScroll } = useAnimatedHeader({
  maxHeight: 280,
  minHeight: 120,
  scrollThreshold: 50,      // Start collapsing after 50px scroll
  collapseDistance: 100,    // Collapse faster (100px instead of 150px)
});
```

### Custom Animation Curves

Modify the component to use different easing:

```tsx
import { Easing, withTiming } from 'react-native-reanimated';

// In the hook
animatedHeight.value = withTiming(targetHeight, {
  duration: 300,
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
});
```

## Troubleshooting

### Header overlaps content

**Solution**: Ensure `contentContainerStyle.paddingTop` matches `maxHeight`

```tsx
<Animated.ScrollView
  contentContainerStyle={{ paddingTop: 280 }} // Same as maxHeight
>
```

### Animation feels choppy

**Solution**: Check `scrollEventThrottle` is set to `16`

```tsx
<Animated.ScrollView scrollEventThrottle={16}>
```

### Right content not visible

**Solution**: Ensure header has enough width and the content doesn't overflow

### Safe area issues on iPhone

**Solution**: The component uses `useSafeAreaInsets()` automatically. Ensure `react-native-safe-area-context` is properly set up.

## Comparison with CustomHeader

| Feature | AnimatedHeader | CustomHeader |
|---------|---------------|--------------|
| Scroll animation | ✅ Yes | ❌ No |
| Search input | ❌ No | ✅ Yes |
| Mic button | ❌ No | ✅ Yes |
| Highlight card | ❌ No | ✅ Yes |
| Use case | Detail screens | Home/list screens |
| Complexity | Higher | Lower |

**Recommendation**: Use `CustomHeader` for static screens (home, search) and `AnimatedHeader` for detail screens with lots of scrollable content (review, profile, stats).

## Files

- Component: `/components/common/AnimatedHeader.tsx`
- Hook: `/hooks/use-animated-header.ts`
- Examples: `/components/examples/AnimatedHeaderExample.tsx`
- Docs: `/components/common/AnimatedHeader.md`

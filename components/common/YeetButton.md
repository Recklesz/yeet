# YeetButton Component

Modern, reusable button component with consistent styling, animations, and accessibility support.

## Features

- **Three variants**: `primary`, `secondary`, `tertiary`
- **Three sizes**: `sm`, `md`, `lg`
- **Loading state** with spinner
- **Press animation** with scale feedback using Reanimated
- **Full accessibility** support (ARIA roles, states)
- **NativeWind/Tailwind** styling with `className` utilities
- **Rounded-full** silhouette matching design system

## Usage

### Basic Example

```tsx
import { YeetButton } from '@/components/common/YeetButton';

// Primary button (default)
<YeetButton onPress={handleSubmit}>
  Submit
</YeetButton>

// Secondary button
<YeetButton variant="secondary" onPress={handleCancel}>
  Cancel
</YeetButton>

// Tertiary button
<YeetButton variant="tertiary" onPress={handleSkip}>
  Skip
</YeetButton>
```

### With Loading State

```tsx
<YeetButton 
  variant="primary" 
  loading={isSubmitting}
  onPress={handleSubmit}
>
  Save Changes
</YeetButton>
```

### Different Sizes

```tsx
<YeetButton size="sm" onPress={handleAction}>
  Small Button
</YeetButton>

<YeetButton size="md" onPress={handleAction}>
  Medium Button
</YeetButton>

<YeetButton size="lg" onPress={handleAction}>
  Large Button
</YeetButton>
```

### With Icon

```tsx
<YeetButton 
  variant="primary"
  icon={<IconSymbol name="checkmark" size={20} color="white" />}
  onPress={handleConfirm}
>
  Confirm
</YeetButton>
```

### Custom Width

```tsx
<YeetButton 
  variant="secondary"
  fullWidth={false}
  className="w-32"
  onPress={handleAction}
>
  Custom Width
</YeetButton>
```

### Disabled State

```tsx
<YeetButton 
  variant="primary"
  disabled={!isValid}
  onPress={handleSubmit}
>
  Submit
</YeetButton>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'tertiary'` | `'primary'` | Button visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `children` | `string` | - | Button text (required) |
| `loading` | `boolean` | `false` | Shows spinner and disables button |
| `fullWidth` | `boolean` | `true` | Whether button takes full width |
| `icon` | `React.ReactNode` | - | Optional icon before text |
| `disabled` | `boolean` | `false` | Disables button interaction |
| `className` | `string` | `''` | Additional Tailwind classes |
| `onPress` | `() => void` | - | Press handler |

All standard `PressableProps` are also supported.

## Variants

### Primary
- **Background**: `bg-primary-900`
- **Text**: `text-typography-white`
- **Shadow**: `shadow-lg shadow-black/10`
- **Active**: `active:bg-primary-800`
- **Use for**: Main CTAs, primary actions

### Secondary
- **Background**: `bg-white`
- **Border**: `border-2 border-primary-400`
- **Text**: `text-primary-400`
- **Active**: `active:bg-primary-50`
- **Use for**: Secondary actions, cancel buttons

### Tertiary
- **Background**: `bg-transparent`
- **Text**: `text-primary-400`
- **Active**: `active:bg-primary-50`
- **Use for**: Low-emphasis actions, text links

## Sizes

| Size | Min Height | Padding | Text Size |
|------|-----------|---------|-----------|
| `sm` | 40px | `py-2 px-3` | `text-sm` |
| `md` | 48px | `py-3 px-4` | `text-base` |
| `lg` | 56px | `py-4 px-5` | `text-lg` |

## Animation

The button uses **React Native Reanimated** for smooth press feedback:
- **Press in**: Scales to 0.96 with spring animation
- **Press out**: Returns to 1.0 with spring animation
- **Spring config**: `damping: 15, stiffness: 300`

## Accessibility

- **Role**: `button`
- **States**: `disabled`, `busy` (when loading)
- **Label**: Automatically uses button text
- All states are properly announced to screen readers

## Design Tokens

The component uses the following design tokens from `tailwind.config.js`:

- **Colors**: `primary-*`, `typography-*`, `background-*`, `outline-*`
- **Shadows**: `shadow-lg`, `shadow-black/10`
- **Border radius**: `rounded-full`
- **Font weights**: `font-semibold`

## Examples in Codebase

- **Review Screen** (`app/review.tsx`): Primary and secondary CTAs
- **Explore Screen** (`app/(tabs)/explore.tsx`): Dev navigation button
- **ConfirmDialog** (`components/common/ConfirmDialog.tsx`): Dialog actions

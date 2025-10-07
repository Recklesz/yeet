# Gluestack UI Integration Plan

**Date:** 2025-10-07
**Status:** Ready for Implementation

---

## What We Have

✅ `@gluestack-ui/themed@1.1.73` installed
✅ GluestackUIProvider configured
✅ Dark mode support
✅ Using components: Avatar, Badge, Box, Button, HStack, VStack, Pressable, Spinner, Text

---

## Available Gluestack Repositories

### 1. gluestack-ui-starter-kits ⭐ RECOMMENDED
**URL:** https://github.com/gluestack/gluestack-ui-starter-kits

**Contains production-ready screens:**
- Authentication flow (Splash, Sign In, Sign Up, Forgot Password)
- Dashboard layout with navigation
- Profile screen
- News feed screen
- Form validation with react-hook-form + Zod
- Dark mode support

**How to use:**
```bash
git clone https://github.com/gluestack/gluestack-ui-starter-kits.git
# Copy screens from expo-app/screens/ to your project
# Install: npm install react-hook-form zod @hookform/resolvers/zod
```

### 2. gluestack-example-screens
**URL:** https://github.com/gluestack/gluestack-example-screens
**Storybook:** https://gluestack-example-screens-storybook.vercel.app/

**Contains:**
- Component documentation (Storybook)
- 34 base components (primitives + composites)
- Only 2 placeholder example screens (NOT production-ready)

**Use for:** Component reference and documentation only

### 3. gluestack-ui-pro (Paid)
**URL:** https://ui-pro.gluestack.io
**Pricing:** $199-$749
**Status:** Currently being updated

100+ premium screens across 15 categories

---

## Implementation Plan

### Phase 1: Voice Chat Screen (`app/(tabs)/explore.tsx`)

**Add these components:**

1. **Actionsheet** - Scenario selection
   ```typescript
   import {
     Actionsheet,
     ActionsheetBackdrop,
     ActionsheetContent,
     ActionsheetItem,
     ActionsheetItemText,
   } from '@gluestack-ui/themed';
   ```
   - Show scenarios before call starts
   - "Coffee shop", "Bar conversation", "First date"

2. **Modal** - Pre-call instructions
   ```typescript
   import {
     Modal,
     ModalBackdrop,
     ModalContent,
     ModalHeader,
     ModalBody,
     ModalFooter,
   } from '@gluestack-ui/themed';
   ```
   - Context and goals for scenario
   - "Got it, let's go" button

3. **Progress** - Call duration indicator
   ```typescript
   import { Progress, ProgressFilledTrack } from '@gluestack-ui/themed';
   ```
   - Visual timer during call
   - Target duration guidance

**New files:**
- `components/voice-chat/ScenarioSheet.tsx`
- `components/voice-chat/PreCallModal.tsx`
- `constants/scenarios.ts`

---

### Phase 2: Review Screen (`app/review.tsx`)

**Add these components:**

1. **Accordion** - Collapsible feedback sections
   ```typescript
   import {
     Accordion,
     AccordionItem,
     AccordionHeader,
     AccordionTrigger,
     AccordionContent,
   } from '@gluestack-ui/themed';
   ```
   - Replace FeedbackList
   - "What Went Well", "Areas to Improve", "Key Moments"

2. **Progress** bars - Visual metrics
   - Replace numeric scores
   - Color-coded: red (0-3), yellow (4-6), green (7-10)

3. **Divider** - Section separation
   ```typescript
   import { Divider } from '@gluestack-ui/themed';
   ```

4. **Toast** - Success notifications
   ```typescript
   import { Toast, ToastTitle, useToast } from '@gluestack-ui/themed';
   ```
   - "Progress saved!", "New high score!"

**Updated files:**
- `app/review.tsx`
- `components/review/FeedbackAccordion.tsx` (NEW - replaces FeedbackList)
- `components/review/MetricProgressBars.tsx` (NEW - enhances MetricGrid)

---

### Phase 3: Navigation & Global

1. **Fab** - Quick action button
   ```typescript
   import { Fab, FabIcon, FabLabel } from '@gluestack-ui/themed';
   ```
   - Floating button for quick access to practice

2. **AlertDialog** - Confirmations
   ```typescript
   import {
     AlertDialog,
     AlertDialogBackdrop,
     AlertDialogContent,
     AlertDialogHeader,
     AlertDialogBody,
     AlertDialogFooter,
   } from '@gluestack-ui/themed';
   ```
   - Replace Alert.alert() calls
   - "End practice?", "Clear data?"

3. **Menu** - Settings menu
   ```typescript
   import {
     Menu,
     MenuItem,
     MenuItemLabel,
   } from '@gluestack-ui/themed';
   ```

**New files:**
- `components/navigation/QuickActionFab.tsx`
- `components/common/ConfirmDialog.tsx`

---

## Priority

### High Priority ⭐
1. Actionsheet for scenario selection
2. Accordion for feedback sections
3. Progress bars for metrics

### Medium Priority
4. Modal for pre-call instructions
5. AlertDialog for confirmations
6. Divider for sections

### Low Priority
7. Fab for quick actions
8. Toast notifications
9. Menu for settings

---

## Styling Guidelines

**Dark mode:**
```typescript
backgroundColor: colorScheme === 'dark' ? '$gray900' : '$gray50'
color: colorScheme === 'dark' ? '$white' : '$black'
```

**Colors:**
- Use design tokens: `$green500`, `$red500`, `$amber500`, etc.

**Spacing:**
- Use gluestack scale: `space="md"`, `gap={16}`, `padding={24}`

**Typography:**
- Consistent `fontSize` and `fontWeight` values

---

## Resources

- **Docs:** https://gluestack.io/ui/docs
- **Storybook:** https://design-system-storybook.gluestack.io/
- **Starter Kits:** https://github.com/gluestack/gluestack-ui-starter-kits
- **Example Screens:** https://github.com/gluestack/gluestack-example-screens

---

## Next Steps

1. Start with Actionsheet for scenario selection
2. Implement Accordion for feedback sections
3. Add Progress bars to metrics
4. Test each component on iOS simulator
5. Iterate based on UX feedback

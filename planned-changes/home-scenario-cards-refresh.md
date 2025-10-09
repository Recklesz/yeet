---
description: home screen scenario cards refresh
---

# Goals
- Replace the vertical list in `app/(tabs)/index.tsx` with horizontally scrolling scenario cards inspired by `scenario-cards.html`.
- Strengthen the practice selection UX with imagery, richer metadata, and difficulty cues styled via `className` utilities.
- Preserve navigation to `/(tabs)/practice` while preparing for future scenario-specific routing.

# Reference
- `scenario-cards.html`: baseline for layout (image topper, stacked labels, double chip row, horizontal snapping).
- `docs/classname-vs-style-guidelines.md`: lean on Tailwind/NativeWind utilities and Gluestack tokens only where utilities fall short.

# Current Implementation
- `FEATURED_SCENARIOS` defined inline in `app/(tabs)/index.tsx` with minimal fields (`title`, `goal`, `difficulty`, `duration`).
- Cards render in a vertical `VStack`, using `Box`, `Text`, and a solid background with a difficulty `Badge`.
- No imagery, chips, or horizontal interactions; difficulty stored as `Easy | Medium | Challenging`.

# Proposed Data Model
- Promote scenario metadata into `constants/practice.ts` (or new `constants/home.ts`) for reuse and easier updates.
- Extend schema with image and display fields to support the new design.

```ts
export type ScenarioCardMeta = {
  id: string;
  title: string;
  summary: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes: number;
  imageUri: string;
};

export const homeScenarioCards: ScenarioCardMeta[] = [
  {
    id: 'coffee-shop',
    title: 'Coffee Shop Opener',
    summary: 'You spot someone ordering a cortado — start warm and playful.',
    level: 'Beginner',
    durationMinutes: 5,
    imageUri: 'https://…',
  },
  // …mirror remaining cards from HTML reference
];
```

- Optional future enhancement: store local images under `assets/images/scenarios/` and import via `require` to avoid remote fetch.

# Component Strategy
- Create `ScenarioCard.tsx` under `components/common/`:
  - Accept `ScenarioCardMeta` props + optional `onPress`.
  - Structure:
    - Outer `Pressable` with padding, border, shadow (`shadow-md shadow-black/5`).
    - Top `Image` with `className="h-40 w-full rounded-xl object-cover"` using `Image` from `expo-image` if available (else RN `Image`).
    - Title `Text` with `font-semibold text-lg text-center`.
    - Summary `Text` with `text-sm text-typography-600 text-center line-clamp-2` (use `numberOfLines={2}` prop to emulate clamp).
    - Footer `HStack` for chips: difficulty pill (level color) + duration pill.
- Expose difficulty colors through utility map:

```ts
const levelStyles = {
  Beginner: 'bg-success-100 text-success-700',
  Intermediate: 'bg-warning-100 text-warning-700',
  Advanced: 'bg-error-100 text-error-700',
} as const;
```

# Layout & Interaction Updates
- Replace current `VStack` render with a horizontal `FlatList` or `ScrollView`:
  - `horizontal` with `showsHorizontalScrollIndicator={false}`.
  - Apply `contentContainerClassName="gap-4 pr-5"` and `snapToAlignment="center"` / `snapToInterval={cardWidth + spacing}` for the snap feel.
  - Wrap in parent `Box` with `className="-mx-5"` to allow edge-to-edge cards matching reference.
- Keep section title copy; add secondary text like "Pick a vibe and jump in" if desired.
- On card press, continue routing to `/(tabs)/practice` for now. Note TODO for scenario-specific routing once ready.

# Styling Guidance
- Use `className` utilities on Gluestack primitives: prefer `Box`, `Pressable`, `VStack`, `HStack` only when matching layout semantics.
- Apply subtle shadow via `className="border border-border-200 shadow-lg shadow-black/5"`; confirm Gluestack provider supports `shadow-*` classes (else fall back to `style={twShadow}` inline helper).
- Maintain rounded corners: cards `rounded-3xl`, image `rounded-2xl` to match HTML look.
- Ensure accessible labels: `Image` with `accessibilityLabel={`${title} scenario artwork`}`.

# Implementation Steps
1. **Data relocation**: move `Scenario` type + array to `constants/practice.ts` (rename type to `ScenarioCardMeta` and expand fields).
2. **Component creation**: build `components/common/ScenarioCard.tsx` with prop typing, difficulty map, and exported `ScenarioLevel` union.
3. **Home screen refactor**:
   - Import `homeScenarioCards` and `ScenarioCard`.
   - Replace inline map with horizontal `FlatList` (memoize `renderItem` if necessary for perf) and remove old `FEATURED_SCENARIOS` constant.
   - Add section heading + optional subtitle above list.
4. **Styling polish**: tune spacing and `ScrollView` padding to align with reference; test multiple screen widths.
5. **Clean-up**: delete unused types/imports, ensure `mockReviewData` usage still memoized.

# Validation
- Run `npm run lint`.
- On iOS simulator, verify horizontal snapping, chip colors, and press animations.
- Confirm `Image` renders (if remote URIs, ensure network permission; if local, bundle correctly).
- Check VoiceOver reads card title and summary in logical order.

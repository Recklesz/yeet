---
description: redesign review scenario hero section to match analyst-style card
---

# Objective
- **Replicate scenario hero** Deliver a top-of-screen scenario card in `app/review.tsx` that mirrors the provided analyst mock while respecting our NativeWind + Gluestack patterns.

# Current State
- **Single-column metrics first** `app/review.tsx` currently starts with `MetricGrid`, leaving scenario context implied by the animated header.
- **Data available** `mockReviewData` in `constants/review.ts` already exposes `title`, `avatarName`, `avatarImage`, `completedAt`, and `overallScore` fields we can reuse.
- **No dedicated component** There is no scenario overview component in `components/review/`; header logic is split between `AnimatedHeader` and `ReviewHeader`.

# Requirements
- **Visual parity** Build a card featuring scenario label, scenario title, avatar thumbnail + metadata row, and a details row for duration and timestamp.
- **Local avatar asset** Use `assets/images/avatars/cute_lady_1.png` as the mock avatar image source until dynamic data exists.
- **Utility-first styling** Prefer `className` utilities for layout/spacing, with Gluestack primitives (`Box`, `HStack`, `VStack`, `Text`, `Avatar`) for consistency.
- **Responsive-ish layout** On mobile we only need single-column layout; still structure the markup so secondary rows can adapt to larger breakpoints in the future.

# Proposed Approach
- **Create `ScenarioOverviewCard`** Add `components/review/ScenarioOverviewCard.tsx` exporting a memoized component that accepts `title`, `avatarName`, `avatarImage`, `duration`, and `completedAt`.
- **Card structure**
  - **Header row** `Scenario` label and scenario title using `Text` with `text-xs` / `text-2xl font-bold` utilities.
  - **Avatar row** `HStack` with `Avatar` (rounded, bordered) and name/role stack (`avatarName`, hard-coded `AI Avatar`).
  - **Stats row** Horizontal divider (`border-t border-gray-200`) followed by two columns: duration and timestamp labels/value pairs.
- **Styling tokens**
  - Wrap card in `Box` with `rounded-2xl`, `border border-gray-200`, `bg-white`, `shadow-sm`, `p-5` to mimic provided tailwind snippet.
  - Apply `text-gray-500` for secondary labels, `text-gray-900` for primary text.
  - Use NativeWind for spacing/gap utilities.
- **Data plumbing**
  - Extend `ConversationReview` to include `durationSeconds` and `completedAtDisplay` if needed; or derive formatted strings inside the screen.
  - Import `ScenarioOverviewCard` in `app/review.tsx` and render it as the first child within the scroll content, ahead of `MetricGrid`.
  - Temporarily override `avatarImage` in `mockReviewData` to reference the local asset via `ImageSourcePropType` until real data arrives.
- **Formatting helpers** Add a `formatDuration(durationSeconds: number)` utility inside the card or shared helper to produce `5 min 23 sec` style strings.

# Validation
- **Storybook-style check** Use Expo preview to confirm visual alignment with the reference design on iPhone 14 simulator.
- **Accessibility** Ensure text labels remain readable (min 12pt), and avatar `alt` text leverages `Avatar`'s accessibility props.
- **Regression scan** Verify the animated header still renders correctly above the new card and scroll paddings remain intact.

# Follow-Ups
- **Dynamic data** Wire real call duration + timestamps once analytics backend lands.
- **Dark mode** Audit card colors against dark theme tokens when we expand theming support.

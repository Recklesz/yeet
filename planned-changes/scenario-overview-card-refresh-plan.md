---
description: Scenario overview card visual refresh
---

## Overview
- Align `components/review/ScenarioOverviewCard.tsx` with the provided reference card while staying within Gluestack + NativeWind conventions.
- Ensure changes integrate cleanly in `app/review.tsx` without breaking existing review flow.

## Current gaps vs reference
- **Layout hierarchy**: Header content is vertically stacked and center-aligned; reference shows left-aligned copy with avatar details positioned to the right in a horizontal layout.
- **Typography & tone**: Labels use uppercase and heavier weights; reference uses sentence case, lighter gray, and subtler tracking.
- **Avatar metadata**: Card hardcodes "Cute" beneath the avatar; reference shows subtitle like "AI Avatar" that should come from data.
- **Spacing & sizing**: Vertical gaps are larger than the compact reference. Divider spacing and padding need refinement.
- **Stats presentation**: Duration and timestamp are centered; reference shows two horizontal rows with label on the left and value right-aligned.
- **Formatting**: Timestamp text includes "at"; reference reads "Today, 10:30 AM" style. Seconds formatting should pad to two digits (e.g., `5 min 03 sec`).

## Implementation plan
1. **Prop updates**
   - Extend `ScenarioOverviewCardProps` with optional `avatarSubtitle` (default to `AI Avatar` if absent).
   - Consider accepting pre-formatted timestamp/duration strings if upstream wants control; otherwise, adjust helpers to match reference format (today/relative check later if needed).
2. **Header structure**
   - Introduce an `HStack` (or `Box` with `flex-row`) wrapping the left textual block and right avatar block.
   - Left block: stack "Scenario" label, title, and optionally description if future data arrives; ensure left alignment and tighter spacing.
   - Right block: avatar image (48px), name, subtitle; align text vertically center relative to avatar per design.
3. **Typography & colors**
   - Update classNames to use softer gray tokens (`text-gray-400`/`text-gray-500`) and remove uppercase transformation.
   - Adjust font sizes (e.g., scenario label `text-sm`, title `text-2xl font-semibold`, meta `text-sm`). Follow tokens from `tailwind.config.js` and existing review components for consistency.
4. **Container styling**
   - Confirm card uses `bg-white`, `rounded-3xl`, subtle border (`border-gray-100`/`200`) and shadow off or very light to match reference. Tweak padding to `p-6` or `p-5` as necessary.
   - Ensure divider spacing matches screenshot (likely `mt-4` and `mb-3`).
5. **Stats section**
   - Replace centered `VStack` with two `HStack` rows (`Duration`, `Timestamp`) using `justify-between` to align labels left, values right.
   - Update helper formatting: pad seconds with leading zero, rename label to "Timestamp". Format timestamp to `MMM d, h:mm AM/PM` or `Today, 10:30 AM` logic if within current day (future enhancement optional).
6. **Data wiring in `app/review.tsx`**
   - Provide `avatarSubtitle` (e.g., `"AI Avatar"`) from `mockReviewData` or inline constant.
   - Ensure any new props or format helpers integrate without type errors.
7. **Follow-up polish (optional, document if skipped)**
   - Evaluate if we need dynamic relative timestamp (Today/Yesterday). If complex, note as future enhancement in plan comments.
   - Consider extracting shared text styles into `constants/ui-tokens.ts` if multiple review components need them.

## Testing & validation
- Render Review screen in iOS simulator; verify layout matches reference at default font scale.
- Confirm avatar image scaling and subtitle truncation behave correctly.
- Validate unit formatting for various durations (under 1 min, over 1 hour) and timestamps across locales if necessary.
- Run existing linting/tests (`npm run lint`, `npm run test` if available) after implementation.

## Rollout notes
- Coordinate with design for final values if brand tokens differ.
- Update screenshot/Documentation in `planned-changes/` after implementation if visuals change further.

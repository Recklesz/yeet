# Review Header Circular Score Plan

## Goal
- **Objective** Replace the numeric badge in `components/review/ReviewHeader.tsx` with a circular score card similar to the provided reference while keeping the surrounding `BrandGradient` container.

## Current State
- **Layout** `ReviewHeader()` renders a `BrandGradient` card with sentiment badge plus `Text` displaying `overallScore` as a plain number.
- **Data** `overallScore` arrives as a 0-100 value via `constants/review.ts` mock data; future API should return same range.
- **Header Integration** `app/review.tsx` already passes `overallScore` to `ReviewHeader()` and the top `AnimatedHeader` shows a summarized percentage string.

## Proposed UI Treatment
- **Ring Visualization** Create a circular progress ring with a gradient track, matching the screenshot (score centered with label "Out of 100").
- **Color Logic** Drive ring color by sentiment or score bucket (e.g., >=80 green, 60-79 blue, etc.) aligning with existing helpers in `ReviewHeader.tsx`.
- **Copy** Replace `Overall Performance` headline with `Your Practice Score` (TBD) and include subtext `out of 100` beneath the numeric value.
- **Responsiveness** Ensure component scales within the current 24px padding; target 160px diameter so it fits on small phones.

## Technical Approach
- **Componentization** Extract a `CircularScoreGauge` component to `components/review/CircularScoreGauge.tsx` accepting `score`, `max`, and `theme` props.
- **Rendering** Use `react-native-svg` (already installed) with two `Circle` elements: background track (semi-transparent) and foreground arc with strokeDashoffset based on score percentage.
- **Animation** Optionally animate the arc on mount using `react-native-reanimated` shared value (spring from 0 to score). Fallback to static rendering if animation adds complexity.
- **Gradient Stroke** Use `Svg` `Defs` + `LinearGradient` for track fill or rely on brand colors from `BrandGradient` background if gradient stroke is unnecessary.

## Implementation Steps
- **Create Gauge** Build `CircularScoreGauge` with props `{ score: number; max?: number; label?: string; sentiment?: ... }`.
- **Integrate** Replace existing numeric `Text` block in `ReviewHeader()` with the new component. Pass sentiment to derive color scheme (reuse `getSentimentStyles()` or map to hex codes).
- **Typography** Add centered `Text` elements inside gauge for score value and `Out of 100` copy using `VStack` overlay.
- **Accessibility** Provide `accessibilityLabel` summarizing the score and sentiment (e.g., "Overall score 78 out of 100, rated great").
- **Testing** Verify layout on iPhone 13 simulator: check pixel alignment and ensure no conflicts with `BrandGradient` padding.
- **Fallback** If animation causes issues, keep static ring and track via `useEffect` toggled by prop for future enhancement.

## Additional Considerations
- **SVG Size** Wrap `Svg` in fixed square view to avoid stretching; use `preserveAspectRatio="xMidYMid"`.
- **Dark Mode** Confirm copy color remains legible on brand gradient; include drop shadow or lighten gradient if needed.
- **Reusability** Component could later support other score surfaces (metrics list) so keep props generic.

## Next Actions
- **Implement Gauge Component** Scoped PR updating `ReviewHeader()` and adding `CircularScoreGauge`.
- **Refine Copy** Align with product voice once content strategy is defined.
- **Iterate with Design** Validate final colors/thickness with design before shipping.

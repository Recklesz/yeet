# Review Screen Improvements Plan

## Current Analysis

### What's Working
- Clean overall structure with AnimatedHeader
- Good color scheme (dark navy #0A1628, electric blue, green accents)
- Comprehensive feedback system with metrics, wins, and opportunities
- Toast notifications for achievements

### Issues Identified

1. **MetricGrid Layout** - Currently stacked vertically (1 per row)
   - Metrics like "Empathy" and "Outcome" should be 2-per-row for better space usage
   - Would look more modern and balanced

2. **Inconsistent Styling Patterns**
   - Mix of Tailwind classes (`className={cx(...)}`) and Gluestack props (`backgroundColor="$gray50"`)
   - Some components use `fontSize={20}`, others use `className="text-xl"`
   - Need to standardize on one approach

3. **Visual Hierarchy**
   - All cards look similar (gray backgrounds, similar borders)
   - Key sections don't stand out enough
   - Could benefit from better visual separation

4. **Spacing & Padding**
   - Some inconsistent gaps (`gap="$md"` vs `className="gap-6"`)
   - Review screen uses `px-5`, but components have their own padding
   - Could be more cohesive

5. **Button Styling**
   - "Retry This Scenario" button uses `bg-green-500` (not aligned with app colors)
   - Should use the dark navy/electric blue theme
   - Button positioning could be improved

## Proposed Changes

### 1. MetricGrid Component (2-column layout)
- Display metrics in 2-column grid on larger phones
- Keep 1-column on smaller screens
- Use HStack/VStack wrapping for responsive layout
- Maintain visual hierarchy with better card styling

### 2. Standardize on Tailwind + Gluestack Hybrid
- Use Tailwind classes for layout/spacing/colors
- Keep Gluestack components for structure (Box, VStack, HStack, etc.)
- Remove inconsistent prop-based styling
- Follow pattern from main screen

### 3. Visual Improvements
- **Summary card**: Make it stand out more (perhaps lighter background or subtle border)
- **Metrics**: Add subtle shadows or better borders for depth
- **Feedback items**: Improve win/opportunity visual distinction
- **Overall score card**: Make it more prominent/celebratory

### 4. Color Alignment
- Replace `bg-green-500` with app's electric blue for primary action
- Use consistent gray scale from Tailwind config
- Ensure all score colors align with theme

### 5. Button Improvements
- Primary button: Electric blue background (`bg-[#00D9FF]`)
- Secondary button: Keep outline style but align with theme
- Add proper spacing and sizing
- Consider sticky bottom positioning

## Implementation Order

1. ✅ **MetricGrid.tsx** - Convert to 2-column responsive grid with Tailwind
2. ✅ **ReviewHeader.tsx** - Standardize styling, improve visual hierarchy
3. ✅ **FeedbackAccordion.tsx** - Align colors, improve card design
4. ✅ **PromptList.tsx** - Standardize styling
5. ✅ **review.tsx** - Update button colors, improve spacing, ensure consistency

## Files to Modify

- `/components/review/MetricGrid.tsx`
- `/components/review/ReviewHeader.tsx`
- `/components/review/FeedbackAccordion.tsx`
- `/components/review/PromptList.tsx`
- `/app/review.tsx`

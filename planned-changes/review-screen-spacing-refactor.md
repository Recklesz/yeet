---
description: Token audit for review screen components
---

# Context
The review experience (`app/review.tsx` and children in `components/review/`) mixes Tailwind classes with direct pixel values and raw hex colors. To stay aligned with our NativeWind + Gluestack token conventions, we should replace hard-coded numbers with utility classes or design tokens.

# Issues
- **`app/review.tsx`**
  - Uses `style={{ backgroundColor: '#ffffff' }}` on `SafeAreaScreen`; should switch to `className="bg-white"` or Gluestack token.
  - Scroll content padding via `pt-[240px]` relies on arbitrary pixel value. Prefer scale-based spacing (e.g., reserve space by padding the header container or using `pt-60`).
  - Animated header props `maxHeight={240}` / `minHeight={140}` are pixel literals; consider deriving from spacing scale or responsive helper.
- **`components/common/AnimatedHeader.tsx`**
  - Inline `paddingHorizontal: 20` / `paddingBottom: 20` should move to Tailwind classes (`px-5`, `pb-5`).
  - Default background `#1a1f36` should reference brand token (`bg-background-950` or custom token).
  - Feather icon size `size={28}` could use design scale (e.g., `text-2xl` equivalent) or centralized constants.
- **`components/review/CircularScoreGauge.tsx`**
  - Gauge `size = 160`, `strokeWidth = 12`, and absolute positioning rely on raw pixels; convert to rem-aware scale or shareable sizing tokens.
  - Hex colors (`#16a34a`, etc.) duplicate Tailwind palette; source from token map or define via class utilities where possible.
- **`components/review/MetricGrid.tsx`**
  - Icon sizes (`size={20}`) should use shared scale constants.
  - Progress bar relies on inline width percentages; if we keep dynamic width, encapsulate in dedicated styled component that documents token usage.
- **`components/review/FeedbackAccordion.tsx` & `components/review/PromptList.tsx`**
  - Icon sizes (`size={16}`/`20`) and occasional color literals should be mapped to tokens.

# Recommended Actions
- **Introduce shared sizing constants** for icon/gauge dimensions (e.g., `const ICON_SIZES = { sm: 16, md: 20, lg: 24 }`).
- **Replace inline hex colors** with Tailwind/NativeWind class utilities or Gluestack token props (e.g., `text-success-600`).
- **Refactor spacing** by moving raw `style` paddings to `className` utilities and aligning header height with spacing scale or responsive helper.
- **Encapsulate dynamic styles** (e.g., progress width) in utility hooks/components that explain token usage, reducing scattered inline styles.
- **Document token mapping** for review UI in `planned-changes/` to guide future components toward consistent theming.

# Open Questions
- Do we need responsive scaling across different device classes for the header and gauge, or can we fix to token-based rem values?
- Should hex colors tightly map to existing Gluestack tokens, or do we define a small custom palette for brand gradients?

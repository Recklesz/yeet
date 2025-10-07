# Practice Review Screen Implementation Plan

## Overview
The goal is to introduce a dedicated `Review` screen that surfaces feedback and actionable insights immediately after a practice conversation. This screen should close the loop on the voice session launched from `app/(tabs)/explore.tsx`, summarize performance, and guide the user toward improvement and the next session.

## Target Placement
- **Route:** Add a new Expo Router screen at `app/review.tsx`. This keeps the screen outside the tab stack, allowing navigation via `router.push('/review')` after a call ends.
- **Navigation:** Register `Stack.Screen name="review"` in `app/_layout.tsx` (or consider a nested stack in `app/(tabs)/explore.tsx` if we want the review accessible only from Explore). Use `router.replace('/review')` from the conversation flow to prevent users returning to a finished call.
- **Back Navigation:** Provide a primary CTA that routes back to `/(tabs)/explore` for a new attempt and preserve the standard back gesture if appropriate.

## Experience Goals
- **Immediate feedback:** Reflect the latest session with clear headline metrics.
- **Actionable guidance:** Offer 2–3 concrete suggestions plus resources for improvement.
- **Progress tracking:** Show how the latest attempt compares with previous ones when historical data becomes available.

## Content Structure
1. **Hero Summary**
   - Conversation title, timestamp, avatar snapshot of the coach.
   - Overall score or sentiment badge (e.g., "Great effort"), color-coded based on performance.
2. **Key Metrics**
   - Cards for confidence, pacing, empathy, outcome alignment, etc.
   - Optional mini chart for score trends.
3. **Highlights & Opportunities**
   - Bulleted wins and areas to improve, each with short descriptions.
   - Could leverage icons from `@gluestack-ui/themed` and `IconSymbol`.
4. **Suggested Practice Prompts**
   - Recommended next scenarios, linking back to Explore or direct play buttons.
5. **Call-to-Action Row**
   - Buttons for "Retry Scenario", "Pick New Scenario", and "Save Notes".

## Data & Interfaces
- **New types:** Define a `ConversationReview` interface in `constants/review.ts` (or move shared types to `types/review.ts`). Fields: `scenarioId`, `title`, `completedAt`, `overallScore`, `metrics[]`, `wins[]`, `opportunities[]`, `suggestedPrompts[]`, `transcriptSummary?`.
- **Mock data:** Seed the screen with hard-coded sample data until the backend is ready. This enables UI iteration without blocking on APIs.
- **Future integration:** Expect payload from the voice session backend (VAPI post-call hook). Plan for server response to be stored in global state (e.g., Zustand or React Query) or passed via `router.push({ params })`.

## UI Implementation Steps
1. **Scaffold Screen Component**
   - Create `app/review.tsx` with a `ScrollView`/`Box` wrapper using Gluestack primitives.
   - Leverage `useColorScheme()` for theming consistency.
2. **Build Reusable UI Blocks**
   - New components in `components/review/`: `ReviewHeader`, `MetricGrid`, `FeedbackList`, `PromptList`.
   - Each component receives typed props from `ConversationReview`.
3. **Iconography & Styling**
   - Reuse `IconSymbol` or Gluestack `Icon` for status badges.
   - Consolidate colors in `constants/theme.ts` if we introduce new tokens.
4. **State Wiring**
   - Initially read `mockReviewData` from `constants/review.ts`.
   - Later swap to real data once backend integration lands (see TODO below).
5. **Navigation Hooks**
   - After `vapi.stop()` in `app/(tabs)/explore.tsx`, call a new handler (e.g., `handleSessionEnded(reviewData)`) that stores review data and routes to `/review`.
   - Provide navigation actions in the review screen to retry the same scenario (`router.replace('/(tabs)/explore')`) or explore others.

## Future Enhancements & TODOs
- **Persistent Storage:** Save historical reviews (AsyncStorage or Supabase) for longitudinal progress charts.
- **Voice Playback:** Embed key clips (requires recorded audio references from VAPI).
- **Share/Export:** Allow exporting feedback summary.
- **Notes Input:** Provide a text area for personal reflections, synced to storage.
- **Analytics:** Track review screen engagement to inform UX tweaks.

## Implementation Sequence
1. Add types and mock data in `constants/review.ts`.
2. Scaffold `app/review.tsx` with static layout using mock data.
3. Create supporting components under `components/review/` and hook them up.
4. Wire navigation from `app/(tabs)/explore.tsx` to display the review screen post-call.
5. Validate styling on both light/dark modes and adapt for different iPhone screen sizes.

## Open Questions
- What scoring dimensions should MVP include, and how are they computed?
- Will backend deliver structured review data synchronously after a call, or do we poll/await an async analysis?
- Do we need offline access to past reviews at launch, or is real-time feedback sufficient for now?

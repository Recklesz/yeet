---
description: Refactor practice tab to separate VAPI session management from presentation
---

# Context
- **Current screen**: `app/(tabs)/practice.tsx`
- **Problem**: VAPI client lifecycle, connection status handling, and UI rendering are tightly coupled, making it hard to reuse session logic, test behavior, and iterate on the visual design.

# Observations
- **Monolithic component**: `PracticeSessionScreen()` handles routing, header animation, VAPI instantiation, event listeners, and UI state in one file.
- **Event handling gaps**: Listeners registered via `vapi.on` are never removed, risking duplicate callbacks if the component remounts.
- **Implicit state machine**: Call states (`idle` → `connecting` → `connected` → `disconnected`) are represented by strings without guards, leading to ad hoc branching in the UI.
- **Alert-driven UX**: Error and how-to copy is surfaced via `Alert.alert`, preventing richer in-screen feedback.
- **Hard-coded content**: Avatar image, copy, and layout tokens are embedded in the component rather than sourced from `constants/` or scenario data.

# Goals
- **Separation of concerns**: Isolate VAPI session management from UI using a dedicated hook/service.
- **Predictable state**: Represent the call lifecycle with a typed state machine and shared types.
- **Composable UI**: Break the screen into smaller components (header/status, avatar card, controls panel, tips) for reuse and testing.
- **Config-driven content**: Read scenario metadata (coach name, avatar, tips) from `constants/scenarios.ts` or a new dedicated config.
- **Improved UX**: Replace alerts with inline feedback components and provide richer loading/error states.
- **Testability**: Enable unit tests for the session hook and visual regression coverage for the UI.

# Proposed Architecture
- **`hooks/usePracticeSession.ts`** (new)
  - Wrap `new Vapi(API_KEY)` with memoization and expose `status`, `muted`, `start()`, `stop()`, `toggleMute()`, and `error` state.
  - Subscribe to `call-start`, `call-end`, `error` events; detach listeners on cleanup.
  - Optionally accept a `scenarioId` to select the assistant ID.
- **`services/vapi-session.ts`** (optional)
  - Encapsulate VAPI client creation, assistant lookup, and environment validation (API key, assistant ID).
- **UI layer**
  - `PracticeScreenHeader` → consumes session status to render `AnimatedHeader`.
  - `PracticeCoachCard` → renders avatar, status badge, and copy.
  - `PracticeControls` → buttons for start/mute/stop driven by `status` and `muted` props.
  - `PracticeTipCard` → displays content from config.
- **Shared types/constants**
  - Move `CallStatus` enum and copy to `constants/practice.ts`.
  - Store tips, avatar URLs, and assistant IDs in config for easy updates.

# Implementation Steps
1. **Create session hook**
   - Validate keys via `VAPI_CONFIG` and throw descriptive errors.
   - Use `useEffect` to instantiate client, register/deregister listeners, and handle cleanup.
   - Model state with `useReducer` or `zustand` slice aligned with `CallStatus` enum.
2. **Refactor screen composition**
   - Convert `PracticeSessionScreen()` into a thin container that imports components and the session hook.
   - Move inline styles to `className` utilities per NativeWind conventions; wrap with Gluestack tokens only when necessary.
3. **Introduce config**
   - Extend `constants/scenarios.ts` or add `constants/practice.ts` for coach metadata, surface status copy, and tips sourced from data.
4. **Enhance UX feedback**
   - Replace `Alert.alert` with `Toast` or inline `Callout` component (new common pattern) to show connection issues and guidance.
   - Add subtle animations (e.g., pulsing badge) using Reanimated while keeping logic separate.
5. **Testing & docs**
   - Add unit tests for `usePracticeSession` using Jest + mocks for `@vapi-ai/react-native`.
   - Update `planned-changes/` docs if new patterns emerge; add usage notes in `AGENTS.md` if the hook becomes canonical.

# Open Questions
- Should multiple practice scenarios share the same assistant ID, or do we need dynamic selection per scenario?
- Do we need offline/poor-network handling (retry, backoff) beyond current alerts?
- How should errors surface visually (toast, banner, inline card) to stay consistent with the rest of the app?

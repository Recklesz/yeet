---
description: add practice session mock mode for development
---

# Goals

- **Prevent live Vapi usage in dev**: Ensure `app/(tabs)/practice.tsx` can be exercised without incurring real call costs.
- **Mirror production UX**: Keep the idle/connecting/connected flows identical so UI iterations stay representative.
- **Maintain single hook contract**: Preserve the `usePracticeSession()` API consumed by the screen and controls.

# Constraints & Inputs

- **Existing flow**: `usePracticeSession.ts` initializes `@vapi-ai/react-native` and exposes `CallStatus`, mute, and stop handlers.
- **UI surface**: `PracticeControls.tsx` expects `status`, `isMuted`, `onStart`, `onEnd`, `onToggleMute`.
- **Config**: `constants/vapi.ts` currently reads `EXPO_PUBLIC_VAPI_API_KEY`.
- **Target**: Mock behavior should activate while developing locally (e.g. Expo Dev Client) and fall back to live for staging/prod.

# Proposed Architecture

- **Practice mode toggle**
  - Add `PRACTICE_MODE` enum (`'live' | 'mock'`) derived from a new env var `EXPO_PUBLIC_PRACTICE_MODE` with default `'mock'` when key/assistant are missing.
  - Export from `constants/practice.ts` (or new `constants/config.ts`) for reuse in tests/dev tooling.
- **Session adapter layer**
  - Define `PracticeSessionAdapter` interface in `hooks/usePracticeSession` describing `start()`, `stop()`, `setMuted()`, and event subscription helpers.
  - Implement `VapiPracticeSessionAdapter` (current logic) and `MockPracticeSessionAdapter` (timed state machine).
  - Choose adapter at hook init via `PRACTICE_MODE`.
- **Mock timeline**
  - Mock adapter should:
    - Emit `call-start` after ~2 s to mirror connecting state.
    - Cycle hints every 10 s just like live mode.
    - Auto-end after configurable duration (e.g. 2 min) unless user taps stop.
    - Toggle mute locally without audio side effects.
  - Use `setTimeout` / `setInterval`; store handles for cleanup.
- **Shared state handling**
  - Keep hook state machine (`status`, `isMuted`, `error`) unchanged; only the adapter implementation differs.
  - Reuse existing `start`, `stop`, `toggleMute` callbacks to avoid UI changes.
- **Dev surfacing**
  - Optionally surface active mode (badge) in `PracticeControls` footer while in mock to avoid confusion, behind a `__DEV__` check.

# Implementation Steps

1. **Introduce config toggle**
   - Extend `constants/vapi.ts` (or create `constants/runtime.ts`) to export `PRACTICE_MODE`.
   - Provide defaults: `'live'` when both API key and assistant ID exist; `'mock'` otherwise or when env explicitly set.
2. **Create adapter types**
   - Define `PracticeSessionAdapter` interface and event listener types in `hooks/usePracticeSession.ts` (or `hooks/practiceSessionAdapter.ts`).
   - Extract current Vapi-specific code into `VapiPracticeSessionAdapter` class.
3. **Implement mock adapter**
   - Create `MockPracticeSessionAdapter` maintaining internal `status` + timers.
   - Simulate events: call listeners on `start()`/`stop()`, support `setMuted` no-op with state update, expose cleanup.
   - Provide optional scripted transcript/hints: an array of stub messages to reuse for future UI work.
4. **Refactor hook**
   - Replace direct `new Vapi()` usage with adapter factory.
   - On cleanup, call adapter `dispose()` to cancel timers / remove listeners.
   - Ensure `isConfigured` reflects adapter readiness (true for mock, live only when key present).
5. **Update practice screen docs/tests**
   - Adjust `PRACTICE_COPY.errors.configError` to reflect mock fallback (e.g. only alert when in live mode without config).
   - Add unit test (if infra exists) to assert mock mode transitions, or document manual QA steps.

# Validation

- **Mode toggle**: Launch with `EXPO_PUBLIC_PRACTICE_MODE=mock` (default) and confirm no network calls while statuses progress.
- **Live regression**: Set `EXPO_PUBLIC_PRACTICE_MODE=live` with valid key; ensure actual call still functions.
- **Cleanup**: Reload screen multiple times verifying no lingering timers/log noise in mock mode.

# Open Questions

- **Duration tuning**: How long should the mock session run before auto-ending?
- **Scripted audio**: Do we want placeholder audio playback to mimic coach voice, or keep silent for now?
- **Mode surfacing**: Should the app surface a banner to remind testers they are in mock mode?

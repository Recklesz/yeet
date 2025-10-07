# Supabase Auth & Storage — Minimal Implementation Plan

## Context & Constraints
- Expo managed workflow targeting iOS only; we already rely on Dev Client builds for native modules like VAPI.
- Existing state providers live in `app/_layout.tsx` (Gluestack + navigation). No global data layer yet; we can add a lightweight auth provider without disrupting tabs.
- Async session persistence is already supported via `@react-native-async-storage/async-storage`; we can reuse it for Supabase auth token storage to avoid new native dependencies. SecureStore can be considered later if we need hardware-backed storage.
- Goal: introduce Supabase incrementally so the Explore voice flow keeps working while we layer sign-in and file uploads.

## Phase 0 — External Setup
1. Create a Supabase project (prod + staging recommended) and note the `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and a service role key (service key stays server-side only).
2. In Supabase, enable email OTP (or password) auth and create a storage bucket (e.g. `practice-runs`) with public read + authenticated write policies. Keep stricter policies for conversation transcripts if needed.
3. Configure redirect URL(s) in Supabase Auth settings to match Expo Dev Client and future production scheme (e.g. `yeet://auth` and `https://auth.expo.dev/@owner/yeet`).

## Phase 1 — Client Bootstrap (minimal code footprint)
1. Dependencies: add `@supabase/supabase-js@latest` to `package.json`. We already have `AsyncStorage`, so no extra adapter package is required.
2. Env plumbing:
   - Extend `.env.example` / `.env` with `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY`.
   - Update `app.json` (or `app.config.ts` if we introduce it later) to expose the new public env vars and add the custom `scheme` used for auth redirects.
3. Supabase client: create `lib/supabase.ts` exporting a singleton `supabase` instance configured with `createClient(url, anonKey, { auth: { storage: AsyncStorage } })` and `persistSession: true`.
4. Lightweight provider: add `providers/supabase-provider.tsx` (or similar) that wraps `SessionContextProvider`-style logic: tracks the current session, exposes `signInWithOtp`, `signOut`, etc. Mount it inside `app/_layout.tsx` above `ThemeProvider`.

## Phase 2 — Minimal Auth Flow
1. UI entry point: replace the placeholder `app/(tabs)/index.tsx` screen with an auth-aware home. If no session, show a single-screen sign-in form (email OTP for now) using Gluestack components; otherwise route into the existing tabs.
2. Hook integration: create `hooks/useSupabaseAuth.ts` to read context, surface `session`, `user`, and `loading`.
3. Sign-out affordance: add a basic profile/action sheet accessible from the tab bar (e.g. top-right button on Explore) with `signOut()` so we can test the loop.
4. Handle Supabase redirect events inside the provider (watch `supabase.auth.onAuthStateChange`) to update session after OTP/magic-link completion.

## Phase 3 — Storage Wiring (keep scope small)
1. Storage helper: add `lib/supabase-storage.ts` with thin wrappers for `uploadVoiceAsset(fileUri, sessionId)` and `listUserSessions(userId)`.
2. Explore integration (optional for first PR): after a call ends (`call-end` handler in `app/(tabs)/explore.tsx`), gate uploads behind `if (session)` and enqueue an upload of the recorded audio/transcript once that capture pipeline exists. For now, log the helper invocation to prove wiring.
3. Add row-level security policies in Supabase (documented in repo) so users can only read/write their own session artifacts.

## Phase 4 — QA & Documentation
1. Smoke test on iOS simulator with Dev Client: verify sign-in, session persistence across app restarts, and that storage helper can list bucket contents.
2. Document CLI usage in `README.md` (new `EXPO_PUBLIC_` keys, how to run with Supabase) and link to the plan for future enhancements.
3. Create follow-up tasks: secure storage migration (SecureStore), social/OAuth providers, serverless functions for scoring, background uploads.

## Notes on Minimal Change Strategy
- No navigation restructuring yet; we keep the tab router and gate content via conditional rendering.
- We postpone fully wiring audio uploads until the recording pipeline is ready; initial storage helper can target placeholder files.
- Service key and any heavier backend logic stay out of the client—future work will include Edge Functions for scoring and secure processing.

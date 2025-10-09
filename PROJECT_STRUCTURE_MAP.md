# Project Structure Map

## Overview
- **Platform** Expo-managed React Native iOS app for the `yeet` practice gym.
- **Navigation** Expo Router with file-based tabs inside `app/(tabs)/`.
- **Design system** Gluestack UI + NativeWind utilities, colors sourced from `constants/ui-tokens.ts`.
- **Realtime voice** VAPI client keyed off `constants/vapi.ts` and wired into practice flows.

## Core App Entry (`app/`)
- **`_layout.tsx`** Sets up `GluestackUIProvider`, theme sync, and the root stack.
- **`(tabs)/_layout.tsx`** Configures the bottom tab navigator.
- **`(tabs)/index.tsx`** Landing tab with hero copy, quick links, and navigation affordances.
- **`(tabs)/practice.tsx`** Primary practice session UI: scenario card, progress timer, hint cycling, and controls driven by `usePracticeSession()`.
- **`(tabs)/explore.tsx`** Lightweight VAPI call demo retained for regression testing.
- **`review.tsx`** Standalone review flow that reads serialized feedback via router params and renders `components/review/*` widgets.
- **`modal.tsx`** Example modal route kept as a reference implementation.

## Shared UI & Logic
- **`components/common/`** Cross-screen primitives such as `SafeAreaScreen`, `BrandGradient`, `CustomHeader`, and confirmation dialogs.
- **`components/practice/PracticeControls.tsx`** Clustered microphone/mute/end controls reused across call states.
- **`components/review/`** Feedback visualization (score gauge, accordion, checklist) powering `app/review.tsx`.
- **`components/ui/`** Gluestack provider wiring, icons, and collapsible helpers for composable layouts.
- **`hooks/usePracticeSession.ts`** Encapsulates VAPI client lifecycle, status state machine, and mute/start/stop handlers consumed by `practice.tsx`.

## Data & Configuration
- **`constants/practice.ts`** Scenario copy, hint lists, and CTA text for the practice session.
- **`constants/review.ts`** Feedback types plus mock dataset for the review screen.
- **`constants/vapi.ts`** Exposes `EXPO_PUBLIC_VAPI_API_KEY` lookup and the `DATING_COACH_ASSISTANT_ID`.
- **`constants/ui-tokens.ts`** Central palette + typography tokens feeding NativeWind and Gluestack themes.

## Assets, Docs & Planning
- **`assets/`** Avatar art and icons declared in `app.json`.
- **`AGENTS.md`** High-level product brief and working agreements for agents.
- **`planned-changes/`** Feature design notes (e.g., practice screen redesign requirements) that inform current implementation.

## Tooling & Environment
- **`package.json`** Expo SDK 54 app with Gluestack UI, NativeWind, and `@vapi-ai/react-native`; includes dev-client scripts (`npm run ios:sim`, `npm run start:dev`).
- **`app.json`** App metadata plus iOS microphone, background audio, and VoIP entitlements required for VAPI.
- **`tsconfig.json`, `eslint.config.js`, `tailwind.config.js`, `global.css`** Type, lint, and styling configuration.
- **`babel.config.js`, `metro.config.js`** Bundler configuration for Expo.
- **`.env.example`** Documents required runtime secrets; copy to `.env` before launching the dev client.

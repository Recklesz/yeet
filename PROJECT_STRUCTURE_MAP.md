# Project Structure Map

## Overview
- **Platform** Expo-managed React Native iOS app with Expo Router tabs in `app/(tabs)/`.
- **Design** Gluestack UI + NativeWind, tokens sourced from `constants/design-palette.*` and `constants/ui-tokens.ts`.
- **Voice** VAPI client exposed via `constants/vapi.ts`, consumed by practice flows and adapters.

## App Entrypoints (`app/`)
- **`_layout.tsx`** Root stack + `GluestackUIProvider` wiring.
- **Tabs** `(tabs)/_layout.tsx` defines navigation; `index.tsx` (landing), `practice.tsx` (primary session), `explore.tsx` (VAPI regression).
- **`review.tsx`** Renders serialized feedback using `components/review/*` widgets.
- **`modal.tsx`** Reference modal route.

## Shared UI & Logic
- **`components/common/`** Cross-screen wrappers like `SafeAreaScreen`, `BrandGradient`, dialogs.
- **`components/practice/PracticeControls.tsx`** Reusable start/mute/end cluster.
- **`components/review/`** Score gauge, accordion, checklist modules.
- **`components/ui/`** Gluestack provider, icons, collapsible helpers.
- **`hooks/usePracticeSession.ts`** VAPI lifecycle + status state machine.
- **`hooks/practiceSessionAdapter.ts`** Shapes practice state and feedback payloads.
- **`hooks/use-animated-header.ts`** Shared scroll-driven header animation helpers.

## Data & Config
- **`constants/practice.ts`** Scenario copy, hints, CTA text.
- **`constants/review.ts`** Feedback schema and mock data.
- **`constants/scenarios.ts`** Scenario catalog shared with cards and review.
- **`constants/runtime.ts`** Environment helpers for dev vs prod flags.
- **`constants/vapi.ts`** API key lookup + `DATING_COACH_ASSISTANT_ID`.
- **`constants/design-palette.*` / `ui-tokens.ts`** Palette, spacing, typography tokens.

## Assets & Docs
- **`assets/`** Avatar art and icons referenced by `app.json`.
- **`AGENTS.md`** Product brief and working agreements.
- **`docs/`** Classname conventions and token system references.
- **`planned-changes/`** Current feature specs and design notes.

## Tooling
- **`package.json`** Expo SDK 54 deps and dev-client scripts (`npm run ios:sim`, `npm run start:dev`).
- **`app.json`** Metadata + mic/background audio/VoIP entitlements.
- **Configs** `tsconfig.json`, `eslint.config.js`, `tailwind.config.js`, `global.css` for typing, lint, styling.
- **Bundler** `babel.config.js`, `metro.config.js`.
- **Secrets** `.env.example` documents `EXPO_PUBLIC_VAPI_API_KEY`.

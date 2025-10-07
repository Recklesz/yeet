# Project Structure Map

## Overview
- **App focus** Expo-managed React Native iOS app delivering the `yeet` voice coaching experience.
- **Navigation** Expo Router with file-based routing centered around `app/`.
- **UI stack** Gluestack UI components layered with NativeWind styling helpers.
- **Voice integration** VAPI client configuration in `constants/vapi.ts` used by the `Explore` tab.

## Top-Level Directories
- **app/** Entry point for all screens and navigation layouts.
  - **_layout.tsx** Root stack, wires `GluestackUIProvider`, react-navigation theme, and `(tabs)` anchor.
  - **(tabs)/** Tab navigator screens (`_layout.tsx`, `index.tsx`, `explore.tsx`).
    - **explore.tsx** Voice chat UI with VAPI lifecycle (`start`, `stop`, `mute`).
    - **index.tsx** Placeholder home tab using themed components.
  - **modal.tsx** Example modal screen kept for reference.
  - **review.tsx** Standalone review screen rendering mock conversation feedback via query params.
- **components/** Shared UI primitives and helpers.
  - **themed-*.tsx** Theme-aware text and view wrappers.
  - **external-link.tsx** Wrapper for in-app links.
  - **haptic-tab.tsx** Custom tab bar button with haptics.
  - **hello-wave.tsx**, **parallax-scroll-view.tsx** Showcase components from Expo starter.
  - **ui/** Gluestack-related utilities (`collapsible.tsx`, `icon-symbol.tsx`, `gluestack-ui-provider/`).
    - **gluestack-ui-provider/** Configures tokens, overlay, and toast providers for design system.
- **constants/** Centralized configuration and mock data.
  - **vapi.ts** Reads `EXPO_PUBLIC_VAPI_API_KEY`, stores `DATING_COACH_ASSISTANT_ID`.
  - **theme.ts** Light/dark color tokens and font families.
  - **review.ts** Types and `MOCK_REVIEW` data for the feedback screen + serialization helper.
- **hooks/** App-specific hooks, currently color scheme helpers syncing NativeWind with RN.
  - **use-color-scheme.ts** Bridge between Expo Router theme and NativeWind.
  - **use-theme-color.ts**, **use-color-scheme.web.ts** Platform-specific variants.
- **assets/** Static images and icons referenced by Expo (`app.json` preloads).
- **planned-changes/** Product and engineering planning notes (`vapi-integration.md`, Firebase roadmaps, etc.).
- **scripts/** Utility scripts (`reset-project.js` restores Expo starter scaffolding).
- **android/**, **ios/** Managed by Expo prebuild/dev client (currently placeholders).

## Configuration & Tooling Files
- **app.json** App metadata, splash/mask icons, iOS mic/background audio permissions, VAPI requirements.
- **package.json** Dependencies (Expo SDK 54, `@vapi-ai/react-native`, Gluestack UI, NativeWind) and npm scripts.
- **tsconfig.json**, **eslint.config.js**, **tailwind.config.js**, **global.css** TypeScript, linting, and styling setups.
- **babel.config.js**, **metro.config.js** Build pipeline configuration for Expo/Metro bundler.
- **.env.example** Documents required env vars (`EXPO_PUBLIC_VAPI_API_KEY`).

## Developer Notes & Reference Docs
- **AGENTS.md** Project brief, vision, next steps for agents.
- **CLAUDE.md** Parallel agent instructions.
- **README-mcp.md** MCP tooling guide.
- **README.md** Default Expo getting-started instructions (legacy boilerplate).
- **planned-changes/** Additional roadmaps (Firebase, Supabase, VAPI) guiding upcoming work.

## Workflow Highlights
- **Voice chat flow** `app/(tabs)/explore.tsx` instantiates VAPI client, listens for `call-start` / `call-end` events, and renders control buttons via Gluestack components.
- **Review flow** `app/review.tsx` consumes `constants/review.ts` mock data, parses router params, and renders feedback checklists with `IconSymbol` glyphs.
- **Theming** `app/_layout.tsx` injects `GluestackUIProvider` while `components/ui/gluestack-ui-provider/` syncs NativeWind color mode with the design tokens.

## Environment Expectations
- **Environment vars** Add secrets to `.env` (mirrors `.env.example`), Expo exposes `EXPO_PUBLIC_*` keys at runtime.
- **Dev scripts** Use `npm install`, `npx expo start`, or custom dev-client commands (`npm run ios:sim`, `npm run start:dev` if defined in `package.json`).

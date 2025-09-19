# AGENTS.md

## Project

**yeet** — a mobile practice gym that helps men get better at talking to women *in real life* by rehearsing with AI avatars in realistic scenarios and getting instant, actionable feedback. fs

**Vision:** Pick a scenario → voice chat with an avatar → receive feedback → retry → track progress.

This app is only going to be developed for iOS - iphones.

## Current Status

🚧 **Early Development** — Foundation complete. Basic voice chat via VAPI is integrated on the Explore tab; more features pending.

## Tech Stack (Current Implementation)

* **App:** React Native (TypeScript) via **Expo** managed workflow (v54)
* **UI:** **Gluestack UI** + NativeWind/Tailwind ✅ *configured*
* **Navigation:** React Navigation + Expo Router ✅ *configured*
* **Animation:** React Native Reanimated ✅ *installed*
* **Dev environment:** Windsurf/VS Code, Node LTS, Xcode for iOS Simulator

## Current Project Structure

```
/app
  /(tabs)
    index.tsx (default Expo home screen)
    explore.tsx (default Expo explore screen)
  _layout.tsx (root layout with Gluestack provider)
  modal.tsx (example modal)
/components
  /ui (Gluestack UI components)
  themed-text.tsx, themed-view.tsx (theme-aware components)
/hooks
  use-color-scheme.ts (theme hooks)
```

## Local Dev

```bash
# install dependencies
npm install

# start development server
npx expo start
# press: i (iOS simulator)
```

## Next Steps (Not Yet Implemented)

* **Voice Interface:** Implement speech-to-text and text-to-speech functionality
* **Audio UI:** Build voice chat interface with recording/playback controls
* **Backend:** Set up serverless API endpoints for voice processing and LLM integration
* **Scenarios:** Create scenario system and voice prompts
* **Screens:** Replace default Expo screens with yeet-specific UI
* **AI Integration:** Connect to LLM service for avatar voice responses
* **Scoring:** Implement voice conversation feedback system

## What agents can help with

* Replace default screens with yeet-specific UI using Gluestack patterns
* Set up voice chat interface and conversation flow
* Implement speech-to-text and text-to-speech integration
* Create scenario system and voice-optimized AI prompt engineering
* Build backend API endpoints for voice processing and LLM integration
* Implement voice conversation scoring/feedback algorithms

## VAPI Voice Chat Integration (Concise)

- **What it is**
  - Real-time voice conversations powered by `@vapi-ai/react-native` with sub-second latency. The `Explore` tab hosts the first voice chat UI.

- **Key files**
  - `app/(tabs)/explore.tsx` — Voice chat UI and VAPI client lifecycle (init, `call-start`/`call-end`/`error` listeners, controls for start/mute/end).
  - `constants/vapi.ts` — Loads `EXPO_PUBLIC_VAPI_API_KEY` and holds `DATING_COACH_ASSISTANT_ID` used by the client.
  - `.env` / `.env.example` — Defines `EXPO_PUBLIC_VAPI_API_KEY` used at runtime.
  - `app.json` — iOS mic permission plus background audio/VoIP modes configured.

- **Setup**
  1) Add your VAPI key to `.env` as `EXPO_PUBLIC_VAPI_API_KEY`.
  2) Use a Dev Client (required for native modules):
     - Build: `npm run ios:sim` (or open via Xcode)
     - Start: `npm run start:dev`
  3) Open the app → `Explore` tab → Tap the call button.

- **Runtime flow**
  - `new Vapi(API_KEY)` created on mount; event handlers update UI state.
  - Start call with `vapi.start(DATING_COACH_ASSISTANT_ID)`; controls: `setMuted()` and `stop()`.
  - Errors are surfaced via alerts and console logs; status shows connecting/connected/ended.

- **Notes**
  - Not compatible with Expo Go; Dev Client build is required.
  - iOS 12+; background audio and VoIP modes enabled in `app.json`.
  - Assistant behavior is managed in VAPI; we reference the preconfigured `DATING_COACH_ASSISTANT_ID`.

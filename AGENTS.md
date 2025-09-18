# AGENTS.md

## Project

**yeet** — a mobile practice gym that helps men get better at talking to women *in real life* by rehearsing with AI avatars in realistic scenarios and getting instant, actionable feedback.

**Vision:** Pick a scenario → voice chat with an avatar → receive feedback → retry → track progress.

This app is only going to be developed for iOS - iphones.

## Current Status

🚧 **Early Development** - This is currently a fresh Expo project with foundation setup complete. Core yeet features are not yet implemented.

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

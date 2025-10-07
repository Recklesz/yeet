 Here are the key differences:

  npm run ios:sim (line 9):
  - Runs expo run:ios
  - Builds a development client with native modules
  - Installs and launches the app on iOS simulator
  - Creates a standalone app that includes VAPI's native dependencies

  npm run start:dev (line 7):
  - Runs expo start --dev-client
  - Starts the Metro bundler expecting a dev client
  - Requires the app to already be built and installed
  - Serves JavaScript bundle to the existing dev client app

  The workflow:
  1. First run npm run ios:sim to build and install the dev client
  2. Then run npm run start:dev to serve the JavaScript code to that client

  vs. regular Expo Go:
  - npx expo start + press 'i' uses Expo Go app (doesn't support native modules like VAPI)
  - The dev client approach supports all native dependencies

Native modules vs JavaScript separation

  Your app uses native modules like @vapi-ai/react-native that contain compiled native code (Objective-C/Swift for iOS) that must be built
  into the app binary. This can't be done at runtime.

  Why two steps:
  1. Build step (npm run ios:sim): Compiles native code, sets permissions, creates the "shell"
  2. Serve step (npm run start:dev): Sends your JavaScript code to that pre-built shell

  Why not one step:
  - Native code compilation takes time and requires Xcode
  - JavaScript changes frequently during development
  - Separating them lets you hot-reload JS instantly without rebuilding native parts

  Expo Go can't work because it's a pre-built app with only Expo's chosen native modules. Your VAPI voice chat needs custom native audio
  processing that Expo Go doesn't have.

  Think of it like: the dev client is the "car engine" (native), and your JavaScript is the "fuel" (served dynamically). You build the
  engine once, then keep adding fuel as needed.
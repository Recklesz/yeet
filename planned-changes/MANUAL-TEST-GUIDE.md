# Manual Testing Guide - Practice Session Mock Mode

## Quick Test (Mock Mode - Default)

The app is currently running in the iOS Simulator. Follow these steps to verify mock mode works:

### Step 1: Navigate to Practice Tab
1. In the simulator, tap the **"Practice"** tab at the bottom
2. You should see the "Coffee Shop First Date" scenario card

### Step 2: Start Practice Session
1. Tap **"Begin Practice"** button
2. Watch for the transition:
   - Status should show "connecting" (yellow spinner) for ~2 seconds
   - Then transition to "connected" state

### Step 3: Verify Mock Mode Active
Look for these indicators that mock mode is working:
- ✅ **"MOCK MODE - No API calls"** badge visible below controls (yellow badge)
- ✅ No network activity/requests in logs
- ✅ Hints cycling every 10 seconds at bottom of screen
- ✅ Progress bar animating
- ✅ Three control buttons visible: Mute | Stop | Speaker

### Step 4: Test Controls
1. **Mute button** (left): Tap to toggle - icon should change between mic/mic-slash
2. **Stop button** (center, red): Tap to end session
   - Should transition to "disconnected" then back to "idle" after 2s
   - Should return to the scenario card screen

### Step 5: Test Auto-End (Optional)
1. Start a new session
2. Wait 2 minutes without stopping
3. Session should auto-end and return to idle

### Step 6: Test Cleanup
1. Navigate away from Practice tab
2. Come back to Practice tab
3. Start a new session
4. Should work cleanly without errors

## Expected Console Logs

When you navigate to the Practice tab, you should see:
```
[usePracticeSession] Initializing in mock mode
[MockAdapter] Initializing mock practice session adapter
```

When you tap "Begin Practice":
```
[usePracticeSession] Starting practice session...
[MockAdapter] Starting mock session (assistant ID ignored): <id>
```

After ~2 seconds:
```
[MockAdapter] Mock call started
[usePracticeSession] Call started
```

When you stop:
```
[usePracticeSession] Stopping practice session...
[MockAdapter] Stopping mock session
[usePracticeSession] Call ended
```

## What to Check For

### ✅ Success Indicators
- No "Configuration Error" alerts
- Session connects after 2 seconds
- "MOCK MODE" badge visible during session
- Controls work smoothly
- No crashes or errors
- Clean state transitions

### ❌ Failure Indicators
- "Configuration Error" alert appears
- Session never connects
- App crashes
- Console shows errors
- Timers don't fire
- State gets stuck

## Advanced: Test Live Mode

### Prerequisites
1. Valid VAPI API key
2. Active VAPI assistant configured

### Steps
1. Stop the app (kill the simulator process)
2. Create/edit `.env` file in project root:
   ```
   EXPO_PUBLIC_VAPI_API_KEY=your_actual_vapi_key_here
   EXPO_PUBLIC_PRACTICE_MODE=live
   ```
3. Rebuild: `npm run ios:sim`
4. Navigate to Practice tab
5. Tap "Begin Practice"

### Expected Behavior (Live Mode)
- Real VAPI call initiated
- Actual voice interaction with AI
- NO "MOCK MODE" badge shown
- Real audio input/output
- Network requests visible in logs

## Troubleshooting

**Problem:** Session stuck on "connecting"
- Check console for errors
- Verify mock adapter initialization logs

**Problem:** "Configuration Error" in mock mode
- Should NOT happen - this is a bug
- Check that `PRACTICE_MODE` is 'mock' in logs

**Problem:** No "MOCK MODE" badge
- Only shows in `__DEV__` mode
- Only shows when `PRACTICE_MODE === 'mock'`
- Only shows during "connected" state

**Problem:** App crashes on start
- Check TypeScript compilation: `npm run typecheck`
- Check for import errors in console

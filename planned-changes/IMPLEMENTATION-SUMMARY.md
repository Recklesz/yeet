# Practice Session Mock Mode - Implementation Summary

## Status: ✅ IMPLEMENTED

## What Was Implemented

### 1. Runtime Configuration (`constants/runtime.ts`)
- Created `PRACTICE_MODE` configuration that auto-detects whether to use 'live' or 'mock' mode
- Defaults to 'mock' when VAPI API key is missing (dev-friendly)
- Can be explicitly set via `EXPO_PUBLIC_PRACTICE_MODE` environment variable
- Added documentation to `.env.example`

### 2. Adapter Pattern (`hooks/practiceSessionAdapter.ts`)
Created a clean adapter interface with two implementations:

**PracticeSessionAdapter Interface:**
- `start(assistantId)` - Begin a practice session
- `stop()` - End the current session
- `setMuted(muted)` - Toggle microphone mute
- Event listeners: `on/off` for 'call-start', 'call-end', 'error'
- `dispose()` - Cleanup resources

**VapiPracticeSessionAdapter:**
- Wraps `@vapi-ai/react-native` for real VAPI calls
- Preserves all existing live functionality
- No changes to actual call behavior

**MockPracticeSessionAdapter:**
- Simulates practice session with timers (no API calls)
- 2-second connecting delay (mirrors real connection time)
- Auto-ends after 2 minutes (configurable)
- Cycles through hints every 10 seconds (just like live)
- Mute toggle tracked locally (no-op for audio)
- All timers properly cleaned up on dispose

### 3. Refactored Hook (`hooks/usePracticeSession.ts`)
- Replaced direct VAPI client usage with adapter pattern
- Hook API remains **100% unchanged** - zero breaking changes
- Automatically selects correct adapter based on `PRACTICE_MODE`
- Mock mode always reports `isConfigured: true`
- Live mode only works when VAPI key is present

### 4. Updated Practice Screen (`app/(tabs)/practice.tsx`)
- Only shows config error in live mode (not in mock)
- Mock mode works out-of-the-box with no configuration

### 5. Dev Mode Indicator (`components/practice/PracticeControls.tsx`)
- Shows "MOCK MODE - No API calls" badge when:
  - Running in `__DEV__` mode AND
  - `PRACTICE_MODE === 'mock'`
- Yellow badge positioned below controls
- Only visible during active session (connected state)

## Files Created
- `constants/runtime.ts` - Mode detection and configuration
- `hooks/practiceSessionAdapter.ts` - Adapter interface and implementations

## Files Modified
- `.env.example` - Added PRACTICE_MODE documentation
- `hooks/usePracticeSession.ts` - Refactored to use adapters
- `app/(tabs)/practice.tsx` - Updated config error handling
- `components/practice/PracticeControls.tsx` - Added dev mode indicator

## How It Works

### Default Behavior (No API Key)
1. App starts without VAPI_API_KEY
2. `PRACTICE_MODE` auto-detects → 'mock'
3. `MockPracticeSessionAdapter` is used
4. Practice screen works without any configuration
5. No API calls, no costs, perfect for development

### Live Mode (With API Key)
1. Add `EXPO_PUBLIC_VAPI_API_KEY` to `.env`
2. `PRACTICE_MODE` auto-detects → 'live'
3. `VapiPracticeSessionAdapter` is used
4. Real VAPI calls with actual assistant

### Manual Override
Set `EXPO_PUBLIC_PRACTICE_MODE=mock` or `=live` in `.env` to force a specific mode.

## Testing Checklist

### Mock Mode Testing
- [x] TypeScript compilation passes
- [x] App builds successfully
- [ ] Navigate to Practice tab
- [ ] Tap "Begin Practice" - should connect after 2s
- [ ] See "MOCK MODE" badge during session
- [ ] Mute button toggles state (no audio)
- [ ] Session auto-ends after 2 min OR manually stop
- [ ] Hints cycle every 10 seconds
- [ ] No network calls in dev tools
- [ ] No errors in console
- [ ] Screen cleanup works (reload multiple times)

### Live Mode Testing
- [ ] Add valid VAPI_API_KEY to .env
- [ ] Set EXPO_PUBLIC_PRACTICE_MODE=live
- [ ] Rebuild and launch
- [ ] Navigate to Practice tab
- [ ] Actual VAPI call connects
- [ ] Real voice interaction works
- [ ] Mute actually affects audio
- [ ] No "MOCK MODE" badge shown

## Benefits Achieved

✅ **Cost Savings:** No VAPI charges during development
✅ **Faster Iteration:** No network latency, instant testing
✅ **Offline Development:** Works without internet/API keys
✅ **Zero Breaking Changes:** Existing code 100% compatible
✅ **Clean Architecture:** Easy to add more adapters (e.g., replay mode)
✅ **Dev Experience:** Clear visual indicator when in mock mode
✅ **Production Ready:** Simple toggle to switch to live mode

## Usage Instructions

### For Developers
1. Clone the repo
2. Run `npm install`
3. Run `npm run ios:sim` (no .env needed!)
4. Practice screen works in mock mode by default

### For Production/Staging
1. Add `EXPO_PUBLIC_VAPI_API_KEY` to `.env`
2. Optionally set `EXPO_PUBLIC_PRACTICE_MODE=live`
3. Build and deploy

## Future Enhancements
- Add scripted responses/transcript in mock mode
- Add placeholder audio playback
- Create "replay" adapter for debugging real sessions
- Add mock mode duration configuration
- Surface mode indicator in app settings

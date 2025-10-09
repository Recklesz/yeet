import { VAPI_CONFIG } from './vapi';

/**
 * Practice mode determines whether to use live VAPI calls or mock simulation.
 */
export type PracticeMode = 'live' | 'mock';

/**
 * Determines the active practice mode based on environment and configuration.
 *
 * Rules:
 * - Explicit `EXPO_PUBLIC_PRACTICE_MODE=live` → live (requires valid VAPI config)
 * - Explicit `EXPO_PUBLIC_PRACTICE_MODE=mock` → mock
 * - No env var + valid VAPI config → live
 * - No env var + missing VAPI config → mock (dev fallback)
 */
function determinePracticeMode(): PracticeMode {
  const envMode = process.env.EXPO_PUBLIC_PRACTICE_MODE as PracticeMode | undefined;

  // If explicitly set, use that mode
  if (envMode === 'live' || envMode === 'mock') {
    return envMode;
  }

  // Auto-detect: use live if properly configured, otherwise mock
  const hasValidVapiConfig =
    Boolean(VAPI_CONFIG.API_KEY) && Boolean(VAPI_CONFIG.DATING_COACH_ASSISTANT_ID);

  return hasValidVapiConfig ? 'live' : 'mock';
}

/**
 * Active practice mode for the current session.
 */
export const PRACTICE_MODE: PracticeMode = determinePracticeMode();

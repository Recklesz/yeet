import { useEffect, useRef, useState, useCallback } from 'react';

import { CallStatus } from '@/constants/practice';
import { PRACTICE_MODE } from '@/constants/runtime';
import { VAPI_CONFIG } from '@/constants/vapi';
import {
  PracticeSessionAdapter,
  createPracticeSessionAdapter,
} from './practiceSessionAdapter';

export interface UsePracticeSessionOptions {
  /**
   * Optional scenario ID for future extensibility.
   * Currently unused, but can be used to select different assistants per scenario.
   */
  scenarioId?: string;
}

export interface UsePracticeSessionReturn {
  /** Current call status */
  status: CallStatus;
  /** Whether the microphone is muted */
  isMuted: boolean;
  /** Any error that occurred during the session */
  error: string | null;
  /** Start a practice session */
  start: () => Promise<void>;
  /** Stop the current practice session */
  stop: () => void;
  /** Toggle microphone mute state */
  toggleMute: () => void;
  /** Whether VAPI is properly configured */
  isConfigured: boolean;
}

/**
 * Hook for managing VAPI practice session lifecycle.
 *
 * Handles:
 * - VAPI client initialization and cleanup
 * - Call status state machine (idle → connecting → connected → disconnected)
 * - Mute/unmute controls
 * - Event listener registration and cleanup
 * - Error handling
 *
 * @example
 * ```tsx
 * const { status, isMuted, start, stop, toggleMute, error } = usePracticeSession();
 *
 * // Start a session
 * await start();
 *
 * // Toggle mute
 * toggleMute();
 *
 * // End session
 * stop();
 * ```
 */
export function usePracticeSession(
  options: UsePracticeSessionOptions = {}
): UsePracticeSessionReturn {
  const [status, setStatus] = useState<CallStatus>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const adapterRef = useRef<PracticeSessionAdapter | null>(null);

  // Validate configuration (for live mode, mock mode is always "configured")
  const isConfigured =
    PRACTICE_MODE === 'mock' ||
    (Boolean(VAPI_CONFIG.API_KEY) && Boolean(VAPI_CONFIG.DATING_COACH_ASSISTANT_ID));

  useEffect(() => {
    // Log the active mode
    console.log(`[usePracticeSession] Initializing in ${PRACTICE_MODE} mode`);

    // Early return if live mode but not configured
    if (PRACTICE_MODE === 'live' && !isConfigured) {
      console.warn(
        '[usePracticeSession] Live mode requires VAPI configuration. Please add your API key to .env'
      );
      return;
    }

    // Create the appropriate adapter
    try {
      const adapter = createPracticeSessionAdapter(PRACTICE_MODE);
      adapterRef.current = adapter;

      // Event listener: call started successfully
      const handleCallStart = () => {
        console.log('[usePracticeSession] Call started');
        setStatus('connected');
        setError(null);
      };

      // Event listener: call ended
      const handleCallEnd = () => {
        console.log('[usePracticeSession] Call ended');
        setStatus('disconnected');

        // Reset to idle after a brief delay
        setTimeout(() => {
          setStatus('idle');
          setIsMuted(false);
        }, 2000);
      };

      // Event listener: error occurred
      const handleError = (adapterError: any) => {
        console.error('[usePracticeSession] Adapter Error:', adapterError);
        const errorMessage =
          adapterError?.message || 'An error occurred during the practice session';
        setError(errorMessage);
        setStatus('idle');
      };

      // Register event listeners
      adapter.on('call-start', handleCallStart);
      adapter.on('call-end', handleCallEnd);
      adapter.on('error', handleError);

      // Cleanup: remove event listeners and dispose adapter
      return () => {
        console.log('[usePracticeSession] Cleaning up...');

        // Remove event listeners
        adapter.off('call-start', handleCallStart);
        adapter.off('call-end', handleCallEnd);
        adapter.off('error', handleError);

        // Stop any active call
        if (status === 'connected' || status === 'connecting') {
          adapter.stop();
        }

        // Dispose adapter resources
        adapter.dispose();
        adapterRef.current = null;
      };
    } catch (err) {
      console.error('[usePracticeSession] Failed to initialize adapter:', err);
      setError(err instanceof Error ? err.message : 'Failed to initialize practice session');
    }
  }, [PRACTICE_MODE, isConfigured]); // Re-initialize if mode or config changes

  /**
   * Start a practice session
   */
  const start = useCallback(async () => {
    if (!adapterRef.current) {
      const errorMsg = 'Practice session adapter is not initialized';
      console.error('[usePracticeSession]', errorMsg);
      setError(errorMsg);
      return;
    }

    if (!isConfigured) {
      const errorMsg =
        PRACTICE_MODE === 'live'
          ? 'VAPI is not properly configured'
          : 'Practice session is not properly configured';
      console.error('[usePracticeSession]', errorMsg);
      setError(errorMsg);
      return;
    }

    console.log('[usePracticeSession] Starting practice session...');
    setStatus('connecting');
    setError(null);

    try {
      await adapterRef.current.start(VAPI_CONFIG.DATING_COACH_ASSISTANT_ID);
    } catch (err) {
      console.error('[usePracticeSession] Failed to start session:', err);
      const errorMsg = err instanceof Error ? err.message : 'Failed to start practice session';
      setError(errorMsg);
      setStatus('idle');
    }
  }, [isConfigured, PRACTICE_MODE]);

  /**
   * Stop the current practice session
   */
  const stop = useCallback(() => {
    if (adapterRef.current && (status === 'connected' || status === 'connecting')) {
      console.log('[usePracticeSession] Stopping practice session...');
      adapterRef.current.stop();
    }
  }, [status]);

  /**
   * Toggle microphone mute state
   */
  const toggleMute = useCallback(() => {
    if (adapterRef.current && status === 'connected') {
      const newMutedState = !isMuted;
      console.log('[usePracticeSession] Toggling mute:', newMutedState);
      adapterRef.current.setMuted(newMutedState);
      setIsMuted(newMutedState);
    }
  }, [isMuted, status]);

  return {
    status,
    isMuted,
    error,
    start,
    stop,
    toggleMute,
    isConfigured,
  };
}

import Vapi from '@vapi-ai/react-native';
import { useEffect, useRef, useState, useCallback } from 'react';

import { CallStatus } from '@/constants/practice';
import { VAPI_CONFIG } from '@/constants/vapi';

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
  const vapiRef = useRef<Vapi | null>(null);

  // Validate configuration
  const isConfigured =
    Boolean(VAPI_CONFIG.API_KEY) && Boolean(VAPI_CONFIG.DATING_COACH_ASSISTANT_ID);

  useEffect(() => {
    // Early return if not configured
    if (!isConfigured) {
      console.warn(
        '[usePracticeSession] VAPI_CONFIG is incomplete. Please add your API key to constants/vapi.ts'
      );
      return;
    }

    // Initialize VAPI client
    console.log('[usePracticeSession] Initializing VAPI client...');
    const vapi = new Vapi(VAPI_CONFIG.API_KEY);
    vapiRef.current = vapi;

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
    const handleError = (vapiError: any) => {
      console.error('[usePracticeSession] VAPI Error:', vapiError);
      const errorMessage =
        vapiError?.message || 'An error occurred during the practice session';
      setError(errorMessage);
      setStatus('idle');
    };

    // Register event listeners
    vapi.on('call-start', handleCallStart);
    vapi.on('call-end', handleCallEnd);
    vapi.on('error', handleError);

    // Cleanup: remove event listeners and stop any active call
    return () => {
      console.log('[usePracticeSession] Cleaning up...');

      // Remove event listeners
      vapi.off('call-start', handleCallStart);
      vapi.off('call-end', handleCallEnd);
      vapi.off('error', handleError);

      // Stop any active call
      if (status === 'connected' || status === 'connecting') {
        vapi.stop();
      }

      vapiRef.current = null;
    };
  }, [isConfigured]); // Only re-initialize if configuration status changes

  /**
   * Start a practice session
   */
  const start = useCallback(async () => {
    if (!vapiRef.current) {
      const errorMsg = 'VAPI client is not initialized';
      console.error('[usePracticeSession]', errorMsg);
      setError(errorMsg);
      return;
    }

    if (!isConfigured) {
      const errorMsg = 'VAPI is not properly configured';
      console.error('[usePracticeSession]', errorMsg);
      setError(errorMsg);
      return;
    }

    console.log('[usePracticeSession] Starting practice session...');
    setStatus('connecting');
    setError(null);

    try {
      await vapiRef.current.start(VAPI_CONFIG.DATING_COACH_ASSISTANT_ID);
    } catch (err) {
      console.error('[usePracticeSession] Failed to start session:', err);
      const errorMsg = err instanceof Error ? err.message : 'Failed to start practice session';
      setError(errorMsg);
      setStatus('idle');
    }
  }, [isConfigured]);

  /**
   * Stop the current practice session
   */
  const stop = useCallback(() => {
    if (vapiRef.current && (status === 'connected' || status === 'connecting')) {
      console.log('[usePracticeSession] Stopping practice session...');
      vapiRef.current.stop();
    }
  }, [status]);

  /**
   * Toggle microphone mute state
   */
  const toggleMute = useCallback(() => {
    if (vapiRef.current && status === 'connected') {
      const newMutedState = !isMuted;
      console.log('[usePracticeSession] Toggling mute:', newMutedState);
      vapiRef.current.setMuted(newMutedState);
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

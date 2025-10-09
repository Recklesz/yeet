import Vapi from '@vapi-ai/react-native';

import { CallStatus } from '@/constants/practice';
import { VAPI_CONFIG } from '@/constants/vapi';

/**
 * Event handler types for practice session lifecycle events
 */
export type CallStartHandler = () => void;
export type CallEndHandler = () => void;
export type ErrorHandler = (error: any) => void;

/**
 * Adapter interface for practice session implementations.
 * Allows swapping between live VAPI calls and mock simulations.
 */
export interface PracticeSessionAdapter {
  /** Start a practice session */
  start(assistantId: string): Promise<void>;
  /** Stop the current session */
  stop(): void;
  /** Set microphone mute state */
  setMuted(muted: boolean): void;
  /** Register event listeners */
  on(event: 'call-start', handler: CallStartHandler): void;
  on(event: 'call-end', handler: CallEndHandler): void;
  on(event: 'error', handler: ErrorHandler): void;
  /** Unregister event listeners */
  off(event: 'call-start', handler: CallStartHandler): void;
  off(event: 'call-end', handler: CallEndHandler): void;
  off(event: 'error', handler: ErrorHandler): void;
  /** Cleanup resources */
  dispose(): void;
}

/**
 * Live VAPI adapter - wraps @vapi-ai/react-native for real calls
 */
export class VapiPracticeSessionAdapter implements PracticeSessionAdapter {
  private vapi: Vapi;

  constructor(apiKey: string) {
    console.log('[VapiAdapter] Initializing with live VAPI client');
    this.vapi = new Vapi(apiKey);
  }

  async start(assistantId: string): Promise<void> {
    console.log('[VapiAdapter] Starting live call with assistant:', assistantId);
    await this.vapi.start(assistantId);
  }

  stop(): void {
    console.log('[VapiAdapter] Stopping live call');
    this.vapi.stop();
  }

  setMuted(muted: boolean): void {
    console.log('[VapiAdapter] Setting mute:', muted);
    this.vapi.setMuted(muted);
  }

  on(event: 'call-start' | 'call-end' | 'error', handler: any): void {
    this.vapi.on(event, handler);
  }

  off(event: 'call-start' | 'call-end' | 'error', handler: any): void {
    this.vapi.off(event, handler);
  }

  dispose(): void {
    console.log('[VapiAdapter] Disposing live VAPI client');
    // VAPI client cleanup happens via event listener removal
  }
}

/**
 * Mock adapter - simulates practice session with timers (no API calls)
 */
export class MockPracticeSessionAdapter implements PracticeSessionAdapter {
  private status: CallStatus = 'idle';
  private listeners: {
    'call-start': CallStartHandler[];
    'call-end': CallEndHandler[];
    error: ErrorHandler[];
  } = {
    'call-start': [],
    'call-end': [],
    error: [],
  };
  private connectingTimer: ReturnType<typeof setTimeout> | null = null;
  private autoEndTimer: ReturnType<typeof setTimeout> | null = null;

  // Configuration
  private readonly CONNECTING_DELAY_MS = 2000; // Simulate 2s connection time
  private readonly AUTO_END_DELAY_MS = 120000; // Auto-end after 2 minutes

  constructor() {
    console.log('[MockAdapter] Initializing mock practice session adapter');
  }

  async start(assistantId: string): Promise<void> {
    console.log('[MockAdapter] Starting mock session (assistant ID ignored):', assistantId);

    // Simulate connecting phase
    this.status = 'connecting';

    // Emit call-start after delay
    this.connectingTimer = setTimeout(() => {
      console.log('[MockAdapter] Mock call started');
      this.status = 'connected';
      this.emit('call-start');

      // Schedule auto-end
      this.autoEndTimer = setTimeout(() => {
        console.log('[MockAdapter] Auto-ending mock session after timeout');
        this.stop();
      }, this.AUTO_END_DELAY_MS);
    }, this.CONNECTING_DELAY_MS);

    return Promise.resolve();
  }

  stop(): void {
    console.log('[MockAdapter] Stopping mock session');

    // Clear any pending timers
    if (this.connectingTimer) {
      clearTimeout(this.connectingTimer);
      this.connectingTimer = null;
    }
    if (this.autoEndTimer) {
      clearTimeout(this.autoEndTimer);
      this.autoEndTimer = null;
    }

    // Only emit call-end if we were actually connected
    if (this.status === 'connected' || this.status === 'connecting') {
      this.status = 'idle';
      this.emit('call-end');
    }
  }

  setMuted(muted: boolean): void {
    console.log('[MockAdapter] Mock mute toggled (no-op):', muted);
    // Mock implementation - no actual audio to mute
  }

  on(event: 'call-start' | 'call-end' | 'error', handler: any): void {
    this.listeners[event].push(handler);
  }

  off(event: 'call-start' | 'call-end' | 'error', handler: any): void {
    const handlers = this.listeners[event];
    const index = handlers.indexOf(handler);
    if (index > -1) {
      handlers.splice(index, 1);
    }
  }

  dispose(): void {
    console.log('[MockAdapter] Disposing mock adapter');

    // Clear all timers
    if (this.connectingTimer) {
      clearTimeout(this.connectingTimer);
      this.connectingTimer = null;
    }
    if (this.autoEndTimer) {
      clearTimeout(this.autoEndTimer);
      this.autoEndTimer = null;
    }

    // Clear all listeners
    this.listeners = {
      'call-start': [],
      'call-end': [],
      error: [],
    };
  }

  private emit(event: 'call-start' | 'call-end' | 'error', data?: any): void {
    const handlers = this.listeners[event];
    handlers.forEach(handler => {
      try {
        handler(data);
      } catch (err) {
        console.error(`[MockAdapter] Error in ${event} handler:`, err);
      }
    });
  }
}

/**
 * Factory function to create the appropriate adapter based on practice mode
 */
export function createPracticeSessionAdapter(mode: 'live' | 'mock'): PracticeSessionAdapter {
  if (mode === 'live') {
    if (!VAPI_CONFIG.API_KEY) {
      throw new Error('Cannot create live adapter: VAPI_CONFIG.API_KEY is missing');
    }
    return new VapiPracticeSessionAdapter(VAPI_CONFIG.API_KEY);
  } else {
    return new MockPracticeSessionAdapter();
  }
}

export interface CapacitorBridge {}

declare global {
  interface Window {
    CapacitorBridge?: CapacitorBridge;
  }
}

export {};

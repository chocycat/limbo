import type { CapacitorBridge } from '~/types/capacitor-bridge';

export default defineNuxtPlugin(() => {
  // We need to expose Capacitor methods here.
  // This works similarly to an Electron preload.
  //
  // This plugin won't be loaded into Nuxt unless
  // the current target is set to 'mobile'.
  (window as any).CapacitorBridge = <CapacitorBridge>{};
});

import type { CapacitorBridge } from '~/types/capacitor-bridge';

type PlatformType = 'web' | 'desktop' | 'mobile';

export function usePlatform() {
  const runtimeConfig = useRuntimeConfig();
  const platform = runtimeConfig.public.platform as PlatformType;

  const capacitor = window.CapacitorBridge;

  async function onWeb(fn: () => void | Promise<void>) {
    if (platform === 'web') await fn();
  }

  async function onDesktop(fn: () => void | Promise<void>) {
    // TODO: add preload bridge
    if (platform === 'desktop') await fn();
  }

  async function onMobile(fn: (bridge: CapacitorBridge) => void | Promise<void>) {
    if (platform === 'mobile' && capacitor) await fn(capacitor);
  }

  return { platform, capacitor, onWeb, onDesktop, onMobile };
}

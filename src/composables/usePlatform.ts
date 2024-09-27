import type { CapacitorBridge } from '~/types/capacitor-bridge';

type PlatformType = 'web' | 'desktop' | 'mobile';

export function usePlatform() {
  const runtimeConfig = useRuntimeConfig();
  const platform = runtimeConfig.public.platform as PlatformType;

  const capacitor = window.CapacitorBridge;

  function onWeb(fn: () => void) {
    if (platform === 'web') fn();
  }

  function onDesktop(fn: () => void) {
    // TODO: add preload bridge
    if (platform === 'desktop') fn();
  }

  function onMobile(fn: (bridge: CapacitorBridge) => void) {
    if (platform === 'mobile' && capacitor) fn(capacitor);
  }

  return { platform, capacitor, onWeb, onDesktop, onMobile };
}

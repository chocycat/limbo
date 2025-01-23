import worker from '#service-worker';

export default defineNuxtPlugin(async () => {
  if ('serviceWorker' in navigator) {
    const reg = await navigator.serviceWorker.register(worker.url, {
      type: 'module',
    });
    if (!reg) {
      console.warn('Failed to register service worker');
      return;
    }

    navigator.serviceWorker.addEventListener('message', onMessage);
  }

  function onMessage(event: MessageEvent) {
    const { client, accessToken } = storeToRefs(useMatrix());
    if (!client.value) return;

    // TODO: get rid of magic string
    if (event.data?.request === 'sw_getAuth' && event.data?.messageId) {
      event.source?.postMessage({
        messageId: event.data.messageId,
        accessToken: accessToken.value,
        homeserver: client.value.getHomeserverUrl(),
      });
    }
  }
});

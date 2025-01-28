import type {
  ClientEventHandlerMap,
  EmittedEvents,
  Listener,
} from 'matrix-js-sdk';

export function useMatrixEvent<T extends EmittedEvents>(
  event: T,
  listener: Listener<EmittedEvents, ClientEventHandlerMap, T>
) {
  const { client } = storeToRefs(useMatrix());

  onMounted(() => {
    if (!client.value) return;

    client.value.on(event, listener);
  });

  onUnmounted(() => {
    if (!client.value) return;

    client.value.off(event, listener);
  });
}

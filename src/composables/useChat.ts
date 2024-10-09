import type { Room } from "matrix-js-sdk";

export const useChat = defineStore('chat', () => {
  const currentRoom = ref<Room | null>(null);
  const currentSpace = ref<string | 'direct'>('direct');
  const route = toRefs(useRoute());

  watch(currentSpace, () => {
    if (route.name.value?.toString().startsWith('app-rooms')) {
      // we need to redirect to the current room list
      navigateTo(`/app/rooms/${currentSpace.value}`);
    }
  });

  return { currentRoom, currentSpace };
});

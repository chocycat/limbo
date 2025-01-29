export const useChat = defineStore('chat', () => {
  const { push } = useStackNavigation();
  const { onMobile } = usePlatform();

  const currentRoom = ref<string | null>(null);
  const currentSpace = ref<string | 'home'>('home');
  const route = toRefs(useRoute());

  function setActiveChat(roomId: string) {
    currentRoom.value = roomId;

    onMobile(() => {
      push('/app/chat');
      navigateTo('/app/chat');
    });
  }

  watch(currentSpace, () => {
    if (route.name.value?.toString().startsWith('app-rooms')) {
      // we need to redirect to the current room list
      navigateTo(`/app/rooms/${currentSpace.value}`);
    }
  });

  return { currentRoom, currentSpace, setActiveChat };
});

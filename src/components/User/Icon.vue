<script lang="ts" setup>
import { RoomMember, User } from 'matrix-js-sdk';

const { client } = storeToRefs(useMatrix());

const { user } = defineProps<{ user?: RoomMember }>();

const avatarUrl = computed(() => {
  if (!client.value) return null;
  return user?.getAvatarUrl(
    client.value.getHomeserverUrl(),
    128,
    128,
    'crop',
    false,
    false
  );
});
</script>

<!-- TODO: remove pengui.png after I make some default avatars -->

<template>
  <div class="h-6 w-6 overflow-hidden rounded-full object-cover">
    <img class="h-full w-full" :src="avatarUrl || '/img/pengui.png'" />
  </div>
</template>

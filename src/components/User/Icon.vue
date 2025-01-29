<script lang="ts" setup>
import { RoomMember } from 'matrix-js-sdk';

const { client } = storeToRefs(useMatrix());

const { user, size } = withDefaults(
  defineProps<{ user?: RoomMember; size?: number }>(),
  { user: undefined, size: 24 }
);

const avatarUrl = computed(() => {
  const url = user?.getMxcAvatarUrl();
  if (!client.value || !url) return null;

  const s = Math.floor(size * window.devicePixelRatio);
  return client.value.mxcUrlToHttp(url, s, s, 'crop', undefined, false, false);
});
</script>

<!-- TODO: remove pengui.png after I make some default avatars -->

<template>
  <div
    class="overflow-hidden rounded-full object-cover"
    :style="{
      minWidth: size + 'px',
      minHeight: size + 'px',
      maxWidth: size + 'px',
      maxHeight: size + 'px',
    }">
    <img
      class="h-full w-full"
      :src="avatarUrl || '/img/pengui.png'"
      crossorigin="anonymous" />
  </div>
</template>

<script lang="ts" setup>
import { RoomMember } from 'matrix-js-sdk';

const props = withDefaults(
  defineProps<{ user?: RoomMember; size?: number; icon?: string }>(),
  { user: undefined, size: 24 }
);
const { user, size } = toRefs(props);

const { getAvatar } = useMatrixUser();
const avatarUrl = computed(() => getAvatar(user.value, size.value));
</script>

<!-- TODO: remove pengui.png after I make some default avatars -->

<template>
  <div
    class="userIcon overflow-hidden rounded-full object-cover"
    :style="{
      minWidth: size + 'px',
      minHeight: size + 'px',
      maxWidth: size + 'px',
      maxHeight: size + 'px',
    }">
    <img
      v-if="!icon"
      class="h-full w-full"
      :src="avatarUrl || '/img/pengui.png'"
      crossorigin="anonymous" />
    <div
      v-else
      class="flex items-center justify-center bg-theme-600"
      :style="{
        minWidth: size + 'px',
        minHeight: size + 'px',
        maxWidth: size + 'px',
        maxHeight: size + 'px',
      }">
      <Icon class="text-xl text-accent-500" :icon="icon" />
    </div>
  </div>
</template>

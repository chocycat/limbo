<script lang="ts" setup>
import type { Room } from 'matrix-js-sdk';

const { client } = useMatrix();
const { currentSpace } = storeToRefs(useChat());

const { space, size = 48 } = defineProps<{ space: Room; size?: number }>();

const mnemonic = computed(() => {
  const words = space.name.trim().split(/\s+/);

  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  else return (words[0][0] + words[1][0]).toUpperCase();
});

const avatarUrl = space.getAvatarUrl(
  client!.getHomeserverUrl(),
  size,
  size,
  'crop'
);
const failed = ref<boolean>(false);
</script>

<template>
  <SpaceLinkBase
    :class="{ active: currentSpace === space.roomId }"
    :style="{ '--size': `${size}px` }"
    @click="currentSpace = space.roomId">
    <template v-if="avatarUrl && !failed">
      <img :src="avatarUrl" @error="failed = true" />
      <!-- TODO: skeleton -->
    </template>
    <template v-else>
      <span class="text-lg font-medium">{{ mnemonic }}</span>
    </template>
  </SpaceLinkBase>
</template>

<style lang="scss" scoped>
div > img {
  @apply absolute left-0 top-0 h-full w-full;
}
</style>

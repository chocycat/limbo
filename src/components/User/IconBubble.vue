<script lang="ts" setup>
import type { RoomMember } from 'matrix-js-sdk';
import { computed, toRefs } from 'vue';

const props = defineProps<{ users: RoomMember[]; size: number }>();
const { users, size } = toRefs(props);

const { getAvatar } = useMatrixUser();

const iconSize = computed(() => size.value / Math.min(users.value.length, 1.5));

const visibleUsers = computed(() =>
  users.value.slice(0, users.value.length > 3 ? 2 : 3)
);

const avatarUrls = computed(() =>
  visibleUsers.value.map((user) => getAvatar(user, iconSize.value))
);

const layout = computed(
  () => Math.min(visibleUsers.value.length, 3) as 1 | 2 | 3
);

const mask = computed(() => {
  switch (layout.value) {
    case 1:
      return 'unset';
    case 2:
      return 'url(#mask_userIconBubble_double)';
    case 3:
      return 'url(#mask_userIconBubble_triple)';
  }
});

const getPosition = (index: number) => {
  const positions = {
    1: [{ x: 0, y: 0 }],
    2: [
      { x: 0, y: 0 }, // top-left
      { x: size.value - iconSize.value, y: size.value - iconSize.value }, // bottom-right
    ],
    3: [
      { x: 0, y: 0 }, // top-left
      { x: 0, y: size.value - iconSize.value }, // bottom-left
      {
        x: size.value - iconSize.value,
        y: size.value / 2 - iconSize.value / 2,
      }, // right-center
    ],
  };

  return positions[layout.value][index];
};
</script>

<template>
  <svg
    :style="{
      minWidth: size + 'px',
      minHeight: size + 'px',
      maxWidth: size + 'px',
      maxHeight: size + 'px',
    }"
    :viewBox="`0 0 ${size} ${size}`"
    xmlns="http://www.w3.org/2000/svg">
    <foreignObject x="0" y="0" :width="size" :height="size" :mask="mask">
      <div
        v-for="(user, index) in visibleUsers"
        :key="user.userId"
        class="absolute"
        :style="{
          top: getPosition(index).y + 'px',
          left: getPosition(index).x + 'px',
          width: iconSize + 'px',
          height: iconSize + 'px',
        }">
        <img
          :src="avatarUrls[index] || '/img/pengui.png'"
          class="rounded-full object-cover" />
      </div>
    </foreignObject>
  </svg>
</template>

<style scoped>
foreignObject {
  @apply overflow-visible;
}

img {
  @apply h-full w-full;
}
</style>

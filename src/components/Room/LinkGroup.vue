<script lang="ts" setup>
import { type Room } from 'matrix-js-sdk';
import BaseLink from './BaseLink.vue';

const { isRoomPersonal } = useMatrixRoom();

defineProps<{ room: Room }>();
</script>

<template>
  <BaseLink :room="room">
    <template #icon>
      <UserIconBubble
        v-if="!isRoomPersonal(room)"
        :users="room.getMembers()"
        :size="32" />
      <UserIcon v-else :size="32" icon="bookmark" />
    </template>
  </BaseLink>
</template>

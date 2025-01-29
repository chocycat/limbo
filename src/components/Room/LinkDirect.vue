// LinkDirect.vue
<script lang="ts" setup>
import { type Room } from 'matrix-js-sdk';
import BaseLink from './BaseLink.vue';

const { client } = storeToRefs(useMatrix());

const props = defineProps<{ room: Room }>();
const participant = props.room
  .getMembers()
  .find((x) => x.userId !== client.value!.getUserId())!;
</script>

<template>
  <BaseLink :room="room">
    <template #icon>
      <UserIcon :user="participant" :size="32" />
    </template>
  </BaseLink>
</template>

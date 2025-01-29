<script lang="ts" setup>
import { EventType, type Room } from 'matrix-js-sdk';

const { client } = storeToRefs(useMatrix());

const { room } = defineProps<{ room: Room }>();
const participant = room
  .getMembers()
  .find((x) => x.userId !== client.value!.getUserId())!;
const latestMessage = computed(async () => {
  let event = room
    .getLiveTimeline()
    .getEvents()
    .find(
      (x) =>
        x.getType() === EventType.RoomMessage &&
        x.getContent().msgtype === 'm.text'
    );

  if (!event) return null;

  console.log('trying to decrypt', event);
  await client.value!.decryptEventIfNeeded(event);
  console.log(event);

  return event;
});
</script>

<template>
  <Button
    class="!w-full !justify-start !p-2 hover:!bg-theme-700"
    variant="transparent">
    <div class="flex items-center gap-3">
      <UserIcon :user="participant" :size="32" />

      <div class="flex flex-col gap-1">
        <span class="font-medium">
          {{ room.name }}
        </span>

        <span class="line-clamp-1 text-sm text-theme-500">{{
          latestMessage
        }}</span>
      </div>
    </div>
  </Button>
</template>

<script lang="ts" setup>
import { EventType, RoomMember, type IContent, type Room } from 'matrix-js-sdk';

const { client } = storeToRefs(useMatrix());

const { room } = defineProps<{ room: Room }>();
const participant = room
  .getMembers()
  .find((x) => x.userId !== client.value!.getUserId())!;
const latestMessage = ref<{ sender: RoomMember; content: IContent } | null>(
  null
);

onMounted(async () => {
  let event = room
    .getLiveTimeline()
    .getEvents()
    .find(
      (x) =>
        x.getType() === EventType.RoomMessage &&
        x.getContent().msgtype === 'm.text'
    );

  if (!event) return null;

  await client.value!.decryptEventIfNeeded(event);
  console.log(event);

  latestMessage.value = { sender: event.sender!, content: event.getContent() };
});
</script>

<template>
  <Button
    class="!w-full !justify-start !px-3 !py-2 hover:!bg-theme-700"
    variant="transparent">
    <div class="flex items-center gap-3">
      <UserIcon :user="participant" :size="32" />

      <div class="flex flex-col items-start gap-1">
        <span class="font-medium">
          {{ room.name }}
        </span>

        <RoomMessageContentPreview
          v-if="latestMessage"
          :room="room"
          :sender="latestMessage.sender as RoomMember"
          :content="latestMessage.content" />
      </div>
    </div>
  </Button>
</template>

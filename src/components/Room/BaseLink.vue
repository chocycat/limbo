<!--
  A base link template for direct/group/public rooms.

  Spaces and channels are not displayed in a similar fashion,
  so this component is only for the types mentioned above.
-->

<script lang="ts" setup>
import { EventType, RoomMember, type IContent, type Room } from 'matrix-js-sdk';
import { DateTime } from 'luxon';

const { client } = storeToRefs(useMatrix());

const props = defineProps<{ room: Room }>();

const latestMessage = ref<{
  sender: RoomMember;
  content: IContent;
  date: Date;
} | null>(null);

onMounted(async () => {
  let event = props.room
    .getLiveTimeline()
    .getEvents()
    .find(
      (x) =>
        x.getType() === EventType.RoomMessage &&
        x.getContent().msgtype === 'm.text'
    );

  if (!event) return null;

  await client.value!.decryptEventIfNeeded(event);
  latestMessage.value = {
    sender: event.sender!,
    content: event.getContent(),
    date: event.getDate()!,
  };
});
</script>

<template>
  <Button
    class="!w-full !justify-start !px-3 !py-1 hover:!bg-theme-700"
    variant="transparent">
    <div class="flex w-full items-center gap-3">
      <slot name="icon" />

      <div class="flex w-full flex-col items-start text-left">
        <div class="flex w-full items-center justify-between text-sm">
          <span class="font-medium">
            {{ room.name }}
          </span>

          <span v-if="latestMessage" class="text-xs font-normal text-theme-300">
            {{
              DateTime.fromJSDate(latestMessage.date).toLocaleString(
                DateTime.TIME_SIMPLE
              )
            }}
          </span>
        </div>

        <RoomMessageContentPreview
          v-if="latestMessage"
          :room="room"
          :sender="latestMessage.sender as RoomMember"
          :content="latestMessage.content" />
      </div>
    </div>
  </Button>
</template>

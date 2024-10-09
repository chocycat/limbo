<script lang="ts" setup>
import { RoomType } from '~/types/Room';

const { client } = useMatrix();
const { isRoomDM, getRoomType } = useMatrixRoom();
const { currentRoom } = storeToRefs(useChat());

const directRooms = client!
  .getRooms()
  .filter((room) => isRoomDM(room) || getRoomType(room) === RoomType.Group);
</script>

<template>
  <div class="flex flex-col gap-2">
    <h2 class="ml-2 mt-2 text-lg font-semibold">Direct Messages</h2>

    <template v-for="room in directRooms">
      <RoomLinkDirect
        v-if="isRoomDM(room)"
        :room="room"
        @click="currentRoom = room" />
    </template>
  </div>
</template>

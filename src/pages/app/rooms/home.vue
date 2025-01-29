<script lang="ts" setup>
import { RoomType } from '~/types/Room';

const { client } = useMatrix();
const { isRoomDM, getRoomType } = useMatrixRoom();
const { setActiveChat } = useChat();

const rooms = client!
  .getRooms()
  .filter((room) => isRoomDM(room) || getRoomType(room) === RoomType.Group);
</script>

<template>
  <div class="flex flex-col gap-1">
    <h2 class="ml-2 mt-2 text-lg font-semibold">Home</h2>

    <template v-for="room in rooms">
      <RoomLinkDirect
        v-if="isRoomDM(room)"
        :room="room"
        @click="setActiveChat(room.roomId)" />
      <RoomLinkGroup
        v-else-if="getRoomType(room) === RoomType.Group"
        :room="room"
        @click="setActiveChat(room.roomId)" />
    </template>
  </div>
</template>

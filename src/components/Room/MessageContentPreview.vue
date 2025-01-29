<script lang="ts" setup>
import {
  MsgType,
  Room,
  RoomMember,
  type IContent,
  type IMessageRendering,
} from 'matrix-js-sdk';

const { isRoomDM } = useMatrixRoom();

defineProps<{ room: Room; sender: RoomMember; content: IContent }>();
</script>

<template>
  <p class="line-clamp-1 text-sm font-normal text-theme-300">
    <span
      v-if="!isRoomDM(room) && room.getInvitedAndJoinedMemberCount() > 2"
      class="text-accent-500"
      >{{ sender.rawDisplayName }}:
    </span>

    {{ (content as IMessageRendering).body }}

    <!-- TODO: rest of the message types -->
  </p>
</template>

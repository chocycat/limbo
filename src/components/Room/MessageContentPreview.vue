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
  <span class="line-clamp-1 text-sm font-normal text-theme-300">
    <span v-if="!isRoomDM(room)" class="text-accent-500"
      >{{ sender.rawDisplayName }}:
    </span>

    <template v-if="content.msgtype === MsgType.Text">{{
      (content as IMessageRendering).body
    }}</template>
    <!-- TODO: rest of the message types -->
  </span>
</template>

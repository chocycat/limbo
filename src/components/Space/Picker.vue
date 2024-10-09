<script lang="ts" setup>
const { client } = storeToRefs(useMatrix());
const { currentSpace } = storeToRefs(useChat());

const spaces = client.value!.getRooms().filter((x) => x.isSpaceRoom());
</script>

<template>
  <div class="flex flex-col gap-2">
    <SpaceLinkBase
      :class="{ active: currentSpace === 'direct' }"
      @click="currentSpace = 'direct'">
      <Icon class="mt-[3px] text-[24px]" icon="forum" />
    </SpaceLinkBase>

    <div class="mx-auto h-[1px] w-[25%] bg-theme-800" />

    <!-- TODO: tooltips -->
    <SpaceLink v-for="space in spaces" :space="space" class="cursor-pointer" />

    <div class="mx-auto h-[1px] w-[25%] bg-theme-800" />

    <SpaceLinkBase class="cursor-pointer">
      <Icon class="text-[24px]" icon="add" />
    </SpaceLinkBase>
  </div>
</template>

<script lang="ts" setup>
const { client } = storeToRefs(useMatrix());
const { currentSpace } = storeToRefs(useChat());

const spaces = client.value!.getRooms().filter((x) => x.isSpaceRoom());
</script>

<template>
  <div class="flex flex-col gap-2">
    <SpaceTileBase
      :class="{ active: currentSpace === 'home' }"
      @click="currentSpace = 'home'">
      <Icon class="text-[24px]" icon="home" />
    </SpaceTileBase>

    <div class="mx-auto h-[1px] w-[25%] bg-theme-800" />

    <!-- TODO: tooltips -->
    <SpaceTile v-for="space in spaces" :space="space" class="cursor-pointer" />

    <div class="mx-auto h-[1px] w-[25%] bg-theme-800" />

    <SpaceTileBase class="cursor-pointer">
      <Icon class="text-[24px]" icon="add" />
    </SpaceTileBase>
  </div>
</template>

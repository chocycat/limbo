<script lang="ts" setup>
const { client } = storeToRefs(useMatrix());
</script>

<template>
  <div class="flex h-full w-full">
    <Card
      class="pickerRoot h-full w-full rounded-b-none bg-theme-900/50 sm:rounded-b-2xl">
      <div class="flex h-full">
        <div class="p-3">
          <SpacePicker />
        </div>

        <Card
          class="roomPicker h-full w-full rounded-b-none bg-theme-900/50 sm:rounded-b-2xl">
          <div class="flex flex-col gap-2 p-3">
            <slot name="page" />
          </div>
        </Card>
      </div>
    </Card>
  </div>
</template>

<style lang="scss" scoped>
.pickerRoot,
.roomPicker {
  &:deep(> div.flex) {
    padding: 0 !important;
  }
}
</style>

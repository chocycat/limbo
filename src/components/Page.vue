<script lang="ts" setup>
const { platform } = usePlatform();
</script>

<template>
  <Stack v-if="platform === 'mobile'" class="page">
    <slot />
  </Stack>
  <div v-else class="page">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.page {
  @apply flex flex-col gap-4 bg-theme-950;
}
</style>

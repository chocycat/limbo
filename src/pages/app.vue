<script lang="ts" setup>
const { status } = storeToRefs(useMatrix());
const { platform } = usePlatform();

const layout = computed(() => {
  switch (platform) {
    case 'web':
    case 'desktop':
      return 'desktop-app';
    case 'mobile':
      return 'mobile-app';
  }
});
</script>

<template>
  <BaseRoute v-if="status === 'ready'">
    <NuxtLayout :name="layout">
      <NuxtPage />
    </NuxtLayout>
  </BaseRoute>
  <template v-else>
    <div class="flex w-full flex-1 items-center justify-center">
      <Spinner class="!h-9 !w-9" />
    </div>
  </template>
</template>

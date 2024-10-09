<script lang="ts" setup>
const { platform } = usePlatform();
const layout = computed(() => {
  switch (platform) {
    case 'web':
    case 'desktop':
      return 'desktop';
    case 'mobile':
      return 'mobile';
  }
});

definePageMeta({
  redirect: '/app/rooms/direct',
});
</script>

<template>
  <Page>
    <NuxtLayout :name="layout">
      <NuxtPage />
    </NuxtLayout>
  </Page>
</template>

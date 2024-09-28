<script lang="ts" setup>
// Initialize the current theme
useTheme();

// Try to initialize Matrix
const { homeserver, client } = storeToRefs(useMatrix());
const { initializeClient } = useMatrix();

if (homeserver.value) {
  try {
    await initializeClient();

    if (!client.value?.isLoggedIn()) {
      navigateTo('/auth');
    }
  } catch {
    navigateTo('/auth');
  }
} else {
  navigateTo('/auth');
}
</script>

<template>
  <main>
    <NuxtPage />
  </main>
</template>

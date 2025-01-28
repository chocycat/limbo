<script lang="ts" setup>
const { homeserver, client } = storeToRefs(useMatrix());
const { initializeClient } = useMatrix();

// Initialize the current theme
useTheme();

// Try to initialize Matrix
if (homeserver.value) {
  try {
    await initializeClient();

    if (!client.value?.getAccessToken()) {
      navigateTo('/auth/login');
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

    <ModalManager />
  </main>
</template>

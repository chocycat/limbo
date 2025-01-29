<script lang="ts" setup>
import './gsap';

const { homeserver, client } = storeToRefs(useMatrix());
const { initMatrix } = useMatrix();

const initializing = ref(false);

// Initialize the current theme
useTheme();

// Try to initialize Matrix
if (homeserver.value) {
  initializing.value = true;

  try {
    // Need a settimeout here or else the
    // entire app will freeze for some reason :P
    setTimeout(async () => {
      await initMatrix();

      initializing.value = false;

      if (!client.value?.getAccessToken()) {
        navigateTo('/auth');
      }
    });
  } catch (e) {
    navigateTo('/auth');
  }
} else {
  navigateTo('/auth');
}

definePageMeta({
  middleware: [
    () => {
      const { client } = storeToRefs(useMatrix());

      // Prevent navigation here once a client has been created.
      //
      // This is done because the root page is empty and renders nothing.
      // The user should never be on '/'
      if (!!client.value) return abortNavigation();
    },
  ],
});
</script>

<template>
  <main>
    <!-- Only render the page content if we're done loading
     or if there's no session -->
    <NuxtPage v-if="!initializing" />

    <ModalManager />
    <Masks />
  </main>
</template>

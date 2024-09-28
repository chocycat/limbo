<script lang="ts" setup>
import type { SavedHomeserver } from '~/types/Homeserver';

const { client, homeserver, savedHomeservers } = storeToRefs(useMatrix());
const { initializeClient, fetchLoginFlows, setCurrentHomeserver } = useMatrix();

const connectionError = ref<string | null>();
const connecting = ref(false);

async function select(homeserver: SavedHomeserver) {
  setCurrentHomeserver(homeserver.url);

  connecting.value = true;

  try {
    await initializeClient();
    await fetchLoginFlows();
  } catch (e) {
    connectionError.value = (e as Error).message;
    connecting.value = false;
  }

  navigateTo('/auth/login');
}
</script>

<template>
  <div class="mb-2 flex flex-col gap-2">
    <h1 class="text-2xl font-semibold">Choose a Homeserver</h1>
    <p class="text-theme-300">
      Your account is hosted on a place called a homeserver.
      <LinkExternal
        to="https://matrix.org/docs/matrix-concepts/elements-of-matrix/#homeserver"
        label="Learn More" />
    </p>
  </div>

  <Alert v-if="connectionError" variant="error">
    <template #title>Failed to Connect To Homeserver</template>
    {{ connectionError }}
  </Alert>

  <div
    v-if="!connecting"
    class="flex max-h-full min-h-0 flex-col gap-2 overflow-auto">
    <Button
      v-for="homeserver in savedHomeservers"
      class="group !w-full text-left"
      @click="select(homeserver)">
      <div class="flex w-full items-center">
        <div class="flex flex-col">
          <span class="inline-flex items-center gap-1">
            <span class="font-medium">{{ homeserver.name }}</span>
            <Icon
              v-if="homeserver.featured"
              class="text-[18px] text-warning-500"
              icon="star" />
            <Icon
              v-if="homeserver.favorite"
              class="text-[15px] text-error-500"
              icon="favorite" />
          </span>
          <span
            v-if="homeserver.description"
            class="text-sm font-normal text-theme-300"
            >{{ homeserver.description }}</span
          >
        </div>

        <Icon
          class="ml-auto -translate-x-2 text-[20px] text-theme-200 opacity-0 transition ease-standard group-hover:translate-x-0 group-hover:opacity-100"
          icon="arrow_forward" />
      </div>
    </Button>

    <AuthHomeserverAdd />
  </div>
  <div
    v-else
    class="flex flex-col items-center justify-center pb-4 pt-8 text-center">
    <Spinner class="mb-4 h-7 w-7" />

    <h2 class="font-medium">Connecting to {{ homeserver.name }}...</h2>
    <p class="text-sm text-theme-300">This shouldn't take too long.</p>
  </div>
</template>

<script lang="ts" setup>
const { savedHomeservers, setCurrentHomeserver } = useMatrix();
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

  <div class="flex flex-col gap-2">
    <Button
      v-for="(homeserver, i) in savedHomeservers"
      class="group !w-full text-left">
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

    <Button
      variant="transparent"
      class="!w-full border-2 border-dashed border-theme-700">
      Add Homeserver
    </Button>
  </div>
</template>

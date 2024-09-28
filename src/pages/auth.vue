<script lang="ts" setup>
const { cssColor } = useEval();

definePageMeta({
  redirect: '/auth/homeserver',
});
</script>

<template>
  <BaseRoute
    class="relative max-h-screen flex-1 items-center justify-end sm:justify-center">
    <div
      class="z-10 mb-2 flex w-full items-center justify-start gap-4 self-start px-4 pt-6 sm:-mt-12 sm:max-w-[450px] sm:self-center sm:px-0 sm:pt-0">
      <Logo class="w-12" />

      <h2 class="text-2xl font-bold">limbo.chat</h2>
    </div>

    <Card
      class="sm:flex-0 relative z-10 max-h-full min-h-0 w-full flex-1 overflow-auto rounded-b-none p-4 sm:h-fit sm:max-h-fit sm:max-w-[450px] sm:rounded-b-2xl">
      <NuxtPage />
    </Card>

    <AuthBackground
      class="z-0"
      :dot-color="cssColor('hsla(var(--twc-theme-900) / 40%)')" />
  </BaseRoute>
</template>

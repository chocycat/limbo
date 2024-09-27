<script lang="ts" setup>
const { cssColor } = useEval();

definePageMeta({
  redirect: '/auth/homeserver',
});
</script>

<template>
  <BaseRoute class="relative flex-1 items-center justify-center">
    <div
      class="z-10 -mt-12 mb-2 flex w-full max-w-[450px] items-center justify-start gap-4">
      <Logo class="w-12" />

      <h2 class="text-2xl font-bold">limbo.chat</h2>
    </div>

    <Card class="relative z-10 w-full max-w-[450px] p-4">
      <NuxtPage />
    </Card>

    <AuthBackground
      class="z-0"
      :dot-color="cssColor('hsla(var(--twc-theme-900) / 40%)')" />
  </BaseRoute>
</template>

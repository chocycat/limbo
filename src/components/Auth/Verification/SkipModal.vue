<script lang="ts" setup>
defineProps<{ onBack: () => void; onProceed: () => void }>();
</script>

<template>
  <div class="flex w-full flex-col gap-4">
    <IconBox variant="warning" />

    <h1 class="text-2xl font-semibold">Are you sure?</h1>

    <div class="flex flex-col gap-2 text-theme-200">
      <p class="mb-0">If you don't verify your identity:</p>
      <ul class="list-disc px-4">
        <li>you won't have access encrypted messages</li>
        <li>your device will appear untrusted to others</li>
        <li>
          you might lose messages from this device when switching to another one
        </li>
      </ul>
    </div>

    <div class="flex w-full items-center gap-4">
      <Button class="!w-full" @click="onBack">Cancel</Button>
      <Button class="!w-full" variant="warning" @click="onProceed"
        >Proceed</Button
      >
    </div>
  </div>
</template>

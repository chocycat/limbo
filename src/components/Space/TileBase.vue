<script lang="ts" setup>
import type { ButtonHTMLAttributes } from 'vue';

defineProps</* @vue-ignore */ ButtonHTMLAttributes>();
</script>

<template>
  <button>
    <slot />
  </button>
</template>

<style lang="scss" scoped>
button {
  @apply relative flex h-[--size] w-[--size] cursor-pointer select-none items-center justify-center overflow-hidden border-none bg-theme-800 object-cover text-theme-200 outline-none transition-all ease-standard hover:rounded-2xl hover:bg-theme-700 hover:text-theme-50;

  --size: 48px;

  border-radius: calc(var(--size) / 2);

  &.active {
    @apply rounded-2xl bg-accent-500 text-theme-950;
  }
}
</style>

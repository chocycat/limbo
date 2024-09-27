<script lang="ts" setup>
const emit = defineEmits<{ (e: 'click', event: MouseEvent): void }>();

withDefaults(
  defineProps<{
    variant?: 'transparent' | 'theme' | 'accent' | 'error' | 'warning';
    size?: 'small' | 'base' | 'large';
    text?: string;
  }>(),
  { variant: 'theme', size: 'base' }
);
</script>

<template>
  <button
    :data-size="size"
    :data-variant="variant"
    @click="emit('click', $event)">
    <span v-if="text">{{ text }}</span>
    <slot v-else />
  </button>
</template>

<style lang="scss" scoped>
button {
  @apply ease-standard flex w-fit cursor-pointer items-center gap-2 rounded-md font-semibold transition;

  &:active {
    @apply scale-95;
  }

  /// Variants

  &[data-variant='transparent'] {
    @apply bg-transparent hover:bg-theme-800;
  }

  &[data-variant='theme'] {
    @apply bg-theme-800 hover:bg-theme-600;
  }

  &[data-variant='accent'] {
    @apply bg-accent-500 text-theme-950 hover:bg-accent-400;
  }

  &[data-variant='error'] {
    @apply bg-error-500 hover:bg-error-400 text-theme-950;
  }

  &[data-variant='warning'] {
    @apply bg-warning-500 hover:bg-warning-400 text-theme-950;
  }

  /// Sizes

  &[data-size='small'] {
    @apply px-2.5 py-1.5 text-sm;
  }

  &[data-size='base'] {
    @apply px-4 py-2.5 text-base;
  }

  &[data-size='large'] {
    @apply px-5 py-3 text-lg;
  }
}
</style>

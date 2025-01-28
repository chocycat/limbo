<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    variant?: 'accent' | 'error' | 'warning' | 'success';
    size?: 'small' | 'base';
    icon?: string;
  }>(),
  { variant: 'accent', size: 'base' }
);

const icon = computed(() => {
  if (props.icon) return props.icon;

  switch (props.variant) {
    case 'accent':
      return 'info';
    case 'success':
      return 'check_circle';
    default:
      return props.variant;
  }
});
</script>

<template>
  <div :data-size="size" :data-variant="variant">
    <Icon :icon="icon" />
  </div>
</template>

<style lang="scss" scoped>
div {
  @apply flex aspect-square h-fit w-fit items-center justify-center rounded-xl;

  /// Variants

  &[data-variant='accent'] {
    @apply bg-accent-500/15 text-accent-400;
  }

  &[data-variant='error'] {
    @apply bg-error-500/15 text-error-400;
  }

  &[data-variant='warning'] {
    @apply bg-warning-500/15 text-warning-400;
  }

  &[data-variant='success'] {
    @apply bg-success-500/15 text-success-400;
  }

  /// Sizes

  &[data-size='small'] {
    @apply p-2 text-2xl;
  }

  &[data-size='base'] {
    @apply p-3 text-2xl;
  }
}
</style>

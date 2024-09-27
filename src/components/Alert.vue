<script lang="ts" setup>
const { variant, icon: preferredIcon } = withDefaults(
  defineProps<{
    variant?: 'theme' | 'accent' | 'warning' | 'error';
    icon?: string;
  }>(),
  { variant: 'theme' }
);

const slots = useSlots();

const icon = computed(() => {
  if (preferredIcon) return preferredIcon;

  switch (variant) {
    case 'theme':
      return 'info';
    case 'accent':
      return 'lightbulb';
    case 'warning':
      return 'warning';
    case 'error':
      return 'error';
  }
});
</script>

<template>
  <div class="alert" :data-variant="variant">
    <Icon :icon="icon" class="mt-[2.5px] text-[18px]" />

    <div class="flex flex-col gap-0.5">
      <h3
        v-if="slots.title"
        class="mb-0.5 mt-[3px] font-medium leading-[1.125]">
        <slot name="title" />
      </h3>

      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.alert {
  @apply flex items-start gap-3.5 rounded-lg p-4;

  /// Variants

  &[data-variant='theme'] {
    @apply bg-theme-700/30 text-theme-300;
  }

  &[data-variant='accent'] {
    @apply bg-accent-500/10 text-accent-400;
  }

  &[data-variant='warning'] {
    @apply bg-warning-500/10 text-warning-400;
  }

  &[data-variant='error'] {
    @apply bg-error-500/10 text-error-400;
  }
}
</style>

<script lang="ts" setup>
const emit = defineEmits<{ (e: 'click', event: MouseEvent): void }>();

const props = withDefaults(
  defineProps<{
    variant?: 'transparent' | 'theme' | 'accent' | 'error' | 'warning';
    size?: 'small' | 'base' | 'large';
    text?: string;
    icon?: string | { leading?: string; trailing?: string };
    loading?: boolean;
    disabled?: boolean;
  }>(),
  { variant: 'theme', size: 'base' }
);

const { loading, icon, text, disabled } = toRefs(props);

const simpleMode = computed(
  () => !!loading.value || !!icon.value || !!text.value
);
const leadingIcon = computed(() =>
  typeof icon.value === 'string' ? icon.value : icon.value?.leading
);
const trailingIcon = computed(() =>
  typeof icon.value === 'object' ? icon.value?.trailing : null
);

const spinnerClass = computed(() => {
  // TODO: refactor this, this is quite unconventional
  if (
    ['accent', 'error', 'warning'].includes(props.variant) &&
    !disabled.value
  ) {
    return 'stroke-theme-950';
  } else {
    return 'stroke-theme-50';
  }
});
</script>

<template>
  <button
    :data-size="size"
    :data-variant="variant"
    :disabled="disabled"
    @click="emit('click', $event)">
    <template v-if="simpleMode">
      <template v-if="loading">
        <Spinner :spinner-class="spinnerClass" class="!h-6 !w-6" />
      </template>
      <template v-else>
        <Icon v-if="leadingIcon" class="-ml-0.5" :icon="leadingIcon" />
        <span v-if="text">{{ text }}</span>
        <Icon v-if="trailingIcon" class="-mr-0.5" :icon="trailingIcon" />
      </template>
    </template>
    <slot v-else />
  </button>
</template>

<style lang="scss" scoped>
button {
  @apply flex w-fit cursor-pointer items-center justify-center gap-1.5 rounded-lg font-semibold transition ease-standard;

  &:active {
    @apply scale-95;
  }

  &:disabled {
    @apply scale-100 cursor-not-allowed opacity-75 shadow-inner;

    background-color: theme('colors.theme-600') !important;
    color: theme('colors.theme-50') !important;
  }

  /// Variants

  &[data-variant='transparent'] {
    @apply bg-transparent text-theme-200 hover:bg-theme-600 hover:text-theme-50;
  }

  &[data-variant='theme'] {
    @apply bg-theme-800 hover:bg-theme-600;
  }

  &[data-variant='accent'] {
    @apply bg-accent-500 text-theme-950 hover:bg-accent-400;
  }

  &[data-variant='error'] {
    @apply bg-error-500 text-theme-950 hover:bg-error-400;
  }

  &[data-variant='warning'] {
    @apply bg-warning-500 text-theme-950 hover:bg-warning-400;
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

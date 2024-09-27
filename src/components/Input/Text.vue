<script lang="ts" setup>
import type { InputHTMLAttributes } from 'vue';

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  id: string;
  label?: string;
  icon?: string;
}

defineProps<Props>();

const model = defineModel<string>();

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <div class="input input-text" :data-has-icon="!!icon">
    <label v-if="label" :for="id" class="text-sm text-theme-300">{{
      label
    }}</label>

    <div class="relative flex items-center">
      <Icon v-if="icon" :icon="icon" />

      <input :id="id" v-model="model" v-bind="$attrs" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import 'Input';

.input-text {
  @apply relative flex flex-col gap-1.5;

  &[data-has-icon='true'] {
    input {
      @apply indent-[30px];
    }

    .icon {
      @apply absolute left-3.5 text-[20px] text-theme-300;
    }
  }
}
</style>

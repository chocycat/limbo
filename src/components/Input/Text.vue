<script lang="ts" setup>
import type { InputHTMLAttributes } from 'vue';

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  id: string;
  label?: string;
  icon?: string;
  error?: string;
}

defineProps<Props>();

const model = defineModel<string>();

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <div
    class="input relative flex flex-col gap-1.5"
    :data-has-icon="!!icon"
    :data-error="!!error">
    <label v-if="label" :for="id" class="text-sm text-theme-300">{{
      label
    }}</label>

    <div class="relative flex items-center">
      <Icon
        v-if="icon"
        class="absolute left-3.5 text-[20px] text-theme-300"
        :icon="icon" />

      <input :id="id" v-model="model" v-bind="$attrs" />
    </div>

    <div v-if="error" class="flex items-center gap-1.5 text-sm text-error-500">
      <Icon icon="error" class="text-[14px]" />
      {{ error }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import 'Input';

.input {
  &[data-has-icon='true'] {
    input {
      @apply indent-[30px];
    }
  }
}
</style>

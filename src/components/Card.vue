<script lang="ts" setup>
const emit = defineEmits<{ (e: 'click', event: MouseEvent): void }>();
defineProps<{ clickable?: boolean }>();

const slots = useSlots();
</script>

<template>
  <div
    class="flex flex-col rounded-2xl bg-theme-900 transition ease-standard"
    :class="{
      'group cursor-pointer select-none hover:bg-theme-800': clickable,
    }"
    @click="emit('click', $event)">
    <div class="flex flex-col gap-2 p-4">
      <slot />
    </div>

    <div
      v-if="slots.footer"
      class="flex items-center gap-2 border-t border-theme-800 p-4 transition-colors ease-standard"
      :class="{ 'group-hover:border-theme-700': clickable }">
      <slot name="footer" />
    </div>
  </div>
</template>

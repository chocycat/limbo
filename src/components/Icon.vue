<script lang="ts" setup>
defineProps<{ icon: string }>();
</script>

<template>
  <span>{{ icon }}</span>
</template>

<style lang="scss" scoped>
span {
  @apply select-none;

  --filled: 1;
  --weight: 400;

  display: inline-block;
  direction: ltr;
  font-family: 'Material Symbols Rounded', sans-serif;
  font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
  font-variation-settings:
    'FILL' var(--filled),
    'wght' var(--weight),
    'GRAD' 0,
    'opsz' 24;
  letter-spacing: normal;
  line-height: 1;
  text-transform: none;
  vertical-align: middle;
  white-space: nowrap;
  word-wrap: normal;
}
</style>

<script lang="ts" setup>
withDefaults(defineProps<{ to: string; label: string; newTab?: boolean }>(), {
  newTab: true,
});
</script>

<template>
  <NuxtLink :to="to" :target="newTab ? '_blank' : '_self'">
    {{ label }}
    <Icon
      icon="arrow_outward"
      class="absolute left-full top-[3px] text-[14px] transition-transform ease-standard" />
  </NuxtLink>
</template>

<style lang="scss" scoped>
a {
  @apply relative inline-flex items-start font-medium text-accent-500 underline underline-offset-2 transition ease-standard hover:text-accent-400;

  &:hover > .icon {
    @apply -translate-y-[1px] translate-x-[1px];
  }
}
</style>

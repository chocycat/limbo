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
  &:hover > .icon {
    @apply -translate-y-[1px] translate-x-[1px];
  }
}
</style>

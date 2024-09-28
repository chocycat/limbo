<script lang="ts" setup>
const { status } = storeToRefs(useMatrix());
</script>

<template>
  <BaseRoute v-if="status === 'ready'">
    <span class="mx-auto my-auto">Matrix is ready</span>
  </BaseRoute>
  <template v-else>{{ status }}</template>
</template>

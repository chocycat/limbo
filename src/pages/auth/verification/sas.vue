<script lang="ts" setup>
const emit = defineEmits(['proceed', 'skip']);

function onCancel() {
  navigateTo('/auth/verification');
}
</script>

<template>
  <AuthVerificationSAS
    @cancel="onCancel"
    @skip="emit('skip')"
    @verified="emit('proceed')" />
</template>

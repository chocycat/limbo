<script lang="ts" setup>
import gsap from 'gsap';

const spinner = ref<HTMLElement>();

onMounted(() => {
  const circumference = 2 * Math.PI * 10;

  gsap.set(spinner.value!, {
    strokeDasharray: circumference,
    strokeDashoffset: circumference * 0.33,
    rotation: 0,
    transformOrigin: 'center',
  });

  gsap.to(spinner.value!, {
    rotate: 360,
    duration: 1.5,
    repeat: -1,
    ease: 'linear',
  });
});
</script>

<template>
  <svg class="h-7 w-7" viewBox="0 0 24 24">
    <circle
      ref="spinner"
      class="stroke-accent-500"
      cx="12"
      cy="12"
      r="10"
      fill="none"
      stroke-width="3"
      stroke-linecap="round" />
  </svg>
</template>

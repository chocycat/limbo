<script lang="ts" setup>
import gsap from 'gsap';

const PAGE_SWITCH_DURATION = 0.3;

const { reset } = useStackNavigation();
const { stack } = storeToRefs(useStackNavigation());
const previousStack = useDeepPrevious(stack);

if (stack.value.length === 0) reset(useRoute().path);

const activeLayer = computed(() => {
  const index = stack.value.findIndex((x) => x.active);
  const layer = stack.value[index];
  return { index, layer };
});

function onEnter(target: Element, onComplete: () => void) {
  const { index: activeLayerIndex } = activeLayer.value;
  const previousActiveLayerIndex =
    previousStack.value?.findIndex((x) => x.active) || activeLayerIndex;

  if (previousActiveLayerIndex <= activeLayerIndex) {
    const x = activeLayer.value?.layer.direction === 'left' ? '-100%' : '100%';

    gsap.set(target, { zIndex: 2 });
    gsap.from(target, {
      translateX: x,
      ease: 'power2.out',
      duration: PAGE_SWITCH_DURATION,
      onComplete,
    });
  } else {
    const direction = previousStack.value?.find((x) => x.active)?.direction;
    const x = direction === 'left' ? '15' : '-15%';

    gsap.from(target, {
      translateX: x,
      autoAlpha: 0,
      scale: 0.9,
      transformOrigin: `top ${direction === 'left' ? 'right' : 'left'}`,
      clearProps: 'all',
      ease: 'power2.out',
      duration: PAGE_SWITCH_DURATION,
      onComplete,
    });
  }
}

function onLeave(target: Element, onComplete: () => void) {
  const { index: activeLayerIndex } = activeLayer.value;
  const previousActiveLayerIndex =
    previousStack.value?.findIndex((x) => x.active) || activeLayerIndex;

  if (previousActiveLayerIndex <= activeLayerIndex) {
    const direction = previousStack.value?.find((x) => x.active)?.direction;
    const x = direction === 'left' ? '15%' : '-15%';

    gsap.to(target, {
      translateX: x,
      autoAlpha: 0,
      scale: 0.9,
      transformOrigin: `top ${direction === 'left' ? 'right' : 'left'}`,
      clearProps: 'all',
      ease: 'power2.out',
      duration: PAGE_SWITCH_DURATION,
      onComplete,
    });
  } else {
    const x =
      previousStack.value?.find((x) => x.active)?.direction === 'left'
        ? '-100%'
        : '100%';

    gsap.set(target, { zIndex: 2 });
    gsap.to(target, {
      translateX: x,
      force3D: true,
      ease: 'power2.out',
      duration: PAGE_SWITCH_DURATION,
      onComplete,
    });
  }
}
</script>

<template>
  <div class="flex h-screen w-screen overflow-hidden">
    <NuxtPage
      :transition="{
        name: 'stackViewport',
        mode: 'default',
        onEnter,
        onLeave,
      }" />
  </div>
</template>

<script lang="ts" setup>
import gsap from 'gsap';
import { Flip } from 'gsap/all';

const { cssColor } = useEval();
const { name: routeName } = toRefs(useRoute());
const previousRouteName = usePrevious(routeName);

const authForm = ref<HTMLElement>();
const authFormState = ref();

const ROUTE_ORDER = [
  'auth-homeserver',
  'auth-login',
  'auth-register',
  'auth-verification',
];

onMounted(() => {
  authForm.value = document.querySelector('#authForm') as HTMLElement;
});

function isOrderGreater(a: string, b: string) {
  return (
    ROUTE_ORDER.findIndex((x) => x === a) >
    ROUTE_ORDER.findIndex((x) => x === b)
  );
}

function onBeforeEnter() {
  authFormState.value = Flip.getState(authForm.value!, { simple: true });
}

function onEnter(target: Element, onComplete: () => void) {
  const tl = gsap.timeline({ onComplete });

  tl.add(
    gsap.from(target, {
      translateX: isOrderGreater(
        routeName.value as string,
        previousRouteName.value as string
      )
        ? '133%'
        : '-133%',
      opacity: 0,
      ease: 'standard',
      duration: 0.3,
    }),
    0
  );
}

function onLeave(target: Element, onComplete: () => void) {
  gsap.to(target, {
    position: 'absolute',
    translateX: isOrderGreater(
      routeName.value as string,
      previousRouteName.value as string
    )
      ? '-133%'
      : '133%',
    opacity: 0,
    ease: 'standard',
    duration: 0.3,
    onComplete,
  });
}

definePageMeta({
  middleware: [
    async (to) => {
      const { homeserver } = useMatrix();

      if (!to.path.endsWith('auth')) return;

      if (homeserver) return '/auth/login';
      else return '/auth/homeserver';
    },
  ],
});
</script>

<template>
  <BaseRoute
    class="relative max-h-screen flex-1 items-center justify-end sm:justify-center">
    <div
      class="z-10 mb-2 flex w-full items-center justify-start gap-4 self-start px-4 pt-6 sm:-mt-12 sm:max-w-[450px] sm:self-center sm:px-0 sm:pt-0">
      <Logo class="w-12" />

      <h2 class="text-2xl font-bold">limbo.chat</h2>
    </div>

    <Card
      id="authForm"
      class="relative z-10 max-h-full min-h-0 w-full flex-1 !overflow-hidden rounded-b-none p-4 sm:h-full sm:max-h-fit sm:max-w-[450px] sm:flex-grow-0 sm:rounded-b-2xl">
      <NuxtPage
        mode="out-in"
        :transition="{
          onBeforeEnter,
          onEnter,
          onLeave,
        }" />
    </Card>

    <AuthBackground
      class="z-0"
      :dot-color="cssColor('hsla(var(--twc-theme-900) / 40%)')" />
  </BaseRoute>
</template>

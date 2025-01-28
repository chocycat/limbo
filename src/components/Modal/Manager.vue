<script lang="ts" setup>
const { safeCloseModal } = useModal();
const { width } = useWindowSize();
const { queue } = storeToRefs(useModal());

const modalTransition = computed(() => {
  if (width.value < 640) return 'modal-sm';
  else return 'modal-lg';
});
</script>

<template>
  <div id="modals">
    <Transition name="backdrop">
      <div
        v-if="!!queue.length"
        class="pointer-events-auto fixed z-40 h-full w-full bg-black/50"
        @click="
          (ev) => {
            ev.preventDefault();
            safeCloseModal();
          }
        " />
    </Transition>
    <Transition :name="modalTransition" mode="out-in">
      <Modal v-if="queue[0]" :key="queue[0].id" :config="queue[0]" />
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
#modals {
  @apply pointer-events-none fixed z-50 flex h-full w-full items-center justify-center;

  &:deep(.modal) {
    @apply pointer-events-auto;
  }
}

.backdrop-enter-active,
.backdrop-leave-active {
  @apply transition-opacity ease-standard;
}

.backdrop-enter-from,
.backdrop-leave-to {
  @apply opacity-0;
}

%modal-enter {
  @apply transition ease-emphasized-decelerate;
}

%modal-leave {
  @apply transition ease-emphasized-accelerate;
}

.modal-sm-enter-active,
.modal-lg-enter-active {
  @extend %modal-enter;
}

.modal-sm-leave-active,
.modal-lg-leave-active {
  @extend %modal-leave;
}

.modal-sm-enter-from,
.modal-sm-leave-to {
  @apply translate-y-full opacity-0;
}

.modal-lg-enter-from,
.modal-lg-leave-to {
  @apply scale-50 opacity-0;
}
</style>

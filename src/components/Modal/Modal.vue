<!-- Wrapper component for modals. Don't use this when defining modals. -->

<script lang="ts" setup>
const props = defineProps<{ config: ModalConfig }>();
provide(MODAL_CONFIG_KEY, toRef(props.config));

const { queue } = storeToRefs(useModal());
const { closeModal } = useModal();

const isMounted = useMounted();
const modal = ref<HTMLElement>();
const handle = ref<HTMLElement>();
const absoluteTop = ref<number>(0); // the upper Y constraint of the modal position
const { top: modalTop, height: modalHeight } = useElementBounding(modal);
const { width: sWidth } = useWindowSize();
const modalY = computed(() => modalTop.value - modalHeight.value);
const draggable = computed(() => {
  if (sWidth.value > 640) return false;
  else return isMounted.value && props.config.closable;
});

const { y, style, isDragging } = useDraggable(modal, {
  axis: 'y',
  onMove({ y: mY }) {
    if (mY < absoluteTop.value) {
      y.value = absoluteTop.value;
      return;
    }
  },
  onEnd({ y: mY }) {
    if (mY > absoluteTop.value + modalHeight.value / 2) {
      closeModal();
      return;
    } else {
      y.value = absoluteTop.value;
    }
  },
  handle,
});

onMounted(() => {
  // Set the initial value after mounting
  // setting 'initialValue' manually does not work,
  // as modalTop.value will be 0.
  y.value = modalY.value;
  absoluteTop.value = modalY.value;
});
</script>

<script lang="ts">
export const MODAL_CONFIG_KEY = Symbol() as InjectionKey<Ref<ModalConfig>>;
</script>

<template>
  <div
    :id="`modal/${config.id}`"
    ref="modal"
    class="modal"
    :class="{ 'transition-all ease-standard': !isDragging }"
    :style="draggable ? style : {}">
    <div
      v-if="config.closable"
      ref="handle"
      class="absolute top-0 flex h-8 w-full items-center justify-center sm:hidden">
      <div class="h-1.5 w-8 rounded-full bg-theme-700" />
    </div>
    <Component
      :is="config.component"
      v-bind="config.props"
      @close="closeModal({ id: config.id })" />
  </div>
</template>

<style lang="scss" scoped>
.modal {
  @apply absolute bottom-0 z-50 flex h-fit w-full justify-center rounded-2xl rounded-b-none bg-theme-900 p-8 sm:relative sm:max-w-[450px] sm:rounded-b-2xl;
}
</style>

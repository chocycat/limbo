import type { AllowedComponentProps, Component, VNodeProps } from 'vue';

type ComponentProps<C extends Component> = C extends new (...args: any) => any
  ? Omit<
      InstanceType<C>['$props'],
      keyof VNodeProps | keyof AllowedComponentProps
    >
  : never;

export interface ModalConfig<T extends Component = any> {
  id?: string;
  component: T;
  props?: ComponentProps<T>;
  closable?: boolean;
}

export const useModal = defineStore('modal', () => {
  const { randomHex } = useRandom();

  const queue = ref<ModalConfig[]>([]);

  /** Opens a modal and returns it's ID */
  function openModal<T extends Component>(config: ModalConfig<T>) {
    config.id ||= randomHex();
    config.closable ??= true;

    queue.value.push({ ...config, component: markRaw(config.component) });
    return config.id;
  }

  function findModal({ index, id }: { index?: number; id?: string } = {}) {
    index ||= 0;
    if (id) index = queue.value.findIndex((x) => x.id === id);
    return index;
  }

  /**
   * Tries to close the modal depending on the modal's settings.
   *
   * Returns `true` on success. Returns `false` otherwise.
   */
  function safeCloseModal(opts?: Parameters<typeof findModal>[0]) {
    const index = findModal(opts);
    const modal = queue.value[index];
    if (!modal) return false;

    if (modal.closable === false) {
      return false;
    }

    queue.value.splice(index, 1);
    return true;
  }

  function closeModal(opts?: Parameters<typeof findModal>[0]) {
    const index = findModal(opts);
    queue.value.splice(index, 1);
  }

  return { queue, openModal, safeCloseModal, closeModal };
});

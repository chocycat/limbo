import { cloneDeep } from 'lodash';

/**
 * Holds the previous value of a ref (including arrays and objects).
 *
 * @see {@link https://vueuse.org/usePrevious}
 */
export function useDeepPrevious<T>(
  value: MaybeRefOrGetter<T>
): Readonly<Ref<T | undefined>>;
export function useDeepPrevious<T>(
  value: MaybeRefOrGetter<T>,
  initialValue: T
): Readonly<Ref<T>>;
export function useDeepPrevious<T>(
  value: MaybeRefOrGetter<T>,
  initialValue?: T
) {
  const previous = shallowRef<T | undefined>(initialValue);
  const current = shallowRef<T | undefined>(initialValue);

  watch(
    () => toRef(value).value,
    (newValue) => {
      previous.value = cloneDeep(current.value);
      current.value = cloneDeep(newValue);
    },
    { flush: 'sync', deep: true }
  );

  return readonly(previous);
}

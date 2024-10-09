export type StackDirection = 'left' | 'right';

interface StackItem {
  path: string;
  direction: StackDirection;
  active: boolean;
}

export const useStackNavigation = defineStore('stackNavigation', () => {
  const stack = ref<StackItem[]>([]);

  const currentRoute = computed(
    () => stack.value[stack.value.length - 1]?.path
  );

  function push(path: string, direction: StackDirection = 'right') {
    stack.value = [
      ...stack.value.map((item) => ({ ...item, active: false })),
      { path, direction, active: true },
    ];
  }

  function popToIndex(index: number) {
    if (index >= 0 && index < stack.value.length) {
      stack.value = stack.value.slice(0, index + 1).map((item, i) => ({
        ...item,
        active: i === index,
      }));
    }
  }

  function reset(path: string, direction: StackDirection = 'right') {
    stack.value = [{ path, direction, active: true }];
  }

  function setActive(path: string) {
    const index = stack.value.findIndex((item) => item.path === path);
    if (index !== -1) {
      stack.value = stack.value.map((item, i) => ({
        ...item,
        active: i === index,
      }));
    }
  }

  return { stack, currentRoute, push, popToIndex, reset, setActive };
});

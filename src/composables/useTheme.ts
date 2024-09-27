import { defineStore } from 'pinia';

export const useTheme = defineStore('theme', () => {
  const theme = useLocalStorage<string>('ui/theme', 'onyx');
  watch(theme, applyCurrentTheme, { immediate: true });

  function applyCurrentTheme() {
    document.documentElement.setAttribute('data-theme', theme.value);
  }

  return { theme, applyCurrentTheme };
});

export const useInterface = defineStore('ui', () => {
  /**
   * Provides bindings for UI elements that wish to implement the passphrase
   * prompt that shows up during the hook `getSecretStorageKey`.
   */
  const secretStorageKeyBindings = ref<{
    /** Whether the bind is currently active */
    bound: boolean;
    /** Whether the hook is currently accepting a response */
    accepting: boolean;
    /** Props published by the hook */
    props: {
      verify: (phrase: string) => Promise<boolean>;
      onSubmit: (phrase: string) => void;
    } | null;
  }>({
    bound: false,
    accepting: false,
    props: null,
  });

  return { secretStorageKeyBindings };
});

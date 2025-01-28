<script lang="ts" setup>
const emit = defineEmits(['close']);
const { verify, onSubmit } = defineProps<{
  verify: (phrase: string) => Promise<boolean>;
  onSubmit: (phrase: string) => void;
  loading?: boolean;
}>();

const phrase = ref<string>('');
const isLoading = ref<boolean>(false);
const isInvalid = ref<boolean>(false);

watch(phrase, () => {
  isInvalid.value = false;
});

async function submit() {
  isLoading.value = true;
  const valid = await verify(phrase.value);
  isLoading.value = false;

  if (!valid) isInvalid.value = true;
  else {
    onSubmit(phrase.value);
    emit('close');
  }
}
</script>

<template>
  <div class="flex w-full flex-col gap-4">
    <div class="flex flex-col gap-2">
      <h1 class="text-2xl font-semibold">Security Phrase</h1>
    </div>

    <Alert v-if="isInvalid" variant="error">
      The provided security phrase is invalid.
    </Alert>

    <InputText
      v-model="phrase"
      id="secretstorage/phrase"
      label="Security Phrase"
      type="password"
      placeholder="Enter security phrase"
      icon="key"
      tabindex="2" />

    <Button
      variant="accent"
      class="!w-full"
      :loading="loading || isLoading"
      :disabled="!phrase.length"
      @click="submit"
      >Submit</Button
    >
  </div>
</template>

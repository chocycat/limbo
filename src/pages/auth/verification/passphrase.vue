<script lang="ts" setup>
const emit = defineEmits(['proceed']);

const { client } = storeToRefs(useMatrix());
const { secretStorageKeyBindings } = storeToRefs(useInterface());

onMounted(async () => {
  secretStorageKeyBindings.value.bound = true;

  const crypto = client.value?.getCrypto();
  if (!crypto) return;

  try {
    await crypto.bootstrapSecretStorage({});

    await crypto.bootstrapCrossSigning({
      authUploadDeviceSigningKeys: async (makeRequest) => {
        const res = await makeRequest({}); // TODO: UI features
        return res as any;
      },
    });

    const backup = await crypto.checkKeyBackupAndEnable();
    if (!backup) {
      await crypto.resetKeyBackup();
    }

    await crypto.loadSessionBackupPrivateKeyFromSecretStorage();
    await crypto.restoreKeyBackup();
    emit('proceed');
  } catch (e) {
    // TODO: failed state
    console.error('Failed to verify with passphrase:', e);
    throw e;
  }
});

onUnmounted(() => {
  secretStorageKeyBindings.value.bound = false;
});
</script>

<template>
  <Spinner
    v-if="
      !secretStorageKeyBindings.props || !secretStorageKeyBindings.accepting
    "
    class="mx-auto my-auto" />
  <AuthVerificationPassphrase
    v-else
    :verify="secretStorageKeyBindings.props.verify"
    :on-submit="secretStorageKeyBindings.props.onSubmit" />
</template>

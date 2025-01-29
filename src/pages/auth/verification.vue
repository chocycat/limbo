<script lang="ts" setup>
import {
  CryptoEvent,
  type VerificationRequest,
} from 'matrix-js-sdk/lib/crypto-api';
import SkipModal from '~/components/Auth/Verification/SkipModal.vue';

const { openModal, closeModal } = useModal();

const { client, skippedVerification } = storeToRefs(useMatrix());
const verificationRequest = ref<VerificationRequest | null>(null);

onMounted(async () => {
  if (!client.value) return;

  const crypto = client.value.getCrypto();
  if (!crypto) return;

  const inProgress = crypto.getVerificationRequestsToDeviceInProgress(
    client.value.getUserId()!
  );

  if (inProgress.length) {
    verificationRequest.value = inProgress[inProgress.length - 1];
  }
});

function trySkip() {
  const id = openModal({
    component: SkipModal,
    props: {
      onBack: () => {
        closeModal({ id });
      },
      onProceed: () => {
        closeModal({ id });
        proceed(true);
      },
    },
    closable: false,
  });
}

function proceed(skipped = false) {
  if (skipped) skippedVerification.value = true;
  navigateTo('/app');
}

definePageMeta({
  middleware: [
    'post-sync',
    async (_, from) => {
      const { isVerified } = useMatrix();

      if (!(await isVerified())) {
      }
    },
  ],
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <NuxtPage @skip="trySkip" @proceed="proceed" />
  </div>
</template>

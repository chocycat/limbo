<!--
  Might need to repurpose this component for
  generic (not just ownUser) SAS verifications.

  This component is intended to be used within
  the authentication cards or within modals.
-->

<script lang="ts" setup>
import {
  VerificationPhase,
  VerificationRequestEvent,
  VerifierEvent,
  type ShowSasCallbacks,
  type VerificationRequest,
} from 'matrix-js-sdk/lib/crypto-api';
import { VerificationMethod } from 'matrix-js-sdk/lib/types';

enum MatchType {
  Match,
  Mismatch,
}

const emit = defineEmits(['cancel', 'skip', 'verified']);

const { client } = storeToRefs(useMatrix());

const request = ref<VerificationRequest>();
const phase = ref<VerificationPhase>(); // this is the first phase
const sas = ref<ShowSasCallbacks>();

const cancelling = ref(false);
const confirming = ref<MatchType | null>(null);

onMounted(async () => {
  await verify();
});

watch(phase, async () => {
  if (!request.value) return;

  switch (phase.value) {
    case VerificationPhase.Ready: {
      // Start the verification
      const verifier = await request.value.startVerification(
        VerificationMethod.Sas
      );

      verifier.on(VerifierEvent.ShowSas, (data) => {
        sas.value = data;
      });

      break;
    }
    case VerificationPhase.Done: {
      confirming.value = null;
    }
  }
});

async function verify() {
  if (!client.value) return;

  const crypto = client.value.getCrypto();
  if (!crypto) return;

  if (request.value && request.value.phase !== VerificationPhase.Cancelled) {
    throw new Error(
      'Cannot start new VerificationRequest before the old one is cancelled'
    );
  }

  // Reset
  sas.value = undefined;
  confirming.value = null;
  phase.value = VerificationPhase.Requested;

  request.value = await crypto.requestOwnUserVerification();
  request.value.on(VerificationRequestEvent.Change, () => {
    phase.value = request.value!.phase;
  });
}

async function confirm(match: MatchType) {
  if (!sas.value) return;

  confirming.value = match;

  switch (match) {
    case MatchType.Match:
      await sas.value.confirm();
      break;
    case MatchType.Mismatch:
      sas.value.mismatch();
  }
}

async function cancel() {
  if (!request.value) return;

  cancelling.value = true;

  await request.value?.cancel();
  emit('cancel');

  cancelling.value = false;
}
</script>

<template>
  <div class="flex w-full flex-col gap-4">
    <template v-if="phase === VerificationPhase.Requested || cancelling">
      <h1 class="text-2xl font-semibold">Device Verification</h1>
      <p class="text-theme-300">
        Please accept the verification request on your other device to continue.
      </p>

      <Button class="!w-full" :loading="cancelling" @click="cancel"
        >Cancel</Button
      >
    </template>
    <template
      v-else-if="
        phase === VerificationPhase.Ready ||
        (phase === VerificationPhase.Started && !sas)
      ">
      <Spinner class="mx-auto my-4" />
    </template>
    <template v-else-if="phase === VerificationPhase.Started && sas">
      <h1 class="text-2xl font-semibold">Do they match?</h1>
      <p class="text-theme-300">
        Confirm that the emojis on the other device match these below and are in
        the same order.
      </p>

      <div v-if="sas.sas.emoji" class="mx-auto flex flex-wrap justify-center">
        <template v-for="(emoji, i) in sas.sas.emoji" :key="emoji[1]">
          <div
            class="mx-1 mb-2 flex w-[75px] flex-col items-center gap-2 rounded-xl bg-theme-800 px-0 py-2">
            <h3 class="text-2xl">{{ emoji[0] }}</h3>
            <span class="text-xs text-theme-300">{{ emoji[1] }}</span>
          </div>

          <div v-if="i === 3" class="basis-full" />
        </template>
      </div>
      <Spinner v-else class="mx-auto my-4" />

      <div class="flex items-center gap-4">
        <Button
          class="!w-full !text-error-600"
          variant="theme"
          :loading="confirming === MatchType.Mismatch"
          :disabled="confirming !== null"
          @click="confirm(MatchType.Mismatch)"
          >They don't match</Button
        >

        <Button
          class="!w-full"
          :loading="confirming === MatchType.Match"
          :disabled="confirming !== null"
          @click="confirm(MatchType.Match)"
          >They match</Button
        >
      </div>
    </template>
    <template v-else-if="phase === VerificationPhase.Cancelled">
      <template v-if="request?.cancellationCode === 'm.timeout'">
        <h1 class="text-2xl font-semibold">Verification Failed</h1>
        <p class="text-theme-300">The device verification timed out.</p>

        <Button class="!w-full" @click="verify">Retry</Button>
      </template>
      <template
        v-else-if="
          ['m.key_mismatch', 'm.user_error', 'm.mismatched_sas'].includes(
            request?.cancellationCode || ''
          )
        ">
        <IconBox variant="error" />

        <h1 class="text-2xl font-semibold">Messages Are Not Secure</h1>

        <div class="flex flex-col gap-2 text-theme-300">
          <p>
            If the emojis mismatch, then one or more of the following may be
            compromised:
          </p>
          <ul class="list-disc px-4">
            <li>your homeserver</li>
            <li>your internet connection</li>
            <li>your session</li>
          </ul>
        </div>

        <p class="text-theme-300">
          You can either try to verify again, or proceed without verification.
        </p>

        <div class="flex items-center gap-4">
          <Button class="!w-full" @click="verify">Retry</Button>
          <Button class="!w-full" variant="error" @click="emit('skip')"
            >Proceed</Button
          >
        </div>
      </template>
    </template>
    <template v-else-if="phase === VerificationPhase.Done">
      <IconBox variant="success" />

      <h1 class="text-2xl font-semibold">Verification Successful</h1>

      <p class="text-theme-300">
        You have successfully verified your identity.
      </p>

      <Button class="!w-full" variant="accent" @click="emit('verified')"
        >Continue</Button
      >
    </template>
  </div>
</template>

<script lang="ts" setup>
import { CryptoEvent } from 'matrix-js-sdk/lib/crypto-api';

const emit = defineEmits(['skip']);

const { client } = storeToRefs(useMatrix());

const hasDevicesToVerifyAgainst = ref(false);

onMounted(() => {
  refreshDeviceAvailability();
});

// refreshes devices
useMatrixEvent(CryptoEvent.DevicesUpdated, refreshDeviceAvailability);

async function refreshDeviceAvailability() {
  if (!client.value) return;

  const crypto = client.value.getCrypto();
  if (!crypto) return;

  const devices = await crypto.getUserDeviceInfo([client.value.getUserId()!]);
  const userDevices = devices.get(client.value.getUserId()!);

  if (userDevices) {
    for (const device of userDevices.values()) {
      if (device.deviceId === client.value.getDeviceId()) continue;
      if (device.getIdentityKey()) {
        const verificationStatus = await crypto.getDeviceVerificationStatus(
          client.value.getUserId()!,
          device.deviceId
        );
        if (verificationStatus?.signedByOwner) {
          hasDevicesToVerifyAgainst.value = true;
          break;
        }
      }
    }
  }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <h1 class="text-2xl font-semibold">Identity Verification</h1>
      <p class="text-theme-300">
        You must verify your identity to be able to access encrypted messages
        and verify other devices.
      </p>
    </div>

    <div class="flex flex-col gap-2">
      <Button
        v-if="hasDevicesToVerifyAgainst"
        class="group !w-full text-left"
        @click="navigateTo('/auth/verification/sas')">
        <span class="inline-flex w-full items-center justify-start gap-2">
          <Icon class="text-[18px] text-theme-300" icon="devices" />
          <span class="font-medium">Verify using another device</span>
        </span>
      </Button>

      <Button
        class="group !w-full text-left"
        @click="navigateTo('/auth/verification/passphrase')">
        <span class="inline-flex w-full items-center justify-start gap-2">
          <Icon class="text-[18px] text-theme-300" icon="key" />
          <span class="font-medium">Verify using passphrase</span>
        </span>
      </Button>

      <Button class="!mt-2" size="small" variant="link" @click="emit('skip')"
        >Verify later...</Button
      >
    </div>
  </div>
</template>

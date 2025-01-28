<script lang="ts" setup>
import type { LoginResponse } from 'matrix-js-sdk';

const emit = defineEmits<{
  (e: 'login-success', response: LoginResponse): void;
  (e: 'login-fail', reason: string): void;
  (e: 'reset-error'): void;
}>();

const { client, accessToken, deviceId, status } = storeToRefs(useMatrix());

const id = ref<string>('');
const password = ref<string>('');
const loading = ref<boolean>(false);

watch([id, password], () => emit('reset-error'));

watch(status, () => {
  // Set loading to false after syncing
  // When we initially sign in, we enable loading,
  // so this will provide a smooth loading indicator.
  if (status.value === 'ready') loading.value = false;
});

async function login() {
  if (!client.value) return;

  loading.value = true;

  try {
    const response = await client.value.login('m.login.password', {
      identifier: {
        type: 'm.id.user',
        user: id.value,
      },
      password: password.value,
      initial_device_display_name: 'limbo.chat',
    });

    // set the accesstoken
    if (!accessToken.value?.length) {
      accessToken.value = response.access_token;
    }

    // set device ID
    if (!deviceId.value?.length) {
      deviceId.value = response.device_id;
      client.value.deviceId = deviceId.value;
    }

    emit('login-success', response);
  } catch (e) {
    loading.value = false;

    let message = (e as Error).name;
    if (message === 'M_FORBIDDEN')
      message = 'The entered credentials are invalid.';
    else if (message === 'M_USER_DEACTIVATED')
      message = 'This account was deactivated.';
    else message = 'An unknown error occured.';

    emit('login-fail', message);
  }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <InputText
      v-model="id"
      id="auth/user"
      autocomplete="username"
      label="Matrix ID"
      placeholder="Enter Matrix ID"
      icon="account_circle"
      tabindex="1" />
    <InputText
      v-model="password"
      id="auth/password"
      label="Password"
      type="password"
      placeholder="Enter password"
      icon="key"
      tabindex="2" />

    <Button
      variant="accent"
      class="!w-full"
      :loading="loading"
      :disabled="!id.length || !password.length"
      @click="login"
      >Sign In</Button
    >
  </div>
</template>

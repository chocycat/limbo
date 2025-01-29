<script lang="ts" setup>
const { loginFlows, client, homeserver } = storeToRefs(useMatrix());
const { startClient, unsetCurrentHomeserver } = useMatrix();

const loginError = ref<string | null>(null);

const primaryLoginFlow = computed(() => {
  if (loginFlows.value?.some((x) => x.type === 'm.login.password')) {
    return 'password';
  }

  // TODO: SSO login flow

  return 'password';
});

async function onLoginSuccess() {
  if (!client.value) return;
  await startClient();
}

function changeHomeserver() {
  unsetCurrentHomeserver();
  navigateTo('/auth/homeserver');
}

definePageMeta({
  middleware: ['unauth'],
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <h1 class="text-2xl font-semibold">Sign In</h1>
      <p class="text-theme-300">
        Enter your Matrix ID and password to sign in.
      </p>
    </div>
    <span class="inline-flex items-center gap-1 text-theme-200">
      <Icon icon="dns" />
      <span class="whitespace-pre">
        Signing in on <span class="font-medium">{{ homeserver?.name }}</span
        >.</span
      >
      <NuxtLink class="cursor-pointer" @click="changeHomeserver"
        >Change</NuxtLink
      >
    </span>
    <Alert v-if="loginError" variant="error">
      {{ loginError }}
    </Alert>
    <AuthFlowPasswordLogin
      v-if="primaryLoginFlow === 'password'"
      class="mb-4 mt-2"
      @login-success="onLoginSuccess"
      @login-fail="(message) => (loginError = message)"
      @reset-error="loginError = null" />
    <div class="text-center text-sm text-theme-300">
      Don't have an account? <NuxtLink to="/auth/register">Sign Up</NuxtLink>
    </div>
  </div>
</template>

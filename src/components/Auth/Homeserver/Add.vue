<script lang="ts" setup>
import _ from 'lodash';

const { verifyHomeserver, addHomeserver } = useMatrix();

const active = ref(false);
const loading = ref(false);
const homeserverInvalid = ref(false);

const url = ref<string>('');
watch(url, onChange);
watch(active, () => (url.value = ''));

const debouncedVerify = _.debounce(verify, 750);

function onChange() {
  loading.value = true;
  homeserverInvalid.value = false;
  debouncedVerify();
}

async function verify() {
  if (!active.value || !url.value.length) {
    loading.value = false;
    return;
  }

  if (!url.value.startsWith('http') && !!url.value.length) {
    url.value = `https://${url.value}`;
  }

  const result = await verifyHomeserver(url.value);
  if (!result) {
    homeserverInvalid.value = true;
  } else {
    homeserverInvalid.value = false;
  }

  loading.value = false;
}

function add() {
  addHomeserver(url.value);

  active.value = false;
  url.value = '';
}
</script>

<template>
  <div class="w-full">
    <Button
      v-if="!active"
      variant="transparent"
      class="!w-full border-2 border-dashed border-theme-600"
      @click="active = true">
      Add Homeserver
    </Button>

    <Card v-else class="rounded-xl border-2 border-theme-600">
      <div class="flex items-center justify-between">
        <span class="font-semibold">Add Homeserver</span>

        <CloseButton @click="active = false" />
      </div>

      <InputText
        id="homeserver/new/url"
        v-model="url"
        label="Homeserver URL"
        placeholder="https://matrix.org"
        type="url"
        :error="
          homeserverInvalid
            ? 'This doesn\'t seem to be a valid homeserver.'
            : undefined
        " />

      <Button
        variant="accent"
        text="Add"
        class="!w-full"
        :loading="loading"
        :disabled="homeserverInvalid || !url.length"
        @click="add" />
    </Card>
  </div>
</template>

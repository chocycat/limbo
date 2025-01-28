<script lang="ts" setup>
const username = ref<string>('');
const password = ref<string>('');

definePageMeta({
  middleware: ['unauth'],
});
</script>

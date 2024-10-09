<template>
  <div class="flex h-full flex-col">
    <AppMobileTopbar />

    <AppNavigationPanel>
      <template #page>
        <NuxtPage />
      </template>
    </AppNavigationPanel>
  </div>
</template>

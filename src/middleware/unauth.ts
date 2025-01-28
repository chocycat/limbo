/* This middleware requires the user to be unauthenticated */

export default defineNuxtRouteMiddleware((to) => {
  const { client } = useMatrix();

  // Skip
  if (!client) return;

  if (client.isLoggedIn()) return navigateTo('/app');
});

/*
  This middleware requires the user to be authenticated
  and fully synchronized.
*/

export default defineNuxtRouteMiddleware(() => {
  const { client } = useMatrix();

  // Client not initialized yet
  if (!client) return navigateTo('/auth');

  // Client is not authenticated
  if (!client.isLoggedIn()) return navigateTo('/auth');

  // Client is not synchronized
  // We don't actually need to redirect to authentication here
  if (!client.isInitialSyncComplete()) return abortNavigation();
});

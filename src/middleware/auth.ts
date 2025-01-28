/*
  This middleware requires the user to be
  authenticated and to be either be verified, or for
  the current device to skip verification altogether.

  It does not require the user to be synced.
*/

export default defineNuxtRouteMiddleware(async () => {
  const { client, skippedVerification, isVerified } = useMatrix();

  // Skip
  if (!client) return;

  // Client is not authenticated
  if (!client.isLoggedIn()) return navigateTo('/auth');

  // Check verified state
  if (!(await isVerified()) && !skippedVerification)
    return navigateTo('/auth/verification');
});
